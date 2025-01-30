import React, { useCallback, useEffect, useState } from "react";
import "./Cart.css"; // Import the external CSS file
import { useDispatch, useSelector } from "react-redux";
import { deleted, fetch, update } from "../../redux/thunk/cart/Cart";

export const Cart = () => {
  const { cartFetch } = useSelector((state) => state.cartFetch);
  console.log('cartFetch: ', cartFetch);
  const { cartUpdate, cartDelete } = useSelector((state) => state);
  const { loginUser } = useSelector((state) => state.login);

  // console.log("cartUpdate: ", cartUpdate);
  // console.log('status: ', status);

  const dispatch = useDispatch();
  // console.log("call~~~~~~~");

  useEffect(() => {
    const id = loginUser.user_id;
    dispatch(fetch(id));
  }, [dispatch, cartUpdate, cartDelete]);

  const discount = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  };

  const handleIncrease = (userId, productId, quantity) => {
    // console.log("handleIncrease ...");
    quantity += 1;
    dispatch(update({ userId, productId, quantity }));
    const id = loginUser.user_id;
    // dispatch(fetch(id));
  };

  const handleDecrease = (userId, productId, quantity) => {
    // console.log("handleDecrease ...");
    quantity -= 1;
    if (quantity > 0) {
      dispatch(update({ userId, productId, quantity }));
      const id = loginUser.user_id;
      // dispatch(fetch(id));
    }
  };

  const displayQuantity = useCallback(
    (quantity) => {
      return <span className="quantity">{quantity}</span>;
    },
    [cartUpdate, status]
  );

  const total = (price, discount, quantity) => {
    const totalPrice = ((price - (price * discount) / 100) * quantity).toFixed(
      2
    );
    return totalPrice;
  };

  const remove = (userId, productId) => {
    dispatch(deleted({ userId, productId }));
  };
  const buy = (userId, productId) => {
    dispatch(update({ userId, productId, delivered: "panding" }));
  };

  const discountPriceStyle = {
    textDecoration: "line-through",
  };

  return (
    <>
      {cartFetch?.length > 0 ? (
        cartFetch.map((product, index) => (
          <div key={index} className="cart-container">
            {/* Left Section */}
            <div className="left-section">
              <img
                src={product.productId?.image}
                alt={product.name}
                className="product-image"
              />
              <div>
                <h2 className="product-name">{product.productId?.name}</h2>
                <p className="product-description">
                  {product.productId?.description}
                </p>
                <div className="price-container">
                  <p
                    className="original-price"
                    style={
                      product.productId?.discount > 0 ? discountPriceStyle : null
                    }
                  >
                    ₹{product.productId?.price}
                  </p>
                  {product.productId?.discount > 0 && (
                    <p className="discounted-price">
                      ₹
                      {discount(
                        product.productId?.price,
                        product.productId?.discount
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="right-section">
              <div className="quantity-buttons">
                <button
                  type="button"
                  onClick={() => {
                    handleDecrease(
                      product.userId,
                      product.productId._id,
                      product.quantity
                    );
                  }}
                  className="quantity-button"
                  disabled={!(product.quantity > 0)}
                >
                  -
                </button>
                {/* <span className="quantity">{product.quantity}</span> */}
                {displayQuantity(product.quantity)}
                <button
                  type="button"
                  onClick={() => {
                    handleIncrease(
                      product.userId,
                      product.productId._id,
                      product.quantity
                    );
                  }}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              <p className="total-price">
                Total: ₹
                {total(
                  product.productId?.price,
                  product.productId?.discount,
                  product?.quantity
                )}
              </p>
              <div className="buttons">
                <button
                  className="remove-button"
                  onClick={() => {
                    remove(product.userId, product.productId._id);
                  }}
                >
                  Remove
                </button>
                <button
                  className="buy-button"
                  onClick={() => {
                    buy(product.userId, product.productId._id);
                  }}
                >
                  Buy Now
                </button>
              </div>
              {product.delivered != "idle" && (
                <div className="delivery-section">
                  <p className="delivery-status">
                    Delivery: {product.delivered}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <h2>Cart is empty</h2>
      )}
    </>
  );
};

// import React, { useEffect, useState } from "react";
// import "./Cart.css"; // Import the external CSS file
// import { useDispatch, useSelector } from "react-redux";
// import { deleted, fetch, update } from "../../redux/thunk/cart/Cart";

// export const Cart = () => {
//   const { cartFetch } = useSelector((state) => state.cartFetch);
//   // const  cartFetchSlice  = useSelector((state) => state);
//   // console.log('cartFetchSlice: ', cartFetchSlice.cartFetch);

//   // const cartUpdateSlice = useSelector((state) => state);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const id = JSON.parse(localStorage.getItem("loginAuth")).user_id;
//     dispatch(fetch(id));
//   }, [dispatch]);

//   // Calculate prices
//   // const originalPrice = product.price;

//   const discount = (price, discount) => {
//     const discountedPrice = price - (price * discount) / 100;
//     return discountedPrice;
//   };

//   // Handle quantity changes
//   const handleIncrease = (userId, productId, quantity) => {
//     quantity += 1;
//     dispatch(update({ userId, productId, quantity }));
//     const id = JSON.parse(localStorage.getItem("loginAuth")).user_id;
//     dispatch(fetch(id));
//   };

//   const handleDecrease = (userId, productId, quantity) => {
//     quantity -= 1;
//     if (quantity > 0) {
//       dispatch(update({ userId, productId, quantity }));
//       const id = JSON.parse(localStorage.getItem("loginAuth")).user_id;
//       dispatch(fetch(id));
//     }
//   };

//   const total = (price, discount, quantity) => {
//     const totalPrice = ((price - (price * discount) / 100) * quantity).toFixed(
//       2
//     );
//     return totalPrice;
//   };

//   const remove = (userId, productId) => {
//     dispatch(deleted({ userId, productId }));
//   };
//   const buy = (userId, productId) => {
//     dispatch(update({ userId, productId, delivered: "panding" }));
//   };

//   const discountPriceStyle = {
//     textDecoration: "line-through",
//   };

//   return (
//     <>
//       {cartFetch && cartFetch.length > 0 ? (
//         cartFetch.map((product, index) => (
//           <div key={index} className="cart-container">
//             {/* Left Section */}
//             <div className="left-section">
//               <img
//                 src={product.productId.image}
//                 alt={product.name}
//                 className="product-image"
//               />
//               <div>
//                 <h2 className="product-name">{product.productId.name}</h2>
//                 <p className="product-description">
//                   {product.productId.description}
//                 </p>
//                 <div className="price-container">
//                   <p
//                     className="original-price"
//                     style={
//                       product.productId.discount > 0 ? discountPriceStyle : null
//                     }
//                   >
//                     ₹{product.productId.price}
//                   </p>
//                   {product.productId.discount > 0 && (
//                     <p className="discounted-price">
//                       ₹
//                       {discount(
//                         product.productId.price,
//                         product.productId.discount
//                       )}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Section */}
//             <div className="right-section">
//               <div className="quantity-buttons">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     handleDecrease(
//                       product.userId,
//                       product.productId._id,
//                       product.quantity
//                     );
//                   }}
//                   className="quantity-button"
//                   disabled={!(product.quantity > 0)}
//                 >
//                   -
//                 </button>
//                 <span className="quantity">{product.quantity}</span>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     handleIncrease(
//                       product.userId,
//                       product.productId._id,
//                       product.quantity
//                     );
//                   }}
//                   className="quantity-button"
//                 >
//                   +
//                 </button>
//               </div>
//               <p className="total-price">
//                 Total: ₹
//                 {total(
//                   product.productId.price,
//                   product.productId.discount,
//                   product.quantity
//                 )}
//               </p>
//               <div className="buttons">
//                 <button
//                   className="remove-button"
//                   onClick={() => {
//                     remove(product.userId, product.productId._id);
//                   }}
//                 >
//                   Remove
//                 </button>
//                 <button
//                   className="buy-button"
//                   onClick={() => {
//                     buy(product.userId, product.productId._id);
//                   }}
//                 >
//                   Buy Now
//                 </button>
//               </div>
//               {product.delivered != "idle" && (
//                 <div className="delivery-section">
//                   <p className="delivery-status">
//                     Delivery: {product.delivered}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <h2>Cart is empty</h2>
//       )}
//     </>
//   );
// };

// import React, { useEffect, useState } from "react";
// import "./Cart.css"; // Import the external CSS file
// import { useDispatch, useSelector } from "react-redux";
// import { fetch } from "../../redux/thunk/cart/Cart";

// export const Cart = () => {
//   const { cartFetch } = useSelector((state) => state.cartFetch);
//   const dispatch = useDispatch();

//   const [quantity, setQuantity] = useState(1);
//   const [deliveryStatus, setDeliveryStatus] = useState({});

//   useEffect(() => {
//     const id = JSON.parse(localStorage.getItem("loginAuth"))._id;
//     dispatch(fetch(id));
//   }, [dispatch]);

//   // Calculate prices
//   const discount = (price, discount) => {
//     const discountedPrice = price - (price * discount) / 100;
//     return discountedPrice;
//   };

//   const total = (price, discount, quantity) => {
//     const totalPrice = ((price - (price * discount) / 100) * quantity).toFixed(
//       2
//     );
//     return totalPrice;
//   };

//   // Handle quantity changes
//   const handleIncrease = () => setQuantity(quantity + 1);
//   const handleDecrease = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   // Handle Delivery Status
//   const handleDelivery = (productId) => {
//     setDeliveryStatus((prevStatus) => ({
//       ...prevStatus,
//       [productId]: "Pending",
//     }));
//   };

//   return (
//     <>
//       {cartFetch.map((product, index) => (
//         <div key={index} className="cart-container">
//           {/* Left Section */}
//           <div className="left-section">
//             <img
//               src={product.productId.image}
//               alt={product.name}
//               className="product-image"
//             />
//             <div>
//               <h2 className="product-name">{product.productId.name}</h2>
//               <p className="product-description">{product.productId.description}</p>
//               <div className="price-container">
//                 <p className="original-price">₹{product.productId.price}</p>
//                 <p className="discounted-price">
//                   ₹{discount(product.productId.price, product.productId.discount)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="right-section">
//             <div className="quantity-buttons">
//               <button
//                 onClick={handleDecrease}
//                 className="quantity-button"
//                 disabled={!(product.quantity > 1)}
//               >
//                 -
//               </button>
//               <span className="quantity">{product.quantity}</span>
//               <button onClick={handleIncrease} className="quantity-button">
//                 +
//               </button>
//             </div>
//             <p className="total-price">
//               Total: ₹
//               {total(
//                 product.productId.price,
//                 product.productId.discount,
//                 product.quantity
//               )}
//             </p>
//             <div className="buttons">
//               <button
//                 className="remove-button"
//                 onClick={() => alert("Remove functionality to be implemented")}
//               >
//                 Remove
//               </button>
//               <button
//                 className="buy-button"
//                 onClick={() => alert("Buy functionality to be implemented")}
//               >
//                 Buy Now
//               </button>
//             </div>

//             {/* Delivery Status Section */}
//             <div className="delivery-section">
//                 <p className="delivery-status">
//                   Delivery: {deliveryStatus[product.productId._id]}
//                 </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };
