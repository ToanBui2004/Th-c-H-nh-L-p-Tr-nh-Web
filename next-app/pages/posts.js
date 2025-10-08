import Head from 'next/head'
import Link from 'next/link'
import POSTS from '../data/posts'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Bài viết | ToanBlog</title>
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
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Danh sách bài viết</h2>
            </div>

            <div className="posts-grid">
              {POSTS.map((p, idx) => (
                <article className="post-card" key={idx}>
                  <Link href={`/posts/${p.slug}`} className="post-thumb" aria-label={p.title}></Link>
                  <div className="post-content">
                    <Link href={`/posts/${p.slug}`} className="post-title">{p.title}</Link>
                    <p className="post-excerpt">{p.date} • {p.read} đọc</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} ToanBlog. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
