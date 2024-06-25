/* eslint-disable react/prop-types */


const Card = (props) => {
  return (
    <div className="flex flex-wrap relative h-screen gap-2 w-full justify-center items-center p-4 ">
      {props.users.map((user) => {
        return (
          <div
            key={user.id}
            className="card w-80 bg-primary text-primary-content shadow-xl mt-10"
          >
            <div className="card-body h-22 p-4">
              <h2 className="card-title">Name: {user.name}</h2>
              <p> Age: {user.age} </p>
              <div className="card-actions justify-end">
                <button
                  className="btn"
                  onClick={() => props.onDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
{
  /* <div className="card w-96 bg-primary text-primary-content shadow-xl mt-10">
  <div className="card-body">
    <h2 className="card-title">Monkey D Luffy</h2>
    <p>
      {" "}
      I am the captain of the Strawhat Pirates and i will be the KING OF THE
      PIRATES{" "}
    </p>
    <div className="card-actions justify-end">
      <button className="btn">Delete</button>
    </div>
  </div>
</div>; */
}
