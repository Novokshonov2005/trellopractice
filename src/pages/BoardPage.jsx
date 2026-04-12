import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BoardShell } from "../components/board/BoardShell";
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

  function handleAddCard(listId, cardTitle) {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              cards: [
                ...l.cards,
                { id: newId(), kind: "text", title: cardTitle },
              ],
            }
          : l,
      ),
    );
  }

  function handleDeleteCard(listId, cardId) {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, cards: l.cards.filter((c) => c.id !== cardId) }
          : l,
      ),
    );
  }

  function handleDeleteList(listId) {
    setLists((prev) => prev.filter((l) => l.id !== listId));
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

  return (
    <BoardShell
      title={title}
      lists={lists}
      onAddCard={handleAddCard}
      onDeleteCard={handleDeleteCard}
      onAddList={handleAddList}
      onDeleteList={handleDeleteList}
    />
  );
}
