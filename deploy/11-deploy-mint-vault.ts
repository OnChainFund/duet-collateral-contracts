import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployMintVault: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying MintVault and waiting for confirmations...");
  const mintVault = await deploy("MintVault", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`MintVault at ${mintVault.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(mintVault.address, []);
    log(`Verified contract ${mintVault.address}`);
  }
  log(`Delegating to ${deployer}`);

  // init
  const accounts = await hre.ethers.getSigners();
  const feeConf = await ethers.getContract("FeeConf");
  const AEUR = await ethers.getContract("Asset");
  const appController = await ethers.getContract("AppController");
  const mintVaultContract = await ethers.getContract("MintVault");
  await mintVaultContract
    .connect(accounts[0])
    .initialize(appController.address, feeConf.address, AEUR.address, {
      gasLimit: 20e4,
      //gasPrice: 20e14,
    });
  log(`Delegating to ${deployer}`);
  // 設定 vault 狀態
  await appController.connect(accounts[0]).setVaultStates(
    mintVault.address,
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

  // add minter (MintVault) to dtoken
  await AEUR.connect(accounts[0]).addMiner(mintVault.address, {
    gasLimit: 20e4,
    //gasPrice: 20e14,
  });
  log("add minter to mintVault");

  // add minter (accounts[0]) to dtoken
  await AEUR.connect(accounts[0]).addMiner(accounts[0].address, {
    gasLimit: 20e4,
    //gasPrice: 20e14,
  });
  log("add minter to accounts[0]");
};

export default deployMintVault;
deployMintVault.tags = ["all", "controller"];
