import React from 'react'
import { Market } from '~/interfaces/market'
import { useMarketSelector } from '~/store/useMarketStore'
import { renameMarket } from '~/Util/util'

interface Props {
  marketInfo: Market
}

const Title = (props: Props) => {
  const { marketInfo } = props
  const { currentLang } = useMarketSelector((state) => state.marketStore)

  const renderTitle = () => {
    const { korean_name, english_name, market } = marketInfo
    return (
      <>
        <strong>{currentLang === 'KO' ? korean_name : english_name}</strong>
        <em>{renameMarket(market)}</em>
      </>
    )
  }

  return <td className="tit">{renderTitle()}</td>
}

export default Title
