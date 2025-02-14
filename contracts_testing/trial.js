const ethers = require('ethers');

const abi = [{ "inputs": [{ "internalType": "uint32", "name": "seed", "type": "uint32" }], "name": "initializeNetwork", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "int32", "name": "x0", "type": "int32" }, { "internalType": "int32", "name": "x1", "type": "int32" }, { "internalType": "int32", "name": "x2", "type": "int32" }], "name": "predict", "outputs": [{ "internalType": "int32", "name": "", "type": "int32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "_interface", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "int32", "name": "x0", "type": "int32" }, { "internalType": "int32", "name": "x1", "type": "int32" }, { "internalType": "int32", "name": "x2", "type": "int32" }, { "internalType": "int32", "name": "target", "type": "int32" }, { "internalType": "uint32", "name": "learning_rate", "type": "uint32" }], "name": "trainSample", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const abi2 = [{ "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "_interface", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "deploy_addr", "type": "address" }, { "internalType": "uint32", "name": "credit_score", "type": "uint32" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]
// this is the address for the credit score generator Contract
const contractaddress = '0xB53E69dCF35E0b9789B5a9e64685244b1Ccced33'
const nftcontractaddress = '0x3b192B43bB38C9a48be7110ef5763AebA405B150'
// this is for the NFT contract 
const provider = new ethers.providers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc');
const signer = new ethers.Wallet('20703a5b719e0184bc11f9f6be2a8adfebdc0c27fd7115b132f89ef0dddc8888', provider);


const contract = new ethers.Contract(contractaddress, abi, signer);
const contract2 = new ethers.Contract(nftcontractaddress, abi2, signer);

async function main() {
    let tx = await contract.initializeNetwork(1);
    let tx2 = await contract.mint('0x34b596649da46456420DF1f927062D881dB6d208')

    // mint and initializeNetwork functions are working
    let tx3 = await contract.predict(5000, 200, 3000);
    console.log(await tx3);
    console.log(tx3)
    // predict also working 
    let tx4 = await contract2.mint('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4')
    let tx5 = await contract2.tokenURI('0x8F26D683822E60d522b58f7DB63D352CB7FAe6e4', 562)
    console.log(await tx5)
    if (tx5.startsWith('data:application/json;base64,')) {
        const json = atob(tx5.split(',')[1]);
        const parsed = JSON.parse(json);
        console.log(parsed)

    }


}

main();