/* eslint-disable react/prop-types */
import { createContext } from "react";
const CartContext = createContext({ data: null, submit: () => {}, id : null });

export default CartContext;
