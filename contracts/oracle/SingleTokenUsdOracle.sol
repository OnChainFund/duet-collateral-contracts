// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../interfaces/IUSDOracle.sol";

contract SingleTokenUsdOracle is IUSDOracle{


    mapping(address => address) public tokenOracleAddress;

    function setOracle(address _token,address _oracle) public {
        tokenOracleAddress[_token] = _oracle;
    }

    /**
     * Returns the latest price
     */
    function getPrice(address _token) external view returns (uint256) {
        require(tokenOracleAddress[_token] != address(0), "Oracle is not set");
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = AggregatorV3Interface(tokenOracleAddress[_token]).latestRoundData();
        return uint256(price);
    }
}
