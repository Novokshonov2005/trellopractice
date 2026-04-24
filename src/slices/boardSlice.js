import { createSlice } from "@reduxjs/toolkit";
import { reorderListsFromDrag } from "../components/board/BoardDragHandler";
import { defaultLists } from "../data/boardDefault";
import { newId } from "../utils/newId";

const initialState = {
  entities: {},
  recentIds: [],
  favoriteIds: [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    createBoard(state, action) {
      const { id, title } = action.payload;
      state.entities[id] = {
        id,
        title: title?.trim() || "",
        lists: defaultLists(),
      };
      state.recentIds = [id, ...state.recentIds.filter((item) => item !== id)].slice(0,8);
    },
    deleteList(state, action) {
      const { boardId, listId } = action.payload;
      const board = state.entities[boardId];
      if (!board) return;
      board.lists = board.lists.filter((l) => l.id !== listId);
    },
    addList(state, action) {
      const { boardId, title } = action.payload;
      const board = state.entities[boardId];
      if (!board) return;
      board.lists.push({
        id: newId(),
        title: title.trim(),
        tint: "board",
        cards: [],
      });
    },
    addCard(state, action) {
      const { boardId, listId, title, description, images } = action.payload;
      const board = state.entities[boardId];
      if (!board) return;
      const list = board.lists.find((l) => l.id === listId);
      if (!list) return;
      list.cards.push({
        id: newId(),
        kind: "text",
        title: title.trim(),
        description: (description ?? "").trim(),
        images: Array.isArray(images) ? [...images] : [],
      });
    },
    updateCard(state, action) {
      const { boardId, listId, cardId, payload } = action.payload;
      const board = state.entities[boardId];
      if (!board) return;
      const list = board.lists.find((l) => l.id === listId);
      if (!list) return;
      const card = list.cards.find((c) => c.id === cardId);
      if (!card) return;
      card.title = payload.title;
      card.description = payload.description;
      card.images = payload.images;
    },
    deleteCard(state, action) {
      const { boardId, listId, cardId } = action.payload;
      const board = state.entities[boardId];
      if (!board) return;
      const list = board.lists.find((l) => l.id === listId);
      if (!list) return;
      list.cards = list.cards.filter((c) => c.id !== cardId);
    },
    applyDragResult(state, action) {
      const { boardId, event } = action.payload;
      const board = state.entities[boardId];
      if (!board) return;
      const next = reorderListsFromDrag(event, board.lists);
      if (next) {
        board.lists = next;
      }
    },
    touchRecent(state, action) {
      const { boardId } = action.payload;
      if (!state.entities[boardId]) return;
      state.recentIds = [boardId, ...state.recentIds.filter((id) => id !== boardId)].slice(0,8);
    },
    toggleFavorite(state, action) {
      const { boardId } = action.payload;
      if (!state.entities[boardId]) return;
      if (state.favoriteIds.includes(boardId)) {
        state.favoriteIds = state.favoriteIds.filter((id) => id !== boardId);
        return;
      }
      state.favoriteIds = [...state.favoriteIds, boardId];
    },
  },
});

export const {
  createBoard,
  deleteList,
  addList,
  addCard,
  updateCard,
  deleteCard,
  applyDragResult,
  touchRecent,
  toggleFavorite,
} = boardsSlice.actions;

export const selectBoardById = (state, boardId) =>
  state.boards.entities[boardId] ?? null;

export const selectAllBoards = (state) => Object.values(state.boards.entities);

export const selectRecentBoards = (state) =>
  state.boards.recentIds
    .map((id) => state.boards.entities[id])
    .filter(Boolean);

export const selectFavoriteBoards = (state) =>
  state.boards.favoriteIds
    .map((id) => state.boards.entities[id])
    .filter(Boolean);

export default boardsSlice.reducer;
