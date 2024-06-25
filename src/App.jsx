import "./App.css";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import FrictionUser from "./components/FrictionUser";

const App = () => {
  useEffect(() => {
    themeChange(false);
  }, []);
  const [usersList, setUsersList] = useState([]);
  const addUserHandler = (uName, uAge, nextId) => {
    setUsersList((prevUsers) => {
      return [...prevUsers, { name: uName, age: uAge, id: nextId }];
    });
  };

  const deleteUserHandler = (id) => {
    setUsersList((prevUsers) => {
      return prevUsers.filter((user) => user.id !== id);
    });
  };

  return (
    <>
      <Navbar />
      <FrictionUser onAddUser={addUserHandler} />
      <Card users={usersList} onDeleteUser={deleteUserHandler} />
      <Footer />
    </>
  );
};

export default App;
