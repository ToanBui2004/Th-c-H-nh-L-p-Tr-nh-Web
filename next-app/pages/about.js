import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>ToanBlog - Giới thiệu</title>
      </Head>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/">Toan<span className="brand-accent">Blog</span></a>
          <nav className="nav">
            <a href="/#bai-viet">Bài viết</a>
            <a href="/about">Giới thiệu</a>
            <a href="/contact">Liên hệ</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="page-banner">
          <div className="container banner-inner">
            <div className="banner-avatar"><span>T</span></div>
            <div>
              <h1>Xin chào, mình là Toan</h1>
              <p>Mình xây giao diện web nhanh, gọn, dễ mở rộng.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container two-col">
            <div>
              <h2>Tiểu sử ngắn</h2>
              <p>Đang học tại Học Viện Công Nghệ Bưu Chính Viễn Thông</p>
            </div>
            <aside className="side-card">
              <h3>Thông tin nhanh</h3>
              <ul className="list-plain">
                <li>📍 TP Hồ Chính Minh</li>
                <li>💼 Frontend Developer</li>
                <li>✉️ n22dcat058@student.ptithcm.edu.vn</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <h2>Dòng thời gian</h2>
            <ol className="timeline">
              <li>
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <div className="tl-row"><strong>2025</strong><span className="tl-tag">Freelance</span></div>
                  <p>Đang học tại Học Viện Công Nghệ Bưu Chính Viễn Thông</p>
                </div>
              </li>
              <li>
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <div className="tl-row"><strong>2023–2024</strong><span className="tl-tag">Product</span></div>
                  <p>Đang học tại Học Viện Công Nghệ Bưu Chính Viễn Thông</p>
                </div>
              </li>
              <li>
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <div className="tl-row"><strong>2021–2022</strong><span className="tl-tag">Learning</span></div>
                  <p>Đang học tại Học Viện Công Nghệ Bưu Chính Viễn Thông</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Một vài dự án</h2>
            </div>

            <div className="projects-grid">
              <article className="project-card">
                <div className="project-media" />
                <div className="project-body">
                  <h3>Ứng dụng Mobsecurity</h3>
                  <p>Thiết kế và xây dựng ứng dụng bảo mật trên nền tảng di động.</p>
                </div>
              </article>

              <article className="project-card">
                <div className="project-media alt" />
                <div className="project-body">
                  <h3>Password Hashing</h3>
                  <p>Thực thi các giải pháp hashing an toàn để bảo vệ mật khẩu người dùng.</p>
                </div>
              </article>

              <article className="project-card">
                <div className="project-media" />
                <div className="project-body">
                  <h3>Phân tích mã độc 3AM</h3>
                  <p>Nghiên cứu và phân tích các mẫu mã độc, xây dựng báo cáo kỹ thuật.</p>
                </div>
              </article>
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
