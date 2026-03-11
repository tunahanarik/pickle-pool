'use client';

import { useState } from 'react';
import { useMintContext } from '@/context/MintContext';
import { delay } from '@/lib/utils/helpers';
import { TWEET_TEMPLATE } from '@/lib/constants';
import styles from './MintPage.module.css';

export default function StepQuoteTweet() {
    const { state, dispatch } = useMintContext();
    const [tweetLink, setTweetLink] = useState('');
    const isCompleted = state.steps['quote-tweet'] === 'completed';
    const isActive = state.steps['quote-tweet'] === 'active';

    const handleVerify = async () => {
        if (!tweetLink.trim()) {
            dispatch({ type: 'SET_ERROR', payload: 'Please enter your tweet link' });
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });

        // Mock: simulate tweet verification
        await delay(2000);

        dispatch({
            type: 'SET_TWEET',
            payload: {
                tweetId: 'mock-tweet-123',
                tweetLink: tweetLink.trim(),
                isVerified: true,
                errorMessage: null,
            },
        });

        dispatch({ type: 'COMPLETE_STEP', payload: 'quote-tweet' });
    };

    if (isCompleted && state.tweetVerification) {
        return (
            <div className={styles['step-card']} id="step-quote-tweet">
                <div className={styles['step-card-header']}>
                    <div className={styles['step-card-number']}>✓</div>
                    <div className={styles['step-card-info']}>
                        <h3>Tweet Verified</h3>
                        <p>Your quote tweet has been confirmed</p>
                    </div>
                </div>
                <div className={styles['user-info']}>
                    <div className={styles['user-avatar']}>📝</div>
                    <div className={styles['user-details']}>
                        <div className={styles['user-name']}>Quote Tweet</div>
                        <div className={styles['user-handle']} style={{ wordBreak: 'break-all' }}>
                            {state.tweetVerification.tweetLink}
                        </div>
                    </div>
                    <span className={`${styles['status-badge']} ${styles['status-badge-success']}`}>
                        Verified ✓
                    </span>
                </div>
            </div>
        );
    }

    if (!isActive) return null;

    return (
        <div className={styles['step-card']} id="step-quote-tweet">
            <div className={styles['step-card-header']}>
                <div className={styles['step-card-number']}>3</div>
                <div className={styles['step-card-info']}>
                    <h3>Quote Tweet</h3>
                    <p>Share about Pickle Pool to complete this step</p>
                </div>
            </div>
            <div className={styles['step-card-body']}>
                {/* Tweet template */}
                <div className={styles['tweet-template']}>
                    <div className={styles['tweet-template-label']}>Suggested Tweet</div>
                    {TWEET_TEMPLATE.suggestedText}
                </div>

                {/* Open Twitter / X */}
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(TWEET_TEMPLATE.suggestedText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ width: '100%', textAlign: 'center' }}
                >
                    📤 Open X to Tweet
                </a>

                {/* Paste link input */}
                <div className={styles['tweet-input-group']}>
                    <label>Paste your tweet link below:</label>
                    <input
                        type="url"
                        className={styles['tweet-input']}
                        placeholder="https://x.com/yourhandle/status/..."
                        value={tweetLink}
                        onChange={(e) => setTweetLink(e.target.value)}
                    />
                </div>

                {state.error && (
                    <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)' }}>
                        {state.error}
                    </p>
                )}

                <button
                    className="btn btn-primary btn-lg"
                    onClick={handleVerify}
                    disabled={state.isLoading || !tweetLink.trim()}
                    style={{ width: '100%' }}
                >
                    {state.isLoading ? (
                        <><span className={styles.spinner}></span> Verifying...</>
                    ) : (
                        '✅ Verify Tweet'
                    )}
                </button>
            </div>
        </div>
    );
}
