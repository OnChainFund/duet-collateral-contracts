## vault 
### IVault
interface:
- 查看數量
- 計算總額
- 清算

### IDepositVault
interface (有點 mixin 的感覺)
- deposit
- deposits ?
- depositTo
- syncDeposit
- withdraw
- withdrawTo


### DepositVaultBase
- init
- isDuetVault
- underlyingTransferIn
- underlyingTransferOut
- setFeeConf
- setAppController
- setVaultFarm
- _deposit
- _withdraw
- _liquidate
- _updateJoinStatus