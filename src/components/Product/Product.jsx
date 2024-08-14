import React, { useState } from "react";
import "./Product.modules.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ProductInfoModal from "./ProductInfoModal";

function Product({ name, price, icon, onBuy, description }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleBuyClick = () => {
    onBuy(); // Proceed with the purchase directly
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    </div>
  );
}

export default Product;
