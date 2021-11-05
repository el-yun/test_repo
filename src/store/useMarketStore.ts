import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, MarketDispatch } from './root'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useMarketDispatch = () => useDispatch<MarketDispatch>()
export const useMarketSelector: TypedUseSelectorHook<RootState> = useSelector
