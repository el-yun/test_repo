import React, { useCallback } from 'react'
import { CurrenyType, Market } from '~/interfaces/market'
import { useMarketSelector } from '~/store/useMarketStore'
import { numberWithCommas } from '~/Util/util'

interface Props {
  trade_price: number
}

const Price = (props: Props) => {
  const { trade_price } = props
  const { currency } = useMarketSelector((state) => state.marketStore)

  /**
   * KRW 마켓의 경우 100원 미만은 소수점 2자리, 그 이상은 정수부만 표현
   * BTC 마켓의 경우 소수점 8자리로 표현
   * USDT 마켓의 경우 소수점 3자리로 표현
   * 천단위 구분자는 comma로 표현
   * KRW 마켓 거래대금의 경우 백만을 넘어가면 백만 단위로 표현
   */

  const priceFormat = useCallback(
    (price: Number) => {
      if (currency === 'KRW') {
        if (price < 100) {
          return price.toFixed(2)
        } else {
          return numberWithCommas(price, currency)
        }
      } else if (currency === 'BTC') {
        return price.toFixed(8)
      } else {
        return numberWithCommas(price, currency)
      }
    },
    [trade_price]
  )

  return (
    <td className="price">
      <strong>{priceFormat(trade_price)}</strong>
    </td>
  )
}

export default Price
