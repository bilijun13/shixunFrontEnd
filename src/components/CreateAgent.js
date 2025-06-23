import React, { useState } from 'react';
import axios from 'axios';

const CreateAgent = ({ token }) => {
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/agents',
        {
          name,
          system_prompt: systemPrompt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Agent created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Agent Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="System Prompt"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
      <button type="submit">Create Agent</button>
    </form>
  );
};

export default CreateAgent;