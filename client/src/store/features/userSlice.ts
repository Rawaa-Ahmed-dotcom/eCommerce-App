
import { createSlice } from "@reduxjs/toolkit";
import type { ReduxState } from "../../utils/Types";

const storedToken = localStorage.getItem("accessToken");
const storedUser = localStorage.getItem("user");

const initialState : ReduxState = {
    user : storedUser ? JSON.parse(storedUser) : null,
    token : storedToken || null
}

const userSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setCredentials : (state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("accessToken" , state.token as string);
            localStorage.setItem("user", JSON.stringify(state.user));

        },
        logoutUser : (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            localStorage.removeItem("cartItems");
        }
    }
});

export const {setCredentials , logoutUser} = userSlice.actions;
export default userSlice.reducer;