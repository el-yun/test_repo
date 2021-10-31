import React, { useCallback, useEffect } from 'react'
import { useTicker } from '~/api/query'
import { useMarketSelector } from '~/store/useMarketStore'
import { ChangeType, CurrentSortUpDown, CurrenyType, Market, Ticker } from '~/interfaces/market'
import Title from './Title'
import TradeCost from './TradeCost'
import Percent from './Percent'
import Price from './Price'
import BarChart from './BarChart'
import { getUpDown } from '~/Util/util'

interface Props {
  marketInfo: Market
  ticker: Ticker
}

const Row = (props: Props) => {
  const { marketInfo, ticker } = props

  // useEffect(() => {
  //   console.log('marketInfo ', marketInfo.market)
  // }, [marketInfo])

  // useEffect(() => {
  //   console.log('ticker ', ticker)
  // }, [ticker])

  // 현재가 trade_price
  // 전일대비 change_rate
  // 거래대금 acc_trade_price_24h

  return (
    <tr className={getUpDown(ticker)}>
      {ticker && (
        <>
          <BarChart change={getUpDown(ticker)} />
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
