import { ethers } from "hardhat";
import { WAVAX_ABI, SingleFarmingVault_ABI } from "../../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance, getTotalSupply, getUserValue } from "./utils";
import { USDC, WAVAX, ZERO } from "../../utils/const";
import { formatUnits } from "ethers/lib/utils";
const hre = require("hardhat");
export async function depositCollecteral(hre: HardhatRuntimeEnvironment) {
  // 前處理
  const accounts = await hre.ethers.getSigners();

  // 內部合約
  const appController = await ethers.getContract("AppController");
  const feeConf = await ethers.getContract("FeeConf");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  const dyWavax = await ethers.getContract("DYTokenERC20");

  // 外部合約
  const wavax = new ethers.Contract(WAVAX, WAVAX_ABI, ethers.provider);

  // deposit AVAX to WAVAX
  {
    await getBalance(wavax, accounts[0].address, "WAVAX");
    console.log("exchanging AVAX to WAVAX");
    await wavax
      .connect(accounts[0])
      .deposit({ value: BigInt(10e18), gasPrice: 20e12 });
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }

  // deposit WAVAX to dyWAVAX to vault
  {
    await wavax.connect(accounts[0]).approve(dyWavax.address, BigInt(10e18));

    console.log("approve WAVAX spend");
    console.log("appController set vault state");

    await dyWavax
      .connect(accounts[0])
      .deposit(BigInt(10e18), singleFarmingVault.address, {
        gasLimit: 40e4,
        //gasPrice: 20e14,
      });

    console.log("deposited dyWavax into SingleFarmingVault");
    await getTotalSupply(dyWavax);
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }
}

depositCollecteral(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
