import {configureStore} from "@reduxjs/toolkit"
import ThemeSlice from "./Slices/ThemeSlice";

const Store=configureStore({
    reducer:{
        Theme:ThemeSlice,
    },
});

export default Store;