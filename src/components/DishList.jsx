/* eslint-disable no-unused-vars */
import Card from "./Card";
import { useEffect, useState } from "react";

const DishList = (props) => {
  const [foodDishes, setFoodDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchDishes() {
      setLoading(true);

      const response = await fetch(
        "https://foodie-568ba-default-rtdb.firebaseio.com/orders.json"
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();

      if (!data) {
        throw new Error("No data received");
      }

      const loadedDishes = [];
      for (const key in data) {
        loadedDishes.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          image: data[key].image,
          price: data[key].price,
        });
      }
      setFoodDishes(loadedDishes);

      setLoading(false);
    }

    // setTimeout(() => fetchDishes(), 2000);

    fetchDishes().catch((error) => {
      console.error("Failed to fetch dishes:", error);
      setError(true); // Set error state to true
      setLoading(false); // Stop loading
      // Optionally, set a specific error message
      setErrorMessage(
        "Something went wrong with the server, kindly wait patiently then try again!"
      );
    });
  }, []);

  return (
    <div className="mt-4 rounded-lg border-[1px] border-[#cf931980] shadow-[0px_0px_14px_0px_#cf931963] container w-[60%] p-4 gap-4 bg-base-100 divide-y-2 flex flex-col justify-center items-center">
      {loading && (
        <span className="text-yellow-400 loading loading-dots loading-lg"></span>
      )}
      {error && <p className="p-2 text-red-500">{errorMessage}</p>}{" "}
      {foodDishes.map((dish) => (
        <Card
          key={dish.id}
          id={dish.id}
          title={dish.name}
          image={dish.image}
          description={dish.description}
          price={dish.price}
        />
      ))}
    </div>
  );
};

export default DishList;
