'use client';

import { useMintContext } from '@/context/MintContext';
import { delay } from '@/lib/utils/helpers';
import styles from './MintPage.module.css';

export default function StepXLogin() {
    const { state, dispatch } = useMintContext();
    const isCompleted = state.steps['x-login'] === 'completed';

    const handleConnect = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Mock: Simulate X OAuth login
        await delay(1500);

        dispatch({
            type: 'SET_USER',
            payload: {
                id: 'mock-user-1',
                twitterId: '1234567890',
                twitterHandle: 'pickle_lover',
                twitterName: 'Pickle Enthusiast',
                profileImage: null,
            },
        });

        dispatch({ type: 'COMPLETE_STEP', payload: 'x-login' });
    };

    if (isCompleted && state.user) {
        return (
            <div className={styles['step-card']} id="step-x-login">
                <div className={styles['step-card-header']}>
                    <div className={styles['step-card-number']}>✓</div>
                    <div className={styles['step-card-info']}>
                        <h3>X (Twitter) Connected</h3>
                        <p>Your account is linked</p>
                    </div>
                </div>
                <div className={styles['user-info']}>
                    <div className={styles['user-avatar']}>🐦</div>
                    <div className={styles['user-details']}>
                        <div className={styles['user-name']}>{state.user.twitterName}</div>
                        <div className={styles['user-handle']}>@{state.user.twitterHandle}</div>
                    </div>
                    <span className={`${styles['status-badge']} ${styles['status-badge-success']}`}>
                        Connected ✓
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['step-card']} id="step-x-login">
            <div className={styles['step-card-header']}>
                <div className={styles['step-card-number']}>1</div>
                <div className={styles['step-card-info']}>
                    <h3>Connect X (Twitter)</h3>
                    <p>Sign in with your X account to verify your identity</p>
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
                        '𝕏 Connect with X'
                    )}
                </button>
            </div>
        </div>
    );
}
