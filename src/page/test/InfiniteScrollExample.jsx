import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductDisplay = () => {
  const { productFetch } = useSelector((state) => state.productFetch);

  const [products, setProducts] = useState([]); // To store product data
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Check if more data is available
  const names = [];
const baseNames = [
  "Alice", "Bob", "Charlie", "David", "Emily", "Frank", "Grace", "Hannah", "Ian", "Jack",
  "Katie", "Liam", "Mia", "Nathan", "Olivia", "Peter", "Quincy", "Rachel", "Sophia", "Thomas",
  "Uma", "Victor", "Wendy", "Xander", "Yara", "Zach", "Aaron", "Bella", "Caleb", "Diana",
  "Ethan", "Fiona", "Gavin", "Hailey", "Isaac", "Jenna", "Kevin", "Laura", "Mason", "Nina",
  "Owen", "Paige", "Quinn", "Ruby", "Samuel", "Tina", "Ulysses", "Vanessa", "William", "Zoe"
];

// Repeat baseNames until we have 500 names
for (let i = 0; i < 500; i++) {
  names.push(baseNames[i % baseNames.length] + (Math.floor(i / baseNames.length) + 1));
}
  // Fetch products from an API or data source
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      // Replace with your actual API
    //   const response = await fetch(`https://api.example.com/products?page=${page}`);
      const data = await productFetch.json();
      if (data.products.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Load initial data and more data on scroll
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // Handle scrolling to bottom to load more products
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <h1>Product Display</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {names?.map((product, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px" }}>
            {/* <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} /> */}
            <h2>{product}</h2>
            {/* <p>{product.description}</p>
            <p><strong>${product.price}</strong></p> */}
          </div>
        ))}
      </div>
      {loading && <p>Loading more products...</p>}
      {!hasMore && <p>No more products to display.</p>}
    </div>
  );
};

export default ProductDisplay;
