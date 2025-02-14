const ethers = require('ethers');

const abi = [{ "inputs": [{ "internalType": "uint32", "name": "seed", "type": "uint32" }], "name": "initializeNetwork", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "int32", "name": "x0", "type": "int32" }, { "internalType": "int32", "name": "x1", "type": "int32" }, { "internalType": "int32", "name": "x2", "type": "int32" }], "name": "predict", "outputs": [{ "internalType": "int32", "name": "", "type": "int32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "_interface", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "int32", "name": "x0", "type": "int32" }, { "internalType": "int32", "name": "x1", "type": "int32" }, { "internalType": "int32", "name": "x2", "type": "int32" }, { "internalType": "int32", "name": "target", "type": "int32" }, { "internalType": "uint32", "name": "learning_rate", "type": "uint32" }], "name": "trainSample", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const contractaddress = '0xB53E69dCF35E0b9789B5a9e64685244b1Ccced33'
const provider = new ethers.providers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc');
const signer = new ethers.Wallet('20703a5b719e0184bc11f9f6be2a8adfebdc0c27fd7115b132f89ef0dddc8888', provider);


const contract = new ethers.Contract(contractaddress, abi, signer);

async function main() {
    let tx = await contract.initializeNetwork(1);
    let tx2 = await contract.mint('0x34b596649da46456420DF1f927062D881dB6d208')
    
    // mint and initializeNetwork functions are working
    let tx3 = await contract.predict(1400, 200, 30);
    console.log(await tx3);
    // predict also working 

}

main();