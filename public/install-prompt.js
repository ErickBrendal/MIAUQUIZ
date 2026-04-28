(function(){
  if (typeof window === 'undefined') return;

  var APP_NAME = 'MIAUQUIZ';
  var APP_TITLE = 'Instalar MIAUQUIZ';
  var APP_SUB = 'Acesse como app — sem barra de URL, em tela cheia.';
  var DISMISS_KEY = 'miauquiz_install_dismissed_at';
  var DISMISS_DAYS = 7;
  var SHOW_AFTER_MS = 3500;

  var BG = '#1E1E2F';
  var BORDER = 'rgba(124, 58, 237, 0.45)';
  var ACCENT = '#7C3AED';
  var ACCENT_HOVER = '#8B5CF6';
  var TEXT = '#F5F3FF';
  var TEXT_MUTED = 'rgba(245, 243, 255, 0.72)';
  var ICON_SRC = '/favicon.png';

  function recentlyDismissed(){
    try {
      var ts = +localStorage.getItem(DISMISS_KEY);
      if (!ts) return false;
      var age = Date.now() - ts;
      return age < DISMISS_DAYS * 24 * 60 * 60 * 1000;
    } catch(e){ return false; }
  }
  function markDismissed(){
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch(e){}
  }

  var standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  if (standalone || (window.navigator && window.navigator.standalone)) return;

  var ua = (navigator.userAgent || '').toLowerCase();
  var isIOS = /iphone|ipad|ipod/.test(ua);
  var isSafari = /safari/.test(ua) && !/crios|fxios|edgios/.test(ua);
  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    deferredPrompt = e;
  });

  function injectStyles(){
    if (document.getElementById('miauquiz-install-style')) return;
    var st = document.createElement('style');
    st.id = 'miauquiz-install-style';
    st.textContent = '@keyframes miauq_fadeup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}#miauquiz-install-card{position:fixed;right:16px;bottom:16px;z-index:99999;max-width:360px;width:calc(100vw - 32px);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;animation:miauq_fadeup .35s ease both;}#miauquiz-install-card .miauq-card{background:'+BG+';color:'+TEXT+';border:1px solid '+BORDER+';border-radius:18px;padding:16px 16px 14px;box-shadow:0 18px 50px -12px rgba(124,58,237,.45),0 8px 18px -4px rgba(0,0,0,.6);position:relative;}#miauquiz-install-card .miauq-close{position:absolute;top:8px;right:8px;background:transparent;border:0;color:'+TEXT_MUTED+';width:28px;height:28px;border-radius:14px;cursor:pointer;font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center;}#miauquiz-install-card .miauq-close:hover{background:rgba(255,255,255,.08);color:'+TEXT+';}#miauquiz-install-card .miauq-row{display:flex;align-items:flex-start;gap:12px;padding-right:24px;}#miauquiz-install-card .miauq-icon{width:48px;height:48px;border-radius:14px;flex-shrink:0;overflow:hidden;background:#0F0F1A;display:flex;align-items:center;justify-content:center;}#miauquiz-install-card .miauq-icon img{width:100%;height:100%;object-fit:contain;}#miauquiz-install-card h4{margin:0;font-size:15px;font-weight:700;letter-spacing:-.01em;}#miauquiz-install-card p{margin:2px 0 0;font-size:12.5px;color:'+TEXT_MUTED+';line-height:1.4;}#miauquiz-install-card .miauq-cta{margin-top:12px;width:100%;background:'+ACCENT+';color:#fff;border:0;border-radius:12px;padding:10px 14px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s;}#miauquiz-install-card .miauq-cta:hover{background:'+ACCENT_HOVER+';}#miauquiz-install-card .miauq-cta:disabled{opacity:.55;cursor:not-allowed;}#miauquiz-install-card .miauq-steps{margin-top:12px;background:rgba(255,255,255,.05);border-radius:12px;padding:10px 12px;font-size:12.5px;color:rgba(245,243,255,.88);}#miauquiz-install-card .miauq-steps ol{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px;}#miauquiz-install-card .miauq-steps strong{color:'+ACCENT+';}';
    document.head.appendChild(st);
  }

  function buildIOSCard(){
    var html = '<div class="miauq-card">'+
      '<button class="miauq-close" aria-label="Fechar">&#215;</button>'+
      '<div class="miauq-row">'+
        '<div class="miauq-icon"><img src="'+ICON_SRC+'" alt="'+APP_NAME+'"/></div>'+
        '<div><h4>'+APP_TITLE+'</h4><p>'+APP_SUB+'</p></div>'+
      '</div>'+
      '<div class="miauq-steps"><ol>'+
        '<li>Toque em <strong>Compartilhar</strong> (📤) na barra do Safari</li>'+
        '<li>Role e toque em <strong>Adicionar à Tela de Início</strong></li>'+
        '<li>Confirme tocando em <strong>Adicionar</strong></li>'+
      '</ol></div>'+
    '</div>';
    return html;
  }
  function buildPromptCard(){
    var html = '<div class="miauq-card">'+
      '<button class="miauq-close" aria-label="Fechar">&#215;</button>'+
      '<div class="miauq-row">'+
        '<div class="miauq-icon"><img src="'+ICON_SRC+'" alt="'+APP_NAME+'"/></div>'+
        '<div><h4>'+APP_TITLE+'</h4><p>'+APP_SUB+'</p></div>'+
      '</div>'+
      '<button class="miauq-cta" id="miauq-install-btn">⬇ Instalar como app</button>'+
    '</div>';
    return html;
  }

  function show(){
    if (recentlyDismissed()) return;
    if (document.getElementById('miauquiz-install-card')) return;
    var canPrompt = !!deferredPrompt;
    if (!canPrompt && !(isIOS && isSafari)) return;
    injectStyles();
    var wrap = document.createElement('div');
    wrap.id = 'miauquiz-install-card';
    wrap.innerHTML = (isIOS && isSafari && !canPrompt) ? buildIOSCard() : buildPromptCard();
    document.body.appendChild(wrap);
    wrap.querySelector('.miauq-close').addEventListener('click', function(){
      markDismissed(); wrap.remove();
    });
    var cta = wrap.querySelector('#miauq-install-btn');
    if (cta){
      cta.addEventListener('click', function(){
        if (!deferredPrompt){ return; }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function(){
          deferredPrompt = null;
          markDismissed();
          wrap.remove();
        });
      });
    }
  }

  window.addEventListener('appinstalled', function(){
    markDismissed();
    var c = document.getElementById('miauquiz-install-card');
    if (c) c.remove();
  });

  if (document.readyState === 'complete') setTimeout(show, SHOW_AFTER_MS);
  else window.addEventListener('load', function(){ setTimeout(show, SHOW_AFTER_MS); });
})();

