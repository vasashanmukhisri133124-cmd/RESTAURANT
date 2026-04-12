import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);

    if (result.success) {
      // Redirect to dashboard
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="sidebar-logo-icon" style={{ fontSize: '3rem', margin: '0 auto 10px', display: 'block', textAlign: 'center' }}>🍴</div>
          <h2 style={{ textAlign: 'center', marginBottom: '5px' }}>Grand Luxe</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>Food Management System</p>
        </div>

        {error && (
          <div className="notification warning" style={{ marginBottom: '20px', borderRadius: 'var(--radius-md)', padding: '12px', background: 'rgba(255,100,100,0.1)', border: '1px solid var(--color-danger)' }}>
            <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>⚠️</span>
            <span style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</span>
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-body)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-body)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-primary)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '10px' }}>Demo credentials:</p>
          <p style={{ marginBottom: '15px' }}>Admin: admin@hotel.com / password123</p>
          <Link to="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '1rem' }}>Create new account</Link>
        </div>
      </div>
      
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-body);
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: var(--color-bg-card);
          padding: 40px;
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid var(--color-border);
        }
      `}</style>
    </div>
  );
}
