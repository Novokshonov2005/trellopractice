import {
  IoCheckmarkCircleOutline,
  IoClose,
  IoCreateOutline,
  IoDocumentAttachOutline,
  IoPlayCircle,
} from "react-icons/io5";

export function BoardCard({ card, listId, onDelete, onOpenCard }) {
  if (card.kind === "text") {
    const desc = card.description?.trim();
    const images = Array.isArray(card.images) ? card.images : [];
    const preview = images.slice(0, 4);
    const extra = images.length - preview.length;

    function openEdit(e) {
      e.stopPropagation();
      onOpenCard?.(listId, card.id);
    }

    return (
      <div className="group/card relative rounded-lg bg-[#22272b] px-3 py-2 text-left text-sm text-white shadow-none ring-1 ring-white/5 transition hover:bg-[#282e33] hover:ring-white/15">
        <div
          role="button"
          tabIndex={0}
          className="cursor-pointer pr-7 outline-none focus-visible:ring-2 focus-visible:ring-[#579dff]/60"
          onClick={() => onOpenCard?.(listId, card.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpenCard?.(listId, card.id);
            }
          }}
        >
          <span className="block font-medium">{card.title}</span>
          {desc ? (
            <p className="mt-1 line-clamp-3 text-xs text-white/65">{desc}</p>
          ) : null}
          {preview.length > 0 ? (
            <div className="mt-2 flex gap-1 overflow-x-auto pb-0.5">
              {preview.map((src, i) => (
                <div
                  key={`${card.id}-p-${i}`}
                  className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10"
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
              {extra > 0 ? (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-black/40 text-xs font-semibold text-white/90">
                  +{extra}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/5 py-1.5 text-xs font-medium text-[#579dff] transition hover:bg-white/10"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={openEdit}
        >
          <IoCreateOutline size={14} aria-hidden />
          Описание и фото
        </button>

        {onDelete ? (
          <button
            type="button"
            className="absolute right-1 top-2 flex h-6 w-6 items-center justify-center rounded text-white/50 opacity-0 pointer-events-none transition hover:bg-white/10 hover:text-white group-hover/card:pointer-events-auto group-hover/card:opacity-100"
            aria-label="Удалить карточку"
            onPointerDown={(e) => e.stopPropagation()}
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