/* eslint-disable react/prop-types */
const Input = (props) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input
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
};

export default Input;
