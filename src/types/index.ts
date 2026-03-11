/* ═══════════════════════════════════════
 * Pickle Pool — Type Definitions
 * ═══════════════════════════════════════ */

// ── User & Auth ─────────────────────────
export interface User {
    id: string;
    twitterId: string;
    twitterHandle: string;
    twitterName: string;
    profileImage: string | null;
    walletAddress: string | null;
    sorsaScore: number | null;
    isEligible: boolean;
    mintTier: MintTier | null;
    hasMinted: boolean;
}

export type MintTier = 'free' | 'paid';

// ── Mint Steps ──────────────────────────
export type MintStepId =
    | 'x-login'
    | 'wallet-connect'
    | 'quote-tweet'
    | 'sorsa-score'
    | 'mint'
    | 'success';

export type StepStatus = 'locked' | 'active' | 'completed';

export interface MintStep {
    id: MintStepId;
    number: number;
    title: string;
    description: string;
    status: StepStatus;
}

// ── Tweet ───────────────────────────────
export interface TweetVerification {
    tweetId: string;
    tweetLink: string;
    isVerified: boolean;
    errorMessage: string | null;
}

// ── Sorsa ───────────────────────────────
export interface SorsaScoreResult {
    handle: string;
    score: number;
    tier: MintTier;
    checkedAt: string;
}

// ── Mint ────────────────────────────────
export interface MintResult {
    success: boolean;
    txHash: string | null;
    tokenId: number | null;
    openSeaUrl: string | null;
    errorMessage: string | null;
}

export interface CollectionStats {
    totalSupply: number;
    maxSupply: number;
    mintedCount: number;
    remainingCount: number;
}

// ── Eligibility ─────────────────────────
export interface EligibilityStatus {
    xConnected: boolean;
    walletConnected: boolean;
    tweetVerified: boolean;
    sorsaChecked: boolean;
    isEligible: boolean;
    mintTier: MintTier | null;
}

// ── API Responses ───────────────────────
export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    error: string | null;
}

// ── Collection / NFT ────────────────────
export interface NFTPreview {
    id: number;
    name: string;
    image: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
    traits: NFTTrait[];
}

export interface NFTTrait {
    traitType: string;
    value: string;
}

// ── Roadmap ─────────────────────────────
export interface RoadmapMilestone {
    phase: number;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    items: string[];
}

// ── FAQ ─────────────────────────────────
export interface FAQItem {
    question: string;
    answer: string;
}

// ── Team ────────────────────────────────
export interface TeamMember {
    name: string;
    role: string;
    avatar: string;
    twitter?: string;
}
