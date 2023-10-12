import React, { useEffect } from "react";
import { useRegisterUserMutation } from "../../store/api/authApi";
import { RegisterInput } from "../../models/messageTypes";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./Register.css";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";

export const Register = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm<FieldValues>();
  const [registerUser, result] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleRegister: SubmitHandler<FieldValues> = (data) => {
    registerUser(data as RegisterInput);
  };

  
  useEffect(() => {
    if (result.isSuccess) {
      navigate("/login");
    }
  }, [result.isSuccess]);

  return (
    <>
      <form className="frm" onSubmit={handleSubmit(handleRegister)}>
        <p className="regTitle"> Registration</p>
        <input
          placeholder="name"
          type="text"
          {...register("name", { required: true })}
        />
         {errors.password?.type === "required" && (
          <p className="alert" role="alert">
            {" "}
            field can not be empty
          </p>
        )}
        <input
          placeholder="password"
          type="text"
          {...register("password", { required: true })}
        />
         {errors.password?.type === "required" && (
          <p className="alert" role="alert">
            {" "}
           field can not be empty
          </p>
        )}
        <input className="submit" type="submit" value="register"></input>
      </form>
    </>
  );
};
