import Link from 'next/link';
import { COLLECTION, MINT_PRICING } from '@/lib/constants';
import styles from './MintInfo.module.css';

export default function MintInfo() {
    return (
        <section className={styles['mint-info']} id="mint-info">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">Mint Info</span>
                </h2>
                <p className="section-subtitle">
                    Everything you need to know about minting your pickle.
                </p>

                <div className={styles['mint-info-card']}>
                    {/* Stats Grid */}
                    <div className={styles['mint-info-grid']}>
                        <div className={styles['info-item']}>
                            <span className={styles['info-label']}>Price</span>
                            <span className={`${styles['info-value']} ${styles['info-value-highlight']}`}>
                                Free / $7
                            </span>
                        </div>
                        <div className={styles['info-item']}>
                            <span className={styles['info-label']}>Supply</span>
                            <span className={styles['info-value']}>
                                {COLLECTION.maxSupply.toLocaleString()}
                            </span>
                        </div>
                        <div className={styles['info-item']}>
                            <span className={styles['info-label']}>Max per Wallet</span>
                            <span className={styles['info-value']}>{COLLECTION.maxPerWallet}</span>
                        </div>
                        <div className={styles['info-item']}>
                            <span className={styles['info-label']}>Blockchain</span>
                            <span className={styles['info-value']}>
                                ⟠ {COLLECTION.chain}
                            </span>
                        </div>
                    </div>

                    <hr className={styles['mint-info-divider']} />

                    {/* Price Tiers */}
                    <div className={styles['price-section']}>
                        <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>
                            Pricing Tiers
                        </h3>
                        <div className={styles['price-tiers']}>
                            <div className={`${styles['price-tier']} ${styles['price-tier-free']}`}>
                                <div className={styles['price-tier-label']}>Free Mint</div>
                                <div className={styles['price-tier-value']}>$0</div>
                                <div className={styles['price-tier-condition']}>
                                    Sorsa Score ≥ {MINT_PRICING.freeThreshold}
                                </div>
                            </div>
                            <div className={`${styles['price-tier']} ${styles['price-tier-paid']}`}>
                                <div className={styles['price-tier-label']}>Paid Mint</div>
                                <div className={styles['price-tier-value']}>${MINT_PRICING.paidPriceUSD}</div>
                                <div className={styles['price-tier-condition']}>
                                    Sorsa Score &lt; {MINT_PRICING.freeThreshold}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={styles['mint-info-cta']}>
                        <Link href="/mint" className="btn btn-primary btn-lg" id="mintinfo-cta-btn">
                            🥒 Mint Your Pickle
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
