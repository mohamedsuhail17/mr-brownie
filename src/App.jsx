import { useState } from 'react';
import FoodItem from './components/FoodItem';
import Cart from './components/Cart';
import Footer from './components/Footer'
import { foodItems } from './data/foodItems';


function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const placeOrder = () => {
    setCart([]);
  };

  return (
    <div className="app">
      <header className="app-header bg-black">
        <h1>🍕 M.R Homemade Brownies</h1>
        <p>Order delicious 🎂 Cakes & Custom Sweets and get it delivered to your doorstep!</p>
      </header>
      
      <div className="app-content pl-5">
        <main className="menu-section">
          <h2>Our Menu</h2>
          <div className="food-grid">
            {foodItems.map(item => (
              <FoodItem
                key={item.id}
                item={item}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </main>

        <aside className="cart-section pr-5">
          <Cart
            cart={cart}
            onPlaceOrder={placeOrder}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        </aside>
      </div>
      <Footer />
    </div>
  );
}

export default App;

