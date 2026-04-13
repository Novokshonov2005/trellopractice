import { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TbArrowsMaximize, TbArrowsMinimize } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import { SortBoardCard } from "./SortBoardCard";
import { CardFormField } from "../Cards/CardField";

const tintStyles = {
  board: "bg-[#2b2b30]",
  purple: "bg-[#5e4b8a]/85",
  green: "bg-[#2f4f3f]/88",
  amber: "bg-[#5c4a2e]/88",
  dark: "bg-[#1c1c1e]/92",
};

export function BoardList({
  list,
  columnDragListeners,
  onAddCard,
  onDeleteCard,
  onDeleteList,
  onOpenCard,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [composing, setComposing] = useState(false);
  const [composerKey, setComposerKey] = useState(0);

  const bg = tintStyles[list.tint] ?? tintStyles.board;
  const cardIds = list.cards.map((c) => c.id);

  function handleDeleteList() {
    setMenuOpen(false);
    if (!window.confirm("Удалить этот список и все карточки в нём?")) {
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
          {list.title?.trim() || ""}
        </h2>
        <div className="relative flex shrink-0 items-center gap-0.5 text-white/70">
          {columnDragListeners ? (
            <button
              type="button"
              className="cursor-grab touch-manipulation rounded p-1 active:cursor-grabbing hover:bg-white/10 hover:text-white"
              aria-label="Переместить колонку"
              {...columnDragListeners}
            >
              <MdDragIndicator size={18} />
            </button>
          ) : null}
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
          <SortableContext
            items={cardIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-2 flex max-h-[min(70dvh,calc(100dvh-7rem))] min-h-12 flex-col gap-2 overflow-y-auto px-2 pb-2">
              {list.cards.map((card) => (
                <SortBoardCard
                  key={card.id}
                  card={card}listId={list.id}
                  onDelete={
                    card.kind === "text"
                      ? (cardId) => onDeleteCard(list.id, cardId)
                      : undefined
                  }
                  onOpenCard={onOpenCard}
                />
              ))}
            </div>
          </SortableContext>

          <div className="shrink-0 px-2 pb-3">
            {composing ? (
              <div
                className="rounded-lg bg-black/25 p-2 ring-1 ring-white/10"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <CardFormField
                  key={composerKey}
                  submitLabel="Добавить"
                  autoFocusTitle
                  onSubmit={(data) => {
                    onAddCard(list.id, data);
                    setComposing(false);
                  }}
                  onCancel={() => setComposing(false)}
                />
              </div>
            ) : (
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
                onClick={() => {
                  setComposerKey((k) => k + 1);
                  setComposing(true);
                }}
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