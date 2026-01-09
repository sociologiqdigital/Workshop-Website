import React from "react";

export default function ArcDivider({
  position = "bottom",
  height = 500,
  opacity = 0.08,
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${
        position === "bottom" ? "bottom-0" : "top-0"
      } flex justify-center`}
    >
      <div
        className="w-[140%]"
        style={{
          height: `${height}px`,
          borderRadius: "50%",
          background: "rgb(var(--color-primary))",
          opacity,
          transform:
            position === "bottom" ? "translateY(50%)" : "translateY(-50%)",
        }}
      />
    </div>
  );
}
