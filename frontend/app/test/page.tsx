"use client";

export default function TestPage() {
    return (
        <div style={{ padding: '50px', backgroundColor: '#1a1d21', minHeight: '100vh' }}>
            <h1 style={{ color: 'white', fontSize: '32px' }}>✅ Test Page Works!</h1>
            <p style={{ color: '#888', marginTop: '20px' }}>
                If you can see this, the basic Next.js routing is working.
            </p>
            <p style={{ color: '#666', marginTop: '10px' }}>
                Time: {new Date().toLocaleTimeString()}
            </p>
            <a href="/dashboard" style={{ color: '#3b82f6', marginTop: '20px', display: 'block' }}>
                → Go to Dashboard
            </a>
        </div>
    );
}
