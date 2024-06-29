/* eslint-disable react/prop-types */
import Button from "./Button";
import { useContext, useState, useRef, useEffect } from "react";
import CartContext from "../context/cart-context";
import OrderForm from "../components/OrderForm";

const Modal = (props) => {
  const [order, setOrder] = useState(false);
  const ctx = useContext(CartContext);

  const orderFormRef = useRef();

  const removeItemToCartHandler = (id) => {
    ctx.removeItem(id);
  };

  const addItemToCartHandler = (item) => {
    ctx.addItem({ ...item, quantity: 1 });
  };

  const totalAmount = ctx.totalAmount.toFixed(2);

  const orderHandler = () => {
    setOrder(true);
  };

  useEffect(() => {
    if (order) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [order]);

  const data = ctx.items.map(
    (data) =>
      data.quantity > 0 && (
        <div
          className="flex flex-col items-start justify-center gap-3"
          key={data.id}
        >
          <h3 className="text-lg font-bold">Dish: {data.name}</h3>
          <i>- {data.description}</i>
          <p>Price: {data.price}</p>
          <p>Quantity: {data.quantity}</p>
          <div className="flex justify-center w-full gap-2">
            <Button
              className="p-4 w-[40px]"
              onClick={removeItemToCartHandler.bind(null, data.id)}
            >
              -
            </Button>
            <Button
              className="p-4 w-[40px]"
              onClick={addItemToCartHandler.bind(null, data)}
            >
              +
            </Button>
          </div>
        </div>
      )
  );

  return (
    <>
      <button onClick={() => document.getElementById(props.id).showModal()}>
        My Cart {props.children}
      </button>

      <dialog id={props.id} className={`modal `}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="py-4 text-2xl font-bold border-b-2 border-primary">
            My Cart
          </h3>
          <div className="flex flex-col w-full gap-6 py-4 divide-y-2 ">
            {data.length > 0 && (
              <div className="flex  gap-[15rem] p-2">
                <div className="flex w-full gap-2 p-2 mt-4">
                  <p className="text-lg font-bold flex-end">
                    Total: ${totalAmount}
                  </p>
                </div>
                <div className="flex justify-center w-full p-2 mt-4">
                  <Button onClick={orderHandler}>Order</Button>
                </div>
              </div>
            )}
            {data}
            {data.length === 0 && (
              <p className="p-10 text-lg font-bold text-center text-red-500">
                Your cart is empty
              </p>
            )}
            {order && (
              <OrderForm
                orderFormRef={orderFormRef}
                CancelOrder={() => setOrder(false)}
              />
            )}
          </div>
          <div className="modal-action">
            <Button onClick={() => document.getElementById(props.id).close()}>
              Close
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
