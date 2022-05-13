import { ethers, network } from "hardhat";
export async function createVault() {
  const appController = await ethers.getContract("AppController");
  const feeConf = await ethers.getContract("FeeConf");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  // 理論上要使用 dytoken 這裡就會用一般的 token 代替
  const usdcAddress = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";
  const usdt = "0x8dA6A4e8bBfC9D0Casf9c8F1F2169C6c01FD6D068Dasdf"; // 錯誤的合約
  console.log(typeof (appController.address));
  console.log(feeConf.address);
  console.log(singleFarmingVault.address);
  // initialize the vault
  await appController.initialize();
 const usdc = new ethers.Contract(
   usdcAddress,
   UNISWAPV2_ROUTER02_ABI,
   ethers.provider
 ); 
  await singleFarmingVault.initialize(
    appController.address,
    feeConf.address,
    usdc
  );
  
  // deposit

  //await singleFarmingVault.deposit(usdc, 10);
  //await singleFarmingVault.deposit(usdt, 10);// 這行理論上應該要報錯,但沒有
  // depositTo
  //singleFarmingVault.depositTo(usdc, 10);
  //singleFarmingVault.deposit(usdc, 10);
  //singleFarmingVault.deposit(); //?
  // syncDeposit
  // withdraw
  // withdrawTo
  // liquidate
}

createVault()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
