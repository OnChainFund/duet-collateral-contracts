import { ethers, network } from "hardhat";
import { ERC20_ABI } from "../../utils/abi";
import { formatUnits } from "ethers/lib/utils";

export async function getBalance(
  contract: any,
  account: string,
  tokenName?: string
) {
  const balance = formatUnits(await contract.balanceOf(account));
  console.log(tokenName + " balance : " + balance);
  return balance;
}

export async function getTotalSupply(contract: any) {
  const totalSupply = formatUnits(await contract.totalSupply());
  console.log((await contract.symbol()) + "totalSupply : " + totalSupply);
  return totalSupply;
}

export async function getUserValue(
  contract: any,
  address: string,
  dp: boolean
) {
  const userVaule = formatUnits(await contract.userValue(address, dp));
  const userValueUSD = Number(userVaule) * 1e10;
  console.log("user value is : " + userValueUSD);
  return userValueUSD;
}
export async function accValidVaultVaule(
  contract: any,
  userWallet: string,
  dp: boolean
) {
  const accValidVaultVaule = formatUnits(
    await contract.accValidVaultVaule(userWallet, dp)
  );
  const accValidVaultVauleUSD = Number(accValidVaultVaule) * 1e10;
  console.log("acctual valid vault is : " + accValidVaultVauleUSD);
  return accValidVaultVauleUSD;
}
export async function getPrice(contract: any, address: string) {
  const priceString = formatUnits(await contract.getPrice(address));
  const priceNumber: number = Number(priceString) * 1e10;
  console.log("price is : " + priceNumber);
  return priceNumber;
}

export async function getDeposit(contract: any, address: string) {
  const deposit = formatUnits(await contract.deposits(address));
  console.log("deposit is : " + deposit);
  return deposit;
}

export async function borrow(contract: any, amount: number, userWallet: any) {
  await contract.connect(userWallet).borrow(BigInt(amount * 1e18), {
    gasLimit: 40e4,
    //gasPrice: 20e14,
  });
}
