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
    link: {
        link: string,
        link_text: string
    }
}

const initialState: DialogState = {
    show: false,
    header: "error creating product",
    msgs: [
        {
            msg: "choose atleast 2 images",
            type: "error"
        },
        {
            msg: "choose atleast 2 images",
            type: "success"
        },
    ],
    link: {
        link: "",
        link_text: "",
    }
};

export const DialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        showDialog(state, action) {
            state.show = true;
            state.header = action.payload.header;
            state.msgs = action.payload.msgs;
            state.link = action.payload.link;
        },
        hideDialog(state) {
            state.show = false;
            state.header = "";
            state.msgs = [];
            state.link = {};
            // state.link.link = "";
            // state.link.link_text = "";
        },
    }
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog;

export default DialogSlice.reducer;

