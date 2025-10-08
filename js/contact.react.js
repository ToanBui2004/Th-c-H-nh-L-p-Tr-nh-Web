// contact.react.js (JSX version for babel-standalone)
const { useState, useEffect } = React;

function loadMessages() {
  try {
    const raw = localStorage.getItem('toan_messages');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse messages from localStorage', err);
    return [];
  }
}

function saveMessages(msgs) {
  try {
    localStorage.setItem('toan_messages', JSON.stringify(msgs));
  } catch (err) {
    console.error('Failed to save messages to localStorage', err);
  }
}

function ContactApp() {
  const [messages, setMessages] = useState(loadMessages());
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', text: 'Vui lòng điền tên, email và nội dung.' });
      return;
    }

    const newMsg = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((m) => [newMsg, ...m]);
    setForm({ name: '', email: '', subject: '', message: '' });
    setStatus({ type: 'success', text: 'Lời nhắn đã được lưu cục bộ (localStorage).' });
    setTimeout(() => setStatus(null), 3000);
  }

  function clearAll() {
    if (!confirm('Xóa tất cả lời nhắn đã lưu cục bộ?')) return;
    setMessages([]);
  }

  function exportJSON() {
  const data = JSON.stringify(messages, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'toan_messages.json';
  a.click();
  URL.revokeObjectURL(url);
  }

  return (
    <div className="contact-react">
      <div className="contact-form-panel">
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Họ và tên</label>
              <input id="name" name="name" type="text" placeholder="Nguyễn Văn A" required value={form.name} onChange={onChange} />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="ban@vidu.com" required value={form.email} onChange={onChange} />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="subject">Tiêu đề</label>
            <input id="subject" name="subject" type="text" placeholder="Nội dung liên hệ" value={form.subject} onChange={onChange} />
          </div>

          <div className="form-field">
            <label htmlFor="message">Nội dung</label>
            <textarea id="message" name="message" rows={6} placeholder="Chào Toan,..." required value={form.message} onChange={onChange}></textarea>
          </div>

          <div className="form-actions">
            <button className="btn primary" type="submit">Gửi lời nhắn</button>
            <a className="btn" href="mailto:hello@example.com">Email trực tiếp</a>
          </div>

          <p className="form-note">Lời nhắn được xử lý cục bộ trên trình duyệt; không gửi tới server.</p>

          {status && (
            <div className={`form-status ${status.type}`}>{status.text}</div>
          )}
        </form>
      </div>

      <div className="contact-list-panel">
        <div className="panel-header">
          <h3>Lời nhắn đã lưu</h3>
          <div>
            <button className="btn" onClick={exportJSON} type="button">Export JSON</button>
            <button className="btn" onClick={clearAll} type="button">Xóa tất cả</button>
          </div>
        </div>

        {messages.length === 0 ? (
          <p className="muted">Chưa có lời nhắn nào.</p>
        ) : (
          <ul className="messages-list">
            {messages.map((m) => (
              <li key={m.id} className="message-item">
                <div className="message-meta"><strong>{m.name}</strong> — <span>{new Date(m.createdAt).toLocaleString()}</span></div>
                <div className="message-subject">{m.subject || <em>(không có tiêu đề)</em>}</div>
                <div className="message-body">{m.message}</div>
                <div className="message-email"><a href={`mailto:${m.email}`}>{m.email}</a></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('contact-root');
  if (!root) return;
  console.log('Mounting ContactApp...');
  try {
    // Prefer createRoot (React 18+); fall back to ReactDOM.render for UMD/build differences
    if (typeof ReactDOM !== 'undefined' && typeof ReactDOM.createRoot === 'function') {
      const reactRoot = ReactDOM.createRoot(root);
      reactRoot.render(React.createElement(ContactApp));
    } else if (typeof ReactDOM !== 'undefined' && typeof ReactDOM.render === 'function') {
      ReactDOM.render(React.createElement(ContactApp), root);
    } else {
      console.error('ReactDOM not available to mount ContactApp');
    }
  } catch (err) {
    console.error('Failed to mount ContactApp', err);
    try {
      if (typeof ReactDOM !== 'undefined' && typeof ReactDOM.render === 'function') {
        ReactDOM.render(React.createElement(ContactApp), root);
      }
    } catch (e) {
      console.error('Fallback render failed', e);
    }
  }
});
