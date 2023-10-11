import { User } from "@/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLogin: boolean;
  user: User | null;
}

const initialState: InitialState = {
  isLogin:
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("isLogin") as string)
      : false,
  user:
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIslogin: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("isLogin", JSON.stringify(action.payload));
      state.isLogin = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { setIslogin, setUser } = userSlice.actions;

export default userSlice.reducer;
