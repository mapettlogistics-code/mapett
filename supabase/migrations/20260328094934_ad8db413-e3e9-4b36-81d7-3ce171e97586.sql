ALTER TABLE public.insurance_applications 
ADD COLUMN IF NOT EXISTS salutation text,
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS middle_name text,
ADD COLUMN IF NOT EXISTS surname text,
ADD COLUMN IF NOT EXISTS physical_address text,
ADD COLUMN IF NOT EXISTS id_passport_dl text,
ADD COLUMN IF NOT EXISTS profession text,
ADD COLUMN IF NOT EXISTS nature_of_business text,
ADD COLUMN IF NOT EXISTS pin_reg_cert text;