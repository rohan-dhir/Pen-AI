import axios from 'axios';
import React from 'react';
import Writer from './components/Writer';
import './App.css';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const endpoint = "https://api.openai.com/v1/completions";

const client = axios.create({
  headers: {
    Authorization: "Bearer " + apiKey,
  },
});

const generateText = async (text) => {
  try {
    const params = {
      model: "text-davinci-003",
      prompt: text,
      temperature: 0,
      max_tokens: 10,
    };
    
    const result = await client.post(endpoint, params);
    const res = result.data.choices[0].text;
    return res;
  } catch (err) {
    console.log(err); 
    const res = "Can't suggest anything right now :(";
    return res;
  }
};

const App = () => {
  return (
    <Writer />
  );
}

export {App, generateText};
