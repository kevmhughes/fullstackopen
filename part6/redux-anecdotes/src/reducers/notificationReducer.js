import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
    },
    clearNotification(state) {
      state.message = "";
    },
  },
});

let timeoutId;

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotificationWithTimeout = (message, duration) => (dispatch) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  dispatch(setNotification({ message }));

  timeoutId = setTimeout(() => {
    dispatch(clearNotification());
  }, duration * 1000); // Convert seconds to milliseconds
};

export default notificationSlice.reducer;
