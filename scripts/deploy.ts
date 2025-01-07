import { ethers } from "ethers";
import { abi, bytecode } from "../artifacts/contracts/Mememachu.sol/Mememachu.json";

async function main() {
  const provider = new ethers.JsonRpcProvider('http://localhost:3000');
  const deployer = new ethers.Wallet('cdc12382a0890443eebea0d5f56d4f2207acc02e35f646cf434987340cfe5ed0', provider);
  const Mememachu = new ethers.ContractFactory(abi, bytecode, deployer);
  const mememachu = await Mememachu.deploy();
  await mememachu.waitForDeployment();

  console.log("Mememachu deployed to:", await mememachu.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});