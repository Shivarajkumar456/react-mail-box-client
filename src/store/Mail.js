import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
 mailData: []
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    add(state, action) {
        state.mailData = [action.payload,...state.mailData]
    },
    replaceMails(state,action){
        state.mailData = action.payload.mailData;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;