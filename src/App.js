import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AgentList from './components/AgentList';
import CreateAgent from './components/CreateAgent';

const App = () => {
  const [token, setToken] = useState(null);

  // 根路径重定向逻辑
  const handleRootRedirect = () => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/agents" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* 根路径重定向到登录页或主页 */}
        <Route path="/" element={handleRootRedirect()} />

        {/* 未登录时的路由 */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* 已登录时的路由 */}
        <Route path="/agents" element={<AgentList token={token} />} />
        <Route path="/create-agent" element={<CreateAgent token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;