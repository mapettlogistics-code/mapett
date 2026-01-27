import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

type LocalCartItem = {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    category: string;
  };
};

type CartItem = LocalCartItem;

type CartContextType = {
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCartToServer: () => Promise<void>;
  totalItems: number;
  totalAmount: number;
};

const CART_STORAGE_KEY = "mapett_guest_cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to get product details
const fetchProduct = async (productId: string) => {
  const { data } = await supabase
    .from("products")
    .select("id, name, price, image_url, category")
    .eq("id", productId)
    .single();
  return data;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage for guests
  const loadGuestCart = async () => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const guestItems: { product_id: string; quantity: number }[] = JSON.parse(stored);
        const loadedItems: CartItem[] = [];
        
        for (const item of guestItems) {
          const product = await fetchProduct(item.product_id);
          if (product) {
            loadedItems.push({
              id: `guest_${item.product_id}`,
              product_id: item.product_id,
              quantity: item.quantity,
              product,
            });
          }
        }
        setItems(loadedItems);
      } catch (e) {
        console.error("Error loading guest cart:", e);
      }
    }
  };

  // Save guest cart to localStorage
  const saveGuestCart = (cartItems: CartItem[]) => {
    const toStore = cartItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toStore));
  };

  // Fetch cart from server for logged-in users
  const fetchServerCart = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        id,
        product_id,
        quantity,
        product:products (
          id,
          name,
          price,
          image_url,
          category
        )
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error);
    } else {
      const transformedData = (data || []).map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        product: item.product,
      }));
      setItems(transformedData);
      // Clear guest cart after loading server cart
      localStorage.removeItem(CART_STORAGE_KEY);
    }
    setLoading(false);
  };

  // Sync guest cart to server when user logs in
  const syncCartToServer = async () => {
    if (!user) return;

    const guestStored = localStorage.getItem(CART_STORAGE_KEY);
    if (!guestStored) return;

    try {
      const guestItems: { product_id: string; quantity: number }[] = JSON.parse(guestStored);
      
      for (const guestItem of guestItems) {
        // Check if item already exists in server cart
        const { data: existing } = await supabase
          .from("cart_items")
          .select("id, quantity")
          .eq("user_id", user.id)
          .eq("product_id", guestItem.product_id)
          .single();

        if (existing) {
          // Update quantity
          await supabase
            .from("cart_items")
            .update({ quantity: existing.quantity + guestItem.quantity })
            .eq("id", existing.id);
        } else {
          // Insert new item
          await supabase
            .from("cart_items")
            .insert({
              user_id: user.id,
              product_id: guestItem.product_id,
              quantity: guestItem.quantity,
            });
        }
      }

      localStorage.removeItem(CART_STORAGE_KEY);
      await fetchServerCart();
      toast.success("Cart synced to your account!");
    } catch (e) {
      console.error("Error syncing cart:", e);
    }
  };

  useEffect(() => {
    if (user) {
      // Check if there's a guest cart to sync
      const guestStored = localStorage.getItem(CART_STORAGE_KEY);
      if (guestStored) {
        syncCartToServer();
      } else {
        fetchServerCart();
      }
    } else {
      loadGuestCart();
    }
  }, [user]);

  const addToCart = async (productId: string) => {
    const existingItem = items.find((item) => item.product_id === productId);

    if (user) {
      // Logged in - use server
      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        const { error } = await supabase
          .from("cart_items")
          .insert({ user_id: user.id, product_id: productId, quantity: 1 });

        if (error) {
          toast.error("Failed to add to cart");
          console.error(error);
        } else {
          toast.success("Added to cart!");
          await fetchServerCart();
        }
      }
    } else {
      // Guest - use localStorage
      if (existingItem) {
        const updated = items.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setItems(updated);
        saveGuestCart(updated);
        toast.success("Added to cart!");
      } else {
        const product = await fetchProduct(productId);
        if (product) {
          const newItem: CartItem = {
            id: `guest_${productId}`,
            product_id: productId,
            quantity: 1,
            product,
          };
          const updated = [...items, newItem];
          setItems(updated);
          saveGuestCart(updated);
          toast.success("Added to cart!");
        }
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (user && !itemId.startsWith("guest_")) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) {
        toast.error("Failed to remove item");
      } else {
        setItems(items.filter((item) => item.id !== itemId));
        toast.success("Item removed");
      }
    } else {
      // Guest cart
      const updated = items.filter((item) => item.id !== itemId);
      setItems(updated);
      saveGuestCart(updated);
      toast.success("Item removed");
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    if (user && !itemId.startsWith("guest_")) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId);

      if (error) {
        toast.error("Failed to update quantity");
      } else {
        setItems(
          items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
        );
      }
    } else {
      // Guest cart
      const updated = items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setItems(updated);
      saveGuestCart(updated);
    }
  };

  const clearCart = async () => {
    if (user) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (!error) {
        setItems([]);
      }
    } else {
      setItems([]);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        syncCartToServer,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
