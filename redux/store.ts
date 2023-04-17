import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux/es/exports';
import menuReducer from './slices/MenuSlice';
import dialogReducer from './slices/DialogSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        dialog: dialogReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;