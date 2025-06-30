import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface User {
  id: number
  username: string
  email: string
  role: string
}

const Authentication: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  })
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.username && loginForm.password) {
      const mockUser: User = {
        id: 1,
        username: loginForm.username,
        email: `${loginForm.username}@example.com`,
        role: 'user'
      }
      setUser(mockUser)
      setIsLoggedIn(true)
      setLoginForm({ username: '', password: '' })
      toast.success('Login successful!')
    } else {
      toast.error('Please fill in all fields')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (registerForm.username && registerForm.email && registerForm.password) {
      const mockUser: User = {
        id: 2,
        username: registerForm.username,
        email: registerForm.email,
        role: 'user'
      }
      setUser(mockUser)
      setIsLoggedIn(true)
      setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' })
      setShowRegister(false)
      toast.success('Registration successful!')
    } else {
      toast.error('Please fill in all fields')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    toast.success('Logout successful!')
  }

  if (isLoggedIn && user) {
    return (
      <div className="section">
        <h1>Welcome, {user.username}!</h1>
        <div className="grid">
          <div className="item">
            <h3>User Profile</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>
          
          <div className="item">
            <h3>Protected Content</h3>
            <p>This content is only visible to authenticated users.</p>
            <div data-testid="protected-content">
              <p>🎉 Congratulations! You have successfully logged in.</p>
              <p>This demonstrates protected route functionality.</p>
            </div>
          </div>
        </div>

        <div className="form-group">
          <button 
            onClick={handleLogout}
            style={{ background: '#e74c3c' }}
            data-testid="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <h1>Authentication Testing</h1>
      <p>This page demonstrates login/logout flows and session management.</p>

      <div className="grid">
        <div className="item">
          <h3>Login</h3>
          <form onSubmit={handleLogin} data-testid="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                required
                data-testid="login-username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                required
                data-testid="login-password"
              />
            </div>
            <button type="submit" data-testid="login-submit">
              Login
            </button>
          </form>
        </div>

        <div className="item">
          <h3>Register</h3>
          <button 
            onClick={() => setShowRegister(!showRegister)}
            data-testid="toggle-register"
          >
            {showRegister ? 'Hide Registration' : 'Show Registration'}
          </button>
          
          {showRegister && (
            <form onSubmit={handleRegister} data-testid="register-form">
              <div className="form-group">
                <label htmlFor="reg-username">Username</label>
                <input
                  id="reg-username"
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
                  required
                  data-testid="register-username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-email">Email</label>
                <input
                  id="reg-email"
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  data-testid="register-email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <input
                  id="reg-password"
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                  data-testid="register-password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-confirm-password">Confirm Password</label>
                <input
                  id="reg-confirm-password"
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  data-testid="register-confirm-password"
                />
              </div>
              <button type="submit" data-testid="register-submit">
                Register
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="section">
        <h3>Test Credentials</h3>
        <p>Use any username and password to test the login functionality:</p>
        <ul>
          <li><strong>Username:</strong> testuser</li>
          <li><strong>Password:</strong> password123</li>
        </ul>
        <p>Or register a new account using the registration form.</p>
      </div>
    </div>
  )
}

export default Authentication 