import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Compressor from "compressorjs";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../hook/toast/useToast";
import { resetStatus } from "../../../redux/slice/product/Post";
import {
  deleted,
  fetchById,
  update,
} from "../../../redux/thunk/product/Product";
import Spinner from "../../../component/loading/Spinner";
import { useParams } from "react-router-dom";

export const Product = () => {
  var { id } = useParams();
  console.log('id: ', id);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { productDelete, status, message } = useSelector(
    (state) => state.productDelete
  );
  const { productFetchById } = useSelector((state) => state.productFetchById);
  console.log('productFetchById: ', productFetchById);

  // id = "677fe3624f71896a5cc535b1";

  const initialValues = {
    name: productFetchById?.name || "",
    price: productFetchById?.price || "",
    description: productFetchById?.description || "",
    image: productFetchById?.image || "",
    discount: productFetchById?.discount || "",
  };

  console.log("initialValues: ", initialValues);

  useEffect(() => {
    if (id) {
      dispatch(fetchById(id));
    }
  }, [dispatch, productDelete, id]);

  useEffect(() => {
    if (status === "loading") {
      console.log("Loading...");
      <Spinner />;
    } else if (status === "succeeded") {
      showToast("success", message);
      dispatch(resetStatus());
    } else if (status === "failed") {
      showToast("warn", message);
      dispatch(resetStatus());
    }
  }, [status]);

  return (
    <div>
      <h2>Delete Product</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
          dispatch(deleted(id));
        }}
      >
        {({ values }) => (
          <Form className="product-form">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                className="input-field"
                disabled
              />
            </div>

            <div className="input-group">
              <label htmlFor="price">Price</label>
              <Field
                type="number"
                name="price"
                id="price"
                className="input-field"
                disabled
              />
            </div>

            <div className="input-group">
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                name="description"
                id="description"
                className="input-field"
                disabled
              />
            </div>

            <div className="input-group">
              <label htmlFor="image">Image</label>
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
                  disabled
                />
                <span className="percentage-sign">%</span>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Delete Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
