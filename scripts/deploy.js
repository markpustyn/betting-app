//Matthew Farr
const { ethers } = require("hardhat");

async function main() {
  // get the contract
  const PredictionMarket = await ethers.getContractFactory("PredictionMarket");

  // deploy it
  const contract = await PredictionMarket.deploy();

  // wait for deployment
  await contract.waitForDeployment();

  // print address
  const address = await contract.getAddress();
  console.log("PredictionMarket deployed to:", address);
}

// run it
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});