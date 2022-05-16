import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { WAVAX } from "../utils/const";
import { ethers } from "hardhat";
const dyTokenERC20: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying DYWAVAX and waiting for confirmations...");
  const appController = await ethers.getContract("AppController");
  const lpFarmingVault = await deploy("DYTokenERC20", {
    from: deployer,
    args: [WAVAX, "WAVAX", appController.address],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`DYWAVAX at ${lpFarmingVault.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(lpFarmingVault.address, []);
    log(`Verified contract ${lpFarmingVault.address}`);
  }
  log(`Delegating to ${deployer}`);
};

export default dyTokenERC20;
dyTokenERC20.tags = ["all", "controller"];
