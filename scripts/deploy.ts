import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with address: ", deployer.address);

  const baseUri =
    "ipfs://bafybeibeppt6l46borcfoinfzhavjjsvew7upenttai75yvmfxl3hmp7oy";

  const SuperSayanNFT = await ethers.getContractFactory("SuperSayanNFT");
  const superSayanNFTDeploy = await SuperSayanNFT.deploy(baseUri);

  await superSayanNFTDeploy.deployed();

  console.log(`SuperSayan deployed to ${superSayanNFTDeploy.address}`);

  const Market = await ethers.getContractFactory("Market");
  const marketDeploy = await Market.deploy();
  await marketDeploy.deployed();

  console.log(`Market deployed to ${marketDeploy.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
