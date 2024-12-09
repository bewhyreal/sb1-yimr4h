-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to cars" ON cars;
DROP POLICY IF EXISTS "Allow admin insert to cars" ON cars;
DROP POLICY IF EXISTS "Allow admin update to cars" ON cars;
DROP POLICY IF EXISTS "Allow admin delete from cars" ON cars;

-- Create new policies with proper admin checks
CREATE POLICY "Allow public read access to cars"
    ON cars FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to cars"
    ON cars FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Ensure RLS is enabled
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to authenticated users
GRANT ALL ON cars TO authenticated;
GRANT USAGE ON SEQUENCE cars_id_seq TO authenticated;