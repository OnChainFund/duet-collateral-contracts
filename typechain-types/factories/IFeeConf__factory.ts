/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IFeeConf, IFeeConfInterface } from "../IFeeConf";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "getConfig",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IFeeConf__factory {
  static readonly abi = _abi;
  static createInterface(): IFeeConfInterface {
    return new utils.Interface(_abi) as IFeeConfInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFeeConf {
    return new Contract(address, _abi, signerOrProvider) as IFeeConf;
  }
}