import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const MarketPlace = ({ state, account }) => {
  const { clothContract } = state;
  const [items, setItems] = useState({ Shirts: [], Jeans: [], Shoes: [], Hoodies: [] });
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ethereum/all-designs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
  
      if (data.items && Array.isArray(data.items)) {
        const designs = { Shirts: [], Jeans: [], Shoes: [], Hoodies: [] };
  
        data.items.forEach((item) => {
          const mappedItem = {
            id: item['0'],
            name: item['1'],
            category: item['2'],
            creator: item['3'],
            price: item['4'],
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

  const handleBuy = async (itemId, price, quantity) => {
    try {
        
        const priceInWei = ethers.BigNumber(price);
        const quantityBN = ethers.BigNumber(quantity);

        
        const totalPrice = priceInWei.mul(quantityBN);

        const tx = await clothContract.buyDesign(itemId, quantity, {
            value: totalPrice,
        });
        await tx.wait();
        alert('Purchase successful!');
        loadData();
    } catch (error) {
        console.error('Error purchasing design:', error);
    }
};


  const handleQuantityChange = (itemId, quantity) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const renderItems = (category) => {
    return items[category].map((item, index) => {
      const priceInEther = ethers.formatEther(item.price.toString());
      const slicedCreator = `${item.creator.slice(0, 6)}...${item.creator.slice(-4)}`;
      const selectedQuantity = selectedQuantities[item.id] || 1; // Default to 1 if not selected

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
            <p className="mt-4 text-lg font-bold text-purple-600">Price per item: 
              <span className="text-3xl text-green-500 ml-2">{priceInEther} ETH</span>
            </p>
            <div className="mt-4">
              <label className="text-lg font-bold text-purple-600">
                Quantity: 
                <input 
                  type="number" 
                  value={selectedQuantity} 
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="ml-2 p-1 border rounded"
                  min="1"
                />
              </label>
            </div>
            <div className="mt-4 text-lg font-bold text-purple-600">Total Price: 
              <span className="text-3xl text-green-500 ml-2">{(priceInEther * selectedQuantity).toFixed(4)} ETH</span>
            </div>
            <div className="card-actions justify-end">
              <button 
                className="btn btn-primary"
                onClick={() => handleBuy(item.id, item.price, selectedQuantity)}
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
