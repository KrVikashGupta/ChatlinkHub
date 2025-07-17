import { createSlice } from "@reduxjs/toolkit";

interface DialogState {
  isOpen: boolean;
}

const initialState: DialogState = {
  isOpen: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
