import { useCallback, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { reorderListsFromDrag } from "../components/board/BoardDragHandler";
import { BoardShell } from "../components/board/BoardShell";
import { CardEditModal } from "../components/Cards/CardEdit";
import { defaultLists } from "../data/boardDefault";
import { newId } from "../utils/newId";

function buildBoard(boardId, stateBoard) {
  if (stateBoard && stateBoard.id === boardId) {
    return {
      title: stateBoard.title ?? "",
      lists: stateBoard.lists?.length ? stateBoard.lists : defaultLists(),
    };
  }
  return {
    title: "",
    lists: defaultLists(),
  };
}

export function BoardPage() {
  const { boardId } = useParams();
  const location = useLocation();
  const initial = buildBoard(boardId ?? "demo", location.state?.board);
  const [lists, setLists] = useState(initial.lists);
  const { title } = initial;
  const [editTarget, setEditTarget] = useState(null);

  const cardBeingEdited =
    editTarget != null
      ? (lists
          .find((l) => l.id === editTarget.listId)
          ?.cards.find((c) => c.id === editTarget.cardId) ?? null)
      : null;

  function handleAddCard(listId, { title: cardTitle, description, images }) {
    const t = cardTitle.trim();
    if (!t) return;
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              cards: [
                ...l.cards,
                {
                  id: newId(),
                  kind: "text",
                  title: t,
                  description: (description ?? "").trim(),
                  images: Array.isArray(images) ? [...images] : [],
                },
              ],
            }
          : l,
      ),
    );
  }

  function handleUpdateCard(listId, cardId, payload) {
    setLists((prev) =>
      prev.map((l) =>
        l.id !== listId
          ? l
          : {
              ...l,
              cards: l.cards.map((c) =>
                c.id !== cardId
                  ? c
                  : {
                      ...c,
                      title: payload.title,
                      description: payload.description,
                      images: payload.images,
                    },
              ),
            },
      ),
    );
    setEditTarget(null);
  }

  function handleDeleteCard(listId, cardId) {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, cards: l.cards.filter((c) => c.id !== cardId) }
          : l,
      ),
    );
    setEditTarget((cur) =>
      cur?.listId === listId && cur?.cardId === cardId ? null : cur,
    );
  }

  function handleDeleteList(listId) {
    setLists((prev) => prev.filter((l) => l.id !== listId));
    setEditTarget((cur) => (cur?.listId === listId ? null : cur));
  }

  function handleAddList() {
    const raw = window.prompt("Название колонки", "");
    if (raw === null) return;
    const columnTitle = raw.trim();
    setLists((prev) => [
      ...prev,
      {
        id: newId(),
        title: columnTitle,
        tint: "board",
        cards: [],
      },
    ]);
  }

  const handleDragEnd = useCallback((event) => {
    setLists((prev) => reorderListsFromDrag(event, prev) ?? prev);
  }, []);

  return (
    <>
      <BoardShell
        title={title}
        lists={lists}
        onAddCard={handleAddCard}
        onDeleteCard={handleDeleteCard}
        onAddList={handleAddList}
        onDeleteList={handleDeleteList}
        onOpenCard={(listId, cardId) => setEditTarget({ listId, cardId })}
        onDragEnd={handleDragEnd}
      />
      {editTarget && cardBeingEdited && cardBeingEdited.kind === "text" ? (
        <CardEditModal
          key={editTarget.cardId}
          card={cardBeingEdited}
          onClose={() => setEditTarget(null)}
          onSave={(payload) =>
            handleUpdateCard(editTarget.listId, editTarget.cardId, payload)
          }
        />
      ) : null}
    </>
  );
}
