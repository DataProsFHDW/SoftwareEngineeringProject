import { configureStore } from '@reduxjs/toolkit';
import CapacitorStorage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { todoReducerNew } from './todo/TodoSliceDemo';
import { todoSlice } from './todo/TodoSlice';

const reducers = combineReducers({
    todoReducer: todoReducerNew,
    todoReducerOld: todoSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage: CapacitorStorage, // default export is already instantiated
    stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;