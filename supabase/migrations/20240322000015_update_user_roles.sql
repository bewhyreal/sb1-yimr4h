-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow admin to manage roles" ON public.user_roles;

-- Create new policies with simplified access control
CREATE POLICY "Allow authenticated users to read roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert their own role"
    ON public.user_roles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow admin to manage all roles"
    ON public.user_roles FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Update RLS
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;