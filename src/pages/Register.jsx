import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('guest');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(name, email, password, role);

    if (result.success) {
      if (role === 'admin' || role === 'staff') {
        navigate('/staff'); // Staff go to staff dashboard
      } else {
        navigate('/'); // Guests go to main dashboard
      }
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="sidebar-logo-icon" style={{ fontSize: '3rem', margin: '0 auto 10px', display: 'block', textAlign: 'center' }}>🏨</div>
          <h2 style={{ textAlign: 'center', marginBottom: '5px' }}>Create Account</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>Join the system</p>
        </div>

        {error && (
          <div className="notification warning" style={{ marginBottom: '20px', borderRadius: 'var(--radius-md)', padding: '12px', background: 'rgba(255,100,100,0.1)', border: '1px solid var(--color-danger)' }}>
            <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>⚠️</span>
            <span style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</span>
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="register-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-input"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="register-input"
              style={{ appearance: 'auto' }}
            >
              <option value="guest">Guest</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
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
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Already have an account? Sign In</Link>
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
          max-width: 450px;
          background: var(--color-bg-card);
          padding: 40px;
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid var(--color-border);
        }
        .register-input {
          width: 100%;
          padding: 12px 15px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          background: var(--color-bg-body);
          color: var(--text-primary);
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
