import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
});

export const { setArticles } = articleSlice.actions;

export const profileArticleSlice = createSlice({
  name: "profileArticle",
  initialState: {
    articles: [],
  },
  reducers: {
    setProfileArticle: (state, action) => {
      state.articles = action.payload;
    },
  },
});

export const { setProfileArticle } = profileArticleSlice.actions;
