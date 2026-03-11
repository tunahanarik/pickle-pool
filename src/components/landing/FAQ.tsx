'use client';

import { useState } from 'react';
import { MOCK_FAQ } from '@/lib/mock-data';
import { cn } from '@/lib/utils/helpers';
import styles from './FAQ.module.css';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faq} id="faq">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">FAQ</span>
                </h2>
                <p className="section-subtitle">
                    Frequently Asked Questions
                </p>

                <div className={styles['faq-list']}>
                    {MOCK_FAQ.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={cn(styles['faq-item'], isOpen && styles['faq-item-open'])}
                                id={`faq-item-${index}`}
                            >
                                <button
                                    className={styles['faq-question']}
                                    onClick={() => toggle(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{item.question}</span>
                                    <span className={cn(styles['faq-icon'], isOpen && styles['faq-icon-open'])}>
                                        +
                                    </span>
                                </button>
                                <div className={cn(styles['faq-answer'], isOpen && styles['faq-answer-open'])}>
                                    <p className={styles['faq-answer-content']}>{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
