import { configureStore } from '@reduxjs/toolkit'
import { messageApi } from './api/messageApi'
import { authApi } from './api/authApi'
import likeSlice from './slices/likeSlice'
import jwtSlice from './slices/jwtSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import { commentApi } from './api/commentApi'


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, jwtSlice);

export const store = configureStore({
  
  reducer: 
 
  {
    jwt:persistedReducer,
    like:likeSlice,
    [messageApi.reducerPath]: messageApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }).concat(messageApi.middleware,authApi.middleware,commentApi.middleware),
})
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch