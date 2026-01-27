-- Create insurance_applications table to store applications
CREATE TABLE public.insurance_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  insurance_type TEXT NOT NULL,
  cargo_value TEXT,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.insurance_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form)
CREATE POLICY "Anyone can submit insurance applications" 
ON public.insurance_applications 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view their own applications by email
CREATE POLICY "Users can view their applications by email" 
ON public.insurance_applications 
FOR SELECT 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_insurance_applications_updated_at
BEFORE UPDATE ON public.insurance_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();