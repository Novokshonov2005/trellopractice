import { useCallback, useState } from "react";
import { BoardShell } from "../components/board/BoardShell";
import { CardEditModal } from "../components/Cards/CardEdit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCard,
  addList,
  applyDragResult,
  deleteCard,
  deleteList,
  selectBoardById,
  updateCard,
} from "../slices/boardSlice";

export function BoardPage() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const currentBoardId = boardId ?? "";
  const board = useSelector((state) => selectBoardById(state, currentBoardId));
  const lists = board?.lists ?? [];
  const title = board?.title ?? "";
  const [editTarget, setEditTarget] = useState(null);

  const cardBeingEdited =
    editTarget != null
      ? (lists
          .find((l) => l.id === editTarget.listId)
          ?.cards.find((c) => c.id === editTarget.cardId) ?? null)
      : null;

   function handleAddCard(listId, { title: cardTitle, description, images }) {
    if (!board) return;
    const t = cardTitle.trim();
    if (!t) return;
    dispatch(
      addCard({
        boardId: currentBoardId,
        listId,
        title: t,
        description,
        images,
      }),
    );
  }

 function handleUpdateCard(listId, cardId, payload) {
    dispatch(updateCard({ boardId: currentBoardId, listId, cardId, payload }));
    setEditTarget(null);
  }

  function handleDeleteCard(listId, cardId) {
    dispatch(deleteCard({ boardId: currentBoardId, listId, cardId }));
    setEditTarget((cur) =>
      cur?.listId === listId && cur?.cardId === cardId ? null : cur,
    );
  }

  function handleDeleteList(listId) {
    dispatch(deleteList({ boardId: currentBoardId, listId }));
    setEditTarget((cur) => (cur?.listId === listId ? null : cur));
  }

  function handleAddList() {
    if (!board) return;
    const raw = window.prompt("Название колонки", "");
    if (raw === null) return;
    const columnTitle = raw.trim();
    if (!columnTitle) return;
    dispatch(addList({ boardId: currentBoardId, title: columnTitle }));
  }

  function handleDragEnd(event) {
    dispatch(applyDragResult({ boardId: currentBoardId, event }));
  }

  if (!board) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-white">
        Доска не найдена
      </div>
    );
  }
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
