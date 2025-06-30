import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Accessibility: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [expandedSections, setExpandedSections] = useState<number[]>([])
  const [focusVisible, setFocusVisible] = useState(false)

  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content for tab 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content for tab 3' }
  ]

  const sections = [
    { id: 'section1', title: 'Collapsible Section 1', content: 'This is the content for section 1.' },
    { id: 'section2', title: 'Collapsible Section 2', content: 'This is the content for section 2.' },
    { id: 'section3', title: 'Collapsible Section 3', content: 'This is the content for section 3.' }
  ]

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <div className="section">
      <h1>Accessibility Testing</h1>
      <p>This page demonstrates accessibility features including ARIA labels, keyboard navigation, and screen reader support.</p>

      <div className="grid">
        <div className="item">
          <h3>Tab Navigation</h3>
          <p>Use Tab key to navigate between tabs, Enter/Space to select.</p>
          
          <div role="tablist" aria-label="Example tabs" data-testid="tab-list">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={selectedTab === index}
                aria-controls={`panel-${tab.id}`}
                id={tab.id}
                onClick={() => setSelectedTab(index)}
                onKeyDown={(e) => handleKeyDown(e, () => setSelectedTab(index))}
                data-testid={`tab-${index}`}
                style={{
                  background: selectedTab === index ? '#646cff' : 'transparent',
                  color: selectedTab === index ? 'white' : 'inherit',
                  border: '1px solid #ddd',
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={tab.id}
              hidden={selectedTab !== index}
              data-testid={`tab-panel-${index}`}
              style={{ padding: '1rem', border: '1px solid #ddd', marginTop: '1rem' }}
            >
              {tab.content}
            </div>
          ))}
        </div>

        <div className="item">
          <h3>Collapsible Sections</h3>
          <p>Use Enter/Space to expand/collapse sections.</p>
          
          {sections.map((section, index) => (
            <div key={section.id} data-testid={`section-${index}`}>
              <button
                aria-expanded={expandedSections.includes(index)}
                aria-controls={`content-${section.id}`}
                onClick={() => toggleSection(index)}
                onKeyDown={(e) => handleKeyDown(e, () => toggleSection(index))}
                data-testid={`section-button-${index}`}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem',
                  border: '1px solid #ddd',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <span aria-hidden="true">
                  {expandedSections.includes(index) ? '▼' : '▶'}
                </span>
                {' '}
                {section.title}
              </button>
              <div
                id={`content-${section.id}`}
                aria-hidden={!expandedSections.includes(index)}
                data-testid={`section-content-${index}`}
                style={{
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderTop: 'none',
                  display: expandedSections.includes(index) ? 'block' : 'none'
                }}
              >
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Form with Accessibility Features</h3>
        <form data-testid="accessible-form">
          <div className="form-group">
            <label htmlFor="name-input" id="name-label">Full Name *</label>
            <input
              id="name-input"
              type="text"
              aria-labelledby="name-label"
              aria-required="true"
              aria-describedby="name-help"
              data-testid="name-input"
            />
            <div id="name-help" className="help-text">
              Enter your full name as it appears on official documents.
            </div>
          </div>

          <div className="form-group">
            <fieldset>
              <legend id="gender-legend">Gender</legend>
              <div role="radiogroup" aria-labelledby="gender-legend">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    aria-describedby="gender-help"
                    data-testid="gender-male"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    aria-describedby="gender-help"
                    data-testid="gender-female"
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    aria-describedby="gender-help"
                    data-testid="gender-other"
                  />
                  Other
                </label>
              </div>
              <div id="gender-help" className="help-text">
                Please select your gender identity.
              </div>
            </fieldset>
          </div>

          <div className="form-group">
            <label htmlFor="email-input" id="email-label">Email Address *</label>
            <input
              id="email-input"
              type="email"
              aria-labelledby="email-label"
              aria-required="true"
              aria-invalid="false"
              data-testid="email-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message-input" id="message-label">Message</label>
            <textarea
              id="message-input"
              rows={4}
              aria-labelledby="message-label"
              aria-describedby="message-counter"
              data-testid="message-input"
            />
            <div id="message-counter" className="help-text">
              Character count: <span id="char-count">0</span>
            </div>
          </div>

          <button type="submit" data-testid="submit-form">
            Submit Form
          </button>
        </form>
      </div>

      <div className="section">
        <h3>Skip Links</h3>
        <nav aria-label="Skip links">
          <a href="#main-content" className="skip-link" data-testid="skip-main">
            Skip to main content
          </a>
          <a href="#navigation" className="skip-link" data-testid="skip-nav">
            Skip to navigation
          </a>
        </nav>
      </div>

      <div className="section">
        <h3>Live Regions</h3>
        <div aria-live="polite" aria-atomic="true" data-testid="live-region">
          <p>This is a live region that announces updates to screen readers.</p>
        </div>
        <button 
          onClick={() => toast.success('Update announced to screen readers!')}
          data-testid="announce-button"
        >
          Announce Update
        </button>
      </div>

      <div className="section">
        <h3>Accessibility Features Demonstrated</h3>
        <ul>
          <li><strong>ARIA Labels:</strong> Proper labeling for screen readers</li>
          <li><strong>Keyboard Navigation:</strong> Full keyboard accessibility</li>
          <li><strong>Tab Navigation:</strong> Accessible tab interface</li>
          <li><strong>Collapsible Sections:</strong> Expandable content with proper ARIA</li>
          <li><strong>Form Accessibility:</strong> Proper labels, descriptions, and validation</li>
          <li><strong>Skip Links:</strong> Quick navigation for keyboard users</li>
          <li><strong>Live Regions:</strong> Dynamic content announcements</li>
          <li><strong>Focus Management:</strong> Proper focus indicators and order</li>
          <li><strong>Semantic HTML:</strong> Proper use of HTML elements</li>
        </ul>
      </div>
    </div>
  )
}

export default Accessibility 