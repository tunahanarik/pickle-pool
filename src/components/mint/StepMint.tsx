'use client';

import { useMintContext } from '@/context/MintContext';
import { delay } from '@/lib/utils/helpers';
import { COLLECTION, MINT_PRICING } from '@/lib/constants';
import styles from './MintPage.module.css';

export default function StepMint() {
    const { state, dispatch } = useMintContext();
    const isCompleted = state.steps['mint'] === 'completed';
    const isActive = state.steps['mint'] === 'active';

    const isFree = state.user?.mintTier === 'free';
    const mockMintedCount = 1247;
    const supplyPercent = (mockMintedCount / COLLECTION.maxSupply) * 100;

    const handleMint = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Mock: simulate mint transaction
        await delay(3000);

        const mockTokenId = mockMintedCount + 1;
        const mockTxHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

        dispatch({
            type: 'SET_MINT_RESULT',
            payload: {
                success: true,
                txHash: mockTxHash,
                tokenId: mockTokenId,
                openSeaUrl: `https://opensea.io/assets/base/${COLLECTION.chain.toLowerCase()}/${mockTokenId}`,
                errorMessage: null,
            },
        });

        dispatch({ type: 'COMPLETE_STEP', payload: 'mint' });
    };

    if (isCompleted) return null;
    if (!isActive) return null;

    return (
        <div className={styles['step-card']} id="step-mint">
            <div className={styles['step-card-header']}>
                <div className={styles['step-card-number']}>5</div>
                <div className={styles['step-card-info']}>
                    <h3>Mint Your Pickle</h3>
                    <p>Everything is ready — time to mint!</p>
                </div>
            </div>
            <div className={styles['step-card-body']}>
                {/* Supply Counter */}
                <div className={styles['supply-counter']}>
                    <div className={styles['supply-text']}>
                        <strong>{mockMintedCount.toLocaleString()}</strong> / {COLLECTION.maxSupply.toLocaleString()} minted
                    </div>
                    <div className={styles['supply-bar']}>
                        <div className={styles['supply-bar-fill']} style={{ width: `${supplyPercent}%` }} />
                    </div>
                </div>

                {/* Mint Button */}
                <div className={styles['mint-button-area']}>
                    <button
                        className={styles['mint-big-button']}
                        onClick={handleMint}
                        disabled={state.isLoading}
                    >
                        {state.isLoading ? (
                            <><span className={styles.spinner}></span> Minting...</>
                        ) : (
                            <>
                                🥒 MINT NOW
                                <span className={styles['mint-price-tag']}>
                                    {isFree ? 'Free (+ gas)' : `$${MINT_PRICING.paidPriceUSD} (+ gas)`}
                                </span>
                            </>
                        )}
                    </button>
                </div>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    Gas fees on Base are typically less than $0.01
                </p>
            </div>
        </div>
    );
}
