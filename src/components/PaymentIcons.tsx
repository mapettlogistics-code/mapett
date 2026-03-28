const PaymentIcons = () => {
  return (
    <div className="flex items-center gap-2">
      {/* M-Pesa */}
      <svg viewBox="0 0 80 30" className="h-7 w-auto" aria-label="M-Pesa">
        <rect width="80" height="30" rx="4" fill="#4CAF50" />
        <text x="40" y="19" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">M-PESA</text>
      </svg>
      {/* Visa */}
      <svg viewBox="0 0 60 30" className="h-7 w-auto" aria-label="Visa">
        <rect width="60" height="30" rx="4" fill="#1A1F71" />
        <text x="30" y="20" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif" fontStyle="italic">VISA</text>
      </svg>
      {/* Mastercard */}
      <svg viewBox="0 0 60 30" className="h-7 w-auto" aria-label="Mastercard">
        <rect width="60" height="30" rx="4" fill="#2D2D2D" />
        <circle cx="24" cy="15" r="9" fill="#EB001B" />
        <circle cx="36" cy="15" r="9" fill="#F79E1B" />
        <path d="M30 8.2a9 9 0 0 1 0 13.6 9 9 0 0 1 0-13.6z" fill="#FF5F00" />
      </svg>
    </div>
  );
};

export default PaymentIcons;
