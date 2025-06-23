import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgentList = ({ token }) => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/agents', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAgents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAgents();
  }, [token]);

  return (
    <div>
      <h2>Agent List</h2>
      {agents.map((agent) => (
        <div key={agent.id}>
          <h3>{agent.name}</h3>
          <p>{agent.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AgentList;