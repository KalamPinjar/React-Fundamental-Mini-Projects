/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { useRef, useState, useContext } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Toast from "../UI/Toast";
import { writeUserData } from "../utils/firebaseInit";
import CartContext from "../context/cart-context";

const OrderForm = (props) => {
  const ctx = useContext(CartContext);
  const [isBlur, setIsBlur] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toast, setToast] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const nameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const onBlurHandler = () => {
    setIsBlur(false);

    if (isError) {
      setIsError(false);
    }

    if (isBlur) {
      setErrorMsg([]);
    }
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        if (value.trim().length === 0 || value.length < 3) {
          setIsError(true);
          setErrorMsg({
            ...errorMsg,
            name: "Name must be at least 3 characters long",
          });
          return;
        }
        break;

      case "email":
        if (
          !value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          setIsError(true);
          setErrorMsg({
            ...errorMsg,
            email: "Please enter a valid email address",
          });
          return;
        }

        break;

      case "address":
        if (!value.match(/^[a-zA-Z0-9\s,.-]+$/)) {
          setIsError(true);
          setErrorMsg({ ...errorMsg, address: "Please enter a valid address" });
          return;
        }
        break;

      case "phone":
        if (!value.match(/^[0-9]{10}$/)) {
          setIsError(true);
          setErrorMsg({
            ...errorMsg,
            phone: "Please enter a valid phone number",
          });
          return;
        }
        break;
    }

    setIsError(false);

    setErrorMsg("");
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const itemsPurchased = ctx.items;
    const totalAmount = ctx.totalAmount.toFixed(2);
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredPhone = phoneRef.current.value;

    const order = {
      name: enteredName,
      email: enteredEmail,
      address: enteredAddress,
      phone: enteredPhone,
      items: itemsPurchased,
      totalAmount: totalAmount,
    };

    writeUserData(
      order.name,
      order.email,
      order.address,
      order.phone,
      itemsPurchased,
      totalAmount
    );
    clearForm();
    setToast("Order Placed Successfully");

    setTimeout(() => {
      setToast("");
      props.CancelOrder();
    }, 2500);

    console.log(order);
    ctx.clearCart();
  };
  const clearForm = () => {
    nameRef.current.value = "";
    addressRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
  };

  return (
    <form ref={props.orderFormRef} onSubmit={onSubmitHandler}>
      <div className="form-control px-20 py-2">
        <Input
          name="name"
          id="name"
          label="Name"
          type="text"
          placeholder="Your Name"
          ref={nameRef}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          required
        />
        {isError && <p className="text-red-500">{errorMsg.name}</p>}
        <Input
          name="email"
          id="email"
          label="Email"
          type="email"
          placeholder="Your Email"
          ref={emailRef}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          required
        />
        {isError && <p className="text-red-500">{errorMsg.email}</p>}

        <Input
          name="address"
          id="address"
          label="Address"
          type="text"
          placeholder="Your Address"
          ref={addressRef}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          required
        />
        {isError && <p className="text-red-500">{errorMsg.address}</p>}

        <Input
          name="phone"
          id="phone"
          label="Phone"
          type="tel"
          placeholder="Your Phone"
          ref={phoneRef}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          required
        />
        {isError && <p className="text-red-500">{errorMsg.phone}</p>}

        <div className="modal-action justify-center">
          <Button type="submit">Confirm Order</Button>
          <Button onClick={props.CancelOrder} type="submit">
            Cancel Order
          </Button>
        </div>
      </div>

      {toast && (
        <Toast id="toast" className="relative top-[60%]" message={toast} />
      )}
    </form>
  );
};

export default OrderForm;
