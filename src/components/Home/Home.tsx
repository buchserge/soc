import React from "react";
import { Sidenav } from "../Sidenav/Sidenav";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/messages");
  }, 3000);

  return (
    <>
      <div className="sidenav">
        <Sidenav />
      </div>

      <p
        style={{
          color: "blue",
          fontSize: "30px",
          marginLeft: "500px",
          marginTop: "50px",
        }}
      >
        You will be redirected...
      </p>
    </>
  );
};
