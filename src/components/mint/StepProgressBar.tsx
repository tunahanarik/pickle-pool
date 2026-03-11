'use client';

import { useMintContext } from '@/context/MintContext';
import { cn } from '@/lib/utils/helpers';
import styles from './MintPage.module.css';

const STEP_LABELS: Record<string, string> = {
    'x-login': 'X Login',
    'wallet-connect': 'Wallet',
    'quote-tweet': 'Tweet',
    'sorsa-score': 'Score',
    'mint': 'Mint',
    'success': 'Done',
};

export default function StepProgressBar() {
    const { state, stepOrder } = useMintContext();

    return (
        <div className={styles['progress-bar']}>
            {stepOrder.map((stepId, index) => {
                const status = state.steps[stepId];
                const isLast = index === stepOrder.length - 1;

                return (
                    <div key={stepId} className={styles['progress-step']}>
                        <div className={styles['progress-dot-wrapper']}>
                            <div
                                className={cn(
                                    styles['progress-dot'],
                                    styles[`progress-dot-${status}`]
                                )}
                            >
                                {status === 'completed' ? '✓' : index + 1}
                            </div>
                            <span
                                className={cn(
                                    styles['progress-label'],
                                    status === 'active' && styles['progress-label-active'],
                                    status === 'completed' && styles['progress-label-completed']
                                )}
                            >
                                {STEP_LABELS[stepId]}
                            </span>
                        </div>

                        {!isLast && (
                            <div
                                className={cn(
                                    styles['progress-line'],
                                    status === 'completed' && styles['progress-line-completed']
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
