import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

// Reducer

const slice = createSlice({
  name: "logs",
  initialState: {
    list: [],
    loading: false,
    current: null,
    error: null,
  },
  reducers: {
    logsRequested: (logs, action) => {
      logs.loading = true;
    },
    logsRequestFailed: (logs, action) => {
      logs.loading = false;
    },
    logsReceived: (logs, action) => {
      logs.list = action.payload;
      logs.loading = false;
    },
    logAdded: (logs, action) => {
      logs.list.push(action.payload);
    },

    logDeleted: (logs, action) => {
      const index = logs.list.findIndex((log) => log.id === action.payload);
      logs.list.splice(index, 1);
    },

    logEdited: (logs, action) => {
      const index = logs.list.findIndex((log) => log.id === action.payload.id);
      logs.list[index] = action.payload;
    },

    currentAdded: (logs, action) => {
      logs.current = action.payload;
    },
  },
});

export const {
  logsRequested,
  logsReceived,
  logAdded,
  logsRequestFailed,
  logDeleted,
  currentAdded,
  logEdited,
} = slice.actions;

export default slice.reducer;

const url = "/logs";

export const getLogs = () =>
  apiCallBegan({
    url,
    onStart: logsRequested.type,
    onSuccess: logsReceived.type,
    onError: logsRequestFailed.type,
  });

export const addBug = (log) =>
  apiCallBegan({
    url,
    method: "post",
    onSuccess: logAdded.type,
    data: log,
  });

export const deleteBug = (id) =>
  apiCallBegan({
    url: `/logs/${id}`,
    method: "delete",
    onSuccess: logDeleted.type,
  });

export const editBug = (log) =>
  apiCallBegan({
    url: `/logs/${log.id}`,
    method: "put",
    data: log,
    onSuccess: logEdited.type,
  });

// Selectors

export const selectCurrent = (state) => state.entities.logs.current;
