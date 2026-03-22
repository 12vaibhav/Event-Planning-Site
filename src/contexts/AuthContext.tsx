/**
 * Auth Context & Provider
 * 
 * Global authentication state management using React Context.
 * Wraps the entire app to provide user state and auth actions.
 */
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { onAuthStateChange, signIn, signUp, signOut, signInWithGoogle, getCurrentUser } from '../lib/auth';
import type { SignInData, SignUpData } from '../lib/validation';

// ============================================================
// Types
// ============================================================
interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
}

// ============================================================
// Context
// ============================================================
const AuthContext = createContext<AuthContextType | null>(null);

// ============================================================
// Provider
// ============================================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = useCallback(async (data: SignInData) => {
    const result = await signIn(data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return { success: result.success, error: result.error };
  }, []);

  const handleSignUp = useCallback(async (data: SignUpData) => {
    const result = await signUp(data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return { success: result.success, error: result.error };
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    return await signInWithGoogle();
  }, []);

  const handleSignOut = useCallback(async () => {
    const result = await signOut();
    if (result.success) {
      setUser(null);
    }
    return result;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signInWithGoogle: handleGoogleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================
// Hook
// ============================================================
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
