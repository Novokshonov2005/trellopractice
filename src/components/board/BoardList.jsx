import { useState } from "react";
import { TbArrowsMaximize, TbArrowsMinimize } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { BoardCard } from "./BoardCard";

const tintStyles = {
  board: "bg-[#2b2b30]",
  purple: "bg-[#5e4b8a]/85",
  green: "bg-[#2f4f3f]/88",
  amber: "bg-[#5c4a2e]/88",
  dark: "bg-[#1c1c1e]/92",
};

export function BoardList({
  list,
  onAddCard,
  onDeleteCard,
  onDeleteList,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState("");

  const bg = tintStyles[list.tint] ?? tintStyles.board;

  function submitCard() {
    const t = draft.trim();
    if (!t) {
      setComposing(false);
      setDraft("");
      return;
    }
    onAddCard(list.id, t);
    setDraft("");
    setComposing(false);
  }

  function handleDeleteList() {
    setMenuOpen(false);
    if (
      !window.confirm("Удалить этот список и все карточки в нём?")
    ) {
      return;
    }
    onDeleteList(list.id);
  }

  return (
    <div
      className={`flex w-72 shrink-0 flex-col self-start rounded-xl ${bg}`}
    >
      <div className="flex shrink-0 items-start justify-between gap-2 px-3 pt-3">
        <h2 className="min-h-5 min-w-0 flex-1 text-sm font-semibold tracking-tight text-white">
          {list.title?.trim() ? list.title : "\u00a0"}
        </h2>
        <div className="relative flex shrink-0 items-center gap-0.5 text-white/70">
          <button
            type="button"
            className="rounded p-1 hover:bg-white/10 hover:text-white"
            aria-label={collapsed ? "Развернуть список" : "Свернуть список"}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? (
              <TbArrowsMaximize size={16} />
            ) : (
              <TbArrowsMinimize size={16} />
            )}
          </button>
          <button
            type="button"
            className="rounded p-1 hover:bg-white/10 hover:text-white"
            aria-label="Меню списка"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <BsThreeDots size={16} />
          </button>
          {menuOpen ? (
            <>
              <button
                type="button"
                className="fixed inset-0 z-90 cursor-default bg-transparent"
                aria-label="Закрыть меню"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full z-95 mt-1 min-w-40 rounded-lg border border-white/10 bg-[#282e33] py-1 shadow-xl">
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm text-red-300 transition hover:bg-white/10"
                  onClick={handleDeleteList}
                >
                  Удалить список
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {!collapsed ? (
        <>
          <div className="mt-2 max-h-[min(70dvh,calc(100dvh-7rem))] min-h-0 flex flex-col gap-2 overflow-y-auto px-2 pb-2">
            {list.cards.map((card) => (
              <BoardCard
                key={card.id}
                card={card}
                onDelete={
                  card.kind === "text"
                    ? (cardId) => onDeleteCard(list.id, cardId)
                    : undefined
                }
              />
            ))}
          </div>

          <div className="shrink-0 px-2 pb-3">
            {composing ? (
              <div className="flex flex-col gap-2 rounded-lg bg-black/25 p-2 ring-1 ring-white/10">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Заголовок карточки"
                  className="w-full rounded-md border border-white/15 bg-[#1a1d21] px-2 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#579dff]/50"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setComposing(false);
                      setDraft("");
                    }
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitCard();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-[#579dff] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#6cabff]"
                    onClick={submitCard}
                  >
                    Добавить
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                    onClick={() => {
                      setComposing(false);
                      setDraft("");
                    }}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
                onClick={() => setComposing(true)}
              >
                <span>+ Добавить карточку</span>
                <IoAdd size={20} className="shrink-0 opacity-90" aria-hidden />
              </button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
