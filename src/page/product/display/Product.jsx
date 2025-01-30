// import React, { useState, useEffect } from "react";
// import "./Product.css";
// import useToast from "../../../hook/toast/useToast";
// import { useDispatch, useSelector } from "react-redux";
// import empty_heart from "../../../assects/images/empty_heart.png";
// import fill_heart from "../../../assects/images/fill_heart.png";
// import { fetch as productDataFetch } from "../../../redux/thunk/product/Product";
// import {
//   fetch as wishListDataFetch,
//   post as wishListDataPost,
//   deleted,
// } from "../../../redux/thunk/wishlist/WishList";
// import {
//   post as CartDataPost,
//   fetch as CartDataFetch,
//   update,
// } from "../../../redux/thunk/cart/Cart";

// export const Product = () => {
//   const { productFetch } = useSelector((state) => state.productFetch);
//   const { wishListFetch } = useSelector((state) => state.wishListFetch);
//   const { loginUser } = useSelector((state) => state.login);
//   const { cartFetch } = useSelector((state) => state.cartFetch);
//   const { cartPost, status: cartPostStatus } = useSelector(
//     (state) => state.cartPost
//   );
//   const { cartUpdate, status: cartUpdateStatus } = useSelector(
//     (state) => state.cartUpdate
//   );
//   console.log("cartPost: ", cartPost);

//   const { showToast } = useToast();
//   const dispatch = useDispatch();

//   const [wishlistIds, setWishlistIds] = useState([]);
//   const [cartIds, setcartIds] = useState([]);

//   useEffect(() => {
//     const id = loginUser?.user_id;
//     dispatch(productDataFetch());
//     dispatch(wishListDataFetch(id));
//     // dispatch(CartDataFetch(id));
//   }, [dispatch]);

//   useEffect(() => {
//     const id = loginUser?.user_id;
//     dispatch(CartDataFetch(id));
//   }, [cartUpdate, cartPost]);

//   useEffect(() => {
//     if (wishListFetch) {
//       const ids = wishListFetch.map((item) => item.productId._id);
//       setWishlistIds(ids);
//     }
//   }, [wishListFetch]);

//   useEffect(() => {
//     if (cartFetch) {
//       const ids = cartFetch.map((data) => data.productId._id);
//       console.log("cartFetch -ids: ", ids);
//       setcartIds(ids);
//     }
//   }, [cartUpdate,cartFetch?.length]);

//   const addToWishlist = async (productId, productName) => {
//     const id = loginUser?.user_id;
//     const productExist = wishListFetch?.some(
//       (data) => data.productId._id === productId
//     );

//     if (!productExist) {
//       await dispatch(wishListDataPost({ id, productId }));
//       // showToast("info", productName + " added to Wish-list!");
//       dispatch(wishListDataFetch(id));
//     } else {
//       await dispatch(deleted({ id, productId }));
//       // showToast("info", productName + " already exists in Wish-list!");
//       dispatch(wishListDataFetch(id));
//     }
//   };

//   const addToCart = async (productId, productName) => {
//     try {
//       const id = loginUser?.user_id;
//       const existingCartItem = cartFetch?.find(
//         (data) => data.userId === id && data.productId._id === productId
//       );
//       if (!existingCartItem) {
//         await dispatch(CartDataPost({ userId: id, productId }));
//         showToast("success", `${productName} added to cart!`);
//       } else {
//         const updatedQuantity = existingCartItem.quantity + 1;
//         await dispatch(
//           update({ userId: id, productId, quantity: updatedQuantity })
//         );
//         showToast("info", `${productName} quantity updated in cart!`);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       showToast("error", "Failed to add product to cart.");
//     }
//   };

//   return (
//     <div className="product-container">
//       {productFetch?.length>0&&productFetch?.map((item, index) => (
//         <div className="product-card" key={index}>
//           <span
//             className="wishlist-icon"
//             onClick={() => {
//               if (loginUser?.user_id) {
//                 addToWishlist(item._id, item.name);
//               } else {
//                 showToast(
//                   "warn",
//                   "Login required to add product in wish-list!"
//                 );
//               }
//             }}
//           >
//             <img
//               src={
//                 wishlistIds && wishlistIds.includes(item._id)
//                   ? fill_heart
//                   : empty_heart
//               }
//               alt={
//                 wishlistIds && wishlistIds.includes(item._id)
//                   ? "wishlist-"
//                   : "wishlist+"
//               }
//             />
//           </span>
//           <img src={item.image} alt={item.name} className="product-image" />
//           <div className="product-details">
//             <h2 className="product-title">{item.name}</h2>
//             <p className="product-description">{item.description}</p>
//             <p className="product-price">
//               ${item.price}
//               {item.discount > 0 && (
//                 <span className="product-discount"> {item.discount}% OFF</span>
//               )}
//             </p>
//             <button
//               className="add-to-cart-btn"
//               style={{
//                 backgroundColor: cartIds.includes(item._id) ? "green" : null,
//               }}
//               onClick={() => {
//                 if (loginUser?.user_id) {
//                   // if (true) {
//                   addToCart(item._id, item.name);
//                 } else {
//                   showToast("warn", "Login required to add product in cart!");
//                 }
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       ))||<h2>Product list is empty</h2>}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import "./Product.css";
import useToast from "../../../hook/toast/useToast";
import { useDispatch, useSelector } from "react-redux";
import empty_heart from "../../../assects/images/empty_heart.png";
import fill_heart from "../../../assects/images/fill_heart.png";
import { fetch as productDataFetch } from "../../../redux/thunk/product/Product";
import {
  fetch as wishListDataFetch,
  post as wishListDataPost,
  deleted,
} from "../../../redux/thunk/wishlist/WishList";
import {
  post as CartDataPost,
  fetch as CartDataFetch,
  update,
} from "../../../redux/thunk/cart/Cart";
import { useNavigate } from "react-router-dom";

