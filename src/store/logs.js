import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

// Reducer

const slice = createSlice({
  name: "logs",
  initialState: {
    list: [],
    searchLog: null,
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
      logs.error = action.payload;
    },
    logsReceived: (logs, action) => {
      logs.list = action.payload;
      logs.loading = false;
    },
    logAdded: (logs, action) => {
      logs.list.push(action.payload);
    },

    logDeleted: (logs, action) => {
      const index = logs.list.findIndex(
        (log) => log._id === action.payload._id
      );
      logs.list.splice(index, 1);
    },

    logEdited: (logs, action) => {
      const index = logs.list.findIndex(
        (log) => log._id === action.payload._id
      );
      logs.list[index] = action.payload;
    },

    logSearched: (logs, action) => {
      logs.searchLog = action.payload;
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
  logSearched,
} = slice.actions;

export default slice.reducer;

const url = "http://localhost:8000/api/logs";

export const getLogs = () =>
  apiCallBegan({
    url,
    onStart: logsRequested.type,
    onSuccess: logsReceived.type,
    onError: logsRequestFailed.type,
  });

export const addLog = (log) =>
  apiCallBegan({
    url,
    method: "post",
    onSuccess: logAdded.type,
    data: log,
  });

export const deleteLog = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "delete",
    onSuccess: logDeleted.type,
  });

export const editLog = (log) =>
  apiCallBegan({
    url: `${url}/${log._id}`,
    method: "put",
    data: {
      tech: log.tech,
      message: log.message,
      attention: log.attention,
    },
    onSuccess: logEdited.type,
  });

// Selectors

export const selectCurrent = (state) => state.entities.logs.current;

export const logsSelector = (state) => state.entities.logs;
