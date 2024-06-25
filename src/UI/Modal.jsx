/* eslint-disable react/prop-types */
import { useContext } from "react";
import CartContext from "../context/cart-context";
const Modal = (props) => {
  const ctx = useContext(CartContext);
  const data = props.cartData.map(
    (data) =>
      data.quantity > 0 && (
        <div
          className="flex flex-col gap-2 justify-center items-start"
          key={data.id}
        >
          <h3 className="font-bold text-lg">Dish: {data.name}</h3>
          <p>- {data.description}</p>
          <p>Total: ${data.total}</p>
          <p>Quantity: {data.quantity}</p>
        </div>
      )
  );

  return (
    <>
      <button onClick={() => document.getElementById("my_modal_3").showModal()}>
        My Cart
      </button>
      <dialog id="my_modal_3" className="modal">
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
          <div className="flex flex-col w-full py-4 gap-10  divide-y-2 ">
            {data}
            {ctx.cartData.length === 0 && (
              <p className="text-center font-bold text-lg">
                Your cart is empty
              </p>
            )}
            <div className="mt-4 p-2 flex gap-2">
              <p className="font-bold flex-end ">Total: ${ctx.totalPrice}</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
