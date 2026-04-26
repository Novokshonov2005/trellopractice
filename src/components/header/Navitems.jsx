import { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../../assets/icon-arrow-down.svg";
import ArrowUpIcon from "../../assets/icon-arrow-up.svg";

export const Navbar = ({
  text = "",
  children,
  variant = "default",
  showChevron = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const hasDropdown = Boolean(children);
  const chevronVisible = showChevron && hasDropdown;

  useEffect(() => {
    if (!isOpen || !hasDropdown) return;

    function handlePointerDown(event) {
      const el = rootRef.current;
      if (el && !el.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [isOpen, hasDropdown]);

  const baseTrigger =
    "flex cursor-pointer items-center gap-1.5 text-sm text-white/90 transition hover:text-white select-none";
  const variantClass = variant === "link" ? "px-1 py-1" : "";

  return (
    <div className="relative" ref={rootRef}>
      <div
        role={hasDropdown ? "button" : undefined}
        tabIndex={hasDropdown ? 0 : undefined}
        className={`${baseTrigger} ${variantClass}`}
        onClick={() => hasDropdown && setIsOpen((o) => !o)}
        onKeyDown={(e) => {
          if (!hasDropdown) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((o) => !o);
          }
        }}
      >
        <span>{text}</span>
        {chevronVisible && (
          <img
            src={isOpen ? ArrowUpIcon : ArrowDownIcon}
            alt=""
            className="h-2 w-2 shrink-0 opacity-80 invert"
          />
        )}
      </div>
      {isOpen && hasDropdown && (
        <div
          className="absolute left-0 top-full z-50 mt-2 flex min-w-48 flex-col gap-0.5 rounded-lg border border-white/10 bg-[#282e33] px-2 py-2 text-sm text-white shadow-lg"
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};
