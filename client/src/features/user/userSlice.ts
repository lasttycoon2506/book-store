import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { UserProfile } from '../../models/UserProfile'


interface UserProfileState {
  value: UserProfile
}


const initialState: UserProfileState = {
  value: {userName: '', name: '', email: '', phone: ''}
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    save: (state) => {
      state.value 
    },
    decrement: (state) => {
      state.value 
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = userProfileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.userProfile.value

export default userProfileSlice.reducer