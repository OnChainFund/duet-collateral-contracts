import { ethers } from "hardhat";
import { WAVAX_ABI, SingleFarmingVault_ABI } from "../../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance, getTotalSupply, getUserValue, getDeposit } from "./utils";
import { USDC, WAVAX, ZERO } from "../../utils/const";
import { formatUnits } from "ethers/lib/utils";
const hre = require("hardhat");
export async function depositCollecteral(
  hre: HardhatRuntimeEnvironment,
  tokenAddress: any,
  amount: number
) {
  // 前處理
  const accounts = await hre.ethers.getSigners();

  // 內部合約
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  const dyWavax = await ethers.getContract("DYTokenERC20");

  // 外部合約
  const wavax = new ethers.Contract(WAVAX, WAVAX_ABI, ethers.provider);

  // withdraw 之前所有 colleteral
  // 從 vault 取出 colleteral
  // withdraw dyWAVAX from vault
  // 從 dyToken 取出 underlying
  {
    const deposit = await getDeposit(singleFarmingVault, accounts[0].address);
    // 查看 user 的 colleteral
    // const userValue = await getUserValue(
    //   singleFarmingVault,
    //   accounts[0].address,
    //   false
    // );
    console.log("withdraw deposit");
    if (Number(deposit) > 0) {
      // withdraw colleteral
      console.log("withdraw colleteral");
      // unpack = true -> 取出並還給你 WAVAX
      // unpack = false -> 取出並還給你 dyWAVAX
      await singleFarmingVault
        .connect(accounts[0])
        .withdraw(BigInt(BigInt(Number(deposit) * 1e18) - BigInt(1e3)), true, {
          gasLimit: 40e4,
        });
    }
    await getDeposit(singleFarmingVault, accounts[0].address);
    console.log("withdraw dyWavax from SingleFarmingVault");
    await getTotalSupply(dyWavax);
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }
  // WAVAX to AVAX
  {
    const wavaxBalance = await getBalance(wavax, accounts[0].address, "WAVAX");
    if (Number(wavaxBalance) > 0) {
      await wavax
        .connect(accounts[0])
        .withdraw(BigInt(Number(wavaxBalance) * 1e18) - BigInt(1), {
          gasLimit: 40e4,
        });
    } else {
    }
  }

  // deposit AVAX to WAVAX
  {
    await getBalance(wavax, accounts[0].address, "WAVAX");
    console.log("exchanging AVAX to WAVAX");
    await wavax
      .connect(accounts[0])
      .deposit({ value: BigInt(amount), gasPrice: 20e12 });
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }

  // deposit WAVAX to dyWAVAX to vault
  {
    await wavax.connect(accounts[0]).approve(dyWavax.address, BigInt(amount*1e18));

    console.log("approve WAVAX spend");

    await dyWavax
      .connect(accounts[0])
      .deposit(BigInt(amount*1e18), singleFarmingVault.address, {
        gasLimit: 40e4,
        //gasPrice: 20e14,
      });

    console.log("deposited dyWavax into SingleFarmingVault");
    await getTotalSupply(dyWavax);
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }
  await getDeposit(singleFarmingVault, accounts[0].address);
  console.log("finished deposit amount:", amount);
}

depositCollecteral(hre, WAVAX, 1)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
