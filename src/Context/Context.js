import React, { useContext, createContext, useState, Children } from "react";
const CartContext = createContext();

export function ContextProvider({ children }) {
  const [userdetails, setuserdetails] = useState([]);
  return (
    <CartContext.Provider value={{ userdetails, setuserdetails }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
