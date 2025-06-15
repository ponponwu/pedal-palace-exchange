
-- Add is_blacklisted and phone_verified columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN is_blacklisted BOOLEAN DEFAULT false,
ADD COLUMN phone_verified BOOLEAN DEFAULT false;
