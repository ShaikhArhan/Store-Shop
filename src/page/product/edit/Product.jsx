import React, { useEffect, useMemo, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Compressor from "compressorjs";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../hook/toast/useToast";
import { resetStatus } from "../../../redux/slice/product/Post";
import { fetchById, update } from "../../../redux/thunk/product/Product";
import Spinner from "../../../component/loading/Spinner";
import { useParams } from "react-router-dom";

export const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { productUpdate, status, message } = useSelector(
    (state) => state.productUpdate
  );
  const { productFetchById } = useSelector((state) => state.productFetchById);

  // id = "677e94429a5842a41dba6e47";

  const initialValues = {
    name: productFetchById?.name || "",
    price: productFetchById?.price || "",
    description: productFetchById?.description || "",
    image: productFetchById?.image || "",
    discount: productFetchById?.discount || "",
  };

  console.log("initialValues: ", initialValues);

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
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 300,
        maxHeight: 300,
        mimeType: "image/webp",
        success(result) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            setFieldValue("image", base64String);
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
    if (id) {
      dispatch(fetchById(id));
    }
  }, [dispatch, productUpdate, id]);

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
      <h2>Edit Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          dispatch(update({ id, data: values }));
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
                placeholder={productFetchById?.name}
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
                placeholder={productFetchById?.name}
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
                placeholder={productFetchById?.description}
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
                  placeholder={productFetchById?.discount}
                />
                <span className="percentage-sign">%</span>
              </div>
              <ErrorMessage name="discount" component="div" className="error" />
            </div>
            <button className="submit-button">Update Product</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
