import { ethers } from "hardhat";
import { WAVAX_ABI } from "./abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { getBalance } from "./utils";

const hre = require("hardhat");
export async function wavax(hre: HardhatRuntimeEnvironment) {
  const accounts = await hre.ethers.getSigners();
  const WAVAX = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";

  const wavaxContract = new ethers.Contract(WAVAX, WAVAX_ABI, ethers.provider);

  await getBalance(wavaxContract, accounts[0].address);
  await wavaxContract
    .connect(accounts[0])
    .deposit({ value: 1000, gasPrice: 20e12 });
  await getBalance(wavaxContract, accounts[0].address);
}

wavax(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
