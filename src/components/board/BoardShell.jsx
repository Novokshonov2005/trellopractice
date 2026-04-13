import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { BoardCanvas } from "./BoardCanvas";

export function BoardShell({
  title,
  lists,
  onAddCard,
  onDeleteCard,
  onAddList,
  onDeleteList,
  onOpenCard,
  onDragEnd,
}) {
  const showTitle = Boolean(title?.trim());

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#1c4b82] px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
      <header className="mb-3 shrink-0 sm:mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-0.5 rounded-md py-1 text-sm font-medium text-white/90 outline-none ring-white/30 transition hover:text-white focus-visible:ring-2"
        >
          <IoChevronBack size={18} className="-ml-0.5 shrink-0 opacity-90" aria-hidden />
          Вернуться к доскам
        </Link>
        {showTitle ? (
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl">
            {title.trim()}
          </h1>
        ) : null}
      </header>

      <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/20 bg-[#14365c]/75 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md sm:rounded-3xl sm:p-4">
        <BoardCanvas
          lists={lists}
          onAddCard={onAddCard}
          onDeleteCard={onDeleteCard}
          onAddList={onAddList}
          onDeleteList={onDeleteList}
          onOpenCard={onOpenCard}
          onDragEnd = {onDragEnd}
        />
      </div>
    </div>
  );
}
