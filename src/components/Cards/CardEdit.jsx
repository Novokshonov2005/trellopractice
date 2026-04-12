import { useEffect, useRef } from "react";
import { CardFormFields } from "./CardFormFields";

export function CardEditModal({ card, onSave, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    panelRef.current?.focus();
  }, [card?.id]);

  if (!card || card.kind !== "text") return null;

  return (
    <div
      className="fixed inset-0 z-500 flex items-start justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-edit-title"
        tabIndex={-1}
        className="my-6 w-full max-w-lg rounded-xl border border-white/15 bg-[#282e33] p-5 shadow-2xl outline-none ring-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="card-edit-title" className="mb-4 text-lg font-semibold text-white">
          Редактирование карточки
        </h2>
        <CardFormFields
          key={card.id}
          initialTitle={card.title}
          initialDescription={card.description ?? ""}
          initialImages={[...(card.images ?? [])]}
          submitLabel="Сохранить"
          onSubmit={onSave}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}