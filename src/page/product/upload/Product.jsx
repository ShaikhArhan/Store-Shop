import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Compressor from "compressorjs";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../hook/toast/useToast";
import { resetStatus } from "../../../redux/slice/product/Post";
import { post } from "../../../redux/thunk/product/Product";
import Spinner from "../../../component/loading/Spinner";

export const Product = () => {
  const { productPost, status, message } = useSelector(
    (state) => state.productPost
  );

  const dispatch = useDispatch();
  const { showToast } = useToast();
  // Formik setup
  const initialValues = {
    name: "",
    price: "",
    description: "",
    image: "",
    discount: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .min(1, "Price must be greater than 0")
      .positive("Price must be greater than 0")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image is required"),
    discount: Yup.number().min(0).max(100),
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      // Compress the image with moderate settings
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 300,
        maxHeight: 300,
        mimeType: "image/webp",
        success(result) {
          // Convert the compressed image to base64
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            setFieldValue("image", base64String); // Set the base64 string into Formik field
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.error(err);
        },
      });
    }
  };

  useEffect(() => {
    if (status === "loading") {
      console.log("Loading...");
      <Spinner/>
    } else if (status === "succeeded") {
      showToast("success", message);
      dispatch(resetStatus());
      //   navigate("/login");
    } else if (status === "failed") {
      showToast("warn", "Account failed created");
      dispatch(resetStatus());
    }
  }, [status, showToast]);

  return (
    <div>
      <h2>Upload Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
          dispatch(post(values));
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="product-form">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                className="input-field"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="price">Price</label>
              <Field
                type="number"
                name="price"
                id="price"
                className="input-field"
              />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div className="input-group">
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                name="description"
                id="description"
                className="input-field"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>

            <div className="input-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(event, setFieldValue)}
              />
              <ErrorMessage name="image" component="div" className="error" />
              {values.image && (
                <img
                  src={values.image}
                  alt="Preview"
                  style={{ width: "150px", height: "auto", marginTop: "10px" }}
                />
              )}
            </div>

            <div className="input-group">
              <label htmlFor="discount">Discount</label>
              <div className="discount-input-wrapper">
                <Field
                  type="number"
                  name="discount"
                  id="discount"
                  className="input-field"
                />
                <span className="percentage-sign">%</span>
              </div>
              <ErrorMessage name="discount" component="div" className="error" />
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
