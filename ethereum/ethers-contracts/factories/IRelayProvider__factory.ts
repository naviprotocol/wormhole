/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IRelayProvider,
  IRelayProviderInterface,
} from "../IRelayProvider";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "targetChain",
        type: "uint16",
      },
    ],
    name: "getAssetConversionBuffer",
    outputs: [
      {
        internalType: "uint16",
        name: "tolerance",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "toleranceDenominator",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConsistencyLevel",
    outputs: [
      {
        internalType: "uint8",
        name: "consistencyLevel",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "targetChain",
        type: "uint16",
      },
    ],
    name: "getDeliveryAddress",
    outputs: [
      {
        internalType: "bytes32",
        name: "whAddress",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardAddress",
    outputs: [
      {
        internalType: "address payable",
        name: "rewardAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
    ],
    name: "quoteAssetPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "usdPrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "targetChain",
        type: "uint16",
      },
    ],
    name: "quoteDeliveryOverhead",
    outputs: [
      {
        internalType: "uint256",
        name: "deliveryOverhead",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "targetChain",
        type: "uint16",
      },
    ],
    name: "quoteGasPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "gasPriceSource",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "targetChain",
        type: "uint16",
      },
    ],
    name: "quoteMaximumBudget",
    outputs: [
      {
        internalType: "uint256",
        name: "maximumTargetBudget",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "targetChain",
        type: "uint16",
      },
    ],
    name: "quoteRedeliveryOverhead",
    outputs: [
      {
        internalType: "uint256",
        name: "redeliveryOverhead",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IRelayProvider__factory {
  static readonly abi = _abi;
  static createInterface(): IRelayProviderInterface {
    return new utils.Interface(_abi) as IRelayProviderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRelayProvider {
    return new Contract(address, _abi, signerOrProvider) as IRelayProvider;
  }
}