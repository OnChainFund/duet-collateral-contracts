import { ethers } from "hardhat";
import { WAVAX_ABI } from "../utils/abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance } from "./utils/utils";
import { USDC, WAVAX, ZERO } from "../utils/const";
import { formatUnits } from "ethers/lib/utils";
const hre = require("hardhat");
export async function depositDYToken(hre: HardhatRuntimeEnvironment) {
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

  {
    // 換 wavax
    {
      await getBalance(wavax, accounts[0].address, "WAVAX");
      console.log("depositing AVAX to WAVAX");
      await wavax
        .connect(accounts[0])
        .deposit({ value: BigInt(2e18), gasPrice: 20e12 });
      await getBalance(wavax, accounts[0].address, "WAVAX");
    }
    // 換 dytoken
    await wavax.connect(accounts[0]).approve(dyWavax.address, BigInt(1e18));
    await dyWavax.connect(accounts[0]).deposit(BigInt(1e18), ZERO, {
      gasLimit: 40e4,
      //gasPrice: 20e14,
    });
    await getBalance(dyWavax, accounts[0].address, "DYWAVAX");
  }
  // dyToken funcitons
  {
    // underlyingTotal
    {
      console.log("get underlyingTotal 1");
      console.log(formatUnits(await dyWavax.underlyingTotal()));
      {
        // deposit 進 singleFarmingVault

        console.log("get underlyingTotal 2");
        await wavax.connect(accounts[0]).approve(dyWavax.address, BigInt(1e18));
        await dyWavax
          .connect(accounts[0])
          .deposit(BigInt(1e18), singleFarmingVault.address, {
            gasLimit: 40e4,
            //gasPrice: 20e14,
          });
        console.log(formatUnits(await dyWavax.underlyingTotal()));
      }
    }
    {
      // underlyingAmount
      console.log("get underlyingAmount ");
      console.log(formatUnits(await dyWavax.underlyingAmount(BigInt(1e18))));
    }
    // balanceOfUnderlying
    console.log("get balanceOfUnderlying of account[0]");
    console.log(
      formatUnits(await dyWavax.balanceOfUnderlying(accounts[0].address))
    );
    // pricePerShare
    console.log("get price per share");
    console.log(formatUnits(await dyWavax.pricePerShare()));
  }
}

depositDYToken(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
