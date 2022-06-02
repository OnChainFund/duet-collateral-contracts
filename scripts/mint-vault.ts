import { ethers } from "hardhat";
import { WAVAX_ABI } from "../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import {
  getBalance,
  getTotalSupply,
  getUserValue,
  getDeposit,
  borrow,
  accValidVaultVaule,
} from "./utils/utils";
import { USDC, WAVAX, ZERO } from "../utils/const";
import { formatUnits } from "ethers/lib/utils";
import { depositCollecteral } from "./utils/deposit-collecteral-wavax";
const hre = require("hardhat");
export async function createVault(hre: HardhatRuntimeEnvironment) {
  // 前處理
  const accounts = await hre.ethers.getSigners();

  // 內部合約
  const appController = await ethers.getContract("AppController");
  const feeConf = await ethers.getContract("FeeConf");
  const mintVault = await ethers.getContract("MintVault");
  const dyWavax = await ethers.getContract("DYTokenERC20");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  const AEUR = await ethers.getContract("Asset");

  // 設定 vault 狀態
  // await appController.connect(accounts[0]).setVaultStates(
  //   mintVault.address,
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

  // borrow
  {

   await accValidVaultVaule(appController, accounts[0].address, true);
   await getUserValue(singleFarmingVault, accounts[0].address, false);
    console.log("=================");
    console.log("borrow");
    await borrow(mintVault, 0.0001, accounts[0]);
  }
  await getBalance(AEUR, accounts[0].address, "AEUR");

  // tokensReceived (也是一種 repay)
  // repay
  // repayTo
  // liquidate
  // valueToAmount
  // underlyingAmountValue
  // userValue
  {
    await getUserValue(mintVault, accounts[0].address, false);
  }
  // pendingValue
}

createVault(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
