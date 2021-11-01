import React, { useCallback } from 'react'
import { ChangeType, Market } from '~/interfaces/market'
import { getSign } from '~/util/util'

interface Props {
  change_rate: number
  change: ChangeType
}

const Percent = (props: Props) => {
  const { change_rate, change } = props

  // 백분율 퍼센트로 소수점 올림하여 음수양수 부호 추가하여 표시
  const changeRate = useCallback(
    (rate: number, change: ChangeType) => {
      const sign = getSign(change)
      const value = Math.ceil(rate * 10000) / 100
      return `${sign}${value}%`
      // Math.ceil(0.0167272826 * 10000) / 100
    },
    [change_rate, change]
  )

  return (
    <td className="percent">
      <p>{changeRate(change_rate, change)}</p>
    </td>
  )
}

export default Percent
