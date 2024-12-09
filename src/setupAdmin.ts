import { supabase } from './lib/supabase';

async function setupAdmin() {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
  }

  try {
    // Sign up admin user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin@selargroup.com',
      password: 'admin123',
      options: {
        data: {
          role: 'admin'
        }
      }
    });

    if (signUpError) throw signUpError;

    if (authData.user) {
      console.log('Admin user created successfully');
      console.log('Email:', 'admin@selargroup.com');
      console.log('Password:', 'admin123');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

setupAdmin();