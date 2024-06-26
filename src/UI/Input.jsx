/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className="form-control w-full ">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input
        ref={ref}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        name={props.name}
        id={props.id}
        autoComplete={props.autoComplete}
        style={props.style}
        className={`input input-bordered w-full max-w-xs ${props.className}`}
        required={props.required}
      />
    </div>
  );
});

export default Input;
