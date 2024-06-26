/* eslint-disable react/prop-types */
import Button from "./Button";
import { useContext } from "react";
import CartContext from "../context/cart-context";

const Modal = (props) => {
  const ctx = useContext(CartContext);
  const clearCartHandler = () => {
    ctx.clearCart();
  };

  const removeItemToCartHandler = (id) => {
    ctx.removeItem(id);
  };

  const addItemToCartHandler = (item) => {
    ctx.addItem({ ...item, quantity: 1 });
  };

  const totalAmount = ctx.totalAmount.toFixed(2);

  const data = ctx.items.map(
    (data) =>
      data.quantity > 0 && (
        <div
          className="flex flex-col gap-3 justify-center items-start"
          key={data.id}
        >
          <h3 className="font-bold text-lg">Dish: {data.name}</h3>
          <i>- {data.description}</i>
          <p>Price: {data.price}</p>
          <p>Quantity: {data.quantity}</p>
          <div className="flex justify-center w-full">
            <Button onClick={removeItemToCartHandler.bind(null, data.id)}>
              -
            </Button>
            <Button onClick={addItemToCartHandler.bind(null, data)}>+</Button>
          </div>
        </div>
      )
  );

  return (
    <>
      <button onClick={() => document.getElementById("my_modal_3").showModal()}>
        My Cart {props.children}
      </button>

      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl border-b-2 border-primary py-4">
            My Cart
          </h3>
          <div className="flex flex-col w-full py-4 gap-6  divide-y-2 ">
            {data.length > 0 && (
              <div className="flex justify-center w-full">
                <div className="mt-4 p-2 flex gap-2">
                  <p className="font-bold flex-end text-lg ">
                    Total: ${totalAmount}
                  </p>
                </div>
              </div>
            )}
            {data}
            {data.length === 0 ? (
              <p className="text-center p-10 text-red-500 font-bold text-lg">
                Your cart is empty
              </p>
            ) : (
              <div className="flex justify-center w-full mt-4 p-2">
                <Button
                  onClick={() => {
                    clearCartHandler;
                    document.getElementById("my_modal_3").close();
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            )}
          </div>
          <div className="modal-action">
            <Button
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
