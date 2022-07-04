import React, { useState } from 'react'
import NumberRange from '../components/Record/NumberRange';
import TheRecorder from '../components/Record/recorder';
import { NumButton } from '../components/Record/NumberButton';
import "../App.css";

const RecordPage = () => {
	const [numbers_list, setNumbersList] = useState([]);
	const [fileName, setFileName] = useState('');

	const AudioFileName = (name) => {
		setFileName(name)
	};
	function range(start, end) {
		return Array(end - start + 1).fill().map((_, idx) => start + idx)
	};
	const getRange = (from, to) => {
		console.log("Number Range is ", from, to);
		// Put check for numbers
		
		var numbers_list = range(from, to); 
		//console.log(numbers_list);
		setNumbersList(numbers_list);
		// return ( numbers_list);
		
		/*numbers_list.map((num) => {
			console.log("I am before loop")
			return (
			)
		});*/
	};
	// <NumButton num={num} key={num} AudioFileName={AudioFileName} />
	


	return (
		<div className="App">
			<NumberRange getRange={getRange} />
			<NumButton numbers_list={numbers_list} AudioFileName={AudioFileName} />
			<TheRecorder fileName={fileName} />
		</div>
	);
}


export default RecordPage; 