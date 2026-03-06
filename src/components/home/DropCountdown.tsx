"use client";

import { useEffect, useMemo, useState } from "react";

const NEXT_DROP = "2026-03-12T19:00:00-06:00";

function format(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function DropCountdown() {
  const target = useMemo(() => new Date(NEXT_DROP).getTime(), []);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = format(target - now);

  return (
    <div className="mx-auto mt-6 flex w-fit gap-3 rounded-xl border border-cyan-300/30 bg-slate-900/60 px-4 py-3 text-cyan-100 backdrop-blur">
      {[days, hours, minutes, seconds].map((n, i) => (
        <div key={i} className="min-w-14 text-center">
          <div className="text-2xl font-bold text-white">{String(n).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">
            {["Days", "Hours", "Mins", "Secs"][i]}
          </div>
        </div>
      ))}
    </div>
  );
}
