import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultLists, defaultMembers } from "../../data/boardDefault";
import { useDispatch } from "react-redux";
import { createBoardAsync } from "../../slices/boardSlice";

export function BoardCreateBar() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trimmed = title.trim();
  const canSubmit = trimmed.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `b-${Date.now()}`;
    await dispatch(createBoardAsync({ id, title: trimmed }));
    navigate(`/board/${id}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название новой доски"
        className="min-h-12 w-full flex-1 rounded-xl border border-white/15 bg-black/35 px-4 text-[15px] text-white shadow-inner outline-none ring-0 transition placeholder:text-white/45 focus:border-[#579dff]/55 focus:ring-2 focus:ring-[#579dff]/25"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!canSubmit}
        className="min-h-12 shrink-0 rounded-xl bg-[#579dff] px-6 text-[15px] font-semibold text-white shadow-lg shadow-[#579dff]/20 transition enabled:hover:bg-[#6cabff] enabled:hover:shadow-[#579dff]/30 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Создать доску
      </button>
    </form>
  );
}
