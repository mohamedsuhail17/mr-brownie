function Cart({ cart, onPlaceOrder, onRemoveItem, onUpdateQuantity }) {
  const DELIVERY_FEE = 20; // fixed delivery charge in rupees

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + DELIVERY_FEE;
  };

  const formatOrderMessage = (mapsLink = '') => {
    // Build message to match requested exact format
    let message = "Order Details:\n\n";
    cart.forEach(item => {
      message += `${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n\n`;
    });

    message += `Subtotal: ₹${calculateSubtotal()}\n`;
    message += `Delivery: ₹${DELIVERY_FEE}\n`;
    message += `Grand Total: ₹${calculateGrandTotal()}\n\n`;

    // Address section as requested
    message += `TYPE ADDRESS:\n`;
    message += `Please type \n 1.address Or Street Name:\n\n`;
    message += `2.customer current Google map location:\n`;
    if (mapsLink) {
      message += `\n${mapsLink}`;
    }

    return message;
  };
  

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error('Geolocation not supported'));
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  };

  const handlePlaceOrder = async () => {
    let mapsLink = '';
    try {
      const coords = await getCurrentLocation();
      const lat = coords.latitude;
      const lon = coords.longitude;
      // Google Maps search link with coordinates
      mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    } catch (err) {
      // If permission denied or error, leave mapsLink empty so user can type address manually
      mapsLink = '';
    }

    const message = formatOrderMessage(mapsLink);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916385292762?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onPlaceOrder();
  };

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
            </div>
            <div className="cart-item-controls">
              <button 
                className="cart-quantity-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                className="cart-quantity-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button 
                className="remove-btn"
                onClick={() => onRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Subtotal: ₹{calculateSubtotal()}</p>
        <p>Delivery: ₹{DELIVERY_FEE}</p>
        <h3>Grand Total: ₹{calculateGrandTotal()}</h3>
      </div>
      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order via WhatsApp
      </button>
    </div>
  );
}

export default Cart;

