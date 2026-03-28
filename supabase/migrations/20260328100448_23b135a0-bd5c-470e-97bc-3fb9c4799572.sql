
-- CMS content table for editable website content
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL, -- 'announcement', 'hero_slide', 'service', 'insurance'
  title text,
  subtitle text,
  description text,
  image_url text,
  link text,
  icon text,
  extra_data jsonb DEFAULT '{}'::jsonb,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read active content
CREATE POLICY "Anyone can view active content" ON public.site_content
  FOR SELECT TO public USING (is_active = true OR is_admin());

-- Only admins can insert
CREATE POLICY "Admins can insert content" ON public.site_content
  FOR INSERT TO authenticated WITH CHECK (is_admin());

-- Only admins can update
CREATE POLICY "Admins can update content" ON public.site_content
  FOR UPDATE TO authenticated USING (is_admin());

-- Only admins can delete
CREATE POLICY "Admins can delete content" ON public.site_content
  FOR DELETE TO authenticated USING (is_admin());

-- Add updated_at trigger
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
