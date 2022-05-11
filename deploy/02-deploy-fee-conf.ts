import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployFeeConf: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying FeeConf and waiting for confirmations...");
  const feeConf = await deploy("FeeConf", {
    from: deployer,
    args: [deployer],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`FeeConf at ${feeConf.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(feeConf.address, []);
    log(`Verified contract ${feeConf.address}`);
  }
  log(`Delegating to ${deployer}`);
};

export default deployFeeConf;
deployFeeConf.tags = ["all", "controller"];
