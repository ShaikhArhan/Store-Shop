import { configureStore } from "@reduxjs/toolkit";
import hostSlice from "../slice/host/Host";
import registrationSlice from "../slice/registration/Registration";
import loginSlice from "../slice/login/Login";
import productPostSlice from "../slice/product/Post";
import wishListFetchSlice from "../slice/wishlist/Fetch";
import productFetchSlice from "../slice/product/Fetch";
import wishListPostSlice from "../slice/wishlist/Post";
import wishListDeleteSlice from "../slice/wishlist/Delete";
import cartFetchSlice from "../slice/cart/Fetch";
import cartUpdateSlice from "../slice/cart/Update";
import cartDeleteSlice from "../slice/cart/Delete";
import cartPostSlice from "../slice/cart/Post";
import productUpdateSlice from "../slice/product/Update";
import productDeleteSlice from "../slice/product/Delete";
import productFetchByIdSlice from "../slice/product/FetchById";

const store = configureStore({
    reducer: {
        [hostSlice.name]: hostSlice.reducer,

        [registrationSlice.name]: registrationSlice.reducer,

        [loginSlice.name]: loginSlice.reducer,

        [productFetchSlice.name]: productFetchSlice.reducer,
        [productPostSlice.name]: productPostSlice.reducer,
        [productUpdateSlice.name]: productUpdateSlice.reducer,
        [productDeleteSlice.name]: productDeleteSlice.reducer,
        [productFetchByIdSlice.name]: productFetchByIdSlice.reducer,

        [wishListFetchSlice.name]: wishListFetchSlice.reducer,
        [wishListPostSlice.name]: wishListPostSlice.reducer,
        [wishListDeleteSlice.name]: wishListDeleteSlice.reducer,

        [cartFetchSlice.name]: cartFetchSlice.reducer,
        [cartUpdateSlice.name]: cartUpdateSlice.reducer,
        [cartDeleteSlice.name]: cartDeleteSlice.reducer,
        [cartPostSlice.name]: cartPostSlice.reducer
    }
})
export default store