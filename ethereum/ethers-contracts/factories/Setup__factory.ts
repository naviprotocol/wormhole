/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Setup, SetupInterface } from "../Setup";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "initialGuardians",
        type: "address[]",
      },
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "governanceChainId",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "governanceContract",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "evmChainId",
        type: "uint256",
      },
    ],
    name: "setup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610560806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a712ff9914610030575b600080fd5b61004361003e3660046103e2565b610045565b005b60008551116100945760405162461bcd60e51b81526020600482015260166024820152751b9bc819dd585c991a585b9cc81cdc1958da599a595960521b60448201526064015b60405180910390fd5b604080518082019091528581526000602082018190526100b590829061011c565b6000805461ffff868116620100000263ffffffff199092169088161717905560018390556100e2826101f6565b6100eb8761023f565b610113876001600160a01b03166000908152600660205260409020805460ff19166001179055565b50505050505050565b81515160005b818110156101a057835180516000919083908110610142576101426104ed565b60200260200101516001600160a01b03160361018e5760405162461bcd60e51b815260206004820152600b60248201526a496e76616c6964206b657960a81b604482015260640161008b565b8061019881610503565b915050610122565b5063ffffffff821660009081526002602090815260409091208451805186936101cd928492910190610324565b50602091909101516001909101805463ffffffff191663ffffffff909216919091179055505050565b46811461023a5760405162461bcd60e51b81526020600482015260126024820152711a5b9d985b1a5908195d9b50da185a5b925960721b604482015260640161008b565b600855565b6102488161027f565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b803b6102e35760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161008b565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b828054828255906000526020600020908101928215610379579160200282015b8281111561037957825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190610344565b50610385929150610389565b5090565b5b80821115610385576000815560010161038a565b80356001600160a01b03811681146103b557600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b803561ffff811681146103b557600080fd5b60008060008060008060c087890312156103fb57600080fd5b6104048761039e565b955060208088013567ffffffffffffffff8082111561042257600080fd5b818a0191508a601f83011261043657600080fd5b813581811115610448576104486103ba565b8060051b604051601f19603f8301168101818110858211171561046d5761046d6103ba565b60405291825284820192508381018501918d83111561048b57600080fd5b938501935b828510156104b0576104a18561039e565b84529385019392850192610490565b809a505050505050506104c5604088016103d0565b93506104d3606088016103d0565b92506080870135915060a087013590509295509295509295565b634e487b7160e01b600052603260045260246000fd5b60006001820161052357634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220e9a4fd64038ac3859404507be5ab77409b2bab07831c0f6d0c18722c469a043f64736f6c63430008110033";

type SetupConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SetupConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Setup__factory extends ContractFactory {
  constructor(...args: SetupConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Setup> {
    return super.deploy(overrides || {}) as Promise<Setup>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Setup {
    return super.attach(address) as Setup;
  }
  override connect(signer: Signer): Setup__factory {
    return super.connect(signer) as Setup__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SetupInterface {
    return new utils.Interface(_abi) as SetupInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Setup {
    return new Contract(address, _abi, signerOrProvider) as Setup;
  }
}