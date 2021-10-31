import React from 'react'

const Header = () => {
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
          <th className="tit"><a href="#">한글명</a></th>
          {/* <!-- className: up, down --> */}
          <th className="sortable price"><a href="#">현재가</a></th>
          <th className="sortable percent"><a href="#">전일대비</a></th>
          <th className="sortable tradecost"><a href="#" className="down">거래대금</a></th>
        </tr>
        </thead>
    </table>
  )
}

export default Header;