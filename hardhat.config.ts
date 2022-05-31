import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
//
import "hardhat-gas-reporter";
import "dotenv/config";
import "solidity-coverage";
import "hardhat-deploy";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";
import "hardhat-tracer";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

task("height", "Print the current block height").setAction(
  async (taskArgs, hre) => {
    const block_height = await hre.web3.eth.getBlockNumber();
    console.log(`The current block height is ${block_height}`);
  }
);
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",

  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    //    hardhat: {
    //      chainId: 31337,
    //      allowUnlimitedContractSize: true,
    //    },
    hardhat: {
      forking: {
        url: "https://api.avax.network/ext/bc/C/rpc",
        // ava lab 的 url, 也可以放自己的歸檔節點
        blockNumber: 14543500,
        enabled: true,
      },
    },
    localhost: {
      forking: {
        url: "https://api.avax.network/ext/bc/C/rpc",
        // ava lab 的 url, 也可以放自己的歸檔節點
        blockNumber: 14543500,
        enabled: true,
      },
    },
    fuji: {
      chainId: 43113,
      gasPrice: 225000000000,
      url: "https://api.avax-test.network/ext/bc/C/rpc",
    },
  },
  tracer: {
    nameTags: {
      ["0x3b7157E5E732863170597790b4c005436572570F"]: "TokenSale",
      ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"]: "WrappedEther",
      ["0xe760f546a925a4cfdcc62a674d14cc42a676c06f"]: "Someone",
    },
  },
};

export default config;
