/* ═══════════════════════════════════════════
   CV GENERATOR v3 — app.js
   Fix: PDF = Preview exactly. No compression.
   ═══════════════════════════════════════════ */
'use strict';

/* ── COLOR PRESETS — Full Palette ── */
const COLOR_GROUPS = [
  { label: 'Netral & Klasik', colors: [
    { hex: '#000000', name: 'Hitam Pekat' },
    { hex: '#1a1a1a', name: 'Hitam Lunak' },
    { hex: '#2d2d2d', name: 'Charcoal' },
    { hex: '#4b5563', name: 'Abu Gelap' },
    { hex: '#6b7280', name: 'Abu Medium' },
    { hex: '#9ca3af', name: 'Abu Terang' },
  ]},
  { label: 'Biru & Navy', colors: [
    { hex: '#0f172a', name: 'Midnight' },
    { hex: '#1e3a5f', name: 'Navy' },
    { hex: '#1e40af', name: 'Biru Royal' },
    { hex: '#1d4ed8', name: 'Biru Kobalt' },
    { hex: '#2563eb', name: 'Biru Cerah' },
    { hex: '#3b82f6', name: 'Biru Sky' },
    { hex: '#0ea5e9', name: 'Biru Langit' },
  ]},
  { label: 'Hijau & Teal', colors: [
    { hex: '#064e3b', name: 'Hijau Hutan' },
    { hex: '#065f46', name: 'Hijau Tua' },
    { hex: '#1a472a', name: 'Hijau Zamrud' },
    { hex: '#166534', name: 'Hijau Gelap' },
    { hex: '#15803d', name: 'Hijau' },
    { hex: '#0d9488', name: 'Teal' },
    { hex: '#0e7490', name: 'Teal Biru' },
    { hex: '#0f766e', name: 'Teal Gelap' },
  ]},
  { label: 'Merah & Pink', colors: [
    { hex: '#7f1d1d', name: 'Merah Tua' },
    { hex: '#991b1b', name: 'Merah Gelap' },
    { hex: '#6b2737', name: 'Merah Wine' },
    { hex: '#be123c', name: 'Merah Rose' },
    { hex: '#9f1239', name: 'Crimson' },
    { hex: '#881337', name: 'Burgundy' },
  ]},
  { label: 'Ungu & Violet', colors: [
    { hex: '#2e1065', name: 'Ungu Gelap' },
    { hex: '#3b0764', name: 'Violet Tua' },
    { hex: '#4a1d96', name: 'Ungu Tua' },
    { hex: '#6d28d9', name: 'Ungu' },
    { hex: '#7c3aed', name: 'Violet' },
    { hex: '#6366f1', name: 'Indigo' },
  ]},
  { label: 'Coklat & Amber', colors: [
    { hex: '#1c0a00', name: 'Coklat Hitam' },
    { hex: '#431407', name: 'Coklat Tua' },
    { hex: '#78350f', name: 'Coklat Kayu' },
    { hex: '#92400e', name: 'Coklat Amber' },
    { hex: '#b45309', name: 'Amber' },
    { hex: '#a16207', name: 'Kuning Tua' },
    { hex: '#8b6914', name: 'Emas' },
  ]},
];

/* ── STATE ── */
const S = {
  step: 1,
  photo: null,
  accentColor: '#000000',
  hard: [], soft: [], lang: [],
  eduN: 0, expN: 0, certN: 0,
};

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  buildColorPicker();
  addEdu(); addExp(); addCert();
  window.addEventListener('resize', rescale);
});

