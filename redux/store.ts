import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import userReducer from "./user.reducer";
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'
import {api} from "./api.slice";
// ...
const reducers = combineReducers({
    user: userReducer,
    [api.reducerPath]: api.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'] // categories will not be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers)


const store = configureStore({
    reducer: persistedReducer,
    middleware:  [/*logger,*/ thunk, api.middleware],
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch