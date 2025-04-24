import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './LoginFrom';
import RegisterForm from './RegisterForm';
//import PhotoSidebar from './PhotoSidebar';
import PhotoPairList from './PhotoPairList';

function App() {
  const [currentUser, setCurrentUser ] = useState(null);
  const [error, setError ] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/me', { credentials: 'include' })
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(data => setCurrentUser(data.username))
    .catch(() => setCurrentUser(null));
  },[]);

  const handleLogout = () => {
    fetch('http://localhost:8000/logout', { method: 'POST', credentials: 'include' })
    .then(() => setCurrentUser(null));
  };

  return (
    <div className="App">
      {currentUser ? (
        <>
          <div className='main-layout'>
            <PhotoPairList />
          </div>
          <button onClick={handleLogout}>ログアウト</button>
        </>
      ) : (
        <>
          <header className='App-header'>
            <LoginForm onLogin={setCurrentUser} setError={setError} />
            <RegisterForm setError={setError} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </header>
        </>
      )}
  </div>
  );
}

export default App;