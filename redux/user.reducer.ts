import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "./store";
import IUser from "../types/IUser";


// Define a type for the slice state
interface UserState {
    currentUser: IUser
}

// Define the initial state using that type
const initialState: UserState = {
    currentUser: null
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setCurrentUser: (state, action: PayloadAction<any>) => {
            state.currentUser = action.payload
        }
    }
})

export const { setCurrentUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.currentUser

export default userSlice.reducer