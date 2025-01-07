// Note: Convert TypeScript syntax to JavaScript if present
async function main() {
  const MyNFT = await ethers.getContractFactory("Mememachu");
  const myNFT = await MyNFT.deploy();
  await myNFT.waitForDeployment();
  console.log("Contract deployed to:", await myNFT.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
