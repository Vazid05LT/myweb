import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const DynamicContent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      const data = await response.json()
      setPosts(data)
      setFilteredPosts(data)
      toast.success('Posts loaded successfully!')
    } catch (error) {
      toast.error('Failed to load posts')
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.body.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredPosts(filtered)
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleRefresh = () => {
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="section">
      <h1>Dynamic Content Testing</h1>
      <p>This page demonstrates dynamic content loading, AJAX requests, and real-time updates.</p>

      <div className="grid">
        <div className="item">
          <h3>Load Posts</h3>
          <p>Fetch posts from a mock API with loading states.</p>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            data-testid="load-posts-button"
          >
            {loading ? 'Loading...' : 'Load Posts'}
          </button>
        </div>

        <div className="item">
          <h3>Search Posts</h3>
          <p>Filter posts in real-time as you type.</p>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            data-testid="search-input"
          />
        </div>
      </div>

      {loading && (
        <div className="section" data-testid="loading-indicator">
          <div className="loading"></div>
          <p>Loading posts...</p>
        </div>
      )}

      {!loading && filteredPosts.length > 0 && (
        <div className="section">
          <h3>Posts ({filteredPosts.length})</h3>
          <div className="grid">
            {filteredPosts.map(post => (
              <div 
                key={post.id} 
                className="item"
                onClick={() => handlePostClick(post)}
                style={{ cursor: 'pointer' }}
                data-testid={`post-${post.id}`}
              >
                <h4>{post.title}</h4>
                <p>{post.body.substring(0, 100)}...</p>
                <small>Post ID: {post.id}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && filteredPosts.length === 0 && posts.length > 0 && (
        <div className="section">
          <p>No posts found matching "{searchTerm}"</p>
        </div>
      )}

      {selectedPost && (
        <div className="modal" data-testid="post-detail-modal">
          <div className="modal-content">
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small>Post ID: {selectedPost.id} | User ID: {selectedPost.userId}</small>
              <button 
                onClick={() => setSelectedPost(null)}
                data-testid="close-post-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="section">
        <h3>Real-time Updates</h3>
        <p>This section demonstrates real-time content updates.</p>
        <div id="real-time-content" data-testid="real-time-content">
          <p>Content will update every 5 seconds...</p>
        </div>
      </div>
    </div>
  )
}

export default DynamicContent 