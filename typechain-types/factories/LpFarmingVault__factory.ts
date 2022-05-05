/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  LpFarmingVault,
  LpFarmingVaultInterface,
} from "../LpFarmingVault";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "controller",
        type: "address",
      },
    ],
    name: "ControllerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "supplyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "farm",
        type: "address",
      },
    ],
    name: "FarmChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "feeconf",
        type: "address",
      },
    ],
    name: "FeeConfChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "liquidator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "supplies",
        type: "uint256",
      },
    ],
    name: "Liquidated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "redeemer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "PercentBase",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "controller",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dtoken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dtoken",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "farm",
    outputs: [
      {
        internalType: "contract IVaultFarm",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeConf",
    outputs: [
      {
        internalType: "contract IFeeConf",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeConf",
        type: "address",
      },
      {
        internalType: "address",
        name: "_underlying",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isDuetVault",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "liquidator",
        type: "address",
      },
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "liquidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pair",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
    ],
    name: "pendingValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
    ],
    name: "setAppController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeConf",
        type: "address",
      },
    ],
    name: "setFeeConf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_farm",
        type: "address",
      },
    ],
    name: "setVaultFarm",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dtoken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "syncDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token0",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "underlying",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "dp",
        type: "bool",
      },
    ],
    name: "underlyingAmountValue",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "dp",
        type: "bool",
      },
    ],
    name: "userValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "unpack",
        type: "bool",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "unpack",
        type: "bool",
      },
    ],
    name: "withdrawTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506124dd806100206000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c80638da5cb5b116100de578063c0c53b8b11610097578063f213159c11610071578063f213159c14610347578063f2fde38b1461035a578063f77c47911461036d578063fc7e286d1461038057600080fd5b8063c0c53b8b1461030e578063d21220a714610321578063eb1cc3ba1461033457600080fd5b80638da5cb5b146102ac578063a0d9d1d9146102bd578063a8aa1b31146102d0578063ae318c4d146102e3578063b9eefa69146102f6578063ba58591c146102ff57600080fd5b80635ac28bf91161014b578063715018a611610125578063715018a61461026b57806373e2290c1461027357806374eb83c114610286578063877c8cd11461029957600080fd5b80635ac28bf9146102325780636695535c146102455780636f307dc31461025857600080fd5b80630dfe1681146101935780631a6d413e146101c35780631db44b8e146101d857806336e9332d146101f957806338d074361461020c57806347e7ef241461021f575b600080fd5b609d546101a6906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6101d66101d1366004611e88565b6103a0565b005b6101eb6101e6366004611eb3565b61046d565b6040519081526020016101ba565b609a546101a6906001600160a01b031681565b6101d661021a366004611eb3565b6108c2565b6101d661022d366004611ee3565b6108d1565b6101eb610240366004611ee3565b610912565b6101d6610253366004611e88565b610982565b6097546101a6906001600160a01b031681565b6101d6610a42565b6101d6610281366004611f0f565b610a78565b6101d6610294366004611f51565b610a88565b6099546101a6906001600160a01b031681565b6033546001600160a01b03166101a6565b6101d66102cb366004611e88565b610a9a565b609c546101a6906001600160a01b031681565b6101eb6102f1366004611fe3565b610b5d565b6101eb61271081565b604051600181526020016101ba565b6101d661031c366004612011565b610bac565b609f546101a6906001600160a01b031681565b6101d6610342366004612051565b610e21565b6101d6610355366004612088565b610f37565b6101d6610368366004611e88565b610f78565b6098546101a6906001600160a01b031681565b6101eb61038e366004611e88565b609b6020526000908152604090205481565b6033546001600160a01b031633146103d35760405162461bcd60e51b81526004016103ca906120c9565b60405180910390fd5b6001600160a01b0381166104185760405162461bcd60e51b815260206004820152600c60248201526b494e56414c49445f4641524d60a01b60448201526064016103ca565b609a80546001600160a01b0319166001600160a01b0383169081179091556040519081527fe8d79c9831b9b25abf1785ab7027993c1cca203c617c418d316776b3c980ec8a906020015b60405180910390a150565b60008261047c575060006108bc565b609c54604080516318160ddd60e01b815290516000926001600160a01b0316916318160ddd916004808301926020929190829003018186803b1580156104c157600080fd5b505afa1580156104d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f991906120fe565b9050600080609c60009054906101000a90046001600160a01b03166001600160a01b0316630902f1ac6040518163ffffffff1660e01b815260040160606040518083038186803b15801561054c57600080fd5b505afa158015610560573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105849190612133565b506001600160701b03918216935016905060006105b3846105ad6105a8858761218e565b611013565b90611191565b60975460405163f755b39d60e01b8152600481018a90529192506000916001600160a01b039091169063f755b39d9060240160206040518083038186803b1580156105fd57600080fd5b505afa158015610611573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063591906120fe565b609854609d54609f54604051633dcecc2f60e01b81526001600160a01b0392831660048201529082166024820152929350600092839283928392911690633dcecc2f9060440160c06040518083038186803b15801561069357600080fd5b505afa1580156106a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106cb91906121bf565b50609d546040516341976e0960e01b81526001600160a01b03918216600482015295995061ffff94851698509196509092169350600092918716916341976e09915060240160206040518083038186803b15801561072857600080fd5b505afa15801561073c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076091906120fe565b609f546040516341976e0960e01b81526001600160a01b039182166004820152919250600091908516906341976e099060240160206040518083038186803b1580156107ab57600080fd5b505afa1580156107bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e391906120fe565b90506000600160381b6107f583611013565b600160381b61080386611013565b61080e8d600261218e565b610818919061218e565b6108229190612237565b61082c919061218e565b6108369190612237565b90508d1561088f57670de0b6b3a76400006127106002610856878a612259565b6108608c8661218e565b61086a919061218e565b6108749190612237565b61087e9190612237565b6108889190612237565b9c506108af565b670de0b6b3a76400006108a2898361218e565b6108ac9190612237565b9c505b5050505050505050505050505b92915050565b6108cd3383836111ac565b5050565b6097546001600160a01b038381169116146108fe5760405162461bcd60e51b81526004016103ca90612271565b6109083382611419565b6108cd3382611431565b6000808212610951576001600160a01b0383166000908152609b602052604090205461094a90610943908490612259565b600161046d565b90506108bc565b61094a61095f836000612298565b6001600160a01b0385166000908152609b602052604090205461094391906122d7565b6033546001600160a01b031633146109ac5760405162461bcd60e51b81526004016103ca906120c9565b6001600160a01b0381166109f45760405162461bcd60e51b815260206004820152600f60248201526e24a72b20a624a22fa322a2a1a7a72360891b60448201526064016103ca565b609980546001600160a01b0319166001600160a01b0383169081179091556040519081527f2f848457f88c295370f87d543957f8cfe46e0759b3a528ae233eb79885a2949d90602001610462565b6033546001600160a01b03163314610a6c5760405162461bcd60e51b81526004016103ca906120c9565b610a766000611602565b565b610a838383836111ac565b505050565b610a9484848484611654565b50505050565b6033546001600160a01b03163314610ac45760405162461bcd60e51b81526004016103ca906120c9565b6001600160a01b038116610b0f5760405162461bcd60e51b815260206004820152601260248201527124a72b20a624a22fa1a7a72a2927a62622a960711b60448201526064016103ca565b609880546001600160a01b0319166001600160a01b0383169081179091556040519081527f027c3e080ed9215f564a9455a666f7e459b3edc0bb6e02a1bf842fde4d0ccfc190602001610462565b6001600160a01b0382166000908152609b6020526040812054610b82575060006108bc565b6001600160a01b0383166000908152609b6020526040902054610ba5908361046d565b9392505050565b600054610100900460ff16610bc75760005460ff1615610bcb565b303b155b610c2e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016103ca565b600054610100900460ff16158015610c50576000805461ffff19166101011790555b610c5b8484846119a2565b816001600160a01b0316636f307dc36040518163ffffffff1660e01b815260040160206040518083038186803b158015610c9457600080fd5b505afa158015610ca8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ccc91906122ee565b609c80546001600160a01b0319166001600160a01b0392909216918217905560408051630dfe168160e01b81529051630dfe168191600480820192602092909190829003018186803b158015610d2157600080fd5b505afa158015610d35573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d5991906122ee565b609d80546001600160a01b0319166001600160a01b03928316179055609c546040805163d21220a760e01b81529051919092169163d21220a7916004808301926020929190829003018186803b158015610db257600080fd5b505afa158015610dc6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dea91906122ee565b609f80546001600160a01b0319166001600160a01b03929092169190911790558015610a94576000805461ff001916905550505050565b60985460405163083d576560e41b81526001600160a01b03858116600483015260009216906383d576509060240160206040518083038186803b158015610e6757600080fd5b505afa158015610e7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e9f91906122ee565b6097549091506001600160a01b031633148015610ec957506097546001600160a01b038581169116145b610ee55760405162461bcd60e51b81526004016103ca90612271565b6001600160a01b0381163014610f2d5760405162461bcd60e51b815260206004820152600d60248201526c0ac82aa98a8beaa9c9a82a8869609b1b60448201526064016103ca565b610a948284611431565b6097546001600160a01b03848116911614610f645760405162461bcd60e51b81526004016103ca90612271565b610f6e3382611419565b610a838282611431565b6033546001600160a01b03163314610fa25760405162461bcd60e51b81526004016103ca906120c9565b6001600160a01b0381166110075760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103ca565b61101081611602565b50565b60008161102257506000919050565b816001600160801b821061103b5760809190911c9060401b5b6801000000000000000082106110565760409190911c9060201b5b640100000000821061106d5760209190911c9060101b5b6201000082106110825760109190911c9060081b5b61010082106110965760089190911c9060041b5b601082106110a95760049190911c9060021b5b600882106110b55760011b5b60016110c18286612237565b6110cb9083612259565b901c905060016110db8286612237565b6110e59083612259565b901c905060016110f58286612237565b6110ff9083612259565b901c9050600161110f8286612237565b6111199083612259565b901c905060016111298286612237565b6111339083612259565b901c905060016111438286612237565b61114d9083612259565b901c9050600161115d8286612237565b6111679083612259565b901c905060006111778286612237565b90508082106111865780611188565b815b95945050505050565b6000816111a284600160701b61218e565b610ba59190612237565b600260655414156111cf5760405162461bcd60e51b81526004016103ca9061230b565b6002606555336000818152609b602052604090205483111561122a5760405162461bcd60e51b8152602060048201526014602482015273125394d551919250d251539517d1115413d4d25560621b60448201526064016103ca565b81156112a25760975460405163ead5d35960e01b81526001600160a01b03868116600483015260248201869052600160448301529091169063ead5d35990606401600060405180830381600087803b15801561128557600080fd5b505af1158015611299573d6000803e3d6000fd5b505050506112ae565b6112ae848460006119e9565b60985460405163015304d160e21b81526001600160a01b038381166004830152306024830152604482018690529091169063054c13449060640160006040518083038186803b15801561130057600080fd5b505afa158015611314573d6000803e3d6000fd5b505050506001600160a01b0381166000908152609b6020526040812080548592906113409084906122d7565b90915550506040518381526001600160a01b038216907f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243649060200160405180910390a261138c81611a5f565b609a546001600160a01b03161561140e57609a5460975460405163a66bd52160e01b81526001600160a01b03848116600483015260248201879052918216604482015291169063a66bd52190606401600060405180830381600087803b1580156113f557600080fd5b505af1158015611409573d6000803e3d6000fd5b505050505b505060016065555050565b6097546108cd906001600160a01b0316833084611b26565b600260655414156114545760405162461bcd60e51b81526004016103ca9061230b565b6002606555806114995760405162461bcd60e51b815260206004820152601060248201526f4445504f534954455f49535f5a45524f60801b60448201526064016103ca565b6098546040516309ba9b4760e01b81526001600160a01b03848116600483015230602483015260448201849052909116906309ba9b479060640160006040518083038186803b1580156114eb57600080fd5b505afa1580156114ff573d6000803e3d6000fd5b505050506001600160a01b0382166000908152609b60205260408120805483929061152b908490612259565b90915550506040518181526001600160a01b038316907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a261157782611a5f565b609a546001600160a01b0316156115f957609a5460975460405163758e61dd60e11b81526001600160a01b03858116600483015260248201859052918216604482015291169063eb1cc3ba90606401600060405180830381600087803b1580156115e057600080fd5b505af11580156115f4573d6000803e3d6000fd5b505050505b50506001606555565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600260655414156116775760405162461bcd60e51b81526004016103ca9061230b565b60026065556098546001600160a01b031633146116d65760405162461bcd60e51b815260206004820152601860248201527f4c49515549444154455f494e56414c49445f43414c4c4552000000000000000060448201526064016103ca565b826001600160a01b0316846001600160a01b031614156117385760405162461bcd60e51b815260206004820152601a60248201527f4c49515549444154455f44495341424c455f594f555253454c4600000000000060448201526064016103ca565b6001600160a01b0383166000908152609b602052604090205480156118b757609954604051636dd5b69d60e01b8152666c69715f66656560c81b6004820152829160009182916001600160a01b031690636dd5b69d90602401604080518083038186803b1580156117a857600080fd5b505afa1580156117bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117e09190612342565b915091506000811180156117fc57506001600160a01b03821615155b15611836576000612710611810838761218e565b61181a9190612237565b905061182681856122d7565b9350611834838260016119e9565b505b611842888460016119e9565b84156118b357609754604051631d20dce760e01b81526001600160a01b03808b1692631d20dce792611880928c92169088908c908c90600401612370565b600060405180830381600087803b15801561189a57600080fd5b505af11580156118ae573d6000803e3d6000fd5b505050505b5050505b6001600160a01b038085166000818152609b6020526040808220919091555190918716907fde0aa27286f5cb3a4ed853dc4823ead62d63e92cdf13de09d6aece56970721a49061190a9085815260200190565b60405180910390a361191b84611a5f565b609a546001600160a01b03161561199657609a546097546040516322211d1160e21b81526001600160a01b0387811660048301529182166024820152911690638884744490604401600060405180830381600087803b15801561197d57600080fd5b505af1158015611991573d6000803e3d6000fd5b505050505b50506001606555505050565b6119aa611b91565b609880546001600160a01b039485166001600160a01b031991821617909155609980549385169382169390931790925560978054919093169116179055565b6001600160a01b0383163014156119ff57505050565b6001600160a01b038316611a485760405162461bcd60e51b815260206004820152601060248201526f7265636569707420697320656d70747960801b60448201526064016103ca565b609754610a83906001600160a01b03168484611bc0565b6001600160a01b0381166000908152609b602052604090205460019015611aec5760985460405163c4c0048760e01b81526001600160a01b03848116600483015283151560248301529091169063c4c00487906044015b600060405180830381600087803b158015611ad057600080fd5b505af1158015611ae4573d6000803e3d6000fd5b505050505050565b6098546040516379bf27b160e01b81526001600160a01b0384811660048301528315156024830152909116906379bf27b190604401611ab6565b6040516001600160a01b0380851660248301528316604482015260648101829052610a949085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611bf0565b600054610100900460ff16611bb85760405162461bcd60e51b81526004016103ca906123c4565b610a76611cc2565b6040516001600160a01b038316602482015260448101829052610a8390849063a9059cbb60e01b90606401611b5a565b6000611c45826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611cf29092919063ffffffff16565b805190915015610a835780806020019051810190611c63919061240f565b610a835760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016103ca565b600054610100900460ff16611ce95760405162461bcd60e51b81526004016103ca906123c4565b610a7633611602565b6060611d018484600085611d09565b949350505050565b606082471015611d6a5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016103ca565b6001600160a01b0385163b611dc15760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016103ca565b600080866001600160a01b03168587604051611ddd9190612458565b60006040518083038185875af1925050503d8060008114611e1a576040519150601f19603f3d011682016040523d82523d6000602084013e611e1f565b606091505b5091509150611e2f828286611e3a565b979650505050505050565b60608315611e49575081610ba5565b825115611e595782518084602001fd5b8160405162461bcd60e51b81526004016103ca9190612474565b6001600160a01b038116811461101057600080fd5b600060208284031215611e9a57600080fd5b8135610ba581611e73565b801515811461101057600080fd5b60008060408385031215611ec657600080fd5b823591506020830135611ed881611ea5565b809150509250929050565b60008060408385031215611ef657600080fd5b8235611f0181611e73565b946020939093013593505050565b600080600060608486031215611f2457600080fd5b8335611f2f81611e73565b9250602084013591506040840135611f4681611ea5565b809150509250925092565b60008060008060608587031215611f6757600080fd5b8435611f7281611e73565b93506020850135611f8281611e73565b9250604085013567ffffffffffffffff80821115611f9f57600080fd5b818701915087601f830112611fb357600080fd5b813581811115611fc257600080fd5b886020828501011115611fd457600080fd5b95989497505060200194505050565b60008060408385031215611ff657600080fd5b823561200181611e73565b91506020830135611ed881611ea5565b60008060006060848603121561202657600080fd5b833561203181611e73565b9250602084013561204181611e73565b91506040840135611f4681611e73565b60008060006060848603121561206657600080fd5b833561207181611e73565b9250602084013591506040840135611f4681611e73565b60008060006060848603121561209d57600080fd5b83356120a881611e73565b925060208401356120b881611e73565b929592945050506040919091013590565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60006020828403121561211057600080fd5b5051919050565b80516001600160701b038116811461212e57600080fd5b919050565b60008060006060848603121561214857600080fd5b61215184612117565b925061215f60208501612117565b9150604084015163ffffffff81168114611f4657600080fd5b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156121a8576121a8612178565b500290565b805161ffff8116811461212e57600080fd5b60008060008060008060c087890312156121d857600080fd5b86516121e381611e73565b95506121f1602088016121ad565b94506121ff604088016121ad565b9350606087015161220f81611e73565b925061221d608088016121ad565b915061222b60a088016121ad565b90509295509295509295565b60008261225457634e487b7160e01b600052601260045260246000fd5b500490565b6000821982111561226c5761226c612178565b500190565b6020808252600d908201526c0a89e968a9cbeaa9c9a82a8869609b1b604082015260600190565b60008083128015600160ff1b8501841216156122b6576122b6612178565b6001600160ff1b03840183138116156122d1576122d1612178565b50500390565b6000828210156122e9576122e9612178565b500390565b60006020828403121561230057600080fd5b8151610ba581611e73565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b6000806040838503121561235557600080fd5b825161236081611e73565b6020939093015192949293505050565b6001600160a01b038681168252851660208201526040810184905260806060820181905281018290526000828460a0840137600060a0848401015260a0601f19601f85011683010190509695505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60006020828403121561242157600080fd5b8151610ba581611ea5565b60005b8381101561244757818101518382015260200161242f565b83811115610a945750506000910152565b6000825161246a81846020870161242c565b9190910192915050565b602081526000825180602084015261249381604085016020870161242c565b601f01601f1916919091016040019291505056fea264697066735822122053bd6e2e0dae80c661d97b1769967baa35ff9ec66bee9141267a5aeed07f727a64736f6c63430008090033";

type LpFarmingVaultConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LpFarmingVaultConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LpFarmingVault__factory extends ContractFactory {
  constructor(...args: LpFarmingVaultConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "LpFarmingVault";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LpFarmingVault> {
    return super.deploy(overrides || {}) as Promise<LpFarmingVault>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LpFarmingVault {
    return super.attach(address) as LpFarmingVault;
  }
  connect(signer: Signer): LpFarmingVault__factory {
    return super.connect(signer) as LpFarmingVault__factory;
  }
  static readonly contractName: "LpFarmingVault";
  public readonly contractName: "LpFarmingVault";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LpFarmingVaultInterface {
    return new utils.Interface(_abi) as LpFarmingVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LpFarmingVault {
    return new Contract(address, _abi, signerOrProvider) as LpFarmingVault;
  }
}
