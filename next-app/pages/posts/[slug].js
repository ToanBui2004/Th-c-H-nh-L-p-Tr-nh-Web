import { useRouter } from 'next/router'
import Head from 'next/head'
import POSTS from '../../data/posts'

export default function PostPage() {
  const router = useRouter()
  const { query } = router
  const slug = query.slug
  const post = POSTS.find(p => p.slug === slug)

  if (!post) return (
    <div className="container" style={{padding:40}}>
      <h2>Không tìm thấy bài viết</h2>
    </div>
  )

  return (
    <>
      <Head>
        <title>{post.title} | ToanBlog</title>
        <meta name="description" content={post.excerpt} />
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
        <section className="page-banner">
          <div className="container">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
              <div>
                <nav className="breadcrumb" aria-label="Breadcrumb" style={{fontSize:14,color:'var(--muted)',marginBottom:8}}>
                  <a href="/" style={{color:'var(--muted)',textDecoration:'none'}}>Trang chủ</a>
                  <span style={{margin:'0 8px'}}>›</span>
                  <a href="/posts" style={{color:'var(--muted)',textDecoration:'none'}}>Bài viết</a>
                  <span style={{margin:'0 8px'}}>›</span>
                  <span style={{color:'var(--text)'}}>{post.title}</span>
                </nav>
                <h1 style={{margin:0}}>{post.title}</h1>
                <p className="muted">{post.date} • {post.read} đọc</p>
                <p style={{marginTop:12}}>{post.excerpt}</p>
              </div>

              <div>
                <button className="btn" type="button" onClick={() => router.back()}>Quay lại</button>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <article style={{background:'var(--card)',padding:20,borderRadius:12}}>
              <p>Đây là nội dung mẫu cho bài: <strong>{post.title}</strong>. Bạn có thể thay thế bằng nội dung thực tế bằng cách chỉnh data hoặc tạo file markdown và render ở đây.</p>
            </article>
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
