import { ChangeType, CurrenyType, Ticker } from '~/interfaces/market'

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

export { numberWithCommas, renameMarket, getSign, getUpDown }
