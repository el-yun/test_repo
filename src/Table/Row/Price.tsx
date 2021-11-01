import React, { useCallback, useEffect, useRef } from 'react'
import { ChangeType } from '~/interfaces/market'
import { useMarketSelector } from '~/store/useMarketStore'
import { numberWithCommas } from '~/util/util'

interface Props {
  trade_price: number
  change: ChangeType
}

const Price = (props: Props) => {
  const updownRef = useRef<HTMLSpanElement>(null)
  const { trade_price, change } = props
  const { currency } = useMarketSelector((state) => state.marketStore)

  // price 가 변경 될때 현재가 박스 표시
  useEffect(() => {
    if (updownRef && updownRef.current) {
      updownRef.current.className = isUpDown()

      setTimeout(() => {
        if (updownRef.current && updownRef.current.classList && updownRef.current.classList.length > 0) {
          updownRef.current.setAttribute('class', '')
        }
      }, 200)
    }
  }, [trade_price])

  // 보합 / 상승 / 하락에 따른 class명 리턴
  const isUpDown = useCallback(() => {
    if (change === 'RISE') return 'border-up'
    else if (change === 'FALL') return 'border-down'
    else return ''
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
