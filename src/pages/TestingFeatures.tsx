import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const TestingFeatures: React.FC = () => {
  const [counter, setCounter] = useState(0)
  const [text, setText] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [checkboxes, setCheckboxes] = useState<{[key: string]: boolean}>({})
  const [sliderValue, setSliderValue] = useState(50)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dynamicContent, setDynamicContent] = useState<string[]>([])
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleCheckboxChange = (name: string) => {
    setCheckboxes(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(true)
      toast.success('File uploaded successfully!')
    }
  }

  const loadDynamicContent = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDynamicContent(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'])
    setLoading(false)
    toast.success('Dynamic content loaded!')
  }

  return (
    <div className="section">
      <h1>Complete Testing Features</h1>
      <p>This page contains all testing features in one place for comprehensive Playwright automation testing.</p>

      {/* Basic Interactions */}
      <div className="section">
        <h2>Basic Interactions</h2>
        
        <div className="grid">
          <div className="item">
            <h3>Click Interactions</h3>
            <button 
              onClick={() => setCounter(prev => prev + 1)}
              data-testid="increment-button"
            >
              Increment Counter
            </button>
            <p>Counter: <span data-testid="counter-value">{counter}</span></p>
            
            <button 
              onClick={() => setCounter(0)}
              data-testid="reset-button"
            >
              Reset Counter
            </button>
          </div>

          <div className="item">
            <h3>Text Input</h3>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
              data-testid="text-input"
            />
            <p>You typed: <span data-testid="text-display">{text}</span></p>
          </div>
        </div>
      </div>

      {/* Form Elements */}
      <div className="section">
        <h2>Form Elements</h2>
        
        <div className="grid">
          <div className="item">
            <h3>Select Dropdown</h3>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              data-testid="select-dropdown"
            >
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <p>Selected: <span data-testid="selected-value">{selectedOption}</span></p>
          </div>

          <div className="item">
            <h3>Checkboxes</h3>
            <label>
              <input
                type="checkbox"
                checked={checkboxes.checkbox1 || false}
                onChange={() => handleCheckboxChange('checkbox1')}
                data-testid="checkbox-1"
              />
              Checkbox 1
            </label>
            <label>
              <input
                type="checkbox"
                checked={checkboxes.checkbox2 || false}
                onChange={() => handleCheckboxChange('checkbox2')}
                data-testid="checkbox-2"
              />
              Checkbox 2
            </label>
            <label>
              <input
                type="checkbox"
                checked={checkboxes.checkbox3 || false}
                onChange={() => handleCheckboxChange('checkbox3')}
                data-testid="checkbox-3"
              />
              Checkbox 3
            </label>
          </div>

          <div className="item">
            <h3>Radio Buttons</h3>
            <label>
              <input
                type="radio"
                name="radio-group"
                value="radio1"
                data-testid="radio-1"
              />
              Radio 1
            </label>
            <label>
              <input
                type="radio"
                name="radio-group"
                value="radio2"
                data-testid="radio-2"
              />
              Radio 2
            </label>
            <label>
              <input
                type="radio"
                name="radio-group"
                value="radio3"
                data-testid="radio-3"
              />
              Radio 3
            </label>
          </div>

          <div className="item">
            <h3>Slider</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              data-testid="slider-input"
            />
            <p>Slider value: <span data-testid="slider-value">{sliderValue}</span></p>
          </div>
        </div>
      </div>

      {/* Modals and Popups */}
      <div className="section">
        <h2>Modals and Popups</h2>
        
        <button 
          onClick={() => setShowModal(true)}
          data-testid="open-modal-button"
        >
          Open Modal
        </button>

        {showModal && (
          <div className="modal" data-testid="test-modal">
            <div className="modal-content">
              <h3>Test Modal</h3>
              <p>This is a test modal for automation testing.</p>
              <button 
                onClick={() => setShowModal(false)}
                data-testid="close-modal-button"
              >
                Close Modal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Content */}
      <div className="section">
        <h2>Dynamic Content</h2>
        
        <button 
          onClick={loadDynamicContent}
          disabled={loading}
          data-testid="load-content-button"
        >
          {loading ? 'Loading...' : 'Load Dynamic Content'}
        </button>

        {loading && <div className="loading" data-testid="loading-spinner"></div>}

        {dynamicContent.length > 0 && (
          <div data-testid="dynamic-content-list">
            {dynamicContent.map((item, index) => (
              <div key={index} className="item" data-testid={`dynamic-item-${index}`}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Upload */}
      <div className="section">
        <h2>File Upload</h2>
        
        <input
          type="file"
          onChange={handleFileUpload}
          data-testid="file-input"
        />
        
        {fileUploaded && (
          <div className="success" data-testid="file-upload-success">
            File uploaded successfully!
          </div>
        )}
        
        <p className="note">
          <strong>Note:</strong> For comprehensive image testing features including drag & drop, 
          canvas manipulation, and image processing, visit the{' '}
          <a href="/image-injection" data-testid="image-injection-link">Image Injection</a> page.
        </p>
      </div>

      {/* Links and Navigation */}
      <div className="section">
        <h2>Links and Navigation</h2>
        
        <a href="#test-anchor" data-testid="test-link">
          Test Link
        </a>
        
        <button 
          onClick={() => window.scrollTo(0, 0)}
          data-testid="scroll-top-button"
        >
          Scroll to Top
        </button>
      </div>

      {/* Status Indicators */}
      <div className="section">
        <h2>Status Indicators</h2>
        
        <div className="grid">
          <div className="item">
            <div className="status-indicator success"></div>
            <span data-testid="success-indicator">Success Status</span>
          </div>
          <div className="item">
            <div className="status-indicator error"></div>
            <span data-testid="error-indicator">Error Status</span>
          </div>
          <div className="item">
            <div className="status-indicator warning"></div>
            <span data-testid="warning-indicator">Warning Status</span>
          </div>
          <div className="item">
            <div className="status-indicator info"></div>
            <span data-testid="info-indicator">Info Status</span>
          </div>
        </div>
      </div>

      {/* Responsive Elements */}
      <div className="section">
        <h2>Responsive Elements</h2>
        
        <div className="grid">
          <div className="item" data-testid="responsive-item-1">
            <h3>Responsive Item 1</h3>
            <p>This item adapts to different screen sizes.</p>
          </div>
          <div className="item" data-testid="responsive-item-2">
            <h3>Responsive Item 2</h3>
            <p>This item adapts to different screen sizes.</p>
          </div>
          <div className="item" data-testid="responsive-item-3">
            <h3>Responsive Item 3</h3>
            <p>This item adapts to different screen sizes.</p>
          </div>
        </div>
      </div>

      {/* Hidden Elements */}
      <div className="section">
        <h2>Hidden Elements</h2>
        
        <div style={{ display: 'none' }} data-testid="hidden-element">
          This element is hidden
        </div>
        
        <div style={{ visibility: 'hidden' }} data-testid="invisible-element">
          This element is invisible
        </div>
        
        <div style={{ opacity: 0 }} data-testid="transparent-element">
          This element is transparent
        </div>
      </div>

      {/* Test Results Summary */}
      <div className="section">
        <h2>Test Results Summary</h2>
        <div data-testid="test-summary">
          <p>Counter: {counter}</p>
          <p>Text: {text}</p>
          <p>Selected Option: {selectedOption}</p>
          <p>Checkboxes: {Object.values(checkboxes).filter(Boolean).length} selected</p>
          <p>Slider Value: {sliderValue}</p>
          <p>Modal Open: {showModal ? 'Yes' : 'No'}</p>
          <p>Dynamic Content Items: {dynamicContent.length}</p>
          <p>File Uploaded: {fileUploaded ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  )
}

export default TestingFeatures 