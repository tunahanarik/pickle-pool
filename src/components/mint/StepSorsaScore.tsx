'use client';

import { useMintContext } from '@/context/MintContext';
import { delay } from '@/lib/utils/helpers';
import { MINT_PRICING } from '@/lib/constants';
import styles from './MintPage.module.css';

export default function StepSorsaScore() {
    const { state, dispatch } = useMintContext();
    const isCompleted = state.steps['sorsa-score'] === 'completed';
    const isActive = state.steps['sorsa-score'] === 'active';

    const handleCheck = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Mock: simulate Sorsa API check with random score
        await delay(2000);

        const mockScore = Math.random() > 0.4 ? 650 + Math.floor(Math.random() * 350) : 200 + Math.floor(Math.random() * 250);

        dispatch({
            type: 'SET_SORSA',
            payload: {
                handle: state.user?.twitterHandle || 'unknown',
                score: mockScore,
                tier: mockScore >= MINT_PRICING.freeThreshold ? 'free' : 'paid',
                checkedAt: new Date().toISOString(),
            },
        });

        dispatch({ type: 'COMPLETE_STEP', payload: 'sorsa-score' });
    };

    const score = state.sorsaScore?.score ?? 0;
    const isFree = score >= MINT_PRICING.freeThreshold;
    const scorePercent = Math.min((score / 1000) * 100, 100);

    if (isCompleted && state.sorsaScore) {
        return (
            <div className={styles['step-card']} id="step-sorsa-score">
                <div className={styles['step-card-header']}>
                    <div className={styles['step-card-number']}>✓</div>
                    <div className={styles['step-card-info']}>
                        <h3>Sorsa Score Checked</h3>
                        <p>Your eligibility has been determined</p>
                    </div>
                </div>
                <div className={styles['score-display']}>
                    <div className={`${styles['score-value']} ${isFree ? styles['score-value-free'] : styles['score-value-paid']}`}>
                        {score}
                    </div>
                    <div className={styles['score-label']}>Sorsa Score</div>

                    <div className={styles['score-bar']}>
                        <div
                            className={`${styles['score-bar-fill']} ${isFree ? styles['score-bar-fill-free'] : styles['score-bar-fill-paid']}`}
                            style={{ width: `${scorePercent}%` }}
                        />
                    </div>
                    <div className={styles['score-threshold']}>
                        <span>0</span>
                        <span>Free threshold: {MINT_PRICING.freeThreshold}</span>
                        <span>1000</span>
                    </div>

                    <div style={{ marginTop: 'var(--space-4)' }}>
                        {isFree ? (
                            <span className={`${styles['status-badge']} ${styles['status-badge-success']}`} style={{ fontSize: 'var(--text-base)', padding: 'var(--space-2) var(--space-4)' }}>
                                🎉 Free Mint Eligible!
                            </span>
                        ) : (
                            <span className={`${styles['status-badge']} ${styles['status-badge-warning']}`} style={{ fontSize: 'var(--text-base)', padding: 'var(--space-2) var(--space-4)' }}>
                                💰 Paid Mint — ${MINT_PRICING.paidPriceUSD}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (!isActive) return null;

    return (
        <div className={styles['step-card']} id="step-sorsa-score">
            <div className={styles['step-card-header']}>
                <div className={styles['step-card-number']}>4</div>
                <div className={styles['step-card-info']}>
                    <h3>Check Sorsa Score</h3>
                    <p>We&apos;ll check your score to determine mint eligibility</p>
                </div>
            </div>
            <div className={styles['step-card-body']}>
                <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                    <p>Score ≥ {MINT_PRICING.freeThreshold} → <strong style={{ color: 'var(--color-success)' }}>Free Mint</strong></p>
                    <p>Score &lt; {MINT_PRICING.freeThreshold} → <strong style={{ color: 'var(--color-accent-500)' }}>Paid Mint (${MINT_PRICING.paidPriceUSD})</strong></p>
                </div>

                <button
                    className="btn btn-primary btn-lg"
                    onClick={handleCheck}
                    disabled={state.isLoading}
                    style={{ width: '100%' }}
                >
                    {state.isLoading ? (
                        <><span className={styles.spinner}></span> Checking Score...</>
                    ) : (
                        '🔍 Check My Score'
                    )}
                </button>
            </div>
        </div>
    );
}
