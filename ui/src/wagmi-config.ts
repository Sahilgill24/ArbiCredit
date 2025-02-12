import { http, createConfig } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

import {
    type Chain
} from 'viem'



export const ArbitrumSepolia = {
    id: 42161,
    name: 'Arbitrum Sepolia',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: ['https://api.zan.top/arb-sepolia']
        },
    },
    blockExplorers: {
        default: {
            name: 'Arbitrum Explorer',
            url: 'https://sepolia.arbitrum.io'
        },
    },
}
export const Config = createConfig({
    chains: [ArbitrumSepolia],
    connectors: [
        metaMask()]
    ,
    transports: {
        [ArbitrumSepolia.id]: http(),
    },
});