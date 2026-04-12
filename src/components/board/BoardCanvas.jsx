import { IoAdd } from "react-icons/io5";

import { BoardList } from "./BoardList";

export function BoardCanvas({
  lists,
  onAddCard,
  onDeleteCard,
  onAddList,
  onDeleteList,
}) {
  return (
    <div className="flex min-h-0 flex-1 items-start gap-3 overflow-x-auto overflow-y-auto px-1 py-1 sm:px-2">
      {lists.map((list) => (
        <BoardList
          key={list.id}
          list={list}
          onAddCard={onAddCard}
          onDeleteCard={onDeleteCard}
          onDeleteList={onDeleteList}
        />
      ))}
      <button
        type="button"
        className="flex h-min min-w-56 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/15 bg-[#579dff]/25 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-[#579dff]/35"
        onClick={onAddList}
      >
        <IoAdd size={20} className="shrink-0" aria-hidden />
        Добавьте еще одну колонку
      </button>
    </div>
  );
}
