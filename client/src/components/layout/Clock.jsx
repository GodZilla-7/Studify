import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext';

const Clock = () => {
    const { user, isAuthenticated } = useAuth();
    const [time, setTime] = useState(new Date());
    const [is24HourFormat, setIs24HourFormat] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Use username directly from user object
    const username = isAuthenticated && user?.name ? user.name : "User";

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { 
            hour: "2-digit", 
            minute: "2-digit", 
            hour12: !is24HourFormat 
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString(undefined, { 
            weekday: "long", 
            day: "numeric", 
            month: "long", 
        });
    };

    const getGreeting = (hour) => {
        if (hour < 5) return `It's ⏰, ${username}. Get some rest! 🛏️`;
        if (hour < 8) return `Early morning 🌅, ${username}. A fresh start!`;
        if (hour < 11) return `Good morning 🌅, ${username}!`;
        if (hour < 14) return `Good noon 🕛, ${username}. Lunch time!`;
        if (hour < 18) return `Good afternoon ☀️ , ${username}. Keep it up!`;
        if (hour < 21) return `Good evening🌄, ${username}. Time to unwind!`;
        return `Good night, ${username}. Sleep well! 🛏️`;
    };

    return (
        <div 
            className="flex flex-col items-center text-center cursor-pointer mb-8 text-black"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="text-2xl font-stretch-ultra-condensed">{getGreeting(time.getHours())}</div>

            <div className="text-6xl font-semibold mt-2">
                It's {formatTime(time)}
            </div>
            <div className="text-sm mt-4 font-thin">{formatDate(time)}</div>

            {isHovered && (
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm">12-hour</span>
                    <input 
                        type="checkbox" 
                        className="toggle toggle-secondary" 
                        checked={is24HourFormat} 
                        onChange={() => setIs24HourFormat(!is24HourFormat)} 
                    />
                    <span className="text-sm">24-hour</span>
                </div>
            )}
        </div>
    );
};

export default Clock;
