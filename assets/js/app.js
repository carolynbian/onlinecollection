(() => {
  'use strict';

  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  const onScroll = () => {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (toggle) toggle.textContent = 'Menu';
  };

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', open);
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  const reveals = document.querySelectorAll(
    '.section-head, .work-card, .method-card, .profile-strip, .method-quote, .case-cover-copy, .case-cover-shot, .pain-card, .case-quote, .browser-card, .arch, .decision-head, .decision-row, .eval-board, .badcase, .econ-grid, .econ-formula, .result-grid, .next-case, .economics-table, .econ-assumptions, .closing-grid'
  );

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // 30-second guided demo
  const demoModal = document.getElementById('demoModal');
  const demoOpen = document.getElementById('demoOpen');
  const demoImage = document.getElementById('demoImage');
  const demoStep = document.getElementById('demoStep');
  const demoTitle = document.getElementById('demoTitle');
  const demoText = document.getElementById('demoText');
  const demoHotspot = document.getElementById('demoHotspot');
  const demoHotspotLabel = document.getElementById('demoHotspotLabel');
  const demoSources = Array.from(document.querySelectorAll('[data-demo-src]'));
  const demoDots = Array.from(document.querySelectorAll('[data-demo]'));
  const demoData = [
    {
      title: '政务问数：一句话到一张可追溯的表',
      text: '业务员问「2024 年高新区企业申报量」，Agent 识别口径、校验权限、调用白名单工具，返回 1,286 家与来源版本。',
      hotspot: { x: '72%', y: '60%', label: '口径 / 来源' }
    },
    {
      title: '合同哨兵：不是给结论，是给可执行动作',
      text: '上传合同后先分级 8 条风险，再逐条核验法条与企业主体；法务可以采纳、驳回或转人工，最终决定权在人。',
      hotspot: { x: '28%', y: '38%', label: '8 条风险' }
    },
    {
      title: '初见：答得有依据，才敢让员工自助',
      text: '员工问年假，有依据就引用制度原文；依据不足就直说并转 HR。HR 后台可发布制度、处理工单，形成闭环。',
      hotspot: { x: '48%', y: '36%', label: '依据状态' }
    }
  ];
  let demoIndex = 0;
  let demoTimer = null;

  const renderDemo = (i) => {
    if (!demoModal || !demoImage) return;
    demoIndex = (i + demoData.length) % demoData.length;
    const item = demoData[demoIndex];
    const source = demoSources[demoIndex];
    if (source) {
      demoImage.style.opacity = '0';
      window.setTimeout(() => {
        demoImage.src = source.src;
        const show = () => { demoImage.style.opacity = '1'; };
        if (demoImage.complete) show();
        else demoImage.onload = show;
      }, 120);
    }
    if (demoHotspot && item.hotspot) {
      demoHotspot.style.left = item.hotspot.x;
      demoHotspot.style.top = item.hotspot.y;
      if (demoHotspotLabel) demoHotspotLabel.textContent = item.hotspot.label;
    }
    if (demoStep) demoStep.textContent = `0${demoIndex + 1} / 03`;
    if (demoTitle) demoTitle.textContent = item.title;
    if (demoText) demoText.textContent = item.text;
    demoDots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === demoIndex));
  };

  const stopDemo = () => {
    if (demoTimer) window.clearInterval(demoTimer);
    demoTimer = null;
  };

  const startDemo = () => {
    stopDemo();
    demoTimer = window.setInterval(() => renderDemo(demoIndex + 1), 4800);
  };

  const closeDemo = () => {
    if (!demoModal) return;
    demoModal.hidden = true;
    document.body.style.overflow = '';
    stopDemo();
  };

  const openDemo = () => {
    if (!demoModal) return;
    demoModal.hidden = false;
    document.body.style.overflow = 'hidden';
    renderDemo(0);
    startDemo();
  };

  if (demoOpen) demoOpen.addEventListener('click', openDemo);
  document.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeDemo));
  demoDots.forEach((dot) => dot.addEventListener('click', () => {
    renderDemo(Number(dot.dataset.demo));
    startDemo();
  }));
  document.addEventListener('keydown', (event) => {
    if (!demoModal || demoModal.hidden) return;
    if (event.key === 'Escape') closeDemo();
    if (event.key === 'ArrowRight') { renderDemo(demoIndex + 1); startDemo(); }
    if (event.key === 'ArrowLeft') { renderDemo(demoIndex - 1); startDemo(); }
  });
})();

