/*
 * Homepage for Dreamscape Aquariums.
 *
 * This page renders a fullscreen hero video showcasing an underwater
 * reef scene, followed by a section of the latest coral drops. The
 * hero video source can be configured via the NEXT_PUBLIC_HERO_VIDEO_URL
 * environment variable or by placing a file named `hero-video.mp4` in
 * the `public` folder. A translucent overlay with a title is placed on
 * top of the video for accessibility.
 */

import NewDrops from '@/components/home/NewDrops'

export default function HomePage() {
  // Determine the hero video source. If a public environment variable is
  // provided at build time, use that; otherwise fall back to a local
  // video file. The `NEXT_PUBLIC_HERO_VIDEO_URL` must be prefixed with
  // NEXT_PUBLIC_ so that it is exposed to the browser at runtime.
  const videoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/hero-video.mp4'

  return (
    <main className="relative min-h-screen font-sans">
      {/* Hero section with background video */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          // The key prop is used here to force React to reload the video if
          // the source changes between renders. This is necessary when using
          // environment variables that might change between builds.
          key={videoSrc}
          src={videoSrc}
        />
        {/* Overlay to darken the video and display a heading */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center px-4">
            Dreamscape Aquariums
          </h1>
        </div>
      </section>
      {/* New coral drops section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Latest Coral Drops
        </h2>
        {/* The NewDrops component fetches products from the Shopify collection
            and renders them as CoralCard components. */}
        <NewDrops />
      </section>
    </main>
  )
}