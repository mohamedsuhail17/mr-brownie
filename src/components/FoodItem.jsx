import { useState } from 'react';

function FoodItem({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(item, quantity);
      setQuantity(0);
    }
  };

  return (
    <div className="food-item">
      <div className="food-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="food-details">
        <h3 className="food-name">{item.name}</h3>
        <p className="food-price">₹{item.price}</p>
        <div className="quantity-controls">
          <button 
            className="quantity-btn" 
            onClick={handleDecrement}
            disabled={quantity === 0}
          >
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button 
            className="quantity-btn" 
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
          disabled={quantity === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodItem;

