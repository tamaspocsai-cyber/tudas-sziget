/* Tudás-sziget – játékmotor
 * Offline, egyetlen oldalas app. A tartalom a js/data/*.js fájlokból jön (window.TS.subjects).
 */
(function () {
  'use strict';

  const SUBJ = ((window.TS && window.TS.subjects) || []).filter(s => s && s.topics && s.topics.length);
  const KEY = 'tudas-sziget-v1';
  const app = document.getElementById('app');
  const modalRoot = document.getElementById('modal');
  const toastRoot = document.getElementById('toasts');

  /* ---------- Segédfüggvények ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  const dayDiff = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  const qkey = q => hash(q.t + '|' + q.q + '|' + JSON.stringify(q.a !== undefined ? q.a : q.groups));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const subj = id => SUBJ.find(s => s.id === id);
  const topicOf = (sid, tid) => { const s = subj(sid); return s && s.topics.find(t => t.id === tid); };
  function weighted(obj) { // {key: weight}
    const ent = Object.entries(obj).filter(e => e[1] > 0); let sum = ent.reduce((a, e) => a + e[1], 0); let r = Math.random() * sum;
    for (const [k, w] of ent) { r -= w; if (r <= 0) return k; } return ent[ent.length - 1][0];
  }
  function fmtQ(s) { return esc(s).replace(/_{3,}/g, '<span class="blank">?</span>').replace(/\n/g, '<br>'); }

  /* ---------- Játékadatok ---------- */
  const AVATARS = [
    { id: 'fox', e: '🦊', name: 'Róka', price: 0 }, { id: 'cat', e: '🐱', name: 'Cica', price: 0 },
    { id: 'bunny', e: '🐰', name: 'Nyuszi', price: 0 }, { id: 'panda', e: '🐼', name: 'Panda', price: 0 },
    { id: 'hamster', e: '🐹', name: 'Hörcsög', price: 150 }, { id: 'frog', e: '🐸', name: 'Béka', price: 150 },
    { id: 'penguin', e: '🐧', name: 'Pingvin', price: 200 }, { id: 'koala', e: '🐨', name: 'Koala', price: 200 },
    { id: 'tiger', e: '🐯', name: 'Tigris', price: 300 }, { id: 'lion', e: '🦁', name: 'Oroszlán', price: 300 },
    { id: 'octopus', e: '🐙', name: 'Polip', price: 400 }, { id: 'parrot', e: '🦜', name: 'Papagáj', price: 400 },
    { id: 'dolphin', e: '🐬', name: 'Delfin', price: 550 }, { id: 'butterfly', e: '🦋', name: 'Pillangó', price: 550 },
    { id: 'unicorn', e: '🦄', name: 'Egyszarvú', price: 900 }, { id: 'dragon', e: '🐲', name: 'Sárkány', price: 1200 }
  ];
  const ACCS = [
    { id: 'none', e: '', name: 'Semmi', price: 0 }, { id: 'bow', e: '🎀', name: 'Masni', price: 100 },
    { id: 'flower', e: '🌸', name: 'Virág', price: 100 }, { id: 'cap', e: '🧢', name: 'Sapka', price: 150 },
    { id: 'glasses', e: '🕶️', name: 'Napszemüveg', price: 200 }, { id: 'phones', e: '🎧', name: 'Fejhallgató', price: 250 },
    { id: 'tophat', e: '🎩', name: 'Cilinder', price: 300 }, { id: 'star', e: '⭐', name: 'Csillag', price: 400 },
    { id: 'grad', e: '🎓', name: 'Tudós sapka', price: 600 }, { id: 'crown', e: '👑', name: 'Korona', price: 1000 }
  ];
  const THEMES = [
    { id: 'sky', e: '☁️', name: 'Égbolt', price: 0 }, { id: 'sunset', e: '🌅', name: 'Naplemente', price: 250 },
    { id: 'ocean', e: '🌊', name: 'Óceán', price: 250 }, { id: 'forest', e: '🌲', name: 'Erdő', price: 300 },
    { id: 'candy', e: '🍭', name: 'Cukorka', price: 350 }, { id: 'night', e: '🌙', name: 'Csillagos éj', price: 500 }
  ];
  const TITLES = ['Kis felfedező', 'Kíváncsi kölyök', 'Tudásgyűjtő', 'Bagolyfióka', 'Rejtvényfejtő', 'Szigetjáró', 'Térképész', 'Tudásbajnok', 'Bölcs kapitány', 'Szigetek hőse', 'Nagy tudós', 'Tudás mestere', 'A sziget legendája'];
  const PRAISE = ['Szuper! 🎉', 'Ügyes vagy! 🌟', 'Pontosan! ✨', 'Hibátlan! 💪', 'Telitalálat! 🎯', 'Zseniális! 🧠', 'Így kell ezt! 🚀', 'Bravó! 👏'];
  const COMFORT = ['Majdnem! 🙂', 'Semmi baj, ebből tanulunk! 💡', 'Nem baj, legközelebb sikerül! 🍀', 'Hoppá! Nézzük meg együtt! 🔍'];
  const MASCOT_TIPS = [
    'Tipp: ha nem biztos egy válasz, először olvasd el a Tudáskártyákat! 📖',
    'Minden nap egy kis gyakorlás többet ér, mint egyszer sokat! 🔥',
    'A hibák a legjobb tanítóink. Az Ismétlő dobozban újra próbálhatod őket! 🔁',
    'Gyűjts gyémántot 💎, és vásárolj új figurát a Boltban! 🛍️',
    'Három csillagért hibátlan, vagy majdnem hibátlan kör kell! ⭐⭐⭐',
    'A 🔊 gombbal fel is olvasom neked a kérdést!',
    'Ha minden állomáson van csillagod, jöhet a Sziget-próba! 🐉',
    'Nézd meg a mai küldetéseidet, sok gyémánt jár értük! 🎯'
  ];

  const QUESTS = [
    { id: 'c15', text: 'Válaszolj helyesen 15 kérdésre', goal: 15, ev: 'correct', icon: '✅' },
    { id: 'c30', text: 'Válaszolj helyesen 30 kérdésre', goal: 30, ev: 'correct', icon: '🏅' },
    { id: 'combo5', text: 'Válaszolj 5-ször hibátlanul egymás után', goal: 5, ev: 'combo', icon: '🔥' },
    { id: 'star3', text: 'Szerezz 3 csillagot egy állomáson', goal: 1, ev: 'star3', icon: '⭐' },
    { id: 'round3', text: 'Játssz le 3 kört', goal: 3, ev: 'round', icon: '🎮' },
    { id: 'subj2', text: 'Játssz 2 különböző szigeten', goal: 2, ev: 'subject', icon: '🏝️' },
    { id: 'learn1', text: 'Olvass el egy Tudáskártya-paklit', goal: 1, ev: 'learn', icon: '📖' },
    { id: 'daily', text: 'Teljesítsd a Napi kihívást', goal: 1, ev: 'daily', icon: '⚡' },
    { id: 'review', text: 'Javíts ki 3 kérdést az Ismétlő dobozban', goal: 3, ev: 'reviewfix', icon: '🔁' }
  ];

  function badgeDefs() {
    const b = [
      { id: 'first', e: '👣', name: 'Első lépés', desc: 'Játssz le egy kört!', ok: s => s.stats.rounds >= 1 },
      { id: 'c10', e: '🌱', name: 'Kis magocska', desc: '10 helyes válasz', ok: s => s.stats.correct >= 10 },
      { id: 'c100', e: '🌿', name: 'Szorgos tanuló', desc: '100 helyes válasz', ok: s => s.stats.correct >= 100 },
      { id: 'c500', e: '🌳', name: 'Tudásfa', desc: '500 helyes válasz', ok: s => s.stats.correct >= 500 },
      { id: 'c1000', e: '🏔️', name: 'Tudáshegy', desc: '1000 helyes válasz', ok: s => s.stats.correct >= 1000 },
      { id: 'combo5', e: '🔥', name: 'Lángoló sorozat', desc: '5 helyes egymás után', ok: s => s.stats.bestCombo >= 5 },
      { id: 'combo15', e: '☄️', name: 'Megállíthatatlan', desc: '15 helyes egymás után', ok: s => s.stats.bestCombo >= 15 },
      { id: 'perfect', e: '💯', name: 'Hibátlan', desc: 'Egy kör hiba nélkül', ok: s => s.stats.perfect >= 1 },
      { id: 'perfect10', e: '🎯', name: 'Mesterlövész', desc: '10 hibátlan kör', ok: s => s.stats.perfect >= 10 },
      { id: 'learn5', e: '📖', name: 'Könyvmoly', desc: '5 Tudáskártya-pakli elolvasva', ok: s => Object.keys(s.learned).length >= 5 },
      { id: 'learn20', e: '🧠', name: 'Okostojás', desc: '20 Tudáskártya-pakli elolvasva', ok: s => Object.keys(s.learned).length >= 20 },
      { id: 'streak3', e: '📅', name: 'Hűséges', desc: '3 nap egymás után', ok: s => s.streak.best >= 3 },
      { id: 'streak7', e: '🗓️', name: 'Egy egész hét', desc: '7 nap egymás után', ok: s => s.streak.best >= 7 },
      { id: 'streak30', e: '🏆', name: 'Kitartás bajnoka', desc: '30 nap egymás után', ok: s => s.streak.best >= 30 },
      { id: 'explorer', e: '🧭', name: 'Világutazó', desc: 'Játssz minden szigeten', ok: s => SUBJ.every(su => su.topics.some(t => (s.tp[su.id + '/' + t.id] || {}).plays)) },
      { id: 'fix10', e: '🩹', name: 'Hibajavító', desc: '10 kérdés kijavítva az Ismétlő dobozban', ok: s => s.stats.fixed >= 10 },
      { id: 'daily5', e: '⚡', name: 'Villámgyors', desc: '5 Napi kihívás teljesítve', ok: s => s.stats.dailies >= 5 },
      { id: 'shop3', e: '🛍️', name: 'Gyűjtögető', desc: 'Vásárolj 3 dolgot a Boltban', ok: s => s.stats.bought >= 3 },
      { id: 'lvl5', e: '🚀', name: 'Felfelé!', desc: 'Érd el az 5. szintet', ok: s => levelInfo(s.xp).level >= 5 },
      { id: 'lvl10', e: '🌠', name: 'Csillagok felé', desc: 'Érd el a 10. szintet', ok: s => levelInfo(s.xp).level >= 10 }
    ];
    SUBJ.forEach(su => {
      b.push({ id: 'all1_' + su.id, e: su.icon, name: su.island + ' felfedezője', desc: 'Minden állomáson legalább 1 ⭐ (' + su.name + ')', ok: s => su.topics.every(t => starsOf(s, su.id, t.id) >= 1) });
      b.push({ id: 'boss_' + su.id, e: '🐉', name: su.name + ' bajnok', desc: 'Győzd le a Sziget-próbát: ' + su.island, ok: s => !!s.boss[su.id] });
      b.push({ id: 'all3_' + su.id, e: '👑', name: su.name + ' mester', desc: 'Minden állomáson 3 ⭐ (' + su.name + ')', ok: s => su.topics.every(t => starsOf(s, su.id, t.id) >= 3) });
    });
    b.push({ id: 'allboss', e: '🏰', name: 'A Tudás-sziget királynője', desc: 'Győzd le az összes Sziget-próbát!', ok: s => SUBJ.every(su => s.boss[su.id]) });
    return b;
  }
  const BADGES = badgeDefs();

  /* ---------- Állapot ---------- */
  function freshState() {
    return {
      v: 1, name: '', avatar: 'fox', acc: 'none', theme: 'sky',
      owned: { avatars: ['fox', 'cat', 'bunny', 'panda'], accs: ['none'], themes: ['sky'] },
      xp: 0, coins: 0,
      tp: {}, boss: {}, seen: {}, learned: {}, review: [], badges: {},
      stats: { rounds: 0, answered: 0, correct: 0, bestCombo: 0, perfect: 0, fixed: 0, dailies: 0, bought: 0 },
      streak: { last: null, count: 0, best: 0 },
      daily: null, days: {},
      settings: { sound: true, autoRead: false, allOpen: false, pin: null }
    };
  }
  let S = load();
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const s = JSON.parse(raw); const f = freshState(); return deepMerge(f, s); }
    } catch (e) { /* üres vagy tiltott tároló */ }
    return freshState();
  }
  function deepMerge(base, over) {
    for (const k in over) {
      if (over[k] && typeof over[k] === 'object' && !Array.isArray(over[k]) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) base[k] = deepMerge(base[k], over[k]);
      else base[k] = over[k];
    }
    return base;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

  function starsOf(s, sid, tid) { return ((s.tp[sid + '/' + tid]) || {}).stars || 0; }
  function levelInfo(xp) {
    let L = 1; while (50 * L * (L + 1) <= xp) L++;
    const base = 50 * (L - 1) * L, next = 50 * L * (L + 1);
    return { level: L, cur: xp - base, need: next - base, pct: Math.round((xp - base) / (next - base) * 100), title: TITLES[Math.min(L - 1, TITLES.length - 1)] };
  }
  function dayRec() { const d = today(); if (!S.days[d]) S.days[d] = { q: 0, c: 0, sec: 0 }; const ks = Object.keys(S.days).sort(); while (ks.length > 90) delete S.days[ks.shift()]; return S.days[d]; }

  /* ---------- Napi dolgok ---------- */
  function seeded(seed) { let x = parseInt(hash(seed), 36) || 1; return () => { x = (x * 1103515245 + 12345) & 0x7fffffff; return x / 0x7fffffff; }; }
  function ensureDaily() {
    const d = today();
    if (!S.daily || S.daily.date !== d) {
      const rnd = seeded(d + S.name);
      const pool = QUESTS.slice(); const chosen = [];
      while (chosen.length < 3 && pool.length) { const q = pool.splice(Math.floor(rnd() * pool.length), 1)[0]; if (chosen.some(c => c.ev === q.ev)) continue; chosen.push(q); }
      S.daily = { date: d, quests: chosen.map(q => ({ id: q.id, prog: 0, claimed: false })), chest: false, bonus: false, challenge: false, subjects: [] };
      save();
    }
  }
  function updateStreak() {
    const d = today(); const st = S.streak;
    if (st.last === d) return false;
    if (st.last && dayDiff(st.last, d) === 1) st.count++; else st.count = 1;
    st.last = d; st.best = Math.max(st.best, st.count); save(); return true;
  }
  function questEvent(ev, val) {
    ensureDaily();
    S.daily.quests.forEach(qs => {
      const def = QUESTS.find(q => q.id === qs.id); if (!def || def.ev !== ev || qs.claimed) return;
      if (ev === 'combo') qs.prog = Math.max(qs.prog, val);
      else if (ev === 'subject') { if (S.daily.subjects.indexOf(val) < 0) S.daily.subjects.push(val); qs.prog = S.daily.subjects.length; }
      else qs.prog += (val || 1);
      qs.prog = Math.min(qs.prog, def.goal);
    });
  }
  function questsReady() { ensureDaily(); return S.daily.quests.filter(q => { const d = QUESTS.find(x => x.id === q.id); return d && !q.claimed && q.prog >= d.goal; }).length + (S.daily.chest ? 0 : 1); }

  /* ---------- Hang ---------- */
  let AC = null;
  function tone(f, dur, type, vol, delay) {
    const t0 = AC.currentTime + (delay || 0); const o = AC.createOscillator(); const g = AC.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(AC.destination); o.start(t0); o.stop(t0 + dur + 0.05);
  }
  function sfx(n) {
    if (!S.settings.sound) return;
    try {
      if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      if (n === 'click') tone(660, 0.06, 'sine', 0.06);
      else if (n === 'ok') { tone(523, 0.12, 'triangle', 0.18); tone(784, 0.22, 'triangle', 0.18, 0.1); }
      else if (n === 'bad') { tone(300, 0.15, 'sine', 0.12); tone(220, 0.25, 'sine', 0.12, 0.13); }
      else if (n === 'coin') { tone(988, 0.08, 'square', 0.06); tone(1319, 0.2, 'square', 0.06, 0.08); }
      else if (n === 'level') [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.25, 'triangle', 0.16, i * 0.1));
      else if (n === 'win') [392, 523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, 'triangle', 0.15, i * 0.11));
      else if (n === 'pop') tone(880, 0.08, 'sine', 0.1);
    } catch (e) { }
  }
  function speak(text) {
    try {
      if (!('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/_{3,}/g, ' ... ').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, ''));
      u.lang = 'hu-HU'; u.rate = 0.92;
      const v = speechSynthesis.getVoices().find(v => /^hu/i.test(v.lang)); if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { }
  }

  /* ---------- Konfetti ---------- */
  function confetti(n) {
    const c = document.getElementById('confetti'); const ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    const cols = ['#FF6B6B', '#FFC93C', '#2FBF71', '#3D8BFF', '#8E6CF0', '#FF8AD8'];
    const P = Array.from({ length: n || 140 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, r: 5 + Math.random() * 6, c: pick(cols), vy: 2 + Math.random() * 3, vx: -1.5 + Math.random() * 3, a: Math.random() * 6, va: -0.2 + Math.random() * 0.4 }));
    let f = 0;
    (function step() {
      ctx.clearRect(0, 0, c.width, c.height);
      P.forEach(p => { p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore(); });
      if (++f < 220) requestAnimationFrame(step); else ctx.clearRect(0, 0, c.width, c.height);
    })();
  }

  /* ---------- UI építőkockák ---------- */
  function avatarHTML(size) {
    const a = AVATARS.find(x => x.id === S.avatar) || AVATARS[0]; const ac = ACCS.find(x => x.id === S.acc);
    return `<span class="avatar ${size || ''}"><span class="av-e">${a.e}</span>${ac && ac.e ? `<span class="av-acc">${ac.e}</span>` : ''}</span>`;
  }
  function topbar() {
    const lv = levelInfo(S.xp);
    return `<header class="topbar">
      <button class="tb-me" data-act="go" data-to="profile" aria-label="Profilom">${avatarHTML('sm')}<span class="tb-name">${esc(S.name)}</span></button>
      <div class="tb-level" title="${lv.cur} / ${lv.need} XP"><span class="lvl-badge">${lv.level}</span><span class="lvl-bar"><i style="width:${lv.pct}%"></i></span></div>
      <div class="tb-stat" title="Napok egymás után">🔥<b>${S.streak.count}</b></div>
      <div class="tb-stat" title="Gyémántok">💎<b id="coinCount">${S.coins}</b></div>
    </header>`;
  }
  function bottomnav(active) {
    const n = questsReady();
    const it = [['home', '🏝️', 'Szigetek'], ['quests', '🎯', 'Küldetések'], ['trophies', '🏆', 'Trófeák'], ['shop', '🛍️', 'Bolt'], ['profile', '🦉', 'Én']];
    return `<nav class="bottomnav">${it.map(([id, e, l]) => `<button class="${active === id ? 'on' : ''}" data-act="go" data-to="${id}"><span class="bn-e">${e}${id === 'quests' && n ? `<em>${n}</em>` : ''}</span><span>${l}</span></button>`).join('')}</nav>`;
  }
  function screen(html, cls) { app.className = 'screen ' + (cls || ''); app.innerHTML = html; app.scrollTop = 0; window.scrollTo(0, 0); }
  function stars(n, max) { let h = ''; for (let i = 0; i < (max || 3); i++) h += `<span class="st ${i < n ? 'on' : ''}">★</span>`; return `<span class="stars">${h}</span>`; }
  function modal(html, cls) { modalRoot.innerHTML = `<div class="modal-bg" data-act="modalBg"><div class="modal ${cls || ''}" role="dialog">${html}</div></div>`; modalRoot.classList.add('show'); }
  function closeModal() { modalRoot.classList.remove('show'); modalRoot.innerHTML = ''; }
  function toast(html, ms) {
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html; toastRoot.appendChild(t);
    setTimeout(() => t.classList.add('out'), ms || 2600); setTimeout(() => t.remove(), (ms || 2600) + 500);
  }
  function addCoins(n) { S.coins += n; const el = document.getElementById('coinCount'); if (el) { el.textContent = S.coins; el.parentNode.classList.remove('bump'); void el.offsetWidth; el.parentNode.classList.add('bump'); } }
  function addXP(n) {
    const before = levelInfo(S.xp).level; S.xp += n; const after = levelInfo(S.xp);
    if (after.level > before) return after; return null;
  }
  function checkBadges() {
    const fresh = [];
    BADGES.forEach(b => { if (!S.badges[b.id]) { let ok = false; try { ok = b.ok(S); } catch (e) { } if (ok) { S.badges[b.id] = today(); fresh.push(b); } } });
    fresh.forEach((b, i) => setTimeout(() => { sfx('coin'); toast(`<span class="t-e">${b.e}</span><div><b>Új trófea!</b><br>${esc(b.name)}</div>`, 3200); }, 600 + i * 900));
    return fresh;
  }
  function showLevelUp(lv) {
    if (!lv) return;
    setTimeout(() => {
      sfx('level'); confetti(160);
      modal(`<div class="center"><div class="big-e bounce">🎉</div><h2>Szintet léptél!</h2>
        <div class="lvl-big">${lv.level}</div><p class="title-chip">${esc(lv.title)}</p>
        <p>Jutalmad: <b>+${lv.level * 3} 💎</b></p>
        <button class="btn primary big" data-act="closeModal">Hurrá! 🥳</button></div>`);
      addCoins(lv.level * 3); save();
    }, 400);
  }

  /* ---------- Feloldás ---------- */
  function topicUnlocked(sid, idx) {
    if (S.settings.allOpen || idx === 0) return true;
    const s = subj(sid); return starsOf(S, sid, s.topics[idx - 1].id) >= 1;
  }
  function bossUnlocked(sid) { const s = subj(sid); return S.settings.allOpen || s.topics.every(t => starsOf(S, sid, t.id) >= 1); }
  function subjProgress(sid) { const s = subj(sid); const got = s.topics.reduce((a, t) => a + starsOf(S, sid, t.id), 0); return { got, max: s.topics.length * 3, pct: Math.round(got / (s.topics.length * 3) * 100) }; }

  /* ---------- Képernyők ---------- */
  const R = {};
  function go(to, p) { closeModal(); try { speechSynthesis.cancel(); } catch (e) { } (R[to] || R.home)(p || {}); }

  R.onboard = function (p) {
    const step = p.step || 1;
    if (step === 1) {
      screen(`<div class="onboard">
        <div class="mascot-big bounce">🦉</div>
        <div class="bubble big">Szia! Én <b>Huhu</b> vagyok, a bölcs bagoly. 🌟<br>Üdv a <b>Tudás-szigeten</b>! Itt játszva tanulhatod meg a 4. osztály minden titkát.</div>
        <label class="lbl">Hogy hívnak?</label>
        <input id="nameIn" class="big-input" maxlength="16" placeholder="Írd ide a neved" value="${esc(S.name)}" autocomplete="off">
        <button class="btn primary big" data-act="onboardName">Tovább ➜</button></div>`, 'sky');
      setTimeout(() => { const i = document.getElementById('nameIn'); i && i.focus(); }, 100);
    } else {
      screen(`<div class="onboard">
        <div class="bubble big">Örülök, hogy itt vagy, <b>${esc(S.name)}</b>! 😊<br>Válassz egy útitársat! (A Boltban később még többet találsz.)</div>
        <div class="avatar-pick">${AVATARS.filter(a => a.price === 0).map(a => `<button class="av-opt ${S.avatar === a.id ? 'on' : ''}" data-act="pickAv" data-id="${a.id}"><span>${a.e}</span><small>${a.name}</small></button>`).join('')}</div>
        <button class="btn primary big" data-act="onboardDone">Indulás a szigetre! 🏝️</button></div>`, 'sky');
    }
  };

  R.home = function () {
    ensureDaily();
    const tip = pick(MASCOT_TIPS);
    const hour = new Date().getHours();
    const greet = hour < 10 ? 'Jó reggelt' : hour < 18 ? 'Szia' : 'Jó estét';
    const rv = S.review.length;
    const cards = SUBJ.map(s => {
      const pr = subjProgress(s.id);
      return `<button class="island-card" style="--c:${s.color}" data-act="go" data-to="island" data-sid="${s.id}">
        <span class="ic-e">${s.icon}</span>${S.boss[s.id] ? '<span class="ic-crown">👑</span>' : ''}
        <span class="ic-t">${esc(s.island)}</span><span class="ic-s">${esc(s.name)}</span>
        <span class="ic-bar"><i style="width:${pr.pct}%"></i></span><span class="ic-p">★ ${pr.got} / ${pr.max}</span></button>`;
    }).join('');
    screen(topbar() + `<main class="content">
      <div class="mascot-row"><span class="mascot">🦉</span><div class="bubble">${greet}, <b>${esc(S.name)}</b>! ${esc(tip)}</div></div>
      ${!S.daily.chest ? `<button class="chest-card" data-act="openChest"><span class="wiggle">🎁</span><span><b>Napi kincsesláda</b><small>Kattints és nyisd ki!</small></span></button>` : ''}
      <div class="quick-row">
        <button class="quick daily ${S.daily.challenge ? 'done' : ''}" data-act="startDaily"><span>⚡</span><b>Napi kihívás</b><small>${S.daily.challenge ? 'Ma már teljesítve ✅' : '10 vegyes kérdés • +10 💎'}</small></button>
        <button class="quick review" data-act="startReview" ${rv ? '' : 'disabled'}><span>🔁</span><b>Ismétlő doboz</b><small>${rv ? rv + ' gyakorlandó kérdés' : 'Üres – szuper! 🎉'}</small></button>
      </div>
      <h2 class="sec-title">Válassz szigetet!</h2>
      <div class="islands">${cards}</div>
    </main>` + bottomnav('home'), 'home');
  };

  R.island = function (p) {
    const s = subj(p.sid || R._lastSid); if (!s) return R.home();
    R._lastSid = s.id;
    const W = 340, step = 128, xs = [170, 270, 170, 70];
    const nodes = s.topics.map((t, i) => ({ t, i, x: xs[i % 4], y: 70 + i * step }));
    const boss = { x: 170, y: 70 + s.topics.length * step + 10 };
    const pts = nodes.map(n => [n.x, n.y]).concat([[boss.x, boss.y]]);
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; const my = (y0 + y1) / 2; d += ` C${x0},${my} ${x1},${my} ${x1},${y1}`; }
    const H = boss.y + 110;
    let nextIdx = s.topics.findIndex((t, i) => topicUnlocked(s.id, i) && starsOf(S, s.id, t.id) < 1);
    const nodesHTML = nodes.map(n => {
      const un = topicUnlocked(s.id, n.i), st = starsOf(S, s.id, n.t.id);
      return `<button class="node ${un ? '' : 'locked'} ${st === 3 ? 'gold' : ''} ${n.i === nextIdx ? 'next' : ''}" style="left:${n.x}px;top:${n.y}px" data-act="topic" data-sid="${s.id}" data-tid="${n.t.id}">
        ${n.i === nextIdx ? `<span class="pin">${avatarHTML('xs')}</span>` : ''}
        <span class="node-e">${un ? n.t.icon : '🔒'}</span>${stars(st)}<span class="node-l">${esc(n.t.name)}</span></button>`;
    }).join('');
    const bu = bossUnlocked(s.id);
    screen(topbar() + `<main class="content island" style="--c:${s.color}">
      <div class="island-head"><button class="back" data-act="go" data-to="home">⬅</button><div><h1>${s.icon} ${esc(s.island)}</h1><p>${esc(s.name)} • ★ ${subjProgress(s.id).got}/${subjProgress(s.id).max}</p></div></div>
      <div class="map" style="width:${W}px;height:${H}px">
        <svg width="${W}" height="${H}" class="path"><path d="${d}" /></svg>
        ${nodesHTML}
        <button class="node boss ${bu ? '' : 'locked'} ${S.boss[s.id] ? 'gold' : ''}" style="left:${boss.x}px;top:${boss.y}px" data-act="boss" data-sid="${s.id}">
          <span class="node-e">${S.boss[s.id] ? '👑' : bu ? '🐉' : '🔒'}</span><span class="node-l">Sziget-próba</span></button>
      </div></main>` + bottomnav('home'), 'island-screen');
  };

  R.learn = function (p) {
    const t = topicOf(p.sid, p.tid); const s = subj(p.sid); const i = +p.i || 0; const cards = t.learn || [];
    if (!cards.length) return startTopic(p.sid, p.tid);
    const c = cards[i]; const last = i === cards.length - 1;
    if (last && !S.learned[p.sid + '/' + p.tid]) {
      S.learned[p.sid + '/' + p.tid] = today(); questEvent('learn'); addCoins(2); S.xp += 10; save();
      setTimeout(() => { sfx('coin'); toast('<span class="t-e">📖</span><div><b>Tudáskártyák elolvasva!</b><br>+2 💎 +10 XP</div>'); checkBadges(); save(); }, 300);
    }
    screen(`<div class="learn" style="--c:${s.color}">
      <div class="quiz-top"><button class="x" data-act="go" data-to="island" data-sid="${s.id}">✖</button><div class="learn-title">${t.icon} ${esc(t.name)}</div><div></div></div>
      <div class="lcard pop-in">
        <div class="lc-num">Tudáskártya ${i + 1} / ${cards.length}</div>
        <h2>${esc(c.title)}</h2><p>${fmtQ(c.text)}</p>
        ${c.example ? `<div class="example">💡 ${fmtQ(c.example)}</div>` : ''}
        <button class="speak" data-act="speakLearn" data-sid="${s.id}" data-tid="${t.id}" data-i="${i}">🔊 Felolvasom</button>
      </div>
      <div class="dots">${cards.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>
      <div class="learn-nav">
        <button class="btn ghost" data-act="learnNav" data-sid="${s.id}" data-tid="${t.id}" data-i="${i - 1}" ${i === 0 ? 'disabled' : ''}>◀ Vissza</button>
        ${last ? `<button class="btn primary" data-act="startTopic" data-sid="${s.id}" data-tid="${t.id}">🎮 Jöhet a játék!</button>`
        : `<button class="btn primary" data-act="learnNav" data-sid="${s.id}" data-tid="${t.id}" data-i="${i + 1}">Következő ▶</button>`}
      </div></div>`, 'learn-screen');
  };

  R.quests = function () {
    ensureDaily();
    const qs = S.daily.quests.map(q => {
      const d = QUESTS.find(x => x.id === q.id); if (!d) return '';
      const done = q.prog >= d.goal;
      return `<div class="quest ${q.claimed ? 'claimed' : done ? 'ready' : ''}"><span class="q-e">${d.icon}</span>
        <div class="q-body"><b>${esc(d.text)}</b><span class="ic-bar"><i style="width:${Math.round(q.prog / d.goal * 100)}%"></i></span><small>${q.prog} / ${d.goal}</small></div>
        ${q.claimed ? '<span class="q-done">✅</span>' : done ? `<button class="btn primary sm" data-act="claimQuest" data-id="${q.id}">+8 💎</button>` : '<span class="q-rew">8 💎</span>'}</div>`;
    }).join('');
    const allDone = S.daily.quests.every(q => q.claimed);
    screen(topbar() + `<main class="content">
      <h1 class="page-title">🎯 Mai küldetések</h1>
      <div class="mascot-row"><span class="mascot">🦉</span><div class="bubble">Minden nap új küldetéseket kapsz! Ha mindhármat teljesíted, kapsz egy <b>bónusz ládát</b> is! 🎁</div></div>
      ${!S.daily.chest ? `<button class="chest-card" data-act="openChest"><span class="wiggle">🎁</span><span><b>Napi kincsesláda</b><small>Kattints és nyisd ki!</small></span></button>` : ''}
      <div class="quests">${qs}</div>
      <div class="bonus-chest ${allDone ? (S.daily.bonus ? 'claimed' : 'ready') : ''}">
        <span class="wiggle">${S.daily.bonus ? '📦' : '🎁'}</span><div><b>Bónusz láda</b><small>${S.daily.bonus ? 'Ma már kinyitottad!' : allDone ? 'Megszerezted! Nyisd ki!' : 'Teljesítsd mind a 3 küldetést!'}</small></div>
        ${allDone && !S.daily.bonus ? '<button class="btn gold" data-act="claimBonus">Kinyitom! +15 💎</button>' : ''}
      </div>
      <div class="streak-box"><span>🔥</span><div><b>${S.streak.count} napos sorozat!</b><small>Leghosszabb: ${S.streak.best} nap. Gyere vissza holnap is!</small></div></div>
    </main>` + bottomnav('quests'));
  };

  R.trophies = function () {
    const got = BADGES.filter(b => S.badges[b.id]).length;
    screen(topbar() + `<main class="content">
      <h1 class="page-title">🏆 Trófeák <small>${got} / ${BADGES.length}</small></h1>
      <div class="badges">${BADGES.map(b => { const has = S.badges[b.id]; return `<button class="badge ${has ? 'has' : ''}" data-act="badgeInfo" data-id="${b.id}"><span class="b-e">${has ? b.e : '❔'}</span><span class="b-n">${esc(b.name)}</span></button>`; }).join('')}</div>
    </main>` + bottomnav('trophies'));
  };

  R.shop = function (p) {
    const tab = p.tab || R._shopTab || 'avatars'; R._shopTab = tab;
    const list = tab === 'avatars' ? AVATARS : tab === 'accs' ? ACCS : THEMES;
    const cur = tab === 'avatars' ? S.avatar : tab === 'accs' ? S.acc : S.theme;
    const items = list.map(it => {
      const own = S.owned[tab].indexOf(it.id) >= 0; const using = cur === it.id;
      return `<button class="shop-item ${own ? 'own' : ''} ${using ? 'using' : ''}" data-act="shopItem" data-tab="${tab}" data-id="${it.id}">
        <span class="si-e">${it.e || '🚫'}</span><span class="si-n">${esc(it.name)}</span>
        <span class="si-p">${using ? 'Rajtad ✅' : own ? 'Felveszem' : it.price + ' 💎'}</span>
        ${!own ? `<span class="si-bar"><i style="width:${Math.min(100, Math.round(S.coins / it.price * 100))}%"></i></span><small class="si-need">${S.coins >= it.price ? 'Megveheted! 🎉' : 'Még ' + (it.price - S.coins) + ' 💎'}</small>` : ''}</button>`;
    }).join('');
    screen(topbar() + `<main class="content">
      <h1 class="page-title">🛍️ Bolt</h1>
      <div class="shop-preview">${avatarHTML('lg')}<div class="bubble">Gyémántjaid: <b>${S.coins} 💎</b><br><small>Gyűjts többet játékkal, küldetésekkel!</small></div></div>
      <div class="tabs">
        <button class="${tab === 'avatars' ? 'on' : ''}" data-act="go" data-to="shop" data-tab="avatars">🐾 Figurák</button>
        <button class="${tab === 'accs' ? 'on' : ''}" data-act="go" data-to="shop" data-tab="accs">🎀 Kiegészítők</button>
        <button class="${tab === 'themes' ? 'on' : ''}" data-act="go" data-to="shop" data-tab="themes">🎨 Hátterek</button>
      </div>
      <div class="shop-grid">${items}</div>
    </main>` + bottomnav('shop'));
  };

  R.profile = function () {
    const lv = levelInfo(S.xp);
    const totalStars = SUBJ.reduce((a, s) => a + subjProgress(s.id).got, 0);
    const acc = S.stats.answered ? Math.round(S.stats.correct / S.stats.answered * 100) : 0;
    screen(topbar() + `<main class="content">
      <div class="profile-card">${avatarHTML('xl')}<h1>${esc(S.name)}</h1><p class="title-chip">${lv.level}. szint • ${esc(lv.title)}</p>
        <div class="lvl-bar wide"><i style="width:${lv.pct}%"></i></div><small>Még ${lv.need - lv.cur} XP a következő szintig</small></div>
      <div class="stat-grid">
        <div><span>✅</span><b>${S.stats.correct}</b><small>helyes válasz</small></div>
        <div><span>🎯</span><b>${acc}%</b><small>pontosság</small></div>
        <div><span>⭐</span><b>${totalStars}</b><small>csillag</small></div>
        <div><span>🏆</span><b>${Object.keys(S.badges).length}</b><small>trófea</small></div>
        <div><span>🔥</span><b>${S.stats.bestCombo}</b><small>legjobb sorozat</small></div>
        <div><span>🎮</span><b>${S.stats.rounds}</b><small>lejátszott kör</small></div>
      </div>
      <h2 class="sec-title">Útitársam</h2>
      <div class="avatar-pick small">${AVATARS.filter(a => S.owned.avatars.indexOf(a.id) >= 0).map(a => `<button class="av-opt ${S.avatar === a.id ? 'on' : ''}" data-act="equip" data-tab="avatars" data-id="${a.id}"><span>${a.e}</span></button>`).join('')}</div>
      <div class="avatar-pick small">${ACCS.filter(a => S.owned.accs.indexOf(a.id) >= 0).map(a => `<button class="av-opt ${S.acc === a.id ? 'on' : ''}" data-act="equip" data-tab="accs" data-id="${a.id}"><span>${a.e || '🚫'}</span></button>`).join('')}</div>
      <div class="row-btns">
        <button class="btn ghost" data-act="toggleSound">${S.settings.sound ? '🔊 Hang: be' : '🔇 Hang: ki'}</button>
        <button class="btn ghost" data-act="toggleRead">${S.settings.autoRead ? '🗣️ Felolvasás: be' : '🤐 Felolvasás: ki'}</button>
      </div>
      <button class="btn parent" data-act="parentGate">👨‍👩‍👧 Szülői sarok 🔒</button>
    </main>` + bottomnav('profile'));
  };

  R.parent = function () {
    const days = []; for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const k = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); days.push([k, S.days[k] || { q: 0, c: 0, sec: 0 }]); }
    const maxQ = Math.max(10, ...days.map(d => d[1].q));
    const totalSec = Object.values(S.days).reduce((a, d) => a + (d.sec || 0), 0);
    const dn = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];
    const rows = []; const weak = [];
    SUBJ.forEach(s => s.topics.forEach(t => {
      const r = S.tp[s.id + '/' + t.id]; if (!r || !r.n) return;
      const pct = Math.round(r.ok / r.n * 100); rows.push({ s, t, r, pct }); if (r.n >= 5) weak.push({ s, t, pct });
    }));
    weak.sort((a, b) => a.pct - b.pct);
    const subjRows = SUBJ.map(s => {
      let ok = 0, n = 0; s.topics.forEach(t => { const r = S.tp[s.id + '/' + t.id]; if (r) { ok += r.ok; n += r.n; } });
      const pr = subjProgress(s.id); const pct = n ? Math.round(ok / n * 100) : 0;
      return `<div class="p-subj"><span>${s.icon} ${esc(s.name)}</span><span class="p-bar"><i style="width:${pct}%;background:${s.color}"></i></span><b>${n ? pct + '%' : '–'}</b><small>${n} válasz • ★${pr.got}/${pr.max}</small></div>`;
    }).join('');
    screen(`<main class="content parent-view">
      <div class="island-head"><button class="back" data-act="go" data-to="profile">⬅</button><div><h1>👨‍👩‍👧 Szülői sarok</h1><p>${esc(S.name)} haladása</p></div></div>
      <div class="stat-grid">
        <div><span>⏱️</span><b>${Math.round(totalSec / 60)}</b><small>perc gyakorlás (90 nap)</small></div>
        <div><span>📝</span><b>${S.stats.answered}</b><small>megválaszolt kérdés</small></div>
        <div><span>🎯</span><b>${S.stats.answered ? Math.round(S.stats.correct / S.stats.answered * 100) : 0}%</b><small>összes pontosság</small></div>
      </div>
      <h2 class="sec-title">Elmúlt 7 nap</h2>
      <div class="week">${days.map(([k, d]) => `<div class="wd"><span class="wbar"><i style="height:${Math.round(d.q / maxQ * 100)}%"></i></span><b>${d.q}</b><small>${dn[new Date(k + 'T12:00:00').getDay()]}</small></div>`).join('')}</div>
      <h2 class="sec-title">Tantárgyak</h2><div class="p-card">${subjRows}</div>
      <h2 class="sec-title">Gyakorlásra érdemes témák</h2>
      <div class="p-card">${weak.length ? weak.slice(0, 6).map(w => `<div class="p-weak"><span>${w.s.icon} ${esc(w.t.name)}</span><b class="${w.pct < 60 ? 'red' : w.pct < 80 ? 'amber' : 'green'}">${w.pct}%</b></div>`).join('') : '<p class="muted">Még kevés az adat – legalább 5 válasz kell témánként.</p>'}</div>
      <h2 class="sec-title">Részletes témakörök</h2>
      <div class="p-card table">${rows.length ? `<table><tr><th>Téma</th><th>★</th><th>Pontosság</th><th>Kör</th></tr>${rows.map(r => `<tr><td>${r.s.icon} ${esc(r.t.name)}</td><td>${r.r.stars || 0}</td><td>${r.pct}% (${r.r.ok}/${r.r.n})</td><td>${r.r.plays || 0}</td></tr>`).join('')}</table>` : '<p class="muted">Még nincs lejátszott kör.</p>'}</div>
      <h2 class="sec-title">Beállítások</h2>
      <div class="p-card settings">
        <label class="sw"><input type="checkbox" data-act="setAllOpen" ${S.settings.allOpen ? 'checked' : ''}><span>Minden állomás és Sziget-próba nyitva (pl. ha egy konkrét témát kell gyakorolni a dolgozatra)</span></label>
        <label class="sw"><input type="checkbox" data-act="setSound" ${S.settings.sound ? 'checked' : ''}><span>Hangeffektek</span></label>
        <label class="sw"><input type="checkbox" data-act="setRead" ${S.settings.autoRead ? 'checked' : ''}><span>Kérdések automatikus felolvasása (gépi hang)</span></label>
        <div class="row-btns">
          <button class="btn ghost" data-act="rename">✏️ Név módosítása</button>
          <button class="btn ghost" data-act="changePin">🔑 PIN módosítása</button>
          <button class="btn ghost" data-act="exportSave">💾 Mentés letöltése</button>
          <button class="btn ghost" data-act="importSave">📂 Mentés betöltése</button>
          <button class="btn danger" data-act="resetAsk">🗑️ Haladás törlése</button>
        </div>
        <input type="file" id="importFile" accept=".json,application/json" hidden>
        <p class="muted small">A haladás ebben a böngészőben tárolódik. Másik gépre a „Mentés letöltése / betöltése” gombokkal viheted át.</p>
      </div>
    </main>`, 'parent');
  };

  /* ---------- Kérdéskezelés ---------- */
  function validQ(q) {
    if (!q || typeof q.q !== 'string') return false;
    switch (q.t) {
      case 'mc': return Array.isArray(q.a) && q.a.length >= 2;
      case 'tf': return typeof q.a === 'boolean';
      case 'input': return q.a !== undefined && q.a !== null && q.a !== '';
      case 'order': return Array.isArray(q.a) && q.a.length >= 2 && q.a.length <= 7;
      case 'match': return Array.isArray(q.a) && q.a.length >= 2 && q.a.every(p => Array.isArray(p) && p.length === 2);
      case 'group': return q.groups && Object.keys(q.groups).length >= 2 && Object.values(q.groups).every(Array.isArray);
    }
    return false;
  }
  function prepare(q, meta) {
    const p = Object.assign({ src: q, t: q.t, key: qkey(q) }, meta);
    if (q.t === 'mc') { const seen = {}; p.opts = shuffle(q.a.map(String).filter(x => seen[x] ? false : (seen[x] = 1))); p.correct = String(q.a[0]); }
    if (q.t === 'order') { p.items = q.a.map(String); let sh; let n = 0; do { sh = shuffle(p.items.map((_, i) => i)); } while (sh.every((v, i) => v === i) && ++n < 10); p.perm = sh; }
    if (q.t === 'match') { p.L = shuffle(q.a.map(x => String(x[0]))); p.R = shuffle(q.a.map(x => String(x[1]))); }
    if (q.t === 'group') { p.cats = Object.keys(q.groups); p.items = shuffle([].concat(...p.cats.map((c, ci) => q.groups[c].map(it => ({ txt: String(it), cat: ci }))))); }
    return p;
  }
  const DW = { 0: { 1: 5, 2: 3, 3: 0.6 }, 1: { 1: 3, 2: 4, 3: 2 }, 2: { 1: 1.5, 2: 4, 3: 4 }, 3: { 1: 1, 2: 3, 3: 5 } };
  function genQ(t, d) { try { const q = t.gen(+d); return validQ(q) ? q : null; } catch (e) { return null; } }
  function buildTopic(sid, tid, n, dw) {
    const t = topicOf(sid, tid); const meta = { sid, tid };
    const st = (t.questions || []).filter(validQ);
    let nGen = 0;
    if (typeof t.gen === 'function') nGen = st.length >= n ? Math.floor(n / 2) : n - st.length;
    const out = []; const used = {};
    const pool = st.map(q => ({ q, k: qkey(q) }));
    for (let i = 0; i < n - nGen && pool.length; i++) {
      const w = {}; pool.forEach((e, j) => { w[j] = (dw[e.q.d || 2] || 1) / (1 + (S.seen[e.k] || 0) * 1.5); });
      const j = +weighted(w); const e = pool.splice(j, 1)[0]; used[e.k] = 1; out.push(prepare(e.q, meta));
    }
    for (let i = 0, tries = 0; i < nGen && tries < nGen * 6; tries++) {
      const q = genQ(t, weighted(dw)); if (!q) continue; const k = qkey(q); if (used[k]) continue;
      used[k] = 1; const p = prepare(q, meta); p.gen = true; out.push(p); i++;
    }
    return out;
  }

  let Q = null; // aktív kör
  function startTopic(sid, tid) {
    const t = topicOf(sid, tid); const st = starsOf(S, sid, tid);
    const items = shuffle(buildTopic(sid, tid, 8, DW[st]));
    beginQuiz({ mode: 'topic', sid, tid, title: t.icon + ' ' + t.name, items });
  }
  function startBoss(sid) {
    const s = subj(sid); const items = [];
    const ts = shuffle(s.topics);
    for (let i = 0; i < 12; i++) { const t = ts[i % ts.length]; const got = buildTopic(sid, t.id, 1, { 1: 1, 2: 3, 3: 4 }); if (got[0] && !items.some(x => x.key === got[0].key)) items.push(got[0]); }
    beginQuiz({ mode: 'boss', sid, title: '🐉 Sziget-próba', items: shuffle(items), hearts: 3 });
  }
  function startDaily() {
    const items = [];
    SUBJ.forEach(s => {
      const open = s.topics.filter((t, i) => topicUnlocked(s.id, i));
      const ts = shuffle(open);
      for (let k = 0, tries = 0; k < 2 && tries < 8; tries++) {
        const t = ts[tries % ts.length]; const g = buildTopic(s.id, t.id, 1, { 1: 3, 2: 4, 3: 1 });
        if (g[0] && !items.some(x => x.key === g[0].key)) { items.push(g[0]); k++; }
      }
    });
    beginQuiz({ mode: 'daily', title: '⚡ Napi kihívás', items: shuffle(items).slice(0, 10) });
  }
  function startReview() {
    const items = S.review.slice(0, 10).filter(r => validQ(r.q)).map(r => prepare(r.q, { sid: r.sid, tid: r.tid }));
    if (!items.length) return;
    beginQuiz({ mode: 'review', title: '🔁 Ismétlő doboz', items: shuffle(items) });
  }
  function beginQuiz(o) {
    if (!o.items.length) { toast('<span class="t-e">😕</span><div>Itt még nincsenek kérdések.</div>'); return; }
    Q = Object.assign({ i: 0, ok: 0, total: 0, combo: 0, maxCombo: 0, xp: 0, retries: 0, tick: Date.now(), wrongs: [] }, o);
    Q.items.forEach(it => it.retry = false);
    if (o.sid) questEvent('subject', o.sid);
    nextQ(true);
  }
  function nextQ(first) {
    if (!first) Q.i++;
    if (Q.i >= Q.items.length || (Q.mode === 'boss' && Q.hearts <= 0)) return finishQuiz();
    Q.cur = Q.items[Q.i]; Q.ui = { picked: [], pairs: {}, sel: null, place: {}, val: '' }; Q.locked = false;
    renderQuiz();
    if (S.settings.autoRead) setTimeout(readQ, 300);
  }
  function readQ() {
    const p = Q.cur; let txt = p.src.q;
    if (p.t === 'mc') txt += '. ' + p.opts.join(', vagy ');
    if (p.t === 'tf') txt += '. Igaz vagy hamis?';
    speak(txt);
  }

  function renderQuiz() {
    const p = Q.cur, q = p.src; const total = Q.items.length;
    const s = subj(p.sid); const t = topicOf(p.sid, p.tid);
    const pct = Math.round(Q.i / total * 100);
    const right = Q.mode === 'boss' ? `<div class="hearts">${'❤️'.repeat(Math.max(0, Q.hearts))}${'🤍'.repeat(3 - Math.max(0, Q.hearts))}</div>` : `<div class="combo ${Q.combo >= 3 ? 'hot' : ''}">🔥 ${Q.combo}</div>`;
    const chip = (Q.mode !== 'topic' && s && t) ? `<span class="q-chip" style="--c:${s.color}">${s.icon} ${esc(t.name)}</span>` : '';
    screen(`<div class="quiz" style="--c:${s ? s.color : '#FF7A59'}">
      <div class="quiz-top"><button class="x" data-act="quitAsk" aria-label="Kilépés">✖</button>
        <div class="qprog"><i style="width:${pct}%"></i><span>${Q.i + 1} / ${total}</span></div>${right}</div>
      <div class="qcard pop-in">
        ${p.retry ? '<span class="q-chip retry">🔁 Próbáld újra!</span>' : chip}
        <div class="qtext">${fmtQ(q.q)}</div>
        ${q.pic ? `<div class="qpic">${esc(q.pic)}</div>` : ''}
        <button class="speak sm" data-act="readQ" aria-label="Felolvasás">🔊</button>
      </div>
      <div class="answers" id="answers">${answersHTML()}</div>
      <div class="feedback" id="fb"></div>
    </div>`, 'quiz-screen');
    if (p.t === 'input') { const i = document.getElementById('ansIn'); if (i) { i.focus(); i.addEventListener('keydown', e => { if (e.key === 'Enter') A.checkInput(); }); i.addEventListener('input', () => { Q.ui.val = i.value; const b = document.getElementById('checkBtn'); if (b) b.disabled = !i.value.trim(); }); } }
  }
  function rerenderAnswers() { const el = document.getElementById('answers'); if (el) el.innerHTML = answersHTML(); }
  function answersHTML() {
    const p = Q.cur, q = p.src, u = Q.ui, L = Q.locked;
    if (p.t === 'mc') {
      const long = p.opts.some(o => o.length > (window.innerWidth < 520 ? 10 : 18));
      return `<div class="mc ${long ? 'col' : ''}">${p.opts.map((o, i) => {
        let cls = ''; if (L) { if (o === p.correct) cls = 'right'; else if (u.choice === i) cls = 'wrong'; else cls = 'dim'; }
        return `<button class="opt ${cls}" data-act="mc" data-i="${i}" ${L ? 'disabled' : ''}><span class="opt-k">${'ABCDE'[i]}</span>${esc(o)}</button>`;
      }).join('')}</div>`;
    }
    if (p.t === 'tf') {
      const c = v => L ? (q.a === v ? 'right' : u.choice === v ? 'wrong' : 'dim') : '';
      return `<div class="tf"><button class="opt tf-y ${c(true)}" data-act="tf" data-v="1" ${L ? 'disabled' : ''}>👍 Igaz</button><button class="opt tf-n ${c(false)}" data-act="tf" data-v="0" ${L ? 'disabled' : ''}>👎 Hamis</button></div>`;
    }
    if (p.t === 'input') {
      const acc = [].concat(q.a).map(String); const num = acc.every(a => /^-?[\d\s.]+$/.test(a));
      return `<div class="inp ${L ? (u.res ? 'right' : 'wrong') : ''}"><input id="ansIn" class="big-input" ${num ? 'inputmode="numeric"' : ''} autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Írd ide a választ" value="${esc(u.val)}" ${L ? 'disabled' : ''}>${q.unit ? `<span class="unit">${esc(q.unit)}</span>` : ''}</div>
        ${L ? '' : `<button id="checkBtn" class="btn primary big" data-act="checkInput" ${u.val.trim() ? '' : 'disabled'}>Kész ✔</button>`}`;
    }
    if (p.t === 'order') {
      const slots = p.items.map((_, k) => { const idx = u.picked[k]; const filled = idx !== undefined;
        let cls = ''; if (L && filled) cls = p.items[idx] === p.items[k] ? 'right' : 'wrong';
        return `<button class="slot ${filled ? 'filled' : ''} ${cls}" data-act="unpick" data-k="${k}" ${L || !filled ? 'disabled' : ''}><em>${k + 1}.</em>${filled ? esc(p.items[idx]) : ''}</button>`; }).join('');
      const pool = p.perm.map(i => u.picked.indexOf(i) >= 0 ? `<span class="chip ghost">${esc(p.items[i])}</span>` : `<button class="chip" data-act="pickOrder" data-i="${i}" ${L ? 'disabled' : ''}>${esc(p.items[i])}</button>`).join('');
      return `<div class="order"><div class="slots">${slots}</div><div class="pool">${pool}</div></div>
        ${L ? '' : `<button class="btn primary big" data-act="checkOrder" ${u.picked.length === p.items.length ? '' : 'disabled'}>Ellenőrzés ✔</button>`}`;
    }
    if (p.t === 'match') {
      const rIdx = {}; Object.keys(u.pairs).forEach(l => rIdx[u.pairs[l]] = +l);
      const truth = {}; q.a.forEach(x => truth[String(x[0])] = String(x[1]));
      const colOf = l => Object.keys(u.pairs).map(Number).sort((a, b) => a - b).indexOf(l);
      const left = p.L.map((t, i) => { const paired = u.pairs[i] !== undefined; let cls = paired ? 'pc' + colOf(i) : ''; if (u.sel === i) cls += ' sel';
        if (L) cls += truth[t] === p.R[u.pairs[i]] ? ' right' : ' wrong';
        return `<button class="m-item ${cls}" data-act="mL" data-i="${i}" ${L ? 'disabled' : ''}>${esc(t)}</button>`; }).join('');
      const right = p.R.map((t, j) => { const l = rIdx[j]; const paired = l !== undefined; let cls = paired ? 'pc' + colOf(l) : '';
        return `<button class="m-item ${cls}" data-act="mR" data-i="${j}" ${L ? 'disabled' : ''}>${esc(t)}</button>`; }).join('');
      return `<p class="hint">Koppints egy bal oldali, majd a hozzá illő jobb oldali elemre!</p><div class="match"><div class="mcol">${left}</div><div class="mcol">${right}</div></div>
        ${L ? '' : `<button class="btn primary big" data-act="checkMatch" ${Object.keys(u.pairs).length === p.L.length ? '' : 'disabled'}>Ellenőrzés ✔</button>`}`;
    }
    if (p.t === 'group') {
      const loose = p.items.map((it, i) => u.place[i] === undefined ? `<button class="chip ${u.sel === i ? 'sel' : ''}" data-act="gSel" data-i="${i}" ${L ? 'disabled' : ''}>${esc(it.txt)}</button>` : '').join('');
      const boxes = p.cats.map((c, ci) => `<div class="gbox" data-act="gPut" data-c="${ci}"><div class="g-title">${esc(c)}</div><div class="g-items">${p.items.map((it, i) => u.place[i] === ci ? `<button class="chip in ${L ? (it.cat === ci ? 'right' : 'wrong') : ''}" data-act="gBack" data-i="${i}" ${L ? 'disabled' : ''}>${esc(it.txt)}</button>` : '').join('')}</div></div>`).join('');
      const all = Object.keys(u.place).length === p.items.length;
      return `<p class="hint">${u.sel !== null && u.sel !== undefined ? 'Most koppints a megfelelő dobozra! 👇' : 'Koppints egy szóra, majd arra a dobozra, ahová tartozik!'}</p>
        <div class="gpool">${loose || (L ? '' : '<span class="muted">Minden a helyén! 👍</span>')}</div><div class="gboxes c${p.cats.length}">${boxes}</div>
        ${L ? '' : `<button class="btn primary big" data-act="checkGroup" ${all ? '' : 'disabled'}>Ellenőrzés ✔</button>`}`;
    }
    return '';
  }
  function norm(s) { return String(s).toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.!]+$/, ''); }
  function correctText(p) {
    const q = p.src;
    switch (p.t) {
      case 'mc': return p.correct;
      case 'tf': return q.a ? 'Igaz' : 'Hamis';
      case 'input': return [].concat(q.a)[0] + (q.unit ? ' ' + q.unit : '');
      case 'order': return q.a.join(' → ');
      case 'match': return q.a.map(x => x[0] + ' = ' + x[1]).join('; ');
      case 'group': return Object.keys(q.groups).map(k => k + ': ' + q.groups[k].join(', ')).join(' | ');
    }
  }
  function answered(ok) {
    if (Q.locked) return; Q.locked = true; Q.ui.res = ok;
    const p = Q.cur; const now = Date.now(); const dr = dayRec();
    dr.sec += Math.min(120, Math.round((now - Q.tick) / 1000)); Q.tick = now;
    if (!p.retry) {
      Q.total++; S.stats.answered++; dr.q++;
      const k = p.sid + '/' + p.tid; const r = S.tp[k] || (S.tp[k] = { stars: 0, plays: 0, ok: 0, n: 0 });
      r.n++; if (!p.gen) S.seen[p.key] = (S.seen[p.key] || 0) + 1;
      if (ok) { Q.ok++; r.ok++; S.stats.correct++; dr.c++; questEvent('correct'); }
    }
    if (ok) {
      Q.combo++; Q.maxCombo = Math.max(Q.maxCombo, Q.combo); S.stats.bestCombo = Math.max(S.stats.bestCombo, Q.combo); questEvent('combo', Q.combo);
      Q.xp += p.retry ? 3 : 10 + Math.min(10, (Q.combo - 1) * 2);
      if (Q.mode === 'review') { const before = S.review.length; S.review = S.review.filter(r => qkey(r.q) !== p.key); if (S.review.length < before) { S.stats.fixed++; questEvent('reviewfix'); } }
      else if (!p.retry) { S.review = S.review.filter(r => qkey(r.q) !== p.key); }
      sfx('ok');
    } else {
      Q.combo = 0; sfx('bad');
      if (!S.review.some(r => qkey(r.q) === p.key)) { S.review.push({ sid: p.sid, tid: p.tid, q: p.src }); if (S.review.length > 80) S.review.shift(); }
      if (Q.mode === 'boss') Q.hearts--;
      else if (Q.retries < 3 && !p.retry && Q.mode !== 'review') { Q.retries++; const c = prepare(p.src, { sid: p.sid, tid: p.tid, gen: p.gen }); c.retry = true; Q.items.push(c); }
    }
    save();
    rerenderAnswers();
    const fb = document.getElementById('fb'); const ex = p.src.ex;
    fb.className = 'feedback show ' + (ok ? 'good' : 'bad');
    fb.innerHTML = `<div class="fb-in"><div class="fb-head">${ok ? pick(PRAISE) : pick(COMFORT)}</div>
      ${ok ? '' : `<div class="fb-ans">Helyes válasz: <b>${esc(correctText(p))}</b></div>`}
      ${ex && (!ok || p.t !== 'tf') ? `<div class="fb-ex">${fmtQ(ex)}</div>` : ''}
      <button class="btn ${ok ? 'ok' : 'warn'} big" data-act="nextQ" id="nextBtn">${Q.mode === 'boss' && Q.hearts <= 0 ? 'Eredmény ➜' : 'Tovább ➜'}</button></div>`;
    if (Q.combo === 5 || Q.combo === 10) { toast(`<span class="t-e">🔥</span><div><b>${Q.combo} egymás után!</b><br>Lángolsz!</div>`, 1800); }
    setTimeout(() => { const b = document.getElementById('nextBtn'); b && b.focus({ preventScroll: true }); fb.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, 50);
  }

  function finishQuiz() {
    const q = Q; Q = null;
    const pct = q.total ? q.ok / q.total : 0;
    let st = pct >= 0.875 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0;
    let coins = st * 2; let xp = q.xp + 15; let title, sub, extra = '';
    const perfect = q.total > 0 && q.ok === q.total;
    if (perfect) { coins += 3; S.stats.perfect++; }
    S.stats.rounds++; questEvent('round');
    if (q.mode === 'topic') {
      const k = q.sid + '/' + q.tid; const r = S.tp[k] || (S.tp[k] = { stars: 0, plays: 0, ok: 0, n: 0 });
      const prev = r.stars || 0; r.plays++; r.last = today();
      if (st > prev) { r.stars = st; coins += (st - prev) * 5; if (prev === 0 && st > 0) extra = '<p class="unlock">🔓 Új állomás nyílt meg a szigeten!</p>'; }
      if (st === 3) questEvent('star3');
    }
    let bossWin = false;
    if (q.mode === 'boss') {
      bossWin = q.hearts > 0 && pct >= 0.6;
      if (bossWin) { const first = !S.boss[q.sid]; S.boss[q.sid] = today(); coins += first ? 40 : 5; xp += first ? 100 : 20; }
      st = bossWin ? (q.hearts === 3 ? 3 : q.hearts === 2 ? 2 : 1) : 0;
    }
    if (q.mode === 'daily') { if (!S.daily.challenge) { S.daily.challenge = true; coins += 10; S.stats.dailies++; questEvent('daily'); } }
    if (q.mode === 'review') coins += 2;
    addCoins(coins); const lv = addXP(xp);
    const fresh = checkBadges(); save();

    if (q.mode === 'boss') { title = bossWin ? 'Legyőzted a Sziget-próbát! 🏆' : 'A sárkány most győzött… 🐉'; sub = bossWin ? 'Igazi bajnok vagy! A sziget a tiéd! 👑' : 'Gyakorolj még egy kicsit az állomásokon, aztán próbáld újra!'; }
    else if (st === 3) { title = perfect ? 'Hibátlan! 🌟' : 'Fantasztikus! 🌟'; sub = 'Igazi tudásbajnok vagy!'; }
    else if (st === 2) { title = 'Nagyon ügyes! 😊'; sub = 'Még egy kis gyakorlás, és meglesz a 3 csillag!'; }
    else if (st === 1) { title = 'Szép munka! 👍'; sub = 'Nézd át a Tudáskártyákat, és próbáld újra!'; }
    else { title = 'Ne add fel! 💪'; sub = 'Minden gyakorlással okosabb leszel. Olvasd el a Tudáskártyákat, aztán újra!'; }

    const s = subj(q.sid);
    const again = q.mode === 'topic' ? `<button class="btn ghost big" data-act="startTopic" data-sid="${q.sid}" data-tid="${q.tid}">🔁 Újra</button>`
      : q.mode === 'boss' ? `<button class="btn ghost big" data-act="boss" data-sid="${q.sid}">🔁 Újra</button>` : '';
    const back = q.sid ? `<button class="btn primary big" data-act="go" data-to="island" data-sid="${q.sid}">🗺️ Vissza a szigetre</button>` : `<button class="btn primary big" data-act="go" data-to="home">🏝️ Főoldal</button>`;
    screen(`<div class="results" style="--c:${s ? s.color : '#FF7A59'}">
      <div class="res-card pop-in">
        <div class="res-stars">${[0, 1, 2].map(i => `<span class="rs ${i < st ? 'on' : ''}" style="animation-delay:${0.3 + i * 0.35}s">★</span>`).join('')}</div>
        <h1>${title}</h1><p>${sub}</p>${extra}
        <div class="res-stats">
          <div><b>${q.ok}/${q.total}</b><small>helyes</small></div>
          <div><b>🔥 ${q.maxCombo}</b><small>legjobb sorozat</small></div>
          <div><b>+${xp}</b><small>XP</small></div>
          <div><b>+${coins} 💎</b><small>gyémánt</small></div>
        </div>
        ${fresh.length ? `<div class="res-badges">${fresh.map(b => `<span title="${esc(b.name)}">${b.e}</span>`).join('')}<small>Új trófea!</small></div>` : ''}
        <div class="res-btns">${again}${back}</div>
      </div>
      <div class="mascot-row"><span class="mascot bounce">🦉</span><div class="bubble">${st >= 2 || bossWin ? 'Büszke vagyok rád! Huhu! 🎉' : 'A hibás kérdéseket betettem az Ismétlő dobozba. Ott újra próbálhatod őket! 🔁'}</div></div>
    </div>`, 'results-screen');
    [0, 1, 2].forEach(i => { if (i < st) setTimeout(() => sfx('pop'), 300 + i * 350); });
    if (st === 3 || bossWin) { setTimeout(() => { sfx('win'); confetti(); }, 1200); }
    showLevelUp(lv);
  }

  /* ---------- PIN billentyűzet ---------- */
  function pinPad(title, cb) {
    let v = '';
    const draw = () => modal(`<div class="center"><h2>${title}</h2><div class="pin-dots">${[0, 1, 2, 3].map(i => `<i class="${i < v.length ? 'on' : ''}"></i>`).join('')}</div>
      <div class="pinpad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map(k => `<button data-act="pinKey" data-k="${k}">${k}</button>`).join('')}</div>
      <button class="btn ghost" data-act="closeModal">Mégse</button></div>`, 'pin');
    A._pinKey = k => {
      if (k === 'C') v = ''; else if (k === '⌫') v = v.slice(0, -1); else if (v.length < 4) v += k;
      if (v.length === 4) { const r = v; v = ''; cb(r, draw); } else draw();
    };
    draw();
  }

  /* ---------- Akciók ---------- */
  const A = {
    go: d => go(d.to, d),
    closeModal: () => closeModal(),
    modalBg: (d, el, e) => { if (e.target === el) closeModal(); },
    onboardName: () => {
      const v = (document.getElementById('nameIn').value || '').trim();
      if (!v) { const i = document.getElementById('nameIn'); i.classList.add('shake'); setTimeout(() => i.classList.remove('shake'), 500); return; }
      S.name = v.slice(0, 16); save(); R.onboard({ step: 2 });
    },
    pickAv: d => { S.avatar = d.id; sfx('pop'); R.onboard({ step: 2 }); },
    onboardDone: () => { updateStreak(); ensureDaily(); save(); sfx('win'); confetti(80); go('home'); },
    openChest: () => {
      ensureDaily(); if (S.daily.chest) return;
      const n = Math.min(10, 2 + S.streak.count); S.daily.chest = true; addCoins(n); save(); sfx('coin'); confetti(70);
      modal(`<div class="center"><div class="big-e bounce">💎</div><h2>Napi kincs!</h2><p>Kaptál <b>${n} gyémántot</b>!</p><p class="muted">${S.streak.count} napos sorozat 🔥 – minél több napot jössz egymás után, annál nagyobb a kincs!</p><button class="btn primary big" data-act="go" data-to="home">Szuper! 😊</button></div>`);
      checkBadges(); save();
    },
    topic: d => {
      const s = subj(d.sid); const idx = s.topics.findIndex(t => t.id === d.tid); const t = s.topics[idx];
      if (!topicUnlocked(d.sid, idx)) { sfx('bad'); modal(`<div class="center"><div class="big-e">🔒</div><h2>Ez még zárva van</h2><p>Előbb szerezz legalább <b>1 ⭐</b>-ot az előző állomáson: <b>${esc(s.topics[idx - 1].name)}</b></p><button class="btn primary big" data-act="closeModal">Rendben</button></div>`); return; }
      const r = S.tp[d.sid + '/' + d.tid] || {}; const learned = S.learned[d.sid + '/' + d.tid];
      modal(`<div class="center topic-modal" style="--c:${s.color}"><div class="big-e">${t.icon}</div><h2>${esc(t.name)}</h2>${stars(r.stars || 0)}
        <p class="muted">${r.n ? `Eddig ${r.ok}/${r.n} helyes válasz` : 'Még nem játszottál itt.'}</p>
        <div class="col-btns">
          <button class="btn learnb big" data-act="learnNav" data-sid="${d.sid}" data-tid="${d.tid}" data-i="0">📖 Tudáskártyák ${learned ? '✅' : '<small>+2 💎</small>'}</button>
          <button class="btn primary big" data-act="startTopic" data-sid="${d.sid}" data-tid="${d.tid}">🎮 Játék! <small>8 kérdés</small></button>
        </div><button class="btn ghost" data-act="closeModal">Bezár</button></div>`);
    },
    boss: d => {
      if (!bossUnlocked(d.sid)) { sfx('bad'); modal(`<div class="center"><div class="big-e">🐉</div><h2>A Sziget-próba még zárva</h2><p>Szerezz legalább <b>1 ⭐</b>-ot a sziget minden állomásán, és kinyílik a sárkány barlangja!</p><button class="btn primary big" data-act="closeModal">Rendben</button></div>`); return; }
      modal(`<div class="center"><div class="big-e bounce">🐉</div><h2>Sziget-próba</h2><p>12 nehezebb kérdés a sziget minden témájából. <b>3 életed</b> van ❤️❤️❤️ – minden hiba egyet elvesz!</p><p>Győzelemért: <b>+40 💎</b> és egy trófea! 🏆</p>
        <button class="btn primary big" data-act="startBoss" data-sid="${d.sid}">⚔️ Vállalom!</button><button class="btn ghost" data-act="closeModal">Majd később</button></div>`);
    },
    startBoss: d => { closeModal(); startBoss(d.sid); },
    learnNav: d => { closeModal(); sfx('click'); R.learn(d); },
    speakLearn: d => { const c = topicOf(d.sid, d.tid).learn[+d.i]; speak(c.title + '. ' + c.text + (c.example ? '. ' + c.example : '')); },
    startTopic: d => { closeModal(); startTopic(d.sid, d.tid); },
    startDaily: () => { ensureDaily(); startDaily(); },
    startReview: () => startReview(),
    readQ: () => readQ(),
    mc: d => { const i = +d.i; Q.ui.choice = i; answered(Q.cur.opts[i] === Q.cur.correct); },
    tf: d => { const v = d.v === '1'; Q.ui.choice = v; answered(v === Q.cur.src.a); },
    checkInput: () => {
      if (Q.locked) return; const i = document.getElementById('ansIn'); const v = (i ? i.value : Q.ui.val); if (!v.trim()) return; Q.ui.val = v;
      const acc = [].concat(Q.cur.src.a).map(String);
      const nv = norm(v), nvn = nv.replace(/[\s.]/g, '');
      answered(acc.some(a => { const na = norm(a); return na === nv || na.replace(/[\s.]/g, '') === nvn; }));
    },
    pickOrder: d => { sfx('click'); Q.ui.picked.push(+d.i); rerenderAnswers(); },
    unpick: d => { const k = +d.k; Q.ui.picked.splice(k, 1); rerenderAnswers(); },
    checkOrder: () => { const p = Q.cur; answered(Q.ui.picked.every((idx, k) => p.items[idx] === p.items[k])); },
    mL: d => { const i = +d.i; sfx('click'); if (Q.ui.pairs[i] !== undefined) { delete Q.ui.pairs[i]; Q.ui.sel = i; } else Q.ui.sel = Q.ui.sel === i ? null : i; rerenderAnswers(); },
    mR: d => {
      const j = +d.i; const u = Q.ui;
      const owner = Object.keys(u.pairs).find(l => u.pairs[l] === j);
      if (u.sel === null || u.sel === undefined) { if (owner !== undefined) { delete u.pairs[owner]; u.sel = +owner; rerenderAnswers(); } return; }
      if (owner !== undefined) delete u.pairs[owner];
      u.pairs[u.sel] = j; u.sel = null; sfx('pop'); rerenderAnswers();
    },
    checkMatch: () => { const p = Q.cur; const truth = {}; p.src.q && p.src.a.forEach(x => truth[String(x[0])] = String(x[1])); answered(p.L.every((t, i) => truth[t] === p.R[Q.ui.pairs[i]])); },
    gSel: d => { sfx('click'); const i = +d.i; Q.ui.sel = Q.ui.sel === i ? null : i; rerenderAnswers(); },
    gPut: (d, el, e) => { if (e.target.closest('.chip')) return; const u = Q.ui; if (u.sel === null || u.sel === undefined || Q.locked) return; u.place[u.sel] = +d.c; u.sel = null; sfx('pop'); rerenderAnswers(); },
    gBack: d => { delete Q.ui.place[+d.i]; rerenderAnswers(); },
    checkGroup: () => { const p = Q.cur; answered(p.items.every((it, i) => Q.ui.place[i] === it.cat)); },
    nextQ: () => { sfx('click'); nextQ(); },
    quitAsk: () => modal(`<div class="center"><div class="big-e">🤔</div><h2>Biztosan kilépsz?</h2><p>A kör eredménye elveszik, de a helyes válaszaidért járó tudás megmarad! 😉</p>
      <button class="btn primary big" data-act="closeModal">Maradok! 💪</button><button class="btn ghost" data-act="quitQuiz">Kilépek</button></div>`),
    quitQuiz: () => { const sid = Q && Q.sid; Q = null; closeModal(); sid ? go('island', { sid }) : go('home'); },
    claimQuest: d => {
      const q = S.daily.quests.find(x => x.id === d.id); if (!q || q.claimed) return; q.claimed = true; addCoins(8); const lv = addXP(20); sfx('coin');
      toast('<span class="t-e">🎯</span><div><b>Küldetés teljesítve!</b><br>+8 💎 +20 XP</div>'); checkBadges(); save(); R.quests(); showLevelUp(lv);
    },
    claimBonus: () => { if (S.daily.bonus) return; S.daily.bonus = true; addCoins(15); save(); sfx('win'); confetti(); R.quests(); modal(`<div class="center"><div class="big-e bounce">🎁</div><h2>Bónusz láda!</h2><p>Minden mai küldetést teljesítettél! <b>+15 💎</b></p><button class="btn primary big" data-act="closeModal">Juhé! 🥳</button></div>`); },
    badgeInfo: d => { const b = BADGES.find(x => x.id === d.id); const has = S.badges[b.id]; modal(`<div class="center"><div class="big-e">${has ? b.e : '❔'}</div><h2>${esc(b.name)}</h2><p>${esc(b.desc)}</p>${has ? `<p class="muted">Megszerezve: ${S.badges[b.id]}</p>` : '<p class="muted">Még nem szerezted meg. Hajrá! 💪</p>'}<button class="btn primary" data-act="closeModal">Rendben</button></div>`); },
    shopItem: d => {
      const list = d.tab === 'avatars' ? AVATARS : d.tab === 'accs' ? ACCS : THEMES; const it = list.find(x => x.id === d.id);
      if (S.owned[d.tab].indexOf(it.id) >= 0) return A.equip(d);
      if (S.coins < it.price) { sfx('bad'); modal(`<div class="center"><div class="big-e">${it.e}</div><h2>${esc(it.name)}</h2><p>Ehhez még <b>${it.price - S.coins} 💎</b> kell.<br>Gyűjtsd szorgalmasan: csillagokért, küldetésekért és a napi ládáért is jár gyémánt! 💪</p><button class="btn primary big" data-act="closeModal">Rendben</button></div>`); return; }
      modal(`<div class="center"><div class="big-e bounce">${it.e}</div><h2>${esc(it.name)}</h2><p>Megveszed <b>${it.price} 💎</b>-ért?</p><button class="btn primary big" data-act="buy" data-tab="${d.tab}" data-id="${it.id}">Igen, kérem! 🛒</button><button class="btn ghost" data-act="closeModal">Mégse</button></div>`);
    },
    buy: d => {
      const list = d.tab === 'avatars' ? AVATARS : d.tab === 'accs' ? ACCS : THEMES; const it = list.find(x => x.id === d.id);
      if (S.coins < it.price || S.owned[d.tab].indexOf(it.id) >= 0) return;
      S.coins -= it.price; S.owned[d.tab].push(it.id); S.stats.bought++; sfx('win'); confetti(60);
      A.equip(d, true); checkBadges(); save();
    },
    equip: (d, silent) => {
      if (d.tab === 'avatars') S.avatar = d.id; else if (d.tab === 'accs') S.acc = d.id; else { S.theme = d.id; applyTheme(); }
      if (!silent) sfx('pop'); save(); closeModal();
      if (app.querySelector('.profile-card')) R.profile(); else R.shop({ tab: d.tab });
    },
    toggleSound: () => { S.settings.sound = !S.settings.sound; save(); R.profile(); },
    toggleRead: () => { S.settings.autoRead = !S.settings.autoRead; save(); R.profile(); },
    parentGate: () => {
      if (!S.settings.pin) {
        pinPad('Szülő: adj meg egy új 4 jegyű PIN-kódot', (v) => { pinPad('Ismételd meg a PIN-kódot', (v2, redraw) => { if (v2 === v) { S.settings.pin = v; save(); closeModal(); go('parent'); } else { toast('<span class="t-e">❌</span><div>Nem egyezik, kezdd újra!</div>'); closeModal(); } }); });
      } else pinPad('Szülői sarok – PIN-kód', (v, redraw) => { if (v === S.settings.pin) { closeModal(); go('parent'); } else { sfx('bad'); toast('<span class="t-e">❌</span><div>Hibás PIN</div>'); redraw(); } });
    },
    pinKey: d => { sfx('click'); A._pinKey && A._pinKey(d.k); },
    changePin: () => { S.settings.pin = null; save(); A.parentGate(); },
    rename: () => modal(`<div class="center"><h2>Név módosítása</h2><input id="renIn" class="big-input" maxlength="16" value="${esc(S.name)}"><button class="btn primary big" data-act="renameOk">Mentés</button><button class="btn ghost" data-act="closeModal">Mégse</button></div>`),
    renameOk: () => { const v = document.getElementById('renIn').value.trim(); if (v) { S.name = v.slice(0, 16); save(); } closeModal(); R.parent(); },
    exportSave: () => {
      const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }); const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'tudas-sziget-mentes-' + today() + '.json'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    },
    importSave: () => { const f = document.getElementById('importFile'); f.onchange = () => { const file = f.files[0]; if (!file) return; const rd = new FileReader(); rd.onload = () => { try { const o = JSON.parse(rd.result); if (!o || typeof o !== 'object' || !('xp' in o)) throw 0; S = deepMerge(freshState(), o); save(); applyTheme(); toast('<span class="t-e">✅</span><div>Mentés betöltve!</div>'); R.parent(); } catch (e) { toast('<span class="t-e">❌</span><div>Hibás mentésfájl</div>'); } }; rd.readAsText(file); }; f.click(); },
    resetAsk: () => modal(`<div class="center"><div class="big-e">⚠️</div><h2>Minden haladás törlése?</h2><p>Csillagok, gyémántok, trófeák – minden elvész. Ez nem vonható vissza!</p><button class="btn danger big" data-act="resetDo">Igen, törlöm</button><button class="btn ghost" data-act="closeModal">Mégse</button></div>`),
    resetDo: () => { try { localStorage.removeItem(KEY); } catch (e) { } S = freshState(); applyTheme(); closeModal(); R.onboard({ step: 1 }); }
  };
  const CHANGE = {
    setAllOpen: el => { S.settings.allOpen = el.checked; save(); },
    setSound: el => { S.settings.sound = el.checked; save(); },
    setRead: el => { S.settings.autoRead = el.checked; save(); }
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
    if (el.tagName === 'INPUT') return; // checkboxok a change eseményen
    const f = A[el.dataset.act]; if (!f) return;
    if (el.dataset.act !== 'modalBg' && el.dataset.act !== 'gPut') e.preventDefault();
    f(el.dataset, el, e);
  });
  document.addEventListener('change', e => { const el = e.target; if (el.dataset && CHANGE[el.dataset.act]) CHANGE[el.dataset.act](el); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.id === 'nameIn') A.onboardName();
    if (e.key === 'Enter' && e.target.id === 'renIn') A.renameOk();
    if (Q && Q.locked && (e.key === 'Enter' || e.key === ' ') && e.target.id !== 'ansIn') { const b = document.getElementById('nextBtn'); if (b) { e.preventDefault(); b.click(); } }
    if (Q && !Q.locked && Q.cur && Q.cur.t === 'mc' && /^[1-5a-eA-E]$/.test(e.key) && e.target.tagName !== 'INPUT') { const i = /\d/.test(e.key) ? +e.key - 1 : 'abcde'.indexOf(e.key.toLowerCase()); if (i < Q.cur.opts.length) A.mc({ i }); }
  });

  function applyTheme() { document.body.className = 'theme-' + (S.theme || 'sky'); }

  /* ---------- Indulás ---------- */
  applyTheme();
  if (!SUBJ.length) { app.innerHTML = '<div class="content"><div class="bubble">Hoppá! Nem találom a tananyag-fájlokat (js/data). 😕</div></div>'; return; }
  if (!S.name) R.onboard({ step: 1 });
  else { updateStreak(); ensureDaily(); save(); go('home'); }
  window.__TS_DEBUG = {
    get S() { return S; }, get Q() { return Q; }, BADGES, SUBJ, startTopic, startBoss, startDaily,
    typeQuiz(t) { const items = []; SUBJ.forEach(s => s.topics.forEach(tp => (tp.questions || []).forEach(q => { if (q.t === t && validQ(q)) items.push(prepare(q, { sid: s.id, tid: tp.id })); }))); beginQuiz({ mode: 'review', title: 'teszt', items: shuffle(items).slice(0, 5) }); }
  };
})();
