import Web3 from "web3";

const myBlocAddress = "0x0e6655797c38b60A4451667619AefdD707ff27Dd";
const projectId = "cc5af11c182f411baff3ee500361ee0b";
const myBlocABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "n_posts",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "_ipfsHash", type: "string" },
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "uint256", name: "_fee", type: "uint256" },
    ],
    name: "pushPost",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
    name: "buyPost",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
    name: "viewPost",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "postID", type: "uint256" },
      { internalType: "bool", name: "like", type: "bool" },
    ],
    name: "ratePost",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "postID", type: "uint256" }],
    name: "getPostDetails",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "title", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "uint256", name: "fee", type: "uint256" },
          { internalType: "uint256", name: "likes", type: "uint256" },
          { internalType: "uint256", name: "dislikes", type: "uint256" },
        ],
        internalType: "struct MyBloc.PostDetails",
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "string", name: "search", type: "string" },
      { internalType: "uint256", name: "start", type: "uint256" },
    ],
    name: "searchPost",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getUserOwned",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getUserPosted",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "string", name: "_sub", type: "string" },
      { internalType: "string", name: "_seq", type: "string" },
    ],
    name: "isSub",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
];
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + projectId)
);
const myBlocContract = new web3.eth.Contract(myBlocABI, myBlocAddress);

export { web3, myBlocContract, myBlocAddress };
