import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  tier?: string;
  points?: number;
  createdAt?: any;
}

export interface UserOrder {
  id?: string;
  userId: string;
  userEmail: string;
  customerName: string;
  shippingAddress: string;
  phone?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image?: string;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'confirmed' | 'processing' | 'in_transit' | 'delivered';
  createdAt?: any;
  trackingNumber?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  orders: UserOrder[];
  ordersLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string, phone?: string, address?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  sendResetPassword: (email: string) => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  refreshOrders: () => Promise<void>;
  createOrderRecord: (orderData: Omit<UserOrder, 'userId' | 'userEmail' | 'createdAt'>) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);

  // Fetch or sync user profile from Firestore
  const fetchUserProfile = async (firebaseUser: User) => {
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        setUserProfile(data);
      } else {
        // Create initial profile in Firestore
        const initialProfile: UserProfile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Banzook Member',
          email: firebaseUser.email || '',
          phone: '',
          address: '',
          tier: 'Founder Tier 01',
          points: 150,
          createdAt: serverTimestamp()
        };
        await setDoc(userDocRef, initialProfile, { merge: true });
        setUserProfile(initialProfile);
      }
    } catch (err) {
      console.warn('Could not fetch Firestore profile:', err);
      // Fallback local profile
      setUserProfile({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'Banzook Member',
        email: firebaseUser.email || '',
        tier: 'Founder Tier 01',
        points: 150
      });
    }
  };

  // Fetch orders for current user
  const fetchUserOrders = async (userId: string, userEmail: string) => {
    setOrdersLoading(true);
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('userId', '==', userId)
      );
      const querySnap = await getDocs(q);

      const userOrders: UserOrder[] = [];
      querySnap.forEach((doc) => {
        userOrders.push({
          id: doc.id,
          ...doc.data()
        } as UserOrder);
      });

      // Sort client-side by timestamp if exists
      userOrders.sort((a, b) => {
        const timeA = a.createdAt?.seconds || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const timeB = b.createdAt?.seconds || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return timeB - timeA;
      });

      setOrders(userOrders);
    } catch (err) {
      console.warn('Error fetching orders from Firestore:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser);
        await fetchUserOrders(currentUser.uid, currentUser.email || '');
      } else {
        setUserProfile(null);
        setOrders([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserProfile(res.user);
    await fetchUserOrders(res.user.uid, res.user.email || '');
  };

  const signUpWithEmail = async (
    email: string, 
    password: string, 
    name: string, 
    phone?: string, 
    address?: string
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name });

    const newProfile: UserProfile = {
      uid: res.user.uid,
      name,
      email,
      phone: phone || '',
      address: address || '',
      tier: 'Founder Tier 01',
      points: 200,
      createdAt: serverTimestamp()
    };

    try {
      await setDoc(doc(db, 'users', res.user.uid), newProfile);
    } catch (e) {
      console.warn('Error saving user doc:', e);
    }

    setUserProfile(newProfile);
    await fetchUserOrders(res.user.uid, email);
  };

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await fetchUserProfile(res.user);
    await fetchUserOrders(res.user.uid, res.user.email || '');
  };

  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
    setOrders([]);
  };

  const sendResetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, data);
      setUserProfile((prev) => prev ? { ...prev, ...data } : null);
    } catch (err) {
      console.warn('Error updating profile:', err);
      setUserProfile((prev) => prev ? { ...prev, ...data } : null);
    }
  };

  const refreshOrders = async () => {
    if (user) {
      await fetchUserOrders(user.uid, user.email || '');
    }
  };

  const createOrderRecord = async (orderData: Omit<UserOrder, 'userId' | 'userEmail' | 'createdAt'>): Promise<string> => {
    const fullOrder: Record<string, any> = {
      ...orderData,
      userId: user?.uid || 'guest',
      userEmail: user?.email || orderData.customerName || 'guest@banzook.store',
      status: 'confirmed',
      createdAt: serverTimestamp(),
      trackingNumber: 'BZK-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), fullOrder);
      if (user) {
        await fetchUserOrders(user.uid, user.email || '');
      }
      return docRef.id;
    } catch (err) {
      console.warn('Could not save to Firestore orders:', err);
      return 'LOC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        orders,
        ordersLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOutUser,
        sendResetPassword,
        updateProfileData,
        refreshOrders,
        createOrderRecord
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
