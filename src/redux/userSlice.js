import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    name: "",
    Email: "",
    Pass: "",
    userName: "",
    Contact: "",
    array: [],
    LoginBool: false,
  },
  reducers: {
    signUP: (state, action) => {},
    signIN: (state, action) => {
      // setUserToken("abc");
      // setLoading(false);
      state.LoginBool = true;
      console.log("true2");
    },
    signOUT: (state, action) => {
      state.name = action.payload.name;
      state.Email = action.payload.Email;
      state.Pass = action.payload.pass;
      state.userName = action.payload.username;
      /// multiple users handling
      state.array.push({
        email: action.payload.Email,
        pass: action.payload.pass,
      });
    },
  },
});

export const { signIN, signOUT, Retrive } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
