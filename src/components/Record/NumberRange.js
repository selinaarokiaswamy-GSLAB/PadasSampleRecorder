import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const NumberRange = ({ getRange }) => {
	const [from, setFrom] = useState("");
	const [to, setTo]     = useState("");

	const submit = (e) => {
		e.preventDefault();
		if (!from || !to) {
			alert("From or To cannot be blank")
		}
		else {
			getRange(Number(from), Number(to));
			setFrom("");
			setTo("");
		}
	}

	return (
		<>
			<Typography variant="h4" component="h4" gutterBottom>
				Record numbers from
			</Typography>
		    <TextField id="from" label="From" variant="outlined" defaultValue={from} onChange={(e) => setFrom(e.target.value)} /> <br></br>
		    <TextField id="to" label="To" variant="outlined" defaultValue={to} onChange={(e) => setTo(e.target.value)} /><br /><br />
			<Button variant="contained" onClick={submit}>Get me Numbers!!!</Button> <br /> <br />

		{/* <form onSubmit={submit}>
			Record numbers from
		                <div className="mb-3">
					<input type="text" value={from} onChange={(e) => setFrom(e.target.value)} className="form-control" id="from" placeholder="from"/>	                
				</div>
			 to  
		                <div className="mb-3">
					<input type="text" value={to} onChange={(e) => setTo(e.target.value)} className="form-control" id="to" placeholder="to"/>
		                </div>
		                <Button type="submit" className="btn btn-sm btn-success">Get me Numbers!!!</Button>
		 </form> */}
		</>
	)
}

/*
		//<h4> 
		//Record numbers from            
		//<input type="text" value={from} onChange={(e) => setFrom(e.target.value)} className="form-control" id="from" />
		// to 
		//<input type="text" value={to} onChange={(e) => setTo(e.target.value)} className="form-control" id="to" />
		// range.
		//</h4>
		</>
  )
}
*/

export default NumberRange;
