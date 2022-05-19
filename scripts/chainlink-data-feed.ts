import { ethers } from "hardhat";
import {
  WAVAX_ABI,
  SingleFarmingVault_ABI,
  CHAINLINK_DATA_FEED,
} from "../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getPrice } from "./utils/utils";
import { WAVAX, AVAX_USD_CHAINLINK } from "../utils/const";
const hre = require("hardhat");
import { formatUnits } from "ethers/lib/utils";
export async function oracleData(hre: HardhatRuntimeEnvironment) {
  // setOracles
  const accounts = await hre.ethers.getSigners();
  const dyWavax = await ethers.getContract("DYTokenERC20");
  const appController = await ethers.getContract("AppController");
  const singleTokenUsdOracle = await ethers.getContract("SingleTokenUsdOracle");

  console.log(formatUnits(await singleTokenUsdOracle.getPrice(WAVAX)));
  /*
  await singleTokenUsdOracle.setOracle(WAVAX, AVAX_USD_CHAINLINK, {
    gasLimit: 20e4,
  });
  */
  await getPrice(singleTokenUsdOracle, WAVAX);
}

oracleData(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
