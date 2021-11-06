import { ChangeType, CurrentSortType, CurrenyType, Ticker } from '~/interfaces/market'

const numberWithCommas = (x: Number, type: CurrenyType) => {
  const parts = type !== 'USDT' ? x.toString().split('.') : x.toFixed(3).toString().split('.')
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '')
  // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const renameMarket = (market: String) => {
  const split = market.split('-')
  return `${split[1]}/${split[0]}`
}

const getUpDown = (ticker: Ticker | undefined) => {
  if (ticker) {
    if (ticker.change === 'RISE') return 'up'
    else if (ticker.change === 'FALL') return 'down'
    else return ''
  } else {
    return ''
  }
}

const getSign = (changeType: ChangeType) => {
  switch (changeType) {
    case 'RISE':
      return '+'
    case 'FALL':
      return '-'
    default:
      return ''
  }
}

/**
 * @description store의 현재가, 전일대비, 거래대금 분류 값과 비교하여 ticker 데이터의 property 명을 찾는다.
 * @param {CurrentSortType} sortType
 */
const getPropertyName = (sortType: CurrentSortType) => {
  //현재가, 전일대비, 거래대금
  //trade_price / change_rate / acc_trade_price_24h
  switch (sortType) {
    case 'price':
      return 'trade_price'
    case 'percent':
      return 'change_rate'
    case 'tradecost':
      return 'acc_trade_price_24h'
    default:
      return 'trade_price'
  }
}

export { numberWithCommas, renameMarket, getSign, getUpDown, getPropertyName }
