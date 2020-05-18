import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "techs",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    techsRequested: (techs, action) => {
      techs.loading = true;
    },
    techRequestFailed: (techs, action) => {
      techs.loading = false;
    },
    techsReceived: (techs, action) => {
      techs.list = action.payload;
      techs.loading = false;
    },
    techAdded: (techs, action) => {
      techs.list.push(action.payload);
    },
  },
});

export default slice.reducer;

export const {
  techsRequested,
  techsReceived,
  techRequestFailed,
  techAdded,
} = slice.actions;

export const getTechs = () =>
  apiCallBegan({
    url: "/techs",
    onStart: techsRequested.type,
    onSuccess: techsReceived.type,
    onError: techRequestFailed.type,
  });

export const addTech = (tech) =>
  apiCallBegan({
    url: "/techs",
    method: "post",
    data: tech,
    onSuccess: techAdded.type,
  });

//   Selectors

export const selectTechs = (state) => state.entities.techs;
