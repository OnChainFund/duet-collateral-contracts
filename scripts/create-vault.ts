import { ethers, network } from "hardhat";
import {
  developmentChains,
  VOTING_DELAY,
  proposalsFile,
  FUNC,
  PROPOSAL_DESCRIPTION,
  NEW_STORE_VALUE,
} from "../helper-hardhat-config";
import * as fs from "fs";
import { moveBlocks } from "../utils/move-blocks";

export async function createVault(
  args: any[],
  functionToCall: string,
  proposalDescription: string
) {
  const appController = await ethers.getContract("AppController");
  const feeConf = await ethers.getContract("FeeConf");
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");
  const usdc = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";

  // initialize the vault
  singleFarmingVault.initialize(appController, feeConf, usdc);
}

createVault([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
