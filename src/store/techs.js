import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "techs",
  initialState: {
    list: [],
    currentTech: null,
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
    techDeleted: (techs, action) => {
      const index = techs.list.findIndex((tech) => tech.id === action.payload);
      techs.list.splice(index, 1);
    },
    techLoggedIn: (techs, action) => {
      techs.currentTech = action.payload;
    },
    techRegistered: (techs, action) => {
      techs.currentTech = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  techsRequested,
  techsReceived,
  techRequestFailed,
  techAdded,
  techDeleted,
  techLoggedIn,
  techRegistered,
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

export const deleteTech = (id) =>
  apiCallBegan({
    url: `techs/${id}`,
    method: "delete",
    onSuccess: techDeleted.type,
  });

//   Selectors

export const selectTechs = (state) => state.entities.techs;

export const selectTechsList = (state) => state.entities.techs.list;

export const selectCurrentTech = (state) => state.entities.techs.currentTech;
