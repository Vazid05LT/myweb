import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

interface Item {
  id: number
  title: string
  description: string
  image: string
}

const InfiniteScroll: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observerRef = useRef<HTMLDivElement>(null)

  const generateItems = (pageNum: number): Item[] => {
    const startId = (pageNum - 1) * 10 + 1
    return Array.from({ length: 10 }, (_, index) => ({
      id: startId + index,
      title: `Item ${startId + index}`,
      description: `This is the description for item ${startId + index}. It contains some sample text to demonstrate the infinite scroll functionality.`,
      image: `https://picsum.photos/300/200?random=${startId + index}`
    }))
  }

  const loadMoreItems = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newItems = generateItems(page)
    setItems(prev => [...prev, ...newItems])
    setPage(prev => prev + 1)

    // Stop loading more after 10 pages (100 items)
    if (page >= 10) {
      setHasMore(false)
      toast.success('All items loaded!')
    }

    setLoading(false)
  }

  useEffect(() => {
    loadMoreItems()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, page])

  return (
    <div className="section">
      <h1>Infinite Scroll Testing</h1>
      <p>This page demonstrates infinite scrolling functionality with dynamic content loading.</p>

      <div className="section">
        <h3>Scroll to Load More</h3>
        <p>Scroll down to automatically load more items. Currently loaded: {items.length} items</p>
        
        <div className="infinite-scroll" data-testid="infinite-scroll-container">
          {items.map(item => (
            <div key={item.id} className="item" data-testid={`scroll-item-${item.id}`}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: '100px', height: '67px', objectFit: 'cover', borderRadius: '4px' }}
                  data-testid={`item-image-${item.id}`}
                />
                <div>
                  <h4 data-testid={`item-title-${item.id}`}>{item.title}</h4>
                  <p data-testid={`item-description-${item.id}`}>{item.description}</p>
                  <small>ID: {item.id}</small>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }} data-testid="loading-more">
              <div className="loading"></div>
              <p>Loading more items...</p>
            </div>
          )}

          {!hasMore && (
            <div style={{ textAlign: 'center', padding: '2rem' }} data-testid="no-more-items">
              <p>No more items to load</p>
            </div>
          )}

          <div ref={observerRef} style={{ height: '20px' }} data-testid="observer-target" />
        </div>
      </div>

      <div className="section">
        <h3>Infinite Scroll Features</h3>
        <ul>
          <li><strong>Automatic Loading:</strong> Loads more content as you scroll down</li>
          <li><strong>Loading States:</strong> Visual feedback during content loading</li>
          <li><strong>Intersection Observer:</strong> Uses modern browser API for efficient scroll detection</li>
          <li><strong>Dynamic Content:</strong> Generates unique content for each item</li>
          <li><strong>Image Loading:</strong> Loads random images for each item</li>
          <li><strong>End Detection:</strong> Stops loading when all content is loaded</li>
          <li><strong>Performance:</strong> Efficient rendering with proper cleanup</li>
        </ul>
      </div>
    </div>
  )
}

export default InfiniteScroll 