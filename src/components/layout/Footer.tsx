import Link from 'next/link';
import { APP_NAME, APP_DESCRIPTION, LINKS, CONTRACT } from '@/lib/constants';
import { shortenAddress } from '@/lib/utils/helpers';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                {/* Grid */}
                <div className={styles['footer-grid']}>
                    {/* Brand */}
                    <div className={styles['footer-brand']}>
                        <Link href="/" className={styles['footer-logo']}>
                            <span className={styles['footer-logo-icon']}>🥒</span>
                            <span className={styles['footer-logo-text']}>{APP_NAME}</span>
                        </Link>
                        <p className={styles['footer-description']}>
                            {APP_DESCRIPTION}
                        </p>
                        <div className={styles['footer-socials']}>
                            <a
                                href={LINKS.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['footer-social-link']}
                                aria-label="X (Twitter)"
                                id="footer-twitter"
                            >
                                𝕏
                            </a>
                            <a
                                href={LINKS.discord}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['footer-social-link']}
                                aria-label="Discord"
                                id="footer-discord"
                            >
                                💬
                            </a>
                            <a
                                href={LINKS.openSea}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['footer-social-link']}
                                aria-label="OpenSea"
                                id="footer-opensea"
                            >
                                🌊
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={styles['footer-column-title']}>Quick Links</h4>
                        <ul className={styles['footer-links']}>
                            <li>
                                <Link href="/" className={styles['footer-link']}>Home</Link>
                            </li>
                            <li>
                                <Link href="/mint" className={styles['footer-link']}>Mint</Link>
                            </li>
                            <li>
                                <a href={LINKS.openSea} target="_blank" rel="noopener noreferrer" className={styles['footer-link']}>
                                    OpenSea Collection
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className={styles['footer-column-title']}>Resources</h4>
                        <ul className={styles['footer-links']}>
                            <li>
                                <a href={LINKS.contract} target="_blank" rel="noopener noreferrer" className={styles['footer-link']}>
                                    Smart Contract
                                </a>
                            </li>
                            <li>
                                <a href={LINKS.docs} className={styles['footer-link']}>Documentation</a>
                            </li>
                            <li>
                                <a href="https://base.org" target="_blank" rel="noopener noreferrer" className={styles['footer-link']}>
                                    Base Chain
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className={styles['footer-column-title']}>Community</h4>
                        <ul className={styles['footer-links']}>
                            <li>
                                <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className={styles['footer-link']}>
                                    Discord Server
                                </a>
                            </li>
                            <li>
                                <a href={LINKS.twitter} target="_blank" rel="noopener noreferrer" className={styles['footer-link']}>
                                    Follow on X
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles['footer-bottom']}>
                    <p className={styles['footer-copyright']}>
                        © {currentYear} {APP_NAME}. All rights reserved.
                    </p>
                    <div className={styles['footer-contract']}>
                        <span>Contract:</span>
                        <a
                            href={LINKS.contract}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="footer-contract-link"
                        >
                            {shortenAddress(CONTRACT.address, 6)}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
