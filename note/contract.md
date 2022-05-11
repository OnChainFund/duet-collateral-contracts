## app

### AppController
控制 app 的大大小小動作

方法：
- initialize: 初始化
- setDYToken: 為某個資產設定其 dyToken 的地址
- setStrategy: 為某個資產設定策略合約的地址(ex. pancake)
- emergencyWithdrawAll: 緊急取出所有的特定資產
- setOpenLiquidate: 更改開放清算的狀態(ex.從開放清算改變到不開放清算)
- updateAllowedLiquidator: 更新許可的清算者狀態
- setLiquidateRate: 設置清算比例
- setCollateralRate: 設置抵押比例
- setOracles: 允许为每个底层资产设置不同的价格预言机 折扣率(dr)、溢价率(pr)
- getValueConfs: 獲取兩個 token 分別的预言机 折扣率(dr)、溢价率(pr)
- getValueConf:獲取單個 token 分別的预言机 折扣率(dr)、溢价率(pr)
- setVault: 為 dyToken 設定 vault 的 address
  - vtype 1 : for deposit vault 2: for mint vault
  - 也可用於更新 dyToken 的 vault
- joinVault: 使用者參與 vault ?
- exitVault: 使用者退出 vault ?
- setVaultStates: 設定 Vault 的狀態
- userJoinedVaultInfoAt: 使用者參與的 vault 的資訊
- userJoinedVaultCount: 使用者參與的 vault 數目
- maxBorrow: 用户最大可借某 Vault 的资产数量
- userValues: 获取用户Vault价值
- userPendingValues: 预测用户更改Vault后的价值
- isNeedLiquidate: 判断该用户是否需要清算
- accVaultVaule: 获取用户Vault準確總价值(給userValues調用)
- accPendingValue: 预测用户更改Vault后的準確總价值(給userPendingValues調用)
- beforeDeposit: 存款前风控检查
- beforeBorrow: 借款前风控检查
- beforeWithdraw: 提領前风控检查
- beforeRepay: 還款前风控检查
- liquidate: 清算
  - 符合條件
    - 是開放清算的或是清算人是核可過的清算人
    - 借款人符合被清算的條件
- beforeLiquidate: 清算前风控检查
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

### SingleFarmingVault
- public
  - underlyingAmountValue
- initialize
- underlyingTransferIn
- underlyingTransferOut
- deposit
- depositTo
- syncDeposit
- withdraw
- withdrawTo