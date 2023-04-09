import "@openzeppelin/hardhat-upgrades";
import { ethers, upgrades } from "hardhat";

async function main() {
  // TODO Check this address is right before deploying.
  const deployedProxyAddress = "0x7A9Ec1d04904907De0ED7b6839CcdD59c3716AC9";

  const GameEngineV2 = await ethers.getContractFactory("GameEngineV2");
  console.log("Upgrading GameEngine...");

  await upgrades.upgradeProxy(deployedProxyAddress, GameEngineV2);
  console.log("GameEngine upgraded");
}

main();
