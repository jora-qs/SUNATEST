import { configureStore } from "@reduxjs/toolkit";
import InfoReducer from "../ServerInfo";

export default configureStore({
  reducer: {
    information: InfoReducer
  }
});
