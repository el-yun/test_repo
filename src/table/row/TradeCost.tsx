import React, { useCallback } from 'react'
import { useMarketSelector } from '~/store/useMarketStore'
import { numberWithCommas } from '~/util/util'

interface Props {
  accTradePrice24h: number
}

const TradeCost = (props: Props) => {
  const { accTradePrice24h } = props
  const { currency } = useMarketSelector((state) => state.marketStore)

  const accPrice24Format = useCallback(
    (price: number) => {
      const million: number = 1000000
      if (price > million) {
        let replace = Math.ceil(price / million)
        return numberWithCommas(replace, currency) + '백만'
      } else {
        return numberWithCommas(price, currency)
      }
    },
    [accTradePrice24h]
  )

  return (
    <td className="tradecost">
      <p>{accPrice24Format(accTradePrice24h)}</p>
    </td>
  )
}

export default TradeCost
