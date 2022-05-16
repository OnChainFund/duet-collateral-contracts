import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deploySingleFarmingVault: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying SingleFarmingVault and waiting for confirmations...");
  const singleFarmingVault = await deploy("SingleFarmingVault", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`SingleFarmingVault at ${singleFarmingVault.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(singleFarmingVault.address, []);
    log(`Verified contract ${singleFarmingVault.address}`);
  }
  // init
  const accounts = await hre.ethers.getSigners();
  const feeConf = await ethers.getContract("FeeConf");
  const DYWAVAX = await ethers.getContract("DYTokenERC20");
  const appController = await ethers.getContract("AppController");
  const singleFarmingVaultContract = await ethers.getContract("SingleFarmingVault");
  await singleFarmingVaultContract
    .connect(accounts[0])
    .initialize(appController.address, feeConf.address, DYWAVAX.address, {
      gasLimit: 20e4,
      //gasPrice: 20e14,
    });
  log(`Delegating to ${deployer}`);
};

export default deploySingleFarmingVault;
deploySingleFarmingVault.tags = ["all", "controller"];