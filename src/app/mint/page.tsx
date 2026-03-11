'use client';

import { MintProvider, useMintContext } from '@/context/MintContext';
import StepProgressBar from '@/components/mint/StepProgressBar';
import StepXLogin from '@/components/mint/StepXLogin';
import StepWalletConnect from '@/components/mint/StepWalletConnect';
import StepQuoteTweet from '@/components/mint/StepQuoteTweet';
import StepSorsaScore from '@/components/mint/StepSorsaScore';
import StepMint from '@/components/mint/StepMint';
import StepSuccess from '@/components/mint/StepSuccess';
import styles from '@/components/mint/MintPage.module.css';

function MintPageContent() {
    const { state } = useMintContext();

    return (
        <div className={styles['mint-page']}>
            <div className="container">
                {/* Page Header */}
                <div className={styles['mint-page-header']}>
                    <h1 className={styles['mint-page-title']}>
                        <span className="gradient-text">Mint Your Pickle</span>
                    </h1>
                    <p className={styles['mint-page-subtitle']}>
                        Complete all steps below to mint your unique pickle NFT
                    </p>
                </div>

                {/* Progress Bar */}
                <StepProgressBar />

                {/* Step Cards */}
                <div className={styles['step-card-container']}>
                    {/* Completed steps stay visible (collapsed) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <StepXLogin />
                        {(state.steps['wallet-connect'] !== 'locked') && <StepWalletConnect />}
                        {(state.steps['quote-tweet'] !== 'locked') && <StepQuoteTweet />}
                        {(state.steps['sorsa-score'] !== 'locked') && <StepSorsaScore />}
                        {(state.steps['mint'] !== 'locked') && <StepMint />}
                        <StepSuccess />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MintPage() {
    return (
        <MintProvider>
            <MintPageContent />
        </MintProvider>
    );
}
