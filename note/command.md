run script with local network
```
yarn hardhat --network localhost run scripts/create-vault.ts
yarn hardhat --network localhost run scripts/
```

run hardhat local testnet
```
yarn hardhat node
```

script
```
yarn hardhat run scripts/single-farming-vault.ts --network localhost

yarn hardhat run scripts/mint-vault.ts --network localhost          

yarn hardhat run scripts/app-controller.ts --network localhost          
```

hardhat-tracer
```
yarn hardhat trace --hash "0x800b1812de3d688649e9f2a453029ec00309b2dd3f9d2d86aba6591cc2293edc" --network localhost

// full trace
yarn hardhat trace --fulltrace --hash "0x37b12e1a74721d562e29974090d2d8e3e60a72f1d730f59a436469a1b9edc587" --network localhost

```