import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Fungsi menambah ke keranjang belanja
  const addToCart = (product, quantity, size) => {
    setCartItems((prevItems) => {
      // Cek apakah produk dengan ID dan Ukuran yang sama sudah ada di keranjang
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        // Tambahkan kuantitasnya dengan batas maksimum stok jika ada
        const newQty = newItems[existingItemIndex].quantity + quantity;
        newItems[existingItemIndex].quantity = product.stok ? Math.min(product.stok, newQty) : newQty;
        return newItems;
      }

      return [...prevItems, { ...product, quantity, size }];
    });
  };

  // Fungsi mengubah jumlah barang langsung di keranjang
  const updateQuantity = (id, size, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: item.stok ? Math.min(item.stok, Math.max(1, newQty)) : Math.max(1, newQty) };
          }
          return item;
        })
    );
  };

  // Fungsi menghapus item dari keranjang
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);