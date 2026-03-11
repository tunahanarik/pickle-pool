import styles from './WhySection.module.css';

const FEATURES = [
    {
        icon: '🥒',
        title: 'Unique Pickles',
        description: 'Each of the 2,222 pickles is uniquely generated with distinct traits — fur coats, crowns, headphones, chains, and more. No two pickles are alike.',
    },
    {
        icon: '💎',
        title: 'Rarity Tiers',
        description: 'From Common to Legendary, each pickle has a rarity tier based on its combination of traits. Rare traits mean a more valuable pickle in your collection.',
    },
    {
        icon: '🏛️',
        title: 'Community First',
        description: 'Join a vibrant community of pickle enthusiasts. Holder-exclusive channels, events, giveaways, and governance rights in the Pickle DAO.',
    },
    {
        icon: '⚡',
        title: 'Built on Base',
        description: 'Powered by Base (Ethereum L2 by Coinbase). Lightning-fast transactions, near-zero gas fees, and seamless OpenSea integration. Your pickles, instantly visible.',
    },
];

export default function WhySection() {
    return (
        <section className={styles.why} id="why">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">Why Pickle Pool?</span>
                </h2>
                <p className="section-subtitle">
                    More than just JPEGs. A community, a culture, a crunch.
                </p>

                <div className={styles['why-grid']}>
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className={styles['why-card']}>
                            <div className={styles['why-icon']}>{feature.icon}</div>
                            <div className={styles['why-content']}>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
