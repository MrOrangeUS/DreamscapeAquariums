"use client";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-[#021019]/40 via-[#021019]/55 to-[#07111f]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,181,201,0.15),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.45em] text-cyan-200/80 md:text-base">
          Dreamscape Aquariums
        </p>
        <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">
          Living Art from the Ocean
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
          Rare coral, cinematic presentation, and a luxury reef experience designed to feel like an underwater gallery.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="/products"
            className="rounded-full bg-cyan-400 px-6 py-3 font-medium text-[#07111f] transition hover:scale-[1.02]"
          >
            Shop Corals
          </a>
          <a
            href="/about"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-md transition hover:bg-white/10"
          >
            About Us
          </a>
        </div>
      </div>
    </section>
  );
}
