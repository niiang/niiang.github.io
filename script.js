/* ==========================================================
   个人主页交互脚本
   想改打字机轮播的身份短语，改下面数组即可
   ========================================================== */
var phrases = ['计算机科学硕士生', '强化学习学习者', 'AI 工具开发者', '开源爱好者'];

/* 其余部分一般不需要改动 */

// ---------- 打字机效果 ----------
(function typewriter() {
  var el = document.getElementById('typed');
  if (!el) return;

  // 各语言页面把短语写在 #typed 的 data-phrases 属性里（用 | 分隔），优先使用
  var list = phrases;
  if (el.dataset.phrases) list = el.dataset.phrases.split('|');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { el.textContent = list[0]; return; }

  var pi = 0, ci = 0, deleting = false;

  function tick() {
    var word = list[pi];
    ci += deleting ? -1 : 1;
    el.textContent = word.slice(0, ci);

    var delay;
    if (!deleting && ci === word.length) {
      delay = 1800;                 // 打完一个词停顿
      deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      delay = 350;                  // 删除后稍作停顿
    } else {
      delay = deleting ? 60 : 120;  // 打字/删除速度
    }
    setTimeout(tick, delay);
  }
  tick();
})();

// ---------- 主题切换（记忆到 localStorage） ----------
(function themeToggle() {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var root = document.documentElement;
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  });
})();

// ---------- 移动端菜单 ----------
(function mobileMenu() {
  var btn = document.getElementById('menu-toggle');
  var body = document.body;
  if (!btn) return;

  function close() {
    body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () {
    var open = body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', String(open));
  });

  // 点击任意菜单项后自动收起
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    a.addEventListener('click', close);
  });
})();

// ---------- 滚动进入视口时的淡入动画 ----------
(function revealOnScroll() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) { io.observe(el); });
})();

// ---------- 复制邮箱 ----------
(function copyMail() {
  var btn = document.getElementById('copy-mail');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var mail = btn.dataset.mail || '';
    function done(ok) {
      var old = btn.textContent;
      // 反馈文案从 data-ok / data-fail 读取（各语言页面自定义），默认中文
      btn.textContent = ok ? (btn.dataset.ok || '✅ 已复制') : (btn.dataset.fail || '❌ 复制失败');
      setTimeout(function () { btn.textContent = old; }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mail).then(
        function () { done(true); },
        function () { done(false); }
      );
    } else {
      done(false);
    }
  });
})();

// ---------- 页脚年份自动更新 ----------
(function year() {
  var el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
})();
