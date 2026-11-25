import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleAuthProvider,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';

export type ChefRole = 'baker' | 'pastry_chef' | 'instructor';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  kitchenName: string;
  role: ChefRole;
  targetFoodCostPct: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfileSettings: (updates: {
    displayName: string;
    kitchenName: string;
    role: ChefRole;
    targetFoodCostPct: number;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthError(null);

      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const userPath = `users/${firebaseUser.uid}`;
      const userRef = doc(db, 'users', firebaseUser.uid);

      try {
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        } else {
          const initialData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || 'chef@kitchen.local',
            displayName: (firebaseUser.displayName || 'Head Baker').slice(0, 100),
            kitchenName: 'Main Artisan Bakery',
            role: 'pastry_chef' as ChefRole,
            targetFoodCostPct: 30,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          await setDoc(userRef, initialData);
          const createdSnap = await getDoc(userRef);
          if (createdSnap.exists()) {
            setProfile(createdSnap.data() as UserProfile);
          }
        }
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.GET, userPath);
        } catch (wrapped) {
          setAuthError(wrapped instanceof Error ? wrapped.message : 'Unable to load kitchen profile.');
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Google Sign-In failed.';
      setAuthError(msg);
    }
  };

  const signOut = async () => {
    setAuthError(null);
    await firebaseSignOut(auth);
  };

  const updateProfileSettings = async (updates: {
    displayName: string;
    kitchenName: string;
    role: ChefRole;
    targetFoodCostPct: number;
  }) => {
    if (!user || !profile) return;
    const userPath = `users/${user.uid}`;
    const userRef = doc(db, 'users', user.uid);
    const sanitizedDisplay = updates.displayName.trim().slice(0, 100) || profile.displayName;
    const sanitizedKitchen = updates.kitchenName.trim().slice(0, 120) || profile.kitchenName;
    const clampedPct = Math.min(60, Math.max(10, Number(updates.targetFoodCostPct) || 30));

    try {
      await updateDoc(userRef, {
        displayName: sanitizedDisplay,
        kitchenName: sanitizedKitchen,
        role: updates.role,
        targetFoodCostPct: clampedPct,
        updatedAt: serverTimestamp(),
      });
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setProfile(updatedSnap.data() as UserProfile);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, userPath);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        authError,
        signInWithGoogle,
        signOut,
        updateProfileSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
