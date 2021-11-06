import React, { useEffect, useRef } from 'react'
import { useMarketSelector, useMarketDispatch } from '~/store/useMarketStore'
import { setSelectRow } from '~/store/marketStore'
import { Market, Ticker } from '~/interfaces/market'
import Title from './Title'
import TradeCost from './TradeCost'
import Percent from './Percent'
import Price from './Price'
import CandleChart from './CandleChart'
import { getUpDown } from '~/util/util'

interface Props {
  marketInfo: Market
  ticker: Ticker
}

const Row = (props: Props) => {
  const trRef = useRef<HTMLTableRowElement | null>(null)
  const { selectRow } = useMarketSelector((state) => state.marketStore)
  const dispatch = useMarketDispatch()
  const { marketInfo, ticker } = props

  const handleClick = () => {
    if (selectRow !== ticker.market) dispatch(setSelectRow(ticker.market))
  }

  useEffect(() => {
    if (ticker.market === selectRow && trRef && trRef.current) {
      trRef.current.className = isClassName()
    }
  }, [selectRow])

  // 선택 Row 클래스 처리
  const isClassName = () => {
    let className = ''
    className = getUpDown(ticker)
    if (selectRow === ticker.market) className += ' on'
    return className
  }

  return (
    <tr ref={trRef} className={isClassName()} onClick={handleClick}>
      {ticker && (
        <>
          <CandleChart
            change={ticker.change}
            updown={getUpDown(ticker)}
            close={ticker.prev_closing_price}
            open={ticker.opening_price}
            high={ticker.high_price}
            low={ticker.low_price}
            trade={ticker.trade_price}
            market={ticker.market}
          />
          <Title marketInfo={marketInfo} />
          <Price trade_price={ticker.trade_price} />
          <Percent change={ticker.change} change_rate={ticker.change_rate} />
          <TradeCost accTradePrice24h={ticker.acc_trade_price_24h} />
        </>
      )}
    </tr>
  )
}

export default Row
