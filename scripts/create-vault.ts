import { ethers } from "hardhat";
import { WAVAX_ABI } from "./utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance } from "./utils/utils";
import { USDC, WAVAX } from "../utils/const";

const hre = require("hardhat");
export async function createVault(hre: HardhatRuntimeEnvironment) {
  // 前處理
  const accounts = await hre.ethers.getSigners();

  // 獲取內部合約地址
  const appController = await ethers.getContract("AppController");
  const feeConf = await ethers.getContract("FeeConf");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  const dyWavax = await ethers.getContract("DYTokenERC20");

  // wavax 操作
  const wavax = new ethers.Contract(WAVAX, WAVAX_ABI, ethers.provider);

  // 理論上要使用 dytoken 這裡就會用一般的 token 代替
  // initialize the vault -> 只能用第一次 -> 放在部署合約中
  /*
  const initTx = await singleFarmingVault
    .connect(accounts[0])
    .initialize(appController.address, feeConf.address, DYWAVAX.address, {
      gasLimit: 20e4,
      //gasPrice: 20e14,
    });
  */

  // deposit

  // deposite 前要先 setVault (在 controller 設定哪個 dyToken 對應到哪個 vault)
  await appController.connect(accounts[0]).setVault(dyWavax.address, singleFarmingVault.address,1);
  // 換 wavax
  await getBalance(wavax, accounts[0].address);
  await wavax
    .connect(accounts[0])
    .deposit({ value: BigInt(1e21), gasPrice: 20e12 });
  await getBalance(wavax, accounts[0].address);
  await wavax.connect(accounts[0]).approve(dyWavax.address,101);
  // 設定 vault 狀態
  await appController
    .connect(accounts[0])
    .setVaultStates(singleFarmingVault.address, {
      enabled: true,
      enableDeposit: true,
      enableWithdraw: true,
      enableBorrow: true,
      enableRepay: true,
      enableLiquidate: true,
    },{
    gasLimit: 20e4,
    //gasPrice: 20e14,
  });
  
  await dyWavax.connect(accounts[0]).deposit(101, singleFarmingVault.address, {
    gasLimit: 40e4,
    //gasPrice: 20e14,
  });
  
  //await singleFarmingVault.connect(accounts[0]).deposit(WAVAX, 1);
  //await singleFarmingVault.deposit(usdt, 10);// 這行理論上應該要報錯,但沒有
  // depositTo
  //singleFarmingVault.depositTo(usdc, 10);
  //singleFarmingVault.deposit(usdc, 10);
  //singleFarmingVault.deposit(); //?
  // syncDeposit
  // withdraw
  // withdrawTo
  // liquidate
}

createVault(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
