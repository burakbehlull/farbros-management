import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null
    },
    reducers: {
        setStoreData: (state, action)=> {
            state?.data = action.payload
        },
        getStoreData: (state) => {
            return state?.data
        },
        clearStoreData: (state)=> {
            state?.data = null
        },
        
    }
})

export const { setStoreData, getStoreData, clearStoreData } = userSlice.actions
export default userSlice.reducer