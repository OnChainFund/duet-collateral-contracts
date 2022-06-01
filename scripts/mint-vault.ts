import { ethers } from "hardhat";
import { WAVAX_ABI } from "../utils/abi";
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
  const MintVault = await ethers.getContract("MintVault");
  const dyWavax = await ethers.getContract("DYTokenERC20");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  const dusd = await ethers.getContract("DUSD");

  // 設定 vault 狀態
  await appController.connect(accounts[0]).setVaultStates(
    MintVault.address,
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
  // borrow
  {
    await MintVault.connect(accounts[0]).borrow(BigInt(1e18), {
      gasLimit: 40e4,
      //gasPrice: 20e14,
    });
  }
  // tokensReceived
  // repay
  // repayTo
  // liquidate
  // valueToAmount
  // underlyingAmountValue
  // userValue
  // pendingValue
}

createVault(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
