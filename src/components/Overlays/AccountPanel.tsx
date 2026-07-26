import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import styles from './Overlays.module.css';

type SubView = 'profile' | 'orders' | 'access';

// Top-level field component to prevent input unmounting/focus loss on state updates
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
              { name: 'BANZOOK X HOT WHEELS TEE', size: 'M', quantity: 1, price: 1499 },
              { name: 'BANZOOK "NO SMOKING" TEE', size: 'L', quantity: 1, price: 1499 }
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
    setIsEditing(false); setSuccessMsg('SAVED ✓'); setTimeout(() => setSuccessMsg(''), 2000);
  };

  const handleSignOut = async () => {
    try { await firebaseSignOut(auth); } catch {}
    setUser(null); localStorage.removeItem('banzook_user'); setIsAccountOpen(false);
  };

  if (!isAccountOpen) return null;

  const NAV: { id: SubView; label: string }[] = [
    { id: 'profile', label: 'PROFILE' },
    { id: 'orders',  label: 'ORDERS'  },
    { id: 'access',  label: 'ACCESS'  },
  ];

  return (
    <div className={styles.acOverlay} onClick={() => setIsAccountOpen(false)}>
      <div className={styles.acDrawer} onClick={e => e.stopPropagation()}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <header className={styles.acHeader}>
          <span className={styles.acHeaderTag}>
            {user ? 'IDENTITY ARCHIVE' : authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </span>
          <button className={styles.acCloseBtn} onClick={() => setIsAccountOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </header>

        {/* ═══ LOGGED-OUT AUTH FLOW ════════════════════════════════════════ */}
        {!user && (
          <div className={styles.acAuthWrap}>
            <div className={styles.acAuthHero}>
              <div className={styles.acAuthEyebrow}>BANZOOK</div>
              <h2 className={styles.acAuthTitle}>
                {authMode === 'login' ? <>WELCOME<br />BACK.</> : <>JOIN THE<br />ARCHIVE.</>}
              </h2>
              <p className={styles.acAuthSub}>
                {authMode === 'login'
                  ? 'Sign in to access your BANZOOK identity.'
                  : 'Create your account. Get early access to drops.'}
              </p>
            </div>

            {errorMsg   && <div className={styles.acError}>{errorMsg}</div>}
            {successMsg && <div className={styles.acSuccess}>{successMsg}</div>}

            <form className={styles.acAuthForm} onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
              {authMode === 'register' && (
                <AcField id="ac-name" label="YOUR NAME" value={name} activeField={activeField} onChange={setName} onFocus={() => setActiveField('ac-name')} onBlur={() => setActiveField(null)} />
              )}
              <AcField id="ac-email" label="EMAIL ADDRESS" type="email" value={email} activeField={activeField} onChange={setEmail} onFocus={() => setActiveField('ac-email')} onBlur={() => setActiveField(null)} />
              <AcField id="ac-pw" label="PASSWORD" type="password" value={password} activeField={activeField} onChange={setPassword} onFocus={() => setActiveField('ac-pw')} onBlur={() => setActiveField(null)} />

              {authMode === 'login' && (
                <div className={styles.acTestCreds}>TEST CREDENTIALS: admin@gmail.com / 123456</div>
              )}

              <button type="submit" className={styles.acSubmitBtn}>
                <span>{authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                <ArrowRight size={15} />
              </button>
            </form>

            <button className={styles.acModeToggle} onClick={() => { setAuthMode(authMode==='login'?'register':'login'); setErrorMsg(''); }}>
              {authMode === 'login' ? "NO ACCOUNT? CREATE ONE →" : "HAVE AN ACCOUNT? SIGN IN →"}
            </button>
          </div>
        )}

        {/* ═══ LOGGED-IN ARCHIVE ═══════════════════════════════════════════ */}
        {user && (
          <div className={styles.acArchive}>

            {/* Identity Block */}
            <div className={styles.acIdentityBlock}>
              <div className={styles.acWelcomeTag}>WELCOME BACK,</div>
              <h2 className={styles.acBigName}>{user.name}</h2>
              <div className={styles.acUserEmail}>{user.email}</div>
              <div className={styles.acBadgeRow}>
                <span className={styles.acBadge}>BANZOOK MEMBER</span>
                <span className={styles.acBadge}>TIER 01</span>
                <span className={`${styles.acBadge} ${styles.acBadgeOrange}`}>DROP 001</span>
              </div>
            </div>

            {/* Nav Rail */}
            <nav className={styles.acNavRail}>
              {NAV.map(n => (
                <button key={n.id} className={`${styles.acNavBtn} ${activeView===n.id ? styles.acNavBtnActive : ''}`} onClick={() => setActiveView(n.id)}>
                  {activeView === n.id && <div className={styles.acNavDot} />}
                  {n.label}
                </button>
              ))}
              <div className={styles.acNavSpacer} />
              <button className={styles.acSignOutBtn} onClick={handleSignOut}>SIGN OUT <ArrowRight size={12} /></button>
            </nav>

            {successMsg && <div className={styles.acSuccess} style={{ margin: '0', borderRadius: 0 }}>{successMsg}</div>}

            {/* ── PROFILE ──────────────────────────────────────────────── */}
            {activeView === 'profile' && (
              <div className={styles.acSection}>
                <div className={styles.acSectionTitle}>YOUR IDENTITY</div>
                {!isEditing ? (
                  <>
                    <div className={styles.acDocGrid}>
                      {[
                        { k: 'FULL NAME',         v: user.name    },
                        { k: 'EMAIL',             v: user.email   },
                        { k: 'PHONE',             v: user.phone || '—' },
                        { k: 'SHIPPING ADDRESS',  v: user.address || '—' },
                      ].map(row => (
                        <div key={row.k} className={styles.acDocRow}>
                          <span className={styles.acDocKey}>{row.k}</span>
                          <span className={styles.acDocVal}>{row.v}</span>
                        </div>
                      ))}
                    </div>
                    <button className={styles.acEditLink} onClick={() => setIsEditing(true)}>EDIT PROFILE →</button>
                  </>
                ) : (
                  <div className={styles.acEditForm}>
                    <div className={`${styles.acField} ${activeField==='ed-ph' ? styles.acFieldActive : ''}`}>
                      <label className={styles.acFieldLabel} htmlFor="ed-ph">PHONE NUMBER</label>
                      <input id="ed-ph" type="text" className={styles.acFieldInput} value={editPhone} placeholder="+91 XXXXX XXXXX" onChange={e => setEditPhone(e.target.value)} onFocus={() => setActiveField('ed-ph')} onBlur={() => setActiveField(null)} />
                      <div className={styles.acFieldUnderline} />
                    </div>
                    <div className={`${styles.acField} ${activeField==='ed-ad' ? styles.acFieldActive : ''}`}>
                      <label className={styles.acFieldLabel} htmlFor="ed-ad">SHIPPING ADDRESS</label>
                      <textarea id="ed-ad" className={`${styles.acFieldInput} ${styles.acFieldTextarea}`} value={editAddress} rows={3} placeholder="BUILDING, STREET, AREA, CITY, PIN" onChange={e => setEditAddress(e.target.value)} onFocus={() => setActiveField('ed-ad')} onBlur={() => setActiveField(null)} />
                      <div className={styles.acFieldUnderline} />
                    </div>
                    <div className={styles.acEditActions}>
                      <button className={styles.acCancelLink} onClick={() => setIsEditing(false)}>CANCEL</button>
                      <button className={styles.acSaveBtn} onClick={handleSave}>SAVE CHANGES →</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── ORDERS ───────────────────────────────────────────────── */}
            {activeView === 'orders' && (
              <div className={styles.acSection}>
                <div className={styles.acSectionTitle}>ORDER ARCHIVE</div>
                {isLoadingOrders ? (
                  <div className={styles.acStateMsg}>RETRIEVING ORDER REGISTRY...</div>
                ) : orders.length === 0 ? (
                  <div className={styles.acEmptyOrders}>
                    <div className={styles.acEmptyTitle}>ARCHIVE EMPTY.</div>
                    <div className={styles.acEmptySub}>YOUR ORDER HISTORY WILL APPEAR HERE.</div>
                  </div>
                ) : (
                  <div className={styles.acOrderList}>
                    {orders.map((order, i) => (
                      <div key={order.id||i} className={styles.acOrderEntry}>
                        <div className={styles.acOrderEntryHead}>
                          <span className={styles.acOrderNum}>ORDER {String(i+1).padStart(3,'0')}</span>
                          <span className={`${styles.acOrderBadge} ${order.status==='delivered' ? styles.acBadgeGreen : styles.acBadgeOrange}`}>
                            {(order.status||'IN TRANSIT').toUpperCase()}
                          </span>
                        </div>
                        <div className={styles.acOrderItemList}>
                          {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className={styles.acOrderItem}>
                              <span className={styles.acOrderItemName}>{item.name}</span>
                              <span className={styles.acOrderItemMeta}>SIZE {item.size} · QTY {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className={styles.acOrderEntryFoot}>
                          <span className={styles.acOrderDate}>
                            {order.date ? new Date(order.date).toLocaleDateString('en-GB').split('/').join('.') : ''}
                          </span>
                          <span className={styles.acOrderTotal}>₹{order.total?.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── ACCESS ───────────────────────────────────────────────── */}
            {activeView === 'access' && (
              <div className={styles.acSection}>
                <div className={styles.acSectionTitle}>YOUR ACCESS</div>
                <div className={styles.acAccessGrid}>
                  {[
                    { label: 'MEMBERSHIP', value: 'TIER 01', sub: 'FOUNDING MEMBER', active: true },
                    { label: 'DROP ACCESS', value: 'DROP 001', sub: 'FULL ARCHIVE UNLOCKED', active: true },
                    { label: 'EARLY ACCESS', value: 'ACTIVE', sub: 'NEXT DROP NOTIFICATION', active: true },
                    { label: 'TIER 02', value: 'LOCKED', sub: 'COMPLETE 3 ORDERS', active: false },
                  ].map(item => (
                    <div key={item.label} className={`${styles.acAccessRow} ${!item.active ? styles.acAccessRowLocked : ''}`}>
                      <div>
                        <div className={styles.acAccessLabel}>{item.label}</div>
                        <div className={styles.acAccessSub}>{item.sub}</div>
                      </div>
                      <div className={`${styles.acAccessBadge} ${item.active ? styles.acAccessBadgeOn : styles.acAccessBadgeOff}`}>{item.value}</div>
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
