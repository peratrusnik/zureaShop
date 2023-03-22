import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const userSlicer = createSlice({
    name: 'user',
    // exported reducer
    initialState: initialState,
    // define all actions
    reducers: {
        saveUser(state, data) {
            // console.log(' save user', data.payload);
            state.user = data.payload
        },
        removeUser(state) {
            state.user = null
        }
    }
})

export const {saveUser, removeUser} = userSlicer.actions
export default userSlicer.reducer