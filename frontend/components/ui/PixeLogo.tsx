import React from 'react';

interface PixeLogoProps {
    className?: string;
}

/**
 * PixeLogo Component
 * Uses the original PNG assets for light and dark modes.
 * Ensures the white logo is used in dark mode and the black logo in light mode.
 */
export function PixeLogo({ className = "h-10 w-auto" }: PixeLogoProps) {
    return (
        <div className={`${className} flex items-center justify-center`}>
            {/* Light Mode - Black Logo */}
            <img
                src="/logo-black.png"
                alt="Pixe Logo"
                className="h-full w-auto object-contain dark:hidden"
                style={{ display: 'var(--logo-light-display, block)' }}
            />
            {/* Dark Mode - White Logo */}
            <img
                src="/logo-white.png"
                alt="Pixe Logo"
                className="h-full w-auto object-contain hidden dark:block"
                style={{ display: 'var(--logo-dark-display, none)' }}
            />
            <style jsx>{`
        :global(.dark) img[src="/logo-black.png"] { display: none !important; }
        :global(.dark) img[src="/logo-white.png"] { display: block !important; }
      `}</style>
        </div>
    );
}
