export default function FloatingBlob({
  className = "",
  gradient = "from-pink-400 via-teal-400 to-purple-500",
}) {
  return (
    <div
      className={`
        floating-blob
        absolute
        w-[400px]
        aspect-square
        opacity-70
        blur-2xl
        mix-blend-multiply
        pointer-events-none
        bg-gradient-to-br ${gradient}
        ${className}
      `}
      style={{ animation: "floatingBlob 12s ease-in-out infinite alternate" }}
    />
  );
}
