"use client";

import { useEffect, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const totalMilliseconds = targetDate.getTime() - new Date().getTime();
  const totalSeconds = Math.max(0, Math.floor(totalMilliseconds / 1000));

  return {
    days: Math.floor(totalSeconds / (3600 * 24)),
    hours: Math.floor((totalSeconds % (3600 * 24)) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: Math.floor(totalSeconds % 60),
  };
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(new Date(targetDate))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(new Date(targetDate)));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Minutes", value: timeRemaining.minutes },
    { label: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center shadow-[0_0_30px_rgba(17,181,201,0.06)]"
        >
          <div className="text-3xl font-semibold text-white md:text-5xl">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.3em] text-cyan-200/70">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
