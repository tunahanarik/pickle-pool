'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './QuestWizard.module.css';

type Screen = 'landing' | 'username' | 'quests' | 'wallet' | 'loading' | 'success';

interface QuestConfig {
  follow_url: string;
  like_url: string;
  repost_url: string;
  comment_url: string;
  follow_label: string;
  follow_description: string;
  like_label: string;
  like_description: string;
  repost_label: string;
  repost_description: string;
  comment_label: string;
  comment_description: string;
  qrt_template: string;
  qrt_url: string;
}

const DEFAULT_CONFIG: QuestConfig = {
  follow_url: 'https://x.com/PicklePool',
  like_url: 'https://x.com/PicklePool/status/PLACEHOLDER',
  repost_url: 'https://x.com/PicklePool/status/PLACEHOLDER',
  comment_url: 'https://x.com/PicklePool/status/PLACEHOLDER',
  follow_label: 'Follow @PicklePool',
  follow_description: 'Turn on notifications 🔔',
  like_label: 'Like Our Post',
  like_description: 'Show some love 💚',
  repost_label: 'Repost Announcement',
  repost_description: 'Spread the word 🥒',
  comment_label: 'Comment on Post',
  comment_description: 'Drop your wallet and tag your friends 🫡',
  qrt_template: '🥒 Just registered for @PicklePool FREE NFT Quest!\n\nComplete the quests and secure your spot for the mint 🔥\n\nDon\'t miss out 👇',
  qrt_url: 'https://x.com/PicklePool/status/PLACEHOLDER',
};

