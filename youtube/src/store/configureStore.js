import { configureStore } from '@reduxjs/toolkit'
import youtubeReducer from '../features/youtubee/youtubeSlice';

export const store = configureStore({
  reducer: {
    youtubeApp: youtubeReducer,
  },
})

export default store;