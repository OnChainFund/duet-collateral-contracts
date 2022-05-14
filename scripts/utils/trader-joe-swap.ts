import { ethers, network } from "hardhat";
import { UNISWAPV2_ROUTER02_ABI } from "./abi";
export async function test() {
  const JOE_ROUTER = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4";

  const WAVAX = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
  const PTP = "0x22d4002028f537599bE9f666d1c4Fa138522f9c8";

  const traderJoe = new ethers.Contract(
    JOE_ROUTER,
    UNISWAPV2_ROUTER02_ABI,
    ethers.provider
  );

  let amountEthFromContract = await traderJoe.getAmountsOut(
    1000, // 1 ETH
    [PTP, WAVAX]
  );

  console.log(`1000 PTP = ${amountEthFromContract[1].toString()} WAVAX`);
}

test()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
