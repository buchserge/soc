import React, { useEffect } from "react";
import { useRegisterUserMutation } from "../../store/api/authApi";
import { RegisterInput } from "../../models/messageTypes";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./Register.css";

export const Register = () => {
  const jwt = useAppSelector((state) => state.jwt.jwtToken);

  const [registerUser, result] = useRegisterUserMutation();
  const [state, setState] = React.useState<RegisterInput>({
    userName: "",
    password: "",
  });
  const [userName, setTerm] = React.useState<string>("");
  const [password, setTerm2] = React.useState<string>("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    registerUser({ userName, password });
  }
  useEffect(() => {
    if (result.isSuccess) {
      navigate("/login");
    }
  }, [result.isSuccess]);

  return (
    <>
      <form className="frm" onSubmit={handleSubmit}>
        <p className="regTitle"> Registration</p>
        <input
          placeholder="name"
          type="text"
          onChange={(e) => setTerm(e.target.value)}
        />
        <input
          placeholder="password"
          type="text"
          onChange={(e) => setTerm2(e.target.value)}
        />
        <input className="submit" type="submit" value="register"></input>
      </form>
    </>
  );
};
