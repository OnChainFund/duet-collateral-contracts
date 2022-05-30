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
  // addMiner
  // add minter (accounts[0]) to dtoken
  await dusd.connect(accounts[0]).addMiner(accounts[0].address, {
    gasLimit: 20e4,
    //gasPrice: 20e14,
  });
  console.log("add minter accounts[0]");
  // removeMiner
  await dusd.connect(accounts[0]).removeMiner(accounts[0].address, {
    gasLimit: 20e4,
    //gasPrice: 20e14,
  });
  console.log("remove minter accounts[0]");
  await dusd.connect(accounts[0]).addMiner(accounts[0].address, {
    gasLimit: 20e4,
    //gasPrice: 20e14,
  });
  // mint
  await dusd.connect(accounts[0]).mint(accounts[0].address, BigInt(3e18), {
    gasLimit: 20e4,
    //gasPrice: 20e14,
  });
  await getBalance(dusd, accounts[0].address, "DUSD");
  // burn
  await dusd.connect(accounts[0]).burn(BigInt(1e18), {
    gasLimit: 20e4,
    //gasPrice: 20e14,
  });
  await getBalance(dusd, accounts[0].address, "DUSD");
  // send
  // await dusd
  //   .connect(accounts[0])
  //   .send(accounts[1].address, BigInt(1e18), "", {
  //     gasLimit: 20e4,
  //     //gasPrice: 20e14,
  //   });
  // await getBalance(dusd, accounts[0].address, "DUSD");
  // await getBalance(dusd, accounts[1].address, "DUSD");
}

createVault(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
