TODO:
## 操作
### Vault
- [ ] 操作 vault code
  - [ ] SingleFarmingVault 所有功能
    - [x] initialize
    - [x] deposit
    - [x] depositTo
    - [x] syncDeposit
    - [x] withdraw
    - [x] withdrawTo
    - [x] withdrawCall
    - [ ] liquidate (later (要借款後才能))
    - [ ] underlyingAmountValue
    - [ ] userValue
    - [ ] pendingValue
  - [x] LpFarmingVault 所有功能
    - [ ] initialize
    - [x] deposit
    - [x] depositTo
    - [x] syncDeposit
    - [x] withdraw
    - [x] withdrawTo
    - [x] withdrawCall
    - [ ] liquidate
    - [ ] underlyingAmountValue
    - [ ] userValue
    - [ ] pendingValue
  - [ ] MintVault 所有功能
    - internal
      - [ ] underlyingMint
      - [ ] underlyingBurn
    - external
      - borrow
      - tokensReceived
      - repay
      - repayTo
      - liquidate
      - valueToAmount
      - underlyingAmountValue
      - userValue
      - pendingValue
  - [ ] BTCMintVault 所有功能

### Strategy
- [ ] 操作 strategy
  - [ ] BaseStrategy
    - [ ] setMinHarvestAmount
    - [ ] setController
    - [ ] setFeeConf
    - [ ] inCaseTokensGetStuck (token 被暫停的時候,管理員手動去做)
    - [ ] safeTransfer
  - [ ] Strategy2ForPancakeLP 所有功能
    - [ ] doApprove
    - [ ] balanceOfPool
    - [ ] pendingOutput
    - [ ] deposit
    - [ ] harvest
    - [ ] withdraw
    - [ ] withdrawAll
    - [ ] emergency
    - [ ] setToken0Path
    - [ ] setToken1Path
  - [ ] Strategy2ForCake 所有功能 (功能還並不完善?)
    - [ ] balanceOfPool
    - [ ] pendingOutput
    - [ ] deposit
    - [ ] withdraw
    - [ ] withdrawAll
    - [ ] emergency
    - [ ] sendYieldFee
- [ ] 操作 app code
  - [ ] AppController 所有功能
  - [x] DYTokenERC20 所有功能
    - [x] deposit
    - [x] depositTo
    - [x] withdraw
    - [ ] earn (later -> after strategy)
  - [x] DYTokenBase 所有功能
    - [x] decimals
    - [x] burn
    - [x] send
    - [x] setController
    - [x] underlyingTotal
    - [x] underlyingAmount
    - [x] balanceOfUnderlying
    - [x] pricePerShare
  - [ ] FeeConf 所有功能


## Test

### 單元測試
### 整合測試