import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice=createSlice({
    name:'Theme',
    initialState:{
        mode:'light',
    },
    reducers:{
        toggleTheme:(state)=>{
            // state.mode=!state.mode;
            state.mode=state.mode==='light'?'dark':'light'
        }
    }
})

export const {toggleTheme}=ThemeSlice.actions;
export default ThemeSlice.reducer;