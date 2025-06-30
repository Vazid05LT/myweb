import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="section">
      <h1>🧪 Playwright Testing Demo</h1>
      <p>
        A comprehensive web application designed for testing Playwright capabilities on iOS and Android devices.
        This app is fully responsive and optimized for mobile automation testing.
      </p>

      <div className="section">
        <h2>🚀 Key Features</h2>
        <div className="grid">
          <div className="item">
            <h3>📱 Mobile-First Design</h3>
            <ul>
              <li>Fully responsive across all device sizes</li>
              <li>Touch-friendly 44px+ touch targets</li>
              <li>Mobile hamburger navigation</li>
              <li>Optimized for iOS and Android testing</li>
            </ul>
          </div>
          
          <div className="item">
            <h3>🧪 Testing Ready</h3>
            <ul>
              <li>Comprehensive data-testid attributes</li>
              <li>Visual feedback for automation debugging</li>
              <li>Consistent element selectors</li>
              <li>Predictable user interactions</li>
            </ul>
          </div>
          
          <div className="item">
            <h3>⚡ Performance Optimized</h3>
            <ul>
              <li>Fast loading times</li>
              <li>Smooth animations and transitions</li>
              <li>Efficient rendering</li>
              <li>Mobile-optimized assets</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>📋 Available Pages</h2>
        <div className="grid">
          <div className="item">
            <h3>🎯 Core Testing</h3>
            <Link to="/testing-features" className="feature-link">
              <strong>All Features</strong> - Complete testing capabilities
            </Link>
            <Link to="/responsive-demo" className="feature-link">
              <strong>Responsive Demo</strong> - Mobile-first design showcase
            </Link>
            <Link to="/forms" className="feature-link">
              <strong>Forms</strong> - Input validation and submission
            </Link>
            <Link to="/modals" className="feature-link">
              <strong>Modals</strong> - Overlay dialogs and popups
            </Link>
          </div>
          
          <div className="item">
            <h3>🔄 Dynamic Content</h3>
            <Link to="/dynamic-content" className="feature-link">
              <strong>Dynamic Content</strong> - AJAX and state changes
            </Link>
            <Link to="/infinite-scroll" className="feature-link">
              <strong>Infinite Scroll</strong> - Lazy loading content
            </Link>
            <Link to="/todo" className="feature-link">
              <strong>Todo App</strong> - CRUD operations
            </Link>
            <Link to="/file-upload" className="feature-link">
              <strong>File Upload</strong> - Drag & drop functionality
            </Link>
          </div>
          
          <div className="item">
            <h3>🔐 Advanced Features</h3>
            <Link to="/auth" className="feature-link">
              <strong>Authentication</strong> - Login/logout flows
            </Link>
            <Link to="/accessibility" className="feature-link">
              <strong>Accessibility</strong> - ARIA and screen readers
            </Link>
            <Link to="/performance" className="feature-link">
              <strong>Performance</strong> - Loading states and metrics
            </Link>
            <Link to="/error-handling" className="feature-link">
              <strong>Error Handling</strong> - Error states and recovery
            </Link>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>📱 Mobile Optimization</h2>
        <div className="grid">
          <div className="item">
            <h3>🎨 Responsive Design</h3>
            <ul>
              <li>CSS Grid and Flexbox layouts</li>
              <li>Fluid typography with clamp()</li>
              <li>Responsive spacing utilities</li>
              <li>Breakpoint-specific optimizations</li>
            </ul>
          </div>
          
          <div className="item">
            <h3>👆 Touch Interactions</h3>
            <ul>
              <li>44px minimum touch targets</li>
              <li>Touch-friendly form elements</li>
              <li>Gesture-friendly navigation</li>
              <li>Mobile-optimized buttons</li>
            </ul>
          </div>
          
          <div className="item">
            <h3>⚡ Performance</h3>
            <ul>
              <li>Optimized for mobile networks</li>
              <li>Efficient CSS animations</li>
              <li>Minimal JavaScript overhead</li>
              <li>Fast rendering on mobile devices</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>🧪 Testing Capabilities</h2>
        <p>
          This application is specifically designed for Playwright automation testing on mobile devices.
          Each interactive element includes data-testid attributes for reliable element selection.
        </p>
        
        <div className="grid">
          <div className="item">
            <h3>📱 iOS Testing</h3>
            <ul>
              <li>Touch gesture simulation</li>
              <li>Mobile Safari compatibility</li>
              <li>iOS-specific interactions</li>
              <li>Responsive layout testing</li>
            </ul>
          </div>
          
          <div className="item">
            <h3>🤖 Android Testing</h3>
            <ul>
              <li>Android Chrome testing</li>
              <li>Touch event handling</li>
              <li>Android-specific behaviors</li>
              <li>Cross-device compatibility</li>
            </ul>
          </div>
          
          <div className="item">
            <h3>🔍 Element Selection</h3>
            <ul>
              <li>Consistent data-testid attributes</li>
              <li>Semantic HTML structure</li>
              <li>Accessible element names</li>
              <li>Predictable selectors</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>🚀 Getting Started</h2>
        <p>
          Start exploring the application by visiting the different pages. Each page is designed to test
          specific Playwright capabilities and mobile interactions.
        </p>
        
        <div className="cta-buttons">
          <Link to="/testing-features" className="cta-button primary">
            🎯 View All Features
          </Link>
          <Link to="/responsive-demo" className="cta-button secondary">
            📱 Responsive Demo
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 