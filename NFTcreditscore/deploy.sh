cargo stylus check -e https://sepolia-rollup.arbitrum.io/rpc

cargo stylus deploy -e https://sepolia-rollup.arbitrum.io/rpc --private-key 20703a5b719e0184bc11f9f6be2a8adfebdc0c27fd7115b132f89ef0dddc8888 --no-verify

cargo stylus export-abi --json --output contract.abi
## to check the contract ,estimate the gas , deploy the contract and estimate the gas 

