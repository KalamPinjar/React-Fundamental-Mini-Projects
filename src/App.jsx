import { useState } from "react";
import "./App.css";
import HeroReact from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./UI/Footer";
import CartProvider from "./context/cartCtx-Provider";
import DishList from "./components/DishList";
function App() {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCartHandler = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((cartItem) => {
        return cartItem.id === item.id;
      });

      if (existingItem) {
        return prevCartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else {
            return cartItem;
          }
        });
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItemToCartHandler = (id) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== id);
    });
  };

  const clearCartHandler = () => {
    return setCartItems([]);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCtx = {
    items: [...cartItems],
    totalAmount: totalAmount,
    addItem: () => {
      addItemToCartHandler;
    },
    removeItem: () => {
      removeItemToCartHandler;
    },
    clearCart: () => {
      clearCartHandler;
    },
  };

  return (
    <CartProvider cartCtx={cartCtx}>
      <Navbar />
      <HeroReact />
      <DishList />
      <Footer />
    </CartProvider>
  );
}

export default App;
