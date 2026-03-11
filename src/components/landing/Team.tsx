import { MOCK_TEAM } from '@/lib/mock-data';
import { LINKS } from '@/lib/constants';
import styles from './Team.module.css';

export default function Team() {
    return (
        <section className={styles.team} id="team">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">The Team</span>
                </h2>
                <p className="section-subtitle">
                    The masterminds behind the brine.
                </p>

                {/* Team Cards */}
                <div className={styles['team-grid']}>
                    {MOCK_TEAM.map((member) => (
                        <div key={member.name} className={styles['team-card']}>
                            <div className={styles['team-avatar']}>{member.avatar}</div>
                            <h3 className={styles['team-name']}>{member.name}</h3>
                            <p className={styles['team-role']}>{member.role}</p>
                            {member.twitter && (
                                <a
                                    href={member.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles['team-social']}
                                    aria-label={`${member.name} on X`}
                                >
                                    𝕏
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Community CTA */}
                <div className={styles['community-cta']}>
                    <h3>Join the Pickle Community</h3>
                    <p>
                        Connect with fellow pickle enthusiasts. Get the latest updates, sneak peeks,
                        and be the first to know when minting goes live.
                    </p>
                    <div className={styles['community-buttons']}>
                        <a
                            href={LINKS.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg"
                            id="community-discord-btn"
                        >
                            💬 Join Discord
                        </a>
                        <a
                            href={LINKS.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-lg"
                            id="community-twitter-btn"
                        >
                            𝕏 Follow on X
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
