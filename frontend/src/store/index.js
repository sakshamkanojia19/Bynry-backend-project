import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import serviceRequestReducer from "./serviceRequestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    serviceRequests: serviceRequestReducer,
  },
});

export default store;
