import React from "react";
import "./Shop.modules.css";
import { IoIosClose } from "react-icons/io";
import Chips from "/chips.svg";
import Hotdog from "/hotdog.svg";
import Levelup from "/levelup.svg";
import Product from "../Product/Product";
import { useTonConnectUI } from "@tonconnect/ui-react";

function Shop({ onClose }) {
  const products = [
    { id: 1, name: "French Fries", price: 0.2, icon: Chips, description: "Automatically clicks for you." },
    { id: 2, name: "Hot Dog", price: 1, icon: Hotdog, description: "Increases your overall click efficiency." },
    { id: 3, name: "Level Up", price: 0.7, icon: Levelup, description: "Unlocks the next level in the game." },
  ];

  const tonConnectUI = useTonConnectUI();

  const handleBuy = async (product) => {
    try {
      // Проверяем подключен ли кошелек
      const walletInfo = tonConnectUI.walletInfo;
      console.log('walletInfo:', walletInfo);

      if (!walletInfo) {
        alert('Wallet is not connected');
        return;
      }

      // Если кошелек подключен, выполняем транзакцию
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: '0QAiqyZu3cjms1eaXAFYvSPjk4AYI9lMYKMZ4sCZSA2NOBif', // Укажите адрес вашего контракта или получателя
            amount: (product.price * 1000000000).toString(), // Переводим цену из TON в нанокоины (1 TON = 10^9 нанокоинов)
          },
        ],
      };

      console.log('Sending transaction:', transaction);

      await tonConnectUI.connector.sendTransaction(transaction);

      alert(`You bought: ${product.name} for ${product.price} TON`);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    }
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
