import React from 'react'
import { CurrenyType } from '../interfaces/market'
import { useMarketDispatch, useMarketSelector } from '../store/useMarketStore'
import { setCurrencyType } from '../store/marketStore'

const Tabs = () => {
  const dispatch = useMarketDispatch()
  const { currency } = useMarketSelector((state) => state.marketStore)

  /**
   * @description 한글 / 영문 redux dispatch
   * @param {React.MouseEvent<HTMLElement>} e
   */
  const handleCurrency = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const selected = e.currentTarget.getAttribute('data-title') as CurrenyType
    if (selected !== currency) dispatch(setCurrencyType(selected))
  }

  return (
    <span className="tab">
      <table>
        <colgroup>
          <col width="33.33%" />
          <col width="33.33%" />
          <col width="auto" />
        </colgroup>
        <tbody>
          <tr>
            <td data-title="KRW" className={currency === 'KRW' ? 'on' : ''} onClick={handleCurrency}>
              <a href="#">원화거래</a>
            </td>
            <td data-title="BTC" className={currency === 'BTC' ? 'on' : ''} onClick={handleCurrency}>
              <a href="#">BTC</a>
            </td>
            <td data-title="USDT" className={currency === 'USDT' ? 'on' : ''} onClick={handleCurrency}>
              <a href="#">USDT</a>
            </td>
          </tr>
        </tbody>
      </table>
    </span>
  )
}

export default Tabs
