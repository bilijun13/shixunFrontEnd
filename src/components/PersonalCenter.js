import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar from './manbo.png'; // 导入默认头像
import './PersonalCenter.css';
import { IoExitOutline } from 'react-icons/io5'; // 导入退出图标

const PersonalCenter = ({ token }) => {
  const [avatar, setAvatar] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [gender, setGender] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [tongyiApiKey, setTongyiApiKey] = useState('');
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar); // 默认显示导入的头像
  const [isHovering, setIsHovering] = useState(false); // 新增状态来跟踪鼠标是否悬停
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 新增状态来跟踪下拉菜单是否打开
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatar').click();
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append('avatar', avatar);
    formData.append('new_password', newPassword);
    formData.append('gender', gender);
    formData.append('openai_api_key', openaiApiKey);
    formData.append('tongyi_api_key', tongyiApiKey);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/user/personal-center',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data);
      alert('个人信息更新成功!');
    } catch (error) {
      console.error(error);
      alert('更新失败，请重试');
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCirclePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAvatarHoverEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleAvatarHoverLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="app-container">
      {/* 左侧导航栏 */}
      <div className="left-navbar">
        <ul>
          <li>
            <Link
              to="/Personal-Center"
              className={`nav-link ${isActive('/Personal-Center') ? 'active' : ''}`}
            >
              个人中心
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`nav-link ${isActive('/login') ? 'active' : ''}`}
            >
              登录
            </Link>
          </li>
        </ul>
      </div>

      {/* 主内容区域 */}
      <div className="main-content">
        {/* 顶部导航栏 */}
        <div className="top-navbar">
          <div className="top-navbar-right">
            <div
              onMouseEnter={handleAvatarHoverEnter}
              onMouseLeave={handleAvatarHoverLeave}
              style={{ position: 'relative' }}
            >
              <img src={avatarUrl} alt="Avatar" className="avatar" />
              <div
                className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
              >
                {/* 修改为 button 元素 */}
                <button className="dropdown-item" onClick={handleLogout}>
                  <span className="icon"><IoExitOutline /></span> 退出
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* 个人中心表单（垂直布局） */}
        <div className="profile-content">
          <h2>个人中心</h2>
          <div className="profile-section">
            <h3>头像设置</h3>
            <div className="avatar-container">
              <div
                className="profile-avatar-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleAvatarClick}
              >
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="profile-avatar"
                />
                {isHovering && <div className="avatar-hover-text">点击上传新头像</div>}
              </div>
              <input
                type="file"
                id="avatar"
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="profile-section">
            <h3>账号设置</h3>
            <div className="input-group">
              <label>修改密码</label>
              <input
                type="password"
                placeholder="输入新密码"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>修改性别</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">选择性别</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
          </div>

          <div className="profile-section">
            <h3>API 设置</h3>
            <div className="input-group">
              <label>OpenAI API Key</label>
              <input
                type="text"
                placeholder="输入 OpenAI API 密钥"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>通义 API Key</label>
              <input
                type="text"
                placeholder="输入通义 API 密钥"
                value={tongyiApiKey}
                onChange={(e) => setTongyiApiKey(e.target.value)}
              />
            </div>
          </div>

          <button type="button" onClick={handleSubmit}>
            保存更改
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalCenter;