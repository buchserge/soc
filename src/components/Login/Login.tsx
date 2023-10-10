import { useLoginUserMutation } from "../../store/api/authApi";
import { RegisterInput } from "../../models/messageTypes";
import { Navigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [loginUser, { isError, isSuccess }] = useLoginUserMutation();

  const handleLogin: SubmitHandler<FieldValues> = (data) => {
    loginUser(data as RegisterInput);
  };

  return (
    <>
      {isSuccess && <Navigate to="/" />}

      <form className="frm" onSubmit={handleSubmit(handleLogin)}>
        <p className="loginTitle"> Login</p>
        <input
          placeholder="name"
          type="text"
          {...register("userName", { required: true })}
        />
        {errors.userName?.type === "required" && (
          <p className="alert" role="alert">
            {" "}
            username is required
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
            password is required
          </p>
        )}
        <input className="submit" type="submit" value="submit" />
        {isError && (
          <p className="alert" role="alert">
            {" "}
            provide correct credentials
          </p>
        )}
      </form>
    </>
  );
};
