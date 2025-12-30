import React from "react";
import clsx from "clsx";

export default function RainbowButton({
  label,
  leftIcon,
  rightIcon,
  count,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "group relative inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-transform duration-200 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        "animate-rainbow border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))]",
        "bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box]",
        "dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))]",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {leftIcon}
        <span className="text-white">{label}</span>
      </div>

      {count !== undefined && (
        <div className="ml-2 flex items-center gap-1 text-sm">
          {rightIcon}
          <span className="tabular-nums font-medium">
            {count}
          </span>
        </div>
      )}
    </button>
  );
}
