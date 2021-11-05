import React from 'react'
import { ChangeType, CurrentSortUpDown } from '~/interfaces/market'

interface Props {
  change: ChangeType
  updown: CurrentSortUpDown
  close: number
  open: number
  high: number
  low: number
  trade: number
  market: string
}

const CandleChart = (props: Props) => {
  const percent = 30
  const { change, updown, close, open, high, low, trade, market } = props

  const getLineStyle = () => {
    // 고가 저가
    // 전일 기준 30 퍼센트 를 더한 값
    let maximum = close + close * (percent / 100) // 상한퍼센트 더한값
    let minimum = close - close * (percent / 100) // 하한퍼센트 더한값

    let upPercent = ((high - close) * 100) / (maximum - close) //
    let downPercent = ((close - low) * 100) / (close - minimum)

    let heightPx = (12.5 * upPercent) / 100
    let topPx = 12.5 - heightPx
    let downPx = (12.5 * downPercent) / 100

    // console.log('@@@market :', market, ' topPx :', topPx)
    // console.log('@@@market :', market, ' heightPx :', heightPx)
    return {
      top: topPx,
      height: heightPx + downPx,
    }
  }

  //height 100 % 12.5px
  const getBoxStyle = () => {
    // RISE - 상 종 하 시
    // FALL = 상 시 하 종
    let heightPx = 1
    let topPx = 12.5
    let upPercent = 0
    let downPercent = 0
    let middle = 0
    let downPx = 0
    if (change !== 'EVEN') {
      // 고가 저가
      // 전일 기준 30 퍼센트 를 더한 값
      let maximum = close + close * (percent / 100) // 상한
      let minimum = close - close * (percent / 100) // 하한

      // 종가 - 시가
      if (change === 'RISE') {
        // 전일종가의 상한퍼센트만큼에서 전일종가를 뺀후 종가-시가 *100 으로 나눠준다.
        upPercent = ((trade - close) * 100) / (maximum - close)
        downPercent = ((close - open) * 100) / (close - minimum)
      } else {
        middle = open - trade // 시가 - 종가
        // 전일종가의 상한퍼센트만큼에서 전일종가를 뺀후 종가-시가 *100 으로 나눠준다.
        upPercent = ((open - close) * 100) / (maximum - close)
        downPercent = ((close - trade) * 100) / (close - minimum)
      }

      heightPx = (12.5 * upPercent) / 100
      topPx = 12.5 - heightPx
      downPx = (12.5 * downPercent) / 100
    }

    return {
      top: topPx,
      height: heightPx + downPx > 1 ? heightPx + downPx : 1,
    }
  }

  return (
    <td className="bar">
      <div className={updown}>
        <span className="line" style={getLineStyle()}>
          -
        </span>
        <span className="box" style={getBoxStyle()}>
          -
        </span>
      </div>
    </td>
  )
}

export default CandleChart
