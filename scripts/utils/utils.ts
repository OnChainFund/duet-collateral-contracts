import { ethers, network } from "hardhat";
import { ERC20_ABI } from "./abi";
import { formatUnits } from "ethers/lib/utils";

export async function getBalance(
  contract: any,
  account: string,
  tokenName: string
) {
  const balance = formatUnits(await contract.balanceOf(account));
  console.log(tokenName + "balance : " + balance);
  return balance;
}
