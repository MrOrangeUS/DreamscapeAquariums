"use client";

import React, { useState, useEffect } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const totalMilliseconds = targetDate.getTime() - new Date().getTime();
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { days, hours, minutes, seconds };
}

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(new Date(targetDate))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(new Date(targetDate)));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeRemaining.days < 0) {
    return (
      <p className="text-2xl font-bold text-gray-800">
        The coral drop is live!
      </p>
    );
  }

  return (
    <div className="flex space-x-4 text-center">
      <div className="flex flex-col">
        <span className="text-4xl font-bold">{timeRemaining.days}</span>
        <span className="text-sm uppercase">Days</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-bold">{timeRemaining.hours}</span>
        <span className="text-sm uppercase">Hours</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-bold">{timeRemaining.minutes}</span>
        <span className="text-sm uppercase">Minutes</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-bold">{timeRemaining.seconds}</span>
        <span className="text-sm uppercase">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
