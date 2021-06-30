import Web3 from 'web3'

const serverAcountId = "0x9B276CC3298bf302473788Cc35e9A2708A4c40A7"
const noteTogetherAddress = '0x6dDb651FE2703942aAE5C9EEeB426B256B90303E'
const projectId = '831be8f97ba94cc69df353bf84a9c574'
const noteTogetherAbi = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      }
    ],
    "name": "addVideo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "link",
        "type": "string"
      }
    ],
    "name": "getVideoData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "IPFSkey",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "internalType": "struct NoteTogether.Video",
        "name": "video",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "timestamp",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "tag",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      }
    ],
    "name": "addNote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "link",
        "type": "string"
      }
    ],
    "name": "getNotes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "timestamp",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tag",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "internalType": "struct NoteTogether.Note[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "link",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "noteData",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "viewData",
        "type": "string"
      }
    ],
    "name": "updateAnalytics",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "getUsername",
    "outputs": [
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "name": "changeUsername",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Ropsten
// const web3 = new Web3(
//   new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/" + projectId)
// );

const noteTogetherContract = new web3.eth.Contract(
  noteTogetherAbi,
  noteTogetherAddress,
)

export { web3, noteTogetherContract, noteTogetherAddress, serverAcountId }
