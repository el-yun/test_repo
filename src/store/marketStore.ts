import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentLanguage, CurrentSortType, CurrentSortUpDown, CurrenyType } from '~/interfaces/market'
import { RootState } from './root'

export interface marketState {
  currency: CurrenyType // 종목 (원화마켓, BTC마켓, USDT 마켓)
  currentLang: CurrentLanguage // 한글 / 영어 선택정보
  currentSortType: CurrentSortType // 현재가, 전일대비, 거래대금
  currentSortUpDown: CurrentSortUpDown // 올림 / 내림
  selectRow: string
}

export const initialState: marketState = {
  currency: 'KRW',
  currentLang: 'KO',
  currentSortType: 'tradecost',
  currentSortUpDown: 'down',
  selectRow: '',
}

const marketStoreSlice = createSlice({
  name: 'marketstore',
  initialState,
  reducers: {
    /** @description 종목 (원화마켓, BTC마켓, USDT 마켓) dispatch */
    setCurrencyType: (state, { payload }: PayloadAction<CurrenyType>) => {
      state.currency = payload
    },

    /** @description 한글 / 영어 선택 dispatch */
    setCurrentLanguage: (state, { payload }: PayloadAction<CurrentLanguage>) => {
      state.currentLang = payload
    },

    /** @description 현재가, 전일대비, 거래대금 선택 dispatch */
    setCurrentSortType: (state, { payload }: PayloadAction<CurrentSortType>) => {
      state.currentSortType = payload
    },

    /** @description 올림 / 내림 선택 dispatch */
    setChangeSortUpDown: (state, { payload }: PayloadAction<CurrentSortUpDown>) => {
      state.currentSortUpDown = payload
    },

    /** @description 테이블 선택 Row name dispatch */
    setSelectRow: (state, { payload }: PayloadAction<string>) => {
      state.selectRow = payload
    },
  },
})

const { actions, reducer } = marketStoreSlice
export const { setCurrencyType, setCurrentLanguage, setCurrentSortType, setChangeSortUpDown, setSelectRow } = actions
export const marketSelector = (state: RootState) => state.marketStore

export default reducer