/* ── NAVIGATION ── */
function goStep(n) {
  document.getElementById(`step-${S.step}`).classList.remove('active');
  document.querySelectorAll('.sbtn').forEach(b => b.classList.remove('active'));
  S.step = n;
  document.getElementById(`step-${n}`).classList.add('active');
  document.querySelector(`.sbtn[data-step="${n}"]`).classList.add('active');
  if (n === 5) { buildPreview(); setTimeout(rescale, 80); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function nextStep() {
  if (S.step >= 5) return;
  document.querySelector(`.sbtn[data-step="${S.step}"]`).classList.add('done');
  goStep(S.step + 1);
}
function prevStep() { if (S.step > 1) goStep(S.step - 1); }
function updateProg() {}

/* ── COLOR PICKER ── */
function buildColorPicker() {
  const wrap = document.getElementById('color-presets');
  COLOR_GROUPS.forEach(group => {
    const grpLabel = document.createElement('div');
    grpLabel.className = 'cp-group-label';
    grpLabel.textContent = group.label;
    wrap.appendChild(grpLabel);

    const row = document.createElement('div');
    row.className = 'cp-row';
    group.colors.forEach((c, i) => {
      const sw = document.createElement('div');
      sw.className = 'color-swatch' + (c.hex === S.accentColor ? ' active' : '');
      sw.style.background = c.hex;
      sw.title = c.name;
      sw.dataset.hex = c.hex;
      sw.addEventListener('click', () => setAccent(c.hex, sw));
      row.appendChild(sw);
    });
    wrap.appendChild(row);
  });
  // first swatch active by default
  const first = wrap.querySelector('.color-swatch');
  if (first) first.classList.add('active');

  document.getElementById('color-native').addEventListener('input', e => {
    setAccent(e.target.value, null);
    document.getElementById('color-hex').value = e.target.value;
  });
  document.getElementById('color-hex').addEventListener('change', e => {
    const v = e.target.value.trim();
    const full = v.startsWith('#') ? v : '#' + v;
    if (/^#[0-9a-fA-F]{6}$/.test(full)) {
      setAccent(full, null);
      document.getElementById('color-native').value = full;
      document.getElementById('color-hex').value = full;
    }
  });
}

function setAccent(hex, activeSwatch) {
  S.accentColor = hex;
  // Update swatches
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  if (activeSwatch) activeSwatch.classList.add('active');
  // Update cv-frame CSS variable live if on step 5
  const frame = document.getElementById('cv-frame');
  if (frame) frame.style.setProperty('--cv-accent', hex);
  // Update preview dot in picker
  const dot = document.getElementById('accent-preview-dot');
  if (dot) dot.style.background = hex;
}

/* ── PHOTO ── */
function triggerPhoto() { document.getElementById('photo-file').click(); }
function handlePhoto(e) {
  const f = e.target.files[0];
  if (!f) return;
  if (f.size > 5 * 1024 * 1024) { toast('⚠ Foto max 5MB', 'err'); return; }
  if (!f.type.startsWith('image/')) { toast('⚠ File harus gambar', 'err'); return; }
  const r = new FileReader();
  r.onload = ev => {
    S.photo = ev.target.result;
    const drop = document.getElementById('photo-drop');
    drop.classList.add('filled');
    drop.innerHTML = `<img src="${S.photo}" alt="foto"/><div class="dov"><span>📷</span>Ganti</div>`;
    const fn = document.getElementById('pfname');
    fn.textContent = '✓ ' + f.name; fn.classList.add('show');
    toast('✓ Foto berhasil diupload!', 'ok');
  };
  r.onerror = () => toast('✗ Gagal baca file', 'err');
  r.readAsDataURL(f);
}

/* ── DYNAMIC CARDS ── */
function addEdu() {
  S.eduN++;
  const n = S.eduN;
  appendCard('edu-list', `edu-${n}`, `Pendidikan #${n}`, `rmCard('edu-${n}')`, `
    <div class="fgrid">
      <div class="fg s2"><label class="flbl">Nama Institusi <span class="req">*</span></label>
        <input class="fi" name="ei" placeholder="Universitas Indonesia / SMA Negeri 1..."/></div>
      <div class="fg"><label class="flbl">Jurusan / Program Studi</label>
        <input class="fi" name="ej" placeholder="Teknik Informatika"/></div>
      <div class="fg"><label class="flbl">Gelar / Jenjang</label>
        <input class="fi" name="eg" placeholder="S1 / D3 / SMA / SMK"/></div>
      <div class="fg"><label class="flbl">Tahun Mulai</label>
        <input class="fi" name="es" placeholder="2019" maxlength="4"/></div>
      <div class="fg"><label class="flbl">Tahun Selesai</label>
        <input class="fi" name="ee" placeholder="2023 / Sekarang"/></div>
      <div class="fg s2"><label class="flbl">IPK / Nilai (opsional)</label>
        <input class="fi" name="eipk" placeholder="3.85 / 4.00"/></div>
    </div>`);
}
function addExp() {
  S.expN++;
  const n = S.expN;
  appendCard('exp-list', `exp-${n}`, `Pengalaman #${n}`, `rmCard('exp-${n}')`, `
    <div class="fgrid">
      <div class="fg"><label class="flbl">Perusahaan / Organisasi <span class="req">*</span></label>
        <input class="fi" name="eco" placeholder="PT. Contoh Jaya / BEM Universitas"/></div>
      <div class="fg"><label class="flbl">Posisi / Jabatan <span class="req">*</span></label>
        <input class="fi" name="epo" placeholder="Staff Administrasi"/></div>
      <div class="fg"><label class="flbl">Jenis</label>
        <select class="fsel" name="ety">
          <option value="">— Pilih —</option>
          <option>Full-time</option><option>Part-time</option>
          <option>Magang / Internship</option><option>Freelance</option>
          <option>Organisasi</option><option>Volunteer</option>
        </select></div>
      <div class="fg"><label class="flbl">Lokasi</label>
        <input class="fi" name="elo" placeholder="Jakarta / Remote"/></div>
      <div class="fg"><label class="flbl">Periode Mulai</label>
        <input class="fi" name="esa" placeholder="Juli 2022"/></div>
      <div class="fg"><label class="flbl">Periode Selesai</label>
        <input class="fi" name="een" placeholder="Desember 2022 / Sekarang"/></div>
      <div class="fg s2"><label class="flbl">Deskripsi & Pencapaian</label>
        <textarea class="fta" name="ede" placeholder="• Mengelola arsip dokumen perusahaan secara rapi&#10;• Berhasil meningkatkan efisiensi 30%&#10;• Menyusun laporan harian dan bulanan..."></textarea></div>
    </div>`);
}
function addCert() {
  S.certN++;
  const n = S.certN;
  appendCard('cert-list', `cert-${n}`, `Sertifikat #${n}`, `rmCard('cert-${n}')`, `
    <div class="fgrid">
      <div class="fg s2"><label class="flbl">Nama Sertifikat / Penghargaan <span class="req">*</span></label>
        <input class="fi" name="cn" placeholder="Software Administrasi Perkantoran"/></div>
      <div class="fg"><label class="flbl">Penerbit / Lembaga</label>
        <input class="fi" name="ci" placeholder="Google / Coursera / Diknas"/></div>
      <div class="fg"><label class="flbl">Tahun</label>
        <input class="fi" name="cy" placeholder="2024" maxlength="4"/></div>
    </div>`);
}
function appendCard(listId, id, badge, rmFn, inner) {
  const list = document.getElementById(listId);
  const card = document.createElement('div');
  card.className = 'dcard'; card.id = id;
  card.innerHTML = `<div class="dcard-head"><span class="dcard-badge">${badge}</span><button class="btn-rm" onclick="${rmFn}">Hapus</button></div>${inner}`;
  list.appendChild(card);
}
function rmCard(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.cssText = 'opacity:0;transform:translateY(-5px);transition:all .18s';
  setTimeout(() => el.remove(), 200);
}

/* ── SKILLS ── */
function addSkill(type) {
  const inp = document.getElementById(`${type}-inp`);
  const val = inp.value.trim();
  if (!val) return;
  const arr = type === 'hard' ? S.hard : type === 'soft' ? S.soft : S.lang;
  if (arr.includes(val)) { toast('Skill sudah ada!', 'err'); inp.value = ''; return; }
  arr.push(val);
  const box = document.getElementById(`${type}-chips`);
  const chip = document.createElement('div');
  chip.className = 'schip'; chip.dataset.v = val;
  chip.innerHTML = `${val} <button onclick="rmSkill(this,'${type}','${val.replace(/'/g,"\\'")}')">×</button>`;
  box.appendChild(chip);
  inp.value = ''; inp.focus();
}
function rmSkill(btn, type, val) {
  const arr = type === 'hard' ? S.hard : type === 'soft' ? S.soft : S.lang;
  const i = arr.indexOf(val); if (i > -1) arr.splice(i, 1);
  btn.closest('.schip').remove();
}

/* ── COLLECT ── */
function gv(id) { return (document.getElementById(id)?.value || '').trim(); }
function collect() {
  const edus = [], exps = [], certs = [];
  document.querySelectorAll('#edu-list .dcard').forEach(c => edus.push({
    inst: c.querySelector('[name="ei"]')?.value?.trim()||'',
    jur:  c.querySelector('[name="ej"]')?.value?.trim()||'',
    gel:  c.querySelector('[name="eg"]')?.value?.trim()||'',
    s:    c.querySelector('[name="es"]')?.value?.trim()||'',
    e:    c.querySelector('[name="ee"]')?.value?.trim()||'',
    ipk:  c.querySelector('[name="eipk"]')?.value?.trim()||'',
  }));
  document.querySelectorAll('#exp-list .dcard').forEach(c => exps.push({
    co:   c.querySelector('[name="eco"]')?.value?.trim()||'',
    pos:  c.querySelector('[name="epo"]')?.value?.trim()||'',
    type: c.querySelector('[name="ety"]')?.value?.trim()||'',
    loc:  c.querySelector('[name="elo"]')?.value?.trim()||'',
    s:    c.querySelector('[name="esa"]')?.value?.trim()||'',
    e:    c.querySelector('[name="een"]')?.value?.trim()||'',
    desc: c.querySelector('[name="ede"]')?.value?.trim()||'',
  }));
  document.querySelectorAll('#cert-list .dcard').forEach(c => certs.push({
    nama: c.querySelector('[name="cn"]')?.value?.trim()||'',
    iss:  c.querySelector('[name="ci"]')?.value?.trim()||'',
    yr:   c.querySelector('[name="cy"]')?.value?.trim()||'',
  }));
  return {
    photo: S.photo, accent: S.accentColor,
    nama: gv('nama'), posisi: gv('posisi'),
    ttl: gv('ttl'), email: gv('email'), phone: gv('phone'),
    alamat: gv('alamat'), linkedin: gv('linkedin'), website: gv('website'),
    ringkasan: gv('ringkasan'), edus, exps, certs,
    hard: [...S.hard], soft: [...S.soft], lang: [...S.lang],
    hobi: gv('hobi'),
  };
}

/* ── BUILD CV HTML — matches reference layout ── */
function buildCV(d) {
  const ac = d.accent || '#000000';
  // Compute a light text color for left sidebar
  // Parse hex to determine if light or dark, then decide text color
  const r = parseInt(ac.slice(1,3),16), g = parseInt(ac.slice(3,5),16), b = parseInt(ac.slice(5,7),16);
  const luma = 0.299*r + 0.587*g + 0.114*b;
  const sideText = luma > 140 ? '#1a1a1a' : '#ffffff';
  const sideTextSub = luma > 140 ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.72)';
  const sideDivider = luma > 140 ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)';

  const name = d.nama || 'NAMA LENGKAP';
  const role = d.posisi || 'Posisi / Jabatan';

  // Photo — circle with white border
  const photoHTML = d.photo
    ? `<div class="cv-photo-wrap"><img src="${d.photo}" alt="foto" crossorigin="anonymous"/></div>`
    : `<div class="cv-photo-wrap cv-photo-ph"><span>👤</span></div>`;

  // LEFT SIDEBAR: Kontak
  const contacts = [
    d.phone    && { svg: `<svg width="11" height="11" viewBox="0 0 24 24" fill="${sideText}"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>`, text: d.phone },
    d.email    && { svg: `<svg width="11" height="11" viewBox="0 0 24 24" fill="${sideText}"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`, text: d.email },
    d.alamat   && { svg: `<svg width="11" height="11" viewBox="0 0 24 24" fill="${sideText}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`, text: d.alamat },
    d.linkedin && { svg: `<svg width="11" height="11" viewBox="0 0 24 24" fill="${sideText}"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`, text: d.linkedin },
    d.website  && { svg: `<svg width="11" height="11" viewBox="0 0 24 24" fill="${sideText}"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>`, text: d.website },
    d.ttl      && { svg: `<svg width="11" height="11" viewBox="0 0 24 24" fill="${sideText}"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>`, text: d.ttl },
  ].filter(Boolean);

  const contactHTML = contacts.map(c => `
    <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:7px">
      <span style="flex-shrink:0;margin-top:1px;opacity:0.85">${c.svg}</span>
      <span style="font-size:9.5px;color:${sideTextSub};line-height:1.45;word-break:break-all">${c.text}</span>
    </div>`).join('');

  // Education
  const eduHTML = d.edus.filter(e=>e.inst).map(e => `
    <div style="margin-bottom:10px">
      <div style="font-size:10px;font-weight:700;color:${sideText};line-height:1.3">${e.inst}</div>
      ${(e.jur||e.gel) ? `<div style="font-size:9.5px;color:${sideTextSub};margin-top:2px">${[e.jur,e.gel].filter(Boolean).join(' · ')}</div>` : ''}
      ${(e.s||e.e) ? `<div style="font-size:9px;color:${sideTextSub};margin-top:1px">${[e.s,e.e].filter(Boolean).join(' – ')}</div>` : ''}
      ${e.ipk ? `<div style="font-size:9px;color:${sideTextSub}">IPK: ${e.ipk}</div>` : ''}
    </div>`).join('') || `<div style="font-size:9.5px;color:${sideTextSub};font-style:italic">Belum diisi</div>`;

  // Skills
  const allSkills = [...d.hard, ...d.soft];
  const skillsHTML = allSkills.length
    ? allSkills.map(s => `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
        <span style="width:5px;height:5px;border-radius:50%;background:${sideText};flex-shrink:0;opacity:0.7"></span>
        <span style="font-size:9.5px;color:${sideTextSub}">${s}</span>
      </div>`).join('')
    : `<div style="font-size:9.5px;color:${sideTextSub};font-style:italic">Belum diisi</div>`;

  // Lang
  const langHTML = d.lang.length
    ? d.lang.map(l=>`<div style="display:flex;align-items:center;gap:6px;margin-bottom:5px"><span style="width:5px;height:5px;border-radius:50%;background:${sideText};flex-shrink:0;opacity:0.7"></span><span style="font-size:9.5px;color:${sideTextSub}">${l}</span></div>`).join('')
    : '';

  // LEFT SIDEBAR section header
  const sideSecTitle = (t) => `
    <div style="font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
                color:${sideText};padding-bottom:5px;margin-bottom:10px;
                border-bottom:1px solid ${sideDivider}">${t}</div>`;

  // RIGHT MAIN: Experience
  const expHTML = d.exps.filter(e=>e.co).map(e => {
    const period = [e.s, e.e].filter(Boolean).join(' – ');
    const subline = [e.co, e.type, e.loc].filter(Boolean).join(' · ');
    let bullets = '';
    if (e.desc) {
      const lines = e.desc.split('\n').map(l=>l.trim().replace(/^[-•·]\s*/,'')).filter(Boolean);
      bullets = `<ul style="padding-left:0;list-style:none;margin-top:5px">${
        lines.map(b=>`<li style="padding-left:13px;position:relative;margin-bottom:3px;font-size:10.5px;color:#444;line-height:1.55">
          <span style="position:absolute;left:0;color:${ac};font-size:12px;line-height:1.2">•</span>${b}</li>`).join('')
      }</ul>`;
    }
    return `
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">
          <div style="font-size:11.5px;font-weight:700;color:#111">${e.pos}</div>
          ${period ? `<div style="font-size:9.5px;color:#999;white-space:nowrap;font-style:italic">${period}</div>` : ''}
        </div>
        ${subline ? `<div style="font-size:10px;color:${ac};font-weight:600;margin-top:1px">${subline}</div>` : ''}
        ${bullets}
      </div>`;
  }).join('') || '<div style="font-size:10px;color:#aaa;font-style:italic">Belum diisi</div>';

  // Certs
  const certHTML = d.certs.filter(c=>c.nama).map(c => `
    <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:7px">
      <span style="width:5px;height:5px;border-radius:50%;background:${ac};flex-shrink:0;margin-top:5px"></span>
      <div>
        <div style="font-size:10.5px;font-weight:600;color:#222">${c.nama}</div>
        ${(c.iss||c.yr)?`<div style="font-size:9.5px;color:#888">${[c.iss,c.yr].filter(Boolean).join(' · ')}</div>`:''}
      </div>
    </div>`).join('');

  // RIGHT section header
  const mainSecTitle = (t) => `
    <div style="font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
                color:#1a1a1a;padding-bottom:5px;margin-bottom:12px;
                border-bottom:2px solid ${ac}">${t}</div>`;

  return `
  <div style="width:794px;min-height:1123px;background:#fff;font-family:'Inter',sans-serif;font-size:12px;line-height:1.55;color:#1a1a1a;display:flex;flex-direction:column">

    <!-- ── HEADER ── -->
    <div style="display:flex;align-items:flex-end;padding:36px 36px 0 0">
      <!-- Left sidebar top: photo + name block -->
      <div style="width:218px;flex-shrink:0;background:${ac};padding:30px 22px 22px;display:flex;flex-direction:column;align-items:center;gap:14px">
        ${d.photo
          ? `<div style="width:100px;height:100px;border-radius:50%;overflow:hidden;border:3px solid ${luma>140?'rgba(0,0,0,0.2)':'rgba(255,255,255,0.4)'}">
               <img src="${d.photo}" style="width:100%;height:100%;object-fit:cover;display:block" crossorigin="anonymous"/>
             </div>`
          : `<div style="width:100px;height:100px;border-radius:50%;background:${luma>140?'rgba(0,0,0,0.1)':'rgba(255,255,255,0.15)'};border:3px solid ${luma>140?'rgba(0,0,0,0.2)':'rgba(255,255,255,0.3)'};display:flex;align-items:center;justify-content:center;font-size:36px">👤</div>`
        }
      </div>
      <!-- Right header: big name -->
      <div style="flex:1;padding:0 0 22px 30px">
        <div style="font-size:44px;font-weight:800;color:#0a0a0a;letter-spacing:-1.5px;line-height:1.0;text-transform:uppercase;word-break:break-word">${name}</div>
        <div style="font-size:10.5px;font-weight:600;color:#666;letter-spacing:3px;text-transform:uppercase;margin-top:8px">${role}</div>
      </div>
    </div>

    <!-- ── ACCENT BAR ── -->
    <div style="height:3px;background:${ac};margin-left:218px"></div>

    <!-- ── BODY ── -->
    <div style="display:flex;flex:1">

      <!-- LEFT SIDEBAR -->
      <div style="width:218px;flex-shrink:0;background:${ac};padding:22px;display:flex;flex-direction:column;gap:18px">

        ${contactHTML ? `<div>
          ${sideSecTitle('Kontak')}
          ${contactHTML}
        </div>` : ''}

        <div>
          ${sideSecTitle('Pendidikan')}
          ${eduHTML}
        </div>

        ${allSkills.length ? `<div>
          ${sideSecTitle('Kemampuan')}
          ${skillsHTML}
        </div>` : ''}

        ${langHTML ? `<div>
          ${sideSecTitle('Bahasa')}
          ${langHTML}
        </div>` : ''}

        ${d.hobi ? `<div>
          ${sideSecTitle('Hobi')}
          <div style="font-size:9.5px;color:${sideTextSub};line-height:1.6">${d.hobi}</div>
        </div>` : ''}

      </div>

      <!-- RIGHT MAIN -->
      <div style="flex:1;padding:26px 30px;display:flex;flex-direction:column;gap:0">

        ${d.ringkasan ? `
        <div style="margin-bottom:20px">
          ${mainSecTitle('Profil')}
          <div style="font-size:10.5px;color:#444;line-height:1.75;text-align:justify">${d.ringkasan}</div>
        </div>` : ''}

        <div style="margin-bottom:20px">
          ${mainSecTitle('Pengalaman')}
          ${expHTML}
        </div>

        ${certHTML ? `
        <div>
          ${mainSecTitle('Kursus & Sertifikat')}
          ${certHTML}
        </div>` : ''}

      </div>
    </div>
  </div>`;
}

