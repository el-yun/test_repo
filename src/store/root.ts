import { combineReducers, configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { ThunkAction } from 'redux-thunk'
import marketStore from './marketStore'

const rootReducer = combineReducers({
  marketStore,
})

const logMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof rootReducer>
export type MarketDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
export default store
