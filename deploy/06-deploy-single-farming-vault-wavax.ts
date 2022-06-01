import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deploysingleFarmingVaultUSDC: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying singleFarmingVaultUSDC and waiting for confirmations...");
  const singleFarmingVaultUSDC = await deploy("singleFarmingVaultUSDC", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`singleFarmingVaultUSDC at ${singleFarmingVaultUSDC.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(singleFarmingVaultUSDC.address, []);
    log(`Verified contract ${singleFarmingVaultUSDC.address}`);
  }
  // init
  const accounts = await hre.ethers.getSigners();
  const feeConf = await ethers.getContract("FeeConf");
  const DYUSDC = await ethers.getContract("DYTokenERC20");
  const appController = await ethers.getContract("AppController");
  const singleFarmingVaultUSDCContract = await ethers.getContract(
    "singleFarmingVaultUSDC"
  );
  await singleFarmingVaultUSDCContract
    .connect(accounts[0])
    .initialize(appController.address, feeConf.address, DYUSDC.address, {
      gasLimit: 20e4,
      //gasPrice: 20e14,
    });
  log(`Delegating to ${deployer}`);
  // 設定 vault 狀態
  await appController.connect(accounts[0]).setVaultStates(
    singleFarmingVaultUSDC.address,
    {
      enabled: true,
      enableDeposit: true,
      enableWithdraw: true,
      enableBorrow: true,
      enableRepay: true,
      enableLiquidate: true,
    },
    {
      gasLimit: 20e4,
      //gasPrice: 20e14,
    }
  );
};

export default deploysingleFarmingVaultUSDC;
deploysingleFarmingVaultUSDC.tags = ["all", "controller"];
