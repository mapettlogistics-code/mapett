
-- Create vendors table
CREATE TABLE public.vendors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  shop_location TEXT,
  phone TEXT,
  email TEXT,
  logo_url TEXT,
  banner_url TEXT,
  categories TEXT[] DEFAULT '{}',
  facebook_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  return_policy TEXT,
  delivery_period TEXT,
  mpesa_phone TEXT,
  mpesa_till TEXT,
  mpesa_paybill TEXT,
  bank_name TEXT,
  bank_account_number TEXT,
  bank_branch TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- RLS policies for vendors
CREATE POLICY "Anyone can view active vendors"
ON public.vendors FOR SELECT
USING (status = 'active' OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create own vendor profile"
ON public.vendors FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Vendors can update own profile"
ON public.vendors FOR UPDATE
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admins can delete vendors"
ON public.vendors FOR DELETE
USING (public.is_admin());

-- Add vendor_id to products table
ALTER TABLE public.products ADD COLUMN vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL;

-- Add vendor role to app_role enum if not exists (it already has admin, moderator, user)
-- We'll use user_roles with 'vendor' but the enum doesn't have it, so let's add it
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'vendor';

-- Update products RLS: vendors can manage their own products
CREATE POLICY "Vendors can insert own products"
ON public.products FOR INSERT
WITH CHECK (
  public.is_admin() OR 
  (vendor_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.vendors WHERE id = vendor_id AND user_id = auth.uid()
  ))
);

CREATE POLICY "Vendors can update own products"
ON public.products FOR UPDATE
USING (
  public.is_admin() OR 
  (vendor_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.vendors WHERE id = vendor_id AND user_id = auth.uid()
  ))
);

CREATE POLICY "Vendors can delete own products"
ON public.products FOR DELETE
USING (
  public.is_admin() OR 
  (vendor_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.vendors WHERE id = vendor_id AND user_id = auth.uid()
  ))
);

-- Trigger for updated_at
CREATE TRIGGER update_vendors_updated_at
BEFORE UPDATE ON public.vendors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for vendor assets
INSERT INTO storage.buckets (id, name, public) VALUES ('vendor-assets', 'vendor-assets', true);

-- Storage policies for vendor assets
CREATE POLICY "Anyone can view vendor assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'vendor-assets');

CREATE POLICY "Authenticated users can upload vendor assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vendor-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own vendor assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'vendor-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own vendor assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'vendor-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow vendors to view order_items for their products
CREATE POLICY "Vendors can view own product order items"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.vendors v ON p.vendor_id = v.id
    WHERE p.id = order_items.product_id AND v.user_id = auth.uid()
  )
);
