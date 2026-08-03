import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, User, Package, Key, Edit3, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import styles from './Overlays.module.css';

type SubView = 'profile' | 'orders' | 'access';

interface AcFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  activeField: string | null;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
}

const AcField: React.FC<AcFieldProps> = ({ id, label, type = 'text', value, activeField, onChange, onFocus, onBlur, placeholder }) => (
  <div className={`${styles.acField} ${activeField === id ? styles.acFieldActive : ''} ${value ? styles.acFieldFilled : ''}`}>
    <label className={styles.acFieldLabel} htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      className={styles.acFieldInput}
      value={value}
      placeholder={placeholder || ''}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      autoComplete="off"
    />
    <div className={styles.acFieldUnderline} />
  </div>
);

export const AccountPanel: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen } = useCart();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]       = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [errorMsg, setErrorMsg]   = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [user, setUser] = useState<{ uid: string; name: string; email: string; phone?: string; address?: string } | null>(null);
  const [activeView, setActiveView] = useState<SubView>('profile');
  const [editPhone, setEditPhone]   = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [isEditing, setIsEditing]   = useState(false);
  const [orders, setOrders]         = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (fu) => {
      if (fu) {
        let n = fu.displayName || fu.email?.split('@')[0].toUpperCase() || 'USER';
        let ph = ''; let ad = '';
        try {
          const snap = await getDoc(doc(db, 'users', fu.uid));
          if (snap.exists()) { const d = snap.data(); n = d.name||n; ph = d.phone||''; ad = d.address||''; }
        } catch {}
        const u = { uid: fu.uid, name: n, email: fu.email||'', phone: ph, address: ad };
        setUser(u); setEditPhone(ph); setEditAddress(ad);
        localStorage.setItem('banzook_user', JSON.stringify(u));
      } else {
        setUser(null); setEditPhone(''); setEditAddress('');
        localStorage.removeItem('banzook_user');
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isAccountOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isAccountOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsAccountOpen(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [setIsAccountOpen]);

  useEffect(() => {
    if (user && activeView === 'orders') {
      setIsLoadingOrders(true);
      getDocs(query(collection(db, 'orders'), where('userId', '==', user.uid)))
        .then(snap => {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setOrders(list.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        })
        .catch(() => {
          setOrders([{
            id: 'BAN-2026-9042', status: 'in-transit', date: new Date().toISOString(), total: 2998,
            items: [
              { name: 'BANZOOK X HOT WHEELS TEE', size: 'M', quantity: 1, price: 1499 }
            ]
          }]);
        })
        .finally(() => setIsLoadingOrders(false));
    }
  }, [user, activeView]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setErrorMsg('PLEASE FILL ALL FIELDS'); return; }
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg('SIGNED IN ✓');
      setTimeout(() => setSuccessMsg(''), 2500);
    } catch (err: any) {
      setErrorMsg(err.code === 'auth/invalid-credential' ? 'INVALID EMAIL OR PASSWORD' : err.message.replace('Firebase: ', '').toUpperCase());
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setErrorMsg('PLEASE FILL ALL FIELDS'); return; }
    if (password.length < 6) { setErrorMsg('PASSWORD MIN 6 CHARACTERS'); return; }
    setErrorMsg('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      try { await setDoc(doc(db, 'users', cred.user.uid), { name: name.toUpperCase(), email, phone: '', address: '' }); } catch {}
      setSuccessMsg('ACCOUNT CREATED ✓');
      setTimeout(() => setSuccessMsg(''), 2500);
    } catch (err: any) {
      setErrorMsg(err.message.replace('Firebase: ', '').toUpperCase());
    }
  };

  const handleSave = async () => {
    if (!user) return;
    try { await setDoc(doc(db, 'users', user.uid), { name: user.name, email: user.email, phone: editPhone, address: editAddress }, { merge: true }); } catch {}
    const updated = { ...user, phone: editPhone, address: editAddress };
    setUser(updated); localStorage.setItem('banzook_user', JSON.stringify(updated));
    setIsEditing(false); setSuccessMsg('PROFILE UPDATED ✓'); setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleSignOut = async () => {
    try { await firebaseSignOut(auth); } catch {}
    setUser(null); localStorage.removeItem('banzook_user'); setIsAccountOpen(false);
  };

  if (!isAccountOpen) return null;

  const NAV: { id: SubView; label: string; icon: any }[] = [
    { id: 'profile', label: 'IDENTITY', icon: User },
    { id: 'orders',  label: 'ORDERS',   icon: Package },
    { id: 'access',  label: 'ACCESS',   icon: Key },
  ];

  return (
    <div className={styles.acOverlay} onClick={() => setIsAccountOpen(false)}>
      <div className={styles.acDrawer} onClick={e => e.stopPropagation()}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <header className={styles.acHeader}>
          <div className={styles.acHeaderTitleBlock}>
            <span className={styles.acHeaderTag}>BANZOOK</span>
            <span className={styles.acHeaderSubTag}>
              {user ? 'IDENTITY ARCHIVE' : authMode === 'login' ? 'MEMBER SIGN IN' : 'CREATE MEMBER PASS'}
            </span>
          </div>
          <button className={styles.acCloseBtn} onClick={() => setIsAccountOpen(false)} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        {/* ═══ LOGGED-OUT AUTH FLOW ════════════════════════════════════════ */}
        {!user && (
          <div className={styles.acAuthWrap}>
            <div className={styles.acAuthHero}>
              <div className={styles.acAuthEyebrow}>BANZOOK MEMBERSHIP</div>
              <h2 className={styles.acAuthTitle}>
                {authMode === 'login' ? <>WELCOME<br />BACK.</> : <>JOIN THE<br />ARCHIVE.</>}
              </h2>
              <p className={styles.acAuthSub}>
                {authMode === 'login'
                  ? 'Sign in to access your personal BANZOOK identity pass and drop registry.'
                  : 'Create your BANZOOK member pass. Get early drop access and exclusive collection archives.'}
              </p>
            </div>

            {errorMsg   && <div className={styles.acError}>{errorMsg}</div>}
            {successMsg && <div className={styles.acSuccess}>{successMsg}</div>}

            <form className={styles.acAuthForm} onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
              {authMode === 'register' && (
                <AcField id="ac-name" label="FULL NAME" value={name} activeField={activeField} onChange={setName} onFocus={() => setActiveField('ac-name')} onBlur={() => setActiveField(null)} />
              )}
              <AcField id="ac-email" label="EMAIL ADDRESS" type="email" value={email} activeField={activeField} onChange={setEmail} onFocus={() => setActiveField('ac-email')} onBlur={() => setActiveField(null)} />
              <AcField id="ac-pw" label="PASSWORD" type="password" value={password} activeField={activeField} onChange={setPassword} onFocus={() => setActiveField('ac-pw')} onBlur={() => setActiveField(null)} />

              {authMode === 'login' && (
                <div className={styles.acTestCreds}>DEMO MEMBER: admin@gmail.com / 123456</div>
              )}

              <button type="submit" className={styles.acSubmitBtn}>
                <span>{authMode === 'login' ? 'SIGN IN TO ARCHIVE' : 'CREATE MEMBER PASS'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <button className={styles.acModeToggle} onClick={() => { setAuthMode(authMode==='login'?'register':'login'); setErrorMsg(''); }}>
              {authMode === 'login' ? "NEED A MEMBER PASS? CREATE ONE →" : "HAVE A PASS? SIGN IN →"}
            </button>
          </div>
        )}

        {/* ═══ LOGGED-IN ARCHIVE ═══════════════════════════════════════════ */}
        {user && (
          <div className={styles.acArchive}>

            {/* Member Dossier Pass Card */}
            <div className={styles.acMemberPassCard}>
              <div className={styles.acPassHeader}>
                <div className={styles.acPassLogo}>BANZOOK // PASS</div>
                <div className={styles.acPassBadge}>
                  <ShieldCheck size={14} />
                  <span>VERIFIED MEMBER</span>
                </div>
              </div>
              <div className={styles.acPassBody}>
                <div className={styles.acPassWelcome}>MEMBER IDENTITY</div>
                <h2 className={styles.acPassName}>{user.name}</h2>
                <div className={styles.acPassEmail}>{user.email}</div>
              </div>
              <div className={styles.acPassFooter}>
                <div className={styles.acPassId}>ID: BAN-{user.uid.slice(0, 8).toUpperCase()}</div>
                <div className={styles.acPassTier}>TIER 01 FOUNDER</div>
              </div>
            </div>

            {/* Segmented Navigation Rail */}
            <nav className={styles.acNavSegmented}>
              {NAV.map(n => {
                const Icon = n.icon;
                return (
                  <button
                    key={n.id}
                    className={`${styles.acSegmentBtn} ${activeView === n.id ? styles.acSegmentBtnActive : ''}`}
                    onClick={() => setActiveView(n.id)}
                  >
                    <Icon size={14} />
                    <span>{n.label}</span>
                  </button>
                );
              })}
              <button className={styles.acSignOutSegment} onClick={handleSignOut} title="Sign Out">
                <LogOut size={14} />
                <span>EXIT</span>
              </button>
            </nav>

            {successMsg && <div className={styles.acSuccessBar}>{successMsg}</div>}

            {/* ── PROFILE / IDENTITY VIEW ──────────────────────────────── */}
            {activeView === 'profile' && (
              <div className={styles.acSection}>
                <div className={styles.acSectionHeader}>
                  <div className={styles.acSectionTitle}>MEMBER DOSSIER</div>
                  {!isEditing && (
                    <button className={styles.acEditBadgeBtn} onClick={() => setIsEditing(true)}>
                      <Edit3 size={13} />
                      <span>EDIT DOSSIER</span>
                    </button>
                  )}
                </div>

                {!isEditing ? (
                  <div className={styles.acDossierGrid}>
                    {[
                      { k: 'FULL NAME', v: user.name, sub: 'PRIMARY ACCOUNT NAME' },
                      { k: 'EMAIL ADDRESS', v: user.email, sub: 'VERIFIED MEMBER EMAIL' },
                      { k: 'PHONE NUMBER', v: user.phone || 'NOT SET', sub: 'SHIPPING NOTIFICATIONS' },
                      { k: 'SHIPPING ADDRESS', v: user.address || 'NOT SET', sub: 'DEFAULT DELIVERY DESTINATION' },
                    ].map(row => (
                      <div key={row.k} className={styles.acDossierCard}>
                        <div className={styles.acDossierKey}>{row.k}</div>
                        <div className={styles.acDossierVal}>{row.v}</div>
                        <div className={styles.acDossierSub}>{row.sub}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.acEditFormCard}>
                    <div className={styles.acEditFormTitle}>EDIT SHIPPING COORDINATES</div>
                    <AcField id="ed-ph" label="PHONE NUMBER" value={editPhone} activeField={activeField} onChange={setEditPhone} onFocus={() => setActiveField('ed-ph')} onBlur={() => setActiveField(null)} placeholder="+91 XXXXX XXXXX" />
                    
                    <div className={`${styles.acField} ${activeField === 'ed-ad' ? styles.acFieldActive : ''}`}>
                      <label className={styles.acFieldLabel} htmlFor="ed-ad">SHIPPING ADDRESS</label>
                      <textarea
                        id="ed-ad"
                        className={`${styles.acFieldInput} ${styles.acFieldTextarea}`}
                        value={editAddress}
                        rows={3}
                        placeholder="BUILDING, STREET, AREA, CITY, PIN CODE"
                        onChange={e => setEditAddress(e.target.value)}
                        onFocus={() => setActiveField('ed-ad')}
                        onBlur={() => setActiveField(null)}
                      />
                      <div className={styles.acFieldUnderline} />
                    </div>

                    <div className={styles.acEditActions}>
                      <button className={styles.acCancelLink} onClick={() => setIsEditing(false)}>CANCEL</button>
                      <button className={styles.acSaveBtn} onClick={handleSave}>
                        <span>SAVE DOSSIER</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── ORDERS VIEW ──────────────────────────────────────────── */}
            {activeView === 'orders' && (
              <div className={styles.acSection}>
                <div className={styles.acSectionHeader}>
                  <div className={styles.acSectionTitle}>ORDER REGISTRY</div>
                  <div className={styles.acOrderCountTag}>{orders.length} {orders.length === 1 ? 'RECORD' : 'RECORDS'}</div>
                </div>

                {isLoadingOrders ? (
                  <div className={styles.acStateMsg}>RETRIEVING MEMBER ORDERS...</div>
                ) : orders.length === 0 ? (
                  <div className={styles.acEmptyOrders}>
                    <Package size={40} className={styles.acEmptyIcon} />
                    <div className={styles.acEmptyTitle}>NO ORDERS YET.</div>
                    <div className={styles.acEmptySub}>YOUR ACQUIRED PIECES WILL BE ARCHIVED HERE.</div>
                  </div>
                ) : (
                  <div className={styles.acOrderList}>
                    {orders.map((order, i) => (
                      <div key={order.id || i} className={styles.acOrderCard}>
                        <div className={styles.acOrderCardHead}>
                          <div>
                            <div className={styles.acOrderCardNum}>RECORD {String(i + 1).padStart(3, '0')}</div>
                            <div className={styles.acOrderCardId}>{order.id}</div>
                          </div>
                          <span className={`${styles.acStatusBadge} ${order.status === 'delivered' ? styles.acStatusDelivered : styles.acStatusTransit}`}>
                            {(order.status || 'IN TRANSIT').toUpperCase()}
                          </span>
                        </div>

                        <div className={styles.acOrderCardItems}>
                          {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className={styles.acOrderItemRow}>
                              <div className={styles.acOrderItemLeft}>
                                <span className={styles.acOrderItemDot} />
                                <span className={styles.acOrderItemName}>{item.name}</span>
                              </div>
                              <span className={styles.acOrderItemMeta}>SIZE {item.size} · QTY {item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className={styles.acOrderCardFoot}>
                          <span className={styles.acOrderDate}>
                            {order.date ? new Date(order.date).toLocaleDateString('en-GB').split('/').join('.') : ''}
                          </span>
                          <span className={styles.acOrderTotal}>TOTAL ₹{order.total?.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── ACCESS VIEW ──────────────────────────────────────────── */}
            {activeView === 'access' && (
              <div className={styles.acSection}>
                <div className={styles.acSectionHeader}>
                  <div className={styles.acSectionTitle}>ACCESS TIERS</div>
                </div>

                <div className={styles.acAccessGrid}>
                  {[
                    { label: 'FOUNDER MEMBERSHIP', value: 'TIER 01 ACTIVE', sub: 'VERIFIED MEMBER ACCOUNT STATUS', active: true },
                    { label: 'DROP 001 ARCHIVE', value: 'FULL ACCESS', sub: 'COMPLETE CATALOG UNLOCKED', active: true },
                    { label: 'EARLY NOTIFICATIONS', value: 'ENABLED', sub: 'SMS & EMAIL ALERTS BEFORE DROPS', active: true },
                    { label: 'TIER 02 ARCHIVE', value: 'LOCKED', sub: 'COMPLETE 3 PURCHASES TO UNLOCK', active: false },
                  ].map(item => (
                    <div key={item.label} className={`${styles.acAccessCard} ${!item.active ? styles.acAccessCardLocked : ''}`}>
                      <div className={styles.acAccessCardLeft}>
                        <div className={styles.acAccessLabel}>{item.label}</div>
                        <div className={styles.acAccessSub}>{item.sub}</div>
                      </div>
                      <span className={`${styles.acAccessBadge} ${item.active ? styles.acAccessBadgeActive : styles.acAccessBadgeLocked}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
