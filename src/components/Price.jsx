/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Button from "../UI/Button";
import Toast from "../UI/Toast";
import { useContext } from "react";
import CartContext from "../context/cart-context";
import Input from "../UI/Input";

const Price = (props) => {
  const amountInputRef = useRef();
  const ctx = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [toast, setToast] = useState(false);

  const toastMsg = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2500);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return;
    }

    props.onAddItemAmount(enteredAmountNumber);

    toastMsg();
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-[110px] flex flex-col ">
        <label
          htmlFor="quantity-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose quantity:
        </label>
        <div className="relative flex items-center gap-1 w-full right-5">
          <button
            onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            min="0"
            className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
          <Input
            ref={amountInputRef}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            name="quantity"
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-x-0 border-gray-300  text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 w-[4rem]  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="1"
            required
          />
          <button
            onClick={() => setQuantity((prevState) => prevState + 1)}
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
        <Button type="submit" className="p-2 mt-2">
          Add to Cart
        </Button>
      </form>
      {toast && (
        <Toast
          id={ctx.items.length}
          message={`Added ${quantity} ${props.title} to cart`}
        />
      )}
    </>
  );
};

export default Price;
