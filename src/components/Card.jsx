import Price from "./Price";

/* eslint-disable react/prop-types */
const Card = (props) => {
  return (
    <div className="card  rounded-none w-full bg-base-100 shadow-xl ">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <i>{props.description}</i>

        <p>{props.price}</p>
        <div className="card-actions flex flex-col items-end">
          <div className="flex justify-end">
            <Price id={props.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
