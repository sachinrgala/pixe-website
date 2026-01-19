interface TrustBadgesProps {
    className?: string;
    variant?: 'light' | 'dark';
    stats?: any[];
}

// Simplified semantic badge
export default function TrustBadges({ className = '', stats = [] }: TrustBadgesProps) {
    // Semantic colors automatically switch based on Dark Mode
    const defaultBadges = [
        { icon: '🎓', label: '10,000+', sublabel: 'Students Trained' },
        { icon: '💼', label: '95%', sublabel: 'Placement Rate' },
        { icon: '🏢', label: '50+', sublabel: 'Hiring Partners' },
        { icon: '⭐', label: '4.8/5', sublabel: 'Student Rating' },
        { icon: '🔒', label: '7 Days', sublabel: 'Money Back' },
        { icon: '📜', label: 'ISO', sublabel: 'Certified' },
    ];

    const badges = stats.length > 0 ? stats : defaultBadges;

    return (
        <div className={`grid grid-cols-3 md:grid-cols-6 gap-4 ${className}`}>
            {badges.map((badge, i) => (
                <div key={i} className="bg-surface/50 dark:bg-white/5 border border-border-dark rounded-xl p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-lg font-bold text-foreground">{badge.label}</div>
                    <div className="text-xs text-muted-foreground">{badge.sublabel}</div>
                </div>
            ))}
        </div>
    );
}

// Compact version for headers
export function TrustBadgesCompact({ className = '' }: { className?: string }) {
    return (
        <div className={`flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 ${className}`}>
            <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Placement Assistance
            </span>
            <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                7-Day Money Back Guarantee
            </span>
            <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                EMI Available
            </span>
        </div>
    );
}

// Logo bar for hiring partners
export function HiringPartners({ className = '', partners = [] }: { className?: string, partners?: string[] }) {
    const defaultPartners = [
        'Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'TCS', 'Wipro', 'Cognizant'
    ];

    // Use dynamic partners if available, else default
    const displayPartners = partners.length > 0 ? partners : defaultPartners;

    return (
        <div className={className}>
            <p className="text-center text-gray-500 text-sm mb-4">Our students work at</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                {displayPartners.map((partner) => (
                    <span key={partner} className="text-lg font-bold text-gray-300 hover:text-gray-400 transition-colors">
                        {partner}
                    </span>
                ))}
            </div>
        </div>
    );
}
