import { configureStore,combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import menuReducer from "./slices/MenuSlice";
import dialogReducer from "./slices/DialogSlice";
import cartReducer from "./slices/CartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    menu: menuReducer,
    dialog: dialogReducer,
    cart: cartReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export const persistor = persistStore(store)