export const Product = () => {
  const { productFetch } = useSelector((state) => state.productFetch);
  const { wishListFetch } = useSelector((state) => state.wishListFetch);
  const { loginUser } = useSelector((state) => state.login);
  // console.log('loginUser: ', loginUser?.isAdmin);
  const { cartFetch } = useSelector((state) => state.cartFetch);
  const { cartPost, status: cartPostStatus } = useSelector(
    (state) => state.cartPost
  );
  const { cartUpdate, status: cartUpdateStatus } = useSelector(
    (state) => state.cartUpdate
  );
  // console.log("cartPost: ", cartPost);

  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartIds, setcartIds] = useState([]);

  useEffect(() => {
    const id = loginUser?.user_id;
    dispatch(productDataFetch());
    dispatch(wishListDataFetch(id));
    // dispatch(CartDataFetch(id));
  }, [dispatch]);

  useEffect(() => {
    const id = loginUser?.user_id;
    dispatch(CartDataFetch(id));
  }, [cartUpdate, cartPost]);

  useEffect(() => {
    if (wishListFetch) {
      const ids = wishListFetch.map((item) => item.productId?._id);
      setWishlistIds(ids);
    }
  }, [wishListFetch]);

  useEffect(() => {
    if (cartFetch) {
      const ids = cartFetch.map((data) => data.productId?._id);
      console.log("cartFetch -ids: ", ids);
      setcartIds(ids);
    }
  }, [cartUpdate, cartFetch?.length]);

  const addToWishlist = async (productId, productName) => {
    const id = loginUser?.user_id;
    const productExist = wishListFetch?.some(
      (data) => data.productId?._id === productId
    );

    if (!productExist) {
      await dispatch(wishListDataPost({ id, productId }));
      // showToast("info", productName + " added to Wish-list!");
      dispatch(wishListDataFetch(id));
    } else {
      await dispatch(deleted({ id, productId }));
      // showToast("info", productName + " already exists in Wish-list!");
      dispatch(wishListDataFetch(id));
    }
  };

  const addToCart = async (productId, productName) => {
    try {
      const id = loginUser?.user_id;
      const existingCartItem = cartFetch?.find(
        (data) => data.userId === id && data.productId?._id === productId
      );
      if (!existingCartItem) {
        await dispatch(CartDataPost({ userId: id, productId }));
        showToast("success", `${productName} added to cart!`);
      } else {
        const updatedQuantity = existingCartItem.quantity + 1;
        await dispatch(
          update({ userId: id, productId, quantity: updatedQuantity })
        );
        showToast("info", `${productName} quantity updated in cart!`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", "Failed to add product to cart.");
    }
  };

  return (
    <div className="product-container">
      {(productFetch?.length > 0 &&
        productFetch?.map((item, index) => (
          <div className="product-card" key={index}>
            {loginUser?.isAdmin && (
              <div className="top-icons">
                <span
                  className="edit-icon"
                  onClick={() => {
                    if (loginUser?.user_id) {
                      // editProduct(item._id, item.name);
                      navigate(`/editproduct/${item._id}`);
                    } else {
                      showToast("warn", "Login required to edit product!");
                    }
                  }}
                >
                  🆙
                </span>
                <span
                  className="delete-icon"
                  onClick={() => {
                    if (loginUser?.user_id) {
                      // deleteProduct(item._id, item.name);
                      navigate(`/deleteproduct/${item._id}`);
                    } else {
                      showToast("warn", "Login required to delete product!");
                    }
                  }}
                >
                  🗑
                </span>
              </div>
            )}
            <span
              className="wishlist-icon"
              onClick={() => {
                if (loginUser?.user_id) {
                  addToWishlist(item._id, item.name);
                } else {
                  showToast(
                    "warn",
                    "Login required to add product in wish-list!"
                  );
                }
              }}
            >
              <img
                src={
                  wishlistIds && wishlistIds.includes(item._id)
                    ? fill_heart
                    : empty_heart
                }
                alt={
                  wishlistIds && wishlistIds.includes(item._id)
                    ? "wishlist-"
                    : "wishlist+"
                }
              />
            </span>
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-details">
              <h2 className="product-title">{item.name}</h2>
              <p className="product-description">{item.description}</p>
              <p className="product-price">
                ${item.price}
                {item.discount > 0 && (
                  <span className="product-discount">
                    {" "}
                    {item.discount}% OFF
                  </span>
                )}
              </p>
              <button
                className="add-to-cart-btn"
                style={{
                  backgroundColor: cartIds.includes(item._id) ? "green" : null,
                }}
                onClick={() => {
                  if (loginUser?.user_id) {
                    addToCart(item._id, item.name);
                  } else {
                    showToast("warn", "Login required to add product in cart!");
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))) || <h2>Product list is empty</h2>}
    </div>
  );
};
