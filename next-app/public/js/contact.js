(function(){
  // copy of the existing contact.js for client-side in Next public
  var STORAGE_KEY = 'toan_messages';
  function loadMessages(){ try { var raw = localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):[] } catch(e){return[]} }
  function saveMessages(msgs){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)); } catch(e){} }
  function renderMessages(listEl){ if(!listEl) return; var msgs=loadMessages(); if(msgs.length===0){ listEl.innerHTML='<p class="muted">Chưa có lời nhắn nào.</p>'; return;} listEl.innerHTML = msgs.map(function(m){ return '<div style="padding:8px 0;border-bottom:1px dashed rgba(255,255,255,0.04);"><div style="font-weight:600;">'+(m.name||'')+' <span style="font-weight:400;color:var(--muted);">— '+new Date(m.createdAt).toLocaleString()+'</span></div><div style="margin-top:6px;color:var(--text);">'+(m.message||'')+'</div><div style="margin-top:6px;">'+(m.email||'')+'</div></div>'; }).join(''); }

  function init(){
    var form=document.getElementById('contact-form');
    var listEl = document.getElementById('messages-list');
    var exportBtn=document.getElementById('export-json');
    var clearBtn=document.getElementById('clear-all');
    renderMessages(listEl);

    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var fd = new FormData(form);
        var name = (fd.get('name')||'').trim();
        var email=(fd.get('email')||'').trim();
        var subject=(fd.get('subject')||'').trim();
        var message=(fd.get('message')||'').trim();
        if(!name||!email||!message){ var status=document.getElementById('form-status'); if(status) status.textContent='Vui lòng điền tên, email và nội dung.'; return; }
        var msgs = loadMessages();
        var newMsg = { id: Date.now(), name:name, email:email, subject:subject, message:message, createdAt:new Date().toISOString() };
        msgs.unshift(newMsg);
        saveMessages(msgs);
        renderMessages(listEl);
        form.reset();
        var status=document.getElementById('form-status'); if(status){ status.textContent='Lời nhắn đã được lưu cục bộ (localStorage).'; setTimeout(function(){status.textContent='';},3000); }
      });
    }

    if(exportBtn){
      exportBtn.addEventListener('click', function(){ var data = JSON.stringify(loadMessages(), null, 2); var blob=new Blob([data],{type:'application/json'}); var url=URL.createObjectURL(blob); var a=document.createElement('a'); a.href=url; a.download='toan_messages.json'; a.click(); URL.revokeObjectURL(url); });
    }

    if(clearBtn){
      clearBtn.addEventListener('click', function(){ if(!confirm('Xóa tất cả lời nhắn đã lưu cục bộ?')) return; saveMessages([]); renderMessages(listEl); });
    }
  }

  // If document already loaded, init immediately; otherwise wait for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already ready
    setTimeout(init, 0);
  }

})();
