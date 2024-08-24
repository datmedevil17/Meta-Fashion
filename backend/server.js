const express = require('express');
const clothABI = require("./ClothStore.json").abi; // Make sure ABI is an array of objects.
const ticketABI = require("./TicketMaster.json").abi; // Make sure ABI is an array of objects.
const cors = require("cors")
const { ethers } = require("ethers");

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors())

const privateKey = "529038177e54eb14bb591eaf0e7517112d7f4189f372f4a15a7d0229236adf7f"
const alchemyProvider = new ethers.AlchemyProvider("sepolia", "Mjw7qJFpq1xej0naP40Q-aWSgfs3DPrv");
const clothAddress = "0xDeb839173D7E23A139E019737DE1b7FCe8629531";
const ticketAddress = "0x4ee79Ec5Af6E31FBdA14879813F8387b03a6F356";
const signer = new ethers.Wallet(privateKey,alchemyProvider)

const clothContract = new ethers.Contract(clothAddress, clothABI, signer);
const ticketContract = new ethers.Contract(ticketAddress, ticketABI, signer);

const categoryMiss=async(category)=>{
  if(category=="Shirts"||category=="Shoes"||category=="Hoodies"||category=="Jeans"){
    return true
  }else{
    return "Category not found!!"
  }
}

app.post("/api/ethereum/upload-design", async(req,res)=>{
  const {category} = req.body;
  console.log(category)
  const task = await categoryMiss(category)
  try {
    if(task!=="Category not found!!"){{
      
    }
      res.status(409).json({status:409,message:"Category not Available"})
    }else{
      res.status(200).json({status:200,message:"Category Availabe"})
    }
    
  } catch (error) {
    console.log(error)    
  }
})

app.get("/api/ethereum/my-designs",async(req,res)=>{
  try {
    const myDesign = await clothContract.myPersonalWadrobe()
    
    
  } catch (error) {
    
  }
})

app.get("/api/ethereum/all-designs", async (req, res) => {
  try {
    const count = await clothContract.nextTokenId();
    const items = [];
    
    for (let i = 0; i < count; i++) { 
      const design = await clothContract.designs(i);

      // Convert big integers to strings
      const formattedDesign = {
        ...design,
        '0': design.tokenId.toString(),
        '4': design.price.toString(),
        '5': design.royalty.toString(),
        // Convert other BigInt values if needed
      };

      items.push(formattedDesign);
    }

    console.log(items);
    res.status(200).json({ items });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
});


app.post("/api/ethereum/register-event",async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
})





app.get("/api/ethereum/all-events", async (req, res) => {
  try {
    const count = await ticketContract.totalOccasions();
    console.log(count);
    const events = [];

    for (let i = 1; i <= count; i++) {
      const event = await ticketContract.getOccasion(i);
      const formattedEvent = {
        ...event,
        '0': event.id.toString(),
        '2': event.cost.toString(),
        '3': event.tickets.toString(),
        '4': event.maxTickets.toString(),
        // Convert other BigInt values if needed
      };
      events.push(formattedEvent);
    }
    
    console.log(events);  // Corrected from `items` to `events`
    res.status(200).json({ events });
  } catch (error) {
    console.error("Backend error:", error);  // Ensure errors are logged
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});




app.listen(port, () => {
    console.log(`Server Running At Port ${port}`);
  });