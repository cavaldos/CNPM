import { createSlice } from "@reduxjs/toolkit";


export const settingSlice = createSlice({
    name: "setting",
    initialState: {
        language: 'en',
        theme: 'light',
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        }

    },

});

export const { setLanguage, setTheme } = settingSlice.actions;
export default settingSlice.reducer;
