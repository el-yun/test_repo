import React, { useCallback } from 'react'
import { CurrentSortType } from '~/interfaces/market'
import { useMarketDispatch, useMarketSelector } from '~/store/useMarketStore'
import { setCurrentLanguage, setCurrentSortType, setChangeSortUpDown } from '../store/marketStore'

const Header = () => {
  const dispatch = useMarketDispatch()
  const { currentLang, currentSortType, currentSortUpDown } = useMarketSelector((state) => state.marketStore)

  const handleLanguage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(setCurrentLanguage(currentLang === 'KO' ? 'EN' : 'KO'))
  }

  const currentLangType = () => {
    if (currentLang === 'KO') return '한글명'
    else return '영문명'
  }

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      const selected = e.currentTarget.getAttribute('data-title') as CurrentSortType
      if (selected === currentSortType) {
        if (currentSortUpDown === 'down') dispatch(setChangeSortUpDown('up'))
        else if (currentSortUpDown === 'up') dispatch(setChangeSortUpDown('down'))
      } else {
        dispatch(setCurrentSortType(selected))
      }
    },
    [currentSortType, currentSortUpDown]
  )

  const isCurrentUse = (type: CurrentSortType) => {
    if (type === currentSortType) {
      return currentSortUpDown
    } else {
      return ''
    }
  }

  return (
    <table className="ty01" id="fixTit">
      <colgroup>
        <col width="29" />
        <col width="*" />
        <col width="23%" />
        <col width="19%" />
        <col width="26%" />
      </colgroup>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th className="tit">
            <a href="#" onClick={handleLanguage}>
              {currentLangType()}
            </a>
          </th>
          <th className="sortable price" data-title="price" onClick={handleClick}>
            <a href="#" className={isCurrentUse('price')}>
              현재가
            </a>
          </th>
          <th className="sortable percent" data-title="percent" onClick={handleClick}>
            <a href="#" className={isCurrentUse('percent')}>
              전일대비
            </a>
          </th>
          <th className="sortable tradecost" data-title="tradecost" onClick={handleClick}>
            <a href="#" className={isCurrentUse('tradecost')}>
              거래대금
            </a>
          </th>
        </tr>
      </thead>
    </table>
  )
}

export default Header
