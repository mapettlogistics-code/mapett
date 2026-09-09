import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => ShopifyBuyClient;
      UI: {
        onReady: (client: ShopifyBuyClient) => Promise<ShopifyBuyUI>;
      };
    };
  }
}

interface ShopifyBuyClient {
  fetch?: (resource: string, id: string | number) => Promise<unknown>;
}

interface ShopifyBuyUI {
  createComponent: (
    type: "collection" | "product" | "cart" | "toggle",
    config: ShopifyBuyComponentConfig
  ) => Promise<unknown>;
}

interface ShopifyBuyComponentConfig {
  id: string;
  node: HTMLElement;
  moneyFormat?: string;
  options?: Record<string, unknown>;
}

type CategoryProductSliderProps = {
  category: string;
  title: string;
  color: string;
};

const CategoryProductSlider = ({ title, category, color }: CategoryProductSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;

    const scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    const loadShopifyScript = () =>
      new Promise<void>((resolve, reject) => {
        if (window.ShopifyBuy) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.async = true;
        script.src = scriptURL;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Shopify Buy Button SDK"));
        (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script);
      });

    const initShopify = async () => {
      try {
        await loadShopifyScript();

        const client = window.ShopifyBuy!.buildClient({
          domain: "c0pa1u-mg.myshopify.com",
          storefrontAccessToken: "9b89255bd7c4b2cb4fdd5d24de94f81f",
        });

        const ui = await window.ShopifyBuy!.UI.onReady(client);

        await ui.createComponent("collection", {
          id: "344672796829",
          node: containerRef.current,
          moneyFormat: "KSh%7B%7Bamount%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                    "width": "calc(25% - 20px)",
                  },
                  img: {
                    height: "calc(100% - 15px)",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    top: "0",
                  },
                  imgWrapper: {
                    "padding-top": "calc(75% + 15px)",
                    position: "relative",
                    height: "0",
                  },
                },
                button: {
                  ":hover": { "background-color": "#bf0c0c" },
                  "background-color": "#d40d0d",
                  ":focus": { "background-color": "#bf0c0c" },
                },
              },
              buttonDestination: "checkout",
              text: { button: "Buy now" },
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": { "margin-left": "-20px" },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  ":hover": { "background-color": "#bf0c0c" },
                  "background-color": "#d40d0d",
                  ":focus": { "background-color": "#bf0c0c" },
                },
              },
              text: { button: "Add to cart" },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  ":hover": { "background-color": "#bf0c0c" },
                  "background-color": "#d40d0d",
                  ":focus": { "background-color": "#bf0c0c" },
                },
              },
              text: { total: "Subtotal", button: "Checkout" },
            },
            toggle: {
              styles: {
                toggle: {
                  "background-color": "#d40d0d",
                  ":hover": { "background-color": "#bf0c0c" },
                  ":focus": { "background-color": "#bf0c0c" },
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Error initializing Shopify Buy Button:", error);
      }
    };

    initShopify();
  }, []);

  return (
    <div className="py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${color}`} />
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>

      {/* Shopify Buy Button Collection Component */}
      <div
        ref={containerRef}
        id="collection-component-1788960279402"
        className="min-h-[300px]"
      />
    </div>
  );
};

export default CategoryProductSlider;