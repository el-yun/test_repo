import React, { useCallback } from 'react'
import { Market } from '~/interfaces/market'
import { useMarketSelector } from '~/store/useMarketStore'
import { renameMarket } from '~/util/util'

interface Props {
  marketInfo: Market
}

const Title = (props: Props) => {
  const { marketInfo } = props
  const { currentLang } = useMarketSelector((state) => state.marketStore)

  /**
   * @description store 값에 따라 한글 영문명 포함한 컴포넌트 리턴
   * @returns {JSX.Element}
   */
  const renderTitle = useCallback(() => {
    const { korean_name, english_name, market } = marketInfo
    return (
      <>
        <strong>{currentLang === 'KO' ? korean_name : english_name}</strong>
        <em>{renameMarket(market)}</em>
      </>
    )
  }, [marketInfo, currentLang])

  return <td className="tit">{renderTitle()}</td>
}

export default Title
