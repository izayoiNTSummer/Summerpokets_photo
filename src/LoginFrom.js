import React, { useState} from 'react';
import './LoginForm.css';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function LoginForm({ onLogin, setError }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('ログイン失敗');
        })
        .then(() => {
            onLogin(username);
            setUsername('');
            setPassword('');
        })
        .catch(() => setError('ユーザー名またはパスワードが間違っています'));
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
            <h2>ログイン</h2>
                <div className='form-group'>
                    <label for='username'>ユーザー名</label>
                    <input type="text" placeholder='ユーザー名' value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label for='password'>パスワード</label>
                    <input type="password" placeholder='パスワード' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className='login-button'>ログイン</button>
            </form>
        </div>
    );
}

export default LoginForm;