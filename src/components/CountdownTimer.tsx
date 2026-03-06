"use client";

import { useEffect, useMemo, useState } from "react";

function getTimeParts(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const fallbackDate = useMemo(() => targetDate || new Date(Date.now() + 86400000).toISOString(), [targetDate]);
  const [time, setTime] = useState(() => getTimeParts(fallbackDate));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeParts(fallbackDate)), 1000);
    return () => clearInterval(timer);
  }, [fallbackDate]);

  const items = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="ocean-panel rounded-2xl p-5 text-center shadow-[0_0_25px_rgba(17,181,201,.15)]">
          <div className="text-4xl font-semibold text-[#eafcff] md:text-5xl">{String(item.value).padStart(2, "0")}</div>
          <div className="mt-2 text-xs uppercase tracking-[0.28em] text-[#11b5c9]">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
