import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    hasItemsPendingApproval 
  } = useCart();

  const hasPendingItems = hasItemsPendingApproval();
  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice > 500 ? 0 : 49;
  const finalTotal = totalPrice + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any medicines to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="hero" size="lg">
                <ShoppingBag className="h-5 w-5" />
                Browse Medicines
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">{cartItems.length} items in your cart</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Pending Approval Warning */}
            {hasPendingItems && (
              <div className="bg-warning-light border border-warning/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-semibold text-warning-foreground">Prescription Pending Approval</p>
                    <p className="text-sm text-warning-foreground/80 mt-1">
                      Some items in your cart require prescription approval before checkout. 
                      Please upload your prescription for the marked items.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.manufacturer}</p>
                        <p className="text-xs text-muted-foreground">{item.quantity}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Prescription Status */}
                    {item.requiresPrescription && (
                      <div className="mt-2">
                        {item.prescriptionStatus === 'approved' ? (
                          <Badge variant="success" className="gap-1">
                            <FileText className="h-3 w-3" />
                            Prescription Approved
                          </Badge>
                        ) : item.prescriptionStatus === 'pending' ? (
                          <Link to={`/prescription-upload?product=${item.id}`}>
                            <Badge variant="warning" className="gap-1 cursor-pointer hover:opacity-80">
                              <FileText className="h-3 w-3" />
                              Upload Prescription
                            </Badge>
                          </Link>
                        ) : (
                          <Badge variant="destructive" className="gap-1">
                            <FileText className="h-3 w-3" />
                            Prescription Rejected
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.cartQuantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-lg font-bold text-foreground">
                        ₹{item.price * item.cartQuantity}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free delivery on orders above ₹500
                  </p>
                )}
                <div className="border-t border-border pt-4 flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {hasPendingItems ? (
                <Button variant="outline-muted" className="w-full" disabled>
                  <AlertTriangle className="h-4 w-4" />
                  Prescription Approval Required
                </Button>
              ) : (
                <Link to="/checkout" className="block">
                  <Button variant="hero" className="w-full gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing an order, you agree to our Terms of Service and Privacy Policy
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
