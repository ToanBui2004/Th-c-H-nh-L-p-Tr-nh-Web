import Head from 'next/head'
import dynamic from 'next/dynamic'
import POSTS from '../data/posts'

const PostsCarousel = dynamic(() => import('../components/PostsCarousel'), { ssr: false })

export default function Home() {
  const posts = POSTS

  return (
    <>
      <Head>
        <title>ToanBlog - Home</title>
        <meta name="description" content="Blog cá nhân — chia sẻ kiến thức và dự án" />
      </Head>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/">Toan<span className="brand-accent">Blog</span></a>
          <nav className="nav">
            <a href="/posts">Bài viết</a>
            <a href="/about">Giới thiệu</a>
            <a href="/contact">Liên hệ</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-text">
              <h1>Xin chào — Tôi là Toan</h1>
              <p>Chào mừng bạn đến với ToanBlog. Mình chia sẻ những mẹo về frontend, thiết kế giao diện, và các công cụ giúp bạn xây dựng web nhanh hơn.</p>
              <div className="hero-actions">
                <a className="btn primary" href="/posts">Xem bài mới</a>
                <a className="btn" href="/contact">Liên hệ</a>
              </div>
            </div>
            <div className="hero-side">
              <div className="avatar-circle">T</div>
            </div>
          </div>
        </section>

        <section id="bai-viet" className="section">
          <div className="container">
            <div className="section-head">
              <h2>Bài viết mới nhất</h2>
              <a className="link" href="/posts">Xem tất cả →</a>
            </div>

            <div>
              <PostsCarousel posts={posts} />
            </div>
          </div>
        </section>

        <section id="gioi-thieu" className="section alt">
          <div className="container about">
            <div className="about-text">
              <h2>Về mình</h2>
              <p>Mình là một người đam mê xây dựng sản phẩm trên web. Mục tiêu của blog là ghi lại quá trình học tập, thử nghiệm và những điều thú vị mình bắt gặp.</p>
              <ul className="about-list">
                <li>💼 Frontend developer tự do</li>
                <li>🛠 HTML, CSS, JavaScript</li>
                <li>📍 TP Hồ Chí Minh, Việt Nam</li>
              </ul>
            </div>

            <div className="about-card">
              <div className="stat">
                <span className="stat-num">120+</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} ToanBlog. All rights reserved.</p>
          <div className="socials">
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  )
}
