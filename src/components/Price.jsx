/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import foodDishes from "../utils/dishes";
import Button from "../UI/Button";
import CartContext from "../context/cart-context";
import Toast from "../UI/Toast";
const Price = (props) => {
  const ctx = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [dish, setDish] = useState(foodDishes[props.id - 1]);
  const [total, setTotal] = useState();
  const [toast, setToast] = useState(false);

  useEffect(() => {
    setTotal(quantity * dish.price);

    ctx.cart({
      id: props.id,
      name: dish.name,
      description: dish.description,
      quantity: quantity,
      total: total,
      price: dish.price,
    });
  }, [quantity, total]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity <= 0) return;
    setQuantity(quantity - 1);
  };

  const toastMsg = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2500);
  };

  return (
    <>
      <form onSubmit={ctx.submit} className="w-[110px] flex flex-col ">
        <label
          htmlFor="quantity-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose quantity:
        </label>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            onClick={decrementQuantity}
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            data-input-counter
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="1"
            required
          />
          <button
            type="button"
            id="increment-button"
            onClick={incrementQuantity}
            data-input-counter-increment="quantity-input"
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
        <Button
          onClick={toastMsg}
          disabled={quantity <= 0}
          type="submit"
          className="mt-2 p-2"
        >
          Add to Cart
        </Button>
      </form>
      {toast && (
        <Toast
          id={dish.id}
          message={`Added ${quantity} ${dish.name} to cart`}
        />
      )}
    </>
  );
};

export default Price;
