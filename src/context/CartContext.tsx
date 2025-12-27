import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types/product';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updatePrescriptionStatus: (productId: string, status: CartItem['prescriptionStatus'], prescriptionId?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  hasItemsPendingApproval: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        toast({
          title: 'Quantity Updated',
          description: `${product.name} quantity increased in cart.`,
        });
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      }
      toast({
        title: 'Added to Cart',
        description: `${product.name} has been added to your cart.`,
      });
      return [
        ...prev,
        {
          ...product,
          cartQuantity: 1,
          prescriptionStatus: product.requiresPrescription ? 'pending' : 'not_required',
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast({
      title: 'Removed from Cart',
      description: 'Item has been removed from your cart.',
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const updatePrescriptionStatus = (
    productId: string,
    status: CartItem['prescriptionStatus'],
    prescriptionId?: string
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, prescriptionStatus: status, prescriptionId }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.cartQuantity,
      0
    );
  };

  const hasItemsPendingApproval = () => {
    return cartItems.some(
      (item) =>
        item.requiresPrescription && item.prescriptionStatus !== 'approved'
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updatePrescriptionStatus,
        clearCart,
        getTotalItems,
        getTotalPrice,
        hasItemsPendingApproval,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
