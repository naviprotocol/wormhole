/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  NFTBridgeSetup,
  NFTBridgeSetupInterface,
} from "../NFTBridgeSetup";

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
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "wormhole",
        type: "address",
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
        internalType: "address",
        name: "tokenImplementation",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "finality",
        type: "uint8",
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
  "0x608060405234801561001057600080fd5b5061038f806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063363ce96b14610030575b600080fd5b61004361003e3660046102c6565b610045565b005b60028054600080546001600160a01b038a166001600160a01b031990911617905561ffff878116620100000263ffffffff19909216908a1617179055600384905561008f836100ed565b6002805464ff00000000191664010000000060ff8516021790556100b28161016a565b6100bb886101b3565b6100e3886001600160a01b03166000908152600660205260409020805460ff19166001179055565b5050505050505050565b6001600160a01b0381166101485760405162461bcd60e51b815260206004820152601e60248201527f696e76616c696420696d706c656d656e746174696f6e2061646472657373000060448201526064015b60405180910390fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b4681146101ae5760405162461bcd60e51b81526020600482015260126024820152711a5b9d985b1a5908195d9b50da185a5b925960721b604482015260640161013f565b600b55565b6101bc816101f3565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b803b6102575760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161013f565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b80356001600160a01b03811681146102af57600080fd5b919050565b803561ffff811681146102af57600080fd5b600080600080600080600080610100898b0312156102e357600080fd5b6102ec89610298565b97506102fa60208a016102b4565b965061030860408a01610298565b955061031660608a016102b4565b94506080890135935061032b60a08a01610298565b925060c089013560ff8116811461034157600080fd5b8092505060e08901359050929598509295989093965056fea2646970667358221220966b2ab16573f0935d8925c9d69bc7e8cc096e139982e9b82d06b941e02e950064736f6c63430008110033";

type NFTBridgeSetupConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTBridgeSetupConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTBridgeSetup__factory extends ContractFactory {
  constructor(...args: NFTBridgeSetupConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NFTBridgeSetup> {
    return super.deploy(overrides || {}) as Promise<NFTBridgeSetup>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NFTBridgeSetup {
    return super.attach(address) as NFTBridgeSetup;
  }
  override connect(signer: Signer): NFTBridgeSetup__factory {
    return super.connect(signer) as NFTBridgeSetup__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTBridgeSetupInterface {
    return new utils.Interface(_abi) as NFTBridgeSetupInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTBridgeSetup {
    return new Contract(address, _abi, signerOrProvider) as NFTBridgeSetup;
  }
}