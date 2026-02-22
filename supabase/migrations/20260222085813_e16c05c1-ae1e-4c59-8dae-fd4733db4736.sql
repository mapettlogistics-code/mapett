
-- Discount vouchers created by vendors
CREATE TABLE public.discount_vouchers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC NOT NULL,
  min_order_amount NUMERIC NOT NULL DEFAULT 0,
  max_claims INTEGER NOT NULL DEFAULT 100,
  total_claimed INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(vendor_id, code)
);

-- Track which users claimed which vouchers
CREATE TABLE public.voucher_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voucher_id UUID NOT NULL REFERENCES public.discount_vouchers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  order_id UUID REFERENCES public.orders(id),
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(voucher_id, user_id)
);

-- Enable RLS
ALTER TABLE public.discount_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voucher_claims ENABLE ROW LEVEL SECURITY;

-- Voucher policies
CREATE POLICY "Anyone can view active vouchers"
  ON public.discount_vouchers FOR SELECT
  USING (is_active = true OR EXISTS (
    SELECT 1 FROM vendors WHERE vendors.id = discount_vouchers.vendor_id AND vendors.user_id = auth.uid()
  ) OR is_admin());

CREATE POLICY "Vendors can create own vouchers"
  ON public.discount_vouchers FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM vendors WHERE vendors.id = discount_vouchers.vendor_id AND vendors.user_id = auth.uid()
  ) OR is_admin());

CREATE POLICY "Vendors can update own vouchers"
  ON public.discount_vouchers FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM vendors WHERE vendors.id = discount_vouchers.vendor_id AND vendors.user_id = auth.uid()
  ) OR is_admin());

CREATE POLICY "Vendors can delete own vouchers"
  ON public.discount_vouchers FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM vendors WHERE vendors.id = discount_vouchers.vendor_id AND vendors.user_id = auth.uid()
  ) OR is_admin());

-- Voucher claims policies
CREATE POLICY "Users can view own claims"
  ON public.voucher_claims FOR SELECT
  USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can claim vouchers"
  ON public.voucher_claims FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update claims"
  ON public.voucher_claims FOR UPDATE
  USING (auth.uid() = user_id OR is_admin());

-- Trigger for updated_at on vouchers
CREATE TRIGGER update_discount_vouchers_updated_at
  BEFORE UPDATE ON public.discount_vouchers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
