import { Suspense } from "react";
import DropCountdown from "@/components/home/DropCountdown";
import NewDrops from "@/components/home/NewDrops";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 reef-glow" />
      <div className="pointer-events-none absolute inset-0 bubble-layer" />
      <div className="pointer-events-none absolute inset-0 caustics" />

      <section className="relative isolate">
        <video
          className="h-[52vh] w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/30 to-slate-950" />
        <div className="absolute inset-x-0 bottom-10 z-10 px-4 text-center">
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Dreamscape Aquariums</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-cyan-100 sm:text-base">
            Hand-selected WYSIWYG coral drops, synced live from Shopify.
          </p>
          <DropCountdown />
        </div>
      </section>

      <Suspense fallback={<p className="px-6 py-12 text-cyan-100">Loading coral drops...</p>}>
        <NewDrops />
      </Suspense>
    </main>
  );
}
