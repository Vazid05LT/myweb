import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ErrorHandling: React.FC = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!input.trim()) {
      setError('Input cannot be empty!')
      toast.error('Input cannot be empty!')
      return
    }
    if (input.length < 5) {
      setError('Input must be at least 5 characters long!')
      toast.error('Input must be at least 5 characters long!')
      return
    }
    setSuccess('Input is valid!')
    toast.success('Input is valid!')
  }

  return (
    <div className="section">
      <h1>Error Handling Testing</h1>
      <p>This page demonstrates error scenarios, form validation errors, and error message displays.</p>

      <form onSubmit={handleSubmit} data-testid="error-form">
        <div className="form-group">
          <label htmlFor="error-input">Test Input *</label>
          <input
            id="error-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter at least 5 characters"
            data-testid="error-input"
          />
        </div>
        {error && <div className="error" data-testid="error-message">{error}</div>}
        {success && <div className="success" data-testid="success-message">{success}</div>}
        <button type="submit" data-testid="submit-error-form">
          Submit
        </button>
      </form>

      <div className="section">
        <h3>Error Handling Features</h3>
        <ul>
          <li><strong>Form Validation:</strong> Required fields, minimum length</li>
          <li><strong>Error Messages:</strong> Display error and success messages</li>
          <li><strong>Notifications:</strong> Toast notifications for errors and success</li>
        </ul>
      </div>
    </div>
  )
}

export default ErrorHandling 