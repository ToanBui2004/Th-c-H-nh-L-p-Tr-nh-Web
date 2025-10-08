import Head from 'next/head'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'toan_messages'

export default function Contact() {
  // form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  // stored messages
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('')

  // load messages from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setMessages(JSON.parse(raw))
    } catch (e) {
      // ignore parse errors
    }
  }, [])

  // helper to persist messages
  function persist(next) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch (e) {
      console.warn('Could not save messages', e)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !email || !message) {
      setStatus('Vui lòng điền đủ tên, email và nội dung.')
      return
    }

    const entry = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    }

    const next = [entry, ...messages]
    setMessages(next)
    persist(next)

    setStatus('Lời nhắn đã được lưu.')
    // reset form
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'toan_messages.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleClear() {
    if (!confirm('Xóa tất cả lời nhắn?')) return
    setMessages([])
    persist([])
    setStatus('Đã xóa tất cả lời nhắn.')
  }

  return (
    <>
      <Head>
        <title>Liên hệ | ToanBlog</title>
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
          <div className="container">
            <h1>Liên hệ</h1>
            <p>Hãy để lại lời nhắn. Mình sẽ phản hồi sớm nhất có thể.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="contact-wrap">
              <div className="contact-form-panel">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="name">Họ và tên</label>
                      <input id="name" name="name" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Nguyễn Văn A" required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="ban@vidu.com" required />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject">Tiêu đề</label>
                    <input id="subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} type="text" placeholder="Nội dung liên hệ" />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Nội dung</label>
                    <textarea id="message" name="message" value={message} onChange={e => setMessage(e.target.value)} rows={6} placeholder="Chào Toan,..." required></textarea>
                  </div>

                  <div className="form-actions">
                    <button className="btn primary" type="submit">Gửi lời nhắn</button>
                    <a className="btn" href="mailto:n22dcat058@student.ptithcm.edu.vn">Email trực tiếp</a>
                  </div>

                  <p className="form-note">Lời nhắn được xử lý cục bộ trên trình duyệt; không gửi tới server.</p>
                  <div className="form-status" aria-live="polite">{status}</div>
                </form>
              </div>

              <aside className="contact-side">
                <div className="side-card">
                  <h3>Thông tin</h3>
                  <ul className="list-plain">
                    <li>✉️ n22dcat058@student.ptithcm.edu.vn</li>
                    <li>📍 TP Hồ Chính Minh</li>
                    <li>🕒 9:00 – 18:00 (GMT+7)</li>
                  </ul>
                  <hr />
                  <div>
                    <div className="panel-header">
                      <h4>Lời nhắn đã lưu</h4>
                      <div style={{display:'flex',gap:8,marginTop:8}}>
                        <button onClick={handleExport} className="btn" type="button">Export JSON</button>
                        <button onClick={handleClear} className="btn" type="button">Xóa tất cả</button>
                      </div>
                    </div>

                    <div style={{marginTop:12,maxHeight:260,overflow:'auto',fontSize:14,color:'var(--muted)'}}>
                      {messages.length === 0 && <div className="muted">Chưa có lời nhắn nào.</div>}
                      {messages.map(m => (
                        <div key={m.id} style={{padding:8,borderBottom:'1px solid rgba(0,0,0,0.05)'}}>
                          <div style={{fontWeight:600}}>{m.name} <span style={{fontWeight:400,fontSize:12,marginLeft:8,color:'var(--muted)'}}>{new Date(m.createdAt).toLocaleString()}</span></div>
                          <div style={{fontSize:13,marginTop:4}}>{m.subject || <em style={{color:'var(--muted)'}}>No subject</em>}</div>
                          <div style={{fontSize:13,marginTop:6,color:'var(--muted)'}}>{m.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
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
