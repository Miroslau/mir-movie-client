import { actorSliceState } from "../../types/actor-type";
import StatusEnum from "../../enums/status-enum";
import { createSlice } from "@reduxjs/toolkit";
import { fetchActors } from "../actions/fetch-actors";
import { RootState } from "../store";

const initialState: actorSliceState = {
  errorMessage: "",
  actors: [],
  totalActors: 0,
  totalPages: 0,
  status: StatusEnum.LOADING,
};

export const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {
    setActor(state, { payload }) {
      state.actors.push({ ...payload });
    },
    setStatus(state, { payload }) {
      state.status = payload;
    },
    clearState(state) {
      state.actors = [];
      state.totalActors = 0;
      state.totalPages = 0;
      state.errorMessage = "";
      state.status = StatusEnum.LOADING;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActors.pending, (state, { payload }) => {
      state.status = StatusEnum.LOADING;
      state.actors = [];
      state.totalActors = 0;
      state.totalPages = 0;
    });

    builder.addCase(fetchActors.fulfilled, (state, { payload }) => {
      state.actors = payload?.results;
      state.totalActors = payload?.total;
      state.totalPages = payload?.page_total;
      state.status = StatusEnum.SUCCESS;
    });

    builder.addCase(fetchActors.rejected, (state, { payload }) => {
      state.status = StatusEnum.ERROR;
      state.actors = [];
      state.totalActors = 0;
      state.totalPages = 0;
      state.errorMessage = payload;
    });
  },
});

export const { setActor, clearState, setStatus } = actorSlice.actions;

export const actorSelector = (state: RootState) => state.actor;
