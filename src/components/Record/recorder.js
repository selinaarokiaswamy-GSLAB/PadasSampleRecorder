import AudioReactRecorder, { RecordState } from 'audio-react-recorder'; 
import React, { useState } from 'react'; 
import axios from 'axios';
import Button from '@mui/material/Button';

const TheRecorder = ({fileName}) => {

  const [ recordState, SetRecordState ] = useState(''); 
  const [ audioURL, setAudioURL ] = useState('');

  const start = () => {
    SetRecordState(RecordState.START)
  }; 

  const stop = () => {
    SetRecordState(RecordState.STOP)
  }; 

  const onStop = (audioData) => {
    let fd = new FormData();
    fd.append('audio', audioData.blob, `${fileName}.wav`);
    const url = URL.createObjectURL(audioData.blob);
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/file/upload`, fd, {
      headers: {
        'enctype': 'multipart/form-data boundary=XXXX',
        'x-access-token': token,
      }
    }).then(res => {
      if (res.ok) {
        alert("Audio uploaded successfully to backend server!");
      }
    });
    // const tmp = new Audio(url); 
    // tmp.play();
    setAudioURL(url); 
  };

  return (
    <>
      <AudioReactRecorder state={recordState} onStop={onStop} />
      <a id="download" href={audioURL} download={fileName}>Download</a>
      <br />
      <br />
      <Button variant="contained" onClick={start}>Start</Button>
      <br />
      <br />
      <Button variant="contained" onClick={stop}>Stop</Button>
    </>
  )
}

export default TheRecorder; 
