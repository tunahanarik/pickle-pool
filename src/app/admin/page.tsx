'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './admin.module.css';

const ADMIN_PASSWORD_KEY = 'pickle-admin-pw';

interface Registration {
  id: number;
  twitterHandle: string;
  evmAddress: string;
  completedQuests: string[];
  ipAddress: string | null;
  createdAt: string;
  entryCount: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Stats
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [todayRegistrations, setTodayRegistrations] = useState(0);

  // Registrations table
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1, limit: 50, total: 0, totalPages: 0,
  });
  const [search, setSearch] = useState('');

  // Quest config
  const [config, setConfig] = useState({
    follow_url: '',
    like_url: '',
    repost_url: '',
    comment_url: '',
    qrt_template: '',
    qrt_url: '',
  });

  const getPassword = useCallback(() => {
    return password || (typeof window !== 'undefined' ? sessionStorage.getItem(ADMIN_PASSWORD_KEY) || '' : '');
  }, [password]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'x-admin-password': getPassword() },
      });
      const data = await res.json();
      if (data.success) {
        setTotalRegistrations(data.data.totalRegistrations);
        setTodayRegistrations(data.data.todayRegistrations);
      }
    } catch { /* ignore */ }
  }, [getPassword]);

  const fetchRegistrations = useCallback(async (page = 1, searchQuery = '') => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '50',
        ...(searchQuery && { search: searchQuery }),
      });
      const res = await fetch(`/api/admin/registrations?${params}`, {
        headers: { 'x-admin-password': getPassword() },
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data.registrations);
        setPagination(data.data.pagination);
      }
    } catch { /* ignore */ }
  }, [getPassword]);

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/quest/config');
      const data = await res.json();
      if (data.success) {
        setConfig({
          follow_url: data.data.follow_url || '',
          like_url: data.data.like_url || '',
          repost_url: data.data.repost_url || '',
          comment_url: data.data.comment_url || '',
          qrt_template: data.data.qrt_template || '',
          qrt_url: data.data.qrt_url || '',
        });
      }
    } catch { /* ignore */ }
  }, []);

  // Login
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid password.');
      }
    } catch {
      setError('Connection error.');
    }
  };

  // Auto-login from session
  useEffect(() => {
    const savedPw = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    if (savedPw) {
      setPassword(savedPw);
      fetch('/api/admin/stats', {
        headers: { 'x-admin-password': savedPw },
      })
        .then((res) => {
          if (res.ok) setIsAuthenticated(true);
        })
        .catch(() => {});
    }
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      fetchRegistrations();
      fetchConfig();
    }
  }, [isAuthenticated, fetchStats, fetchRegistrations, fetchConfig]);

  // Search with debounce
  useEffect(() => {
    if (!isAuthenticated) return;
    const timer = setTimeout(() => {
      fetchRegistrations(1, search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, isAuthenticated, fetchRegistrations]);

  // Export CSV
  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/export', {
        headers: { 'x-admin-password': getPassword() },
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pickle-pool-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to export.');
    }
  };

  // Save config
  const handleSaveConfig = async () => {
    try {
      const res = await fetch('/api/quest/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': getPassword(),
        },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Config saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to save config.');
      }
    } catch {
      setError('Failed to save config.');
    }
  };

  // ── LOGIN SCREEN ── //
  if (!isAuthenticated) {
    return (
      <div className={styles['admin-page']}>
        <div className={styles['admin-login']}>
          <h1>🥒 Admin Panel</h1>
          <p>Enter password to access the dashboard</p>
          <div className={styles['admin-login-form']}>
            <input
              type="password"
              className={styles['admin-input']}
              placeholder="Admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              autoFocus
            />
            {error && <div className={styles['admin-error']}>{error}</div>}
            <button className={`${styles['admin-btn']} ${styles['admin-btn-primary']}`} onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ── //
  return (
    <div className={styles['admin-page']}>
      <div className={styles['admin-container']}>
        {/* Header */}
        <div className={styles['admin-header']}>
          <h1>🥒 Pickle Pool Admin</h1>
          <div className={styles['admin-header-actions']}>
            <button className={`${styles['admin-btn']} ${styles['admin-btn-primary']}`} onClick={handleExport}>
              📥 Export CSV
            </button>
            <button className={styles['admin-btn']} onClick={() => { fetchStats(); fetchRegistrations(pagination.page, search); }}>
              🔄 Refresh
            </button>
            <button className={styles['admin-btn']} onClick={() => { sessionStorage.removeItem(ADMIN_PASSWORD_KEY); setIsAuthenticated(false); }}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles['admin-stats']}>
          <div className={styles['admin-stat-card']}>
            <h3>Total Registrations</h3>
            <div className="value">{totalRegistrations.toLocaleString()}</div>
          </div>
          <div className={styles['admin-stat-card']}>
            <h3>Today</h3>
            <div className="value">{todayRegistrations.toLocaleString()}</div>
          </div>
        </div>

        {/* Quest Config */}
        <div className={styles['admin-config']}>
          <h2>🔗 Quest Links</h2>
          {success && <div className={styles['admin-success']}>{success}</div>}
          <div className={styles['admin-config-grid']}>
            {[
              { key: 'follow_url', label: 'Follow URL' },
              { key: 'like_url', label: 'Like URL' },
              { key: 'repost_url', label: 'Repost URL' },
              { key: 'comment_url', label: 'Comment URL' },
              { key: 'qrt_url', label: 'QRT Tweet URL (to quote)' },
            ].map((item) => (
              <div key={item.key} className={styles['admin-config-item']}>
                <label>{item.label}</label>
                <input
                  type="text"
                  className={styles['admin-input']}
                  value={config[item.key as keyof typeof config]}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, [item.key]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>
          <div className={styles['admin-config-item']} style={{ marginTop: 'var(--space-4)' }}>
            <label>QRT Tweet Template (pre-filled tweet text)</label>
            <textarea
              className={styles['admin-input']}
              rows={4}
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
              value={config.qrt_template}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, qrt_template: e.target.value }))
              }
              placeholder="🥒 Just registered for @PicklePool FREE NFT Quest!..."
            />
          </div>
          <button className={`${styles['admin-btn']} ${styles['admin-btn-primary']}`} onClick={handleSaveConfig} style={{ marginTop: 'var(--space-4)' }}>
            💾 Save Config
          </button>
        </div>

        {/* Registrations Table */}
        <div className={styles['admin-table-wrapper']}>
          <div className={styles['admin-table-header']}>
            <h2>📋 Registrations</h2>
            <input
              type="text"
              className={styles['admin-search']}
              placeholder="Search by handle or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className={styles['admin-table']}>
            <thead>
              <tr>
                <th>#</th>
                <th>Twitter</th>
                <th>EVM Address</th>
                <th>Quests</th>
                <th>Entries</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>
                    No registrations yet
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id}>
                    <td>{reg.id}</td>
                    <td>@{reg.twitterHandle}</td>
                    <td className="mono">
                      {reg.evmAddress.slice(0, 6)}...{reg.evmAddress.slice(-4)}
                    </td>
                    <td>{Array.isArray(reg.completedQuests) ? reg.completedQuests.length : 0}/4</td>
                    <td>
                      <span style={{
                        background: reg.entryCount > 1 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255,255,255,0.06)',
                        color: reg.entryCount > 1 ? '#facc15' : 'inherit',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontWeight: reg.entryCount > 1 ? 600 : 400,
                        fontSize: '13px',
                      }}>
                        {reg.entryCount}×
                      </span>
                    </td>
                    <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles['admin-pagination']}>
            <div className={styles['admin-pagination-info']}>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </div>
            <div className={styles['admin-pagination-btns']}>
              <button
                className={styles['admin-btn']}
                disabled={pagination.page <= 1}
                onClick={() => fetchRegistrations(pagination.page - 1, search)}
              >
                ← Previous
              </button>
              <button
                className={styles['admin-btn']}
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchRegistrations(pagination.page + 1, search)}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
