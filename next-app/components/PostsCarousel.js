import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function PostsCarousel({ posts = [] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(3)
  const intervalRef = useRef(null)
  const pauseRef = useRef(false)
  const trackRef = useRef(null)

  useEffect(() => {
    function updateVisible() {
      const w = window.innerWidth
      if (w < 560) setVisible(1)
      else if (w < 900) setVisible(2)
      else setVisible(3)
    }
    updateVisible()
    window.addEventListener('resize', updateVisible)
    return () => window.removeEventListener('resize', updateVisible)
  }, [])

  useEffect(() => {
    if (!posts || posts.length === 0) return
    intervalRef.current = setInterval(() => {
      if (!pauseRef.current) setIndex(i => {
        const maxIndex = Math.max(0, posts.length - visible)
        const next = i + 1
        return next > maxIndex ? 0 : next
      })
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [posts, visible])

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)) }

  function goTo(i) {
    const maxIndex = Math.max(0, posts.length - visible)
    setIndex(clamp(i, 0, maxIndex))
  }

  function prev() { goTo(index - 1) }
  function next() { goTo(index + 1) }

  // calculate translateX percent
  // percent offset for track: each item occupies (100 / visible)% of viewport
  const percent = -(index * (100 / visible))

  return (
    <div className="carousel" onMouseEnter={() => (pauseRef.current = true)} onMouseLeave={() => (pauseRef.current = false)}>
      <div className="carousel-viewport">
        <div className="carousel-track" ref={trackRef} style={{ transform: `translateX(${percent}%)` }}>
          {posts.map((p, i) => (
            <article key={i} className="carousel-item" style={{ width: `${100 / visible}%` }}>
              <Link href={`/posts/${p.slug}`} className="post-thumb" aria-hidden="true">
                {/* empty thumb — you can set background-image via CSS when p.thumb exists */}
              </Link>
              <div className="post-content">
                <Link href={`/posts/${p.slug}`} className="post-title">{p.title}</Link>
                <p className="post-excerpt">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="carousel-controls" aria-hidden="false">
        <button className="carousel-btn prev" onClick={prev} aria-label="Previous">‹</button>
        <button className="carousel-btn next" onClick={next} aria-label="Next">›</button>
      </div>

      <div className="carousel-dots" role="tablist">
        {posts.map((_, i) => (
          <button key={i} className={`carousel-dot${i === index ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
