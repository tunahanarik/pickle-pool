/* ═══════════════════════════════════════
 * Pickle Pool — Utility Functions
 * ═══════════════════════════════════════ */

/**
 * Shorten a wallet address for display: 0x1234...5678
 */
export function shortenAddress(address: string, chars = 4): string {
    if (!address) return '';
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format a number with commas: 1234567 → "1,234,567"
 */
export function formatNumber(num: number): string {
    return num.toLocaleString('en-US');
}

/**
 * Format ETH value: "0.003" → "0.003 ETH"
 */
export function formatETH(value: string | number): string {
    return `${value} ETH`;
}

/**
 * Format USD value: 7 → "$7.00"
 */
export function formatUSD(value: number): string {
    return `$${value.toFixed(2)}`;
}

/**
 * Generate OpenSea URL for an NFT
 */
export function getOpenSeaUrl(contractAddress: string, tokenId: number): string {
    return `https://opensea.io/assets/base/${contractAddress}/${tokenId}`;
}

/**
 * Generate BaseScan URL for a transaction
 */
export function getBaseScanTxUrl(txHash: string): string {
    return `https://basescan.org/tx/${txHash}`;
}

/**
 * Generate BaseScan URL for a contract
 */
export function getBaseScanContractUrl(address: string): string {
    return `https://basescan.org/address/${address}`;
}

/**
 * Parse tweet ID from various tweet URL formats
 */
export function parseTweetId(url: string): string | null {
    const patterns = [
        /twitter\.com\/\w+\/status\/(\d+)/,
        /x\.com\/\w+\/status\/(\d+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

/**
 * Delay utility for async operations
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Generate a random number between min and max (inclusive)
 */
export function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if we're running on the client side
 */
export function isClient(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Class name utility - join class names, filtering out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
