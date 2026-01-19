"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Settings {
    enableEmailLogin?: boolean;
    enableSAML?: boolean;
    enableGoogleOAuth?: boolean;
}

export default function LoginPage() {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [settings, setSettings] = useState<Settings>({});
    const [totpRequired, setTotpRequired] = useState(false);
    const [totpCode, setTotpCode] = useState("");
    const [tempToken, setTempToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        setMounted(true);

        // Fetch settings to check which login methods are enabled
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(() => { });

        // Check for OAuth error in URL
        const urlParams = new URLSearchParams(window.location.search);
        const oauthError = urlParams.get('error');
        if (oauthError === 'not_authorized') {
            setError("Your email is not authorized. Please contact an administrator to request access.");
            // Clean URL
            window.history.replaceState({}, '', '/krishna');
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                if (data.status === "totp_required") {
                    // TOTP is enabled - show TOTP input
                    setTotpRequired(true);
                    setTempToken(data.tempToken);
                } else {
                    // No TOTP - direct login
                    router.push("/dashboard");
                }
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleTotpVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/totp/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: totpCode, tempToken }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/dashboard");
            } else {
                setError(data.error || "Invalid TOTP code");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleSSOLogin = () => {
        window.location.href = "/api/saml/login";
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111] text-white p-4">
            <div className="w-full max-w-md bg-[#1a1d21] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Pixe Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2">Enterprise Access</p>
                </div>

                <div className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* TOTP Verification Step */}
                    {totpRequired && (
                        <form onSubmit={handleTotpVerify} className="space-y-4">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm text-center">
                                Two-factor authentication required
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Authenticator Code</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={6}
                                    value={totpCode}
                                    onChange={(e) => setTotpCode(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="000000"
                                    autoFocus
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || totpCode.length !== 6}
                                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying..." : "Verify"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setTotpRequired(false);
                                    setTotpCode("");
                                    setTempToken("");
                                }}
                                className="w-full py-2 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                ← Back to login
                            </button>
                        </form>
                    )}

                    {settings.enableEmailLogin && !totpRequired && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                    )}

                    {(settings.enableSAML || settings.enableGoogleOAuth) && (
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#1a1d21] px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {settings.enableSAML && (
                            <button
                                onClick={handleSSOLogin}
                                className="w-full bg-[#111] hover:bg-[#222] border border-gray-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                SSO Login (SAML)
                            </button>
                        )}

                        {settings.enableGoogleOAuth && (
                            <button
                                onClick={() => window.location.href = "/api/oauth/google/login"}
                                className="w-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                    <path fill="none" d="M1 1h22v22H1z" />
                                </svg>
                                Login with Google
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-600">
                    Protected by Enterprise Security
                </div>
            </div>
        </div>
    );
}
