import { ethers } from "hardhat";
import { WAVAX_ABI, SingleFarmingVault_ABI } from "../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance, getTotalSupply, getUserValue } from "./utils/utils";
import { USDC, WAVAX, ZERO } from "../utils/const";
import { formatUnits } from "ethers/lib/utils";
const hre = require("hardhat");
export async function createVault(hre: HardhatRuntimeEnvironment) {
  // 前處理
  const accounts = await hre.ethers.getSigners();

  // 內部合約
  const appController = await ethers.getContract("AppController");
  const feeConf = await ethers.getContract("FeeConf");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  const dyWavax = await ethers.getContract("DYTokenERC20");

  // 外部合約
  const wavax = new ethers.Contract(WAVAX, WAVAX_ABI, ethers.provider);
  const zero_vault = new ethers.Contract(
    ZERO,
    SingleFarmingVault_ABI,
    ethers.provider
  );

  // setVault (deposite 前要先在 controller 設定哪個 dyToken 對應到哪個 vault)
  await appController
    .connect(accounts[0])
    .setVault(dyWavax.address, singleFarmingVault.address, 1);
  console.log("appController setVault");

  // 設定 vault 狀態
  await appController.connect(accounts[0]).setVaultStates(
    singleFarmingVault.address,
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


  // deposit
  await getBalance(wavax, accounts[0].address, "WAVAX");
  console.log("exchanging AVAX to WAVAX");
  await wavax
    .connect(accounts[0])
    .deposit({ value: BigInt(1e18), gasPrice: 20e12 });
  await getBalance(wavax, accounts[0].address, "WAVAX");
  await wavax.connect(accounts[0]).approve(dyWavax.address, BigInt(1e18));

  console.log("approve WAVAX spend");
  console.log("appController set vault state");

  await dyWavax
    .connect(accounts[0])
    .deposit(BigInt(1e18), singleFarmingVault.address, {
      gasLimit: 40e4,
      //gasPrice: 20e14,
    });

  await getTotalSupply(dyWavax);

  console.log("deposit dyWavax into SingleFarmingVault");

  // withdraw from vault
  // unpack = true

  await singleFarmingVault.connect(accounts[0]).withdraw(1, true, {
    gasLimit: 40e4,
    //gasPrice: 20e14,
  });
}

createVault(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
