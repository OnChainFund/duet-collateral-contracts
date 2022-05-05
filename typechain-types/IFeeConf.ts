/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IFeeConfInterface extends utils.Interface {
  contractName: "IFeeConf";
  functions: {
    "getConfig(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getConfig",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "getConfig", data: BytesLike): Result;

  events: {};
}

export interface IFeeConf extends BaseContract {
  contractName: "IFeeConf";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFeeConfInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getConfig(
      _key: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;
  };

  getConfig(
    _key: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber]>;

  callStatic: {
    getConfig(
      _key: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>;
  };

  filters: {};

  estimateGas: {
    getConfig(_key: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getConfig(
      _key: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}