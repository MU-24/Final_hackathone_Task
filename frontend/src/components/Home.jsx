import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <h1>welcome to home page</h1>
        <div>
          <Link to="/login">login</Link>
        </div>
        <div>
          <Link to="/signup">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
