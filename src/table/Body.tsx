import React, { useCallback, useEffect, useState } from 'react'
import { useMarkets, useTicker } from '~/api/query'
import { CurrentSortType, CurrentSortUpDown, Market, Ticker } from '~/interfaces/market'
import { useMarketSelector } from '~/store/useMarketStore'
import { getPropertyName } from '~/util/util'
import Row from './row/Row'

const Body = () => {
  const [selectMarket, setSelectMarket] = useState('')
  const { currency, currentSortType, currentSortUpDown } = useMarketSelector((state) => state.marketStore)
  const { error: fetchMarketError, data: marketData } = useMarkets()
  const { error: fetchTickerError, data: tickerData, refetch: fireFetchTicker } = useTicker(selectMarket)

  useEffect(() => {
    if (currency && marketData && marketData.length > 0) selectFilterCurrency(marketData)
  }, [currency, marketData])

  // 원화마켓, BTC마켓, USDT 마켓 선택시 해당하는 마켓 정보 API 요청
  useEffect(() => {
    if (selectMarket.length > 0) fireFetchTicker()
  }, [selectMarket])

  // 정렬 타입 state가 변경되면 재렌더링한다.
  useEffect(() => {
    if (tickerData) doRendering()
  }, [currentSortType])

  // 내림/올림 순 state가 변경되면 재렌더링한다.
  useEffect(() => {
    if (tickerData) doRendering()
  }, [currentSortUpDown])

  /**
   * @description 코인 종목 탭 클릭시 해당하는 종목으로 목록 filter
   * @param {Market[]} market
   */
  const selectFilterCurrency = (market: Market[]) => {
    //market: "KRW-BTC" 구분자로 나눈 후 첫번째 인자를 가지고 구분
    const filterCurrency = market.filter((item) => {
      const split = item.market.split('-')
      return split[0] === currency
    })

    setSelectMarket(filterCurrency.map((item) => item.market).join(', '))
  }

  /**
   * @description 각 프로퍼티명에 해당하는 정보에 따라 store value에 따른 올림/내림 차순 정렬
   **/
  const sortTicker = useCallback(
    (ticker: Ticker[], sortType: CurrentSortType, upDown: CurrentSortUpDown) => {
      const propertyName = getPropertyName(sortType)

      return ticker.sort((a: Ticker, b: Ticker) => {
        let aValue: number = 0
        let bValue: number = 0

        if (propertyName === 'change_rate') {
          // 1. 초기값이 음수 정수에 대한 표현이 없기때문에 change값이 FALL에 해당할때 음수로 처리하여 sort
          if (a.change === 'FALL') aValue = a[propertyName] * -1
          else aValue = a[propertyName]

          if (b.change === 'FALL') bValue = b[propertyName] * -1
          else bValue = b[propertyName]

          // 1-1. 값이 동일한 경우 한글 기준으로 오름차순
          if (aValue === bValue) return hangleSort(a.market, b.market)
          else return upDown === 'up' ? aValue - bValue : bValue - aValue
        } else {
          // 그외 동일한 경우 한글순으로 그외는 올림내림차순 정렬
          if (a[propertyName] === b[propertyName]) return hangleSort(a.market, b.market)
          else return upDown === 'up' ? a[propertyName] - b[propertyName] : b[propertyName] - a[propertyName]
        }
      })
    },
    [tickerData]
  )

  /**
   * @description 한글이름순 정렬
   * @param aName
   * @param bName
   */
  const hangleSort = (aName: string, bName: string) => {
    let findMarketNameA = marketData.find((item) => item.market === aName)
    let findMarketNameB = marketData.find((item) => item.market === bName)
    return findMarketNameA < findMarketNameB ? -1 : findMarketNameA > findMarketNameB ? 1 : 0
  }

  /**
   * 종목 / sort type / 올림내림 / ticker 가 변경될때 컴포넌트를 리렌더링 한다.
   */
  const doRendering = useCallback(() => {
    if (tickerData && tickerData.length > 0) {
      const sortTickerList = sortTicker(tickerData, currentSortType, currentSortUpDown)

      return sortTickerList.map((tickerItem, idx) => {
        const findMarketInfo = marketData.find((marketItem) => marketItem.market === tickerItem.market)
        return <Row key={idx} marketInfo={findMarketInfo} ticker={tickerItem}></Row>
      })
    }
  }, [currency, currentSortType, currentSortUpDown, tickerData])

  return (
    <>
      {fetchMarketError || fetchTickerError ? (
        <div className="error-box">
          <span>통신 중 오류가 발생하였습니다 :(</span>
        </div>
      ) : (
        <div className="scrollB">
          <table className="ty01">
            <colgroup>
              <col width="29" />
              <col width="*" />
              <col width="23%" />
              <col width="19%" />
              <col width="26%" />
            </colgroup>
            <tbody>{doRendering()}</tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Body