/* ── PREVIEW ── */
function buildPreview() {
  const d = collect();
  const frame = document.getElementById('cv-frame');
  frame.innerHTML = buildCV(d);
  frame.style.setProperty('--cv-accent', d.accent);
}

/* ── SCALE FIX ──
   Preview: scale cv-frame to fit container.
   PDF: reset scale, capture, restore. */
function rescale() {
  const frame = document.getElementById('cv-frame');
  const wrap  = document.querySelector('.cv-scale-wrap');
  if (!frame || !wrap) return;
  const avail = wrap.parentElement.clientWidth - 2;
  const scale = Math.min(1, avail / 794);
  frame.style.transform = `scale(${scale})`;
  // Adjust wrapper height so it doesn't leave gap
  const naturalH = frame.scrollHeight || 1123;
  wrap.style.height = (naturalH * scale) + 'px';
}

/* ── PDF DOWNLOAD ── */
function downloadPDF() {
  const d    = collect();
  const nama = d.nama || 'CV';
  const frame = document.getElementById('cv-frame');
  const wrap  = document.querySelector('.cv-scale-wrap');
  const btn   = document.getElementById('btn-dl');

  btn.classList.add('busy');
  btn.textContent = '⏳ Memproses...';
  toast('⏳ Membuat PDF...', '');

  // Step 1: Reset scale so html2canvas captures at TRUE 794px
  frame.style.transform = 'none';
  // Temporarily expand wrap so nothing is clipped
  const prevWrapH = wrap.style.height;
  wrap.style.height = 'auto';
  wrap.style.overflow = 'visible';

  // Use A4 dimensions: 794 × 1123 px @96dpi
  const opt = {
    margin: 0,
    filename: `CV_${nama.replace(/\s+/g, '_')}.pdf`,
    image:   { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,              // 2x = sharper text
      useCORS: true,
      allowTaint: true,
      letterRendering: true,
      width: 794,
      windowWidth: 794,
      scrollX: 0,
      scrollY: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',          // 210 × 297 mm — html2pdf handles scaling
      orientation: 'portrait',
    },
  };

  html2pdf()
    .set(opt)
    .from(frame)
    .save()
    .then(() => {
      // Restore scale
      rescale();
      wrap.style.overflow = 'hidden';
      toast(`✓ "${nama}" berhasil diunduh!`, 'ok');
      btn.classList.remove('busy');
      btn.textContent = '⬇ Download PDF';
    })
    .catch(err => {
      rescale();
      wrap.style.overflow = 'hidden';
      console.error(err);
      toast('✗ Gagal membuat PDF', 'err');
      btn.classList.remove('busy');
      btn.textContent = '⬇ Download PDF';
    });
}

/* ── SEND TO GAS ── */
async function sendToGAS() {
  const url = document.getElementById('gas-url').value.trim();
  const msg = document.getElementById('gas-msg');
  if (!url) { toast('⚠ Isi URL Google Apps Script dulu!', 'err'); return; }
  msg.className = 'gas-msg loading'; msg.textContent = '⏳ Mengirim...';
  const d = collect();
  const payload = { ...d, photo: null, timestamp: new Date().toISOString() };
  try {
    await fetch(url, { method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain'}, body: JSON.stringify(payload) });
    msg.className = 'gas-msg ok'; msg.textContent = '✓ Tersimpan ke Google Sheets!';
    toast('✓ Data tersimpan!', 'ok');
  } catch(e) {
    msg.className = 'gas-msg fail'; msg.textContent = '✗ Gagal. Cek URL & setting GAS.';
    toast('✗ Gagal kirim', 'err');
  }
}

function resetForm() {
  if (!confirm('Buat CV baru? Semua data akan dihapus.')) return;
  location.reload();
}

function toast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = `toast show ${type}`;
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 3500);
}
