import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';

function Openai({text}) {
  const [generatedText, setGeneratedText] = useState('');
  const prompt = text;

  async function generateText(prompt) {
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
          'Authorization': 'Bearer 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',
        },
      });
      console.log(response);
      setGeneratedText(response.data.choices[0].text.trim());
    } catch (error) {
      console.error(error);
      setGeneratedText("Something went wrong. Please try again later.");
    }
  }

  return (
    <div>
    <button onClick={() => generateText(prompt)}>Generate Text</button>
      {generatedText && (
        <p>{generatedText}</p>
      )}
    </div>
  );
}

export default Openai;
