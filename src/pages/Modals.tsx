import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Modals: React.FC = () => {
  const [showBasicModal, setShowBasicModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Modal form submitted:', formData)
    toast.success('Modal form submitted!')
    setShowFormModal(false)
    setFormData({ name: '', email: '' })
  }

  const handleConfirm = () => {
    toast.success('Action confirmed!')
    setShowConfirmModal(false)
  }

  const handleAlertClose = () => {
    setShowAlertModal(false)
    toast.success('Alert closed!')
  }

  return (
    <div className="section">
      <h1>Modals & Popups Testing</h1>
      <p>This page contains various modal dialogs and popup interactions to test Playwright modal handling.</p>

      <div className="grid">
        <div className="item">
          <h3>Basic Modal</h3>
          <p>Simple modal with close button and backdrop click.</p>
          <button 
            onClick={() => setShowBasicModal(true)}
            data-testid="open-basic-modal"
          >
            Open Basic Modal
          </button>
        </div>

        <div className="item">
          <h3>Form Modal</h3>
          <p>Modal containing a form with validation.</p>
          <button 
            onClick={() => setShowFormModal(true)}
            data-testid="open-form-modal"
          >
            Open Form Modal
          </button>
        </div>

        <div className="item">
          <h3>Confirmation Modal</h3>
          <p>Modal with confirm/cancel actions.</p>
          <button 
            onClick={() => setShowConfirmModal(true)}
            data-testid="open-confirm-modal"
          >
            Open Confirm Modal
          </button>
        </div>

        <div className="item">
          <h3>Alert Modal</h3>
          <p>Simple alert-style modal.</p>
          <button 
            onClick={() => setShowAlertModal(true)}
            data-testid="open-alert-modal"
          >
            Open Alert Modal
          </button>
        </div>

        <div className="item">
          <h3>Tooltip</h3>
          <p>Hover to show tooltip.</p>
          <button 
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            data-testid="tooltip-trigger"
          >
            Hover for Tooltip
          </button>
          {showTooltip && (
            <div 
              className="tooltip"
              data-testid="tooltip"
              style={{
                position: 'absolute',
                background: '#333',
                color: 'white',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '14px',
                zIndex: 1000
              }}
            >
              This is a tooltip message!
            </div>
          )}
        </div>
      </div>

      {/* Basic Modal */}
      {showBasicModal && (
        <div className="modal" data-testid="basic-modal">
          <div className="modal-content">
            <h2>Basic Modal</h2>
            <p>This is a basic modal dialog. You can close it by clicking the close button or clicking outside the modal.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowBasicModal(false)}
                data-testid="close-basic-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="modal" data-testid="form-modal">
          <div className="modal-content">
            <h2>Form Modal</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="modal-name">Name</label>
                <input
                  id="modal-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  data-testid="modal-name-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-email">Email</label>
                <input
                  id="modal-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  data-testid="modal-email-input"
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => setShowFormModal(false)}
                  data-testid="cancel-form-modal"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  data-testid="submit-form-modal"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal" data-testid="confirm-modal">
          <div className="modal-content">
            <h2>Confirm Action</h2>
            <p>Are you sure you want to perform this action? This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowConfirmModal(false)}
                data-testid="cancel-confirm-modal"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                style={{ background: '#e74c3c' }}
                data-testid="confirm-action"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="modal" data-testid="alert-modal">
          <div className="modal-content">
            <h2>Alert</h2>
            <p>This is an important alert message that requires user attention.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleAlertClose}
                data-testid="close-alert-modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop click handler for all modals */}
      {(showBasicModal || showFormModal || showConfirmModal || showAlertModal) && (
        <div 
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowBasicModal(false)
              setShowFormModal(false)
              setShowConfirmModal(false)
              setShowAlertModal(false)
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        />
      )}
    </div>
  )
}

export default Modals 