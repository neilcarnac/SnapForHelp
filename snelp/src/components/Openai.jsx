import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_API_KEY = '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';

function Openai({ text }) {
  const [generatedText, setGeneratedText] = useState('');
  const prompt = text;
    
  useEffect(() => {
    async function generateText() {
      try {
        const response = await axios.post(API_ENDPOINT, {
          prompt,
          max_tokens: 100,
          n: 1,
          stop: '6',
          temperature: 0.7,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        });
        console.log(response);
        setGeneratedText(response.data.choices[0].text.trim());
      } catch (error) {
        console.error(error);
        setGeneratedText("Something went wrong. Please try again later.");
      }
    }

    // Call generateText within the useEffect
    generateText();

    // Remove any references to `pr` as it's not defined in your code
  }, [prompt]);

  return (
    <div>
      <button onClick={() => generateText()}>Generate Text</button>
      {generatedText && (
        <p>{generatedText}</p>
      )}
    </div>
  );
}

export default Openai;
