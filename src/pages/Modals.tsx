import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Modals: React.FC = () => {
  const [showBasicModal, setShowBasicModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showNestedModal, setShowNestedModal] = useState(false)
  const [showNestedPopup, setShowNestedPopup] = useState(false)
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

        <div className="item">
          <h3>Nested Popup Demo</h3>
          <p>Open a popup that contains multiple CTAs to trigger nested popups.</p>
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button 
              onClick={() => setShowNestedModal(true)}
              data-testid="open-nested-modal"
              style={{ 
                background: '#646cff', 
                color: 'white',
                padding: '12px 16px',
                fontSize: '14px',
                minWidth: '140px',
                height: '48px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(100, 108, 255, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              🚀 Open Primary Popup
            </button>
            <button 
              onClick={() => setShowNestedModal(true)}
              data-testid="open-nested-modal-alt"
              style={{ 
                background: '#28a745', 
                color: 'white',
                padding: '12px 16px',
                fontSize: '14px',
                minWidth: '140px',
                height: '48px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              ✨ Try Nested Popups
            </button>
            <button 
              onClick={() => setShowNestedModal(true)}
              data-testid="open-nested-modal-cta"
              style={{ 
                background: '#ff6b35', 
                color: 'white',
                padding: '12px 16px',
                fontSize: '14px',
                minWidth: '140px',
                height: '48px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              🎯 Explore Features
            </button>
          </div>
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

      {/* Nested Modal - Primary Popup */}
      {showNestedModal && (
        <div className="modal" data-testid="nested-modal">
          <div className="modal-content" style={{ 
            maxWidth: '90vw',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            margin: '20px',
            padding: '20px'
          }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '15px' }}>
              🎉 Primary Popup with Multiple CTAs
            </h2>
            <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', marginBottom: '20px', lineHeight: '1.5' }}>
              This popup contains several call-to-action buttons. Click any of them to open a nested popup!
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
              gap: '12px', 
              margin: '20px 0' 
            }}>
              <button 
                onClick={() => setShowNestedPopup(true)}
                data-testid="open-nested-popup-1"
                style={{ 
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                  fontWeight: '600',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                🚀 Launch Nested Popup
              </button>
              
              <button 
                onClick={() => setShowNestedPopup(true)}
                data-testid="open-nested-popup-2"
                style={{ 
                  background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                  fontWeight: '600',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                ✨ Show Details
              </button>
              
              <button 
                onClick={() => setShowNestedPopup(true)}
                data-testid="open-nested-popup-3"
                style={{ 
                  background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                  fontWeight: '600',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                🎯 Get Started
              </button>
              
              <button 
                onClick={() => setShowNestedPopup(true)}
                data-testid="open-nested-popup-4"
                style={{ 
                  background: 'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                  fontWeight: '600',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                💡 Learn More
              </button>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'center',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => setShowNestedModal(false)}
                data-testid="close-nested-modal"
                style={{ 
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  fontWeight: '600',
                  minHeight: '48px',
                  minWidth: '100px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nested Popup - Secondary Modal */}
      {showNestedPopup && (
        <div className="modal" data-testid="nested-popup" style={{ zIndex: 1001 }}>
          <div className="modal-content" style={{ 
            maxWidth: '90vw',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            margin: '20px',
            padding: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white' 
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', 
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              🎊 Nested Popup Activated!
            </h2>
            <p style={{ 
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', 
              marginBottom: '20px', 
              lineHeight: '1.5',
              textAlign: 'center'
            }}>
              Congratulations! You successfully opened a nested popup. This demonstrates the layered modal functionality.
            </p>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              padding: '20px', 
              borderRadius: '15px', 
              margin: '20px 0',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ 
                margin: '0 0 20px 0', 
                color: '#fff',
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                textAlign: 'center'
              }}>
                Available Actions:
              </h3>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}>
                <button 
                  onClick={() => toast.success('Action 1 executed!')}
                  data-testid="nested-action-1"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                    fontWeight: '600',
                    minHeight: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  🔥 Execute Action 1
                </button>
                
                <button 
                  onClick={() => toast('Action 2 executed!', { icon: 'ℹ️' })}
                  data-testid="nested-action-2"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                    fontWeight: '600',
                    minHeight: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  ⚡ Execute Action 2
                </button>
                
                <button 
                  onClick={() => toast('Action 3 executed!', { icon: '⚠️' })}
                  data-testid="nested-action-3"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                    fontWeight: '600',
                    minHeight: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  🎯 Execute Action 3
                </button>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center', 
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => setShowNestedPopup(false)}
                data-testid="close-nested-popup"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  minHeight: '48px',
                  minWidth: '120px',
                  transition: 'all 0.2s ease'
                }}
              >
                Close Nested
              </button>
              
              <button 
                onClick={() => {
                  setShowNestedPopup(false)
                  setShowNestedModal(false)
                }}
                data-testid="close-all-popups"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  minHeight: '48px',
                  minWidth: '120px',
                  transition: 'all 0.2s ease'
                }}
              >
                Close All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop click handler for all modals */}
      {(showBasicModal || showFormModal || showConfirmModal || showAlertModal || showNestedModal || showNestedPopup) && (
        <div 
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              // Close nested popup first, then primary modal
              if (showNestedPopup) {
                setShowNestedPopup(false)
              } else if (showNestedModal) {
                setShowNestedModal(false)
              } else {
                setShowBasicModal(false)
                setShowFormModal(false)
                setShowConfirmModal(false)
                setShowAlertModal(false)
              }
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: showNestedPopup ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
            zIndex: showNestedPopup ? 1000 : 999
          }}
        />
      )}
    </div>
  )
}

export default Modals 