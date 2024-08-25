import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const MarketPlace = ({ state, account }) => {
  const { clothContract } = state;
  const [items, setItems] = useState({ Shirts: [], Jeans: [], Shoes: [], Hoodies: [] });

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ethereum/all-designs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      if (data.items && Array.isArray(data.items)) {
        const designs = { Shirts: [], Jeans: [], Shoes: [], Hoodies: [] };
  
        data.items.forEach((item) => {
          const mappedItem = {
            id: item['0'],
            name: item['1'],
            category: item['2'],
            creator: item['3'],
            price: Number(item['4']), // Convert price to a regular number
            royalty: item['5'],
            active: item['6'],
            imageURI: item['7'],
          };
  
          if (designs[mappedItem.category]) {
            designs[mappedItem.category].push(mappedItem);
          }
        });
  
        setItems(designs);
      } else {
        throw new Error('Data format is incorrect');
      }
  
    } catch (error) {
      console.error("Error fetching designs:", error);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);

  const buyDesign = async (itemId, contract) => {
    try {
      const item = items.Shirts.concat(items.Jeans, items.Shoes, items.Hoodies).find(i => i.id === itemId);
      if (!item) throw new Error("Item not found");
  
      const priceInWei = (item.price/1e18).toString() // Convert price from Ether to Wei
      console.log(ethers.parseEther(priceInWei))
      console.log(itemId)
      const transaction = await contract.buyDesign(itemId, 1, { value: ethers.parseEther(priceInWei)}); // Send transaction with price in Wei
      await transaction.wait();
  
      console.log(`Successfully purchased item with ID ${itemId}`);
    } catch (error) {
      console.error("Error purchasing design:", error);
    }
  };
  

  const renderItems = (category) => {
    return items[category].map((item, index) => {
      const priceInEther = ethers.formatUnits(item.price.toString(), 'ether'); // Format price to Ether
      const slicedCreator = `${item.creator.slice(0, 6)}...${item.creator.slice(-4)}`;
  
      return (
        <div
          key={index}
          className="card bg-base-100 w-96 shadow-xl hover:scale-105 transition-transform duration-300"
          style={{ margin: '20px' }}
        >
          <figure>
            <img src={item.imageURI} alt={item.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p className="text-gray-600">Creator: <span className="text-blue-500">{slicedCreator}</span></p>
            <p className="mt-4 text-lg font-bold text-purple-600">Price: 
              <span className="text-3xl text-green-500 ml-2">{priceInEther} ETH</span>
            </p>
            <div className="card-actions justify-end">
              <button 
                onClick={() => buyDesign(item.id, clothContract)}
                className="btn btn-primary"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  
  return (
    <div className="bg-gray-900 p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Shirts</h2>
      <div className="flex flex-wrap">
        {renderItems('Shirts')}
      </div>

      <h2 className="text-2xl font-bold text-white my-4">Jeans</h2>
      <div className="flex flex-wrap">
        {renderItems('Jeans')}
      </div>

      <h2 className="text-2xl font-bold text-white my-4">Shoes</h2>
      <div className="flex flex-wrap">
        {renderItems('Shoes')}
      </div>

      <h2 className="text-2xl font-bold text-white my-4">Hoodies</h2>
      <div className="flex flex-wrap">
        {renderItems('Hoodies')}
      </div>
    </div>
  );
};

export default MarketPlace;
