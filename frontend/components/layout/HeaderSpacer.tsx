"use client";

import React from "react";

/**
 * A spacer component that pushes content down to account for the fixed Navbar.
 * It stays in the document flow and matches the responsive height of the header.
 */
export function HeaderSpacer() {
    return (
        <div className="h-[100px] md:h-[104px] pointer-events-none" aria-hidden="true" />
    );
}
