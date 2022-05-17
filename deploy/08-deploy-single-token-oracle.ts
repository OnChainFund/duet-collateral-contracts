import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deploySingleTokenUsdOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  // deploy
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying SingleTokenUsdOracle and waiting for confirmations...");
  const singleTokenUsdOracle = await deploy("SingleTokenUsdOracle", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`SingleTokenUsdOracle at ${singleTokenUsdOracle.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(singleTokenUsdOracle.address, []);
    log(`Verified contract ${singleTokenUsdOracle.address}`);
  }
  log(`Delegating to ${deployer}`);

  // initialize
};

export default deploySingleTokenUsdOracle;
deploySingleTokenUsdOracle.tags = ["all", "controller"];
