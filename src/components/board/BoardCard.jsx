import {
  IoCheckmarkCircleOutline,
  IoClose,
  IoDocumentAttachOutline,
  IoPlayCircle,
} from "react-icons/io5";

export function BoardCard({ card, onDelete }) {
  if (card.kind === "text") {
    return (
      <div className="group/card relative cursor-pointer rounded-lg bg-[#22272b] px-3 py-2 pr-8 text-sm text-white shadow-none ring-1 ring-white/5 transition hover:bg-[#282e33]">
        <span className="block">{card.title}</span>
        {onDelete ? (
          <button
            type="button"
            className="absolute right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-white/50 opacity-0 transition hover:bg-white/10 hover:text-white group-hover/card:opacity-100"
            aria-label="Удалить карточку"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
          >
            <IoClose size={16} aria-hidden />
          </button>
        ) : null}
      </div>
    );
  }

  if (card.kind === "cover") {
    return (
      <div className="cursor-pointer overflow-hidden rounded-lg bg-[#22272b] shadow-none ring-1 ring-white/5 transition hover:brightness-110">
        <div
          className="relative flex aspect-video items-center justify-center"
          style={{ background: card.cover }}
        >
          {card.showPlay && (
            <IoPlayCircle className="text-white/90 drop-shadow-md" size={48} />
          )}
        </div>
        {card.title ? (
          <p className="px-3 py-2 text-sm font-medium text-white">{card.title}</p>
        ) : null}
      </div>
    );
  }

  if (card.kind === "thumb") {
    return (
      <div className="cursor-pointer overflow-hidden rounded-lg bg-[#22272b] shadow-none ring-1 ring-white/5 transition hover:bg-[#282e33]">
        <div
          className="aspect-video w-full"
          style={{ background: card.cover }}
        />
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <p className="text-sm font-medium text-white">{card.title}</p>
          <div className="flex shrink-0 items-center gap-1 text-xs text-white/50">
            <IoDocumentAttachOutline size={14} />
            <IoCheckmarkCircleOutline size={14} />
            {card.meta ? <span>{card.meta}</span> : null}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
