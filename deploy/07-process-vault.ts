import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";
import { WAVAX, AVAX_USD_CHAINLINK } from "../utils/const";
import { WAVAX_ABI } from "../utils/abi";

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
  const dyWavax = await ethers.getContract("DYTokenERC20");

  const wavax = new ethers.Contract(WAVAX, WAVAX_ABI, ethers.provider);
  await appController
    .connect(accounts[0])
    .setOracles(WAVAX, AVAX_USD_CHAINLINK,0,10000);
  console.log("set Oracle to Vault");
};

export default deploySingleFarmingVault;
deploySingleFarmingVault.tags = ["all", "controller"];
