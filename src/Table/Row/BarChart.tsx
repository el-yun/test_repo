import React from 'react'
import CSS from 'csstype'
import { ChangeType, CurrentSortUpDown } from '~/interfaces/market'

const lineStyle: CSS.Properties = {
  top: '10px',
  height: '40%',
}

const boxStyle: CSS.Properties = {
  top: '12px',
  height: '4px',
}
const barUpLineStyle: CSS.Properties = {
  top: '0px',
  height: '50%',
}
const barUpBoxStyle: CSS.Properties = {
  top: '0px',
  height: '12.5px',
}

const upLineStyle: CSS.Properties = {
  top: '10px',
  height: '20%',
}
const upBoxStyle: CSS.Properties = {
  top: '12px',
  height: '1px',
}

interface Props {
  change: CurrentSortUpDown
  close: number
  open: number
  high: number
  low: number
  trade: number
}

const BarChart = (props: Props) => {
  const { change, open, high, low, trade } = props

  const getLineStyle = () => {
    return {
      top: '10px',
      height: '40%',
    }
  }

  //height 100 % 12.5px
  const getBoxStyle = () => {
    return {
      top: '12px',
      height: '4px',
    }
  }

  return (
    <td className="bar">
      {/* <!-- up down --> */}
      <div className={change}>
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

export default BarChart
