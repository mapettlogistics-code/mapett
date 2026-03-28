import { createContext, useContext, useState, ReactNode } from "react";

type Currency = "KES" | "USD";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  convert: (amountKES: number) => number;
  format: (amountKES: number) => string;
  symbol: string;
}

const EXCHANGE_RATE_USD = 0.0077; // 1 KES ≈ 0.0077 USD (approx 130 KES per USD)

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("KES");

  const toggleCurrency = () => {
    setCurrency(prev => (prev === "KES" ? "USD" : "KES"));
  };

  const convert = (amountKES: number) => {
    if (currency === "USD") return Math.round(amountKES * EXCHANGE_RATE_USD * 100) / 100;
    return amountKES;
  };

  const format = (amountKES: number) => {
    const amount = convert(amountKES);
    if (currency === "USD") {
      return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `KES ${amount.toLocaleString("en-KE")}`;
  };

  const symbol = currency === "USD" ? "$" : "KES";

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, convert, format, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};
