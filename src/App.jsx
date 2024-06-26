import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import HeroReact from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./UI/Footer";
import foodDishes from "./utils/dishes";
import CartProvider from "./context/cartCtx-Provider";
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
      <div className="mt-4 rounded-lg border-[1px] border-[#cf931980] shadow-[0px_0px_14px_0px_#cf931963] container w-[60%] p-4 gap-4 bg-base-100 divide-y-2 flex flex-col justify-center items-center">
        {foodDishes.map((dish) => (
          <Card
            key={dish.id}
            id={dish.id}
            title={dish.name}
            image={dish.image}
            description={dish.description}
            price={dish.price}
          />
        ))}
      </div>
      <Footer />
    </CartProvider>
  );
}

export default App;
