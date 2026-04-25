import { useCallback, useState } from "react";
import { BoardShell } from "../components/board/BoardShell";
import { CardEditModal } from "../components/Cards/CardEdit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addCardAsync,
  addListAsync,
  applyDragResultAsync,
  deleteCardAsync,
  deleteListAsync,
  selectBoardById,
  updateCardAsync,
} from "../slices/boardSlice";

export function BoardPage() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const currentBoardId = boardId ?? "";
  const board = useSelector((state) => selectBoardById(state, currentBoardId));
  const lists = board?.lists ?? [];
  const title = board?.title ?? "";
  const [editTarget, setEditTarget] = useState(null);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const cardBeingEdited =
    editTarget != null
      ? lists
          .find((l) => l.id === editTarget.listId)
          ?.cards.find((c) => c.id === editTarget.cardId) ?? null
      : null;

  function handleAddCard(listId, { title: cardTitle, description, dueDate, images }) {
    if (!board) return;
    const t = cardTitle.trim();
    if (!t) return;
    dispatch(
      addCardAsync({
        boardId: currentBoardId,
        listId,
        title: t,
        description,
        dueDate,
        images,
      }),
    );
  }

  function handleUpdateCard(listId, cardId, payload) {
    dispatch(updateCardAsync({ boardId: currentBoardId, listId, cardId, payload }));
    setEditTarget(null);
  }

  function handleDeleteCard(listId, cardId) {
    dispatch(deleteCardAsync({ boardId: currentBoardId, listId, cardId }));
    setEditTarget((cur) =>
      cur?.listId === listId && cur?.cardId === cardId ? null : cur,
    );
  }

  function handleDeleteList(listId) {
    dispatch(deleteListAsync({ boardId: currentBoardId, listId }));
    setEditTarget((cur) => (cur?.listId === listId ? null : cur));
  }

  function handleCreateList() {
    const columnTitle = newListTitle.trim();
    if (!columnTitle) return;
    dispatch(addListAsync({ boardId: currentBoardId, title: columnTitle }));
    setNewListTitle("");
    setListModalOpen(false);
  }

  function handleAddList() {
    if (!board) return;
    setListModalOpen(true);
  }

  function handleDragEnd(event) {
    dispatch(
      applyDragResultAsync({
        boardId: currentBoardId,
        activeId: String(event.active.id),
        overId: event.over ? String(event.over.id) : null,
      }),
    );
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
      {listModalOpen ? (
        <div
          className="fixed inset-0 z-520 flex items-start justify-center bg-black/55 p-4 pt-20 backdrop-blur-sm"
          role="presentation"
          onClick={() => setListModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-list-title"
            className="w-full max-w-md rounded-xl border border-white/15 bg-[#282e33] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="new-list-title" className="mb-3 text-lg font-semibold text-white">
              Новая колонка
            </h2>
            <label className="mb-1 block text-xs font-medium text-white/70">
              Название колонки
            </label>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className="w-full rounded-md border border-white/15 bg-[#1a1d21] px-2 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#579dff]/50"
              placeholder="Например: В работе"
              autoFocus
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="rounded-md bg-[#579dff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6cabff]"
                onClick={handleCreateList}
              >
                Создать
              </button>
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                onClick={() => setListModalOpen(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
