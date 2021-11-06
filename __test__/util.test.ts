import { getPropertyName, getSign, getUpDown, numberWithCommas, renameMarket } from '../src/util/util'

describe('util', () => {
  describe('function', () => {
    it('천단위 구분자는 comma로 표현한다.', () => {
      const result = numberWithCommas(10000, 'KRW')
      expect(result).toEqual('10,000')
    })

    it('KRW 마켓 거래대금의 경우 백만을 넘어가면 백만 단위로 표현', () => {
      const million: number = 1000000
      let replace = Math.ceil(100000000 / million)
      let result = numberWithCommas(replace, 'KRW')
      result += '백만'
      expect(result).toEqual('100백만')
    })

    it('API 에서 오는 마켓정보를 퍼블리싱에 맞추어 구분자 변경 및 역순으로 표시한다.', () => {
      let marketName = 'KRW-BTC'
      const rename = renameMarket(marketName)
      expect(rename).toEqual('BTC/KRW')
    })

    it('API 에서 오는 change Property에 따라 classname을 리턴한다. ', () => {
      const mockTickerUp = {
        acc_trade_price: 379509023180.2351,
        acc_trade_price_24h: 414691839980.00385,
        acc_trade_volume: 5100.14539545,
        acc_trade_volume_24h: 5576.47671759,
        change: 'RISE',
        change_price: 204000,
        change_rate: 0.0027639655,
        high_price: 75000000,
        highest_52_week_date: '2021-04-14',
        highest_52_week_price: 81994000,
        low_price: 73490000,
        lowest_52_week_date: '2020-11-05',
        lowest_52_week_price: 15900000,
        market: 'KRW-BTC',
        opening_price: 73807000,
        prev_closing_price: 73807000,
        signed_change_price: 204000,
        signed_change_rate: 0.0027639655,
        timestamp: 1636139525974,
        trade_date: '20211105',
        trade_date_kst: '20211106',
        trade_price: 74011000,
        trade_time: '191202',
        trade_time_kst: '041202',
        trade_timestamp: 1636139522000,
        trade_volume: 0.00003104,
      }
      const mockTickerDown = {
        acc_trade_price: 379509023180.2351,
        acc_trade_price_24h: 414691839980.00385,
        acc_trade_volume: 5100.14539545,
        acc_trade_volume_24h: 5576.47671759,
        change: 'FALL',
        change_price: 204000,
        change_rate: 0.0027639655,
        high_price: 75000000,
        highest_52_week_date: '2021-04-14',
        highest_52_week_price: 81994000,
        low_price: 73490000,
        lowest_52_week_date: '2020-11-05',
        lowest_52_week_price: 15900000,
        market: 'KRW-BTC',
        opening_price: 73807000,
        prev_closing_price: 73807000,
        signed_change_price: 204000,
        signed_change_rate: 0.0027639655,
        timestamp: 1636139525974,
        trade_date: '20211105',
        trade_date_kst: '20211106',
        trade_price: 74011000,
        trade_time: '191202',
        trade_time_kst: '041202',
        trade_timestamp: 1636139522000,
        trade_volume: 0.00003104,
      }
      let classNameUp = getUpDown(mockTickerUp)
      let classNameDown = getUpDown(mockTickerDown)
      let classNameEmpty = getUpDown(undefined)
      expect(classNameUp).toEqual('up')
      expect(classNameDown).toEqual('down')
      expect(classNameEmpty).toEqual('')
    })

    it('API 에서 오는 상승 Flag에 맞게 + 부호를 리턴한다.', () => {
      const plus = getSign('RISE')
      expect(plus).toEqual('+')
    })

    it('API 에서 오는 상승 Flag에 맞게 - 부호를 리턴한다.', () => {
      const minus = getSign('FALL')
      expect(minus).toEqual('-')
    })

    it('API 에서 보합일 경우 빈 문자를 리턴한다.', () => {
      const minus = getSign('EVEN')
      expect(minus).toEqual('')
    })

    it('redux store의 현재가에 해당하는 ticker 데이터의 property 명을 찾는다.', () => {
      const checkPrice = getPropertyName('price')
      expect(checkPrice).toEqual('trade_price')
    })
    it('redux store의 전일대비에 해당하는 ticker 데이터의 property 명을 찾는다.', () => {
      const checkRate = getPropertyName('percent')
      expect(checkRate).toEqual('change_rate')
    })
    it('redux store의 거래대금에 해당하는 ticker 데이터의 property 명을 찾는다.', () => {
      const check24H = getPropertyName('tradecost')
      expect(check24H).toEqual('acc_trade_price_24h')
    })

    it('redux store의 해당하지 않을 경우 intial data인 거래대금 프로퍼티를 리턴한다.', () => {
      const checkEmpty = getPropertyName('trade_price')
      expect(checkEmpty).toEqual('trade_price')
    })
  })
})
