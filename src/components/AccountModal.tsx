import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Package, 
  Award, 
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
  ExternalLink,
  ChevronRight,
  ShoppingBag
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
    updateProfileData,
    refreshOrders
  } = useAuth();

  // Auth form states
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
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'rewards'>('profile');
  
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
      setSuccessMsg('Successfully logged into Banzook Registry.');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setErrorMsg('Invalid email or password. Please verify and retry.');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMsg('No member account found with this email. Switch to Register.');
      } else {
        setErrorMsg(err.message || 'Failed to authenticate.');
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
      setSuccessMsg('Member dossier created successfully! Welcome to Banzook.');
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
      setSuccessMsg('Signed in via Google successfully.');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Google sign-in was cancelled or failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      await sendResetPassword(email);
      setSuccessMsg('Password reset instructions sent to your email.');
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
      setSuccessMsg('Shipping dossier coordinates updated in registry.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg('Failed to update profile coordinates.');
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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md font-mono-banzook animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#F5F4F1] rounded-[24px] border-2 border-[#111111] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col max-h-[92vh]">
        
        {/* HEADER */}
        <div className="p-4 sm:p-5 bg-white border-b-2 border-[#111111] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#111111] text-[#F5F4F1] flex items-center justify-center shadow-xs">
              <UserIcon className="w-4 h-4 text-[#E65F2B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs uppercase tracking-widest text-[#111111]">
                  BANZOOK // MEMBER REGISTRY
                </span>
                {user && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    AUTHENTICATED
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#666660] font-sans">
                {user ? `Connected to ${user.email}` : 'Access your archived orders & member perks'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full border border-[#111111] hover:bg-[#111111] hover:text-white transition-all cursor-pointer group"
          >
            <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
          </button>
        </div>

        {/* NOTIFICATIONS */}
        {errorMsg && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 px-5 text-xs text-rose-700 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="flex-1 font-sans">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-rose-500 hover:text-rose-800 font-bold">×</button>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 p-3 px-5 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="flex-1 font-sans">{successMsg}</span>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900 font-bold">×</button>
          </div>
        )}

        {/* BODY CONTAINER */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7">
          
          {/* ══════════════════════════════════════════════════════════════
              UNAUTHENTICATED: LOGIN / REGISTER / FORGOT VIEWS
          ══════════════════════════════════════════════════════════════ */}
          {!user ? (
            <div className="space-y-6">
              
              {/* AUTH MODE SWITCHER */}
              <div className="grid grid-cols-2 p-1 bg-[#EBE7DF] rounded-xl border border-[#111111]/15 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setErrorMsg(null); }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    authMode === 'signin'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#666660] hover:text-[#111111]'
                  }`}
                >
                  SIGN IN
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMsg(null); }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#666660] hover:text-[#111111]'
                  }`}
                >
                  JOIN REGISTRY
                </button>
              </div>

              {/* GOOGLE ONE-CLICK AUTH */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-white rounded-xl border-2 border-[#111111] hover:bg-[#F5F4F1] transition-all flex items-center justify-center gap-3 text-xs font-bold cursor-pointer shadow-[3px_3px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>CONTINUE WITH GOOGLE</span>
              </button>

              <div className="flex items-center gap-3 text-[10px] text-[#666660] uppercase">
                <div className="h-px bg-neutral-300 flex-1" />
                <span>OR EMAIL COORDINATES</span>
                <div className="h-px bg-neutral-300 flex-1" />
              </div>

              {/* ── SIGN IN FORM ────────────────────────────────────────── */}
              {authMode === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[#666660] block">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#666660] absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@domain.com"
                        className="w-full bg-white border border-[#111111] rounded-xl py-3 pl-10 pr-4 text-xs font-sans text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase text-[#666660] block">
                        PASSWORD
                      </label>
                      <button
                        type="button"
                        onClick={() => { setAuthMode('forgot'); setErrorMsg(null); }}
                        className="text-[10px] text-[#E65F2B] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#666660] absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-white border border-[#111111] rounded-xl py-3 pl-10 pr-4 text-xs font-sans text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#111111] text-white text-xs font-extrabold uppercase hover:bg-[#E65F2B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <span>AUTHENTICATING...</span>
                    ) : (
                      <>
                        <span>ENTER MEMBER PORTAL</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* ── REGISTER FORM ────────────────────────────────────────── */}
              {authMode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-[#666660] block">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Julian Mercer"
                      className="w-full bg-white border border-[#111111] rounded-xl py-2.5 px-3.5 text-xs font-sans text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-[#666660] block">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.name@domain.com"
                      className="w-full bg-white border border-[#111111] rounded-xl py-2.5 px-3.5 text-xs font-sans text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#666660] block">
                        PASSWORD (MIN 6)
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-white border border-[#111111] rounded-xl py-2.5 px-3.5 text-xs font-sans text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#666660] block">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white border border-[#111111] rounded-xl py-2.5 px-3.5 text-xs font-sans text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-[#666660] block">
                      SHIPPING DESTINATION (OPTIONAL)
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, Unit / Apt, City, Zip Code"
                      className="w-full bg-white border border-[#111111] rounded-xl py-2 px-3.5 text-xs font-sans text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#111111] text-white text-xs font-extrabold uppercase hover:bg-[#E65F2B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <span>CREATING MEMBER ACCOUNT...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#E65F2B]" />
                        <span>CREATE MEMBER DOSSIER (+200 PTS)</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* ── FORGOT PASSWORD FORM ─────────────────────────────────── */}
              {authMode === 'forgot' && (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-[#111111]/20 space-y-1">
                    <div className="text-xs font-bold text-[#111111]">RESET PASSWORD</div>
                    <p className="text-[11px] text-[#666660] font-sans">
                      Enter your account email to receive a password reset link.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-[#666660] block">
                      REGISTERED EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full bg-white border border-[#111111] rounded-xl py-3 px-4 text-xs font-sans text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="py-3 px-4 rounded-full border border-[#111111] bg-white text-xs font-bold uppercase hover:bg-[#F5F4F1] cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-4 rounded-full bg-[#111111] text-white text-xs font-bold uppercase hover:bg-[#E65F2B] transition-all cursor-pointer"
                    >
                      {isSubmitting ? 'SENDING...' : 'SEND RESET LINK'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          ) : (
            /* ══════════════════════════════════════════════════════════════
                AUTHENTICATED MEMBER PORTAL
            ══════════════════════════════════════════════════════════════ */
            <div className="space-y-6">
              
              {/* MEMBER DOSSIER CARD */}
              <div className="bg-gradient-to-br from-[#111111] to-[#222222] text-white p-5 rounded-2xl border-2 border-[#111111] space-y-4 shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#E65F2B] text-white font-extrabold text-lg flex items-center justify-center shadow-inner">
                      {(userProfile?.name || user.displayName || user.email || 'M').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-lg text-white">
                        {userProfile?.name || user.displayName || 'Banzook Member'}
                      </div>
                      <div className="text-xs text-neutral-400 font-sans truncate max-w-[200px] sm:max-w-xs">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={signOutUser}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-[10px] font-bold uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>

                {/* METRICS STRIP */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <span className="text-[9px] text-neutral-400 block uppercase">TIER STATUS</span>
                    <span className="font-bold text-[#E65F2B] text-[11px]">{userProfile?.tier || 'FOUNDER TIER 01'}</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg">
                    <span className="text-[9px] text-neutral-400 block uppercase">ARCHIVE REWARDS</span>
                    <span className="font-bold text-white text-[11px]">{userProfile?.points || 200} PTS</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg">
                    <span className="text-[9px] text-neutral-400 block uppercase">DISPATCHES</span>
                    <span className="font-bold text-white text-[11px]">{orders.length} ORDERS</span>
                  </div>
                </div>
              </div>

              {/* TAB NAVIGATION */}
              <div className="grid grid-cols-3 p-1 bg-[#EBE7DF] rounded-xl border border-[#111111]/15 text-xs font-bold text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#666660] hover:text-[#111111]'
                  }`}
                >
                  DOSSIER
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`py-2 rounded-lg transition-all cursor-pointer relative ${
                    activeTab === 'orders'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#666660] hover:text-[#111111]'
                  }`}
                >
                  ORDERS ({orders.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('rewards')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'rewards'
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#666660] hover:text-[#111111]'
                  }`}
                >
                  PERKS
                </button>
              </div>

              {/* ── TAB 1: PROFILE / DOSSIER ────────────────────────────── */}
              {activeTab === 'profile' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-white p-5 rounded-2xl border-2 border-[#111111] space-y-4 shadow-[3px_3px_0px_#111111]">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                      <span className="font-extrabold text-xs uppercase text-[#111111] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#E65F2B]" />
                        MEMBER COORDINATES
                      </span>
                      {!isEditingDossier ? (
                        <button
                          onClick={startEditDossier}
                          className="px-2.5 py-1 rounded-md bg-[#F5F4F1] border border-[#111111] text-[10px] font-bold uppercase hover:bg-[#111111] hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Edit Coordinates
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#E65F2B] font-bold">EDITING...</span>
                      )}
                    </div>

                    {!isEditingDossier ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#F5F4F1] rounded-xl border border-neutral-200 space-y-0.5">
                          <span className="text-[9px] text-[#666660] uppercase block">FULL NAME</span>
                          <span className="font-bold text-[#111111]">{userProfile?.name || user.displayName || 'Not specified'}</span>
                        </div>

                        <div className="p-3 bg-[#F5F4F1] rounded-xl border border-neutral-200 space-y-0.5">
                          <span className="text-[9px] text-[#666660] uppercase block">EMAIL</span>
                          <span className="font-bold text-[#111111] truncate block">{user.email}</span>
                        </div>

                        <div className="p-3 bg-[#F5F4F1] rounded-xl border border-neutral-200 space-y-0.5">
                          <span className="text-[9px] text-[#666660] uppercase block">PHONE</span>
                          <span className="font-bold text-[#111111]">{userProfile?.phone || 'No phone set'}</span>
                        </div>

                        <div className="p-3 bg-[#F5F4F1] rounded-xl border border-neutral-200 space-y-0.5">
                          <span className="text-[9px] text-[#666660] uppercase block">DEFAULT SHIPPING ADDRESS</span>
                          <span className="font-bold text-[#111111]">{userProfile?.address || 'No address set'}</span>
                        </div>
                      </div>
                    ) : (
                      /* EDITING FORM */
                      <div className="space-y-3 pt-1">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-[#666660] block">NAME</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-[#F5F4F1] border border-[#111111] rounded-xl py-2 px-3 text-xs font-sans text-[#111111]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-[#666660] block">PHONE NUMBER</label>
                          <input
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-[#F5F4F1] border border-[#111111] rounded-xl py-2 px-3 text-xs font-sans text-[#111111]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-[#666660] block">SHIPPING ADDRESS</label>
                          <textarea
                            rows={2}
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                            placeholder="Street, City, Postal Code"
                            className="w-full bg-[#F5F4F1] border border-[#111111] rounded-xl py-2 px-3 text-xs font-sans text-[#111111]"
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsEditingDossier(false)}
                            className="py-2 px-4 rounded-xl border border-[#111111] bg-white text-xs font-bold uppercase hover:bg-[#F5F4F1] cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={saveDossier}
                            disabled={isSubmitting}
                            className="flex-1 py-2 px-4 rounded-xl bg-[#111111] text-white text-xs font-bold uppercase hover:bg-[#E65F2B] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" /> Save Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── TAB 2: ORDERS ────────────────────────────────────────── */}
              {activeTab === 'orders' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {ordersLoading ? (
                    <div className="p-8 text-center text-xs text-[#666660] bg-white rounded-2xl border border-[#111111]">
                      Retrieving live orders from registry...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border-2 border-[#111111] space-y-3 shadow-[3px_3px_0px_#111111]">
                      <Package className="w-10 h-10 text-[#666660] mx-auto opacity-50" />
                      <div className="font-display font-bold text-base text-[#111111]">
                        NO DISPATCH RECORDS YET
                      </div>
                      <p className="text-xs text-[#666660] font-sans max-w-xs mx-auto">
                        Your acquired pieces and tracking updates will be archived here upon checkout.
                      </p>
                      {onNavigateToShop && (
                        <button
                          onClick={() => { onClose(); onNavigateToShop(); }}
                          className="mt-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-bold uppercase hover:bg-[#E65F2B] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Explore Collection
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order, i) => (
                        <div key={order.id || i} className="bg-white p-4 rounded-2xl border-2 border-[#111111] space-y-3 shadow-xs">
                          <div className="flex items-center justify-between border-b border-neutral-200 pb-2 text-xs">
                            <div>
                              <span className="font-bold text-[#111111]">{order.trackingNumber || `ORDER #${order.id?.substring(0, 8)}`}</span>
                              <span className="text-[10px] text-[#666660] block">
                                {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'Recent Order'}
                              </span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase">
                              {order.status || 'CONFIRMED'}
                            </span>
                          </div>

                          {/* ORDER ITEMS */}
                          <div className="space-y-2">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-md bg-[#F5F4F1] border border-neutral-300 flex items-center justify-center text-[10px] font-bold">
                                    {item.quantity}x
                                  </span>
                                  <div>
                                    <span className="font-bold text-[#111111]">{item.name}</span>
                                    <span className="text-[10px] text-[#666660] block">
                                      Size {item.size} · {item.color}
                                    </span>
                                  </div>
                                </div>
                                <span className="font-bold text-[#111111]">${item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-neutral-200 pt-2 flex items-center justify-between text-xs">
                            <span className="text-[10px] text-[#666660]">TOTAL ACQUIRED:</span>
                            <span className="font-display font-bold text-sm text-[#111111]">${order.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB 3: REWARDS & PERKS ──────────────────────────────── */}
              {activeTab === 'rewards' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  
                  {/* REWARDS CARD */}
                  <div className="bg-white p-5 rounded-2xl border-2 border-[#111111] space-y-4 shadow-[3px_3px_0px_#111111]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E65F2B]" />
                      <span className="font-bold text-xs uppercase text-[#111111]">
                        ARCHIVE CREDIT STATUS
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#111111]">{userProfile?.points || 200} / 300 Points</span>
                        <span className="text-[#E65F2B] font-bold text-[11px]">100 PTS TO $25 CREDIT</span>
                      </div>
                      <div className="w-full h-2 bg-[#EBE7DF] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#111111] to-[#E65F2B]"
                          style={{ width: `${Math.min(100, (((userProfile?.points || 200) / 300) * 100))}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-[#F5F4F1] rounded-xl border border-neutral-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#111111]">MEMBER PERK: 15% OFF</div>
                        <div className="text-[10px] text-[#666660]">Promo Code: BANZOOK15</div>
                      </div>
                      <button
                        onClick={copyPromo}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#111111] text-[10px] font-bold uppercase hover:bg-[#111111] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedCode ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* UNLOCKED TIERS */}
                  <div className="bg-white p-4 rounded-2xl border-2 border-[#111111] space-y-2">
                    <div className="text-[10px] font-bold uppercase text-[#666660]">MEMBER PRIVILEGES</div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#F5F4F1]">
                        <span className="font-bold text-[#111111]">⚡ Drop 001 Early Access</span>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">UNLOCKED</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#F5F4F1]">
                        <span className="font-bold text-[#111111]">📦 Free Global Priority Courier</span>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#F5F4F1]">
                        <span className="font-bold text-[#111111]">🔒 Private Atelier Fittings (Drop 002)</span>
                        <span className="text-[9px] font-bold text-neutral-500 bg-neutral-200 px-2 py-0.5 rounded-full">3 PURCHASES</span>
                      </div>
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
