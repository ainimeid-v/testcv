/* ═══════════════════════════════════════════
   CV GENERATOR v3 — app.js
   Fix: PDF = Preview exactly. No compression.
   ═══════════════════════════════════════════ */
'use strict';

/* ── COLOR PRESETS ── */
const COLOR_PRESETS = [
  { hex: '#000000', name: 'Hitam' },
  { hex: '#1e3a5f', name: 'Navy' },
  { hex: '#1a472a', name: 'Hijau Tua' },
  { hex: '#6b2737', name: 'Merah Tua' },
  { hex: '#4a1d96', name: 'Ungu' },
  { hex: '#92400e', name: 'Coklat' },
  { hex: '#0e7490', name: 'Teal' },
  { hex: '#1d4ed8', name: 'Biru' },
  { hex: '#374151', name: 'Abu-abu' },
  { hex: '#b45309', name: 'Amber' },
];

/* ── JURUSAN DATA ── */
const JURUSAN = [
  { cat: '💻 IT & Teknologi', items: ['Teknik Informatika','Ilmu Komputer','Sistem Informasi','Teknik Komputer','Keamanan Siber','Data Science','Kecerdasan Buatan / AI','Software Engineering','Rekayasa Perangkat Lunak','Teknologi Informasi'] },
  { cat: '⚙️ Teknik & Engineering', items: ['Teknik Sipil','Teknik Mesin','Teknik Elektro','Teknik Kimia','Teknik Industri','Teknik Lingkungan','Teknik Pertambangan','Teknik Perminyakan','Teknik Biomedis','Teknik Penerbangan','Teknik Material','Teknik Geodesi'] },
  { cat: '📊 Bisnis & Ekonomi', items: ['Manajemen Bisnis','Akuntansi','Ekonomi','Ekonomi Pembangunan','Manajemen Keuangan','Manajemen Pemasaran','Manajemen SDM','Bisnis Internasional','Perbankan & Keuangan','Kewirausahaan','Administrasi Bisnis'] },
  { cat: '⚕️ Kesehatan & Medis', items: ['Kedokteran Umum','Kedokteran Gigi','Keperawatan','Farmasi','Kesehatan Masyarakat','Gizi & Dietisien','Fisioterapi','Kebidanan','Analis Kesehatan','Radiologi','Rekam Medis'] },
  { cat: '🎨 Desain & Kreatif', items: ['Desain Komunikasi Visual','Desain Grafis','Desain Interior','Desain Produk','Seni Rupa','Arsitektur','Animasi & Film','Fotografi','Mode & Tekstil','UI/UX Design'] },
  { cat: '⚖️ Hukum, Sosial & Pendidikan', items: ['Hukum','Hukum Bisnis','Ilmu Pemerintahan','Hubungan Internasional','Ilmu Komunikasi','Psikologi','Sosiologi','Pendidikan','Sastra Indonesia','Sastra Inggris','Jurnalistik','Administrasi Publik'] },
  { cat: '🌾 Pertanian & Lingkungan', items: ['Agribisnis','Agroteknologi','Kehutanan','Ilmu Kelautan','Perikanan','Teknik Pertanian','Ilmu Tanah','Teknologi Pangan'] },
  { cat: '🎭 Seni & Budaya', items: ['Seni Musik','Seni Tari','Seni Teater','Film & Televisi','Antropologi','Arkeologi','Sejarah','Filsafat'] },
];

/* ── STATE ── */
const S = {
  step: 1,
  photo: null,
  jurusan: null,
  accentColor: '#000000',
  hard: [], soft: [], lang: [],
  eduN: 0, expN: 0, certN: 0,
};

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  buildColorPicker();
  buildJurPicker();
  addEdu(); addExp(); addCert();
  updateProg();
  window.addEventListener('resize', rescale);
});

