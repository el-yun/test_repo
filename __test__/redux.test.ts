import store from '../src/store/root'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  setChangeSortUpDown,
  setCurrencyType,
  setCurrentLanguage,
  setCurrentSortType,
  setSelectRow,
} from '../src/store/marketStore'
import { CurrentLanguage, CurrentSortUpDown, CurrenyType } from '../src/interfaces/market'

describe('redux', () => {
  describe('reducer', () => {
    it('원화 KRW 종목을 선택 할 수 있다.', () => {
      const result: PayloadAction<CurrenyType> = store.dispatch(setCurrencyType('KRW'))
      expect(result).toEqual({
        type: 'marketstore/setCurrencyType',
        payload: 'KRW',
      })
    })

    it('BTC 종목을 선택 할 수 있다.', () => {
      const result: PayloadAction<CurrentSortUpDown> = store.dispatch(setCurrencyType('BTC'))
      expect(result).toEqual({
        type: 'marketstore/setCurrencyType',
        payload: 'BTC',
      })
    })

    it('USDT 종목을 선택 할 수 있다.', () => {
      const result: PayloadAction<CurrentSortUpDown> = store.dispatch(setCurrencyType('USDT'))
      expect(result).toEqual({
        type: 'marketstore/setCurrencyType',
        payload: 'USDT',
      })
    })

    it('한글명으로 변경 선택 할 수 있다.', () => {
      const result: PayloadAction<CurrentLanguage> = store.dispatch(setCurrentLanguage('KO'))
      expect(result).toEqual({
        type: 'marketstore/setCurrentLanguage',
        payload: 'KO',
      })
    })

    it('영문명으로 변경 선택 할 수 있다.', () => {
      const result: PayloadAction<CurrentLanguage> = store.dispatch(setCurrentLanguage('EN'))
      expect(result).toEqual({
        type: 'marketstore/setCurrentLanguage',
        payload: 'EN',
      })
    })

    //'price' | 'percent' | 'tradecost' // 현재가, 전일대비, 거래대금
    it('현재가 순 정렬을 선택 할 수 있다.', () => {
      const result: PayloadAction<CurrentLanguage> = store.dispatch(setCurrentSortType('price'))
      expect(result).toEqual({
        type: 'marketstore/setCurrentSortType',
        payload: 'price',
      })
    })

    it('전일대비 퍼센트 순 정렬을 선택 할 수 있다.', () => {
      const result: PayloadAction<CurrentLanguage> = store.dispatch(setCurrentSortType('percent'))
      expect(result).toEqual({
        type: 'marketstore/setCurrentSortType',
        payload: 'percent',
      })
    })

    it('거래대금 순 정렬을 선택 할 수 있다.', () => {
      const result: PayloadAction<CurrentLanguage> = store.dispatch(setCurrentSortType('tradecost'))
      expect(result).toEqual({
        type: 'marketstore/setCurrentSortType',
        payload: 'tradecost',
      })
    })

    it('올림순 선택을 dispatch 할 수 있다.', () => {
      const result: PayloadAction<CurrentSortUpDown> = store.dispatch(setChangeSortUpDown('up'))
      expect(result).toEqual({
        type: 'marketstore/setChangeSortUpDown',
        payload: 'up',
      })
    })

    it('내림순 선택을 dispatch 할 수 있다.', () => {
      const result: PayloadAction<CurrentSortUpDown> = store.dispatch(setChangeSortUpDown('down'))
      expect(result).toEqual({
        type: 'marketstore/setChangeSortUpDown',
        payload: 'down',
      })
    })

    it('선택한 Table Row를 name값을 dispatch 할 수 있다.', () => {
      const result: PayloadAction<string> = store.dispatch(setSelectRow('test-market'))
      expect(result).toEqual({
        type: 'marketstore/setSelectRow',
        payload: 'test-market',
      })
    })
  })
})
