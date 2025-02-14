import { ethers } from "ethers";
import { Agent, Wallet } from "@coinbase/agent-kit";
import { getPythPrice } from "@pythnetwork/client";
import dotenv from "dotenv";

dotenv.config();

const RPC_URL = "https://sepolia-rollup.arbitrum.io/rpc";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RECEIVER_ADDRESS = "0xReceiverAddressHere";
const TOKEN_ADDRESS = "0xTokenContractAddressHere";
const PRICE_FEED_ID = "0xPythPriceFeedIdHere";
const PRICE_DROP_THRESHOLD = 0.05; // 5% drop
const TRANSFER_AMOUNT = ethers.utils.parseUnits("10", 18); // Adjust accordingly

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);
const agent = new Agent(wallet);
const tokenContract = new ethers.Contract(
    TOKEN_ADDRESS,
    ["function transfer(address to, uint256 amount) public returns (bool)"],
    wallet
);

async function monitorPrice() {
    let lastPrice = await getPythPrice(PRICE_FEED_ID, provider);
    console.log(`Initial price: ${lastPrice}`);

    setInterval(async () => {
        try {
            let newPrice = await getPythPrice(PRICE_FEED_ID, provider);
            console.log(`New price: ${newPrice}`);

            if (newPrice < lastPrice * (1 - PRICE_DROP_THRESHOLD)) {
                console.log("Price dropped significantly! Initiating token transfer...");
                await transferTokens();
            }
            lastPrice = newPrice;
        } catch (error) {
            console.error("Error fetching price: ", error);
        }
    }, 60000); // Check every 60 seconds
}

async function transferTokens() {
    try {
        const tx = await tokenContract.transfer(RECEIVER_ADDRESS, TRANSFER_AMOUNT);
        console.log("Transaction sent: ", tx.hash);
        await tx.wait();
        console.log("Transaction confirmed!");
    } catch (error) {
        console.error("Error transferring tokens: ", error);
    }
}

monitorPrice();
