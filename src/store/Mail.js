import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
 mailData: [], count:0, changed: false, currentMail:[]
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
        state.count = action.payload.count;
        state.changed = !action.payload.changed;
    },
    editMail(state,action){
      state.changed = !state.changed;
      state.currentMail = action.payload.pageMail;
    }
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;