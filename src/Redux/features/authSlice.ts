import { User } from "@/model/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";

type initialState = {
    user: User | null;
    isAuth: boolean;
};
const initialState = {
    user: null,
    isAuth: false,
} as initialState;
export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        loginRedux: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        logoutRedux: (state) => {
            return initialState;
        },
    },
});
export const { loginRedux, logoutRedux } = auth.actions;
export default auth.reducer;
