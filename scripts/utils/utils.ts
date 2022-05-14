import { ethers, network } from "hardhat";
import { ERC20_ABI } from "./utils/abi";
import { formatUnits } from "ethers/lib/utils";

export async function getBalance(contract: any, account: string) {
  const balance = formatUnits(
    await contract.balanceOf(account)
  );
  console.log(balance);
  return balance;
}
