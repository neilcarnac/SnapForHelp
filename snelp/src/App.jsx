import React from 'react';
import { useState } from 'react';
import './App.css';
import Tesseract from 'tesseract.js';
import Openai from './components/Openai';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(" ");
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
  };

  return (
    <div className="App" style={{ height: '100vh' }}>
      <div className="row">
        <div className="container">
          {!isLoading && <h1 className='header'>Image to text</h1>}
          {/* form */}
          {
            !isLoading && !text && (
              <>
                <input type="file" className='fileup' onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
                <input
                type="button"
                className='butt'
                value="Convert"
                onClick={handleClick} />
              </>
            )
          }
          {/* {progress bad} */}
          {
            isLoading && (
              <>
                <p className='para'>
                  Converting: - {progress} %
                </p>
              </>
            )
          }
          {/* {textarea} */}

          {
            !isLoading && text && (
              <>
                <textarea value={text} className='form-control' cols="70" rows="15" onChange={(e) => setText(e.target.value)}>
                </textarea>
                <Openai text= { text }/>

              </>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default App;
