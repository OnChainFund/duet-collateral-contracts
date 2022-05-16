## 部署
以下會按順序,並且詳細寫入實作細節
### AppController
使用到兩個可升級合約：
- proxy/utils/Initializable.sol
- access/OwnableUpgradeable.sol
[源碼位置](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable)

刪除 Duet.sol (平台代幣(目前用不到))


merge 了一次
加入依賴
```
yarn add --dev @uniswap/v2-core
```


遇到
Error: Transaction reverted without a reason string
-> 要使用 dyToken 才能使用 singleFarmingVault

feeConf->有配對 vault->跳過

把 dyToken 的初始條件降低(原本的最少 10000 顆 token 降低到最少 100 顆)

## Error: VM Exception while processing transaction: reverted with reason string 'DEPOSITE_DISABLE'
```
//AppController.sol
function beforeDeposit(address , address _vault, uint) external view {
  VaultState memory state =  vaultStates[_vault];
  require(state.enabled && state.enableDeposit, "DEPOSITE_DISABLE");
}
```
試著把state.enabled 和state.enableDeposit 轉乘 true

## Error: VM Exception while processing transaction: reverted with reason string 'VALIDVAULT_UNINIT'
-> use AppController to initValidVault
-> write in deploy script

## Error: Transaction reverted: function call to a non-contract account (when withdraw)