import React, { useEffect, useState } from "react";
import "./Registration.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../redux/thunk/registration/Registration";
import useToast from "../../hook/toast/useToast";
import { useNavigate } from "react-router-dom";
import { resetStatus } from "../../redux/slice/registration/Registration";
import Spinner from "../loading/Spinner";

export const Registration = () => {
  const { status, message } = useSelector((state) => state.registration);

  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"user"
  };

  const validationSchema = yup.object({
    userName: yup
      .string()
      .min(2, "Name have at least 2 characters")
      .max(20, "Name have at most 20 characters")
      .required("Required!"),
    email: yup.string().email("Invalid email format").required("Required!"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[@#$%&]/,
        "Password must contain at least one special character(@ # $ % &)"
      )
      .required("Required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required!"),
  });

  useEffect(() => {
    if (status === "loading") {
      console.log("Loading...");
      <Spinner/>
    } else if (status === "succeeded") {
      showToast("success", message);      
      dispatch(resetStatus());
      navigate("/login");
    } else if (status === "failed") {
      showToast("warn", message||"Failed to Register");
      dispatch(resetStatus());
    }
  }, [status, showToast]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form Data :", values);
        // createUserWithEmailAndPassword(auth,values)
        dispatch(registration(values));
      }}
    >
      {({ handleSubmit, values, isValid, touched, errors }) => (
        <Form onSubmit={handleSubmit} className="registration-container">
          <h2>Registration</h2>

          <div className="input-group">
            <label htmlFor="username">User name:</label>
            <Field
              type="text"
              name="userName"
              id="userName"
              className="input-field"
            />
            <ErrorMessage name="userName" component="div" className="error" />
          </div>

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
            <div className="error">
              {/* Display password-specific errors excluding required */}
              {(values.password &&
                !/^(?=.*[A-Z])(?=.*[@#$%&]).{6,}$/.test(values.password) && (
                  <>
                    {values.password.length < 0 && <div>Required!</div>}
                    {values.password.length < 6 && (
                      <div>Password must be at least 6 characters</div>
                    )}
                    {!/[A-Z]/.test(values.password) && (
                      <div>
                        Password must contain at least one uppercase letter
                      </div>
                    )}
                    {!/[@#$%&]/.test(values.password) && (
                      <div>
                        Password must contain at least one special character (@,
                        #, $, %, &)
                      </div>
                    )}
                  </>
                )) || (
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              )}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="input-field"
              disabled={!(touched.password && !errors.password)}
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};
