/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DBTC, DBTCInterface } from "../DBTC";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "miner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "MinerChanged",
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
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_miner",
        type: "address",
      },
    ],
    name: "addMiner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
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
    name: "miners",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
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
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611175806100206000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c8063715018a6116100ad578063a457c2d711610071578063a457c2d714610273578063a9059cbb14610286578063dd62ed3e14610299578063f2fde38b146102d2578063f3982e5e146102e557600080fd5b8063715018a61461022d57806379cc6790146102355780638129fc1c146102485780638da5cb5b1461025057806395d89b411461026b57600080fd5b806339509351116100f457806339509351146101a657806340c10f19146101b957806342966c68146101ce578063648ec7b9146101e157806370a082311461020457600080fd5b806306fdde0314610131578063095ea7b31461014f57806318160ddd1461017257806323b872dd14610184578063313ce56714610197575b600080fd5b6101396102f8565b6040516101469190610efa565b60405180910390f35b61016261015d366004610f6b565b61038a565b6040519015158152602001610146565b6067545b604051908152602001610146565b610162610192366004610f95565b6103a2565b60405160128152602001610146565b6101626101b4366004610f6b565b6103c6565b6101cc6101c7366004610f6b565b610405565b005b6101cc6101dc366004610fd1565b610467565b6101626101ef366004610fea565b60976020526000908152604090205460ff1681565b610176610212366004610fea565b6001600160a01b031660009081526065602052604090205490565b6101cc610474565b6101cc610243366004610f6b565b6104aa565b6101cc6104de565b6033546040516001600160a01b039091168152602001610146565b6101396105f1565b610162610281366004610f6b565b610600565b610162610294366004610f6b565b610692565b6101766102a736600461100c565b6001600160a01b03918216600090815260666020908152604080832093909416825291909152205490565b6101cc6102e0366004610fea565b6106a0565b6101cc6102f3366004610fea565b610738565b6060606880546103079061103f565b80601f01602080910402602001604051908101604052809291908181526020018280546103339061103f565b80156103805780601f1061035557610100808354040283529160200191610380565b820191906000526020600020905b81548152906001019060200180831161036357829003601f168201915b5050505050905090565b6000336103988185856107bf565b5060019392505050565b6000336103b08582856108e4565b6103bb858585610976565b506001949350505050565b3360008181526066602090815260408083206001600160a01b03871684529091528120549091906103989082908690610400908790611090565b6107bf565b3360009081526097602052604090205460ff166104595760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21036b4b732b960991b60448201526064015b60405180910390fd5b6104638282610b44565b5050565b6104713382610c23565b50565b6033546001600160a01b0316331461049e5760405162461bcd60e51b8152600401610450906110a8565b6104a86000610d6e565b565b6033546001600160a01b031633146104d45760405162461bcd60e51b8152600401610450906110a8565b6104638282610c23565b600054610100900460ff166104f95760005460ff16156104fd565b303b155b6105605760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610450565b600054610100900460ff16158015610582576000805461ffff19166101011790555b61058a610dc0565b610592610de7565b6105dd6040518060400160405280600d81526020016c4d6f636b20447565742042544360981b815250604051806040016040528060048152602001634442544360e01b815250610e17565b8015610471576000805461ff001916905550565b6060606980546103079061103f565b3360008181526066602090815260408083206001600160a01b0387168452909152812054909190838110156106855760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610450565b6103bb82868684036107bf565b600033610398818585610976565b6033546001600160a01b031633146106ca5760405162461bcd60e51b8152600401610450906110a8565b6001600160a01b03811661072f5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610450565b61047181610d6e565b6033546001600160a01b031633146107625760405162461bcd60e51b8152600401610450906110a8565b6001600160a01b038116600081815260976020908152604091829020805460ff1916600190811790915591519182527f57669c236ecc06eb96f3d7bc6305804f857a3ed5a6bfe71c68049adae78f6e0f910160405180910390a250565b6001600160a01b0383166108215760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610450565b6001600160a01b0382166108825760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610450565b6001600160a01b0383811660008181526066602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b03838116600090815260666020908152604080832093861683529290522054600019811461097057818110156109635760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610450565b61097084848484036107bf565b50505050565b6001600160a01b0383166109da5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610450565b6001600160a01b038216610a3c5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610450565b6001600160a01b03831660009081526065602052604090205481811015610ab45760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610450565b6001600160a01b03808516600090815260656020526040808220858503905591851681529081208054849290610aeb908490611090565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b3791815260200190565b60405180910390a3610970565b6001600160a01b038216610b9a5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610450565b8060676000828254610bac9190611090565b90915550506001600160a01b03821660009081526065602052604081208054839290610bd9908490611090565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610c835760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610450565b6001600160a01b03821660009081526065602052604090205481811015610cf75760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610450565b6001600160a01b0383166000908152606560205260408120838303905560678054849290610d269084906110dd565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020016108d7565b505050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff166104a85760405162461bcd60e51b8152600401610450906110f4565b600054610100900460ff16610e0e5760405162461bcd60e51b8152600401610450906110f4565b6104a833610d6e565b600054610100900460ff16610e3e5760405162461bcd60e51b8152600401610450906110f4565b8151610e51906068906020850190610e61565b508051610d699060699060208401905b828054610e6d9061103f565b90600052602060002090601f016020900481019282610e8f5760008555610ed5565b82601f10610ea857805160ff1916838001178555610ed5565b82800160010185558215610ed5579182015b82811115610ed5578251825591602001919060010190610eba565b50610ee1929150610ee5565b5090565b5b80821115610ee15760008155600101610ee6565b600060208083528351808285015260005b81811015610f2757858101830151858201604001528201610f0b565b81811115610f39576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610f6657600080fd5b919050565b60008060408385031215610f7e57600080fd5b610f8783610f4f565b946020939093013593505050565b600080600060608486031215610faa57600080fd5b610fb384610f4f565b9250610fc160208501610f4f565b9150604084013590509250925092565b600060208284031215610fe357600080fd5b5035919050565b600060208284031215610ffc57600080fd5b61100582610f4f565b9392505050565b6000806040838503121561101f57600080fd5b61102883610f4f565b915061103660208401610f4f565b90509250929050565b600181811c9082168061105357607f821691505b6020821081141561107457634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156110a3576110a361107a565b500190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000828210156110ef576110ef61107a565b500390565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b60608201526080019056fea26469706673582212201f455e1560ac802d080f3df787a61dc21d629bd906efa99375376365cb25fe2064736f6c63430008090033";

type DBTCConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DBTCConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DBTC__factory extends ContractFactory {
  constructor(...args: DBTCConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "DBTC";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DBTC> {
    return super.deploy(overrides || {}) as Promise<DBTC>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DBTC {
    return super.attach(address) as DBTC;
  }
  connect(signer: Signer): DBTC__factory {
    return super.connect(signer) as DBTC__factory;
  }
  static readonly contractName: "DBTC";
  public readonly contractName: "DBTC";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DBTCInterface {
    return new utils.Interface(_abi) as DBTCInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): DBTC {
    return new Contract(address, _abi, signerOrProvider) as DBTC;
  }
}