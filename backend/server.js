const express = require('express');
const clothABI = require("./ClothingStore.json").abi; // Make sure ABI is an array of objects.
const ticketABI = require("./TicketMaster.json").abi; // Make sure ABI is an array of objects.
const cors = require("cors")
const { ethers } = require("ethers");

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors())

const privateKey = "529038177e54eb14bb591eaf0e7517112d7f4189f372f4a15a7d0229236adf7f"
const alchemyProvider = new ethers.AlchemyProvider("sepolia", "Mjw7qJFpq1xej0naP40Q-aWSgfs3DPrv");
const clothAddress = "0x4723589E2e2E44Bbab0c32908D7045769EfdBBab";
const ticketAddress = "0x4ee79Ec5Af6E31FBdA14879813F8387b03a6F356";
const signer = new ethers.Wallet(privateKey,alchemyProvider)

const clothContract = new ethers.Contract(clothAddress, clothABI, signer);
const ticketContract = new ethers.Contract(ticketAddress, ticketABI, signer);

app.listen(port, () => {
    console.log(`Server Running At Port ${port}`);
  });