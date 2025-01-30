import React, { useEffect } from "react";
import "./Login.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/thunk/login/Login";
import { useNavigate } from "react-router-dom";
import useToast from "../../hook/toast/useToast";
import { resetStatus } from "../../redux/slice/login/Login";
import Spinner from "../loading/Spinner";

export const Login = () => {
  const {loginUser,token, status, message } = useSelector((state) => state.login);
  

  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    role:"user"
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Required!"),
    password: yup.string().required("Required!"),
  });

  useEffect(() => {
    if (status === "loading") {
      console.log("Loading...");
      <Spinner/>
    } else if (status === "succeeded") {
      showToast("success", message);
      token?localStorage.setItem("loginAuth",JSON.stringify(token)):showToast("warn", "Error, Login again" );
      dispatch(resetStatus());
      navigate("/displayproduct");
    } else if (status === "failed") {
      showToast("warn", message );
      dispatch(resetStatus());
    }
  }, [status]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("values: ", values);
        dispatch(login(values));
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="login-container">
          <h2>Login</h2>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              name="email"
              id="email"
              className="input-field"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <Field
              type="password"
              name="password"
              id="password"
              className="input-field"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button">
            Login
          </button>
          <button type="button" onClick={()=>{<Spinner/>;}}>LoadingAnimation</button>
        </Form>
      )}
    </Formik>
  );
};
