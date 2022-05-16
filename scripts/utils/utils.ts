import { ethers, network } from "hardhat";
import { ERC20_ABI } from "../../utils/abi";
import { formatUnits } from "ethers/lib/utils";

export async function getBalance(
  contract: any,
  account: string,
  tokenName?: string
) {
  const balance = formatUnits(await contract.balanceOf(account));
  console.log(tokenName + "balance : " + balance);
  return balance;
}

export async function getTotalSupply(
  contract: any
) {
  const totalSupply = formatUnits(await contract.totalSupply());
  console.log((await contract.symbol()) + "totalSupply : " + totalSupply);
  return totalSupply;
}

export async function getUserValue(contract: any, address: string, dp: boolean) {
  const userVaule = formatUnits(await contract.userValue(address, dp));
  console.log("user value is : " + userVaule);
  return userVaule;
}