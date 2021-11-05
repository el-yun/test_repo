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
  // const percent = 30
  const percent = 10 // 사이트나 앱에선 30% -30% 기준인듯 하다.. 과제문서 에서는 10% -10% 요청.
  const half = 12.5 // 차트에서 반을 표시 할수 있는 값 25px / 2
  const hundred = 100

  const { change, updown, close, open, high, low, trade, market } = props

  const getLineStyle = () => {
    // 고가 저가
    // 전일 기준 퍼센트 를 더한 값
    let maximum = close + close * (percent / hundred) // 상한퍼센트 더한값
    let minimum = close - close * (percent / hundred) // 하한퍼센트 더한값

    let upPercent = ((high - close) * hundred) / (maximum - close) //
    let downPercent = ((close - low) * hundred) / (close - minimum)

    let heightPx = (half * upPercent) / hundred
    let topPx = half - heightPx
    let downPx = (half * downPercent) / hundred

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
    let topPx = half
    let upPercent = 0
    let downPercent = 0
    let middle = 0
    let downPx = 0
    if (change !== 'EVEN') {
      // 고가 저가
      // 전일 기준 30 퍼센트 를 더한 값
      let maximum = close + close * (percent / hundred) // 상한
      let minimum = close - close * (percent / hundred) // 하한

      // 종가 - 시가
      if (change === 'RISE') {
        // 전일종가의 상한퍼센트만큼에서 전일종가를 뺀후 종가-시가 *100 으로 나눠준다.
        upPercent = ((trade - close) * hundred) / (maximum - close)
        downPercent = ((close - open) * hundred) / (close - minimum)
      } else {
        middle = open - trade // 시가 - 종가
        // 전일종가의 상한퍼센트만큼에서 전일종가를 뺀후 종가-시가 *100 으로 나눠준다.
        upPercent = ((open - close) * hundred) / (maximum - close)
        downPercent = ((close - trade) * hundred) / (close - minimum)
      }

      heightPx = (half * upPercent) / hundred
      topPx = half - heightPx
      downPx = (half * downPercent) / hundred
    }

    return {
      top: topPx,
      height: heightPx + downPx > 1 ? heightPx + downPx : 1, // 1보다 작을 때는 1px로 표시
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
