import axios from 'axios';
import React, { useState } from 'react';
import App from '../App';
const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';

async function generateText(prompt) {
  try {
    const response = await axios.post(API_ENDPOINT, {
      prompt,
      max_tokens: 35,
      n: 1,
      stop: '6',
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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 `,
      },
    });
    console.log(response);
      return response.data.choices[0].text.trim();

  } catch (error) {
    console.error(error);
    return "Something went wrong. Please try again later.";
  }
}

function Gpt() {
  const [typing,setTyping]=useState(false);
  const [interests, setInterests] = useState('');
  const [text, setText] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setTyping(true);
    const prompt = `Based on these interests: ${interests}, here are the names of potential career options in numbered list format:`;
    console.log(prompt);
    const generatedText = await generateText(prompt);
    console.log(generatedText);
  
    if (generatedText) {
      setText(generatedText);
      setTyping(false);
    } else {
      console.error("Empty text output");
      setTyping(false);
    }
  }
  return (
    <div>
    <h1>Find Your Career</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder="Enter your interests"
      />
      <button type="submit">Generate</button>
    </form>
    <div type="text-output">
      {typing ? "Generating..." : null}
    </div>
    <div className="text-output">
      <p>{text}</p>
    </div>
  </div>
  )
}






export default Gpt;