import React, { useCallback, useEffect, useState } from 'react'
import CSS from 'csstype'
import { useMarkets, useTicker } from '~/api/query'
import { CurrentSortType, CurrentSortUpDown, CurrenyType, Market, Ticker } from '~/interfaces/market'
import { useMarketSelector } from '~/store/useMarketStore'
import Row from './row/Row'

const lineStyle: CSS.Properties = {
  top: '10px',
  height: '40%',
}

const boxStyle: CSS.Properties = {
  top: '12px',
  height: '4px',
}
const barUpLineStyle: CSS.Properties = {
  top: '0px',
  height: '50%',
}
const barUpBoxStyle: CSS.Properties = {
  top: '0px',
  height: '12.5px',
}

const upLineStyle: CSS.Properties = {
  top: '10px',
  height: '20%',
}
const upBoxStyle: CSS.Properties = {
  top: '12px',
  height: '1px',
}

interface Props {}

const Body = (props: Props) => {
  const [searchKey, setSearchKey] = useState('')
  const { currency, currentSortType, currentSortUpDown } = useMarketSelector((state) => state.marketStore)
  const { isLoading, error: fetchError, data: marketData } = useMarkets()

  const {
    isLoading: isTickerLoading,
    error: fetchTickerError,
    data: tickerData,
    refetch: fireFetchTicker,
  } = useTicker(searchKey)

  useEffect(() => {
    if (currency && marketData && marketData.length > 0) selectFilterCurrency(marketData)
  }, [currency, marketData])

  useEffect(() => {
    if (searchKey.length > 0) fireFetchTicker()
  }, [searchKey])

  useEffect(() => {
    if (tickerData) doRendering()
  }, [currentSortType])

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

    console.log('filterCurrency:', filterCurrency)
    // console.log('ticker :', tickerData)

    const str = filterCurrency.map((item) => item.market).join(', ')
    console.log('set Search key :', str)
    setSearchKey(str)
    // setList(filterCurrency)
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
          // 초기값이 음수 정수에 대한 표현이 없기때문에 change값이 FALL에 해당할때 음수로 처리하여 sort
          if (a.change === 'FALL') aValue = a[propertyName] * -1
          else aValue = a[propertyName]

          if (b.change === 'FALL') bValue = b[propertyName] * -1
          else bValue = b[propertyName]

          // 값이 동일한 경우 한글 기준으로 오름차순
          if (aValue === bValue) {
            return hangleSort(a.market, b.market)
          } else {
            return upDown === 'up' ? aValue - bValue : bValue - aValue
          }
        } else {
          if (a[propertyName] === b[propertyName]) {
            return hangleSort(a.market, b.market)
          } else {
            return upDown === 'up' ? a[propertyName] - b[propertyName] : b[propertyName] - a[propertyName]
          }
        }
      })
    },
    [tickerData]
  )

  /**
   * @description 한글이름순 정렬
   * @param aName
   * @param bName
   * @returns
   */
  const hangleSort = (aName: string, bName: string) => {
    let findMarketNameA = marketData.find((item) => item.market === aName)
    let findMarketNameB = marketData.find((item) => item.market === bName)
    return findMarketNameA < findMarketNameB ? -1 : findMarketNameA > findMarketNameB ? 1 : 0
  }

  //

  /**
   * @description store의 현재가, 전일대비, 거래대금 분류 값과 비교하여 ticker 데이터의 property 명을 찾는다.
   * @param {CurrentSortType} sortType
   */
  const getPropertyName = (sortType: CurrentSortType) => {
    //현재가, 전일대비, 거래대금
    //trade_price / change_rate / acc_trade_price_24h
    switch (sortType) {
      case 'price':
        return 'trade_price'
      case 'percent':
        return 'change_rate'
      case 'tradecost':
        return 'acc_trade_price_24h'
      default:
        return 'trade_price'
    }
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
    <div className="scrollB">
      <table className="ty01">
        <colgroup>
          <col width="29" />
          <col width="*" />
          <col width="23%" />
          <col width="19%" />
          <col width="26%" />
        </colgroup>
        <tbody>
          {doRendering()}
          {/* <tr>
            <td className="bar">
              <div className="bar up">
                <span className="line" style={lineStyle}>
                  -
                </span>
                <span className="box" style={boxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong>비트코인</strong>
              <em>BTC/KRW</em>
            </td>
            <td className="price">
              <strong>56,781,234</strong>
            </td>
            <td className="percent">
              <p>0.00%</p>
            </td>
            <td className="tradecost">
              <p>
                32,898<i>백만</i>
              </p>
            </td>
          </tr>
          
          <tr className="up">
            <td className="bar">
              <div className="bar up">
                <span className="line" style={barUpLineStyle}>
                  -
                </span>
                <span className="box" style={barUpBoxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong>에이다</strong>
              <em>ADA/KRW</em>
            </td>
            <td className="price">
              <strong>200</strong>
            </td>
            <td className="percent">
              <p>100.00%</p>
            </td>
            <td className="tradecost">
              <p>2,804,983</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="down">
                <span className="line" style={lineStyle}>
                  -
                </span>
                <span className="box" style={boxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong>비트코인캐시</strong>
              <em>BTC/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>122.68%</p>
            </td>
            <td className="tradecost">
              <p>864,261</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="up">
                <span className="line" style={lineStyle}>
                  -
                </span>
                <span className="box" style={boxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong>아인스타이늄</strong>
              <em>EMC2/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>512.81%</p>
            </td>
            <td className="tradecost">
              <p>267,429</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="bar up">
                <span className="line" style={lineStyle}>
                  -
                </span>
                <span className="box" style={boxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong>비트코인</strong>
              <em>BTC/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>322.32%</p>
            </td>
            <td className="tradecost">
              <p>32,168,898</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="">
                <span className="line" style={upLineStyle}>
                  -
                </span>
                <span className="box" style={upBoxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong>에이다</strong>
              <em>ADA/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>62.48%</p>
            </td>
            <td className="tradecost">
              <p>2,804,983</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="down">
                <span className="line" style={lineStyle}>
                  -
                </span>
                <span className="box" style={boxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong>비트코인캐시</strong>
              <em>BTC/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>122.68%</p>
            </td>
            <td className="tradecost">
              <p>864,261</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="up">
                <span className="line" style={lineStyle}>
                  -
                </span>
                <span className="box" style={boxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong>아인스타이늄</strong>
              <em>EMC2/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>512.81%</p>
            </td>
            <td className="tradecost">
              <p>267,429</p>
            </td>
          </tr>
          <tr className="down">
            <td className="bar">
              <div className="down">
                <span className="line" style={lineStyle}>
                  -
                </span>
                <span className="box" style={boxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong className="max1">이더리움클래식</strong>
              <em>ETC/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>-8.24%</p>
            </td>
            <td className="tradecost">
              <p className="ready">12,345</p>
            </td>
          </tr>
          <tr className="down">
            <td className="bar">
              <div className="down">
                <span className="line" style={lineStyle}>
                  -
                </span>
                <span className="box" style={boxStyle}>
                  -
                </span>
              </div>
            </td>
            <td className="tit">
              <strong className="max3">스테이터스네트워크토큰</strong>
              <em>SNT/KRW</em>
            </td>
            <td className="price">
              <strong>11.23</strong>
            </td>
            <td className="percent">
              <p>-22.32%</p>
            </td>
            <td className="tradecost">
              <p className="ready">12,345</p>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default Body
