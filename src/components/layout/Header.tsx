'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils/helpers';
import styles from './Header.module.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <header
                className={cn(
                    styles.header,
                    isScrolled && styles['header-scrolled']
                )}
            >
                <div className={styles['header-inner']}>
                    {/* Logo */}
                    <Link href="/" className={styles['header-logo']}>
                        <span className={styles['header-logo-icon']}>🥒</span>
                        <span className={styles['header-logo-text']}>
                            <span>{APP_NAME}</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className={styles['header-nav']}>
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    styles['header-nav-link'],
                                    pathname === item.href && styles.active
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className={styles['header-actions']}>
                        {/* Wallet connect button placeholder - will be replaced with RainbowKit */}
                        <button className="btn btn-primary btn-sm" id="header-wallet-btn">
                            Connect Wallet
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className={styles['header-menu-toggle']}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            id="header-menu-toggle"
                        >
                            {isMobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={cn(styles['mobile-menu'], isMobileMenuOpen && styles.open)}>
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            styles['mobile-menu-link'],
                            pathname === item.href && styles.active
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
                <button className="btn btn-primary w-full" style={{ marginTop: 'var(--space-4)' }}>
                    Connect Wallet
                </button>
            </div>
        </>
    );
}
