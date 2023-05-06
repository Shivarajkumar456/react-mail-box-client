import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
 mails: []
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    add(state, action) {
        state.mails = [action.payload,...state.mails]
    }
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;