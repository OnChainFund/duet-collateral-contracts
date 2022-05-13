import { ethers, network } from "hardhat";
import { ERC20_ABI, WAVAX_ABI } from "./abi";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@typechain/hardhat";
import { formatUnits } from "ethers/lib/utils";

const hre = require("hardhat");
export async function wavax(hre: HardhatRuntimeEnvironment) {
  const JOE_ROUTER = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4";

  const accounts = await hre.ethers.getSigners();

  const WAVAX = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
  const PTP = "0x22d4002028f537599bE9f666d1c4Fa138522f9c8";

  const wavaxContract = new ethers.Contract(WAVAX, WAVAX_ABI, ethers.provider);

  const balance = formatUnits(
    await wavaxContract.balanceOf(accounts[0].address)
  );
  console.log(balance);

  await wavaxContract
    .connect(accounts[0])
    .deposit({ value: 1000, gasPrice: 20e12 });
  const balance2 = formatUnits(
    await wavaxContract.balanceOf(accounts[0].address)
  );
  console.log(balance2);
}

wavax(hre)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
