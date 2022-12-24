import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userSlice } from "./slice/user";
import { articleSlice } from "./slice/article";
import { profileArticleSlice } from "./slice/article";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  currentUser: userSlice.reducer,
  articles: articleSlice.reducer,
  profileArticle: profileArticleSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export const persistor = persistStore(store);
