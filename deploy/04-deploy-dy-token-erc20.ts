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
  const dYTokenERC20 = await deploy("DYTokenERC20", {
    from: deployer,
    args: [WAVAX, "WAVAX", appController.address],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`Deploying DYWAVAX at ${dYTokenERC20.address}`);
  // setController (上面 init 時候就有設定過了, 這裡再重設定一次做檢查)
  const dYTokenERC20Contract = await ethers.getContract("DYTokenERC20");
  const accounts = await hre.ethers.getSigners();
  await dYTokenERC20Contract
    .connect(accounts[0])
    .setController(appController.address);

  // verified
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(dYTokenERC20.address, []);
    log(`Verified contract ${dYTokenERC20.address}`);
  }
};

export default dyTokenERC20;
dyTokenERC20.tags = ["all", "controller"];
