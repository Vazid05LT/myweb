import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const Performance: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [data, setData] = useState<string | null>(null)

  const handleLoadData = async () => {
    setLoading(true)
    setData(null)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setData('Performance data loaded!')
    setLoading(false)
    toast.success('Data loaded successfully!')
  }

  return (
    <div className="section">
      <h1>Performance Testing</h1>
      <p>This page demonstrates loading states, animations, and performance-related interactions.</p>

      <div className="grid">
        <div className="item">
          <h3>Loading State</h3>
          <button 
            onClick={handleLoadData}
            disabled={loading}
            data-testid="load-data-button"
          >
            {loading ? 'Loading...' : 'Load Data'}
          </button>
          {loading && <div className="loading" data-testid="loading-spinner"></div>}
          {data && <div className="success" data-testid="data-loaded">{data}</div>}
        </div>

        <div className="item">
          <h3>Animated Box</h3>
          <button 
            onClick={() => setShowAnimation(!showAnimation)}
            data-testid="toggle-animation"
          >
            {showAnimation ? 'Hide' : 'Show'} Animation
          </button>
          <div style={{ marginTop: '1rem', minHeight: '120px' }}>
            {showAnimation && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '100px',
                  height: '100px',
                  background: '#646cff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                data-testid="animated-box"
              >
                🚀
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Performance Features</h3>
        <ul>
          <li><strong>Loading States:</strong> Visual feedback during data fetching</li>
          <li><strong>Animations:</strong> Smooth transitions and animated elements</li>
          <li><strong>Async Operations:</strong> Simulated API calls and delays</li>
          <li><strong>Feedback:</strong> Success and error notifications</li>
        </ul>
      </div>
    </div>
  )
}

export default Performance 