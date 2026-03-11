/* ═══════════════════════════════════════
 * Pickle Pool — Service Config
 * ═══════════════════════════════════════
 * Controls mock vs real mode for each service.
 * When an API key is missing, mock mode activates automatically.
 */

/**
 * Determines if mock mode is active.
 * Mock mode is active when:
 * 1. NEXT_PUBLIC_FORCE_MOCK is "true", OR
 * 2. The required env variable for that service is missing
 */
export function isMockMode(): boolean {
    return process.env.NEXT_PUBLIC_FORCE_MOCK === 'true';
}

export const SERVICE_CONFIG = {
    twitter: {
        get isMock() {
            return isMockMode() || !process.env.TWITTER_CLIENT_ID;
        },
        clientId: process.env.TWITTER_CLIENT_ID || '',
        clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
    },

    sorsa: {
        get isMock() {
            return isMockMode() || !process.env.SORSA_API_KEY;
        },
        apiKey: process.env.SORSA_API_KEY || '',
        baseUrl: 'https://api.sorsa.io/v2',
    },

    wallet: {
        get isMock() {
            return isMockMode() || !process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
        },
        walletConnectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
        alchemyKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '',
    },

    contract: {
        get isMock() {
            return isMockMode() || !process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        },
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
    },

    database: {
        get isMock() {
            return isMockMode() || !process.env.DATABASE_URL;
        },
        url: process.env.DATABASE_URL || '',
    },
} as const;

/**
 * Check which services are in mock mode (for debugging)
 */
export function getServiceStatus() {
    return {
        twitter: SERVICE_CONFIG.twitter.isMock ? '🟡 Mock' : '🟢 Live',
        sorsa: SERVICE_CONFIG.sorsa.isMock ? '🟡 Mock' : '🟢 Live',
        wallet: SERVICE_CONFIG.wallet.isMock ? '🟡 Mock' : '🟢 Live',
        contract: SERVICE_CONFIG.contract.isMock ? '🟡 Mock' : '🟢 Live',
        database: SERVICE_CONFIG.database.isMock ? '🟡 Mock' : '🟢 Live',
    };
}
