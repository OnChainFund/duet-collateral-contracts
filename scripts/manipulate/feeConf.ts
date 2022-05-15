import { ethers } from "hardhat";
import { ERC20_ABI, WAVAX_ABI } from "../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance } from "../utils/utils";
import { USDC, WAVAX } from "../../utils/const";

const hre = require("hardhat");
export async function feeConf(hre: HardhatRuntimeEnvironment) {
  // 前處理
  const accounts = await hre.ethers.getSigners();

  // 獲取內部合約地址
  const feeConf = await ethers.getContract("FeeConf");

  // 測試功能

  // setConfig
  /*
  await feeConf
    .connect(accounts[0])
    .setConfig("adf", feeConf.address, WAVAX, {
      gasLimit: 20e4,
      //gasPrice: 20e14,
    });
    */
  // getConfig
}

feeConf(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
