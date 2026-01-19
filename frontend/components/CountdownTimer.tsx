"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
    endDate?: Date;
    label?: string;
    className?: string;
}

export default function CountdownTimer({
    endDate,
    label = "Offer ends in:",
    className = "",
}: CountdownTimerProps) {
    // Default: end at midnight of next day
    const defaultEnd = new Date();
    defaultEnd.setDate(defaultEnd.getDate() + 1);
    defaultEnd.setHours(0, 0, 0, 0);

    const targetDate = endDate || defaultEnd;

    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const target = targetDate.getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24) + Math.floor(difference / (1000 * 60 * 60 * 24)) * 24,
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (num: number) => num.toString().padStart(2, "0");

    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            <span className="text-sm font-medium">{label}</span>
            <div className="flex items-center gap-1">
                <div className="bg-red-600 text-white px-2 py-1 rounded font-mono font-bold">
                    {formatNumber(timeLeft.hours)}
                </div>
                <span className="text-red-600 font-bold">:</span>
                <div className="bg-red-600 text-white px-2 py-1 rounded font-mono font-bold">
                    {formatNumber(timeLeft.minutes)}
                </div>
                <span className="text-red-600 font-bold">:</span>
                <div className="bg-red-600 text-white px-2 py-1 rounded font-mono font-bold">
                    {formatNumber(timeLeft.seconds)}
                </div>
            </div>
        </div>
    );
}
