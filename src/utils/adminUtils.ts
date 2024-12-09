import { supabase } from '../lib/supabase';

export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    if (!user) return false;
    
    // Primary check: user metadata
    if (user.user_metadata?.role === 'admin') {
      // Ensure profile exists
      await ensureUserProfile(user.id, 'admin');
      return true;
    }

    // Secondary check: profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) throw profileError;
    
    return profile?.role === 'admin';
  } catch (err) {
    console.error('Error checking admin status:', err);
    return false;
  }
}

async function ensureUserProfile(userId: string, role: string): Promise<void> {
  try {
    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (checkError) throw checkError;

    // If profile doesn't exist, create it
    if (!existingProfile) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            role: role,
          }
        ]);

      if (insertError) throw insertError;
    }
  } catch (err) {
    console.error('Error ensuring user profile:', err);
  }
}