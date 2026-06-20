import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useCart from "../hooks/useCart.js";

const Cart = () => {
  const {
    handleGetCart,
    handleIncrementUpdateCartQuantity,
    handleDecrementUpdateCartQuantity,
  } = useCart();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    handleGetCart();
  }, []);

  return (
    <div>
      <h1>Cart</h1>

      <h2>Total Price: {cart.currency} {cart.totalPrice}</h2>

      {cart.items.map((item) => (
        <div key={item._id}>
          <img
            src={item.product.variants.images[0].url}
            alt={item.product.title}
            width={150}
          />

          <h3>{item.product.title}</h3>

          <p>
            Color: {item.product.variants.attributes.color}
          </p>

          <p>
            Size: {item.product.variants.attributes.size}
          </p>

          <p>Quantity: {item.quantity}</p>

          <button
            onClick={() =>
              handleDecrementUpdateCartQuantity({
                productId: item.product._id,
                variantId: item.variant,
              })
            }
          >
            -
          </button>

          <button
            onClick={() =>
              handleIncrementUpdateCartQuantity({
                productId: item.product._id,
                variantId: item.variant,
              })
            }
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;