// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../interfaces/IUSDOracle.sol";

contract SingleTokenUsdOracle is IUSDOracle{

    AggregatorV3Interface internal priceFeed;

    /**
     * Returns the latest price
     */
    function getPrice(address _priceFeed) external view returns (uint256) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = AggregatorV3Interface(_priceFeed).latestRoundData();
        return uint256(price);
    }
}
