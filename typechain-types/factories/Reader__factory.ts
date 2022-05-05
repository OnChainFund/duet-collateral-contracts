/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Reader, ReaderInterface } from "../Reader";

const _abi = [
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
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [
      {
        internalType: "address[]",
        name: "_vaults",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "_dp",
        type: "bool",
      },
    ],
    name: "depositVaultValues",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "underlyingAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_dp",
        type: "bool",
      },
    ],
    name: "getVaultPrice",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "pendingBorrow",
    outputs: [
      {
        internalType: "uint256",
        name: "actualBorrow",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
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
        name: "borrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "pendingRepay",
    outputs: [
      {
        internalType: "uint256",
        name: "actualRepay",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
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
        name: "_user",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_vaults",
        type: "address[]",
      },
    ],
    name: "userVaultBorrowAmounts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_vaults",
        type: "address[]",
      },
    ],
    name: "userVaultDepositAmounts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "underAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_vaults",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "_dp",
        type: "bool",
      },
    ],
    name: "userVaultValues",
    outputs: [
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "dp",
        type: "bool",
      },
    ],
    name: "usersVaules",
    outputs: [
      {
        internalType: "uint256[]",
        name: "totalDeposits",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "totalBorrows",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161153638038061153683398101604081905261002f9161007c565b600180546001600160a01b039384166001600160a01b031991821617909155600080549290931691161790556100af565b80516001600160a01b038116811461007757600080fd5b919050565b6000806040838503121561008f57600080fd5b61009883610060565b91506100a660208401610060565b90509250929050565b611478806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100925760003560e01c80638b9fd8d3116100665780638b9fd8d314610126578063abddea3714610139578063aef0f76b1461014c578063b9eefa691461015f578063e32dd7eb1461016857600080fd5b8062ecadce146100975780632d423be6146100bd5780632e927ecd146100de5780636999490914610106575b600080fd5b6100aa6100a536600461103b565b61017b565b6040519081526020015b60405180910390f35b6100d06100cb366004611131565b610377565b6040516100b49291906111bc565b6100f16100ec3660046111ea565b61066f565b604080519283526020830191909152016100b4565b610119610114366004611131565b61072a565b6040516100b49190611203565b6100d061013436600461121d565b61084d565b6100f161014736600461126b565b610bab565b61011961015a3660046112ac565b610d3b565b6100aa61271081565b6100d061017636600461121d565b610e67565b600080846001600160a01b0316636f307dc36040518163ffffffff1660e01b815260040160206040518083038186803b1580156101b757600080fd5b505afa1580156101cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ef9190611303565b90506000816001600160a01b031663c6adec5d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561022c57600080fd5b505afa158015610240573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102649190611320565b85836001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561029e57600080fd5b505afa1580156102b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d69190611320565b6102e0919061134f565b6102ea919061136e565b604051630eda25c760e11b81526004810182905285151560248201529091506001600160a01b03871690631db44b8e9060440160206040518083038186803b15801561033557600080fd5b505afa158015610349573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036d9190611320565b9695505050505050565b805160609081908067ffffffffffffffff81111561039757610397611079565b6040519080825280602002602001820160405280156103c0578160200160208202803683370190505b5092508067ffffffffffffffff8111156103dc576103dc611079565b604051908082528060200260200182016040528015610405578160200160208202803683370190505b50915060005b818110156106665784818151811061042557610425611390565b602090810291909101015160405163fc7e286d60e01b81526001600160a01b0388811660048301529091169063fc7e286d9060240160206040518083038186803b15801561047257600080fd5b505afa158015610486573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104aa9190611320565b8482815181106104bc576104bc611390565b60200260200101818152505060008582815181106104dc576104dc611390565b60200260200101516001600160a01b0316636f307dc36040518163ffffffff1660e01b815260040160206040518083038186803b15801561051c57600080fd5b505afa158015610530573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105549190611303565b905084828151811061056857610568611390565b60200260200101516000141561059d57600084838151811061058c5761058c611390565b602002602001018181525050610653565b806001600160a01b031663f755b39d8684815181106105be576105be611390565b60200260200101516040518263ffffffff1660e01b81526004016105e491815260200190565b60206040518083038186803b1580156105fc57600080fd5b505afa158015610610573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106349190611320565b84838151811061064657610646611390565b6020026020010181815250505b508061065e816113a6565b91505061040b565b50509250929050565b60008054604051636dd5b69d60e01b815269626f72726f775f66656560b01b6004820152829182916001600160a01b0390911690636dd5b69d90602401604080518083038186803b1580156106c357600080fd5b505afa1580156106d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106fb91906113c1565b9150612710905061070c828661134f565b610716919061136e565b915061072282856113ef565b925050915091565b80516060908067ffffffffffffffff81111561074857610748611079565b604051908082528060200260200182016040528015610771578160200160208202803683370190505b50915060005b818110156108455783818151811061079157610791611390565b60209081029190910101516040516354a5706f60e01b81526001600160a01b038781166004830152909116906354a5706f9060240160206040518083038186803b1580156107de57600080fd5b505afa1580156107f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108169190611320565b83828151811061082857610828611390565b60209081029190910101528061083d816113a6565b915050610777565b505092915050565b815160609081908067ffffffffffffffff81111561086d5761086d611079565b604051908082528060200260200182016040528015610896578160200160208202803683370190505b5091508067ffffffffffffffff8111156108b2576108b2611079565b6040519080825280602002602001820160405280156108db578160200160208202803683370190505b50925060005b818110156106665760008682815181106108fd576108fd611390565b60200260200101516001600160a01b0316636f307dc36040518163ffffffff1660e01b815260040160206040518083038186803b15801561093d57600080fd5b505afa158015610951573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109759190611303565b90506001600160a01b0381166109be5760405162461bcd60e51b815260206004820152600a602482015269373790323cba37b5b2b760b11b604482015260640160405180910390fd5b6000816001600160a01b03166370a082318985815181106109e1576109e1611390565b60200260200101516040518263ffffffff1660e01b8152600401610a1491906001600160a01b0391909116815260200190565b60206040518083038186803b158015610a2c57600080fd5b505afa158015610a40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a649190611320565b905080610ab0576000868481518110610a7f57610a7f611390565b6020026020010181815250506000858481518110610a9f57610a9f611390565b602002602001018181525050610b96565b6000888481518110610ac457610ac4611390565b60200260200101516001600160a01b0316631db44b8e838a6040518363ffffffff1660e01b8152600401610b049291909182521515602082015260400190565b60206040518083038186803b158015610b1c57600080fd5b505afa158015610b30573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b549190611320565b905081878581518110610b6957610b69611390565b60200260200101818152505080868581518110610b8857610b88611390565b602002602001018181525050505b50508080610ba3906113a6565b9150506108e1565b6040516354a5706f60e01b81526001600160a01b03848116600483015260009182918291908616906354a5706f9060240160206040518083038186803b158015610bf457600080fd5b505afa158015610c08573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2c9190611320565b905080610c40576000809250925050610d33565b60008054604051636dd5b69d60e01b81526872657061795f66656560b81b600482015282916001600160a01b031690636dd5b69d90602401604080518083038186803b158015610c8f57600080fd5b505afa158015610ca3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc791906113c1565b9092509050612710610cd9828561134f565b610ce3919061136e565b9350610cef8484611406565b861115610cfe57829450610d2f565b610d0a81612710611406565b610d166127108861134f565b610d20919061136e565b9450610d2c85876113ef565b93505b5050505b935093915050565b81516060908067ffffffffffffffff811115610d5957610d59611079565b604051908082528060200260200182016040528015610d82578160200160208202803683370190505b50915060005b81811015610e5e57848181518110610da257610da2611390565b602090810291909101015160405163ae318c4d60e01b81526001600160a01b03888116600483015286151560248301529091169063ae318c4d9060440160206040518083038186803b158015610df757600080fd5b505afa158015610e0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e2f9190611320565b838281518110610e4157610e41611390565b602090810291909101015280610e56816113a6565b915050610d88565b50509392505050565b815160609081908067ffffffffffffffff811115610e8757610e87611079565b604051908082528060200260200182016040528015610eb0578160200160208202803683370190505b5092508067ffffffffffffffff811115610ecc57610ecc611079565b604051908082528060200260200182016040528015610ef5578160200160208202803683370190505b50915060005b818110156106665760015486516001600160a01b039091169063e26ec36a90889084908110610f2c57610f2c611390565b6020026020010151876040518363ffffffff1660e01b8152600401610f689291906001600160a01b039290921682521515602082015260400190565b604080518083038186803b158015610f7f57600080fd5b505afa158015610f93573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb7919061141e565b858381518110610fc957610fc9611390565b60200260200101858481518110610fe257610fe2611390565b60209081029190910101919091525280610ffb816113a6565b915050610efb565b6001600160a01b038116811461101857600080fd5b50565b803561102681611003565b919050565b8035801515811461102657600080fd5b60008060006060848603121561105057600080fd5b833561105b81611003565b9250602084013591506110706040850161102b565b90509250925092565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126110a057600080fd5b8135602067ffffffffffffffff808311156110bd576110bd611079565b8260051b604051601f19603f830116810181811084821117156110e2576110e2611079565b60405293845285810183019383810192508785111561110057600080fd5b83870191505b84821015611126576111178261101b565b83529183019190830190611106565b979650505050505050565b6000806040838503121561114457600080fd5b823561114f81611003565b9150602083013567ffffffffffffffff81111561116b57600080fd5b6111778582860161108f565b9150509250929050565b600081518084526020808501945080840160005b838110156111b157815187529582019590820190600101611195565b509495945050505050565b6040815260006111cf6040830185611181565b82810360208401526111e18185611181565b95945050505050565b6000602082840312156111fc57600080fd5b5035919050565b6020815260006112166020830184611181565b9392505050565b6000806040838503121561123057600080fd5b823567ffffffffffffffff81111561124757600080fd5b6112538582860161108f565b9250506112626020840161102b565b90509250929050565b60008060006060848603121561128057600080fd5b833561128b81611003565b9250602084013561129b81611003565b929592945050506040919091013590565b6000806000606084860312156112c157600080fd5b83356112cc81611003565b9250602084013567ffffffffffffffff8111156112e857600080fd5b6112f48682870161108f565b9250506110706040850161102b565b60006020828403121561131557600080fd5b815161121681611003565b60006020828403121561133257600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561136957611369611339565b500290565b60008261138b57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b60006000198214156113ba576113ba611339565b5060010190565b600080604083850312156113d457600080fd5b82516113df81611003565b6020939093015192949293505050565b60008282101561140157611401611339565b500390565b6000821982111561141957611419611339565b500190565b6000806040838503121561143157600080fd5b50508051602090910151909290915056fea2646970667358221220d75f7202272b780a6fc839ae4a27d4ab71fe1f85c5651b46c79027d8c905090564736f6c63430008090033";

type ReaderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReaderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Reader__factory extends ContractFactory {
  constructor(...args: ReaderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Reader";
  }

  deploy(
    _controller: string,
    _feeConf: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Reader> {
    return super.deploy(
      _controller,
      _feeConf,
      overrides || {}
    ) as Promise<Reader>;
  }
  getDeployTransaction(
    _controller: string,
    _feeConf: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_controller, _feeConf, overrides || {});
  }
  attach(address: string): Reader {
    return super.attach(address) as Reader;
  }
  connect(signer: Signer): Reader__factory {
    return super.connect(signer) as Reader__factory;
  }
  static readonly contractName: "Reader";
  public readonly contractName: "Reader";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReaderInterface {
    return new utils.Interface(_abi) as ReaderInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Reader {
    return new Contract(address, _abi, signerOrProvider) as Reader;
  }
}
