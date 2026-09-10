import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Package, 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  LogOut, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  ShieldCheck, 
  Copy, 
  AlertCircle, 
  ShoppingBag,
  Zap,
  Key,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToShop?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ 
  isOpen, 
  onClose,
  onNavigateToShop 
}) => {
  const { 
    user, 
    userProfile, 
    orders, 
    ordersLoading,
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle, 
    signOutUser, 
    sendResetPassword,
    updateProfileData
  } = useAuth();

  // Auth states
  const [authMode, setAuthMode] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // UI states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'perks'>('profile');
  
  // Edit dossier states
  const [isEditingDossier, setIsEditingDossier] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      await signInWithEmail(email, password);
      setSuccessMsg('Successfully signed in.');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setErrorMsg('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMsg('No account found with this email. Please register below.');
      } else {
        setErrorMsg(err.message || 'Failed to sign in.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signUpWithEmail(email, password, name || 'Banzook Member', phone, address);
      setSuccessMsg('Account created successfully! Welcome to Banzook.');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('This email is already registered. Please sign in instead.');
      } else {
        setErrorMsg(err.message || 'Registration failed.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
      setSuccessMsg('Signed in with Google.');
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Sign-in popup was closed before completing. Please try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setErrorMsg('Domain not authorized in Firebase: Add banzook.store & localhost to Firebase Console -> Authentication -> Settings -> Authorized Domains.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMsg('Google Sign-In provider is disabled in Firebase Console. Please enable Google provider in Authentication -> Sign-in method.');
      } else if (err.code === 'auth/popup-blocked') {
        setErrorMsg('Popup was blocked by your browser. Please allow popups or use email sign-in.');
      } else {
        setErrorMsg(err.message || 'Google sign-in could not be completed.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      await sendResetPassword(email);
      setSuccessMsg('Password reset link sent to your email.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send reset email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditDossier = () => {
    setEditName(userProfile?.name || user?.displayName || '');
    setEditPhone(userProfile?.phone || '');
    setEditAddress(userProfile?.address || '');
    setIsEditingDossier(true);
  };

  const saveDossier = async () => {
    setIsSubmitting(true);
    try {
      await updateProfileData({
        name: editName,
        phone: editPhone,
        address: editAddress
      });
      setIsEditingDossier(false);
      setSuccessMsg('Profile information updated.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg('Failed to update information.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyPromo = () => {
    navigator.clipboard.writeText('BANZOOK15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* TOP BAR */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-semibold text-base text-neutral-900">
              {user ? 'Member Portal' : authMode === 'register' ? 'Create Account' : authMode === 'forgot' ? 'Reset Password' : 'Sign In'}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {user ? user.email : 'Banzook Minimalist Apparel'}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FEEDBACK BANNERS */}
        {errorMsg && (
          <div className="bg-rose-50 border-b border-rose-100 px-6 py-3 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="flex-1">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-rose-700 font-bold">×</button>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-3 text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="flex-1">{successMsg}</span>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-500 hover:text-emerald-800 font-bold">×</button>
          </div>
        )}

        {/* BODY */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          
          {/* ══════════════════════════════════════════════════════════════
              UNAUTHENTICATED (LOGIN / REGISTER / FORGOT)
          ══════════════════════════════════════════════════════════════ */}
          {!user ? (
            <div className="space-y-5">
              
              {/* SEGMENTED TAB SWITCHER */}
              <div className="grid grid-cols-2 p-1 bg-neutral-100 rounded-xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setErrorMsg(null); }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    authMode === 'signin'
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMsg(null); }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* GOOGLE SIGN IN */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-xl transition-all flex items-center justify-center gap-3 text-xs font-medium text-neutral-800 cursor-pointer shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                <div className="h-px bg-neutral-200 flex-1" />
                <span>or email</span>
                <div className="h-px bg-neutral-200 flex-1" />
              </div>

              {/* ── SIGN IN FORM ────────────────────────────────────────── */}
              {authMode === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-700 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-neutral-700 block">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => { setAuthMode('forgot'); setErrorMsg(null); }}
                        className="text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              )}

              {/* ── REGISTER FORM ────────────────────────────────────────── */}
              {authMode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-neutral-700 block">
                        Password (6+ chars)
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-neutral-700 block">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-700 block">
                      Shipping Address (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, City, Postal Code"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
              )}

              {/* ── FORGOT PASSWORD FORM ─────────────────────────────────── */}
              {authMode === 'forgot' && (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Enter your account email below to receive password reset instructions.
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-700 block">
                      Registered Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="py-2.5 px-4 rounded-xl border border-neutral-200 text-xs font-medium hover:bg-neutral-50 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          ) : (
            /* ══════════════════════════════════════════════════════════════
                AUTHENTICATED USER DASHBOARD
            ══════════════════════════════════════════════════════════════ */
            <div className="space-y-5">
              
              {/* USER PROFILE HEADER CARD */}
              <div className="bg-neutral-900 text-white p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-neutral-700 text-white font-bold text-base flex items-center justify-center">
                      {(userProfile?.name || user.displayName || user.email || 'M').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">
                        {userProfile?.name || user.displayName || 'Banzook Member'}
                      </div>
                      <div className="text-xs text-neutral-400 truncate max-w-[180px] sm:max-w-xs">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={signOutUser}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Tier</span>
                    <span className="font-medium text-white">{userProfile?.tier || 'Founder Tier 01'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Status</span>
                    <span className="font-medium text-emerald-400">Verified</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Orders</span>
                    <span className="font-medium text-white">{orders.length}</span>
                  </div>
                </div>
              </div>

              {/* NAVIGATION TABS */}
              <div className="grid grid-cols-3 p-1 bg-neutral-100 rounded-xl text-xs font-medium text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Orders ({orders.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('perks')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'perks'
                      ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Privileges
                </button>
              </div>

              {/* ── TAB 1: PROFILE & COORDINATES ───────────────────────── */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <span className="font-semibold text-xs text-neutral-900">
                        Shipping Coordinates
                      </span>
                      {!isEditingDossier && (
                        <button
                          onClick={startEditDossier}
                          className="text-xs text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1 cursor-pointer font-medium"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      )}
                    </div>

                    {!isEditingDossier ? (
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-neutral-400 block text-[11px]">Name</span>
                          <span className="font-medium text-neutral-900">{userProfile?.name || user.displayName || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[11px]">Email</span>
                          <span className="font-medium text-neutral-900">{user.email}</span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[11px]">Phone</span>
                          <span className="font-medium text-neutral-900">{userProfile?.phone || 'Not provided'}</span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[11px]">Address</span>
                          <span className="font-medium text-neutral-900">{userProfile?.address || 'Not provided'}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-1">
                        <div>
                          <label className="text-[11px] text-neutral-500 block">Name</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-white border border-neutral-200 rounded-lg py-1.5 px-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-neutral-500 block">Phone</label>
                          <input
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="w-full bg-white border border-neutral-200 rounded-lg py-1.5 px-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-neutral-500 block">Address</label>
                          <textarea
                            rows={2}
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                            className="w-full bg-white border border-neutral-200 rounded-lg py-1.5 px-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                          />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsEditingDossier(false)}
                            className="py-1.5 px-3 rounded-lg border border-neutral-200 text-xs font-medium hover:bg-white cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={saveDossier}
                            disabled={isSubmitting}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" /> Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── TAB 2: ORDERS ────────────────────────────────────────── */}
              {activeTab === 'orders' && (
                <div className="space-y-3">
                  {ordersLoading ? (
                    <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-50 rounded-2xl">
                      Loading orders...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="p-8 text-center bg-neutral-50 rounded-2xl space-y-2 border border-neutral-200">
                      <Package className="w-8 h-8 text-neutral-400 mx-auto" />
                      <div className="font-semibold text-xs text-neutral-900">
                        No orders yet
                      </div>
                      <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                        Your purchases and tracking updates will appear here.
                      </p>
                      {onNavigateToShop && (
                        <button
                          onClick={() => { onClose(); onNavigateToShop(); }}
                          className="mt-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Start Shopping
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {orders.map((order, i) => (
                        <div key={order.id || i} className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 space-y-2 text-xs">
                          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                            <div>
                              <span className="font-semibold text-neutral-900">{order.trackingNumber || `ORDER #${order.id?.substring(0, 8)}`}</span>
                              <span className="text-[11px] text-neutral-500 block">
                                {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium capitalize">
                              {order.status || 'Confirmed'}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="text-neutral-700">
                                  {item.quantity}x {item.name} ({item.size})
                                </span>
                                <span className="font-medium text-neutral-900">₹{Math.round(item.price * item.quantity).toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-neutral-200 pt-2 flex items-center justify-between font-semibold text-neutral-900">
                            <span>Total</span>
                            <span>₹{Math.round(order.total).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB 3: PRIVILEGES ──────────────────────────────────── */}
              {activeTab === 'perks' && (
                <div className="space-y-3">
                  
                  {/* PROMO CARD */}
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-900">
                        15% Member Discount
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-xs text-neutral-500">
                        Code: <strong className="text-neutral-900 font-mono">BANZOOK15</strong>
                      </span>
                      <button
                        onClick={copyPromo}
                        className="px-3 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-medium hover:bg-neutral-100 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                      >
                        {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedCode ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* PRIVILEGES LIST */}
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-neutral-900 block">Drop 001 Archive Access</span>
                        <span className="text-[11px] text-neutral-500">Full catalog unlocked</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">Unlocked</span>
                    </div>

                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-neutral-900 block">Early Drop Alerts</span>
                        <span className="text-[11px] text-neutral-500">SMS &amp; email release alerts</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">Enabled</span>
                    </div>

                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-neutral-900 block">Private Atelier Fittings</span>
                        <span className="text-[11px] text-neutral-500">1-on-1 tailoring session</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">3 Orders</span>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
