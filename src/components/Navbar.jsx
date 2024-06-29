import Modal from "../UI/Modal";
import ThemeChanger from "../UI/ThemeChanger";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext } from "react";
import CartContext from "../context/cart-context";

const Navbar = () => {
  const cartCtx = useContext(CartContext);

  return (
    <div className="min-h-[12vh] navbar sticky top-0 p-4 bg-base-100 z-30  w-full ">
      <div className="navbar-start p-4 ">
        <div className="dropdown ">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Shop</a>
            </li>
            <div className="navbar-start indicator lg:flex mb-2 mt-2">
              <a className="btn">
                <Modal id="model-1">
                  <ShoppingCartOutlinedIcon />
                </Modal>
                <span className="indicator-item indicator-end absolute right-[-10px] badge badge-secondary">
                  {cartCtx.items.length > 0 ? cartCtx.items.length : 0}
                </span>{" "}
              </a>
            </div>
            <ThemeChanger />
          </ul>
        </div>

        <a className="btn btn-ghost normal-case underline underline-offset-4 text-xl">
          Foodify
        </a>
      </div>
      <div className="navbar-start hidden lg:flex ">
        <ul className="menu menu-horizontal flex flex-wrap flex-grow justify-around items-center ">
          <div className="navbar-end indicator gap-10 items-center lg:flex mr-10">
            <li>
              <a>Shop</a>
            </li>
            <a className="btn">
              <Modal id="model-2">
                <ShoppingCartOutlinedIcon />
              </Modal>
              <span className="indicator-item badge badge-secondary">
                {cartCtx.items.length > 0 ? cartCtx.items.length : 0}
              </span>{" "}
            </a>
          </div>
          <ThemeChanger />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
