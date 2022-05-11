## 5/10
## 部署
以下會按順序,並且詳細寫入實作細節
### AppController
使用到兩個可升級合約：
- proxy/utils/Initializable.sol
- access/OwnableUpgradeable.sol
[源碼位置](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable)

刪除 Duet.sol (平台代幣(目前用不到))

## 5/11 
merge 了一次
加入依賴
```
yarn add --dev @uniswap/v2-core
```