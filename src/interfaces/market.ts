/**
 * @description 현재가 정보, 요청 당시 종목의 스냅샷
 */
export interface Ticker {
  market: string // 종목 구분 코드
  trade_date: string // 최근 거래 일자(UTC
  trade_time: string // 최근 거래 시각(UTC)
  trade_date_kst: string // 최근 거래 일자(KST)
  trade_time_kst: string // 최근 거래 시각(KST)
  trade_timestamp: number //
  opening_price: number // 시가
  high_price: number // 고가
  low_price: number // 저가
  trade_price: number // 종가
  prev_closing_price: number // 전일 종가
  change: ChangeType //
  change_price: number // 변화액의 절대값
  change_rate: number // 변화율의 절대값
  signed_change_price: number // 부호가 있는 변화액
  signed_change_rate: number // 부호가 있는 변화율
  trade_volume: number // 가장 최근 거래량
  acc_trade_price: number // 누적 거래대금(UTC 0시 기준)
  acc_trade_price_24h: number // 24시간 누적 거래대금
  acc_trade_volume: number // 누적 거래량(UTC 0시 기준)
  acc_trade_volume_24h: number // 24시간 누적 거래량
  highest_52_week_price: number // 52주 신고가
  highest_52_week_date: string // 52주 신고가 달성일
  lowest_52_week_price: number // 52주 신저가
  lowest_52_week_date: string // 52주 신저가 달성일
  timestamp: number //타임스탬프
}

/**
 * @description 시세 변화상태
 */
export type ChangeType = 'EVEN' | 'RISE' | 'FALL' // 보합 / 상승 / 하락

export type CurrenyType = 'KRW' | 'BTC' | 'USDT' // 원화마켓, BTC마켓, USDT 마켓

export type CurrentLanguage = 'KO' | 'EN'

export type CurrentSortType = 'price' | 'percent' | 'tradecost'

export type CurrentSortUpDown = '' | 'up' | 'down'

/**
 * 코인 마켓정보
 */
export interface Market {
  market: string
  korean_name: string
  english_name: string
}
