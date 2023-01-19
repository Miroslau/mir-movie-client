import FilterType from "../../types/filter-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: FilterType = {
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterType>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.currentPage = 1;
      }
    },
  },
});

export const { setCurrentPage, setFilters } = filterSlice.actions;

export const filterSelector = (state: RootState) => state.filters;
