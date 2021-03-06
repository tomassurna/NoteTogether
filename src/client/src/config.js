import Web3 from "web3";

const apiUrl = "https://notetogether.azurewebsites.net";
const serverAcountId = "0x06C2b3c0174Df5a6006c7A0132203A2715Ec9322";
const serverAcountPrivateKey =
  "c1a60fcdca75bcfdfbf3efb2cb07acbd7eca98d49d5525ff9c7e374258475929";
const noteTogetherAddress = "0x0EE96EA4c058a746d628310d0DD71FDD8078cBfB";
const projectId = "e2634f64bdc749f19aa98dea65d4e289";
const noteTogetherAbi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    name: "addVideo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
    ],
    name: "getVideoData",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "IPFSkey",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        internalType: "struct NoteTogether.Video",
        name: "video",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        internalType: "string",
        name: "timestamp",
        type: "string",
      },
      {
        internalType: "string",
        name: "tag",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "addNote",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
    ],
    name: "getNotes",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "timestamp",
            type: "string",
          },
          {
            internalType: "string",
            name: "tag",
            type: "string",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        internalType: "struct NoteTogether.Note[]",
        name: "",
        type: "tuple[]",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
      {
        internalType: "string",
        name: "noteData",
        type: "string",
      },
      {
        internalType: "string",
        name: "viewData",
        type: "string",
      },
    ],
    name: "updateAnalytics",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "getUsername",
    outputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUsernameById",
    outputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "changeUsername",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getInteractions",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Ropsten
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + projectId)
);

const noteTogetherContract = new web3.eth.Contract(
  noteTogetherAbi,
  noteTogetherAddress
);

export {
  web3,
  noteTogetherContract,
  noteTogetherAddress,
  serverAcountId,
  apiUrl,
  serverAcountPrivateKey,
};
