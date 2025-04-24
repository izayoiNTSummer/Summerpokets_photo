import React, { useState } from 'react';
import './LoginForm.css';

function RegisterForm({ setError }) {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('登録失敗');
        })
        .then(() => {
            setUsername('');
            setPassword('');
            setError('登録完了。ログインしてください。');
        })
        .catch(() => setError('登録に失敗しました（ユーザー名重複等）'));
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                <h2>新規登録</h2>
                <div className='form-group'>
                    <label for='username'>ユーザー名</label>
                    <input type='text' placeholder='ユーザー名' value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label for='password'>パスワード</label>
                    <input type='password' placeholder='パスワード' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type='submit'>登録</button>
            </form>
        </div>
    );
}

export default RegisterForm;