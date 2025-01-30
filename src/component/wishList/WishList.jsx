// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetch } from "../../redux/thunk/wishlist/WishList";
// // import useToast from "../../hook/toast/useToast";
// // import empty_heart from "../../assects/images/empty_heart.png";
// // import "./WishList.css";
// // export const WishList = () => {
// //   const { wishList, status, message, success } = useSelector(
// //     (state) => state.wishListFetch
// //   );
// //   var wishListData;
// //   console.log("status: ", status);
// //   console.log("wishList: ", wishList);
// //   const dispatch = useDispatch();
// //   const { showToast } = useToast();

// //   useEffect(() => {
// //     const id=JSON.parse(localStorage.getItem("loginAuth"))._id
// //     dispatch(fetch(id));
// //   }, [dispatch]);

// //   return (
// //     <div className="product-container">
// //       {wishList.map((item, index) => (
// //         <div className="product-card" key={index}>
// //           {console.log("item: ", item.productId)}
// //           {/* {(wishListData = item.productId)} */}
// //           {console.log("wishListData: ", wishListData)}
// //           <span
// //             className="wishlist-icon"
// //             onClick={() => showToast("Added to Wishlist!")}
// //           >
// //             <img src={empty_heart} />
// //           </span>
// //           <img
// //             src={item.productId.image}
// //             alt={item.productId.name}
// //             className="product-image"
// //           />
// //           <div className="product-details">
// //             <h2 className="product-title">{item.productId.name}</h2>
// //             <p className="product-description">{item.productId.description}</p>
// //             <p className="product-price">
// //               ${item.productId.price}
// //               {item.productId.discount > 0 && (
// //                 <span className="product-discount">
// //                   {" "}
// //                   {item.productId.discount}% OFF
// //                 </span>
// //               )}
// //             </p>
// //             <button className="add-to-cart-btn">Add to Cart</button>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetch } from "../../redux/thunk/wishlist/WishList";
// import useToast from "../../hook/toast/useToast";
// import empty_heart from "../../assects/images/empty_heart.png";
// import "./WishList.css";

// export const WishList = () => {
//   const { wishListFetch, status, message, success } = useSelector(
//     (state) => state.wishListFetch
//   );
//   const dispatch = useDispatch();
//   const { showToast } = useToast();
//   wishListFetch
//   useEffect(() => {
//     const id = JSON.parse(localStorage.getItem("loginAuth"))._id;
//     dispatch(fetch(id));
//   }, [dispatch]);

//   return (
//     <div className="product-container">
//       {wishListFetch.length === 0 ? (
//         <div className="empty-wishlist-message">{message}</div>
//       ) : (
//         wishListFetch.map((item, index) => (
//           <div className="product-card" key={index}>
//             <span
//               className="wishlist-icon"
//               onClick={() => showToast("Added to Wishlist!")}
//             >
//               <img src={empty_heart} alt="wishlist-icon" />
//             </span>
//             <img
//               src={item.productId.image}
//               alt={item.productId.name}
//               className="product-image"
//             />
//             <div className="product-details">
//               <h2 className="product-title">{item.productId.name}</h2>
//               <p className="product-description">
//                 {item.productId.description}
//               </p>
//               <p className="product-price">
//                 ${item.productId.price}
//                 {item.productId.discount > 0 && (
//                   <span className="product-discount">
//                     {" "}
//                     {item.productId.discount}% OFF
//                   </span>
//                 )}
//               </p>
//               <button className="add-to-cart-btn">Add to Cart</button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import "./WishList.css";
// // import useToast from "../../hook/toast/useToast";
// import { useDispatch, useSelector } from "react-redux";
// import empty_heart from "../../assects/images/empty_heart.png";
// import fill_heart from "../../assects/images/fill_heart.png";

// // import { fetch as wishListFetch } from "../../../redux/thunk/product/Product";
// import { fetch, post, deleted } from "../../redux/thunk/wishlist/WishList";

// export const WishList = () => {
//   // const { wishListFetch } = useSelector((state) => state.wishListFetch);
//   const { wishListFetch } = useSelector((state) => state.wishListFetch);
//   // const { showToast } = useToast();
//   const dispatch = useDispatch();

//   const [wishlistIds, setWishlistIds] = useState([]);

//   useEffect(() => {
//     const id = JSON.parse(localStorage.getItem("loginAuth")).user_id;
//     // dispatch(wishListFetch());
//     dispatch(fetch(id));
//   }, [dispatch]);

//   useEffect(() => {
//     if (wishListFetch) {
//       const ids = wishListFetch.map((item) => item.productId._id);
//       // console.log('ids: ', ids);
//       setWishlistIds(ids);
//     }
//   }, [wishListFetch]);

//   const addToWishlist = async (productId, productName) => {
//     const id = JSON.parse(localStorage.getItem("loginAuth")).user_id;
//     const productExist = wishListFetch.some(
//       (data) => data.productId._id === productId
//     );

//     if (!productExist) {
//       await dispatch(post({ id, productId }));
//       // showToast("info", productName + " added to Wish-list!");
//       dispatch(fetch(id));
//     } else {
//       await dispatch(deleted({ id, productId }));
//       // showToast("info", productName + " already exists in Wish-list!");
//       dispatch(fetch(id));
//     }
//   };

