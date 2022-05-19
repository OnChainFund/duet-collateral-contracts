import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { ethers } from "hardhat";
import { WAVAX, AVAX_USD_CHAINLINK } from "../utils/const";

const deploySingleTokenUsdOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const accounts = await hre.ethers.getSigners();
  // deploy
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("----------------------------------------------------");
  log("Deploying SingleTokenUsdOracle and waiting for confirmations...");
  const singleTokenUsdOracle = await deploy("SingleTokenUsdOracle", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  });
  log(`SingleTokenUsdOracle at ${singleTokenUsdOracle.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(singleTokenUsdOracle.address, []);
    log(`Verified contract ${singleTokenUsdOracle.address}`);
  }

  // setOracle
  const singleTokenUsdOracleContract = await ethers.getContract(
    "SingleTokenUsdOracle"
  );
  await singleTokenUsdOracleContract
    .connect(accounts[0])
    .setOracle(WAVAX, AVAX_USD_CHAINLINK, {
      gasLimit: 20e4,
    });
  console.log("setOracle");
};

export default deploySingleTokenUsdOracle;
deploySingleTokenUsdOracle.tags = ["all", "controller"];
