//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./interfaces/IVault.sol";
import "./interfaces/IDepositVault.sol";
import "./interfaces/IMintVault.sol";
import "./interfaces/IController.sol";
import "./interfaces/IStrategy.sol";
import "./Constants.sol";

contract AppController is Constants, IController, OwnableUpgradeable {
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 constant JOINED_VAULT_LIMIT = 20;

    // underlying => dToken
    mapping(address => address) public override dyTokens;
    // underlying => IStratege (token => yield strategy)
    mapping(address => address) public strategies;

    struct ValueConf {
        address oracle;
        uint16 dr; // discount rate
        uint16 pr; // premium rate
    }

    // underlying => orcale
    mapping(address => ValueConf) internal valueConfs;

    //  dyToken => vault
    mapping(address => address) public override dyTokenVaults;

    // user => vaults
    mapping(address => EnumerableSet.AddressSet)
        internal userJoinedDepositVaults;

    mapping(address => EnumerableSet.AddressSet)
        internal userJoinedBorrowVaults;

    // manage Vault state for risk control
    struct VaultState {
        bool enabled;
        bool enableDeposit;
        bool enableWithdraw;
        bool enableBorrow;
        bool enableRepay;
        bool enableLiquidate;
    }

    // Vault => VaultStatus
    mapping(address => VaultState) public vaultStates;

    // depost value / borrow value >= liquidateRate
    uint256 public liquidateRate;
    uint256 public collateralRate;

    // is anyone can call Liquidate.
    bool public isOpenLiquidate;

    mapping(address => bool) public allowedLiquidator;

    // ValidVault 0: uninitialized, default value
    // ValidVault 1: No, vault can not be collateralized
    // ValidVault 2: Yes, vault can be collateralized
    enum ValidVault {
        UnInit,
        No,
        Yes
    }

    // vault => ValidVault
    // Initialize once
    mapping(address => ValidVault) public validVaults;

    // vault => user => ValidVault
    // set by user
    mapping(address => mapping(address => ValidVault)) public validVaultsOfUser;

    // EVENT
    event UnderlyingDTokenChanged(
        address indexed underlying,
        address oldDToken,
        address newDToken
    );
    event UnderlyingStrategyChanged(
        address indexed underlying,
        address oldStrategy,
        address newStrategy,
        uint256 stype
    );
    event DTokenVaultChanged(
        address indexed dToken,
        address oldVault,
        address newVault,
        uint256 vtype
    );

    event ValueConfChanged(
        address indexed underlying,
        address oracle,
        uint256 discount,
        uint256 premium
    );

    event LiquidateRateChanged(uint256 liquidateRate);
    event CollateralRateChanged(uint256 collateralRate);

    event OpenLiquidateChanged(bool open);
    event AllowedLiquidatorChanged(address liquidator, bool allowed);

    event SetVaultStates(address vault, VaultState state);

    event InitValidVault(address vault, ValidVault state);
    event SetValidVault(address vault, address user, ValidVault state);

    constructor() {}

    function initialize() external initializer {
        OwnableUpgradeable.__Ownable_init();
        liquidateRate = 11000; // PercentBase * 1.1;
        collateralRate = 13000; // PercentBase * 1.3;
        isOpenLiquidate = true;
    }

    // ======  yield =======

    /**
     * @notice set dy token
     * @param  _underlying underlying token address
     * @param _dyToken dyToken address
     */
    function setDYToken(address _underlying, address _dyToken)
        external
        onlyOwner
    {
        require(_dyToken != address(0), "INVALID_DTOKEN");
        address oldDToken = dyTokens[_underlying];
        dyTokens[_underlying] = _dyToken;
        emit UnderlyingDTokenChanged(_underlying, oldDToken, _dyToken);
    }

    /**
     * @notice set or update strategy
     * @param  _underlying underlying token address
     * @param _strategy strategy address
     * @param stype 1: pancakeswap
     */
    function setStrategy(
        address _underlying,
        address _strategy,
        uint256 stype
    ) external onlyOwner {
        require(_strategy != address(0), "Strategies Disabled");

        address _current = strategies[_underlying];
        if (_current != address(0)) {
            IStrategy(_current).withdrawAll();
        }
        strategies[_underlying] = _strategy;

        emit UnderlyingStrategyChanged(_underlying, _current, _strategy, stype);
    }

    function emergencyWithdrawAll(address _underlying) public onlyOwner {
        IStrategy(strategies[_underlying]).withdrawAll();
    }

    // ======  vault  =======
    function setOpenLiquidate(bool _open) external onlyOwner {
        isOpenLiquidate = _open;
        emit OpenLiquidateChanged(_open);
    }

    function updateAllowedLiquidator(address liquidator, bool allowed)
        external
        onlyOwner
    {
        allowedLiquidator[liquidator] = allowed;
        emit AllowedLiquidatorChanged(liquidator, allowed);
    }

    function setLiquidateRate(uint256 _liquidateRate) external onlyOwner {
        liquidateRate = _liquidateRate;
        emit LiquidateRateChanged(liquidateRate);
    }

    function setCollateralRate(uint256 _collateralRate) external onlyOwner {
        collateralRate = _collateralRate;
        emit CollateralRateChanged(collateralRate);
    }

    /**
     * @notice set different oracle、 discount rate and premium rate for each underlying asset
     * @param _underlying underlying token address
     * @param _oracle oracle address
     * @param _discount discount rate
     * @param _premium premium rate
     */
    function setOracles(
        address _underlying,
        address _oracle,
        uint16 _discount,
        uint16 _premium
    ) external onlyOwner {
        require(_oracle != address(0), "INVALID_ORACLE");
        // PercentBase = 10000 (100%)
        require(_discount <= PercentBase, "DISCOUT_TOO_BIG");
        require(_premium >= PercentBase, "PREMIUM_TOO_SMALL");

        ValueConf storage conf = valueConfs[_underlying];
        conf.oracle = _oracle;
        conf.dr = _discount;
        conf.pr = _premium;

        emit ValueConfChanged(_underlying, _oracle, _discount, _premium);
    }

    /**
     * @notice getValueConfs
     * @param token0 token 0
     * @param token1 token 1
     */
    function getValueConfs(address token0, address token1)
        external
        view
        returns (
            address oracle0,
            uint16 dr0,
            uint16 pr0,
            address oracle1,
            uint16 dr1,
            uint16 pr1
        )
    {
        (oracle0, dr0, pr0) = getValueConf(token0);
        (oracle1, dr1, pr1) = getValueConf(token1);
    }

    /**
     * @notice get DiscountRate and PremiumRate
     * @param _underlying underlying token address
     */
    function getValueConf(address _underlying)
        public
        view
        returns (
            address oracle,
            uint16 dr,
            uint16 pr
        )
    {
        ValueConf memory conf = valueConfs[_underlying];
        oracle = conf.oracle;
        dr = conf.dr;
        pr = conf.pr;
    }

    /**
     * @notice set vault
     * @param _dyToken dy token address
     * @param _vault vault address
     * @param vtype vtype 1 : for deposit vault 2: for mint vault
     */
    function setVault(
        address _dyToken,
        address _vault,
        uint256 vtype
    ) external onlyOwner {
        require(IVault(_vault).isDuetVault(), "INVALIE_VALUT");
        address old = dyTokenVaults[_dyToken];
        dyTokenVaults[_dyToken] = _vault;
        emit DTokenVaultChanged(_dyToken, old, _vault, vtype);
    }

    /**
     * @notice join vault
     * @param _user user address
     * @param isDepositVault is deposit vault or not
     */
    function joinVault(address _user, bool isDepositVault) external {
        address vault = msg.sender;
        require(vaultStates[vault].enabled, "INVALID_CALLER");

        EnumerableSet.AddressSet storage set = isDepositVault
            ? userJoinedDepositVaults[_user]
            : userJoinedBorrowVaults[_user];
        require(set.length() < JOINED_VAULT_LIMIT, "JOIN_TOO_MUCH");
        set.add(vault);
    }

    /**
     * @notice exit vault
     * @param _user user address
     * @param isDepositVault is deposit vault or not
     */
    function exitVault(address _user, bool isDepositVault) external {
        address vault = msg.sender;
        require(vaultStates[vault].enabled, "INVALID_CALLER");

        EnumerableSet.AddressSet storage set = isDepositVault
            ? userJoinedDepositVaults[_user]
            : userJoinedBorrowVaults[_user];
        set.remove(vault);
    }

    /**
     * @notice set vault state
     * @param _vault vault address
     * @param _state vault state
     */
    function setVaultStates(address _vault, VaultState memory _state)
        external
        onlyOwner
    {
        vaultStates[_vault] = _state;
        emit SetVaultStates(_vault, _state);
    }

    /**
     * @notice initialize valid vault
     * @param _vault vault address list
     * @param _state vault state list
     */
    function initValidVault(address[] memory _vault, ValidVault[] memory _state)
        external
        onlyOwner
    {
        uint256 len1 = _vault.length;
        uint256 len2 = _state.length;
        require(len1 == len2 && len1 != 0, "INVALID_PARAM");
        for (uint256 i = 0; i < len1; i++) {
            require(
                validVaults[_vault[i]] == ValidVault.UnInit,
                "SET_ONLY_ONCE"
            );
            require(
                _state[i] == ValidVault.Yes || _state[i] == ValidVault.No,
                "INVALID_VALUE"
            );
            validVaults[_vault[i]] = _state[i];
            emit InitValidVault(_vault[i], _state[i]);
        }
    }

    /**
     * @notice set valid vault
     * @param _vault vault address list
     * @param _state vault state list
     */
    function setValidVault(address[] memory _vault, ValidVault[] memory _state)
        external
    {
        address user = msg.sender;
        uint256 len1 = _vault.length;
        uint256 len2 = _state.length;
        require(len1 == len2 && len1 != 0, "INVALID_PARAM");
        for (uint256 i = 0; i < len1; i++) {
            require(
                _state[i] == ValidVault.Yes || _state[i] == ValidVault.No,
                "INVALID_VALUE"
            );
            validVaultsOfUser[_vault[i]][user] = _state[i];
            emit SetValidVault(_vault[i], user, _state[i]);
        }

        uint256 totalDepositValue = accValidVaultVaule(user, true);
        uint256 totalBorrowValue = accVaultVaule(
            user,
            userJoinedBorrowVaults[user],
            true
        );
        uint256 validValue = (totalDepositValue * PercentBase) / collateralRate;
        require(
            totalDepositValue * PercentBase >=
                totalBorrowValue * collateralRate,
            "SETVALIDVAULT: LOW_COLLATERAL"
        );
    }

    /**
     * @notice user join vault info at
     * @param _user user address
     * @param isDepositVault is deposit vault or not
     * @param index index
     */
    function userJoinedVaultInfoAt(
        address _user,
        bool isDepositVault,
        uint256 index
    ) external view returns (address vault, VaultState memory state) {
        EnumerableSet.AddressSet storage set = isDepositVault
            ? userJoinedDepositVaults[_user]
            : userJoinedBorrowVaults[_user];
        vault = set.at(index);
        state = vaultStates[vault];
    }

    /**
     * @notice user join vault count
     * @param _user user address
     * @param isDepositVault is deposit vault or not
     */
    function userJoinedVaultCount(address _user, bool isDepositVault)
        external
        view
        returns (uint256)
    {
        return
            isDepositVault
                ? userJoinedDepositVaults[_user].length()
                : userJoinedBorrowVaults[_user].length();
    }

    /**
     * @notice  maximum that a user can borrow from a Vault
     * @param _user user address
     * @param vault vault address
     */
    function maxBorrow(address _user, address vault)
        public
        view
        returns (uint256)
    {
        uint256 totalDepositValue = accValidVaultVaule(_user, true);
        uint256 totalBorrowValue = accVaultVaule(
            _user,
            userJoinedBorrowVaults[_user],
            true
        );

        uint256 validValue = (totalDepositValue * PercentBase) / collateralRate;
        if (validValue > totalBorrowValue) {
            uint256 canBorrowValue = validValue - totalBorrowValue;
            return IMintVault(vault).valueToAmount(canBorrowValue, true);
        } else {
            return 0;
        }
    }

    /**
     * @notice Get user total valid Vault value (i.e., Vault of deposit only counts collateral)
     * @param  _user depositors
     * @param _dp  discount or premium
     */
    function userValues(address _user, bool _dp)
        public
        view
        override
        returns (uint256 totalDepositValue, uint256 totalBorrowValue)
    {
        totalDepositValue = accValidVaultVaule(_user, _dp);
        totalBorrowValue = accVaultVaule(
            _user,
            userJoinedBorrowVaults[_user],
            _dp
        );
    }

    /**
     * @notice  Get user total Vault value
     * @param  _user depositors
     * @param _dp  discount or premium
     */
    function userTotalValues(address _user, bool _dp)
        public
        view
        returns (uint256 totalDepositValue, uint256 totalBorrowValue)
    {
        totalDepositValue = accVaultVaule(
            _user,
            userJoinedDepositVaults[_user],
            _dp
        );
        totalBorrowValue = accVaultVaule(
            _user,
            userJoinedBorrowVaults[_user],
            _dp
        );
    }

    /**
     * @notice predict total valid vault value after the user operating vault (i.e., Vault of deposit only counts collateral)
     * @param  _user depositors
     * @param  _vault target vault
     * @param  _amount the amount of deposits or withdrawals
     * @param _dp  discount or premium
     */
    function userPendingValues(
        address _user,
        IVault _vault,
        int256 _amount,
        bool _dp
    )
        public
        view
        returns (uint256 pendingDepositValue, uint256 pendingBrorowValue)
    {
        pendingDepositValue = accValidPendingValue(_user, _vault, _amount, _dp);
        pendingBrorowValue = accPendingValue(
            _user,
            userJoinedBorrowVaults[_user],
            _vault,
            _amount,
            _dp
        );
    }

    /**
     * @notice  predict total vault value after the user operating Vault
     * @param  _user depositors
     * @param  _vault target vault
     * @param  _amount the amount of deposits or withdrawals
     * @param _dp  discount or premium
     */
    function userTotalPendingValues(
        address _user,
        IVault _vault,
        int256 _amount,
        bool _dp
    )
        public
        view
        returns (uint256 pendingDepositValue, uint256 pendingBrorowValue)
    {
        pendingDepositValue = accPendingValue(
            _user,
            userJoinedDepositVaults[_user],
            _vault,
            _amount,
            _dp
        );
        pendingBrorowValue = accPendingValue(
            _user,
            userJoinedBorrowVaults[_user],
            _vault,
            _amount,
            _dp
        );
    }

    /**
     * @notice  determine whether the borrower needs to be liquidated
     * @param  _borrower borrower address
     */
    function isNeedLiquidate(address _borrower) public view returns (bool) {
        (uint256 totalDepositValue, uint256 totalBorrowValue) = userValues(
            _borrower,
            true
        );
        return
            totalDepositValue * PercentBase < totalBorrowValue * liquidateRate;
    }

    /**
     * @dev return total value of vault
     * @param _user address of user
     * @param set all address of vault
     * @param _dp Discount or Premium
     */
    function accVaultVaule(
        address _user,
        EnumerableSet.AddressSet storage set,
        bool _dp
    ) internal view returns (uint256 totalValue) {
        uint256 len = set.length();
        for (uint256 i = 0; i < len; i++) {
            address vault = set.at(i);
            totalValue += IVault(vault).userValue(_user, _dp);
        }
    }

    /**
     * @dev return total deposit collateral's value of vault
     * @param _user address of user
     * @param _dp Discount or Premium
     */
    function accValidVaultVaule(address _user, bool _dp)
        internal
        view
        returns (uint256 totalValue)
    {
        EnumerableSet.AddressSet storage set = userJoinedDepositVaults[_user];
        uint256 len = set.length();
        for (uint256 i = 0; i < len; i++) {
            address vault = set.at(i);
            if (isCollateralizedVault(vault, _user)) {
                totalValue += IVault(vault).userValue(_user, _dp);
            }
        }
    }

    /**
     * @dev accPendingValue
     * @param _user address of user
     * @param set address set
     * @param vault address of vault
     * @param amount amount of deposit or withdrawal
     * @param _dp discount or premium
     */
    function accPendingValue(
        address _user,
        EnumerableSet.AddressSet storage set,
        IVault vault,
        int256 amount,
        bool _dp
    ) internal view returns (uint256 totalValue) {
        uint256 len = set.length();
        bool existVault = false;

        for (uint256 i = 0; i < len; i++) {
            IVault _vault = IVault(set.at(i));

            if (vault == _vault) {
                totalValue += _vault.pendingValue(_user, amount);
                existVault = true;
            } else {
                totalValue += _vault.userValue(_user, _dp);
            }
        }

        if (!existVault) {
            totalValue += vault.pendingValue(_user, amount);
        }
    }

    /**
     * @dev accValidPendingValue
     * @param _user address of user
     * @param amount amount of deposit or withdrawal
     * @param _dp discount or premium
     */
    function accValidPendingValue(
        address _user,
        IVault vault,
        int256 amount,
        bool _dp
    ) internal view returns (uint256 totalValue) {
        EnumerableSet.AddressSet storage set = userJoinedDepositVaults[_user];
        uint256 len = set.length();
        bool existVault = false;

        for (uint256 i = 0; i < len; i++) {
            IVault _vault = IVault(set.at(i));

            if (isCollateralizedVault(address(_vault), _user)) {
                if (vault == _vault) {
                    totalValue += _vault.pendingValue(_user, amount);
                    existVault = true;
                } else {
                    totalValue += _vault.userValue(_user, _dp);
                }
            }
        }

        if (!existVault && isCollateralizedVault(address(vault), _user)) {
            totalValue += vault.pendingValue(_user, amount);
        }
    }

    /**
     * @notice return bool, true means the vault is as collateral to user, false is opposite
     * @param  _vault address of vault
     * @param _user   address of user
     */
    function isCollateralizedVault(address _vault, address _user)
        internal
        view
        returns (bool)
    {
        ValidVault _state = validVaultsOfUser[_vault][_user];
        ValidVault state = _state == ValidVault.UnInit
            ? validVaults[_vault]
            : _state;
        require(state != ValidVault.UnInit, "VALIDVAULT_UNINIT");

        if (state == ValidVault.Yes) return true; // vault can be collateralized
        return false;
    }

    /**
     * @notice Risk control check before deposit
     * param _user depositors
     * @param _vault address of deposit market
     * param  _amount deposit amount
     */
    function beforeDeposit(
        address,
        address _vault,
        uint256
    ) external view {
        VaultState memory state = vaultStates[_vault];
        require(state.enabled && state.enableDeposit, "DEPOSITE_DISABLE");
    }

    /**
     * @notice Risk control check before borrowing
     * @param  _user borrower
     * @param _vault address of loan market
     * @param  _amount loan amount
     */
    function beforeBorrow(
        address _user,
        address _vault,
        uint256 _amount
    ) external view {
        VaultState memory state = vaultStates[_vault];
        require(state.enabled && state.enableBorrow, "BORROW_DISABLED");

        uint256 totalDepositValue = accValidVaultVaule(_user, true);
        uint256 pendingBrorowValue = accPendingValue(
            _user,
            userJoinedBorrowVaults[_user],
            IVault(_vault),
            int256(_amount),
            true
        );
        require(
            totalDepositValue * PercentBase >=
                pendingBrorowValue * collateralRate,
            "LOW_COLLATERAL"
        );
    }

    /**
     * @notice Risk control check before withdraw
     * @param  _user withdrawer
     * @param _vault address of loan market
     * @param  _amount loan amount
     */
    function beforeWithdraw(
        address _user,
        address _vault,
        uint256 _amount
    ) external view {
        VaultState memory state = vaultStates[_vault];
        require(state.enabled && state.enableWithdraw, "WITHDRAW_DISABLED");

        if (isCollateralizedVault(_vault, _user)) {
            uint256 pendingDepositValidValue = accValidPendingValue(
                _user,
                IVault(_vault),
                int256(0) - int256(_amount),
                true
            );
            uint256 totalBorrowValue = accVaultVaule(
                _user,
                userJoinedBorrowVaults[_user],
                true
            );
            require(
                pendingDepositValidValue * PercentBase >=
                    totalBorrowValue * collateralRate,
                "LOW_COLLATERAL"
            );
        }
    }
    /**
     * @notice Risk control check before repay
     * @param  _repayer repayer 
     * @param _vault address of loan market
     * @param  _amount loan amount
     */
    function beforeRepay(
        address _repayer,
        address _vault,
        uint256 _amount
    ) external view {
        VaultState memory state = vaultStates[_vault];
        require(state.enabled && state.enableRepay, "REPAY_DISABLED");
    }

    /**
     * @notice liquidate
     * @param  _borrower borrower
     * @param data data
     */
    function liquidate(address _borrower, bytes calldata data) external {
        address liquidator = msg.sender;

        require(
            isOpenLiquidate || allowedLiquidator[liquidator],
            "INVALID_LIQUIDATOR"
        );
        require(isNeedLiquidate(_borrower), "COLLATERAL_ENOUGH");

        EnumerableSet.AddressSet storage set = userJoinedDepositVaults[
            _borrower
        ];
        uint256 len = set.length();

        for (uint256 i = len; i > 0; i--) {
            IVault v = IVault(set.at(i - 1));
            // liquidate valid vault
            if (isCollateralizedVault(address(v), _borrower)) {
                beforeLiquidate(_borrower, address(v));
                v.liquidate(liquidator, _borrower, data);
            }
        }

        EnumerableSet.AddressSet storage set2 = userJoinedBorrowVaults[
            _borrower
        ];
        uint256 len2 = set2.length();

        for (uint256 i = len2; i > 0; i--) {
            IVault v = IVault(set2.at(i - 1));
            beforeLiquidate(_borrower, address(v));
            v.liquidate(liquidator, _borrower, data);
        }
    }

    function beforeLiquidate(address _borrower, address _vault) internal view {
        VaultState memory state = vaultStates[_vault];
        require(state.enabled && state.enableLiquidate, "LIQ_DISABLED");
    }
    //  ======   vault end =======
}
