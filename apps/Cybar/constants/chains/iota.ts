
import { type Chain } from 'viem'

export const iotaEvm = {
  id: 8822,
  name: 'IOTA EVM',
  nativeCurrency: { name: 'IOTA', symbol: 'IOTA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://json-rpc.evm.iotaledger.net'] },
  },
  blockExplorers: {
    default: { name: 'IOTA EVM Explorer', url: 'https://explorer.evm.iota.org' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1,
    },
  },
} as const satisfies Chain
