/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface BaseStrategyInterface extends utils.Interface {
  contractName: "BaseStrategy";
  functions: {
    "PercentBase()": FunctionFragment;
    "balanceOf()": FunctionFragment;
    "balanceOfPool()": FunctionFragment;
    "controller()": FunctionFragment;
    "deposit()": FunctionFragment;
    "emergency()": FunctionFragment;
    "feeConf()": FunctionFragment;
    "getWant()": FunctionFragment;
    "harvest()": FunctionFragment;
    "inCaseTokensGetStuck(address,uint256)": FunctionFragment;
    "minHarvestAmount()": FunctionFragment;
    "output()": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingOutput()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setController(address)": FunctionFragment;
    "setFeeConf(address)": FunctionFragment;
    "setMinHarvestAmount(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdrawAll()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "PercentBase",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "balanceOfPool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "controller",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(functionFragment: "emergency", values?: undefined): string;
  encodeFunctionData(functionFragment: "feeConf", values?: undefined): string;
  encodeFunctionData(functionFragment: "getWant", values?: undefined): string;
  encodeFunctionData(functionFragment: "harvest", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "inCaseTokensGetStuck",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "minHarvestAmount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "output", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOutput",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setController",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setFeeConf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setMinHarvestAmount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAll",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "PercentBase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "controller", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "emergency", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeConf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getWant", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "harvest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "inCaseTokensGetStuck",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minHarvestAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "output", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOutput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFeeConf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMinHarvestAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike
  ): Result;

  events: {
    "Deposit(uint256)": EventFragment;
    "Harvest(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "SetController(address)": EventFragment;
    "SetFeeConf(address)": EventFragment;
    "SetMinHarvestAmount(uint256)": EventFragment;
    "Withdraw(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Harvest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetController"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetFeeConf"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetMinHarvestAmount"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export type DepositEvent = TypedEvent<[BigNumber], { amount: BigNumber }>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export type HarvestEvent = TypedEvent<[BigNumber], { amount: BigNumber }>;

export type HarvestEventFilter = TypedEventFilter<HarvestEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type SetControllerEvent = TypedEvent<[string], { controller: string }>;

export type SetControllerEventFilter = TypedEventFilter<SetControllerEvent>;

export type SetFeeConfEvent = TypedEvent<[string], { controller: string }>;

export type SetFeeConfEventFilter = TypedEventFilter<SetFeeConfEvent>;

export type SetMinHarvestAmountEvent = TypedEvent<
  [BigNumber],
  { harvestAmount: BigNumber }
>;

export type SetMinHarvestAmountEventFilter =
  TypedEventFilter<SetMinHarvestAmountEvent>;

export type WithdrawEvent = TypedEvent<[BigNumber], { amount: BigNumber }>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface BaseStrategy extends BaseContract {
  contractName: "BaseStrategy";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BaseStrategyInterface;

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
    PercentBase(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOf(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOfPool(overrides?: CallOverrides): Promise<[BigNumber]>;

    controller(overrides?: CallOverrides): Promise<[string]>;

    deposit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    emergency(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeConf(overrides?: CallOverrides): Promise<[string]>;

    getWant(overrides?: CallOverrides): Promise<[string]>;

    harvest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    inCaseTokensGetStuck(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    minHarvestAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    output(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pendingOutput(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFeeConf(
      _feeConf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMinHarvestAmount(
      _minAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  PercentBase(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOf(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOfPool(overrides?: CallOverrides): Promise<BigNumber>;

  controller(overrides?: CallOverrides): Promise<string>;

  deposit(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  emergency(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeConf(overrides?: CallOverrides): Promise<string>;

  getWant(overrides?: CallOverrides): Promise<string>;

  harvest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  inCaseTokensGetStuck(
    _token: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  minHarvestAmount(overrides?: CallOverrides): Promise<BigNumber>;

  output(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  pendingOutput(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setController(
    _controller: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFeeConf(
    _feeConf: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMinHarvestAmount(
    _minAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawAll(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    PercentBase(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOfPool(overrides?: CallOverrides): Promise<BigNumber>;

    controller(overrides?: CallOverrides): Promise<string>;

    deposit(overrides?: CallOverrides): Promise<void>;

    emergency(overrides?: CallOverrides): Promise<void>;

    feeConf(overrides?: CallOverrides): Promise<string>;

    getWant(overrides?: CallOverrides): Promise<string>;

    harvest(overrides?: CallOverrides): Promise<void>;

    inCaseTokensGetStuck(
      _token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    minHarvestAmount(overrides?: CallOverrides): Promise<BigNumber>;

    output(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pendingOutput(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setController(
      _controller: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeConf(_feeConf: string, overrides?: CallOverrides): Promise<void>;

    setMinHarvestAmount(
      _minAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    withdrawAll(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Deposit(uint256)"(amount?: null): DepositEventFilter;
    Deposit(amount?: null): DepositEventFilter;

    "Harvest(uint256)"(amount?: null): HarvestEventFilter;
    Harvest(amount?: null): HarvestEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "SetController(address)"(controller?: null): SetControllerEventFilter;
    SetController(controller?: null): SetControllerEventFilter;

    "SetFeeConf(address)"(controller?: null): SetFeeConfEventFilter;
    SetFeeConf(controller?: null): SetFeeConfEventFilter;

    "SetMinHarvestAmount(uint256)"(
      harvestAmount?: null
    ): SetMinHarvestAmountEventFilter;
    SetMinHarvestAmount(harvestAmount?: null): SetMinHarvestAmountEventFilter;

    "Withdraw(uint256)"(amount?: null): WithdrawEventFilter;
    Withdraw(amount?: null): WithdrawEventFilter;
  };

  estimateGas: {
    PercentBase(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOfPool(overrides?: CallOverrides): Promise<BigNumber>;

    controller(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    emergency(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeConf(overrides?: CallOverrides): Promise<BigNumber>;

    getWant(overrides?: CallOverrides): Promise<BigNumber>;

    harvest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    inCaseTokensGetStuck(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    minHarvestAmount(overrides?: CallOverrides): Promise<BigNumber>;

    output(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pendingOutput(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFeeConf(
      _feeConf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMinHarvestAmount(
      _minAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    PercentBase(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOfPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    controller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    emergency(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeConf(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getWant(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    harvest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    inCaseTokensGetStuck(
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    minHarvestAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    output(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingOutput(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setController(
      _controller: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFeeConf(
      _feeConf: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMinHarvestAmount(
      _minAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}