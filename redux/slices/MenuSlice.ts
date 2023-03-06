import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface menuState {
    menuOpened: boolean
}

const initialState: menuState = {
    menuOpened: false
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        openMenu: (state) => {
            state.menuOpened = true;
        },
        closeMenu: (state) => {
            state.menuOpened = false;
        }
    }

})

export const { openMenu, closeMenu } = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu.menuOpened;

export default menuSlice.reducer;

