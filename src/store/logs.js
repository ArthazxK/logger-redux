import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, apiCallSuccess, apiCallFailed } from "./api";

// Reducer

const slice = createSlice({
  name: "logs",
  initialState: {
    list: [],
    loading: false,
    current: null,
    lastFetch: null,
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
      logs.lastFetch = Date.now();
    },
    logAdded: (logs, action) => {
      logs.list.push(action.payload);
    },

    logDeleted: (logs, action) => {
      const index = logs.list.findIndex((log) => log.id === action.payload);
      logs.list.splice(index, 1);
    },
  },
});

export const {
  logsRequested,
  logsReceived,
  logAdded,
  logsRequestFailed,
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

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    onSuccess: logAdded.type,
    data: bug,
  });
