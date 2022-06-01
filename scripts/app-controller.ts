import { ethers } from "hardhat";
import { WAVAX_ABI, SingleFarmingVault_ABI } from "../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance, getTotalSupply, getUserValue } from "./utils/utils";
import { USDC, WAVAX, ZERO } from "../utils/const";
import { formatUnits } from "ethers/lib/utils";
const hre = require("hardhat");
export async function createVault(hre: HardhatRuntimeEnvironment) {
  // 前處理
  const accounts = await hre.ethers.getSigners();

  // 內部合約
  const appController = await ethers.getContract("AppController");
  const feeConf = await ethers.getContract("FeeConf");
  const MintVault = await ethers.getContract("MintVault");
  const dyWavax = await ethers.getContract("DYTokenERC20");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  const dusd = await ethers.getContract("DUSD");
}

createVault(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
