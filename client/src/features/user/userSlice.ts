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
            state.value = action.payload
        },
    },
    selectors: {
        selectUserProfile: (userProfile) => userProfile.value,
    },
})

export const { save } = userProfileSlice.actions

export const { selectUserProfile } = userProfileSlice.selectors
