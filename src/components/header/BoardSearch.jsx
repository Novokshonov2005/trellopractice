import { IoSearchOutline } from "react-icons/io5";

const inputClass =
  "w-full rounded border border-white/10 bg-[#22272b] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#579dff]/50 focus:ring-1 focus:ring-[#579dff]";

export function BoardSearch({ className = "" }) {
  return (
    <label className={`relative flex w-full ${className}`}>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
        <IoSearchOutline size={16} aria-hidden />
      </span>
      <input
        type="search"
        placeholder="Поиск досок..."
        className={inputClass}
      />
    </label>
  );
}