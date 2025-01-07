import { createPublicClient, http, Block } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http("https://eth-sepolia.g.alchemy.com/v2/j5_h17S94LFYB4NGR2S9SuPbf-4U3W4Q"),
});

export async function getBlock(blockNumber: bigint): Promise<Block> {
  const block = await client.getBlock({
    blockNumber,
  });
  return block;
}

export { client }; 