import React, { useState } from 'react';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

import Markdown from 'react-markdown';

const groq = createOpenAI({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const Chatbot = () => {
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

    const model = groq('llama-3.1-70b-versatile');

    try {
      const result = await generateText({
        model,
        messages: newMessages,
        maxTokens: 1000,
        temperature: 0.5,
        topP: 1,
        frequencyPenalty: 1,
      });

      setResponse(result.text);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: result.text },
      ]);
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

export default Chatbot;
