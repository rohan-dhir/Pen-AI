import React, { useState } from 'react'

export const useText = () => {
  const [text, setText] = useState("");
  const [queryText, setQueryText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  
  const handleSetText = (value) => {
    setText(value)
  }
  
  const handleSetSuggestion = (value) => {
    setSuggestion(value);
  }
  return {
    text,
    queryText,
    suggestion,
    handleSetText,
    setQueryText,
    handleSetSuggestion
  };
};