export default function QuestWizard() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [username, setUsername] = useState('');
  const [evmAddress, setEvmAddress] = useState('');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [commentClicked, setCommentClicked] = useState(false);
  const [commentProofUrl, setCommentProofUrl] = useState('');
  const [config, setConfig] = useState<QuestConfig>(DEFAULT_CONFIG);

  // Fetch quest config on mount
  useEffect(() => {
    fetch('/api/quest/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setConfig(data.data as QuestConfig);
      })
      .catch(() => {});
  }, []);

  const markTaskDone = useCallback((taskId: string) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks((prev) => [...prev, taskId]);
    }
  }, [completedTasks]);

  const handleTaskClick = useCallback((taskId: string, url: string) => {
    window.open(url, '_blank');
    if (taskId === 'comment') {
      // Comment task — open proof input instead of auto-marking done
      setCommentClicked(true);
    } else {
      // Other tasks — mark as done after clicking
      setTimeout(() => markTaskDone(taskId), 1000);
    }
  }, [markTaskDone]);

  const handleCommentProofSubmit = () => {
    const url = commentProofUrl.trim();
    if (!url || (!url.includes('x.com') && !url.includes('twitter.com'))) {
      setError('Please paste a valid tweet/post link.');
      return;
    }
    setError('');
    markTaskDone('comment');
    setCommentClicked(false);
  };

  const handleUsernameSubmit = () => {
    const cleaned = username.replace(/^@/, '').trim();
    if (!cleaned || cleaned.length < 1) {
      setError('Please enter your Twitter/X username.');
      return;
    }
    setError('');
    setUsername(cleaned);
    setScreen('quests');
  };

  const handleQuestsComplete = () => {
    if (completedTasks.length < 4) {
      setError('Please complete all quests before continuing.');
      return;
    }
    setError('');
    setScreen('wallet');
  };

  const handleWalletSubmit = async () => {
    const cleaned = evmAddress.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(cleaned)) {
      setError('Please enter a valid EVM wallet address (0x...).');
      return;
    }
    setError('');
    setScreen('loading');

    try {
      const res = await fetch('/api/quest/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          twitterHandle: username,
          evmAddress: cleaned,
          completedQuests: completedTasks,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Registration failed. Please try again.');
        setScreen('wallet');
        return;
      }

      // Success!
      setTimeout(() => setScreen('success'), 2500);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setScreen('wallet');
    }
  };

  const tasks = [
    {
      id: 'follow',
      icon: '𝕏',
      iconClass: styles['quest-task-icon-follow'],
      btnClass: styles['quest-task-btn-follow'],
      btnLabel: 'Follow',
      name: config.follow_label,
      desc: config.follow_description,
      url: config.follow_url,
    },
    {
      id: 'like',
      icon: '❤️',
      iconClass: styles['quest-task-icon-like'],
      btnClass: styles['quest-task-btn-like'],
      btnLabel: 'Like',
      name: config.like_label,
      desc: config.like_description,
      url: config.like_url,
    },
    {
      id: 'repost',
      icon: '🔁',
      iconClass: styles['quest-task-icon-repost'],
      btnClass: styles['quest-task-btn-repost'],
      btnLabel: 'Repost',
      name: config.repost_label,
      desc: config.repost_description,
      url: config.repost_url,
    },
    {
      id: 'comment',
      icon: '💬',
      iconClass: styles['quest-task-icon-comment'],
      btnClass: styles['quest-task-btn-comment'],
      btnLabel: 'Comment',
      name: config.comment_label,
      desc: config.comment_description,
      url: config.comment_url,
    },
  ];

  return (
    <div className={styles['quest-page']}>
      {/* Background */}
      <div className={styles['quest-bg']} />

      {/* Top Nav */}
      <nav className={styles['quest-nav']}>
        <a href="https://x.com/PicklePool" target="_blank" rel="noopener noreferrer" className={styles['quest-nav-link']}>
          𝕏 Twitter
        </a>
      </nav>

      {/* Content */}
      <div className={styles['quest-content']}>
        {/* Logo */}
        <div className={styles['quest-logo']}>
          <Image src="/assets/collection/pickle_0006.png" alt="Pickle Pool" width={80} height={80} />
        </div>

        {/* ════════════════════════════════════ */}
        {/* LANDING SCREEN */}
        {/* ════════════════════════════════════ */}
        {screen === 'landing' && (
          <>
            <div className={styles['quest-badge']}>⭐ Free NFT Quest</div>
            <h1 className={styles['quest-landing-title']}>
              Pickle Pool<br />Free NFT Quest
            </h1>
            <p className={styles['quest-landing-desc']}>
              Complete simple quests to register for the exclusive Pickle Pool FREE NFT mint
            </p>
            <button className={styles['quest-btn-gold']} onClick={() => setScreen('username')}>
              🥒 Begin Quest
            </button>
          </>
        )}

        {/* ════════════════════════════════════ */}
        {/* STEP 1: USERNAME */}
        {/* ════════════════════════════════════ */}
        {screen === 'username' && (
          <div className={styles['quest-card']}>
            <h2 className={styles['quest-card-title']}>Enter Your 𝕏 Username</h2>
            <p className={styles['quest-card-step']}>Step 1 of 3</p>
            <div className={styles['step-dots']}>
              <div className={`${styles['step-dot']} ${styles['step-dot-active']}`} />
              <div className={styles['step-dot']} />
              <div className={styles['step-dot']} />
            </div>

            <div className={styles['quest-input-group']}>
              <label className={styles['quest-input-label']}>Twitter / X Username</label>
              <input
                type="text"
                className={styles['quest-input']}
                placeholder="@username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleUsernameSubmit()}
                autoFocus
              />
            </div>

            {error && <div className={styles['quest-error']}>{error}</div>}

            <button className={styles['quest-btn-gold']} onClick={handleUsernameSubmit}>
              Continue Quest →
            </button>
            <button className={styles['quest-back']} onClick={() => setScreen('landing')}>
              ← Back
            </button>
          </div>
        )}

        {/* ════════════════════════════════════ */}
        {/* STEP 2: QUESTS */}
        {/* ════════════════════════════════════ */}
        {screen === 'quests' && (
          <div className={styles['quest-card']}>
            <h2 className={styles['quest-card-title']}>Complete Quests</h2>
            <p className={styles['quest-card-step']}>Step 2 of 3</p>
            <div className={styles['step-dots']}>
              <div className={`${styles['step-dot']} ${styles['step-dot-done']}`} />
              <div className={`${styles['step-dot']} ${styles['step-dot-active']}`} />
              <div className={styles['step-dot']} />
            </div>

            <div className={styles['quest-task-list']}>
              {tasks.map((task) => {
                const isDone = completedTasks.includes(task.id);
                return (
                  <div key={task.id} className={styles['quest-task-wrapper']}>
                    <div className={styles['quest-task']}>
                      <div className={`${styles['quest-task-icon']} ${task.iconClass}`}>
                        {task.icon}
                      </div>
                      <div className={styles['quest-task-info']}>
                        <div className={styles['quest-task-name']}>{task.name}</div>
                        <div className={styles['quest-task-desc']}>{task.desc}</div>
                      </div>
                      {isDone ? (
                        <span className={`${styles['quest-task-btn']} ${styles['quest-task-btn-done']}`}>
                          Done ✓
                        </span>
                      ) : (
                        <button
                          className={`${styles['quest-task-btn']} ${task.btnClass}`}
                          onClick={() => handleTaskClick(task.id, task.url)}
                        >
                          {task.btnLabel}
                        </button>
                      )}
                    </div>
                    {/* Comment proof input */}
                    {task.id === 'comment' && commentClicked && !isDone && (
                      <div className={styles['quest-proof']}>
                        <label className={styles['quest-proof-label']}>Paste your comment link as proof</label>
                        <div className={styles['quest-proof-row']}>
                          <input
                            type="text"
                            className={styles['quest-input']}
                            placeholder="https://x.com/..."
                            value={commentProofUrl}
                            onChange={(e) => { setCommentProofUrl(e.target.value); setError(''); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleCommentProofSubmit()}
                          />
                          <button
                            className={`${styles['quest-task-btn']} ${styles['quest-task-btn-comment']}`}
                            onClick={handleCommentProofSubmit}
                            style={{ padding: '10px 16px', fontSize: '13px' }}
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {error && <div className={styles['quest-error']}>{error}</div>}

            <button
              className={styles['quest-btn-gold']}
              onClick={handleQuestsComplete}
              disabled={completedTasks.length < 4}
            >
              Complete & Continue →
            </button>
            <button className={styles['quest-back']} onClick={() => setScreen('username')}>
              ← Back
            </button>
          </div>
        )}

        {/* ════════════════════════════════════ */}
        {/* STEP 3: WALLET */}
        {/* ════════════════════════════════════ */}
        {screen === 'wallet' && (
          <div className={styles['quest-card']}>
            <h2 className={styles['quest-card-title']}>Enter Your Wallet</h2>
            <p className={styles['quest-card-step']}>Step 3 of 3 – Final Step!</p>
            <div className={styles['step-dots']}>
              <div className={`${styles['step-dot']} ${styles['step-dot-done']}`} />
              <div className={`${styles['step-dot']} ${styles['step-dot-done']}`} />
              <div className={`${styles['step-dot']} ${styles['step-dot-active']}`} />
            </div>

            <div className={styles['quest-input-group']}>
              <label className={styles['quest-input-label']}>EVM Wallet Address</label>
              <input
                type="text"
                className={styles['quest-input']}
                placeholder="Your EVM wallet address"
                value={evmAddress}
                onChange={(e) => { setEvmAddress(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleWalletSubmit()}
                autoFocus
              />
            </div>

            {error && <div className={styles['quest-error']}>{error}</div>}

            <button className={styles['quest-btn-gold']} onClick={handleWalletSubmit}>
              🥒 Submit Quest
            </button>
            <button className={styles['quest-back']} onClick={() => setScreen('quests')}>
              ← Back
            </button>
          </div>
        )}

        {/* ════════════════════════════════════ */}
        {/* LOADING SCREEN */}
        {/* ════════════════════════════════════ */}
        {screen === 'loading' && (
          <div className={styles['quest-card']}>
            <div className={styles['quest-loading']}>
              <div className={styles['quest-spinner']} />
              <h2 className={styles['quest-loading-title']}>Recording Your Quest</h2>
              <p className={styles['quest-loading-text']}>
                Inscribing your details in the Pickle scrolls...
              </p>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════ */}
        {/* SUCCESS SCREEN */}
        {/* ════════════════════════════════════ */}
        {screen === 'success' && (
          <div className={styles['quest-card']}>
            <div className={styles['quest-success']}>
              <span className={styles['quest-success-emoji']}>🎉</span>
              <h2 className={styles['quest-success-title']}>Quest Complete!</h2>
              <p className={styles['quest-success-text']}>
                You&apos;re registered for the Pickle Pool Free NFT mint.<br />
                Stay tuned for updates!
              </p>
              <a
                href={config.follow_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['quest-btn-gold']}
                style={{ textDecoration: 'none', display: 'flex' }}
              >
                𝕏 Follow Us for Updates
              </a>
              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(config.qrt_template)}&url=${encodeURIComponent(config.qrt_url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['quest-btn-qrt']}
                style={{ textDecoration: 'none', display: 'flex' }}
              >
                🔁 Quote Retweet to Boost Your WL Chance
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles['quest-footer']}>
        © 2026 Pickle Pool. All rights reserved.
      </div>
    </div>
  );
}
