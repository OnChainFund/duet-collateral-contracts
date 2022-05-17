import { ethers } from "hardhat";
import {
  WAVAX_ABI,
  SingleFarmingVault_ABI,
  CHAINLINK_DATA_FEED,
} from "../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import {  getPrice} from "./utils/utils";
import { AVAX_USD_CHAINLINK } from "../utils/const";
const hre = require("hardhat");
export async function createVault(hre: HardhatRuntimeEnvironment) {
  // setOracles
  const accounts = await hre.ethers.getSigners();
  const dyWavax = await ethers.getContract("DYTokenERC20");
  const appController = await ethers.getContract("AppController");
  const singleTokenUsdOracle = await ethers.getContract("SingleTokenUsdOracle");
  await getPrice(singleTokenUsdOracle, AVAX_USD_CHAINLINK);
}

createVault(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
