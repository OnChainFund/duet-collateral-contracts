## openzeppelin-contracts-upgradeable

### Initializable.sol
#### 簡介
這是一個基礎合約，用於幫助編寫可升級合約，或任何類型的將部署在代理後面的合約。
由於代理合約不使用構造函數，因此通常將構造函數邏輯移動到外部初始化函數，通常稱為“initialize”(初始化)。
然後有必要保護這個初始化函數，使它只能被調用一次。
此合約提供的 {initializer} 修飾符將具有此效果。
初始化函數使用版本號。
一旦使用了版本號，它就會被消耗掉並且不能被重用。
此機制可防止重新執行每個“步驟”，但允許創建新的初始化步驟，以防升級添加需要初始化的模塊。

範例：
```
contract MyToken is ERC20Upgradeable {
    function initialize() initializer public {
        __ERC20_init("MyToken", "MTK");
    }
}
contract MyTokenV2 is MyToken, ERC20PermitUpgradeable {
    function initializeV2() reinitializer(2) public {
        __ERC20Permit_init("MyToken");
    }
}
```

提示：為避免讓代理處於未初始化狀態，應儘早調用初始化函數，方法是將編碼函數調用作為 {ERC1967Proxy-constructor} 的 `_data` 參數提供。
注意：當與繼承一起使用時，必須手動注意不要調用父初始化程序兩次，或者確保所有初始化程序都是冪等的。
這不會自動驗證，因為構造函數是由 Solidity 進行的。

避免讓合同未初始化。
攻擊者可以接管未初始化的合約。
這適用於代理及其實施合同，這可能會影響代理。
為了防止使用實現合約，您應該在構造函數中調用 {_disableInitializers} 函數以在部署時自動鎖定它：
```
/// @custom:oz-upgrades-unsafe-allow constructor
constructor() {
    _disableInitializers();
}
```
#### 重點
- 修飾器
- 方法

##### 修飾器
- initializer
- reinitializer
- onlyInitializing

###### initializer
修飾符，它定義了一個受保護的初始化函數，最多可以調用一次。 在其範圍內，
`onlyInitializing` 函數可用於初始化父合約。 相當於`reinitializer(1)`

###### reinitializer
修飾符，它定義了一個最多可以調用一次的受保護的重新初始化函數，並且只有在合約之前沒有被初始化為更高版本的情況下。
在其範圍內，`onlyInitializing` 函數可用於初始化父合約。
`initializer` 等價於 `reinitializer(1)`，因此可以在原始初始化步驟之後使用重新初始化器。
這對於配置通過升級添加並需要初始化的模塊至關重要。
請注意，版本號必須要遞增； 
這意味著如果合約中同時存在多個重新初始化程序，則以正確的順序執行它們取決於開發人員或運營者。

傳入參數：版本號

###### onlyInitializin
用於保護初始化函數的修飾符，使其只能由具有 {initializer} 和 {reinitializer} 修飾符的函數直接或間接調用。

##### 方法
- _disableInitializers
- _setInitializedVersion

###### _disableInitializers
鎖定合約，防止任何未來的重新初始化。 
這不能是初始化程序調用的一部分。
在合約的構造函數中調用 this 將阻止該合約被初始化或重新初始化為任何版本。 建議使用它來鎖定旨在通過代理調用的實現合約。
內容：直接調用_setInitializedVersion並把他設定成 uint8 類型的最大值

###### _setInitializedVersion
如果合約正在初始化，我們會忽略是否設置了 _initialized 以支持多重繼承模式，但我們只在構造函數的上下文中這樣做，並且對於最低級別的初始化程序，因為在其他上下文中可能已經重新輸入了合約。


### ContextUpgradeable.sol
[link](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/utils/ContextUpgradeable.sol)

#### 簡介
提供有關當前執行上下文的信息，包括事務的發送者及其數據。 雖然這些通常可以通過 msg.sender 和 msg.data 獲得，但不應以這種直接方式訪問它們，因為在處理元交易時，發送和支付執行費用的帳戶可能不是實際的發送者（就 應用有關）。
只有中間的、類似庫的合約才需要此合約。


### OwnableUpgradeable.sol

#### 簡介
[link](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/access/OwnableUpgradeable.sol)
提供基本訪問控制機制的合約模塊，其中有一個帳戶（所有者）可以被授予對特定功能的獨占訪問權限。
默認情況下，所有者帳戶將是部署合約的帳戶。 這可以稍後通過 {transferOwnership} 進行更改。
該模塊通過繼承使用。
它將提供修飾符 `onlyOwner`，可以將其應用於您的函數以限制其對所有者的使用。

#### 重點
- 修飾器
- 方法

##### 修飾器
onlyOwner -> 修飾function,只有 onlyOwner 才有權限調用

##### 方法
renounceOwnership->離開沒有所有者的合同。 將無法再調用 `onlyOwner` 函數。 只能由當前所有者調用。
transferOwnership->將合約的所有權轉移到一個新賬戶（`newOwner`）。 只能由當前所有者調用。

### ReentrancyGuardUpgradeable.sol
[link](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/security/ReentrancyGuardUpgradeable.sol)
#### 簡介
合同模塊，有助於防止對函數的可重入調用。
從 `ReentrancyGuard` 繼承將使 {nonReentrant} 修飾符可用，它可以應用於函數以確保沒有對它們的嵌套（可重入）調用。
請注意，因為只有一個 `nonReentrant` 守衛，標記為 `nonReentrant` 的函數可能不會相互調用。 這可以通過將這些函數設為“private”，然後向它們添加“external”“nonReentrant”入口點來解決。

#### 方法
__ReentrancyGuard_init
__ReentrancyGuard_init_unchained
#### 修飾器
##### nonReentrant
防止合約直接或間接調用自身。
不支持從另一個 `nonReentrant` 函數調用 `nonReentrant` 函數。
可以通過將 `nonReentrant` 函數設置為外部函數並使其調用執行實際工作的 `private` 函數來防止這種情況發生。