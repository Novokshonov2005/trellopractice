import { reorderListsFromDrag } from "../components/board/boardDragHandler";
import { newId } from "../utils/newId";

const STORAGE_KEY = "tenma_boards";
const DELAY_MS = 350;

const EMPTY_STATE = {
  entities: {},
  recentIds: [],
  favoriteIds: [],
};

function delay(ms = DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function sanitizeState(raw) {
  if (!raw || typeof raw !== "object") return clone(EMPTY_STATE);
  const entities = raw.entities && typeof raw.entities === "object" ? raw.entities : {};
  const recentIds = Array.isArray(raw.recentIds) ? raw.recentIds : [];
  const favoriteIds = Array.isArray(raw.favoriteIds) ? raw.favoriteIds : [];
  return { entities, recentIds, favoriteIds };
}

function readStateSync() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(EMPTY_STATE);
    return sanitizeState(JSON.parse(raw));
  } catch {
    return clone(EMPTY_STATE);
  }
}

function writeStateSync(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function touchRecent(state, boardId) {
  state.recentIds = [boardId, ...state.recentIds.filter((id) => id !== boardId)].slice(0,8);
}

function createBoardMutation(state, { id, title }) {
  state.entities[id] = {
    id,
    title: title?.trim() || "",
    lists: [],
  };
  touchRecent(state, id);
}

function deleteBoardMutation(state, { boardId }) {
  if (!state.entities[boardId]) return;
  delete state.entities[boardId];
  state.recentIds = state.recentIds.filter((id) => id !== boardId);
  state.favoriteIds = state.favoriteIds.filter((id) => id !== boardId);
}

function addListMutation(state, { boardId, title }) {
  const board = state.entities[boardId];
  if (!board) return;
  board.lists.push({
    id: newId(),
    title: title.trim(),
    tint: "board",
    cards: [],
  });
}

function deleteListMutation(state, { boardId, listId }) {
  const board = state.entities[boardId];
  if (!board) return;
  board.lists = board.lists.filter((l) => l.id !== listId);
}

function addCardMutation(state, { boardId, listId, title, description, dueDate, images }) {
  const board = state.entities[boardId];
  if (!board) return;
  const list = board.lists.find((l) => l.id === listId);
  if (!list) return;
  list.cards.push({
    id: newId(),
    kind: "text",
    title: title.trim(),
    description: (description ?? "").trim(),
    dueDate: dueDate || "",
    images: Array.isArray(images) ? [...images] : [],
  });
}

function updateCardMutation(state, { boardId, listId, cardId, payload }) {
  const board = state.entities[boardId];
  if (!board) return;
  const list = board.lists.find((l) => l.id === listId);
  if (!list) return;
  const card = list.cards.find((c) => c.id === cardId);
  if (!card) return;
  card.title = payload.title;
  card.description = payload.description;
  card.dueDate = payload.dueDate || "";
  card.images = payload.images;
}

function deleteCardMutation(state, { boardId, listId, cardId }) {
  const board = state.entities[boardId];
  if (!board) return;
  const list = board.lists.find((l) => l.id === listId);
  if (!list) return;
  list.cards = list.cards.filter((c) => c.id !== cardId);
}

function applyDragMutation(state, { boardId, activeId, overId }) {
  const board = state.entities[boardId];
  if (!board || !overId) return;
  const next = reorderListsFromDrag(
    { active: { id: activeId }, over: { id: overId } },
    board.lists,
  );
  if (next) {
    board.lists = next;
  }
}

function toggleFavoriteMutation(state, { boardId }) {
  if (!state.entities[boardId]) return;
  if (state.favoriteIds.includes(boardId)) {
    state.favoriteIds = state.favoriteIds.filter((id) => id !== boardId);
    return;
  }
  state.favoriteIds = [...state.favoriteIds, boardId];
}

async function mutateAndPersist(mutator) {
  await delay();
  const state = readStateSync();
  mutator(state);
  writeStateSync(state);
  return clone(state);
}

export const boardsApi = {
  getSnapshotSync() {
    return readStateSync();
  },
  createBoard(payload) {
    return mutateAndPersist((state) => createBoardMutation(state, payload));
  },
  deleteBoard(payload) {
    return mutateAndPersist((state) => deleteBoardMutation(state, payload));
  },
  addList(payload) {
    return mutateAndPersist((state) => addListMutation(state, payload));
  },
  deleteList(payload) {
    return mutateAndPersist((state) => deleteListMutation(state, payload));
  },
  addCard(payload) {
    return mutateAndPersist((state) => addCardMutation(state, payload));
  },
  updateCard(payload) {
    return mutateAndPersist((state) => updateCardMutation(state, payload));
  },
  deleteCard(payload) {
    return mutateAndPersist((state) => deleteCardMutation(state, payload));
  },
  applyDrag(payload) {
    return mutateAndPersist((state) => applyDragMutation(state, payload));
  },
  touchRecent(payload) {
    return mutateAndPersist((state) => touchRecent(state, payload.boardId));
  },
  toggleFavorite(payload) {
    return mutateAndPersist((state) => toggleFavoriteMutation(state, payload));
  },
};
