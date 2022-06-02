import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";
import { WAVAX, EUR_USD_CHAINLINK } from "../utils/const";
import { WAVAX_ABI, CHAINLINK_DATA_FEED } from "../utils/abi";

const deployMintVault: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;

  // pre-work
  const accounts = await hre.ethers.getSigners();

  const appController = await ethers.getContract("AppController");
  const mintVault = await ethers.getContract("MintVault");
  const AEUR = await ethers.getContract("Asset");
  const mintVaultContract = await ethers.getContract("MintVault");

  // initValidVault
  await appController
    .connect(accounts[0])
    .initValidVault([mintVaultContract.address], [2]);
  console.log("initValidVault");

  // set vault to dyToken
  await appController
    .connect(accounts[0])
    .setVault(AEUR.address, mintVault.address, 2);
  console.log("appController setVault");

  // setOracles
  const singleTokenUsdOracle = await ethers.getContract("SingleTokenUsdOracle");
  await appController
    .connect(accounts[0])
    .setOracles(AEUR.address, singleTokenUsdOracle.address, 100, 100);
  console.log("set Oracle to Vault");

  // set oracle to chainlink
  // setOracle
  const singleTokenUsdOracleContract = await ethers.getContract(
    "SingleTokenUsdOracle"
  );
  await singleTokenUsdOracleContract
    .connect(accounts[0])
    .setOracle(AEUR.address, EUR_USD_CHAINLINK, {
      gasLimit: 20e4,
    });
  console.log("setOracle");
};

export default deployMintVault;
deployMintVault.tags = ["all", "controller"];
