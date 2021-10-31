import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentLanguage, CurrentSortType, CurrentSortUpDown, CurrenyType } from '~/interfaces/market'
import { RootState } from './root'

export interface marketState {
  currency: CurrenyType
  currentLang: CurrentLanguage
  currentSortType: CurrentSortType
  currentSortUpDown: CurrentSortUpDown
}

export const initialState: marketState = {
  currency: 'KRW',
  currentLang: 'KO',
  currentSortType: 'tradecost',
  currentSortUpDown: 'down',
}

const marketStoreSlice = createSlice({
  name: 'marketstore',
  initialState,
  reducers: {
    setCurrencyType: (state, { payload }: PayloadAction<CurrenyType>) => {
      state.currency = payload
    },
    setCurrentLanguage: (state, { payload }: PayloadAction<CurrentLanguage>) => {
      state.currentLang = payload
    },
    setCurrentSortType: (state, { payload }: PayloadAction<CurrentSortType>) => {
      state.currentSortType = payload
    },
    setChangeSortUpDown: (state, { payload }: PayloadAction<CurrentSortUpDown>) => {
      state.currentSortUpDown = payload
    },
  },
})

const { actions, reducer } = marketStoreSlice
export const { setCurrencyType, setCurrentLanguage, setCurrentSortType, setChangeSortUpDown } = actions
export const marketSelector = (state: RootState) => state.marketStore

export default reducer
