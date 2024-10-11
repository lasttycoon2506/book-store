import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { User } from '../../models/User'


interface UserState {
  value: User
}


const initialState: UserState = {
  value: {userName: '', name: '', email: '', phone: ''}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (state) => {
    //   state.value += 1
    },
    decrement: (state) => {
    //   state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    },
  },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.value

export default userSlice.reducer