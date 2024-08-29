const contractAddress = '0xf1b09d2429937343741fd918192c802ea210dfbe'; // Replace with your contract address
const contractABI = `` // Replace with your contract ABI
// let Web3 = require('web3')


[
	{
		"inputs": [],
		"name": "tip",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TipReceived",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let contract;

document.getElementById('connectWallet').addEventListener('click', async () => {

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        document.getElementById('status').innerText = `Status: Connected as ${accounts[0]}`;
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert('Please install MetaMask!');
    }
});

document.getElementById('sendTip').addEventListener('click', async () => {
    const tipAmount = document.getElementById('tipAmount').value;
    const accounts = await web3.eth.getAccounts();
    contract.methods.tip().send({ from: accounts[0], value: web3.utils.toWei(ttipAmount, 'ether') })
        .on('transactionHash', (hash) => {
            console.log('Transaction hash:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Receipt:', receipt);
            alert('Tip sent successfully!');
        })
        .on('error', (error) => {
            console.error('Error:', error);
        });
});


function openForm() {
	let openButtonEl = document.querySelector('.open-button')
	let formEl = document.getElementById("myForm")
	openButtonEl.style.display = "none";
    formEl.style.display = "block";
  }
  
//   function closeForm() {
//     formEl.style.display = "none";
// }