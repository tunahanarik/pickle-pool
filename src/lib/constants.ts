/* ═══════════════════════════════════════
 * Pickle Pool — App Constants
 * ═══════════════════════════════════════
 * Central place for all magic numbers, 
 * URLs, and configuration values.
 */

// ── Branding ────────────────────────────
export const APP_NAME = 'Pickle Pool';
export const APP_TAGLINE = 'Dive Into the Brine. Collect Unique Pickles.';
export const APP_DESCRIPTION = 'A collection of 2,222 unique pickle NFTs on Base chain. Free mint for high Sorsa scores!';

// ── Collection ──────────────────────────
export const COLLECTION = {
    name: 'Pickle Pool',
    maxSupply: 2222,
    maxPerWallet: 1,
    chain: 'Base',
    chainId: 8453,
    standard: 'ERC-721A',
} as const;

// ── Mint Pricing ────────────────────────
export const MINT_PRICING = {
    freeThreshold: 500,        // Sorsa score >= 500 → free mint
    paidPriceUSD: 7,           // $7 for paid mint
    paidPriceETH: '0.003',     // Approximate ETH (will be dynamic later)
} as const;

// ── External Links (Placeholders) ───────
export const LINKS = {
    discord: 'https://discord.gg/PLACEHOLDER',
    twitter: 'https://x.com/PLACEHOLDER',
    openSea: 'https://opensea.io/collection/PLACEHOLDER',
    contract: 'https://basescan.org/address/PLACEHOLDER',
    docs: '#',
} as const;

// ── Contract (Placeholder) ──────────────
export const CONTRACT = {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    openSeaBaseUrl: 'https://opensea.io/assets/base',
} as const;

// ── API Endpoints ───────────────────────
export const API = {
    auth: {
        twitter: '/api/auth/twitter',
        session: '/api/auth/session',
        signout: '/api/auth/signout',
    },
    tweet: {
        submit: '/api/tweet/submit',
        status: '/api/tweet/status',
    },
    sorsa: {
        score: '/api/sorsa/score',
    },
    mint: {
        prepare: '/api/mint/prepare',
        status: '/api/mint/status',
    },
    eligibility: {
        check: '/api/eligibility/check',
    },
} as const;

// ── Sorsa ───────────────────────────────
export const SORSA = {
    baseUrl: 'https://api.sorsa.io/v2',
    cacheTTL: 24 * 60 * 60 * 1000, // 24 hours in ms
} as const;

// ── Tweet Template ──────────────────────
export const TWEET_TEMPLATE = {
    originalTweetUrl: 'https://x.com/PLACEHOLDER/status/PLACEHOLDER',
    minExtraChars: 50,
    suggestedText: '🥒 I\'m joining the Pickle Pool! Unique pickle NFTs on Base chain. Dive into the brine! #PicklePool #NFT #Base',
} as const;

// ── Navigation ──────────────────────────
export const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Mint', href: '/mint' },
] as const;

// ── Breakpoints ─────────────────────────
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
} as const;
