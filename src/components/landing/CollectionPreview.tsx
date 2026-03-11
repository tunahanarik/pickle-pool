import Image from 'next/image';
import { MOCK_NFTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils/helpers';
import styles from './CollectionPreview.module.css';

export default function CollectionPreview() {
    return (
        <section className={styles.collection} id="collection">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">Collection Preview</span>
                </h2>
                <p className="section-subtitle">
                    Each pickle is unique. Hand-crafted with distinct traits, outfits, and accessories.
                    Here&apos;s a sneak peek at what&apos;s in the pool.
                </p>

                <div className={styles['collection-grid']}>
                    {MOCK_NFTS.map((nft) => (
                        <div key={nft.id} className={styles['nft-card']} id={`nft-card-${nft.id}`}>
                            {/* Image */}
                            <div className={styles['nft-image-wrapper']}>
                                <Image
                                    src={nft.image}
                                    alt={nft.name}
                                    width={500}
                                    height={500}
                                    className={styles['nft-image']}
                                    priority={nft.id <= 13}
                                />
                                {/* Rarity Badge */}
                                <span
                                    className={cn(
                                        styles['nft-rarity'],
                                        styles[`rarity-${nft.rarity}`]
                                    )}
                                >
                                    {nft.rarity}
                                </span>
                            </div>

                            {/* Info */}
                            <div className={styles['nft-info']}>
                                <h3 className={styles['nft-name']}>{nft.name}</h3>
                                <div className={styles['nft-traits']}>
                                    {nft.traits.map((trait) => (
                                        <span key={trait.traitType} className={styles['nft-trait']}>
                                            {trait.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
