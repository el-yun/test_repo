import React, { useCallback, useEffect } from 'react'
import { useTicker } from '~/api/query'
import { useMarketSelector } from '~/store/useMarketStore'
import { ChangeType, CurrentSortUpDown, CurrenyType, Market, Ticker } from '~/interfaces/market'
import Title from './Title'
import TradeCost from './TradeCost'
import Percent from './Percent'
import Price from './Price'
import BarChart from './BarChart'
import { getUpDown } from '~/util/util'

interface Props {
  marketInfo: Market
  ticker: Ticker
}

const Row = (props: Props) => {
  const { marketInfo, ticker } = props

  // 현재가 trade_price
  // 전일대비 change_rate
  // 거래대금 acc_trade_price_24h

  return (
    <tr className={getUpDown(ticker)}>
      {ticker && (
        <>
          <BarChart
            change={getUpDown(ticker)}
            close={ticker.prev_closing_price}
            open={ticker.opening_price}
            high={ticker.high_price}
            low={ticker.low_price}
            trade={ticker.trade_price}
          />
          <Title marketInfo={marketInfo} />
          <Price trade_price={ticker.trade_price} change={ticker.change} />
          <Percent change={ticker.change} change_rate={ticker.change_rate} />
          <TradeCost accTradePrice24h={ticker.acc_trade_price_24h} />
        </>
      )}
    </tr>
  )
}

export default Row
