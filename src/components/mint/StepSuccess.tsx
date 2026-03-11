'use client';

import Link from 'next/link';
import { useMintContext } from '@/context/MintContext';
import styles from './MintPage.module.css';

export default function StepSuccess() {
    const { state } = useMintContext();
    const isCompleted = state.steps['success'] === 'completed' || state.steps['mint'] === 'completed';

    if (!isCompleted || !state.mintResult) return null;

    return (
        <div className={styles['step-card']} id="step-success">
            <div className={styles['success-screen']}>
                <span className={styles['success-emoji']}>🎉</span>
                <h2 className={styles['success-title']}>
                    You Got a Pickle!
                </h2>
                <p className={styles['success-text']}>
                    Congratulations! Your pickle #{state.mintResult.tokenId} has been minted
                    successfully on Base chain.
                </p>

                {/* TX Hash */}
                {state.mintResult.txHash && (
                    <div className={styles['tx-hash']}>
                        TX: {state.mintResult.txHash}
                    </div>
                )}

                {/* Action Links */}
                <div className={styles['success-links']} style={{ marginTop: 'var(--space-4)' }}>
                    <a
                        href={`https://opensea.io/assets/base/PLACEHOLDER/${state.mintResult.tokenId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', textAlign: 'center' }}
                    >
                        🖼️ View on OpenSea
                    </a>
                    <a
                        href={`https://basescan.org/tx/${state.mintResult.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ width: '100%', textAlign: 'center' }}
                    >
                        📋 View Transaction
                    </a>
                    <Link
                        href="/"
                        className="btn btn-secondary"
                        style={{ width: '100%', textAlign: 'center' }}
                    >
                        ← Back to Collection
                    </Link>
                </div>
            </div>
        </div>
    );
}