//   return (
//     <>
//       {wishListFetch&&wishListFetch.length > 0 ?<div className="product-container">
//         {wishListFetch.map((item, index) => (
//           <div className="product-card" key={index}>
//             <span
//               className="wishlist-icon"
//               onClick={() =>
//                 addToWishlist(item.productId._id, item.productId.name)
//               }
//             >
//               <img
//                 src={
//                   wishlistIds && wishlistIds.includes(item.productId._id)
//                     ? fill_heart
//                     : empty_heart
//                 }
//                 alt={
//                   wishlistIds && wishlistIds.includes(item.productId._id)
//                     ? "wishlist-"
//                     : "wishlist+"
//                 }
//               />
//             </span>
//             <img
//               src={item.productId.image}
//               alt={item.productId.name}
//               className="product-image"
//             />
//             <div className="product-details">
//               <h2 className="product-title">{item.productId.name}</h2>
//               <p className="product-description">
//                 {item.productId.description}
//               </p>
//               <p className="product-price">
//                 ${item.productId.price}
//                 {item.productId.discount > 0 && (
//                   <span className="product-discount">
//                     {" "}
//                     {item.productId.discount}% OFF
//                   </span>
//                 )}
//               </p>
//               <button className="add-to-cart-btn">Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>:<h2>Wish-list is empty</h2>}
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import "./WishList.css";
import useToast from "../../hook/toast/useToast";
import { useDispatch, useSelector } from "react-redux";
import empty_heart from "../../assects/images/empty_heart.png";
import fill_heart from "../../assects/images/fill_heart.png";

// import { fetch as productDataFetch } from "../../redux/thunk/product/Product";
import {
  fetch as wishListDataFetch,
  post as wishListDataPost,
  deleted,
} from "../../redux/thunk/wishlist/WishList";
import {
  post as CartDataPost,
  fetch as CartDataFetch,
  update,
} from "../../redux/thunk/cart/Cart";
import { resetStatus as cartPostResetStatus } from "../../redux/slice/cart/Post";
import { resetStatus as cartUpdateResetStatus } from "../../redux/slice/cart/Update";

export const WishList = () => {
  console.log("WishList geting loding ....");
  // const { productFetch } = useSelector((state) => state.productFetch);
  const { wishListFetch } = useSelector((state) => state.wishListFetch);
  const { cartFetch } = useSelector((state) => state.cartFetch);
  const { loginUser } = useSelector((state) => state.login);

  const { cartPost, status: cartPostStatus } = useSelector(
    (state) => state.cartPost
  );
  const { cartUpdate, status: cartUpdateStatus } = useSelector(
    (state) => state.cartUpdate
  );
  console.log("cartFetch: ", cartFetch);

  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartIds, setcartIds] = useState([]);

  useEffect(() => {
    const id = loginUser.user_id;
    dispatch(wishListDataFetch(id));
  }, [dispatch]);

  useEffect(() => {
    if (wishListFetch) {
      const ids = wishListFetch.map((item) => item.productId._id);
      setWishlistIds(ids);
    }
    if (cartFetch) {
      const ids = cartFetch.map((data) => data.productId?._id);
      setcartIds(ids);
    }
  }, [wishListFetch]);

  useEffect(() => {
    const id = loginUser.user_id;
    dispatch(CartDataFetch(id));
  }, [cartPostStatus]);
  // useEffect(() => {
  //   const id = loginUser.user_id;
  //   dispatch(CartDataFetch(id));
  // }, [cartUpdateStatus]);

  const addToWishlist = async (productId, productName) => {
    const id = loginUser.user_id;
    const productExist = wishListFetch.some(
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
      const id = loginUser.user_id;
      const existingCartItem = cartFetch.find(
        (data) => data.userId === id && data.productId?._id === productId
      );
      console.log("existingCartItem: ", existingCartItem);
      if (!existingCartItem) {
        await dispatch(CartDataPost({ userId: id, productId }));
        showToast("success", `${productName} added to cart!`);
        // dispatch(cartPostResetStatus());
      } else {
        const updatedQuantity = existingCartItem.quantity + 1;
        await dispatch(
          update({ userId: id, productId, quantity: updatedQuantity })
        );
        showToast("info", `${productName} quantity updated in cart!`);
        // dispatch(cartUpdateResetStatus());
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("error", "Failed to add product to cart.");
    }
  };

  return (
    <div className="product-container">
      {wishListFetch?.length>0&&wishListFetch?.map((item, index) => (
        <div className="product-card" key={index}>
          <span
            className="wishlist-icon"
            onClick={() =>
              addToWishlist(item.productId._id, item.productId.name)
            }
          >
            <img
              src={
                wishlistIds && wishlistIds.includes(item.productId._id)
                  ? fill_heart
                  : empty_heart
              }
              alt={
                wishlistIds && wishlistIds.includes(item.productId._id)
                  ? "wishlist-"
                  : "wishlist+"
              }
            />
          </span>
          <img
            src={item.productId.image}
            alt={item.productId.name}
            className="product-image"
          />
          <div className="product-details">
            <h2 className="product-title">{item.productId.name}</h2>
            <p className="product-description">{item.productId.description}</p>
            <p className="product-price">
              ${item.productId.price}
              {item.productId.discount > 0 && (
                <span className="product-discount">
                  {" "}
                  {item.productId.discount}% OFF
                </span>
              )}
            </p>
            <button
              className="add-to-cart-btn"
              style={{
                backgroundColor: cartIds.includes(item.productId._id)
                  ? "green"
                  : null,
              }}
              onClick={() => {
                addToCart(item.productId._id, item.productId.name);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))||<h2>Your wish-list is empty</h2>}
    </div>
  );
};
