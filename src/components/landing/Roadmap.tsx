import { MOCK_ROADMAP } from '@/lib/mock-data';
import { cn } from '@/lib/utils/helpers';
import styles from './Roadmap.module.css';

export default function Roadmap() {
    return (
        <section className={styles.roadmap} id="roadmap">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">Roadmap</span>
                </h2>
                <p className="section-subtitle">
                    Our journey from the first pickle to a thriving ecosystem.
                </p>

                <div className={styles['roadmap-timeline']}>
                    {MOCK_ROADMAP.map((milestone) => (
                        <div key={milestone.phase} className={styles['roadmap-item']}>
                            {/* Dot */}
                            <div
                                className={cn(
                                    styles['roadmap-dot'],
                                    styles[`roadmap-dot-${milestone.status}`]
                                )}
                            />

                            {/* Card */}
                            <div className={styles['roadmap-card']}>
                                <div className={styles['roadmap-phase']}>Phase {milestone.phase}</div>
                                <h3 className={styles['roadmap-title']}>{milestone.title}</h3>
                                <p className={styles['roadmap-description']}>{milestone.description}</p>
                                <ul className={styles['roadmap-items']}>
                                    {milestone.items.map((item) => (
                                        <li key={item} className={styles['roadmap-list-item']}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
