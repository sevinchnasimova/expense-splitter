import { useState } from 'react';
import { apiRequest } from '../api/api';

function Login({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isSignup = mode === 'signup';

  function toggleMode() {
    setMode(isSignup ? 'login' : 'signup');
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      if (isSignup) {
        await apiRequest('/api/auth/signup', 'POST', { email, password });
      }
      const data = await apiRequest('/api/auth/login', 'POST', { email, password });
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div className="brand" style={{ marginBottom: 32, justifyContent: 'center' }}>
          EvenUp
        </div>
        <div className="card">
          <h1 style={{ textAlign: 'center' }}>{isSignup ? 'Create an account' : 'Welcome back'}</h1>
          <p className="subtitle" style={{ textAlign: 'center' }}>
            {isSignup ? 'Sign up to start splitting expenses.' : 'Log in to manage your shared expenses.'}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="primary full-width">
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          <p className="subtitle" style={{ textAlign: 'center', margin: '20px 0 0' }}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" className="ghost" style={{ padding: 0 }} onClick={toggleMode}>
              {isSignup ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
