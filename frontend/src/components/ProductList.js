import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Add to cart
  const addToCart = (item) => {
    axios
      .post("http://localhost:5000/cart/add", item)
      .then(() => {
        console.log("Added to cart");

        // refresh cart in App.js
        if (props.refresh) {
          props.refresh();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "10px" }}>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "15px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* PRODUCT LIST */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        {products
          .filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "15px",
                width: "250px",
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                textAlign: "center",
                transition: "0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {/* IMAGE */}
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />

              {/* NAME */}
              <h3>{p.name}</h3>

              {/* PRICE */}
              <p style={{ fontWeight: "bold" }}>₹{p.price}</p>

              {/* DESCRIPTION */}
              <p style={{ fontSize: "13px", color: "#666" }}>
                {p.description}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => addToCart(p)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
