import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";
import { WAVAX, AVAX_USD_CHAINLINK } from "../utils/const";
import { WAVAX_ABI, CHAINLINK_DATA_FEED } from "../utils/abi";

const deploySingleFarmingVault: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;

  // pre-work
  const accounts = await hre.ethers.getSigners();

  const appController = await ethers.getContract("AppController");
  const singleFarmingVaultContract = await ethers.getContract(
    "SingleFarmingVault"
  );

  // initValidVault
  await appController
    .connect(accounts[0])
    .initValidVault([singleFarmingVaultContract.address], [2]);
  console.log("initValidVault");

  // setOracles
  const singleTokenUsdOracle = await ethers.getContract("SingleTokenUsdOracle");
  await appController
    .connect(accounts[0])
    .setOracles(WAVAX, singleTokenUsdOracle.address, 0, 10000);
  console.log("set Oracle to Vault");
};

export default deploySingleFarmingVault;
deploySingleFarmingVault.tags = ["all", "controller"];
