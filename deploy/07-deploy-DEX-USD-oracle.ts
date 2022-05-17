import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployDexUSDOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  // deploy
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying DexUSDOracle and waiting for confirmations...");
  const dexUSDOracle = await deploy("DexUSDOracle", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`DexUSDOracle at ${dexUSDOracle.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(dexUSDOracle.address, []);
    log(`Verified contract ${dexUSDOracle.address}`);
  }
  log(`Delegating to ${deployer}`);

  // initialize
};

export default deployDexUSDOracle;
deployDexUSDOracle.tags = ["all", "controller"];
