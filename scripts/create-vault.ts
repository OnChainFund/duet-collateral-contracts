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
  const singleFarmingVault = await ethers.getContract("SingleFarmingVault");

  // initialize the vault
  singleFarmingVault.initialize(_controller,_feeConf,_underlying);



}

createVault([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
