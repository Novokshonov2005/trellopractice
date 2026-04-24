import { IoSearchOutline } from "react-icons/io5";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllBoards, touchRecent } from "../../slices/boardSlice"

const inputClass =
  "w-full rounded border border-white/10 bg-[#22272b] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#579dff]/50 focus:ring-1 focus:ring-[#579dff]";
const resultClass =
  "absolute left-0 right-0 top-[calc(100%+8px)] z-[200] max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-[#282e33] p-2 shadow-xl";
const resultLinkClass =
  "block rounded px-2 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white";

export function BoardSearch({ className = "" }) {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalized) return [];
    return boards
      .filter((board) => (board.title || "").toLowerCase().includes(normalized))
      .slice(0, 8);
  }, [boards, normalized]);

  return (
    <div className={`relative w-full ${className}`}>
      <label className="relative flex w-full">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
          <IoSearchOutline size={16} aria-hidden />
        </span>
        <input
          type="search"
          placeholder="Поиск досок..."
          className={inputClass}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {normalized ? (
        <div className={resultClass}>
          {results.length > 0 ? (
            results.map((board) => (
              <Link
                key={board.id}
                to={`/board/${board.id}`}
                className={resultLinkClass}
                onClick={() => {
                  dispatch(touchRecent({ boardId: board.id }));
                  setQuery("");
                }}
              >
                {board.title || "Без названия"}
              </Link>
            ))
          ) : (
            <p className="px-2 py-2 text-sm text-white/60">Ничего не найдено</p>
          )}
        </div>
      ) : null}
    </div>
  );
}