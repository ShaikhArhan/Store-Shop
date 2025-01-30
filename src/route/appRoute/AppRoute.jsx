import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { Home } from "../../page/home/Home";
import { Login as UserLogin } from "../../component/login/Login";
import { Registration as UserRegistration } from "../../component/regrester/Registration";
import { PublicRoute } from "../PublicRoute";
import { Cart } from "../../component/cart/Cart";
import { WishList } from "../../component/wishList/WishList";
import ImageToBase64 from "../../component/test/ImageUpload";
import { Product as DisplayProduct } from "../../page/product/display/Product";
import { Product as UploadProduct } from "../../page/product/upload/Product";
import { AdminRoute } from "../adminRoute/adminRoute";
import { Product as EditProduct } from "../../page/product/edit/Product";
import { Product as DeleteProduct } from "../../page/product/delete/Product";
import { Header } from "../../component/header/Header";
import InfiniteScrollExample from "../../page/test/InfiniteScrollExample";
export const AppRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateRoute component={"cart"} />}>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>
        <Route element={<PrivateRoute component={"wishlist"} />}>
          <Route path="/wishlist" element={<WishList />}></Route>
        </Route>
        <Route element={<PrivateRoute component={"uploadproduct"} />}>
          <Route path="/uploadproduct" element={<UploadProduct />}></Route>
        </Route>
        <Route element={<PrivateRoute component={"editproduct"} />}>
          <Route path="/editproduct/:id?" element={<EditProduct />}></Route>
        </Route>
        <Route element={<PrivateRoute component={"deleteproduct"} />}>
          <Route path="/deleteproduct/:id?" element={<DeleteProduct />}></Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/displayproduct" element={<DisplayProduct />}></Route>
          {/* <Route path="/image" element={<ImageToBase64 />}></Route> */}
          <Route path="/infinitescrollexample" element={<InfiniteScrollExample />}></Route>
        </Route>

        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/registration" element={<UserRegistration />}></Route>
        <Route path="/admin/*" element={<AdminRoute />}></Route>
      </Routes>
    </>
  );
};
