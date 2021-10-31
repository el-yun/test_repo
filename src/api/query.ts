import axios from 'axios'
import { useQuery } from 'react-query'
import FetchError from './FetchError'
import { Market, Ticker } from '../interfaces/market'
import { HTTP_STATUS } from '../interfaces/output'

const useMarkets = () => {
  return useQuery<Market[], FetchError>({
    queryKey: ['all-markets'],
    queryFn: async () => {
      try {
        const { data, status } = await axios.get(`https://api.upbit.com/v1/market/all`)
        if (data && status === 200) return data
      } catch (error) {
        if (error.response.status === HTTP_STATUS.NOT_FOUND) {
          throw new FetchError(error.response, {
            msg: '코인 마켓정보 호출에 실패하였습니다.',
            status: error.response.status,
          })
        }
      }
    },
    retry: false,
  })
}

const useTicker = (marketType: String) => {
  return useQuery<Ticker[], FetchError>({
    queryKey: ['ticker', marketType],
    queryFn: async () => {
      try {
        const { data, status } = await axios.get(`https://api.upbit.com/v1/ticker`, {
          params: {
            markets: marketType,
          },
        })
        if (data && status === 200) return data
      } catch (error) {
        if (error.response.status === HTTP_STATUS.NOT_FOUND) {
          throw new FetchError(error.response, {
            msg: '현재가 정보 호출에 실패하였습니다.',
            status: error.response.status,
          })
        }
      }
    },
    retry: false,
    enabled: marketType !== '',
    refetchInterval: 20000,
  })
}

export { useMarkets, useTicker }