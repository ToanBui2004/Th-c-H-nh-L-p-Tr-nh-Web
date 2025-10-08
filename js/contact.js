// contact.js - simple non-React contact form handler
(function () {
  var STORAGE_KEY = 'toan_messages';

  function loadMessages() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to parse messages', e);
      return [];
    }
  }

  function saveMessages(msgs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch (e) {
      console.error('Failed to save messages', e);
    }
  }

  function renderMessages(listEl) {
    var msgs = loadMessages();
    if (!listEl) return;
    if (msgs.length === 0) {
      listEl.innerHTML = '<p class="muted">Chưa có lời nhắn nào.</p>';
      return;
    }
    var html = msgs.map(function (m) {
      var date = new Date(m.createdAt).toLocaleString();
      var subject = m.subject ? '<div class="message-subject">' + escapeHtml(m.subject) + '</div>' : '<div class="message-subject"><em>(không có tiêu đề)</em></div>';
      return '<div class="message-item" style="padding:8px 0;border-bottom:1px dashed rgba(255,255,255,0.04);">'
        + '<div style="font-weight:600;">' + escapeHtml(m.name) + ' <span style="font-weight:400;color:var(--muted);">— ' + escapeHtml(date) + '</span></div>'
        + subject
        + '<div class="message-body" style="color:var(--text);margin-top:6px;">' + escapeHtml(m.message) + '</div>'
        + '<div class="message-email" style="margin-top:6px;"><a href="mailto:' + encodeURIComponent(m.email) + '">' + escapeHtml(m.email) + '</a></div>'
        + '</div>';
    }).join('');
    listEl.innerHTML = html;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contact-form');
    var statusEl = document.getElementById('form-status');
    var listEl = document.getElementById('messages-list');
    var exportBtn = document.getElementById('export-json');
    var clearBtn = document.getElementById('clear-all');

    renderMessages(listEl);

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(form);
        var name = (formData.get('name') || '').trim();
        var email = (formData.get('email') || '').trim();
        var subject = (formData.get('subject') || '').trim();
        var message = (formData.get('message') || '').trim();
        if (!name || !email || !message) {
          if (statusEl) statusEl.textContent = 'Vui lòng điền tên, email và nội dung.';
          return;
        }
        var msgs = loadMessages();
        var newMsg = { id: Date.now(), name: name, email: email, subject: subject, message: message, createdAt: new Date().toISOString() };
        msgs.unshift(newMsg);
        saveMessages(msgs);
        renderMessages(listEl);
        form.reset();
        if (statusEl) {
          statusEl.textContent = 'Lời nhắn đã được lưu cục bộ (localStorage).';
          setTimeout(function () { statusEl.textContent = ''; }, 3000);
        }
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        var data = JSON.stringify(loadMessages(), null, 2);
        var blob = new Blob([data], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'toan_messages.json';
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (!confirm('Xóa tất cả lời nhắn đã lưu cục bộ?')) return;
        saveMessages([]);
        renderMessages(listEl);
      });
    }

  });
})();
