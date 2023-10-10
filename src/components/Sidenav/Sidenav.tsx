import React from "react";
import "./Sidenav.css";
import { Link, Navigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../store/api/messageApi";
export const Sidenav = () => {
  const [logout, result] = useLogoutUserMutation();

  return (
    <div className="sidenav">
      {result.isSuccess && <Navigate to="/login" />}
      <Link to="/messages">Main</Link>

      <p className="logout" onClick={() => logout()}>
        Logout
      </p>
    </div>
  );
};
