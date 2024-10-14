import { configureStore } from '@reduxjs/toolkit'
import { userProfileSlice } from '../features/user/userSlice'

export const store = configureStore({
    reducer: {
        userProfile: userProfileSlice.reducer
    }
    
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


