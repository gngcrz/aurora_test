NETWORK=testnet_aurora

deploy_token:
	yarn hardhat run scripts/deploy_token.js --network ${NETWORK}

deploy_gate:
	yarn hardhat run scripts/deploy_gate.js --network ${NETWORK}
