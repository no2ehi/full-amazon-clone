import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface msgState {
    msg: string,
    type: string
}

interface DialogState {
    show: boolean,
    header: string,
    msgs: msgState[],
    // link: {
    //     link: string,
    //     link_text: string
    // }
}

const initialState: DialogState = {
    show: false,
    header: "",
    msgs: []
};

export const DialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        showDialog(state, action) {
            state.show = true;
            state.header = action.payload.header;
            state.msgs = action.payload.msgs;
        },
        hideDialog(state) {
            state.show = false;
            state.header = "";
            state.msgs = [];
        },
    }
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog;

export default DialogSlice.reducer;

