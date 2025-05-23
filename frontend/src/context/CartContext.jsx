import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('cafeUserId') || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user's cart when userId changes
  useEffect(() => {
    const loadUserCart = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/carts/user/${userId}`);
        if (response.data.success) {
          setCart(response.data.items || []);
        }
      } catch (err) {
        console.error('Error loading cart:', err);
        setError('Failed to load cart. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserCart();
  }, [userId]);

  // Handle browser close/tab close
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear user data from localStorage when browser is closed
      localStorage.removeItem('cafeUserData');
      localStorage.removeItem('cafeUserId');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Save cart to backend whenever it changes
  useEffect(() => {
    if (!userId || cart.length === 0) return;

    const saveCart = async () => {
      try {
        await axios.post('http://localhost:5000/api/carts', {
          userId,
          items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            menuItemId: item.menuItemId || item._id
          }))
        });
      } catch (err) {
        console.error('Error saving cart:', err);
        setError('Failed to save cart. Your changes may not be saved.');
      }
    };

    // Use a small delay to avoid too many API calls
    const timer = setTimeout(saveCart, 500);
    return () => clearTimeout(timer);
  }, [cart, userId]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.menuItemId === (item.menuItemId || item._id));
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.menuItemId === (item.menuItemId || item._id)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { 
        menuItemId: item.menuItemId || item._id,
        name: item.name,
        price: item.price,
        quantity: 1 
      }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      return prevCart
        .map(cartItem =>
          cartItem.menuItemId === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter(cartItem => cartItem.quantity > 0);
    });
  };

  const clearCart = async () => {
    if (userId) {
      try {
        await axios.delete(`http://localhost:5000/api/carts/user/${userId}`);
      } catch (err) {
        console.error('Error clearing cart:', err);
        setError('Failed to clear cart. Please try again.');
      }
    }
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      addToCart,
      removeFromCart,
      getCartItemsCount,
      calculateTotal,
      clearCart,
      setUserId,
      userId,
      isLoading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
