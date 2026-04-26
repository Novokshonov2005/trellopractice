import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BoardCard } from "./BoardCard";

export function SortBoardCard(props) {
  const { card, ...rest } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : undefined,
    zIndex: isDragging ? 20 : undefined,
    with: "100%",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative w-full">
      <div
        {...listeners}
        className="cursor-grab touch-manipulation active:cursor-grabbing"
      >
        <BoardCard card={card} {...rest} />
      </div>
    </div>
  );
}