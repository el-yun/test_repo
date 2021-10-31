import React from 'react'

const Tabs = () => {
  return (
    <span className="tab">
	    <table>
			<colgroup>
				<col width="33.33%" />
				<col width="33.33%" />
                <col width="auto" />
			</colgroup>
			<tbody>
				<tr>
					<td className="on"><a href="#">원화거래</a></td>
					<td><a href="#">BTC</a></td>
					<td><a href="#">USDT</a></td>
				</tr>
			</tbody>
		</table>
	</span>
  )
}

export default Tabs;