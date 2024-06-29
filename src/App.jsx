import { React,useState } from 'react'
import './App.css'
import Axios from 'axios';
import {FaSearch} from 'react-icons/fa';
import {FcSpeaker} from 'react-icons/fc';

function App() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");


const getMeaning = async () => {
  if (!searchWord.trim()) {
    setData("Please enter a word.");
    return;
  }
  try{
     const response = await Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`);
     if(response.data && response.data.length >0){ 
    setData(response.data[0]);
    console.log(response.data[0]); 
  }
 else {
  setData({ error: "Word not found. Please try another word." });
}
}
 catch(error){
  setData("Word not found. Please try another word.");
 }
};

const playAudio = () => {
  if (data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
  let audio = new Audio(data.phonetics[0].audio);
  audio.play();
}
};

  return (
    <div className='App'>
      <h1>Word Dictionary</h1>
      <div className='searchbox'>
        <p>Enter a Valid Word </p>
        <input
         type='text'
         placeholder='Search'
         onChange={(e) => {setSearchWord(e.target.value)
         }}
         />
         <button
         onClick={() =>{getMeaning()          
         }}
         ><FaSearch size="20px"/>
         </button>
      </div>
         {data && (
          <div className='showResults'>
            <h2>
              {data.word}{""}
              <button onClick={() => {playAudio()}}>
                <FcSpeaker size="26px"/>
              </button>
            </h2>
            <h4>Parts of speech:</h4>
            <p>{data.meanings[0].partOfSpeech}</p>
            <h4>Definition:</h4>
            <p>{data.meanings[0].definitions[0].definition}</p>
            <h4>Example:</h4>
            <p>{data.meanings[0].definitions[0].example}</p>
          </div>
         )}
    {/* <footer>Thank You..</footer> */}
    </div>
  )
}

export default App;
