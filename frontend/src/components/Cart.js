import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = (props) => {
  const [cart, setCart] = useState([]);

  // FETCH CART
  const fetchCart = () => {
    axios.get("http://localhost:5000/cart")
      .then((res) => {
        setCart(res.data);

        if (props.setCartCount) {
          props.setCartCount(res.data.length);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, [props.refresh]);

  // REMOVE ITEM
  const removeItem = (id) => {
    console.log("REMOVE CLICKED");
    console.log("REMOVE ID:", id);

    axios.delete(`http://localhost:5000/cart/remove/${id}`)
      .then((res) => {

        console.log("REMOVE SUCCESS:", res.data);

        fetchCart();
      })
      .catch((err) => {
        console.log("REMOVE ERROR:", err);
      });
  };

  // UPDATE QUANTITY DEBUG VERSION
  const updateQty = (id, action) => {

    console.log("BUTTON CLICKED");
    console.log("ID:", id);
    console.log("ACTION:", action);

    axios.put(`http://localhost:5000/cart/update/${id}`, { action })
      .then((res) => {

        console.log("SUCCESS:", res.data);

        fetchCart();

      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  // TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          🛒 Your cart is empty
        </p>
      ) : (
        <>
          {cart.map((c) => (
            <div
              key={c._id}
              style={{
                border: "1px solid #eee",
                borderRadius: "10px",
                padding: "12px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <h4>{c.name}</h4>

                <p>
                  ₹{c.price} × {c.quantity || 1}
                </p>

                {/* QUANTITY BUTTONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "5px"
                  }}
                >
                  <button
                    onClick={() => updateQty(c._id, "dec")}
                  >
                    -
                  </button>

                  <button
                    onClick={() => updateQty(c._id, "inc")}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(c._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                  borderRadius: "5px"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3
            style={{
              marginTop: "15px",
              textAlign: "right"
            }}
          >
            Total: ₹{total}
          </h3>
        </>
      )}
    </div>
  );
};

export default Cart;
