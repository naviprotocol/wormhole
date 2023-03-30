/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDelivery, IDeliveryInterface } from "../IDelivery";

const _abi = [
  {
    inputs: [],
    name: "InsufficientRelayerFunds",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "InvalidDeliveryVaa",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEmitter",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEmitterInOriginalDeliveryVM",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEmitterInRedeliveryVM",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "InvalidRedeliveryVM",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "InvalidVaa",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
    ],
    name: "MessageInfosDoNotMatchVaas",
    type: "error",
  },
  {
    inputs: [],
    name: "MessageInfosLengthDoesNotMatchVaasLength",
    type: "error",
  },
  {
    inputs: [],
    name: "MismatchingRelayProvidersInRedelivery",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "SendNotSufficientlyFunded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "targetChainId",
        type: "uint16",
      },
    ],
    name: "TargetChainIsNotThisChain",
    type: "error",
  },
  {
    inputs: [],
    name: "UnexpectedRelayer",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes[]",
            name: "encodedVMs",
            type: "bytes[]",
          },
          {
            internalType: "bytes",
            name: "encodedDeliveryVAA",
            type: "bytes",
          },
          {
            internalType: "uint8",
            name: "multisendIndex",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "relayerRefundAddress",
            type: "address",
          },
        ],
        internalType: "struct IDelivery.TargetDeliveryParametersSingle",
        name: "targetParams",
        type: "tuple",
      },
    ],
    name: "deliverSingle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "redeliveryVM",
            type: "bytes",
          },
          {
            internalType: "bytes[]",
            name: "sourceEncodedVMs",
            type: "bytes[]",
          },
          {
            internalType: "bytes",
            name: "originalEncodedDeliveryVAA",
            type: "bytes",
          },
          {
            internalType: "address payable",
            name: "relayerRefundAddress",
            type: "address",
          },
        ],
        internalType: "struct IDelivery.TargetRedeliveryByTxHashParamsSingle",
        name: "targetParams",
        type: "tuple",
      },
    ],
    name: "redeliverSingle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IDelivery__factory {
  static readonly abi = _abi;
  static createInterface(): IDeliveryInterface {
    return new utils.Interface(_abi) as IDeliveryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDelivery {
    return new Contract(address, _abi, signerOrProvider) as IDelivery;
  }
}