/**
 * Authentication Service
 * 
 * Handles all Supabase Auth operations: sign up, sign in, sign out, session management.
 */
import { supabase } from './supabase';
import type { SignUpData, SignInData } from './validation';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    fullName?: string;
  };
}

/**
 * Sign up a new user with email and password.
 */
export async function signUp(data: SignUpData): Promise<AuthResult> {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user account' };
    }

    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        fullName: data.fullName,
      },
    };
  } catch (err) {
    console.error('Sign up error:', err);
    return { success: false, error: 'An unexpected error occurred during sign up' };
  }
}

/**
 * Sign in an existing user with email and password.
 */
export async function signIn(data: SignInData): Promise<AuthResult> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to sign in' };
    }

    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        fullName: authData.user.user_metadata?.full_name,
      },
    };
  } catch (err) {
    console.error('Sign in error:', err);
    return { success: false, error: 'An unexpected error occurred during sign in' };
  }
}

/**
 * Sign in with Google OAuth.
 */
export async function signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Google sign in error:', err);
    return { success: false, error: 'Failed to initiate Google sign in' };
  }
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error('Sign out error:', err);
    return { success: false, error: 'Failed to sign out' };
  }
}

/**
 * Get the current authenticated user.
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return {
      id: user.id,
      email: user.email!,
      fullName: user.user_metadata?.full_name as string | undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Get the current session (includes JWT token for edge function calls).
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return null;
  return session;
}

/**
 * Subscribe to auth state changes.
 */
export function onAuthStateChange(callback: (user: { id: string; email: string; fullName?: string } | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email!,
        fullName: session.user.user_metadata?.full_name,
      });
    } else {
      callback(null);
    }
  });
}
