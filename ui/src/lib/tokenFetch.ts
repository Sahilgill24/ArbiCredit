import axios from "axios";
import { Token } from "./types";
import { UI_TOKEN_ICONS } from "./ui-icon-mappings";
interface TokenData {
    id: number;
    name: string;
    symbol: string;
    contracts: string[];
    blockchains: string[];
    twitter: string;
    website: string;
    logo: string;
    price: number;
    market_cap: number;
    liquidity: number;
    volume: number;
    description: string;
    kyc: string;
    audit: string;
    total_supply_contracts: string[];
    total_supply: number;
    circulating_supply: number;
    circulating_supply_addresses: string[];
    discord: string;
    max_supply: number;
    chat: string;
}



export async function tokenMetaDataFetch(symbol: string, chain: string):Promise<Token> {
    if(symbol === "ETH"){
        return {
            address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            decimals: 18,
            symbol: "ETH",
            name: "ETH",
            logo:UI_TOKEN_ICONS["eth"]
        }
    }
    const res = await axios.get(`https://api.mobula.io/api/1/multi-metadata?assets=${symbol}&blockchain=${chain.toLowerCase()}`,{
        headers:{
            Accept: "application/json",
        }
    });
    console.log(symbol)
    const tokenData : TokenData= res.data.data;
    console.log(tokenData)
    return {
        address: tokenData.contracts[0],
        decimals: symbol === "USDC" ? 6 : 18,
        symbol: tokenData.symbol,
        name: tokenData.name,
        logo: tokenData.logo,
    }
}