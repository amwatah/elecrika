import React from "react";
import { useSnapshot } from "valtio";
import { GlobalStore } from "../../store";
import CartItem from "../components/CartItem";

const Cart = () => {
  const GlobalStoreSnapshot = useSnapshot(GlobalStore);
  return (
    <div>
      {GlobalStoreSnapshot.electronicsInCart.map((electronic) => (
        <CartItem {...electronic} key={electronic.id} />
      ))}
    </div>
  );
};

export default Cart;
