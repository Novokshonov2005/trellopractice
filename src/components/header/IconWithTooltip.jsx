export function IconWithTooltip({ text, children }) {
  return (
    <div className="group/tooltip relative flex">
      {children}
      <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-200 mt-2 w-max max-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-white/10 bg-[#282e33] px-3 py-2 text-left text-xs leading-snug text-white/95 opacity-0 shadow-lg transition-opacity duration-150 invisible group-hover/tooltip:visible group-hover/tooltip:opacity-100 group-focus-within/tooltip:visible group-focus-within/tooltip:opacity-100"
      >
        {text}
      </div>
    </div>
  );
}
