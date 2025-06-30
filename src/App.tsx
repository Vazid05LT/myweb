import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Forms from './pages/Forms'
import Modals from './pages/Modals'
import DynamicContent from './pages/DynamicContent'
import Authentication from './pages/Authentication'
import FileUpload from './pages/FileUpload'
import TodoApp from './pages/TodoApp'
import InfiniteScroll from './pages/InfiniteScroll'
import Accessibility from './pages/Accessibility'
import Performance from './pages/Performance'
import ErrorHandling from './pages/ErrorHandling'
import TestingFeatures from './pages/TestingFeatures'
import ResponsiveDemo from './pages/ResponsiveDemo'
import ImageInjection from './pages/ImageInjection'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/testing-features', label: 'All Features' },
    { path: '/responsive-demo', label: 'Responsive Demo' },
    { path: '/forms', label: 'Forms' },
    { path: '/modals', label: 'Modals' },
    { path: '/dynamic-content', label: 'Dynamic Content' },
    { path: '/auth', label: 'Authentication' },
    { path: '/file-upload', label: 'File Upload' },
    { path: '/image-injection', label: 'Image Injection' },
    { path: '/todo', label: 'Todo App' },
    { path: '/infinite-scroll', label: 'Infinite Scroll' },
    { path: '/accessibility', label: 'Accessibility' },
    { path: '/performance', label: 'Performance' },
    { path: '/error-handling', label: 'Error Handling' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="App">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span>🧪 Playwright Demo</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            data-testid="mobile-menu-button"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Desktop navigation */}
          <div className="nav-links desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing-features" element={<TestingFeatures />} />
          <Route path="/responsive-demo" element={<ResponsiveDemo />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/modals" element={<Modals />} />
          <Route path="/dynamic-content" element={<DynamicContent />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/file-upload" element={<FileUpload />} />
          <Route path="/image-injection" element={<ImageInjection />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/error-handling" element={<ErrorHandling />} />
        </Routes>
      </div>

      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '14px',
            padding: '12px 16px',
            borderRadius: '8px',
          },
        }}
      />
    </div>
  )
}

export default App 