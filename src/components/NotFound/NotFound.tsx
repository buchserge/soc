import React from "react";
import { Sidenav } from "../Sidenav/Sidenav";

export const NotFound = () => {
  return (
    <>
      <div className="sidenav">
        <Sidenav />
      </div>

      <p style={{ fontSize: "30px", marginLeft: "500px", marginTop: "50px" }}>
        Not Found
      </p>
    </>
  );
};
