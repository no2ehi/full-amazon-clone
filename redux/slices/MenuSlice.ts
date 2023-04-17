import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface menuState {
    menuOpened: boolean,
    menuDashboardSidebar: Boolean
}

const initialState: menuState = {
    menuOpened: false,
    menuDashboardSidebar: false
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
        },
        toggleSidebar: (state) => {
            state.menuDashboardSidebar = !state.menuDashboardSidebar;
        }
    }

})

export const { openMenu, closeMenu, toggleSidebar } = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu.menuOpened;
export const selectMenuSidebarDashboard = (state: RootState) => state.menu.menuDashboardSidebar;

export default menuSlice.reducer;

