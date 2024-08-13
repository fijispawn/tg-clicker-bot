import React from "react";
import "./Shop.modules.css";
import { IoIosClose } from "react-icons/io";
import Chips from "/chips.svg";
import Hotdog from "/hotdog.svg";
import Levelup from "/levelup.svg";
import Product from "../Product/Product";
import { useTonConnectUI } from "@tonconnect/ui-react";

function Shop({ onClose }) {
  const { connected } = useTonConnectUI(); 

  const products = [
    { id: 1, name: "French Fries", price: 0.2, icon: Chips, description: "Automatically clicks for you." },
    { id: 2, name: "Hot Dog", price: 1, icon: Hotdog, description: "Increases your overall click efficiency." },
    { id: 3, name: "Level Up", price: 0.7, icon: Levelup, description: "Unlocks the next level in the game." },
  ];

  const handleBuy = (product) => {
    alert(`You bought: ${product.name} for ${product.price} TON`);
  };

  return (
    <div className="shop-overlay">
      <div className="shop-container">
        <IoIosClose className="close-button" onClick={onClose} />

        <h2 className="title">Market</h2>
        
        <div className="products-list">
          {products.map(product => (
            <Product
              key={product.id}
              name={product.name}
              price={product.price}
              icon={product.icon} 
              description={product.description}
              onBuy={() => handleBuy(product)}
              isConnected={connected} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
