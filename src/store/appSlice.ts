import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AppState {
  searchValue: string,
  allUsers: any,
  selectedMessageUser: any,
  isNotification: boolean,
}

// Initial state
const initialState: AppState = {
  searchValue: "",
  allUsers: [],
  selectedMessageUser: null,
  isNotification: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearchValueState : (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<any>) => {
      state.allUsers = action.payload;
    },
    setSelectedMessageUser: (state, action: PayloadAction<any>) => {
      state.selectedMessageUser = action.payload;
    },
    setIsNotification: (state, action: PayloadAction<any>) => {
      state.isNotification = action.payload;
    },
  },
});

export const { setSearchValueState, setAllUsers, setSelectedMessageUser, setIsNotification } = appSlice.actions;
export const appReducer = appSlice.reducer;
