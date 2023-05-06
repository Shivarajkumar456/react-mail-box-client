import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth";
import mailSlice from "./Mail";

const store = configureStore({
    reducer : {
        auth:authSlice,
        mail:mailSlice
    }
})
export default store;