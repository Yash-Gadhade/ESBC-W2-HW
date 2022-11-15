import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
import { getContractAddress } from "ethers/lib/utils";
import { Ballot, Ballot__factory } from "../typechain-types";

// import abi from "../scripts/Ballot.json";
import abi from "../artifacts/contracts/Ballot.sol/Ballot.json";

dotenv.config();

const CONTRACT_ADDRESS = "0xea078cd23f71492a45629eaeefc44ff5c0a7f3f4";

const PROPOSALS_COUNT = 3;

const contractABI = abi.abi;

async function main() {
  const provider = ethers.getDefaultProvider("goerli");

  let contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

  console.log("-----Results-----");
  console.log(`Name ---> Votes`);

  for (let i = 0; i <= PROPOSALS_COUNT; i++) {
    const data = await contract.proposals(i);
    const name = ethers.utils.parseBytes32String(data.name);
    const votes = data.voteCount;

    console.log(`${name} ---> ${votes}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
