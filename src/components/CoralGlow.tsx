export default function CoralGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#11b5c9]/20 blur-3xl" />
      <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-[#ff7f9f]/12 blur-3xl" />
    </div>
  );
}