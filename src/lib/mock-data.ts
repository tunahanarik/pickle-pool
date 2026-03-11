/* ═══════════════════════════════════════
 * Pickle Pool — Mock / Placeholder Data
 * ═══════════════════════════════════════
 * All placeholder data in one place.
 * When real data arrives, update here only.
 */

import type { NFTPreview, RoadmapMilestone, FAQItem, TeamMember } from '@/types';

// ── Collection Preview NFTs ─────────────
export const MOCK_NFTS: NFTPreview[] = [
    {
        id: 6,
        name: 'Pickle #0006',
        image: '/assets/collection/pickle_0006.png',
        rarity: 'Legendary',
        traits: [
            { traitType: 'Background', value: 'Coral' },
            { traitType: 'Outfit', value: 'Pink Fur Coat' },
            { traitType: 'Accessory', value: 'Diamond Headphones' },
            { traitType: 'Chain', value: 'Gold Chain' },
        ],
    },
    {
        id: 13,
        name: 'Pickle #0013',
        image: '/assets/collection/pickle_0013.png',
        rarity: 'Epic',
        traits: [
            { traitType: 'Background', value: 'Steel Blue' },
            { traitType: 'Outfit', value: 'White Fur Coat' },
            { traitType: 'Accessory', value: 'Aviator Goggles' },
            { traitType: 'Chain', value: 'Dollar Chain' },
        ],
    },
    {
        id: 17,
        name: 'Pickle #0017',
        image: '/assets/collection/pickle_0017.png',
        rarity: 'Legendary',
        traits: [
            { traitType: 'Background', value: 'Holographic Blue' },
            { traitType: 'Outfit', value: 'Rainbow Fur Coat' },
            { traitType: 'Accessory', value: 'Crown & Halo' },
            { traitType: 'Chain', value: 'Gold Chain' },
        ],
    },
    {
        id: 34,
        name: 'Pickle #0034',
        image: '/assets/collection/pickle_0034.png',
        rarity: 'Legendary',
        traits: [
            { traitType: 'Background', value: 'Dark Crimson' },
            { traitType: 'Outfit', value: 'Crimson Royal Coat' },
            { traitType: 'Accessory', value: 'Flame Crown' },
            { traitType: 'Chain', value: 'Sapphire Pendant' },
        ],
    },
    {
        id: 49,
        name: 'Pickle #0049',
        image: '/assets/collection/pickle_0049.png',
        rarity: 'Rare',
        traits: [
            { traitType: 'Background', value: 'Void Black' },
            { traitType: 'Outfit', value: 'Dark Fur Coat' },
            { traitType: 'Accessory', value: 'Neon Headphones' },
            { traitType: 'Chain', value: 'Galaxy Pendant' },
        ],
    },
    {
        id: 52,
        name: 'Pickle #0052',
        image: '/assets/collection/pickle_0052.png',
        rarity: 'Rare',
        traits: [
            { traitType: 'Background', value: 'Midnight' },
            { traitType: 'Outfit', value: 'Shadow Coat' },
            { traitType: 'Accessory', value: 'Crystal Shard' },
            { traitType: 'Chain', value: 'Silver Chain' },
        ],
    },
];

// ── Roadmap Milestones ──────────────────
export const MOCK_ROADMAP: RoadmapMilestone[] = [
    {
        phase: 1,
        title: 'The Grand Opening',
        description: 'Launch of the Pickle Pool collection and community building.',
        status: 'in-progress',
        items: [
            'Website launch & mint page live',
            'Smart contract deployment on Base',
            '2,222 unique pickles ready to mint',
            'Community Discord server opening',
        ],
    },
    {
        phase: 2,
        title: 'Community Growth',
        description: 'Building the strongest pickle community in Web3.',
        status: 'upcoming',
        items: [
            'Holder-exclusive Discord channels',
            'Community events & giveaways',
            'Collaborations with other projects',
            'Pickle Pool merch store',
        ],
    },
    {
        phase: 3,
        title: 'The Pickle Vault',
        description: 'Exclusive utility and benefits for holders.',
        status: 'upcoming',
        items: [
            'Holder rewards program',
            'Exclusive airdrops for holders',
            'Pickle DAO governance launch',
            'Real-world pickle perks',
        ],
    },
    {
        phase: 4,
        title: 'Beyond the Brine',
        description: 'Expanding the Pickle Pool universe.',
        status: 'upcoming',
        items: [
            'Animated pickle series',
            'Cross-chain expansion',
            'Pickle Pool Season 2',
            'More surprises... 🥒',
        ],
    },
];

// ── FAQ Items ───────────────────────────
export const MOCK_FAQ: FAQItem[] = [
    {
        question: 'What is Pickle Pool?',
        answer: 'Pickle Pool is a collection of 2,222 unique pickle NFTs living on the Base blockchain. Each pickle has been hand-crafted with unique traits, outfits, and accessories — from fur coats to crowns to neon headphones. Dive into the brine and become part of the crunchiest community in Web3!',
    },
    {
        question: 'How do I mint a Pickle?',
        answer: 'To mint a Pickle, you need to: 1) Connect your X (Twitter) account, 2) Connect your wallet (MetaMask, Coinbase Wallet, etc.), 3) Send a quote tweet about Pickle Pool, 4) Check your Sorsa score. If your score is 500+, you get a FREE mint! Otherwise, mint costs $7 in ETH.',
    },
    {
        question: 'What blockchain is Pickle Pool on?',
        answer: 'Pickle Pool lives on Base, an Ethereum Layer 2 built by Coinbase. Base offers fast transactions and extremely low gas fees while inheriting Ethereum\'s security. Your pickles will automatically appear on OpenSea after minting!',
    },
    {
        question: 'What is a Sorsa Score?',
        answer: 'Sorsa is a Web3 reputation scoring system. It analyzes your on-chain activity and social presence to generate a score. A score of 500 or higher qualifies you for a FREE mint. Lower scores can still mint for just $7.',
    },
    {
        question: 'How much does it cost to mint?',
        answer: 'If your Sorsa score is 500 or above — it\'s completely FREE (you only pay minimal gas fees on Base, usually less than $0.01). If your score is below 500, the mint price is $7 worth of ETH.',
    },
    {
        question: 'Where can I see my NFT after minting?',
        answer: 'After a successful mint, your Pickle will automatically appear in your wallet and on OpenSea. We\'ll provide a direct link to view your NFT on OpenSea right after minting. Base chain NFTs are indexed by OpenSea within seconds!',
    },
    {
        question: 'How many Pickles can I mint?',
        answer: 'Each wallet can mint a maximum of 1 Pickle. This ensures fair distribution across the community. One wallet, one pickle — that\'s the rule of the pool!',
    },
];

// ── Team Members ────────────────────────
export const MOCK_TEAM: TeamMember[] = [
    {
        name: 'PickleMaster',
        role: 'Founder & Artist',
        avatar: '🥒',
        twitter: '#',
    },
    {
        name: 'BrineBuilder',
        role: 'Developer',
        avatar: '🔧',
        twitter: '#',
    },
    {
        name: 'VinegarVault',
        role: 'Community Lead',
        avatar: '🫙',
        twitter: '#',
    },
];
