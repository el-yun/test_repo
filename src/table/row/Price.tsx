import React, { useCallback, useEffect, useRef } from 'react'
import { useMarketSelector } from '~/store/useMarketStore'
import { numberWithCommas } from '~/util/util'

interface Props {
  trade_price: number
}

const Price = (props: Props) => {
  const updownRef = useRef<HTMLSpanElement>(null)
  const { trade_price } = props
  const prevPrice = useRef<number>(0) // 넘어온 props 와 ref로 저장해둔 전 값과 비교한다.
  const { currency } = useMarketSelector((state) => state.marketStore)

  // price 가 변경 될때 현재가 박스 표시
  useEffect(() => {
    if (updownRef && updownRef.current) {
      updownRef.current.className = isUpDown()

      setTimeout(() => {
        if (updownRef.current && updownRef.current.classList && updownRef.current.classList.length > 0) {
          updownRef.current.setAttribute('class', '')
        }
      }, 500)
    }
  }, [trade_price])

  // props와 전 가격을 비교하여 상승 혹은 하락 테두리 표시
  const isUpDown = useCallback(() => {
    if (prevPrice.current < trade_price) {
      prevPrice.current = trade_price
      return 'highlight-up'
    } else if (prevPrice.current > trade_price) {
      prevPrice.current = trade_price
      return 'highlight-down'
    } else {
      prevPrice.current = trade_price
      return ''
    }
  }, [trade_price])

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
      <strong>
        <span ref={updownRef}>{priceFormat(trade_price)}</span>
      </strong>
    </td>
  )
}

export default Price
