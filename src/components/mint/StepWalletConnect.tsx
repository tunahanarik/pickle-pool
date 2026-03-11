'use client';

import { useMintContext } from '@/context/MintContext';
import { delay, shortenAddress } from '@/lib/utils/helpers';
import styles from './MintPage.module.css';

export default function StepWalletConnect() {
    const { state, dispatch } = useMintContext();
    const isCompleted = state.steps['wallet-connect'] === 'completed';
    const isActive = state.steps['wallet-connect'] === 'active';

    const handleConnect = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Mock: Simulate wallet connection
        await delay(1200);

        const mockAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18';
        dispatch({ type: 'SET_WALLET', payload: mockAddress });
        dispatch({ type: 'COMPLETE_STEP', payload: 'wallet-connect' });
    };

    if (isCompleted && state.user?.walletAddress) {
        return (
            <div className={styles['step-card']} id="step-wallet-connect">
                <div className={styles['step-card-header']}>
                    <div className={styles['step-card-number']}>✓</div>
                    <div className={styles['step-card-info']}>
                        <h3>Wallet Connected</h3>
                        <p>Base chain wallet linked</p>
                    </div>
                </div>
                <div className={styles['wallet-info']}>
                    <div className={styles['user-avatar']}>🦊</div>
                    <div className={styles['user-details']}>
                        <div className={styles['user-name']}>Base Network</div>
                        <div className={styles['wallet-address']}>
                            {shortenAddress(state.user.walletAddress)}
                        </div>
                    </div>
                    <span className={`${styles['status-badge']} ${styles['status-badge-success']}`}>
                        Connected ✓
                    </span>
                </div>
            </div>
        );
    }

    if (!isActive) return null;

    return (
        <div className={styles['step-card']} id="step-wallet-connect">
            <div className={styles['step-card-header']}>
                <div className={styles['step-card-number']}>2</div>
                <div className={styles['step-card-info']}>
                    <h3>Connect Wallet</h3>
                    <p>Connect your wallet to mint on Base chain</p>
                </div>
            </div>
            <div className={styles['step-card-body']}>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={handleConnect}
                    disabled={state.isLoading}
                    style={{ width: '100%' }}
                >
                    {state.isLoading ? (
                        <><span className={styles.spinner}></span> Connecting...</>
                    ) : (
                        '🦊 Connect Wallet'
                    )}
                </button>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    Supports MetaMask, Coinbase Wallet, WalletConnect & more
                </p>
            </div>
        </div>
    );
}
