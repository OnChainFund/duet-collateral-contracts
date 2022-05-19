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

  // withdraw 之前 deposit 的 WAVAX
  {
    const wavaxBalance = await getBalance(wavax, accounts[0].address, "WAVAX");
    if (Number(wavaxBalance) > 0) {
      console.log("withdrawing all AVAX from WAVAX");
      await wavax
        .connect(accounts[0])
        .withdraw(BigInt(Number(wavaxBalance) * 1e18) - BigInt(1), {
          gasLimit: 40e4,
        });
      await getBalance(wavax, accounts[0].address, "WAVAX");

      console.log("withdrawed all AVAX from WAVAX");
    } else {
      console.log("no AVAX to withdraw");
    }
  }

  // deposit AVAX to WAVAX
  {
    await getBalance(wavax, accounts[0].address, "WAVAX");
    console.log("exchanging AVAX to WAVAX");
    await wavax
      .connect(accounts[0])
      .deposit({ value: BigInt(1e18), gasPrice: 20e12 });
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }

  // deposit WAVAX to dyWAVAX to vault
  {
    await wavax.connect(accounts[0]).approve(dyWavax.address, BigInt(1e18));

    console.log("approve WAVAX spend");
    console.log("appController set vault state");

    await dyWavax
      .connect(accounts[0])
      .deposit(BigInt(1e18), singleFarmingVault.address, {
        gasLimit: 40e4,
        //gasPrice: 20e14,
      });

    console.log("deposited dyWavax into SingleFarmingVault");
    await getTotalSupply(dyWavax);
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }

  // withdraw dyWAVAX from vault
  {
    // unpack = true -> 取出並還給你 WAVAX
    // unpack = false -> 取出並還給你 dyWAVAX
    await singleFarmingVault.connect(accounts[0]).withdraw(BigInt(1e18), true, {
      gasLimit: 40e4,
    });

    console.log("withdraw dyWavax from SingleFarmingVault");
    await getTotalSupply(dyWavax);
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }

  // depositTo
  {
    // deposit WAVAX to dyWAVAX to vault for other address
    await wavax.connect(accounts[0]).approve(dyWavax.address, BigInt(1e18));
    await dyWavax
      .connect(accounts[0])
      .depositTo(
        accounts[1].address,
        BigInt(1e18),
        singleFarmingVault.address,
        {
          gasLimit: 40e4,
          //gasPrice: 20e14,
        }
      );
    await getTotalSupply(dyWavax);
    await getBalance(wavax, accounts[1].address, "WAVAX");
  }

  // underlyingAmountValue
  {
    console.log("underlyingAmountValue");
    console.log(
      formatUnits(
        await singleFarmingVault.underlyingAmountValue(BigInt(1e18), true)
      )
    );
  }

  // userValue
  {
    console.log("userValue");
    console.log(
      formatUnits(await singleFarmingVault.underlyingAmountValue(1, true))
    );
  }

  // pendingValue
  {
    console.log("pendingValue");
    console.log(
      formatUnits(await singleFarmingVault.underlyingAmountValue(1, true))
    );
  }
  // withdrawTo
  {
    await singleFarmingVault
      .connect(accounts[1])
      .withdrawTo(accounts[0].address, BigInt(1e18), true, {
        gasLimit: 40e4,
      });

    console.log("withdraw dyWavax from SingleFarmingVault");
    await getTotalSupply(dyWavax);
    await getBalance(wavax, accounts[0].address, "WAVAX");
  }
  // earn
  {
    await dyWavax.connect(accounts[0]).earn({
      gasLimit: 40e4,
    });
  }
}

createVault(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
