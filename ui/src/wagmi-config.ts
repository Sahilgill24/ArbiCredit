import { http, createConfig } from 'wagmi'
import { arbitrum, arbitrumSepolia, mainnet, sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [arbitrum],
  connectors: [metaMask()],
  transports: {
    [arbitrum.id]: http(),
  },
})