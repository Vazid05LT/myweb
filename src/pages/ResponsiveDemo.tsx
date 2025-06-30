import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ResponsiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)

  const tabs = [
    { id: 'mobile', label: '📱 Mobile', content: 'Mobile-optimized content and interactions' },
    { id: 'tablet', label: '📱 Tablet', content: 'Tablet-specific layouts and features' },
    { id: 'desktop', label: '💻 Desktop', content: 'Desktop experience with full features' }
  ]

  return (
    <div className="section">
      <h1>Responsive Design Demo</h1>
      <p>This page demonstrates responsive design features across different device sizes.</p>

      {/* Device Preview */}
      <div className="section">
        <h2>Device Preview</h2>
        <p>Resize your browser window to see how the layout adapts to different screen sizes.</p>
        
        <div className="grid">
          <div className="item">
            <h3>📱 Mobile (&lt; 768px)</h3>
            <ul>
              <li>Single column layout</li>
              <li>Hamburger menu navigation</li>
              <li>Touch-friendly buttons (44px+)</li>
              <li>Stacked form elements</li>
            </ul>
          </div>
          
          <div className="item">
            <h3>📱 Tablet (768px - 1024px)</h3>
            <ul>
              <li>Two-column grid layout</li>
              <li>Horizontal navigation</li>
              <li>Medium-sized touch targets</li>
              <li>Responsive typography</li>
            </ul>
          </div>
          
          <div className="item">
            <h3>💻 Desktop (&gt; 1024px)</h3>
            <ul>
              <li>Multi-column layouts</li>
              <li>Full navigation menu</li>
              <li>Hover effects</li>
              <li>Large content areas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Responsive Tabs */}
      <div className="section">
        <h2>Responsive Tab Navigation</h2>
        
        <div className="responsive-tabs">
          <div className="tab-buttons">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={activeTab === index ? 'active' : ''}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            <div data-testid={`tab-content-${tabs[activeTab].id}`}>
              <h3>{tabs[activeTab].label}</h3>
              <p>{tabs[activeTab].content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="section">
        <h2>Responsive Grid Layout</h2>
        <p>This grid automatically adjusts columns based on screen size.</p>
        
        <div className="grid grid-cols-3">
          <div className="item" data-testid="grid-item-1">
            <h4>Grid Item 1</h4>
            <p>This item adapts to the grid layout.</p>
          </div>
          <div className="item" data-testid="grid-item-2">
            <h4>Grid Item 2</h4>
            <p>This item adapts to the grid layout.</p>
          </div>
          <div className="item" data-testid="grid-item-3">
            <h4>Grid Item 3</h4>
            <p>This item adapts to the grid layout.</p>
          </div>
        </div>
      </div>

      {/* Touch-Friendly Elements */}
      <div className="section">
        <h2>Touch-Friendly Elements</h2>
        <p>All interactive elements meet minimum 44px touch targets for mobile devices.</p>
        
        <div className="grid">
          <div className="item">
            <h3>Buttons</h3>
            <button data-testid="touch-button-1">Large Touch Button</button>
            <button data-testid="touch-button-2" style={{ marginTop: '0.5rem' }}>Another Button</button>
          </div>
          
          <div className="item">
            <h3>Form Elements</h3>
            <input 
              type="text" 
              placeholder="Touch-friendly input"
              data-testid="touch-input"
            />
            <select data-testid="touch-select" style={{ marginTop: '0.5rem' }}>
              <option>Touch-friendly select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
          
          <div className="item">
            <h3>Checkboxes & Radio</h3>
            <label>
              <input type="checkbox" data-testid="touch-checkbox" />
              Touch-friendly checkbox
            </label>
            <label>
              <input type="radio" name="radio" data-testid="touch-radio" />
              Touch-friendly radio
            </label>
          </div>
        </div>
      </div>

      {/* Responsive Typography */}
      <div className="section">
        <h2>Responsive Typography</h2>
        <p>Text sizes automatically adjust based on viewport width.</p>
        
        <div className="responsive-text-demo">
          <h1 data-testid="responsive-h1">Responsive Heading 1</h1>
          <h2 data-testid="responsive-h2">Responsive Heading 2</h2>
          <h3 data-testid="responsive-h3">Responsive Heading 3</h3>
          <p data-testid="responsive-p">
            This paragraph text automatically scales with the viewport size using CSS clamp().
            The font size will be responsive and readable on all devices.
          </p>
          <small data-testid="responsive-small">Small responsive text</small>
        </div>
      </div>

      {/* Mobile Navigation Demo */}
      <div className="section">
        <h2>Mobile Navigation Demo</h2>
        <p>Toggle the sidebar to simulate mobile navigation patterns.</p>
        
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          data-testid="toggle-sidebar"
        >
          {showSidebar ? 'Hide' : 'Show'} Sidebar
        </button>
        
        <div className="sidebar-demo">
          <div className={`sidebar ${showSidebar ? 'open' : ''}`} data-testid="demo-sidebar">
            <h3>Sidebar Menu</h3>
            <nav>
              <a href="#" data-testid="sidebar-link-1">Menu Item 1</a>
              <a href="#" data-testid="sidebar-link-2">Menu Item 2</a>
              <a href="#" data-testid="sidebar-link-3">Menu Item 3</a>
              <a href="#" data-testid="sidebar-link-4">Menu Item 4</a>
            </nav>
          </div>
          
          <div className="main-content">
            <p>Main content area. The sidebar will overlay on mobile and push content on desktop.</p>
          </div>
        </div>
      </div>

      {/* Responsive Images */}
      <div className="section">
        <h2>Responsive Images</h2>
        <p>Images that adapt to different screen sizes.</p>
        
        <div className="grid">
          <div className="item">
            <img 
              src="https://picsum.photos/400/300?random=1" 
              alt="Responsive image 1"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              data-testid="responsive-image-1"
            />
            <p>This image scales with its container</p>
          </div>
          <div className="item">
            <img 
              src="https://picsum.photos/400/300?random=2" 
              alt="Responsive image 2"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              data-testid="responsive-image-2"
            />
            <p>This image also scales responsively</p>
          </div>
        </div>
      </div>

      {/* Responsive Utilities */}
      <div className="section">
        <h2>Responsive Utilities</h2>
        <p>CSS utility classes for responsive spacing and layout.</p>
        
        <div className="grid">
          <div className="item p-2">
            <h4>Responsive Padding</h4>
            <p>This item uses responsive padding utilities.</p>
          </div>
          <div className="item p-3">
            <h4>More Padding</h4>
            <p>This item has more responsive padding.</p>
          </div>
          <div className="item p-4">
            <h4>Maximum Padding</h4>
            <p>This item has the maximum responsive padding.</p>
          </div>
        </div>
      </div>

      {/* Current Viewport Info */}
      <div className="section">
        <h2>Current Viewport Information</h2>
        <div data-testid="viewport-info">
          <p><strong>Screen Width:</strong> <span id="screen-width">{window.innerWidth}px</span></p>
          <p><strong>Screen Height:</strong> <span id="screen-height">{window.innerHeight}px</span></p>
          <p><strong>Device Type:</strong> 
            <span id="device-type">
              {window.innerWidth < 768 ? 'Mobile' : 
               window.innerWidth < 1024 ? 'Tablet' : 'Desktop'}
            </span>
          </p>
          <p><strong>Touch Support:</strong> <span id="touch-support">{'ontouchstart' in window ? 'Yes' : 'No'}</span></p>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveDemo 