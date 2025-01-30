import React, { useEffect, useState } from "react";
import "./Header.css"; // Import the external CSS file
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch as cartDataFetch } from "../../redux/thunk/cart/Cart";
import { fetch as productDataFetch } from "../../redux/thunk/product/Product";
import search_icon from "../../assects/images/search_icon.png";
export const Header = () => {
  const { cartFetch } = useSelector((state) => state.cartFetch);
  const { loginUser } = useSelector((state) => state.login);
  const [dropDownValue, setDropDownValue] = useState({
    uploadproduct: "Upload Product",
    editproduct: "Edit Product",
    deleteproduct: "Delete Product",
    all: "All",
    displayproduct: "Products",
    cart: "Cart",
    wishlist: "Wish list",
  });
  const [dropDownCurrentValue, setDropDownCurrentValue] = useState(
    Object.keys(dropDownValue)
      .slice(0, 3)
      .includes(window.location.pathname.trim().replace("/", ""))
      ? window.location.pathname.trim().replace("/", "")
      : "editproduct"
  );
  const [searchDropDownCurrentValue, setSearchDropDownCurrentValue] = useState(
    Object.keys(dropDownValue).includes(
      window.location.pathname.trim().replace("/", "")
    )
      ? window.location.pathname.trim().replace("/", "")
      : "all"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const id = loginUser?.user_id;
      dispatch(cartDataFetch(id));
      dispatch(productDataFetch());
    } catch (error) {
      localStorage.setItem("loginAuth", JSON.stringify({}));
    }
  }, [dispatch]);

  useEffect(() => {
    setSearchDropDownCurrentValue(
      Object.keys(dropDownValue).includes(
        window.location.pathname.trim().replace("/", "")
      )
        ? window.location.pathname.trim().replace("/", "")
        : "all"
    );
  }, [window.location.pathname]);

  return (
    <header>
      <div className="header-top">
        <div className="contact-info">
          <span>Contact Us: +123 456 7890</span>
          <span>Email: support@civicconnect.com</span>
        </div>
        <div className="social-links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <nav className="navbar">
        <ul>
          <Link to="/home">Home</Link>
          <Link to="/displayproduct">Product</Link>

          <Link to="/cart">
            Cart{" "}
            {cartFetch && cartFetch.length > 0 && (
              <span className="cart_quantity">{cartFetch.length}</span>
            )}
          </Link>
          <Link to="/wishlist">Wish list</Link>
          {loginUser?.isAdmin == true ? (
            <a className="btn-group">
              <button className="btn btn-success">
                <Link to={`/${dropDownCurrentValue}`}>
                  {dropDownValue[dropDownCurrentValue]}
                </Link>
              </button>
              <button
                className="btn btn-success dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div className="dropdown-menu">
                <Link
                  to="/uploadproduct"
                  onClick={() => {
                    setDropDownCurrentValue("uploadproduct");
                  }}
                  className={`dropdown-item ${
                    dropDownCurrentValue === "uploadproduct"
                      ? "dropdownPreFocusItem"
                      : ""
                  }`}
                >
                  Upload Product
                </Link>
                <Link
                  to="/editproduct"
                  onClick={() => {
                    setDropDownCurrentValue("editproduct");
                  }}
                  className={`dropdown-item ${
                    dropDownCurrentValue === "editproduct"
                      ? "dropdownPreFocusItem"
                      : ""
                  }`}
                >
                  Edit Product
                </Link>
                <Link
                  to="/deleteproduct"
                  onClick={() => {
                    setDropDownCurrentValue("deleteproduct");
                  }}
                  className={`dropdown-item ${
                    dropDownCurrentValue === "deleteproduct"
                      ? "dropdownPreFocusItem"
                      : ""
                  }`}
                  // className={"dropdown-item"}
                >
                  Delete Product
                </Link>
              </div>
            </a>
          ) : null}
        </ul>
        {/* <div className="search-area">
          <select className="search-dropdown">
            <option value="all">All</option>
            <option value="products">Products</option>
            <option value="users">Cart</option>
            <option value="orders">Wish-List</option>
          </select>
          <input type="text" placeholder="  Search..." />
          <button type="button">Search</button>
        </div> */}
        <div className="search-area">
          <div className="custom-btn-group">
            <div className="custom-btn-display">
              {dropDownValue[searchDropDownCurrentValue]}
            </div>
            <button
              className="custom-btn custom-btn-success custom-dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
            <div className="custom-dropdown-menu">
              <a
                onClick={() => {
                  setSearchDropDownCurrentValue("displayproduct");
                }}
                className={`custom-dropdown-item ${
                  searchDropDownCurrentValue === "displayproduct"
                    ? "custom-dropdown-pre-focus-item"
                    : ""
                }`}
              >
                Product
              </a>
              <a
                onClick={() => {
                  setSearchDropDownCurrentValue("cart");
                }}
                className={`custom-dropdown-item ${
                  searchDropDownCurrentValue === "cart"
                    ? "custom-dropdown-pre-focus-item"
                    : ""
                }`}
              >
                Cart
              </a>
              <a
                onClick={() => {
                  setSearchDropDownCurrentValue("wishlist");
                }}
                className={`custom-dropdown-item ${
                  searchDropDownCurrentValue === "wishlist"
                    ? "custom-dropdown-pre-focus-item"
                    : ""
                }`}
              >
                Wish list
              </a>
              <a
                onClick={() => {
                  setSearchDropDownCurrentValue("uploadproduct");
                }}
                className={`custom-dropdown-item ${
                  searchDropDownCurrentValue === "uploadproduct"
                    ? "custom-dropdown-pre-focus-item"
                    : ""
                }`}
              >
                Upload Product
              </a>
              <a
                onClick={() => {
                  setSearchDropDownCurrentValue("editproduct");
                }}
                className={`custom-dropdown-item ${
                  searchDropDownCurrentValue === "editproduct"
                    ? "custom-dropdown-pre-focus-item"
                    : ""
                }`}
              >
                Edit Product
              </a>
              <a
                onClick={() => {
                  setSearchDropDownCurrentValue("deleteproduct");
                }}
                className={`custom-dropdown-item ${
                  searchDropDownCurrentValue === "deleteproduct"
                    ? "custom-dropdown-pre-focus-item"
                    : ""
                }`}
              >
                Delete Product
              </a>
            </div>
          </div>
          <div className="search">
            <input type="text" placeholder="  Search..." />
          </div>
          <div className="search-icon">
            <img src={search_icon} alt="" srcset="" />
          </div>
        </div>
        <div className="auth-buttons">
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>
      </nav>
    </header>
  );
};
