/* eslint-disable react/prop-types */
import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // console.log('Adding item:', action.item);
    // console.log('Current totalAmount:', state.totalAmount);
    const price = isNaN(action.item.price) ? 0 : action.item.price;
    const quantity = isNaN(action.item.quantity) ? 0 : action.item.quantity;

    const updatedTotalAmount = state.totalAmount + price * quantity;
    if (state.items.length === 0) {
      return {
        items: [action.item],
        totalAmount: action.item.price * action.item.quantity,
      };
    }
    if (state.items.length > 0) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.item.quantity,
        };
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        return {
          items: updatedItems,
          totalAmount:
            state.totalAmount + action.item.price * action.item.quantity,
        };
      }
    }
    const updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } 

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
        total: (existingItem.total - existingItem.price).toFixed(2),
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "CLEAR") {

    return defaultCartState;
  }
  return state;
};

const defaultCartState = { items: [], totalAmount: 0 };

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItem = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
