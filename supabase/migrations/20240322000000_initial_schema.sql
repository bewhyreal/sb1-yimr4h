-- Drop existing tables if they exist
DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS is_admin CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    mileage INTEGER,
    image_url TEXT,
    description TEXT,
    features TEXT[] DEFAULT '{}',
    available BOOLEAN DEFAULT true,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    role TEXT NOT NULL DEFAULT 'customer',
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policies
CREATE POLICY "Allow public read access to cars"
    ON cars FOR SELECT
    USING (true);

CREATE POLICY "Allow admin insert to cars"
    ON cars FOR INSERT
    WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Allow admin update to cars"
    ON cars FOR UPDATE
    USING (is_admin(auth.uid()));

CREATE POLICY "Allow admin delete from cars"
    ON cars FOR DELETE
    USING (is_admin(auth.uid()));

-- Profiles policies
CREATE POLICY "Allow users to read own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Allow users to insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow users to update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cars_updated_at
    BEFORE UPDATE ON cars
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample cars
INSERT INTO cars (brand, model, year, price, image_url, description, features)
VALUES
    ('BMW', '3 Series', 2023, 1200, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2070&q=80', 'Luxury Sedan', ARRAY['Automatic', 'Leather Seats', 'GPS Navigation', 'Bluetooth']),
    ('Mercedes', 'C-Class', 2023, 1300, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2070&q=80', 'Executive Sedan', ARRAY['Automatic', 'Leather Seats', 'GPS Navigation', 'Bluetooth']),
    ('Audi', 'A4', 2023, 1100, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2070&q=80', 'Premium Sedan', ARRAY['Automatic', 'Leather Seats', 'GPS Navigation', 'Bluetooth']);