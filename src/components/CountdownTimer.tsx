"use client";

import { useEffect, useMemo, useState } from "react";

function getCountdown(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const diff = Math.max(0, target - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const ZERO_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const resolvedTarget = useMemo(
    () => targetDate || new Date(Date.now() + 86400000).toISOString(),
    [targetDate],
  );

  // Start from a stable server/client value to prevent hydration mismatch.
  const [time, setTime] = useState(ZERO_TIME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getCountdown(resolvedTarget));

    const interval = setInterval(() => {
      setTime(getCountdown(resolvedTarget));
    }, 1000);

    return () => clearInterval(interval);
  }, [resolvedTarget]);

  const safeTime = mounted ? time : ZERO_TIME;

  const cells = [
    { label: "Days", value: safeTime.days },
    { label: "Hours", value: safeTime.hours },
    { label: "Minutes", value: safeTime.minutes },
    { label: "Seconds", value: safeTime.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="rounded-2xl border border-[#11b5c9]/30 bg-[#0c1b2e]/70 p-5 text-center shadow-[0_0_30px_rgba(17,181,201,0.14)]"
        >
          <p className="text-4xl font-semibold md:text-5xl">
            {String(cell.value).padStart(2, "0")}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#11b5c9]">
            {cell.label}
          </p>
        </div>
      ))}
    </div>
  );
}