const PaymentIcons = () => {
  return (
    <div className="hidden md:flex items-center gap-3 border-l border-primary-foreground/30 pl-4">
      <span className="text-xs text-primary-foreground/70">We accept:</span>
      {/* M-Pesa */}
      <div className="bg-primary-foreground/20 rounded px-2 py-0.5">
        <span className="text-xs font-bold text-primary-foreground">M-PESA</span>
      </div>
      {/* Visa */}
      <div className="bg-primary-foreground/20 rounded px-2 py-0.5">
        <span className="text-xs font-bold text-primary-foreground">VISA</span>
      </div>
      {/* Mastercard */}
      <div className="bg-primary-foreground/20 rounded px-2 py-0.5">
        <span className="text-xs font-bold text-primary-foreground">MC</span>
      </div>
    </div>
  );
};

export default PaymentIcons;
