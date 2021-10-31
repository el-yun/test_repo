import React from 'react'
import CSS from 'csstype';

const lineStyle: CSS.Properties = {
    top: '10px',
    height:'40%'
};

const boxStyle: CSS.Properties = {
    top: '12px',
    height:'4px'
};
const barUpLineStyle: CSS.Properties = {
    top: '0px',
    height:'50%'
};
const barUpBoxStyle: CSS.Properties = {
    top: '0px',
    height:'12.5px'
};


 const upLineStyle: CSS.Properties = {
     top: '10px',
     height:'20%'
 };
 const upBoxStyle: CSS.Properties = {
     top: '12px',
     height:'1px'
 };
const Body = () => {
  return (
    <div className="scrollB">
        <table className="ty01">
          <colgroup>
            <col width="29" />
            <col width="*" />
            <col width="23%" />
            <col width="19%" />
            <col width="26%" />
          </colgroup>
          <tbody>
          <tr>
            <td className="bar">
              {/* <!-- up down --> */}
              <div className="bar up">
                <span className="line" style={lineStyle}>-</span>
                <span className="box" style={boxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong>비트코인</strong>
              <em>BTC/KRW</em>
            </td>
            <td className="price">
              <strong>56,781,234</strong>
            </td>
            <td className="percent">
              <p>0.00%</p>
            </td>
            <td className="tradecost">
              <p>32,898<i>백만</i></p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="bar up">
                <span className="line" style={barUpLineStyle}>-</span>
                <span className="box" style={barUpBoxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong>에이다</strong>
              <em>ADA/KRW</em>
            </td>
            <td className="price">
              <strong>200</strong>
            </td>
            <td className="percent">
              <p>100.00%</p>
            </td>
            <td className="tradecost">
              <p>2,804,983</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="down">
                <span className="line" style={lineStyle}>-</span>
                <span className="box" style={boxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong>비트코인캐시</strong>
              <em>BTC/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>122.68%</p>
            </td>
            <td className="tradecost">
              <p>864,261</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="up">
                <span className="line" style={lineStyle}>-</span>
                <span className="box" style={boxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong>아인스타이늄</strong>
              <em>EMC2/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>512.81%</p>
            </td>
            <td className="tradecost">
              <p>267,429</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              
              <div className="bar up">
                <span className="line" style={lineStyle}>-</span>
                <span className="box" style={boxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong>비트코인</strong>
              <em>BTC/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>322.32%</p>
            </td>
            <td className="tradecost">
              <p>32,168,898</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="">
                <span className="line" style={upLineStyle}>-</span>
                <span className="box" style={upBoxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong>에이다</strong>
              <em>ADA/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>62.48%</p>
            </td>
            <td className="tradecost">
              <p>2,804,983</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="down">
                <span className="line" style={lineStyle}>-</span>
                <span className="box" style={boxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong>비트코인캐시</strong>
              <em>BTC/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>122.68%</p>
            </td>
            <td className="tradecost">
              <p>864,261</p>
            </td>
          </tr>
          <tr className="up">
            <td className="bar">
              <div className="up">
                <span className="line" style={lineStyle}>-</span>
                <span className="box" style={boxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong>아인스타이늄</strong>
              <em>EMC2/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>512.81%</p>
            </td>
            <td className="tradecost">
              <p>267,429</p>
            </td>
          </tr>
          <tr className="down">
            <td className="bar">
              <div className="down">
                <span className="line" style={lineStyle}>-</span>
                <span className="box" style={boxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong className="max1">이더리움클래식</strong>
              <em>ETC/KRW</em>
            </td>
            <td className="price">
              <strong>0.00001187</strong>
            </td>
            <td className="percent">
              <p>-8.24%</p>
            </td>
            <td className="tradecost">
              <p className="ready">12,345</p>
            </td>
          </tr>
          <tr className="down">
            <td className="bar">
              <div className="down">
                <span className="line" style={lineStyle}>-</span>
                <span className="box" style={boxStyle}>-</span>
              </div>
            </td>
            <td className="tit">
              <strong className="max3">스테이터스네트워크토큰</strong>
              <em>SNT/KRW</em>
            </td>
            <td className="price">
              <strong>11.23</strong>
            </td>
            <td className="percent">
              <p>-22.32%</p>
            </td>
            <td className="tradecost">
              <p className="ready">12,345</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  )
}

export default Body;