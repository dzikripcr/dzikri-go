import React, { createContext, useContext, useState, useEffect } from "react";
import { useRewards, POINTS_PER_RUPIAH } from "./RewardsContext";

const CartContext = createContext();

const CART_STORAGE_KEY = "dm_boutiquera_cart";
const ORDERS_STORAGE_KEY = "dm_boutiquera_orders";

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Gagal membaca ${key} dari localStorage:`, error);
    return defaultValue;
  }
}

export function CartProvider({ children }) {
  // PENTING: CartProvider harus dirender di DALAM RewardsProvider (lihat App.jsx)
  const { addPoints, markVoucherUsed } = useRewards();

  const [cartItems, setCartItems] = useState(() => loadFromStorage(CART_STORAGE_KEY, []));
  const [orders, setOrders] = useState(() => loadFromStorage(ORDERS_STORAGE_KEY, []));

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Gagal menyimpan cart ke localStorage:", error);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error("Gagal menyimpan orders ke localStorage:", error);
    }
  }, [orders]);

  const addToCart = (product, quantity, size) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        const newQty = newItems[existingItemIndex].quantity + quantity;
        newItems[existingItemIndex].quantity = product.stok ? Math.min(product.stok, newQty) : newQty;
        return newItems;
      }
      return [...prevItems, { ...product, quantity, size }];
    });
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.size === size) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: item.stok ? Math.min(item.stok, Math.max(1, newQty)) : Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCartItems([]);

  // Menyimpan pesanan ke riwayat, mengosongkan keranjang, DAN mengintegrasikan
  // sistem reward: otomatis kasih poin dari belanja, dan "matikan" voucher yang dipakai
  const placeOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);

    // 1 poin didapat setiap kelipatan Rp10.000 dari subtotal produk
    const pointsEarned = Math.floor((newOrder.subtotal || 0) / POINTS_PER_RUPIAH);
    if (pointsEarned > 0) {
      addPoints(pointsEarned, `Belanja pesanan ${newOrder.id}`);
    }

    // Kalau pesanan ini pakai voucher hasil tukar poin, tandai voucher itu sudah terpakai
    if (newOrder.voucherCode) {
      markVoucherUsed(newOrder.voucherCode);
    }

    clearCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, orders, addToCart, updateQuantity, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);