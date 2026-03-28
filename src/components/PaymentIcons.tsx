const PaymentIcons = () => {
  return (
    <div className="flex items-center gap-2">
      {/* M-Pesa */}
      <div className="bg-white/20 rounded px-2 py-0.5 flex items-center">
        <svg viewBox="0 0 80 24" className="h-5 w-auto" aria-label="M-Pesa">
          <text x="40" y="17" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">M-PESA</text>
        </svg>
      </div>
      {/* Visa */}
      <div className="bg-white/20 rounded px-2 py-0.5 flex items-center">
        <svg viewBox="0 0 60 24" className="h-5 w-auto" aria-label="Visa">
          <text x="30" y="18" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold" fontFamily="Arial, sans-serif" fontStyle="italic">VISA</text>
        </svg>
      </div>
      {/* Mastercard */}
      <div className="bg-white/20 rounded px-1.5 py-0.5 flex items-center">
        <svg viewBox="0 0 50 24" className="h-5 w-auto" aria-label="Mastercard">
          <circle cx="18" cy="12" r="8" fill="#EB001B" opacity="0.9" />
          <circle cx="32" cy="12" r="8" fill="#F79E1B" opacity="0.9" />
          <path d="M25 5.5a8 8 0 0 1 0 13 8 8 0 0 1 0-13z" fill="#FF5F00" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
};

export default PaymentIcons;
