"use client";

import { useEffect, useState, useRef } from "react";
import {
    LayoutDashboard,
    Globe,
    Lock,
    Share2,
    MessageSquare,
    Save,
    CheckCircle,
    AlertCircle,
    Loader2,
    Settings as SettingsIcon,
    Activity,
    Database,
    Check,
    Plug,
    RefreshCw,
    Trash2,
    Smartphone,
    Plus
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface Settings {
    siteTitle: string;
    siteDescription: string;
    contactEmail: string;
    seoKeywords: string;
    enableRegistration: boolean;
    enableEmailLogin: boolean;
    enableSAML: boolean;
    enableGoogleOAuth: boolean;
    enableWhatsApp: boolean;
    // Database Mode
    enableDevelopmentMode: boolean;
    enableCRM: boolean;
    maintenanceMode: boolean;
    phoneNumber: string;
    promoMessage: string;
    promoLink: string;
    webhookUrl: string;
    googleTagManagerId: string;
    metaPhoneID: string;
    metaToken: string;
    metaTemplate: string;
    metaVerifyToken: string;
    metaVersion: string;
    samlIdpMetadataUrl: string;
    samlSpEntityId: string;
    samlSpAcsUrl: string;
    googleClientId: string;
    googleClientSecret: string;
    googleRedirectUrl: string;
    // Database - Nile
    enableNileDB: boolean;
    nileUsername: string;
    nilePassword: string;
    nileConnectionURL: string;
    nileWorkspace: string;
    nileDatabaseName: string;
    nileDefaultRegion: string;
    nileAPIURL: string;
    nilePostgresURL: string;
    // Database - Aiven
    enableAivenDB: boolean;
    aivenServiceURL: string;
    aivenDatabaseName: string;
    aivenHost: string;
    aivenPort: string;
    aivenUser: string;
    aivenPassword: string;
    aivenCACertificate: string;
    aivenConnectionLimit: string;
    // TOTP 2FA
    enableTOTP: boolean;
    // Page Tickers
    pageTickers?: Record<string, { text: string; color: string; icon: string }>;
    globalTicker?: { text: string; color: string; icon: string };
    // Marketing Settings
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    whatsappResponseTime: string;
    enableWhatsAppWidget: boolean;
    enableFloatingCTA: boolean;
    floatingCTAText: string;
    floatingCTALink: string;
    supportHoursWeekday: string;
    supportHoursWeekend: string;
    counselorName: string;
    counselorTitle: string;
    counselorPhone: string;
    counselorEmail: string;
    callbackFormTitle: string;
    callbackFormSubtitle: string;
    enableExitIntent: boolean;
    pageExitIntents?: Record<string, { title: string; message: string }>;
    pageMessages?: Record<string, string>;
}

interface SyncEntity {
    count: number;
    lastUpdated: string;
    realtime?: boolean;
}

// Core Settings - Row 1
const SECTIONS_CORE = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'saml', label: 'SAML SSO', icon: Globe },
    { id: 'google', label: 'Google OAuth', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: MessageSquare },
];

// Marketing & Engagement - Row 2
const SECTIONS_MARKETING = [
    { id: 'tickers', label: 'Tickers', icon: Smartphone },
    { id: 'marketing', label: 'Marketing', icon: Activity },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'exitintent', label: 'Exit Intent', icon: AlertCircle },
];

const SECTIONS = [...SECTIONS_CORE, ...SECTIONS_MARKETING];

// Reusable Toggle Component with consistent styling
const SettingsToggle = ({
    name,
    checked,
    onChange,
    color = 'green'
}: {
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    color?: 'green' | 'blue' | 'red' | 'purple' | 'orange';
}) => {
    const activeColors: Record<string, string> = {
        green: 'bg-emerald-500',
        blue: 'bg-blue-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500',
        orange: 'bg-orange-500',
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                name={name}
                checked={checked || false}
                onChange={onChange}
                className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${checked ? activeColors[color] : 'bg-gray-600'}`}>
                <div className={`absolute top-[2px] left-[2px] bg-white border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 shadow-sm ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </label>
    );
};

