
-- Create payment_transactions table to track NCBA STK push payments
CREATE TABLE public.payment_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  user_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  phone_number TEXT NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'mpesa_stk',
  ncba_transaction_id TEXT,
  ncba_reference_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  status_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own payment transactions
CREATE POLICY "Users can view own payments"
ON public.payment_transactions
FOR SELECT
USING (auth.uid() = user_id OR is_admin());

-- Users can insert their own payment transactions
CREATE POLICY "Users can create own payments"
ON public.payment_transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- System/admin can update payment status
CREATE POLICY "Admin can update payments"
ON public.payment_transactions
FOR UPDATE
USING (is_admin());

-- Allow the edge function (service role) to update via RLS bypass
-- The edge function uses service role key which bypasses RLS

-- Trigger for updated_at
CREATE TRIGGER update_payment_transactions_updated_at
BEFORE UPDATE ON public.payment_transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
