import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Loader2, LogIn, Phone, CheckCircle, XCircle, QrCode } from "lucide-react";
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
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "payment" | "success">("cart");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentPhone, setPaymentPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "sending" | "waiting" | "success" | "failed">("idle");
  const [transactionId, setTransactionId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [showQr, setShowQr] = useState(false);

  const deliveryFee = totalAmount > 5000 ? 0 : 250;
  const grandTotal = totalAmount + deliveryFee;

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.info("Please login to complete your purchase");
      sessionStorage.setItem("checkout_redirect", "true");
      navigate("/login");
      return;
    }
    setCheckoutStep("checkout");
  };

  const handleProceedToPayment = async () => {
    if (!shippingAddress || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsCheckingOut(true);
    try {
      const trkNum = `MPT${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user!.id,
          tracking_number: trkNum,
          total_amount: grandTotal,
          shipping_address: shippingAddress,
          phone,
          notes,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      setOrderId(order.id);
      setTrackingNumber(trkNum);
      setPaymentPhone(phone);
      setCheckoutStep("payment");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleStkPush = async () => {
    if (!paymentPhone) {
      toast.error("Please enter your M-Pesa phone number");
      return;
    }

    setPaymentStatus("sending");
    try {
      const { data, error } = await supabase.functions.invoke("ncba-payment", {
        body: {
          action: "stk-push",
          phone: paymentPhone,
          amount: grandTotal,
          orderId,
          accountNo: trackingNumber,
        },
      });

      if (error) throw error;

      if (data.success) {
        setTransactionId(data.transactionId);
        setPaymentId(data.paymentId);
        setPaymentStatus("waiting");
        toast.success("STK push sent! Check your phone and enter your M-Pesa PIN.");
      } else {
        setPaymentStatus("failed");
        toast.error(data.statusDescription || "Failed to initiate payment");
      }
    } catch (error) {
      console.error("STK push error:", error);
      setPaymentStatus("failed");
      toast.error("Failed to send payment request. Please try again.");
    }
  };

  const checkPaymentStatus = useCallback(async () => {
    if (!transactionId || !paymentId) return;

    try {
      const { data, error } = await supabase.functions.invoke("ncba-payment", {
        body: { action: "query", transactionId, paymentId },
      });

      if (error) throw error;

      if (data.status === "SUCCESS") {
        setPaymentStatus("success");
        await clearCart();
        setCheckoutStep("success");
        toast.success("Payment successful!");
      } else if (data.status === "FAILED") {
        setPaymentStatus("failed");
        toast.error(data.description || "Payment failed");
      }
    } catch (error) {
      console.error("Query error:", error);
    }
  }, [transactionId, paymentId, clearCart]);

  // Poll payment status
  useEffect(() => {
    if (paymentStatus !== "waiting") return;
    const interval = setInterval(checkPaymentStatus, 5000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (paymentStatus === "waiting") {
        setPaymentStatus("failed");
        toast.error("Payment timed out. Please try again or check your M-Pesa.");
      }
    }, 120000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [paymentStatus, checkPaymentStatus]);

  const handleGenerateQr = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("ncba-payment", {
        body: { action: "qr-code", amount: grandTotal },
      });

      if (error) throw error;

      if (data.success && data.qrCode) {
        setQrCode(data.qrCode);
        setShowQr(true);
      } else {
        toast.error("Failed to generate QR code");
      }
    } catch (error) {
      console.error("QR error:", error);
      toast.error("Failed to generate QR code");
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
          {checkoutStep === "cart" ? "Your Cart" : 
           checkoutStep === "checkout" ? "Checkout" :
           checkoutStep === "payment" ? "Payment" : "Order Confirmed"}
        </h1>

        {items.length === 0 && checkoutStep !== "success" ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">Add some products to get started</p>
            <a href="https://multistore.simiyu.app" target="_blank" rel="noopener noreferrer">
              <Button className="hero-gradient text-primary-foreground">Browse Products</Button>
            </a>
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
        ) : checkoutStep === "checkout" ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border">
              <h3 className="font-bold text-lg mb-4">Shipping Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="0700 000 000"
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
                  onClick={handleProceedToPayment}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Continue to Payment"
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
        ) : checkoutStep === "payment" ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* M-Pesa STK Push */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Pay with M-Pesa</h3>
                    <p className="text-sm text-muted-foreground">via NCBA Paybill</p>
                  </div>
                </div>

                {paymentStatus === "idle" || paymentStatus === "failed" ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="paymentPhone">M-Pesa Phone Number</Label>
                      <Input
                        id="paymentPhone"
                        placeholder="0700 000 000"
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Safaricom number to receive the STK push prompt
                      </p>
                    </div>
                    {paymentStatus === "failed" && (
                      <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">Payment failed. Please try again.</span>
                      </div>
                    )}
                    <Button
                      className="w-full hero-gradient text-primary-foreground"
                      onClick={handleStkPush}
                    >
                      Send M-Pesa Prompt — KES {grandTotal.toLocaleString()}
                    </Button>
                  </div>
                ) : paymentStatus === "sending" ? (
                  <div className="text-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
                    <p className="font-medium">Sending payment request...</p>
                  </div>
                ) : paymentStatus === "waiting" ? (
                  <div className="text-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-3" />
                    <p className="font-medium">Waiting for M-Pesa confirmation...</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter your M-Pesa PIN on your phone to complete payment
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={checkPaymentStatus}
                    >
                      Check Status
                    </Button>
                  </div>
                ) : null}
              </div>

              {/* QR Code Option */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Pay with QR Code</h3>
                    <p className="text-sm text-muted-foreground">Scan to pay via M-Pesa</p>
                  </div>
                </div>

                {showQr && qrCode ? (
                  <div className="text-center">
                    <img src={qrCode} alt="Payment QR Code" className="mx-auto max-w-[250px]" />
                    <p className="text-sm text-muted-foreground mt-2">Scan this QR code with your M-Pesa app</p>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full" onClick={handleGenerateQr}>
                    Generate QR Code
                  </Button>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-card rounded-xl p-6 border border-border h-fit">
              <h3 className="font-bold text-lg mb-4">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order</span>
                  <span className="font-mono text-xs">{trackingNumber}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Amount Due</span>
                  <span className="text-primary">KES {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success */
          <div className="text-center py-16">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-2">Your order has been confirmed.</p>
            <p className="text-sm font-mono bg-muted inline-block px-4 py-2 rounded-lg mb-6">
              Tracking: {trackingNumber}
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate(`/track?tracking=${trackingNumber}`)}>
                Track Order
              </Button>
              <Link to="/">
                <Button className="hero-gradient text-primary-foreground">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
