const PaymentIcons = () => {
  return (
    <div className="flex items-center gap-2">
      {/* M-Pesa - Official green branding */}
      <div className="bg-white rounded px-1.5 py-0.5 flex items-center">
        <svg viewBox="0 0 60 24" className="h-5 w-auto" aria-label="M-Pesa">
          <text x="0" y="17" fill="#4CAF50" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">M-</text>
          <text x="20" y="17" fill="#E21B1B" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">PESA</text>
        </svg>
      </div>
      {/* Visa - Official blue/gold */}
      <div className="bg-white rounded px-2 py-0.5 flex items-center">
        <svg viewBox="0 0 60 24" className="h-5 w-auto" aria-label="Visa">
          <text x="30" y="18" textAnchor="middle" fill="#1A1F71" fontSize="15" fontWeight="bold" fontFamily="Arial, sans-serif" fontStyle="italic">VISA</text>
        </svg>
      </div>
      {/* Mastercard - Official red/orange/yellow */}
      <div className="bg-white rounded px-1.5 py-0.5 flex items-center">
        <svg viewBox="0 0 50 24" className="h-5 w-auto" aria-label="Mastercard">
          <circle cx="18" cy="12" r="8" fill="#EB001B" />
          <circle cx="32" cy="12" r="8" fill="#F79E1B" />
          <path d="M25 5.5a8 8 0 0 1 0 13 8 8 0 0 1 0-13z" fill="#FF5F00" />
        </svg>
      </div>
    </div>
  );
};

export default PaymentIcons;
