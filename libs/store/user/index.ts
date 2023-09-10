import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { Role } from '@haveyouseen-org/types'

export type UserSliceType = {
  uid?: string
  displayName?: string
  email?: string
  roles?: Role[]
  token?: string
  loaded: boolean
  app?: Role
}

export const userInitialState: UserSliceType = {
  loaded: false,
}
export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserSliceType>>) => ({
      ...state,
      ...action.payload,
      loaded: true,
    }),
    setApp: (state, action: PayloadAction<Role>) => ({
      ...state,
      app: action.payload,
    }),
    setDisplayName: (state, action: PayloadAction<string>) => ({
      ...state,
      displayName: action.payload,
    }),
    resetUser: () => ({ loaded: true }),
  },
})

export const { setUser, resetUser, setApp, setDisplayName } = userSlice.actions

export const selectUser = (state: RootState) => state.user
export const selectApp = (state: RootState) => state.user.app
export const selectUid = (state: RootState) => state.user.uid
export const selectDisplayName = (state: RootState) => state.user.displayName
export const selectUserRoles = (state: RootState) => state.user.roles

export const userReducer = userSlice.reducer
