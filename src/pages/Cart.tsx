import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Cart = () => {
  const { items, loading, updateQuantity, removeFromCart, clearCart, totalAmount, syncCartToServer } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout">("cart");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const deliveryFee = totalAmount > 5000 ? 0 : 250;
  const grandTotal = totalAmount + deliveryFee;

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.info("Please login to complete your purchase");
      // Store the intent to checkout after login
      sessionStorage.setItem("checkout_redirect", "true");
      navigate("/login");
      return;
    }
    setCheckoutStep("checkout");
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }

    if (!shippingAddress || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsCheckingOut(true);

    try {
      // Generate tracking number
      const trackingNumber = `MPT${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          tracking_number: trackingNumber,
          total_amount: grandTotal,
          shipping_address: shippingAddress,
          phone,
          notes,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      toast.success(`Order placed! Tracking: ${trackingNumber}`);
      navigate(`/track?tracking=${trackingNumber}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-2xl font-bold mb-8">
          {checkoutStep === "cart" ? "Your Cart" : "Checkout"}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">Add some products to get started</p>
            <Link to="/#marketplace">
              <Button className="hero-gradient text-primary-foreground">Browse Products</Button>
            </Link>
          </div>
        ) : checkoutStep === "cart" ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-card rounded-xl p-4 border border-border flex gap-4"
                >
                  <img
                    src={item.product.image_url || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase">{item.product.category}</p>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-primary font-bold">KES {item.product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-xl p-6 border border-border h-fit">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>KES {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                    {deliveryFee === 0 ? "FREE" : `KES ${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add KES {(5001 - totalAmount).toLocaleString()} more for free delivery
                  </p>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">KES {grandTotal.toLocaleString()}</span>
                </div>
              </div>
              
              {!user && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg flex items-center gap-2 text-sm">
                  <LogIn className="h-4 w-4 text-primary" />
                  <span>Login required at checkout</span>
                </div>
              )}
              
              <Button
                className="w-full mt-6 hero-gradient text-primary-foreground"
                onClick={handleProceedToCheckout}
              >
                {user ? "Proceed to Checkout" : "Login & Checkout"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border">
              <h3 className="font-bold text-lg mb-4">Shipping Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+254 700 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full delivery address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setCheckoutStep("cart")}>
                  Back to Cart
                </Button>
                <Button
                  className="flex-1 hero-gradient text-primary-foreground"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    `Pay KES ${grandTotal.toLocaleString()}`
                  )}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-xl p-6 border border-border h-fit">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>KES {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KES {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? "FREE" : `KES ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">KES {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
