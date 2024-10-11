import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { UserProfile } from '../../models/UserProfile'

interface UserProfileState {
    value: UserProfile
}

const initialState: UserProfileState = {
    value: { userName: '', name: '', email: '', phone: '' },
}

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        save: (state, action: PayloadAction<UserProfile>) => {
            state.value.userName = action.payload.userName
            state.value.name = action.payload.name
            state.value.email = action.payload.email
            state.value.phone = action.payload.phone
        },
    },
    selectors: {
        selectUserProfile: userProfile => userProfile.value,
      },
})

export const { save } = userProfileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserProfile = userProfileSlice.selectors

export default userProfileSlice.reducer
