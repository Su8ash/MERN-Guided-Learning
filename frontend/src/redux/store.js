import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";

const Store = configureStore({
    reducer: {
        userStore: userReducer,
    },
});

export default Store;