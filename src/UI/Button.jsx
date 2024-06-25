/* eslint-disable react/prop-types */
const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      disabled={props.disabled}
      style={props.style}
      className={`btn ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
