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
  log("Deploying SingleFarmingVaultNative and waiting for confirmations...");
  const singleFarmingVaultNative = await deploy("SingleFarmingVault", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`SingleFarmingVaultNative at ${singleFarmingVaultNative.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(singleFarmingVaultNative.address, []);
    log(`Verified contract ${singleFarmingVaultNative.address}`);
    log(singleFarmingVaultNative);
  }
  // init
  const accounts = await hre.ethers.getSigners();
  const feeConf = await ethers.getContract("FeeConf");
  const DYWAVAX = await ethers.getContract("DYTokenERC20");
  const appController = await ethers.getContract("AppController");

  // const singleFarmingVaultNativeContract = await ethers.getContract(
  //   "SingleFarmingVault"
  // );
  // await singleFarmingVaultNativeContract
  //   .connect(accounts[0])
  //   .initialize(appController.address, feeConf.address, DYWAVAX.address, {
  //     gasLimit: 20e4,
  //     //gasPrice: 20e14,
  //   });
  // log(`Delegating to ${deployer}`);
  // // 設定 vault 狀態
  // await appController.connect(accounts[0]).setVaultStates(
  //   singleFarmingVaultNative.address,
  //   {
  //     enabled: true,
  //     enableDeposit: true,
  //     enableWithdraw: true,
  //     enableBorrow: true,
  //     enableRepay: true,
  //     enableLiquidate: true,
  //   },
  //   {
  //     gasLimit: 20e4,
  //     //gasPrice: 20e14,
  //   }
  // );
};

export default deploySingleFarmingVault;
deploySingleFarmingVault.tags = ["all", "controller"];
