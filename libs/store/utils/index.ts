/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationType } from '@haveyouseen-org/types'

import { RootState } from '..'

export type UtilSliceType = {
  notifications: NotificationType[]
  victimName?: string
  victimPic?: string
}

const initialState: UtilSliceType = {
  notifications: [],
}

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<UtilSliceType['notifications'][number]>,
    ) => {
      state.notifications = [...state.notifications, action.payload]
    },
    removeNotification: (
      state,
      action: PayloadAction<UtilSliceType['notifications'][number]['id']>,
    ) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload,
      )
    },
    resetNotification: (state) => {
      state.notifications = []
    },
    setVictimName: (state, action: PayloadAction<string>) => {
      state.victimName = action.payload
    },
    setVictimPic: (state, action: PayloadAction<string>) => {
      state.victimPic = action.payload
    },
  },
})

export const {
  addNotification,
  removeNotification,
  resetNotification,
  setVictimName,
  setVictimPic,
} = utilsSlice.actions

export const selectNotifications = (state: RootState) =>
  state.utils.notifications
export const selectVictimName = (state: RootState) => state.utils.victimName
export const selectVictimPic = (state: RootState) => state.utils.victimPic

export const utilsReducer = utilsSlice.reducer
