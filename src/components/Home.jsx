import { useContext } from "react";
import  AuthContext  from "../context/auth";
const Home = () => {
  const { onLogout } = useContext(AuthContext);
  return (
    <div className="flex flex-col">
      <h1>Welcome</h1>
      <p>You are now logged in</p>
      <a href="#" onClick={onLogout}>
        Sign out
      </a>
    </div>
  );
};

export default Home;
