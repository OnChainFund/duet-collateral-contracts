import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployAppController: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying AppController and waiting for confirmations...");
  const appController = await deploy("AppController", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`AppController at ${appController.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(appController.address, []);
  }
  log(`Delegating to ${deployer}`);
  await delegate(appController.address, deployer);
  log("Delegated!");
};

const delegate = async (
  appControllerAddress: string,
  delegatedAccount: string
) => {
  const appController = await ethers.getContractAt(
    "AppController",
    appControllerAddress
  );
  const transactionResponse = await appController.delegate(delegatedAccount);
  await transactionResponse.wait(1);
  console.log(
    `Checkpoints: ${await appController.numCheckpoints(delegatedAccount)}`
  );
};

export default deployAppController;
deployAppController.tags = ["all", "controller"];
