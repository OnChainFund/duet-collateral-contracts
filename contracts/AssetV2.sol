//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Asset is ERC20, ERC20Permit, Ownable {
    // supply
    //uint256 private _totalSupply;
    uint256 private _maxSupply;

    // dependency
    address private _underlying;

    constructor(
        address underlying_,
        string memory _symbol
    )
        ERC20("DYToken", string(abi.encodePacked("DY-", _symbol)))
        ERC20Permit("DYToken")
    {
        _underlying = underlying_;

    }


    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

}
