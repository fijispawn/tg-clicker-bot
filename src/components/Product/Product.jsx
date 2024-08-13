import React, { useState } from "react";
import "./Product.modules.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ConnectModal from "../ConnectModal/ConnectModal";
import ProductInfoModal from "./ProductInfoModal";

function Product({ name, price, icon, onBuy, description, isConnected }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const handleInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleBuyClick = () => {
    if (isConnected) {
      onBuy();
    } else {
      setIsConnectModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeConnectModal = () => {
    setIsConnectModalOpen(false);
  };

  return (
    <div className="product-container">
      <div className="product-info">
        <img src={icon} alt={`${name} icon`} className="product-icon" />
        <h3 className="product-name">{name}</h3>
        <IoMdInformationCircleOutline 
          className="info-icon" 
          onClick={handleInfoClick} 
        />
      </div>
      <p className="product-price">{price} TON</p>
      <button 
        className="buy-button" 
        onClick={handleBuyClick}
      >
        Buy
      </button>

      {isModalOpen && (
        <ProductInfoModal 
          name={name} 
          description={description} 
          onClose={closeModal} 
        />
      )}

      {isConnectModalOpen && (
        <ConnectModal onClose={closeConnectModal} />
      )}
    </div>
  );
}

export default Product;
