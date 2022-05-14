import { ethers } from "hardhat";
import { ERC20_ABI, WAVAX_ABI } from "./utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance } from "./utils/utils";
import { USDC, WAVAX } from "./utils/const";

const hre = require("hardhat");
export async function createVault(hre: HardhatRuntimeEnvironment) {
  // 前處理
  const accounts = await hre.ethers.getSigners();

  // 獲取內部合約地址
  const appController = await ethers.getContract("AppController");
  const feeConf = await ethers.getContract("FeeConf");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");

  // wavax 操作
  const wavaxContract = new ethers.Contract(WAVAX, WAVAX_ABI, ethers.provider);

  // 理論上要使用 dytoken 這裡就會用一般的 token 代替
  // initialize the vault
  const initTx = await singleFarmingVault
    .connect(accounts[0])
    .initialize(appController.address, feeConf.address, WAVAX, {
      gasLimit: 20e4,
      //gasPrice: 20e14,
    });

  // deposit
  // 換 wavax
  await getBalance(wavaxContract, accounts[0].address);
  await wavaxContract
    .connect(accounts[0])
    .deposit({ value: BigInt(1e18), gasPrice: 20e12 });
  await getBalance(wavaxContract, accounts[0].address);
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
