'use client';

import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { MintStepId, StepStatus, User, TweetVerification, SorsaScoreResult, MintResult, MintTier } from '@/types';

// ── State ────────────────────────────────
export interface MintState {
    currentStep: MintStepId;
    steps: Record<MintStepId, StepStatus>;
    user: Partial<User> | null;
    tweetVerification: TweetVerification | null;
    sorsaScore: SorsaScoreResult | null;
    mintResult: MintResult | null;
    isLoading: boolean;
    error: string | null;
}

const STEP_ORDER: MintStepId[] = [
    'x-login',
    'wallet-connect',
    'quote-tweet',
    'sorsa-score',
    'mint',
    'success',
];

const initialState: MintState = {
    currentStep: 'x-login',
    steps: {
        'x-login': 'active',
        'wallet-connect': 'locked',
        'quote-tweet': 'locked',
        'sorsa-score': 'locked',
        'mint': 'locked',
        'success': 'locked',
    },
    user: null,
    tweetVerification: null,
    sorsaScore: null,
    mintResult: null,
    isLoading: false,
    error: null,
};

// ── Actions ──────────────────────────────
type MintAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'COMPLETE_STEP'; payload: MintStepId }
    | { type: 'SET_USER'; payload: Partial<User> }
    | { type: 'SET_WALLET'; payload: string }
    | { type: 'SET_TWEET'; payload: TweetVerification }
    | { type: 'SET_SORSA'; payload: SorsaScoreResult }
    | { type: 'SET_MINT_RESULT'; payload: MintResult }
    | { type: 'RESET' };

function getNextStep(currentStep: MintStepId): MintStepId | null {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
        return STEP_ORDER[currentIndex + 1];
    }
    return null;
}

function mintReducer(state: MintState, action: MintAction): MintState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload, error: null };

        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };

        case 'COMPLETE_STEP': {
            const nextStep = getNextStep(action.payload);
            const newSteps = { ...state.steps, [action.payload]: 'completed' as StepStatus };
            if (nextStep) {
                newSteps[nextStep] = 'active';
            }
            return {
                ...state,
                steps: newSteps,
                currentStep: nextStep || action.payload,
                isLoading: false,
                error: null,
            };
        }

        case 'SET_USER':
            return { ...state, user: { ...state.user, ...action.payload } };

        case 'SET_WALLET':
            return {
                ...state,
                user: { ...state.user, walletAddress: action.payload },
            };

        case 'SET_TWEET':
            return { ...state, tweetVerification: action.payload };

        case 'SET_SORSA': {
            const tier: MintTier = action.payload.score >= 500 ? 'free' : 'paid';
            return {
                ...state,
                sorsaScore: action.payload,
                user: { ...state.user, sorsaScore: action.payload.score, mintTier: tier },
            };
        }

        case 'SET_MINT_RESULT':
            return { ...state, mintResult: action.payload };

        case 'RESET':
            return initialState;

        default:
            return state;
    }
}

// ── Context ──────────────────────────────
interface MintContextValue {
    state: MintState;
    dispatch: React.Dispatch<MintAction>;
    stepOrder: typeof STEP_ORDER;
}

const MintContext = createContext<MintContextValue | null>(null);

export function MintProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(mintReducer, initialState);

    return (
        <MintContext.Provider value={{ state, dispatch, stepOrder: STEP_ORDER }}>
            {children}
        </MintContext.Provider>
    );
}

export function useMintContext() {
    const ctx = useContext(MintContext);
    if (!ctx) throw new Error('useMintContext must be used within MintProvider');
    return ctx;
}
