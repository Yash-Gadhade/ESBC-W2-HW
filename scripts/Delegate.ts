import { ethers } from "hardhat";
import * as dotenv from 'dotenv'
import { Ballot, Ballot__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import prompt from "prompt-sync";

dotenv.config()

const showPrompt = prompt();

async function main() {
    const accounts: SignerWithAddress[] = await ethers.getSigners();
    const signer = accounts[0];
    const balanceBN = await signer.getBalance();
    console.log(`Connected to account of address ${signer.address}
    \n This account has a balance of ${balanceBN.toString()} Wei`);

    const contractAddress = showPrompt("Please enter the contract address: ");
    let ballotContract: Ballot;
    const ballotContractFactory = new Ballot__factory(signer);
    ballotContract = ballotContractFactory.attach(contractAddress);

    const targetAccount = showPrompt("Please enter the delegate account address: ");
    const tx = await ballotContract.delegate(targetAccount);
    console.log("Waiting for transaction confirmation...");
    const receipt = await tx.wait();
    console.log(`TRANSACTION SUCCESSFULL!\n ${receipt}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});