/* ── NAVIGATION ── */
function goStep(n) {
  document.getElementById(`step-${S.step}`).classList.remove('active');
  document.querySelectorAll('.sbtn').forEach(b => b.classList.remove('active'));
  S.step = n;
  document.getElementById(`step-${n}`).classList.add('active');
  document.querySelector(`.sbtn[data-step="${n}"]`).classList.add('active');
  updateProg();
  if (n === 5) { buildPreview(); setTimeout(rescale, 80); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function nextStep() {
  if (S.step >= 5) return;
  document.querySelector(`.sbtn[data-step="${S.step}"]`).classList.add('done');
  goStep(S.step + 1);
}
function prevStep() { if (S.step > 1) goStep(S.step - 1); }
function updateProg() {
  const p = (S.step / 5) * 100;
  document.getElementById('prog-bar').style.width = p + '%';
  document.getElementById('prog-pct').textContent = Math.round(p) + '%';
}

/* ── COLOR PICKER ── */
function buildColorPicker() {
  const wrap = document.getElementById('color-presets');
  COLOR_PRESETS.forEach(c => {
    const sw = document.createElement('div');
    sw.className = 'color-swatch' + (c.hex === S.accentColor ? ' active' : '');
    sw.style.background = c.hex;
    sw.title = c.name;
    sw.dataset.hex = c.hex;
    sw.addEventListener('click', () => setAccent(c.hex, sw));
    wrap.appendChild(sw);
  });
  // default: first swatch active
  if (wrap.firstChild) wrap.firstChild.classList.add('active');

  // Custom color input
  document.getElementById('color-native').addEventListener('input', e => {
    setAccent(e.target.value, null);
    document.getElementById('color-hex').value = e.target.value;
  });
  document.getElementById('color-hex').addEventListener('change', e => {
    const v = e.target.value;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) {
      setAccent(v, null);
      document.getElementById('color-native').value = v;
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

/* ── JURUSAN PICKER ── */
function buildJurPicker() {
  const scroll = document.getElementById('jur-scroll');
  scroll.innerHTML = '';
  JURUSAN.forEach(cat => {
    const wrap = document.createElement('div');
    wrap.dataset.c = cat.cat;
    const lbl = document.createElement('span');
    lbl.className = 'jur-cat'; lbl.textContent = cat.cat;
    wrap.appendChild(lbl);
    const opts = document.createElement('div');
    opts.className = 'jur-opts';
    cat.items.forEach(val => {
      const chip = document.createElement('div');
      chip.className = 'jur-chip';
      chip.dataset.v = val;
      chip.textContent = val;
      chip.addEventListener('click', () => selJur(chip, val));
      opts.appendChild(chip);
    });
    wrap.appendChild(opts);
    scroll.appendChild(wrap);
  });
}
function selJur(chip, val) {
  document.querySelectorAll('.jur-chip').forEach(c => c.classList.remove('sel'));
  chip.classList.add('sel');
  S.jurusan = val;
  const b = document.getElementById('jur-badge');
  b.textContent = val; b.classList.add('show');
  b.style.cssText = `border-color:${S.accentColor}55;color:${S.accentColor};background:${S.accentColor}18;`;
  document.getElementById('jur-inp').value = '';
  filterJur('');
}
function filterJur(q) {
  const low = q.toLowerCase(); let any = false;
  document.querySelectorAll('#jur-scroll > div').forEach(catDiv => {
    const chips = catDiv.querySelectorAll('.jur-chip'); let has = false;
    chips.forEach(c => { const m = !low || c.dataset.v.toLowerCase().includes(low); c.style.display = m ? '' : 'none'; if (m) has = true; });
    catDiv.style.display = has ? '' : 'none'; if (has) any = true;
  });
  document.getElementById('jur-empty').classList.toggle('show', !any);
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
    nama: gv('nama'), posisi: gv('posisi'), jurusan: S.jurusan,
    ttl: gv('ttl'), email: gv('email'), phone: gv('phone'),
    alamat: gv('alamat'), linkedin: gv('linkedin'), website: gv('website'),
    ringkasan: gv('ringkasan'), edus, exps, certs,
    hard: [...S.hard], soft: [...S.soft], lang: [...S.lang],
    hobi: gv('hobi'),
  };
}

/* ── BUILD CV HTML (reference-style layout) ── */
function buildCV(d) {
  const ac = d.accent || '#000000';
  const name = d.nama || 'NAMA LENGKAP';
  const role = d.posisi || (d.jurusan || 'POSISI / JABATAN');

  // Photo
  const photoHTML = d.photo
    ? `<div class="cv-photo-circle"><img src="${d.photo}" alt="foto" crossorigin="anonymous"/></div>`
    : `<div class="cv-photo-ph">👤</div>`;

  // Contacts with icon circles
  const contactIcons = { email:'✉', phone:'📞', alamat:'📍', linkedin:'in', website:'🌐' };
  const contacts = [
    d.phone    && { icon:'☎', text: d.phone },
    d.website  && { icon:'⊕', text: d.website },
    d.email    && { icon:'✉', text: d.email },
    d.alamat   && { icon:'⌂', text: d.alamat },
    d.linkedin && { icon:'in', text: d.linkedin },
    d.ttl      && { icon:'♦', text: d.ttl },
  ].filter(Boolean);

  const contactHTML = contacts.map(c => `
    <div class="cv-contact-item">
      <div class="cv-contact-icon">${c.icon}</div>
      <span>${c.text}</span>
    </div>`).join('');

  // Education
  const eduHTML = d.edus.filter(e=>e.inst).map(e => `
    <div class="cv-edu-item">
      <div class="cv-edu-inst">${e.inst}${(e.s||e.e) ? ` <span class="cv-edu-year">| ${[e.s,e.e].filter(Boolean).join('–')}</span>` : ''}</div>
      ${(e.jur||e.gel) ? `<div class="cv-edu-prog">${[e.jur,e.gel].filter(Boolean).join(', ')}</div>` : ''}
      ${e.ipk ? `<div class="cv-edu-prog">IPK: ${e.ipk}</div>` : ''}
    </div>`).join('') || '<div style="font-size:10px;color:#aaa;font-style:italic">Belum diisi</div>';

  // Skills (left column — semua skill jadi bullet list)
  const allSkillsLeft = [...d.hard, ...d.soft];
  const skillsHTML = allSkillsLeft.length
    ? allSkillsLeft.map(s => `<div class="cv-skill-item">${s}</div>`).join('')
    : '<div style="font-size:10px;color:#aaa;font-style:italic">Belum diisi</div>';

  // Experience
  const expHTML = d.exps.filter(e=>e.co).map(e => {
    const period = [e.s, e.e].filter(Boolean).join(' – ');
    const meta   = [e.co, e.type, e.loc].filter(Boolean).join(' · ');
    // Parse desc as bullet points
    let descHTML = '';
    if (e.desc) {
      const lines = e.desc.split('\n').map(l => l.trim()).filter(Boolean);
      const bullets = lines.map(l => l.replace(/^[-•·]\s*/, ''));
      descHTML = `<div class="cv-exp-desc"><ul>${bullets.map(b=>`<li>${b}</li>`).join('')}</ul></div>`;
    }
    return `
      <div class="cv-exp-item">
        <div class="cv-exp-header">
          <div class="cv-exp-title">${e.pos} – ${meta}${period ? ` (${period})` : ''}</div>
        </div>
        ${descHTML}
      </div>`;
  }).join('') || '<div style="font-size:10px;color:#aaa;font-style:italic">Belum diisi</div>';

  // Certs / Kursus
  const certHTML = d.certs.filter(c=>c.nama).map(c => `
    <div class="cv-cert-item">
      <span>${c.nama}${c.iss||c.yr ? ` <span class="cv-cert-sub">– ${[c.iss,c.yr].filter(Boolean).join(', ')}</span>` : ''}</span>
    </div>`).join('');

  // Lang
  const langHTML = d.lang.length
    ? d.lang.map(l=>`<span class="cv-lang-chip">${l}</span>`).join('')
    : '';

  return `
  <div class="cv-wrap" style="--cv-accent:${ac}">
    <!-- TOP -->
    <div class="cv-top">
      <div class="cv-top-left">
        <div class="cv-big-name">${name}</div>
        <div class="cv-job-title">${role.toUpperCase()}</div>
      </div>
      <div class="cv-top-right">${photoHTML}</div>
    </div>

    <!-- DIVIDER -->
    <div class="cv-divider"></div>

    <!-- SUMMARY -->
    ${d.ringkasan ? `
    <div class="cv-summary-wrap">
      <div class="cv-summary-title">Profil</div>
      <div class="cv-summary-text">${d.ringkasan}</div>
    </div>` : ''}

    <!-- BODY -->
    <div class="cv-body">
      <!-- LEFT COLUMN -->
      <div class="cv-left">

        ${contactHTML ? `
        <div class="cv-sec">
          <div class="cv-sec-title">Kontak</div>
          ${contactHTML}
        </div>` : ''}

        <div class="cv-sec">
          <div class="cv-sec-title">Pendidikan</div>
          ${eduHTML}
        </div>

        ${allSkillsLeft.length ? `
        <div class="cv-sec">
          <div class="cv-sec-title">Kemampuan</div>
          ${skillsHTML}
        </div>` : ''}

        ${langHTML ? `
        <div class="cv-sec">
          <div class="cv-sec-title">Bahasa</div>
          ${langHTML}
        </div>` : ''}

        ${d.hobi ? `
        <div class="cv-sec">
          <div class="cv-sec-title">Hobi</div>
          <div style="font-size:10.5px;color:#444;line-height:1.6">${d.hobi}</div>
        </div>` : ''}

      </div>

      <!-- RIGHT COLUMN -->
      <div class="cv-right">

        <div class="cv-sec">
          <div class="cv-sec-title">Pengalaman</div>
          ${expHTML}
        </div>

        ${certHTML ? `
        <div class="cv-sec">
          <div class="cv-sec-title">Kursus & Sertifikat</div>
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
