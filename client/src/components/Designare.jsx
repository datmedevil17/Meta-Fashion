import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const Designare = ({ state, account }) => {
  const { clothContract, ticketContract } = state;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Shirts");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [image, setImage] = useState("");

  const uploadToIpfs = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `35cb1bf7be19d2a8fa0d`,
            pinata_secret_api_key: `2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50`,
            "Content-Type": "multipart/form-data",
          },
        });
        const resData = res.data;
        setImage(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
      } catch (error) {
        console.error("IPFS Upload Error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!name || !price || !amount || !royalty || !image) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Validate price and royalty
      const parsedPrice = ethers.parseEther(price);
      const parsedRoyalty = ethers.parseEther(royalty);

      const data = JSON.stringify({ name, category, price, amount, royalty, image });
      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `35cb1bf7be19d2a8fa0d`,
          pinata_secret_api_key: `2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50`,
          "Content-Type": "application/json",
        },
      });
      
      console.log("Pinata JSON Response:", res);

      // Send transaction
      const tx = await clothContract.uploadDesign(
        name,
        category,
        parsedPrice,
        amount,
        parsedRoyalty,
        image
      );

      await tx.wait();
      console.log("Transaction Success:", tx);

    } catch (error) {
      console.error("Transaction Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload Design</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={uploadToIpfs}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option disabled value="">
                Pick a Category
              </option>
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (ETH)</label>
            <input
              type="text"
              placeholder="Price"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="text"
              placeholder="Amount"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Royalty (ETH)</label>
            <input
              type="text"
              placeholder="Royalty"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setRoyalty(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </form>
      </div>

      {image && (
        <div className="ml-8">
          <img
            src={image}
            alt="Uploaded Design"
            className="w-64 h-64 object-cover rounded-md animate-spin-slow"
          />
        </div>
      )}
    </div>
  );
};

export default Designare;
