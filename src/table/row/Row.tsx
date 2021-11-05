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
    dispatch(setSelectRow(ticker.market))
  }

  useEffect(() => {
    if (ticker.market === selectRow) {
      if (trRef && trRef.current) trRef.current.className = isClassName()
    }
  }, [selectRow])

  const isClassName = () => {
    let className = ''
    className = getUpDown(ticker)
    if (selectRow === ticker.market) className += ' on'
    return className
  }
  // 현재가 trade_price
  // 전일대비 change_rate
  // 거래대금 acc_trade_price_24h

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
