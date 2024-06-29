import Price from "./Price";
import { useContext } from "react";
import CartContext from "../context/cart-context";

/* eslint-disable react/prop-types */
const Card = (props) => {
  const ctx = useContext(CartContext);
  const addToCartHandler = (quantity) => {
    // Regular expression to match positive integers and floating-point numbers
    const regex = /^\d+(\.\d+)?$/;

    // Attempt to parse the price string
    let price;
    try {
      if (regex.test(props.price)) {
        price = parseFloat(props.price);
      } else {
        console.error('Invalid price format:', props.price);
        return; // Exit the function early if price cannot be parsed
      }
    } catch (error) {
      console.error('Error parsing price:', error);
      return; // Exit the function early if there's an error during parsing
    }

    const quantity1 = parseInt(quantity, 10) || 0; // Ensure quantity is a number

    const total = price * quantity1; // Calculate the total

    ctx.addItem({
      id: props.id,
      name: props.title,
      description: props.description,
      price: price,
      quantity: quantity,
      total: total,
    });

    
  };
  return (
    <div className="card  rounded-none w-full bg-base-100 shadow-xl ">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <i>{props.description}</i>

        <p>${props.price}</p>
        <div className="card-actions flex flex-col items-end">
          <div className="flex justify-end">
            <Price id={props.id} title={props.title} price={props.price}   onAddItemAmount={addToCartHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
