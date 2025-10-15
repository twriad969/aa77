-- Create customers table to store purchase information
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  amount TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  invoice_id TEXT,
  transaction_id TEXT,
  payment_method TEXT,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(email)
);

-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Public can insert (for checkout)
CREATE POLICY "Anyone can insert customer data" 
ON public.customers 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can read (for course access verification)
CREATE POLICY "Authenticated users can read customer data" 
ON public.customers 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create course modules table
CREATE TABLE public.course_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;

-- Anyone can view modules
CREATE POLICY "Anyone can view modules" 
ON public.course_modules 
FOR SELECT 
USING (true);

-- Only authenticated users can manage modules (admin will verify separately)
CREATE POLICY "Authenticated users can manage modules" 
ON public.course_modules 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create course lessons table
CREATE TABLE public.course_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES public.course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;

-- Anyone can view lessons
CREATE POLICY "Anyone can view lessons" 
ON public.course_lessons 
FOR SELECT 
USING (true);

-- Only authenticated users can manage lessons
CREATE POLICY "Authenticated users can manage lessons" 
ON public.course_lessons 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Anyone can view active notifications
CREATE POLICY "Anyone can view active notifications" 
ON public.notifications 
FOR SELECT 
USING (is_active = true);

-- Only authenticated users can manage notifications
CREATE POLICY "Authenticated users can manage notifications" 
ON public.notifications 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_course_modules_updated_at
BEFORE UPDATE ON public.course_modules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_lessons_updated_at
BEFORE UPDATE ON public.course_lessons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON public.notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();