// Security Settings Component with inline TOTP setup
function SecuritySettings({
    settings,
    setSettings,
    setMessage
}: {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    setMessage: React.Dispatch<React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>>;
}) {
    const [setupStage, setSetupStage] = useState<'idle' | 'setup' | 'verify'>('idle');
    const [totpSecret, setTotpSecret] = useState('');
    const [totpUrl, setTotpUrl] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [disableCode, setDisableCode] = useState('');
    const [showDisable, setShowDisable] = useState(false);

    const startSetup = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/totp/setup', { credentials: 'include' });
            const data = await res.json();
            if (res.ok) {
                setTotpSecret(data.secret);
                setTotpUrl(data.qrCodeUrl);
                setSetupStage('setup');
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to setup TOTP' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Network error' });
        }
        setIsLoading(false);
    };

    const verifyAndEnable = async () => {
        if (verifyCode.length !== 6) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/totp/enable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ code: verifyCode })
            });
            const data = await res.json();
            if (res.ok) {
                setSettings(prev => ({ ...prev, enableTOTP: true }));
                setMessage({ type: 'success', text: '2FA enabled successfully!' });
                setSetupStage('idle');
                setVerifyCode('');
                setTotpSecret('');
                setTotpUrl('');
            } else {
                setMessage({ type: 'error', text: data.error || 'Invalid code' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Network error' });
        }
        setIsLoading(false);
    };

    const disableTOTP = async () => {
        if (disableCode.length !== 6) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/totp/disable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ code: disableCode })
            });
            const data = await res.json();
            if (res.ok) {
                setSettings(prev => ({ ...prev, enableTOTP: false }));
                setMessage({ type: 'success', text: '2FA disabled successfully' });
                setShowDisable(false);
                setDisableCode('');
            } else {
                setMessage({ type: 'error', text: data.error || 'Invalid code' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Network error' });
        }
        setIsLoading(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300 w-full">
            <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-5 border-b border-gray-700 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-medium">Two-Factor Authentication (TOTP)</h3>
                        <p className="text-xs text-gray-400">Use Google Authenticator, Authy, or any TOTP app</p>
                    </div>
                </div>

                <div className="p-5">
                    {/* 2FA is Enabled */}
                    {settings.enableTOTP && setupStage === 'idle' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <Smartphone className="w-6 h-6 text-green-400" />
                                <div className="flex-1">
                                    <span className="text-green-400 font-medium block">2FA is Active</span>
                                    <span className="text-xs text-gray-400">Your account is protected with authenticator app</span>
                                </div>
                                <Check className="w-5 h-5 text-green-400" />
                            </div>

                            {!showDisable ? (
                                <button
                                    onClick={() => setShowDisable(true)}
                                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Remove 2FA
                                </button>
                            ) : (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg space-y-3">
                                    <p className="text-sm text-gray-300">Enter your current authenticator code to disable 2FA:</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={disableCode}
                                            onChange={(e) => setDisableCode(e.target.value.replace(/[^0-9]/g, ''))}
                                            className="flex-1 bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white text-center text-lg tracking-widest focus:border-red-500 focus:outline-none"
                                            placeholder="000000"
                                        />
                                        <button
                                            onClick={disableTOTP}
                                            disabled={isLoading || disableCode.length !== 6}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            {isLoading ? 'Removing...' : 'Remove'}
                                        </button>
                                        <button
                                            onClick={() => { setShowDisable(false); setDisableCode(''); }}
                                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Setup Stage - Show QR Code */}
                    {setupStage === 'setup' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h4 className="text-white font-medium mb-2">Scan QR Code</h4>
                                <p className="text-gray-400 text-sm mb-4">Open your authenticator app and scan this QR code</p>
                                <div className="inline-block p-4 bg-white rounded-xl">
                                    <QRCodeSVG value={totpUrl} size={180} level="H" />
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-500 text-xs mb-2">Or enter this code manually:</p>
                                <code className="block bg-[#111] px-4 py-2 rounded-lg text-blue-400 font-mono text-sm break-all">
                                    {totpSecret}
                                </code>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSetupStage('verify')}
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                                >
                                    Continue to Verify
                                </button>
                                <button
                                    onClick={() => { setSetupStage('idle'); setTotpSecret(''); setTotpUrl(''); }}
                                    className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Verify Stage - Enter Code */}
                    {setupStage === 'verify' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h4 className="text-white font-medium mb-2">Enter Verification Code</h4>
                                <p className="text-gray-400 text-sm">Enter the 6-digit code from your authenticator app</p>
                            </div>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={verifyCode}
                                onChange={(e) => setVerifyCode(e.target.value.replace(/[^0-9]/g, ''))}
                                className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-4 text-white text-center text-3xl tracking-[0.5em] focus:border-blue-500 focus:outline-none"
                                placeholder="000000"
                                autoFocus
                            />

                            <div className="flex gap-2">
                                <button
                                    onClick={verifyAndEnable}
                                    disabled={isLoading || verifyCode.length !== 6}
                                    className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Verifying...' : 'Enable 2FA'}
                                </button>
                                <button
                                    onClick={() => setSetupStage('setup')}
                                    className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Idle - Not Enabled */}
                    {!settings.enableTOTP && setupStage === 'idle' && (
                        <div className="space-y-4">
                            <p className="text-gray-400 text-sm">
                                Add an extra layer of security to your account by requiring a verification code from your authenticator app.
                            </p>
                            <button
                                onClick={startSetup}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                Set Up 2FA
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        siteTitle: "",
        siteDescription: "",
        contactEmail: "",
        seoKeywords: "",
        enableRegistration: false,
        enableEmailLogin: true,
        enableSAML: false,
        enableGoogleOAuth: false,
        enableWhatsApp: false,
        enableCRM: false,
        maintenanceMode: false,
        enableDevelopmentMode: false, // Legacy
        phoneNumber: "",
        promoMessage: "",
        promoLink: "",
        webhookUrl: "",
        googleTagManagerId: "",
        metaPhoneID: "",
        metaToken: "",
        metaTemplate: "",
        metaVerifyToken: "",
        metaVersion: "v24.0",
        samlIdpMetadataUrl: "",
        samlSpEntityId: "",
        samlSpAcsUrl: "",
        googleClientId: "",
        googleClientSecret: "",
        googleRedirectUrl: "",
        // Nile
        enableNileDB: false,
        nileUsername: "",
        nilePassword: "",
        nileConnectionURL: "",
        nileWorkspace: "",
        nileDatabaseName: "",
        nileDefaultRegion: "us-west-2",
        nileAPIURL: "",
        nilePostgresURL: "",
        // Aiven
        enableAivenDB: false,
        aivenServiceURL: "",
        aivenDatabaseName: "",
        aivenHost: "",
        aivenPort: "",
        aivenUser: "",
        aivenPassword: "",
        aivenCACertificate: "",
        aivenConnectionLimit: "5",
        // TOTP
        enableTOTP: false,
        // Tickers
        pageTickers: {},
        // Marketing Settings
        whatsappNumber: "",
        whatsappDefaultMessage: "",
        whatsappResponseTime: "Replies in < 5 mins",
        enableWhatsAppWidget: true,
        enableFloatingCTA: true,
        floatingCTAText: "",
        floatingCTALink: "",
        supportHoursWeekday: "9:00 AM - 7:00 PM",
        supportHoursWeekend: "10:00 AM - 2:00 PM",
        counselorName: "",
        counselorTitle: "",
        counselorPhone: "",
        counselorEmail: "",
        callbackFormTitle: "Talk to a Counselor",
        callbackFormSubtitle: "Get personalized guidance",
        enableExitIntent: true,
        pageExitIntents: {
            "/": { title: "Wait! Before you go...", message: "Get a FREE career counseling session worth ₹2,000!" },
            "/about": { title: "Learn more about us!", message: "Talk to our team and discover your learning path" },
            "/courses/advanced-digital-marketing": { title: "Don't miss out!", message: "Get ₹5,000 OFF on enrollment this week only!" },
            "/courses/seo-course": { title: "SEO Mastery awaits!", message: "Download our FREE SEO Checklist before you leave" },
            "/courses/social-media-marketing": { title: "Go viral with us!", message: "Get a FREE Social Media Audit for your brand" },
            "/pricing": { title: "Looking for discounts?", message: "Talk to our counselor for exclusive scholarship options!" },
            "/career": { title: "Ready to transform?", message: "See how our alumni are earning ₹8+ LPA in digital marketing" },
            "/career/hire-talent": { title: "Need top talent?", message: "Get matched with pre-vetted candidates in 48 hours" },
            "/internships": { title: "Kickstart your career!", message: "Limited spots available - Apply for internship today!" },
            "/scholarships": { title: "Financial aid available!", message: "Check if you qualify for up to 100% scholarship" },
            "/faq": { title: "Still have questions?", message: "Get instant answers from our counselor on WhatsApp" },
            "/contact": { title: "We're here to help!", message: "Schedule a FREE callback at your convenience" },
            "/corporate-training": { title: "Upskill your team!", message: "Get a customized training proposal for your organization" },
            "/free-counseling": { title: "Almost there!", message: "Complete your booking for FREE career guidance" },
            "/events": { title: "Don't miss out!", message: "Register for our upcoming FREE masterclass" },
            "/blog": { title: "Stay updated!", message: "Subscribe to get weekly digital marketing tips" }
        },
        pageMessages: {
            "/": "Hi! I'm interested in learning digital marketing. Can you help me get started?",
            "/about": "Hi! I'd like to know more about Pixe Education and your programs.",
            "/courses/advanced-digital-marketing": "Hi! I'm interested in the Advanced Digital Marketing course. Can you share more details?",
            "/courses/seo-course": "Hi! I want to learn SEO. Can you tell me about the SEO course?",
            "/courses/social-media-marketing": "Hi! I'm interested in the Social Media Marketing course. Please share details.",
            "/pricing": "Hi! I'm looking at your pricing page. Can you help me with fee details and EMI options?",
            "/career": "Hi! I'm interested in career opportunities after the course. What's the placement support?",
            "/career/hire-talent": "Hi! We're looking to hire digital marketing talent. Can you connect us with candidates?",
            "/internships": "Hi! I'm interested in the internship program. How can I apply?",
            "/scholarships": "Hi! I want to check my scholarship eligibility. Can you help?",
            "/faq": "Hi! I have some questions about the course. Can you help?",
            "/contact": "Hi! I'd like to speak with someone about your courses.",
            "/corporate-training": "Hi! We're interested in corporate training for our team. Can you share a proposal?",
            "/free-counseling": "Hi! I'd like to book a free counseling session.",
            "/events": "Hi! I'm interested in your upcoming events and masterclasses.",
            "/blog": "Hi! I found your blog helpful. I'd like to learn more about your courses."
        },
    });

    const [activeSection, setActiveSection] = useState('general');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [retryCount, setRetryCount] = useState(0);
    const [showRetry, setShowRetry] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const fetchAllData = async () => {
        setIsLoading(true);
        setShowRetry(false);
        setMessage(null);

        // Clear any existing timer
        if (timerRef.current) clearTimeout(timerRef.current);

        // Start safety timer (8 seconds)
        timerRef.current = setTimeout(() => {
            setMessage({ type: 'error', text: 'Connection timed out (8s)' });
            setShowRetry(true);
            setIsLoading(false);
        }, 8000);

        try {
            const res = await fetch("/api/admin/settings", {
                headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
                cache: 'no-store',
                credentials: 'include'  // CRITICAL: Include auth cookies
            });

            // Clear timer immediately after response
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server ${res.status}: ${errorText.slice(0, 100)}`);
            }

            const data = await res.json();
            // Merge with defaults - preserve pre-configured values if API returns empty
            setSettings(prev => ({
                ...prev,
                ...data,
                // Keep defaults if API returns empty objects
                pageExitIntents: Object.keys(data.pageExitIntents || {}).length > 0 ? data.pageExitIntents : prev.pageExitIntents,
                pageMessages: Object.keys(data.pageMessages || {}).length > 0 ? data.pageMessages : prev.pageMessages,
            }));
            setIsLoading(false);
        } catch (err: any) {
            // Clear timer if still running
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            console.error("Settings fetch error:", err);
            setMessage({ type: 'error', text: err.message || 'Unknown error' });
            setShowRetry(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [retryCount]);

    // POLLING: Check Database Connectivity
    const [dbStatus, setDbStatus] = useState<'connected' | 'disconnected'>('disconnected');
    useEffect(() => {
        const fetchStatus = () => {
            fetch('/api/health', { credentials: 'include' })
                .then(res => res.ok ? res.json() : Promise.reject('Not OK'))
                .then(data => {
                    if (data.db_status) setDbStatus(data.db_status);
                })
                .catch(() => setDbStatus('disconnected'));
        };

        // Fetch immediately on mount
        fetchStatus();

        // Then poll every 5 seconds
        const poll = setInterval(fetchStatus, 5000);
        return () => clearInterval(poll);
    }, []);

    const [syncStatus, setSyncStatus] = useState<Record<string, SyncEntity>>({});
    const [syncLoading, setSyncLoading] = useState(false);

    const fetchSyncStatus = async () => {
        try {
            const res = await fetch('/api/admin/sync-status', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setSyncStatus(data);
            }
        } catch (e) {
            console.error('Failed to fetch sync status:', e);
        }
    };

    // Poll sync status - leads every 5s, others every 30s
    useEffect(() => {
        fetchSyncStatus();
        const poll = setInterval(fetchSyncStatus, 30000);
        return () => clearInterval(poll);
    }, []);

    const handleRefreshAll = async () => {
        setSyncLoading(true);
        try {
            // 1. Sync Memory -> DB
            const syncRes = await fetch('/api/admin/sync-data', { method: 'POST', credentials: 'include' });
            if (!syncRes.ok) {
                setMessage({ type: 'error', text: 'Sync failed. Check console.' });
            }
            // 2. Refresh Counts
            await fetchSyncStatus();
            setMessage({ type: 'success', text: 'Data synced successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Sync failed. Check console.' });
        } finally {
            setSyncLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setSettings(prev => ({ ...prev, [name]: val }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Settings saved successfully!' });
                setTimeout(() => setMessage(null), 3000);
            } else {
                const errorData = await res.json().catch(() => ({}));
                setMessage({ type: 'error', text: `Failed: ${errorData.error || res.statusText}` });
            }
        } catch (err: any) {
            console.error(err);
            setMessage({ type: 'error', text: `Error: ${err.message}` });
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateSetting = (key: keyof Settings, value: any) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Auto-save disconnection
    const handleDisconnect = async () => {
        if (!confirm("Are you sure you want to disconnect? This will disable all database features.")) return;

        const newSettings = {
            ...settings,
            enableNileDB: false,
            enableAivenDB: false
        };
        setSettings(newSettings);

        // Auto-save disconnection
        try {
            await fetch("/api/admin/settings", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSettings)
            });
            setMessage({ type: 'success', text: 'Database Disconnected' });
            setTimeout(() => setMessage(null), 3000);
            setDbStatus('disconnected'); // Optimistic update
        } catch (e) {
            setMessage({ type: 'error', text: 'Failed to disconnect' });
        }
    };

    const handleConnect = async (provider: 'nile' | 'aiven') => {
        const newSettings = {
            ...settings,
            enableNileDB: provider === 'nile',
            enableAivenDB: provider === 'aiven'
        };
        setSettings(newSettings);

        // Auto-save connection
        try {
            await fetch("/api/admin/settings", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSettings)
            });
            setMessage({ type: 'success', text: `Connecting to ${provider === 'nile' ? 'Nile' : 'Aiven'} Database...` });
            setTimeout(() => setMessage(null), 3000);

            // Allow time for backend to reconnect before polling updates status
            setTimeout(() => setDbStatus('connected'), 1500);
        } catch (e) {
            setMessage({ type: 'error', text: 'Failed to connect' });
        }
    };

    const [testingConnection, setTestingConnection] = useState<'nile' | 'aiven' | null>(null);
    const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
    const [exporting, setExporting] = useState(false);

    const handleExportBackup = async () => {
        setExporting(true);
        const modules = [
            { name: "Courses", endpoint: "/api/courses" },
            { name: "Pages", endpoint: "/api/pages" },
            { name: "Users", endpoint: "/api/users" },
            { name: "Posts", endpoint: "/api/posts" },
            { name: "Events", endpoint: "/api/events" },
            { name: "Leads", endpoint: "/api/leads" },
            { name: "Settings", endpoint: "/api/settings" },
        ];

        const fullBackup: Record<string, any> = {};

        for (const mod of modules) {
            try {
                const res = await fetch(mod.endpoint, { credentials: 'include' });
                if (res.ok) {
                    fullBackup[mod.name] = await res.json();
                }
            } catch (e) {
                console.error(`Failed to backup ${mod.name}`);
            }
        }

        const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `pixe-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setExporting(false);
    };

    const handleTestConnection = async (provider: 'nile' | 'aiven', e: React.MouseEvent) => {
        e.preventDefault();
        setTestingConnection(provider);
        setTestResult(null);

        let payload;
        if (provider === 'nile') {
            payload = {
                provider: 'nile',
                username: settings.nileUsername,
                password: settings.nilePassword,
                connectionUrl: settings.nileConnectionURL,
                workspace: settings.nileWorkspace,
                databaseName: settings.nileDatabaseName,
                defaultRegion: settings.nileDefaultRegion,
                apiUrl: settings.nileAPIURL,
                postgresUrl: settings.nilePostgresURL
            };
        } else {
            payload = {
                provider: 'aiven',
                serviceUrl: settings.aivenServiceURL,
                databaseName: settings.aivenDatabaseName,
                host: settings.aivenHost,
                port: settings.aivenPort,
                user: settings.aivenUser,
                password: settings.aivenPassword,
                caCertificate: settings.aivenCACertificate,
                connectionLimit: settings.aivenConnectionLimit
            };
        }

        try {
            const res = await fetch('/api/database/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (res.ok) {
                setTestResult({ success: true, message: data.message });
            } else {
                setTestResult({ success: false, message: data.error || 'Connection failed' });
            }
        } catch (err) {
            setTestResult({ success: false, message: 'Network error connecting to backend.' });
        } finally {
            setTestingConnection(null);
        }
    };

    if (isLoading || showRetry) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400 gap-4">
                {!showRetry ? (
                    <>
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p>Loading configuration...</p>
                    </>
                ) : (
                    <>
                        <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                        <h3 className="text-white font-medium text-lg">Connection Issue</h3>
                        <p className="max-w-md text-center text-sm mb-4 text-red-400">
                            {message ? message.text : "Backend is taking too long to respond."}
                        </p>
                        <button
                            onClick={() => setRetryCount(c => c + 1)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                        >
                            Retry Connection
                        </button>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col p-0 relative">
            {message && (
                <div className={`fixed bottom-6 right-6 z-[100] p-4 rounded-xl flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-5 border backdrop-blur-md ${message.type === 'success'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            <div className="sticky top-0 z-10 bg-[#1a1d21]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1d21]/60 flex justify-between items-center p-4 border-b border-gray-800">
                <div>
                    <h1 className="text-xl font-bold text-white leading-none">Settings</h1>
                    <p className="text-xs text-gray-500 mt-1">Application configuration</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="flex-1 flex flex-col bg-[#1a1d21]">
                {/* Horizontal Tabs - Two Rows with Modern Design */}
                <div className="sticky top-[61px] z-10 bg-gradient-to-b from-[#16181b] to-[#1a1d21] px-4 py-3 border-b border-gray-800/50">
                    <div className="flex flex-col gap-3">
                        {/* Row 1: Core Settings */}
                        <div className="flex items-center">
                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 rounded-l-lg border-l-2 border-blue-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                <span className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold">Core</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-[#111318]/50 rounded-r-lg flex-1">
                                {SECTIONS_CORE.map((section) => {
                                    const Icon = section.icon;
                                    const isActive = activeSection === section.id;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-500/20'
                                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                                }`}
                                        >
                                            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : ''}`} />
                                            <span>{section.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Row 2: Marketing & Engagement */}
                        <div className="flex items-center">
                            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 rounded-l-lg border-l-2 border-emerald-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">Engage</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-[#111318]/50 rounded-r-lg flex-1">
                                {SECTIONS_MARKETING.map((section) => {
                                    const Icon = section.icon;
                                    const isActive = activeSection === section.id;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/20 text-emerald-300 shadow-lg shadow-emerald-500/10 border border-emerald-500/20'
                                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                                }`}
                                        >
                                            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : ''}`} />
                                            <span>{section.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <main className="flex-1 p-4 relative bg-[#1a1d21]">
                    <form onSubmit={handleSave} className="w-full space-y-6">

                        {/* GENERAL SETTINGS */}
                        {activeSection === 'general' && (
                            <div className="space-y-4 animate-in fade-in duration-300 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Site Title</label>
                                        <input type="text" name="siteTitle" value={settings.siteTitle} onChange={handleChange}
                                            className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Contact Email</label>
                                        <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange}
                                            className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Site Description</label>
                                    <textarea name="siteDescription" value={settings.siteDescription} onChange={handleChange} rows={2}
                                        className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm" />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between p-4 bg-[#111] border border-gray-700 rounded-lg w-fit min-w-[300px]">
                                        <div className="mr-6">
                                            <div className="font-medium text-white text-sm">Maintenance Mode</div>
                                            <div className="text-xs text-gray-500">Temporarily disable public access</div>
                                        </div>
                                        <SettingsToggle name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} color="orange" />
                                    </div>
                                </div>

                                {/* Login Methods Section */}
                                <div className="border-t border-gray-700 pt-4 mt-4">
                                    <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">Login Methods</h4>
                                    <div className="flex items-center justify-between p-4 bg-[#111] border border-gray-700 rounded-lg w-fit min-w-[300px]">
                                        <div className="mr-6">
                                            <div className="font-medium text-white text-sm">Enable Email + Password Login</div>
                                            <div className="text-xs text-gray-500">Allow users to login with email and password</div>
                                        </div>
                                        <SettingsToggle name="enableEmailLogin" checked={settings.enableEmailLogin} onChange={handleChange} color="blue" />
                                    </div>
                                </div>

                                {/* Database Mode Card */}
                                <div className="border-t border-gray-700 pt-4 mt-4">
                                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                                    <Database className="w-5 h-5 text-purple-400" />
                                                    Database Mode
                                                </h3>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    Configure how data is synchronized with the cloud database.
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-gray-950 p-1 rounded-lg border border-gray-800">
                                                <button
                                                    onClick={() => handleUpdateSetting('enableDevelopmentMode', false)}
                                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${!settings.enableDevelopmentMode ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-gray-300'}`}
                                                >
                                                    Development Mode
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateSetting('enableDevelopmentMode', true)}
                                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${settings.enableDevelopmentMode ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-300'}`}
                                                >
                                                    Production Mode
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className={`p-4 rounded-lg border ${!settings.enableDevelopmentMode ? 'border-green-500/30 bg-green-500/5' : 'border-gray-800 bg-gray-950/50 opacity-50'}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`w-2 h-2 rounded-full ${!settings.enableDevelopmentMode ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                                                    <h4 className="font-medium text-white">Development Mode (Default)</h4>
                                                </div>
                                                <p className="text-sm text-gray-400">
                                                    Safe sandbox. Data is stored in memory. Use "Refresh All" to commit changes to the database manually.
                                                </p>
                                            </div>
                                            <div className={`p-4 rounded-lg border ${settings.enableDevelopmentMode ? 'border-purple-500/30 bg-purple-500/5' : 'border-gray-800 bg-gray-950/50 opacity-50'}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`w-2 h-2 rounded-full ${settings.enableDevelopmentMode ? 'bg-purple-500' : 'bg-gray-600'}`}></div>
                                                    <h4 className="font-medium text-white">Production Mode</h4>
                                                </div>
                                                <p className="text-sm text-gray-400">
                                                    Live environment. All changes are immediately written to the database. Use with caution.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Data Sync Status */}
                                <div className="border-t border-gray-700 pt-4 mt-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            📊 Data Sync Status
                                            {dbStatus === 'connected' && (
                                                <span className="text-[10px] bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full">Live</span>
                                            )}
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={handleRefreshAll}
                                            disabled={syncLoading}
                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            {syncLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                                            Refresh All
                                        </button>
                                    </div>
                                    <div className="bg-[#111] border border-gray-700 rounded-lg overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-700 bg-[#0a0a0a]">
                                                    <th className="text-left py-2 px-3 text-gray-400 font-medium text-xs">Entity</th>
                                                    <th className="text-center py-2 px-3 text-gray-400 font-medium text-xs">Count</th>
                                                    <th className="text-right py-2 px-3 text-gray-400 font-medium text-xs">Last Updated</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { key: 'leads', icon: '🟢', label: 'Leads' },
                                                    { key: 'users', icon: '👥', label: 'Users' },
                                                    { key: 'pages', icon: '📄', label: 'Pages' },
                                                    { key: 'courses', icon: '📚', label: 'Courses' },
                                                    { key: 'posts', icon: '📝', label: 'Posts' },
                                                    { key: 'events', icon: '📅', label: 'Events' },
                                                    { key: 'subscribers', icon: '📧', label: 'Subscribers' },
                                                    { key: 'corporate_leads', icon: '🏢', label: 'Corp Leads' },
                                                    { key: 'downloads', icon: '📥', label: 'Downloads' },
                                                    { key: 'form_fields', icon: '📝', label: 'Form Fields' },
                                                    { key: 'stories', icon: '⭐', label: 'Stories' },
                                                    { key: 'faqs', icon: '❓', label: 'FAQs' },
                                                    { key: 'partners', icon: '🤝', label: 'Partners' },
                                                    { key: 'authors', icon: '✍️', label: 'Authors' },
                                                    { key: 'analytics', icon: '📈', label: 'Analytics' },
                                                    { key: 'ppc', icon: '💰', label: 'PPC Campaigns' },
                                                ].map(entity => {
                                                    const data = syncStatus[entity.key];
                                                    const timeAgo = data?.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : '-';
                                                    return (
                                                        <tr key={entity.key} className="border-b border-gray-800 hover:bg-gray-900/50">
                                                            <td className="py-2 px-3 text-white flex items-center gap-2">
                                                                <span>{entity.icon}</span>
                                                                <span>{entity.label}</span>
                                                                {data?.realtime && (
                                                                    <span className="text-[10px] bg-cyan-900/40 text-cyan-400 px-1.5 py-0.5 rounded">Real-time</span>
                                                                )}
                                                            </td>
                                                            <td className="py-2 px-3 text-center text-gray-300 font-mono">{data?.count ?? 0}</td>
                                                            <td className="py-2 px-3 text-right text-gray-400 text-xs">{timeAgo}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY SETTINGS */}
                        {activeSection === 'security' && (
                            <SecuritySettings
                                settings={settings}
                                setSettings={setSettings}
                                setMessage={setMessage}
                            />
                        )}

                        {/* DATABASE SETTINGS */}
                        {activeSection === 'database' && (
                            <div className="space-y-6 animate-in fade-in duration-300 w-full">

                                {/* Database Actions Toolbar */}
                                <div className="flex justify-between items-center bg-[#111] p-4 rounded-lg border border-gray-800">
                                    <div>
                                        <h3 className="text-sm font-medium text-white flex items-center gap-2">
                                            Database Operations
                                            {dbStatus === 'connected' ? (
                                                <span className="flex items-center gap-1 text-[10px] bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[10px] bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                    Inactive
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-xs text-gray-500">Manage your data and connections</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleExportBackup}
                                            disabled={exporting}
                                            className="px-4 py-2 bg-[#25282e] hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-colors border border-gray-700 flex items-center gap-2"
                                        >
                                            {exporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                            Export Local Backup (JSON)
                                        </button>
                                    </div>
                                </div>

                                {/* Testing Result Feedback */}
                                {testResult && (
                                    <div className={`p-4 rounded-lg flex items-start gap-3 ${testResult.success ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                                        <i className={`fas ${testResult.success ? 'fa-check-circle' : 'fa-exclamation-triangle'} mt-1`}></i>
                                        <div>
                                            <strong className="block mb-1 text-sm">{testResult.success ? 'Success' : 'Connection Failed'}</strong>
                                            <span className="text-xs opacity-90">{testResult.message}</span>
                                        </div>
                                    </div>
                                )}
                                {/* Nile Database */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                                        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                                            <Database className="w-4 h-4" /> Nile Database
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <SettingsToggle name="enableNileDB" checked={settings.enableNileDB} onChange={handleChange} color="blue" />
                                            <span className="text-xs text-gray-400 font-medium">{settings.enableNileDB ? 'On' : 'Off'}</span>
                                        </div>
                                    </div>
                                    <div className={`bg-[#111] p-6 rounded-lg border border-gray-700/50 space-y-4 ${!settings.enableNileDB && 'opacity-50 pointer-events-none grayscale'}`}>
                                        <div className="flex justify-end items-center gap-3 mb-4">
                                            {/* Status Indicator */}
                                            <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 ${settings.enableNileDB && dbStatus === 'connected' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                                                <span className={`w-2 h-2 rounded-full ${settings.enableNileDB && dbStatus === 'connected' ? 'bg-green-300 animate-pulse' : 'bg-red-300'}`}></span>
                                                {settings.enableNileDB && dbStatus === 'connected' ? 'ACTIVE' : 'INACTIVE'}
                                            </span>

                                            {/* Test Connection */}
                                            <button
                                                onClick={(e) => handleTestConnection('nile', e)}
                                                disabled={testingConnection === 'nile'}
                                                className="text-xs bg-cyan-900/30 text-cyan-400 hover:bg-cyan-900/50 border border-cyan-500/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
                                            >
                                                {testingConnection === 'nile' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Database className="w-3 h-3" />}
                                                Test Connection
                                            </button>

                                            {/* Connect/Disconnect Button */}
                                            <button
                                                onClick={() => (settings.enableNileDB && dbStatus === 'connected') ? handleDisconnect() : handleConnect('nile')}
                                                className={`text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-bold shadow-lg ${(settings.enableNileDB && dbStatus === 'connected') ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                                            >
                                                <Plug className="w-4 h-4" />
                                                {(settings.enableNileDB && dbStatus === 'connected') ? 'Disconnect' : 'Connect'}
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Username</label>
                                                <input type="text" name="nileUsername" value={settings.nileUsername} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-transparent text-white outline-none text-sm" placeholder="Nile username" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
                                                <input type="password" name="nilePassword" value={settings.nilePassword} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-transparent text-white outline-none text-sm" placeholder="••••••••" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Connection URL</label>
                                            <input type="text" name="nileConnectionURL" value={settings.nileConnectionURL} onChange={handleChange}
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-transparent text-white outline-none text-sm" placeholder="postgres://..." />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Workspace</label>
                                                <input type="text" name="nileWorkspace" value={settings.nileWorkspace} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-transparent text-white outline-none text-sm" placeholder="my-workspace" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Database Name</label>
                                                <input type="text" name="nileDatabaseName" value={settings.nileDatabaseName} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-transparent text-white outline-none text-sm" placeholder="my_database" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Default Region</label>
                                                <input type="text" name="nileDefaultRegion" value={settings.nileDefaultRegion} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-transparent text-white outline-none text-sm" placeholder="us-east-1" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">API URL</label>
                                                <input type="text" name="nileAPIURL" value={settings.nileAPIURL} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-transparent text-white outline-none text-sm" placeholder="https://api.nile.tech/..." />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Postgres URL</label>
                                            <input type="text" name="nilePostgresURL" value={settings.nilePostgresURL} onChange={handleChange}
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-600 focus:border-transparent text-white outline-none text-sm" placeholder="postgres://..." />
                                        </div>
                                    </div>
                                </div>

                                {/* Aiven Database */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                                        <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                                            <Database className="w-4 h-4" /> Aiven Database
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <SettingsToggle name="enableAivenDB" checked={settings.enableAivenDB} onChange={handleChange} color="orange" />
                                            <span className="text-xs text-gray-400 font-medium">{settings.enableAivenDB ? 'On' : 'Off'}</span>
                                        </div>
                                    </div>
                                    <div className={`bg-[#111] p-6 rounded-lg border border-gray-700/50 space-y-4 ${!settings.enableAivenDB && 'opacity-50 pointer-events-none grayscale'}`}>
                                        <div className="flex justify-end items-center gap-3 mb-4">
                                            {/* Status Indicator */}
                                            <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 ${settings.enableAivenDB && dbStatus === 'connected' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                                                <span className={`w-2 h-2 rounded-full ${settings.enableAivenDB && dbStatus === 'connected' ? 'bg-green-300 animate-pulse' : 'bg-red-300'}`}></span>
                                                {settings.enableAivenDB && dbStatus === 'connected' ? 'ACTIVE' : 'INACTIVE'}
                                            </span>

                                            {/* Test Connection */}
                                            <button
                                                onClick={(e) => handleTestConnection('aiven', e)}
                                                disabled={testingConnection === 'aiven'}
                                                className="text-xs bg-orange-900/30 text-orange-400 hover:bg-orange-900/50 border border-orange-500/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
                                            >
                                                {testingConnection === 'aiven' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Database className="w-3 h-3" />}
                                                Test Connection
                                            </button>

                                            {/* Connect/Disconnect Button */}
                                            <button
                                                onClick={() => (settings.enableAivenDB && dbStatus === 'connected') ? handleDisconnect() : handleConnect('aiven')}
                                                className={`text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-bold shadow-lg ${(settings.enableAivenDB && dbStatus === 'connected') ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                                            >
                                                <Plug className="w-4 h-4" />
                                                {(settings.enableAivenDB && dbStatus === 'connected') ? 'Disconnect' : 'Connect'}
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Service URL</label>
                                            <input type="text" name="aivenServiceURL" value={settings.aivenServiceURL} onChange={handleChange}
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" placeholder="https://..." />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Database Name</label>
                                                <input type="text" name="aivenDatabaseName" value={settings.aivenDatabaseName} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" placeholder="defaultdb" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Host</label>
                                                <input type="text" name="aivenHost" value={settings.aivenHost} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" placeholder="my-service.aivencloud.com" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Port</label>
                                                <input type="text" name="aivenPort" value={settings.aivenPort} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" placeholder="5432" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">User</label>
                                                <input type="text" name="aivenUser" value={settings.aivenUser} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" placeholder="avnadmin" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Connection Limit</label>
                                                <input type="text" name="aivenConnectionLimit" value={settings.aivenConnectionLimit} onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" placeholder="25" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
                                            <input type="password" name="aivenPassword" value={settings.aivenPassword} onChange={handleChange}
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" placeholder="••••••••" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">CA Certificate</label>
                                            <textarea name="aivenCACertificate" value={settings.aivenCACertificate} onChange={handleChange} rows={3}
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm font-mono" placeholder="-----BEGIN CERTIFICATE-----..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* SAML SETTINGS */}
                        {activeSection === 'saml' && (
                            <div className="space-y-4 animate-in fade-in duration-300 w-full">
                                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                                    <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> SAML 2.0 Configuration
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <SettingsToggle name="enableSAML" checked={settings.enableSAML} onChange={handleChange} color="purple" />
                                        <span className="text-xs text-gray-400 font-medium">{settings.enableSAML ? 'On' : 'Off'}</span>
                                    </div>
                                </div>
                                <div className={`bg-[#111] p-6 rounded-lg border border-gray-700/50 space-y-4 ${!settings.enableSAML && 'opacity-50 pointer-events-none grayscale'}`}>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">IdP Metadata URL <span className="text-red-400">*</span></label>
                                        <input type="text" name="samlIdpMetadataUrl" value={settings.samlIdpMetadataUrl} onChange={handleChange}
                                            placeholder="https://idp.example.com/metadata.xml"
                                            className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-purple-600 focus:border-transparent text-white outline-none text-sm" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">SP Entity ID</label>
                                            <input type="text" name="samlSpEntityId" value={settings.samlSpEntityId} onChange={handleChange}
                                                placeholder="Default: http://localhost:8080/..."
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-purple-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">SP ACS URL</label>
                                            <input type="text" name="samlSpAcsUrl" value={settings.samlSpAcsUrl} onChange={handleChange}
                                                placeholder="Default: http://localhost:8080/..."
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-purple-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* GOOGLE SETTINGS */}
                        {activeSection === 'google' && (
                            <div className="space-y-4 animate-in fade-in duration-300 w-full">
                                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                                    <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                                        <Lock className="w-4 h-4" /> Google OAuth Configuration
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <SettingsToggle name="enableGoogleOAuth" checked={settings.enableGoogleOAuth} onChange={handleChange} color="orange" />
                                        <span className="text-xs text-gray-400 font-medium">{settings.enableGoogleOAuth ? 'On' : 'Off'}</span>
                                    </div>
                                </div>
                                <div className={`bg-[#111] p-6 rounded-lg border border-gray-700/50 space-y-4 ${!settings.enableGoogleOAuth && 'opacity-50 pointer-events-none grayscale'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Client ID</label>
                                            <input type="text" name="googleClientId" value={settings.googleClientId} onChange={handleChange}
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Client Secret</label>
                                            <input type="password" name="googleClientSecret" value={settings.googleClientSecret} onChange={handleChange}
                                                className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Redirect URL</label>
                                        <input type="text" name="googleRedirectUrl" value={settings.googleRedirectUrl} onChange={handleChange}
                                            placeholder="http://localhost:8080/api/v1/oauth/google/callback"
                                            className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* INTEGRATIONS */}
                        {activeSection === 'integrations' && (
                            <div className="space-y-6 animate-in fade-in duration-300 w-full">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                                            <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider flex items-center gap-2">
                                                <MessageSquare className="w-3 h-3" /> WhatsApp (Meta API)
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <SettingsToggle name="enableWhatsApp" checked={settings.enableWhatsApp} onChange={handleChange} color="green" />
                                                <span className="text-xs text-gray-400 font-medium">{settings.enableWhatsApp ? 'On' : 'Off'}</span>
                                            </div>
                                        </div>
                                        <div className={`bg-[#111] p-6 rounded-lg border border-gray-700/50 space-y-3 ${!settings.enableWhatsApp && 'opacity-50 pointer-events-none grayscale'}`}>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1">Phone Number ID</label>
                                                    <input type="text" name="metaPhoneID" value={settings.metaPhoneID} onChange={handleChange}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none font-mono text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1">API Version</label>
                                                    <input type="text" name="metaVersion" value={settings.metaVersion} onChange={handleChange}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none font-mono text-sm" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Permanent Access Token</label>
                                                <input type="password" name="metaToken" value={settings.metaToken} onChange={handleChange}
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none font-mono text-sm" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1">Template Name</label>
                                                    <input type="text" name="metaTemplate" value={settings.metaTemplate} onChange={handleChange}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none font-mono text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1">Verify Token</label>
                                                    <input type="text" name="metaVerifyToken" value={settings.metaVerifyToken} onChange={handleChange}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none font-mono text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                                            <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-wider flex items-center gap-2">
                                                <LayoutDashboard className="w-3 h-3" /> CRM Webhook
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <SettingsToggle name="enableCRM" checked={settings.enableCRM} onChange={handleChange} color="orange" />
                                                <span className="text-xs text-gray-400 font-medium">{settings.enableCRM ? 'On' : 'Off'}</span>
                                            </div>
                                        </div>
                                        <div className={`bg-[#111] p-4 rounded-lg border border-gray-700/50 space-y-3 ${!settings.enableCRM && 'opacity-50 pointer-events-none grayscale'}`}>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Webhook URL</label>
                                                <input type="text" name="webhookUrl" value={settings.webhookUrl} onChange={handleChange}
                                                    placeholder="https://hooks.zapier.com/..."
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-yellow-600 focus:border-transparent text-white outline-none font-mono text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Google Tag Manager ID</label>
                                                <input type="text" name="googleTagManagerId" value={settings.googleTagManagerId} onChange={handleChange}
                                                    placeholder="GTM-XXXXXX"
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-yellow-600 focus:border-transparent text-white outline-none font-mono text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MARKETING */}
                        {activeSection === 'marketing' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                {/* WhatsApp Configuration */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 border-b border-gray-700 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                                <MessageSquare className="w-5 h-5 text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-medium">WhatsApp Integration</h3>
                                                <p className="text-xs text-gray-400">Configure WhatsApp widget & messaging</p>
                                            </div>
                                        </div>
                                        <SettingsToggle name="enableWhatsAppWidget" checked={settings.enableWhatsAppWidget} onChange={handleChange} color="green" />
                                    </div>
                                    <div className="p-5 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">WhatsApp Number</label>
                                                <input type="text" name="whatsappNumber" value={settings.whatsappNumber || ''} onChange={handleChange}
                                                    placeholder="919876543210 (without +)"
                                                    className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Response Time Label</label>
                                                <input type="text" name="whatsappResponseTime" value={settings.whatsappResponseTime || ''} onChange={handleChange}
                                                    placeholder="Replies in < 5 mins"
                                                    className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Default Message</label>
                                            <textarea name="whatsappDefaultMessage" value={settings.whatsappDefaultMessage || ''} onChange={handleChange}
                                                placeholder="Hi! I'm interested in learning more about your courses..."
                                                rows={2}
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm resize-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Support Hours */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 border-b border-gray-700 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium">Support Hours</h3>
                                            <p className="text-xs text-gray-400">Display available support timings on FAQ & contact pages</p>
                                        </div>
                                    </div>
                                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Weekday Hours (Mon-Sat)</label>
                                            <input type="text" name="supportHoursWeekday" value={settings.supportHoursWeekday || ''} onChange={handleChange}
                                                placeholder="9:00 AM - 7:00 PM"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Weekend Hours (Sun)</label>
                                            <input type="text" name="supportHoursWeekend" value={settings.supportHoursWeekend || ''} onChange={handleChange}
                                                placeholder="10:00 AM - 2:00 PM"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Counselor Settings */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 border-b border-gray-700 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                            <Share2 className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium">Counselor / Support Team</h3>
                                            <p className="text-xs text-gray-400">Contact details shown in "Talk to a Counselor" sections</p>
                                        </div>
                                    </div>
                                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Counselor Name</label>
                                            <input type="text" name="counselorName" value={settings.counselorName || ''} onChange={handleChange}
                                                placeholder="Priya Sharma"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Title / Designation</label>
                                            <input type="text" name="counselorTitle" value={settings.counselorTitle || ''} onChange={handleChange}
                                                placeholder="Senior Academic Counselor"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Direct Phone</label>
                                            <input type="text" name="counselorPhone" value={settings.counselorPhone || ''} onChange={handleChange}
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                                            <input type="email" name="counselorEmail" value={settings.counselorEmail || ''} onChange={handleChange}
                                                placeholder="counselor@pixe.com"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Callback Form Settings */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 border-b border-gray-700 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                            <LayoutDashboard className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium">Callback Form CTA</h3>
                                            <p className="text-xs text-gray-400">"Request a Call Back" card text</p>
                                        </div>
                                    </div>
                                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Card Title</label>
                                            <input type="text" name="callbackFormTitle" value={settings.callbackFormTitle || ''} onChange={handleChange}
                                                placeholder="Talk to a Counselor"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-purple-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Card Subtitle</label>
                                            <input type="text" name="callbackFormSubtitle" value={settings.callbackFormSubtitle || ''} onChange={handleChange}
                                                placeholder="Get personalized guidance"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-purple-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating CTA Widget */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 border-b border-gray-700 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                                                <Smartphone className="w-5 h-5 text-pink-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-medium">Floating CTA Button</h3>
                                                <p className="text-xs text-gray-400">Fixed bottom-right action button on pages</p>
                                            </div>
                                        </div>
                                        <SettingsToggle name="enableFloatingCTA" checked={settings.enableFloatingCTA} onChange={handleChange} color="purple" />
                                    </div>
                                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Button Text</label>
                                            <input type="text" name="floatingCTAText" value={settings.floatingCTAText || ''} onChange={handleChange}
                                                placeholder="Chat with us"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-pink-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Button Link (or WhatsApp)</label>
                                            <input type="text" name="floatingCTALink" value={settings.floatingCTALink || ''} onChange={handleChange}
                                                placeholder="https://wa.me/919876543210"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-pink-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* WHATSAPP MESSAGES TAB */}
                        {activeSection === 'whatsapp' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                {/* Enable Toggle & Description */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                                <MessageSquare className="w-6 h-6 text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg">WhatsApp Messages</h3>
                                                <p className="text-sm text-gray-400">Custom pre-filled messages for each page when users click "Chat on WhatsApp"</p>
                                            </div>
                                        </div>
                                        <SettingsToggle name="enableWhatsAppWidget" checked={settings.enableWhatsAppWidget || false} onChange={handleChange} color="green" />
                                    </div>
                                </div>

                                {/* WhatsApp Number Config */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 border-b border-gray-700">
                                        <h3 className="text-white font-medium">WhatsApp Configuration</h3>
                                        <p className="text-xs text-gray-400 mt-1">Set your WhatsApp number and default message</p>
                                    </div>
                                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">WhatsApp Number</label>
                                            <input type="text" name="whatsappNumber" value={settings.whatsappNumber || ''} onChange={handleChange}
                                                placeholder="919876543210 (without +)"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Response Time Label</label>
                                            <input type="text" name="whatsappResponseTime" value={settings.whatsappResponseTime || ''} onChange={handleChange}
                                                placeholder="Replies in < 5 mins"
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-gray-400 mb-1">Default Message (used when no page-specific message is set)</label>
                                            <textarea name="whatsappDefaultMessage" value={settings.whatsappDefaultMessage || ''} onChange={handleChange}
                                                placeholder="Hi! I'm interested in learning more about your courses..."
                                                rows={2}
                                                className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm resize-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Page-Specific Messages Table */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 border-b border-gray-700">
                                        <h3 className="text-white font-medium">Page-Specific WhatsApp Messages</h3>
                                        <p className="text-xs text-gray-400 mt-1">Configure different pre-filled messages for each page</p>
                                    </div>
                                    <div className="p-5 space-y-3">
                                        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase">
                                            <div className="col-span-3">Page Path</div>
                                            <div className="col-span-8">Pre-filled Message</div>
                                            <div className="col-span-1">Action</div>
                                        </div>
                                        {Object.entries(settings.pageMessages || {}).map(([path, msg], idx) => (
                                            <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                                                <div className="col-span-3">
                                                    <input
                                                        type="text"
                                                        value={path}
                                                        readOnly
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded text-gray-400 text-sm font-mono cursor-not-allowed"
                                                    />
                                                </div>
                                                <div className="col-span-8">
                                                    <input
                                                        type="text"
                                                        value={msg}
                                                        onChange={(e) => {
                                                            const newMap = { ...settings.pageMessages };
                                                            newMap[path] = e.target.value;
                                                            setSettings({ ...settings, pageMessages: newMap });
                                                        }}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-1 flex justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newMap = { ...settings.pageMessages };
                                                            delete newMap[path];
                                                            setSettings({ ...settings, pageMessages: newMap });
                                                        }}
                                                        className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add New Row */}
                                        <div className="grid grid-cols-12 gap-2 items-center pt-3 border-t border-gray-800">
                                            <div className="col-span-3">
                                                <input
                                                    type="text"
                                                    id="newWAMessagePath"
                                                    placeholder="/pricing"
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm font-mono"
                                                />
                                            </div>
                                            <div className="col-span-8">
                                                <input
                                                    type="text"
                                                    id="newWAMessageText"
                                                    placeholder="Hi! I'm interested in..."
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-green-600 focus:border-transparent text-white outline-none text-sm"
                                                />
                                            </div>
                                            <div className="col-span-1 flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const pathInput = document.getElementById('newWAMessagePath') as HTMLInputElement;
                                                        const msgInput = document.getElementById('newWAMessageText') as HTMLInputElement;
                                                        if (pathInput.value && msgInput.value) {
                                                            setSettings({
                                                                ...settings,
                                                                pageMessages: {
                                                                    ...(settings.pageMessages || {}),
                                                                    [pathInput.value]: msgInput.value
                                                                }
                                                            });
                                                            pathInput.value = '';
                                                            msgInput.value = '';
                                                        }
                                                    }}
                                                    className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tips Card */}
                                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-5">
                                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-green-400 text-lg">tips_and_updates</span>
                                        Best Practices for WhatsApp Messages
                                    </h4>
                                    <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                                        <li>Keep messages friendly and conversational</li>
                                        <li>Include context about the page they're on (e.g., "I'm interested in SEO course")</li>
                                        <li>Make it easy for counselors to understand what the user needs</li>
                                        <li>Avoid too formal or robotic language</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* TICKERS SETTINGS */}
                        {activeSection === 'exitintent' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                {/* Enable Toggle & Description */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                                <AlertCircle className="w-6 h-6 text-red-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg">Exit Intent Popups</h3>
                                                <p className="text-sm text-gray-400">Show popups when users are about to leave specific pages</p>
                                            </div>
                                        </div>
                                        <SettingsToggle name="enableExitIntent" checked={settings.enableExitIntent || false} onChange={handleChange} color="red" />
                                    </div>
                                </div>

                                {/* Page-Specific Exit Intent Table */}
                                <div className="bg-[#25282e] rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-5 border-b border-gray-700">
                                        <h3 className="text-white font-medium">Page-Specific Exit Intent Popups</h3>
                                        <p className="text-xs text-gray-400 mt-1">Configure different exit popups for different pages to maximize conversions</p>
                                    </div>
                                    <div className="p-5 space-y-3">
                                        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase">
                                            <div className="col-span-3">Page Path</div>
                                            <div className="col-span-4">Popup Title</div>
                                            <div className="col-span-4">Popup Message</div>
                                            <div className="col-span-1">Action</div>
                                        </div>
                                        {Object.entries(settings.pageExitIntents || {}).map(([path, data], idx) => (
                                            <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                                                <div className="col-span-3">
                                                    <input
                                                        type="text"
                                                        value={path}
                                                        readOnly
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded text-gray-400 text-sm font-mono cursor-not-allowed"
                                                    />
                                                </div>
                                                <div className="col-span-4">
                                                    <input
                                                        type="text"
                                                        value={data.title}
                                                        onChange={(e) => {
                                                            const newMap = { ...settings.pageExitIntents };
                                                            newMap[path] = { ...newMap[path], title: e.target.value };
                                                            setSettings({ ...settings, pageExitIntents: newMap });
                                                        }}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-red-600 focus:border-transparent text-white outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-4">
                                                    <input
                                                        type="text"
                                                        value={data.message}
                                                        onChange={(e) => {
                                                            const newMap = { ...settings.pageExitIntents };
                                                            newMap[path] = { ...newMap[path], message: e.target.value };
                                                            setSettings({ ...settings, pageExitIntents: newMap });
                                                        }}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-red-600 focus:border-transparent text-white outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-1 flex justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newMap = { ...settings.pageExitIntents };
                                                            delete newMap[path];
                                                            setSettings({ ...settings, pageExitIntents: newMap });
                                                        }}
                                                        className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add New Row */}
                                        <div className="grid grid-cols-12 gap-2 items-center pt-3 border-t border-gray-800">
                                            <div className="col-span-3">
                                                <input
                                                    type="text"
                                                    id="newExitIntentPath"
                                                    placeholder="/pricing"
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-red-600 focus:border-transparent text-white outline-none text-sm font-mono"
                                                />
                                            </div>
                                            <div className="col-span-4">
                                                <input
                                                    type="text"
                                                    id="newExitIntentTitle"
                                                    placeholder="Wait! Don't leave yet..."
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-red-600 focus:border-transparent text-white outline-none text-sm"
                                                />
                                            </div>
                                            <div className="col-span-4">
                                                <input
                                                    type="text"
                                                    id="newExitIntentMessage"
                                                    placeholder="Get a free counseling session!"
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-red-600 focus:border-transparent text-white outline-none text-sm"
                                                />
                                            </div>
                                            <div className="col-span-1 flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const pathInput = document.getElementById('newExitIntentPath') as HTMLInputElement;
                                                        const titleInput = document.getElementById('newExitIntentTitle') as HTMLInputElement;
                                                        const msgInput = document.getElementById('newExitIntentMessage') as HTMLInputElement;
                                                        if (pathInput.value && titleInput.value) {
                                                            setSettings({
                                                                ...settings,
                                                                pageExitIntents: {
                                                                    ...(settings.pageExitIntents || {}),
                                                                    [pathInput.value]: { title: titleInput.value, message: msgInput.value }
                                                                }
                                                            });
                                                            pathInput.value = '';
                                                            titleInput.value = '';
                                                            msgInput.value = '';
                                                        }
                                                    }}
                                                    className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tips Card */}
                                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-5">
                                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-red-400 text-lg">tips_and_updates</span>
                                        Best Practices for Exit Intent Popups
                                    </h4>
                                    <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                                        <li>Keep titles short and attention-grabbing (e.g., "Wait! Don't miss out...")</li>
                                        <li>Offer immediate value in the message (discounts, free resources, support)</li>
                                        <li>Use page-specific offers relevant to user's current context</li>
                                        <li>Avoid aggressive or spammy language that may annoy users</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* TICKERS SETTINGS */}
                        {activeSection === 'tickers' && (
                            <div className="space-y-4 animate-in fade-in duration-300">
                                <div className="bg-[#111] p-6 rounded-lg border border-gray-700/50 space-y-4">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <Smartphone className="w-4 h-4" /> Urgency Tickers (Scholarship Bars)
                                    </h3>
                                    <p className="text-xs text-gray-500">Manage promotional ticker bars for specific pages. Colors must be 6-digit hex codes (e.g., #FBBF24).</p>

                                    <div className="space-y-3">
                                        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase">
                                            <div className="col-span-2">Page Path</div>
                                            <div className="col-span-4">Ticker Text</div>
                                            <div className="col-span-2">Icon</div>
                                            <div className="col-span-2">Hex Color</div>
                                            <div className="col-span-1">Preview</div>
                                            <div className="col-span-1">Action</div>
                                        </div>

                                        {Object.entries(settings.pageTickers || {}).map(([path, config], idx) => (
                                            <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                                                <div className="col-span-2">
                                                    <input
                                                        type="text"
                                                        value={path}
                                                        readOnly
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded text-gray-400 text-sm font-mono cursor-not-allowed"
                                                    />
                                                </div>
                                                <div className="col-span-4">
                                                    <input
                                                        type="text"
                                                        value={config.text}
                                                        onChange={(e) => {
                                                            const newMap = settings.pageTickers ? { ...settings.pageTickers } : {};
                                                            newMap[path] = { ...config, text: e.target.value };
                                                            setSettings({ ...settings, pageTickers: newMap });
                                                        }}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <input
                                                        type="text"
                                                        value={config.icon || ''}
                                                        onChange={(e) => {
                                                            const newMap = settings.pageTickers ? { ...settings.pageTickers } : {};
                                                            newMap[path] = { ...config, icon: e.target.value };
                                                            setSettings({ ...settings, pageTickers: newMap });
                                                        }}
                                                        placeholder="e.g. alarm"
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <input
                                                        type="text"
                                                        value={config.color}
                                                        onChange={(e) => {
                                                            const newMap = settings.pageTickers ? { ...settings.pageTickers } : {};
                                                            newMap[path] = { ...config, color: e.target.value };
                                                            setSettings({ ...settings, pageTickers: newMap });
                                                        }}
                                                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm font-mono"
                                                        placeholder="#000000"
                                                    />
                                                </div>
                                                <div className="col-span-1 flex justify-center items-center gap-2">
                                                    <div
                                                        className="w-6 h-6 rounded border border-gray-700 shadow-inner"
                                                        style={{ backgroundColor: config.color || '#000000' }}
                                                        title="Color Preview"
                                                    ></div>
                                                    {config.icon && <span className="material-symbols-outlined text-sm">{config.icon}</span>}
                                                </div>
                                                <div className="col-span-1 flex justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newMap = settings.pageTickers ? { ...settings.pageTickers } : {};
                                                            delete newMap[path];
                                                            setSettings({ ...settings, pageTickers: newMap });
                                                        }}
                                                        className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="grid grid-cols-12 gap-2 items-center pt-2 border-t border-gray-800">
                                            <div className="col-span-2">
                                                <input
                                                    type="text"
                                                    id="newTickerPath"
                                                    placeholder="/courses/..."
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm font-mono"
                                                />
                                            </div>
                                            <div className="col-span-4">
                                                <input
                                                    type="text"
                                                    id="newTickerText"
                                                    placeholder="Hurry! Limited seats..."
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <input
                                                    type="text"
                                                    id="newTickerIcon"
                                                    placeholder="alarm"
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <input
                                                    type="text"
                                                    id="newTickerColor"
                                                    placeholder="#FBBF24"
                                                    defaultValue="#FBBF24"
                                                    className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-700 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent text-white outline-none text-sm font-mono"
                                                />
                                            </div>
                                            <div className="col-span-1"></div>
                                            <div className="col-span-1 flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const pathInput = document.getElementById('newTickerPath') as HTMLInputElement;
                                                        const textInput = document.getElementById('newTickerText') as HTMLInputElement;
                                                        const iconInput = document.getElementById('newTickerIcon') as HTMLInputElement;
                                                        const colorInput = document.getElementById('newTickerColor') as HTMLInputElement;
                                                        if (pathInput.value && textInput.value) {
                                                            setSettings({
                                                                ...settings,
                                                                pageTickers: {
                                                                    ...(settings.pageTickers || {}),
                                                                    [pathInput.value]: {
                                                                        text: textInput.value,
                                                                        icon: iconInput.value,
                                                                        color: colorInput.value || "#FBBF24"
                                                                    }
                                                                }
                                                            });
                                                            pathInput.value = '';
                                                            textInput.value = '';
                                                            iconInput.value = '';
                                                            colorInput.value = '#FBBF24';
                                                        }
                                                    }}
                                                    className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </form>
                </main>
            </div>
        </div >
    );
}
