import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import { Ballot, Ballot__factory } from "../typechain-types";
import prompt from "prompt-sync";

dotenv.config();

const showPrompt = prompt();

async function main() {
  const availableWallets: SignerWithAddress[] = await ethers.getSigners();
  const wallet = availableWallets[0];
  const balanceBN = await wallet.getBalance();
  console.log(`Connected to account of address ${wallet.address}
  \n This account has a balance of ${balanceBN.toString()} Wei`);

  let ballotContract: Ballot;
  const ballotContractFactory = new Ballot__factory();
  const contractAddress = showPrompt("Please enter the contract address: ");

  ballotContract = ballotContractFactory.attach(contractAddress);

  const proposalIndex = showPrompt(
    "Please enter the index of the proposal you want to vote for: "
  );

  try {
    const tx = await ballotContract.vote(proposalIndex);
    console.log("Waiting for transaction confirmation...");
    const receipt = await tx.wait();
    console.log("Success", receipt);
  } catch (error) {
    console.error(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
