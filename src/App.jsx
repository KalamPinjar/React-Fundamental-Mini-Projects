import "./App.css";
import { useState } from "react";
import Card from "./components/Card";
import HeroReact from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./UI/Footer";
import foodDishes from "./utils/dishes";
import CartContext from "./context/cart-context";
function App() {
  const [data, setData] = useState();
  const [cart, setCart] = useState([]);

  const dishesID = foodDishes.map((dish) => dish.id);
  const cartMap = cart.map((dish) => dish.id);

  const submit = (e) => {
    e.preventDefault();

    if (cartMap.includes(data.id)) {
      setCart((prev) =>
        prev.map((dish) =>
          dish.id === data.id
            ? {
                ...dish,
                quantity: dish.quantity + 1,
                total: dish.price * (dish.quantity + 1),
              }
            : dish
        )
      );
    } else {
      setCart((prev) => [...prev, data]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cart.map((dish) => (total += dish.price * dish.quantity));
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        data: data,
        submit: submit,
        cart: setData,
        getCart: setCart,
        cartData: cart,
        id: dishesID,
        totalPrice: calculateTotal(),
      }}
    >
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
            price={`$${dish.price}`}
          />
        ))}
      </div>
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
