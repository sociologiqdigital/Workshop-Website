export function FloatingNote({ emoji, title, text }) {
  return (
    <div className="flex gap-4 items-start bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-soft">
      <div className="text-xl">{emoji}</div>
      <div>
        <p className="font-medium text-dark">{title}</p>
        <p className="text-sm text-muted leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
