import React from 'react';
import Button from '@mui/material/Button';

export const NumButton = ({numbers_list, AudioFileName}) => {
	// let myStyle = {
	// 	color:"red",
	// 	justifyContent: "center",
	// 	alignContent: "center",
	// 	gap: "10px",
	// 	whiteSpace: "pre-wrap",
	// 	cursor:"pointer",
	// 	display: "flex",
	// 	flexdirection: "row"
	// }

//	const getButtonNums = (numbers_list) => {
//		return (numbers_list.map((num) => {
//			  (
//				 <button key={num} onClick={()=>{AudioFileName(num)}}>{num}</button>
//			 )
//		})
//		)
//	}

	if (numbers_list.length) {
		//<div style={myStyle}>
			return	(numbers_list.map((num) => {
				return (
					< >
					<Button className="ml-1" variant="outlined" key={num} onClick={()=>{AudioFileName(num)}}>{num}</Button>
					</>
				)
			})
		)
		// getButtonNums(numbers_list)
		//	</div>
	}
}
