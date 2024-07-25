import React, { useState } from 'react';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

import Markdown from 'react-markdown';

// const groq = createOpenAI({
//   apiKey: process.env.REACT_APP_GROQ_API_KEY,
//   baseURL: 'https://api.groq.com/openai/v1'
// });

const VectorSearch = () => {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Hello' },
  ]);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    try {
      const options = {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZnFyaXplbmp2emF1bXZwbGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMzkyMTgsImV4cCI6MjAzNTYxNTIxOH0.Ixv8dBPDBAky3suPB6SfBHRAM9EHufg0OPp3xYWFusg',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      };
      const fetchData = async () => {
        try {
          console.log('fetching data');
          const response = await fetch(
            'https://jefqrizenjvzaumvplgl.supabase.co/functions/v1/simple-search',
            options
          );
          const data = await response.json();
          return data;
        } catch (err) {
          console.error(err);
          return { error: 'An error occurred while fetching data' };
        }
      };
      const unformattedreply = await fetchData();
      const reply = unformattedreply
        .map(
          (item) =>
            `- Title: ${item.title}, Similarity: ${item.similarity}, ID: ${item.id}`
        )
        .join('\n\n');
      console.log(reply);
      setResponse(reply);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error(error);
    }

    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            <span>{msg.role}:</span> <Markdown>{msg.content}</Markdown>
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSendMessage}>Send</button>
      {/* <div><Markdown>{response}</Markdown></div> */}
    </div>
  );
};

export default VectorSearch;
