import { createThirdwebClient, defineChain, getContract } from "thirdweb";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

export const CHAIN = defineChain(80002);

const CONTRACT_ADDRESS = "0xb4B100392Acf1DB428A4482c1bAC70C8DCc9ebaf";

export const contract = getContract({
  client: client,
  address: CONTRACT_ADDRESS,
  chain: CHAIN,
});
