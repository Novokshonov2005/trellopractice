import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { boardsApi } from "../api/boardsApi";

const initialSnapshot = boardsApi.getSnapshotSync();

const initialState = {
  ...initialSnapshot,
  status: "idle",
  error: null,
};

export const createBoardAsync = createAsyncThunk(
  "boards/createBoardAsync",
  async (payload) => boardsApi.createBoard(payload),
);
export const addListAsync = createAsyncThunk("boards/addListAsync", async (payload) =>
  boardsApi.addList(payload),
);
export const deleteListAsync = createAsyncThunk(
  "boards/deleteListAsync",
  async (payload) => boardsApi.deleteList(payload),
);
export const addCardAsync = createAsyncThunk("boards/addCardAsync", async (payload) =>
  boardsApi.addCard(payload),
);
export const updateCardAsync = createAsyncThunk(
  "boards/updateCardAsync",
  async (payload) => boardsApi.updateCard(payload),
);
export const deleteCardAsync = createAsyncThunk(
  "boards/deleteCardAsync",
  async (payload) => boardsApi.deleteCard(payload),
);
export const applyDragResultAsync = createAsyncThunk(
  "boards/applyDragResultAsync",
  async (payload) => boardsApi.applyDrag(payload),
);
export const touchRecentAsync = createAsyncThunk(
  "boards/touchRecentAsync",
  async (payload) => boardsApi.touchRecent(payload),
);
export const toggleFavoriteAsync = createAsyncThunk(
  "boards/toggleFavoriteAsync",
  async (payload) => boardsApi.toggleFavorite(payload),
);

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const pending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const rejected = (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Ошибка операции";
    };
    const fulfilled = (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.entities = action.payload.entities;
      state.recentIds = action.payload.recentIds;
      state.favoriteIds = action.payload.favoriteIds;
    };

    builder
      .addCase(createBoardAsync.pending, pending)
      .addCase(createBoardAsync.rejected, rejected)
      .addCase(createBoardAsync.fulfilled, fulfilled)
      .addCase(addListAsync.pending, pending)
      .addCase(addListAsync.rejected, rejected)
      .addCase(addListAsync.fulfilled, fulfilled)
      .addCase(deleteListAsync.pending, pending)
      .addCase(deleteListAsync.rejected, rejected)
      .addCase(deleteListAsync.fulfilled, fulfilled)
      .addCase(addCardAsync.pending, pending)
      .addCase(addCardAsync.rejected, rejected)
      .addCase(addCardAsync.fulfilled, fulfilled)
      .addCase(updateCardAsync.pending, pending)
      .addCase(updateCardAsync.rejected, rejected)
      .addCase(updateCardAsync.fulfilled, fulfilled)
      .addCase(deleteCardAsync.pending, pending)
      .addCase(deleteCardAsync.rejected, rejected)
      .addCase(deleteCardAsync.fulfilled, fulfilled)
      .addCase(applyDragResultAsync.pending, pending)
      .addCase(applyDragResultAsync.rejected, rejected)
      .addCase(applyDragResultAsync.fulfilled, fulfilled)
      .addCase(touchRecentAsync.pending, pending)
      .addCase(touchRecentAsync.rejected, rejected)
      .addCase(touchRecentAsync.fulfilled, fulfilled)
      .addCase(toggleFavoriteAsync.pending, pending)
      .addCase(toggleFavoriteAsync.rejected, rejected)
      .addCase(toggleFavoriteAsync.fulfilled, fulfilled);
  },
});

export const selectBoardById = (state, boardId) =>
  state.boards.entities[boardId] ?? null;

const selectBoardEntities = (state) => state.boards.entities;
const selectRecentIds = (state) => state.boards.recentIds;
const selectFavoriteIds = (state) => state.boards.favoriteIds;

export const selectAllBoards = createSelector([selectBoardEntities], (entities) =>
  Object.values(entities),
);

export const selectRecentBoards = createSelector(
  [selectRecentIds, selectBoardEntities],
  (recentIds, entities) => recentIds.map((id) => entities[id]).filter(Boolean),
);

export const selectFavoriteBoards = createSelector(
  [selectFavoriteIds, selectBoardEntities],
  (favoriteIds, entities) => favoriteIds.map((id) => entities[id]).filter(Boolean),
);

export default boardsSlice.reducer;
