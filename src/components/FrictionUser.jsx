/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Model";

let nextId = 1;

const FrictionUser = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "age") {
      setAge(e.target.value);
    }
  };

  const addFrictionUser = (e) => {
    e.preventDefault();
    if (name.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid Input",
        description: "Please enter valid name and age (non-empty values)",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid Input",
        description: "Please enter valid age (> 0)",
      });
      return;
    }

    props.onAddUser(name, age, nextId);
    // console.log(name, age);
    setName("");
    setAge("");
    nextId++;
  };

  function clearError() {
    setError(null);
  }

  return (
    <>
      {error && (
        <Modal
          title={error.title}
          description={error.description}
          onClose={clearError}
        />
      )}

      <form
        className="flex flex-col  relative h-screen gap-2 w-full"
        onSubmit={addFrictionUser}
      >
        <div className="form-control justify-center items-center rounded-lg p-6 flex flex-col w-full gap-2">
          <input
            type="name"
            name="name"
            value={name}
            placeholder="Type Your Name"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="age"
            name="age"
            value={age}
            placeholder="Enter Your Age"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
            className="input input-bordered input-info w-full max-w-xs"
          />

          <button
            type="submit"
            className="btn btn-success w-full max-w-xs sm:btn-sm md:btn-md "
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default FrictionUser;
