/* ═══════════════════════════════════════════════════════════
   CV GENERATOR — app.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ────────────────────────────────────────────────────────────
   DATA: DAFTAR JURUSAN (60+)
   Setiap jurusan punya: label, template (visual style), color
   ──────────────────────────────────────────────────────────── */
const JURUSAN_DATA = [
  // ── IT & Teknologi
  { cat: '💻 IT & Teknologi', items: [
    { val: 'Teknik Informatika',         tpl: 'tech',   color: '#38bdf8' },
    { val: 'Ilmu Komputer',              tpl: 'tech',   color: '#38bdf8' },
    { val: 'Sistem Informasi',           tpl: 'tech',   color: '#38bdf8' },
    { val: 'Teknik Komputer',            tpl: 'tech',   color: '#38bdf8' },
    { val: 'Keamanan Siber',             tpl: 'tech',   color: '#38bdf8' },
    { val: 'Data Science',               tpl: 'tech',   color: '#38bdf8' },
    { val: 'Kecerdasan Buatan / AI',     tpl: 'tech',   color: '#38bdf8' },
    { val: 'Software Engineering',       tpl: 'tech',   color: '#38bdf8' },
    { val: 'Rekayasa Perangkat Lunak',   tpl: 'tech',   color: '#38bdf8' },
    { val: 'Teknologi Informasi',        tpl: 'tech',   color: '#38bdf8' },
  ]},
  // ── Teknik
  { cat: '⚙️ Teknik & Engineering', items: [
    { val: 'Teknik Sipil',               tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Mesin',               tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Elektro',             tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Kimia',               tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Industri',            tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Lingkungan',          tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Pertambangan',        tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Perminyakan',         tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Biomedis',            tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Penerbangan',         tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Material',            tpl: 'teknik', color: '#f97316' },
    { val: 'Teknik Geodesi',             tpl: 'teknik', color: '#f97316' },
  ]},
  // ── Bisnis & Ekonomi
  { cat: '📊 Bisnis & Ekonomi', items: [
    { val: 'Manajemen Bisnis',           tpl: 'bisnis', color: '#ffd700' },
    { val: 'Akuntansi',                  tpl: 'bisnis', color: '#ffd700' },
    { val: 'Ekonomi',                    tpl: 'bisnis', color: '#ffd700' },
    { val: 'Ekonomi Pembangunan',        tpl: 'bisnis', color: '#ffd700' },
    { val: 'Manajemen Keuangan',         tpl: 'bisnis', color: '#ffd700' },
    { val: 'Manajemen Pemasaran',        tpl: 'bisnis', color: '#ffd700' },
    { val: 'Manajemen SDM',              tpl: 'bisnis', color: '#ffd700' },
    { val: 'Bisnis Internasional',       tpl: 'bisnis', color: '#ffd700' },
    { val: 'Perbankan & Keuangan',       tpl: 'bisnis', color: '#ffd700' },
    { val: 'Kewirausahaan',              tpl: 'bisnis', color: '#ffd700' },
    { val: 'Administrasi Bisnis',        tpl: 'bisnis', color: '#ffd700' },
  ]},
  // ── Kesehatan
  { cat: '⚕️ Kesehatan & Medis', items: [
    { val: 'Kedokteran Umum',            tpl: 'medis',  color: '#0d9488' },
    { val: 'Kedokteran Gigi',            tpl: 'medis',  color: '#0d9488' },
    { val: 'Keperawatan',                tpl: 'medis',  color: '#0d9488' },
    { val: 'Farmasi',                    tpl: 'medis',  color: '#0d9488' },
    { val: 'Kesehatan Masyarakat',       tpl: 'medis',  color: '#0d9488' },
    { val: 'Gizi & Dietisien',           tpl: 'medis',  color: '#0d9488' },
    { val: 'Fisioterapi',                tpl: 'medis',  color: '#0d9488' },
    { val: 'Kebidanan',                  tpl: 'medis',  color: '#0d9488' },
    { val: 'Analis Kesehatan',           tpl: 'medis',  color: '#0d9488' },
    { val: 'Radiologi',                  tpl: 'medis',  color: '#0d9488' },
    { val: 'Rekam Medis',                tpl: 'medis',  color: '#0d9488' },
  ]},
  // ── Desain & Seni
  { cat: '🎨 Desain & Kreatif', items: [
    { val: 'Desain Komunikasi Visual',   tpl: 'desain', color: '#a855f7' },
    { val: 'Desain Grafis',              tpl: 'desain', color: '#a855f7' },
    { val: 'Desain Interior',            tpl: 'desain', color: '#a855f7' },
    { val: 'Desain Produk',              tpl: 'desain', color: '#a855f7' },
    { val: 'Seni Rupa',                  tpl: 'desain', color: '#a855f7' },
    { val: 'Arsitektur',                 tpl: 'desain', color: '#a855f7' },
    { val: 'Animasi & Film',             tpl: 'desain', color: '#a855f7' },
    { val: 'Fotografi',                  tpl: 'desain', color: '#a855f7' },
    { val: 'Mode & Tekstil',             tpl: 'desain', color: '#a855f7' },
    { val: 'UI/UX Design',               tpl: 'desain', color: '#a855f7' },
  ]},
  // ── Hukum & Sosial
  { cat: '⚖️ Hukum, Sosial & Pendidikan', items: [
    { val: 'Hukum',                      tpl: 'formal', color: '#78350f' },
    { val: 'Hukum Bisnis',               tpl: 'formal', color: '#78350f' },
    { val: 'Ilmu Pemerintahan',          tpl: 'formal', color: '#78350f' },
    { val: 'Hubungan Internasional',     tpl: 'formal', color: '#78350f' },
    { val: 'Ilmu Komunikasi',            tpl: 'formal', color: '#78350f' },
    { val: 'Psikologi',                  tpl: 'formal', color: '#78350f' },
    { val: 'Sosiologi',                  tpl: 'formal', color: '#78350f' },
    { val: 'Pendidikan',                 tpl: 'formal', color: '#78350f' },
    { val: 'Sastra Indonesia',           tpl: 'formal', color: '#78350f' },
    { val: 'Sastra Inggris',             tpl: 'formal', color: '#78350f' },
    { val: 'Jurnalistik',                tpl: 'formal', color: '#78350f' },
    { val: 'Administrasi Publik',        tpl: 'formal', color: '#78350f' },
  ]},
];

/* ────────────────────────────────────────────────────────────
   STATE
   ──────────────────────────────────────────────────────────── */
const state = {
  step:        1,
  photoBase64: null,
  photoName:   null,
  jurusan:     null,        // { val, tpl, color }
  hardSkills:  [],
  softSkills:  [],
  langSkills:  [],
  eduCount:    0,
  expCount:    0,
  certCount:   0,
};

/* ────────────────────────────────────────────────────────────
   INIT
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildJurusanPicker();
  addEdu();
  addExp();
  addCert();
  updateProgress();
});

/* ────────────────────────────────────────────────────────────
   NAVIGATION
   ──────────────────────────────────────────────────────────── */
function goToStep(n) {
  document.getElementById(`step-${state.step}`).classList.remove('active');
  document.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));
  state.step = n;
  document.getElementById(`step-${n}`).classList.add('active');
  document.querySelector(`.step-btn[data-step="${n}"]`).classList.add('active');
  updateProgress();
  if (n === 5) buildPreview();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
  if (state.step >= 5) return;
  document.querySelector(`.step-btn[data-step="${state.step}"]`).classList.add('done');
  goToStep(state.step + 1);
}

function prevStep() {
  if (state.step <= 1) return;
  goToStep(state.step - 1);
}

function updateProgress() {
  const pct = (state.step / 5) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = Math.round(pct) + '%';
}

/* ────────────────────────────────────────────────────────────
   PHOTO UPLOAD
   ──────────────────────────────────────────────────────────── */
function triggerPhotoInput() {
  document.getElementById('photo-file').click();
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    showToast('⚠️ Foto terlalu besar! Maksimal 5MB.', 'error');
    return;
  }
  if (!file.type.startsWith('image/')) {
    showToast('⚠️ File harus berupa gambar (JPG/PNG).', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (ev) => {
    state.photoBase64 = ev.target.result;
    state.photoName   = file.name;

    // Update drop zone UI
    const drop = document.getElementById('photo-drop');
    drop.classList.add('has-photo');
    drop.innerHTML = `
      <img src="${state.photoBase64}" alt="foto profil" />
      <div class="drop-overlay">
        <span>📷</span>
        Ganti Foto
      </div>
    `;

    // Show filename
    const nameEl = document.getElementById('photo-name');
    nameEl.textContent = '✓ ' + file.name;
    nameEl.classList.add('show');

    showToast('✓ Foto berhasil diupload!', 'success');
  };
  reader.onerror = () => showToast('✗ Gagal membaca file foto.', 'error');
  reader.readAsDataURL(file);
}

/* ────────────────────────────────────────────────────────────
   JURUSAN PICKER
   ──────────────────────────────────────────────────────────── */
function buildJurusanPicker() {
  const scroll = document.getElementById('jurusan-scroll');
  scroll.innerHTML = '';

  JURUSAN_DATA.forEach(cat => {
    const catDiv = document.createElement('div');
    catDiv.className = 'jurusan-category';
    catDiv.dataset.cat = cat.cat;

    const label = document.createElement('span');
    label.className = 'jurusan-cat-label';
    label.textContent = cat.cat;
    catDiv.appendChild(label);

    const opts = document.createElement('div');
    opts.className = 'jurusan-options';

    cat.items.forEach(item => {
      const chip = document.createElement('div');
      chip.className = 'jurusan-chip';
      chip.dataset.val = item.val;
      chip.dataset.tpl = item.tpl;
      chip.dataset.color = item.color;
      chip.innerHTML = `<span class="chip-dot" style="background:${item.color}"></span>${item.val}`;
      chip.addEventListener('click', () => selectJurusan(chip, item));
      opts.appendChild(chip);
    });

    catDiv.appendChild(opts);
    scroll.appendChild(catDiv);
  });
}

function selectJurusan(chip, item) {
  document.querySelectorAll('.jurusan-chip').forEach(c => c.classList.remove('selected'));
  chip.classList.add('selected');
  state.jurusan = item;

  const badge = document.getElementById('jurusan-badge');
  badge.textContent = item.val;
  badge.classList.add('show');
  badge.style.borderColor = item.color + '66';
  badge.style.color = item.color;
  badge.style.background = item.color + '18';

  document.getElementById('jurusan-search').value = '';
  filterJurusan('');
}

function filterJurusan(q) {
  const lower = q.toLowerCase();
  let anyVisible = false;

  document.querySelectorAll('.jurusan-category').forEach(catDiv => {
    const chips = catDiv.querySelectorAll('.jurusan-chip');
    let catHasMatch = false;
    chips.forEach(chip => {
      const match = !lower || chip.dataset.val.toLowerCase().includes(lower);
      chip.style.display = match ? '' : 'none';
      if (match) catHasMatch = true;
    });
    catDiv.style.display = catHasMatch ? '' : 'none';
    if (catHasMatch) anyVisible = true;
  });

  const empty = document.getElementById('jurusan-empty');
  empty.classList.toggle('show', !anyVisible);
}

/* ────────────────────────────────────────────────────────────
   DYNAMIC CARDS
   ──────────────────────────────────────────────────────────── */
function addEdu() {
  state.eduCount++;
  const n = state.eduCount;
  const list = document.getElementById('edu-list');
  const card = document.createElement('div');
  card.className = 'dyn-card';
  card.id = `edu-card-${n}`;
  card.innerHTML = `
    <div class="card-head">
      <span class="card-badge">Pendidikan #${n}</span>
      <button class="btn-rm" onclick="removeCard('edu-card-${n}')">Hapus</button>
    </div>
    <div class="form-grid">
      <div class="form-group span2">
        <label class="form-label">Nama Institusi <span class="req">*</span></label>
        <input class="form-input" name="edu-institusi" placeholder="Universitas Indonesia / SMA Negeri 1 Jakarta" />
      </div>
      <div class="form-group">
        <label class="form-label">Jurusan / Program Studi</label>
        <input class="form-input" name="edu-jurusan" placeholder="Teknik Informatika" />
      </div>
      <div class="form-group">
        <label class="form-label">Gelar / Jenjang</label>
        <input class="form-input" name="edu-gelar" placeholder="S1 / D3 / SMA / SMK" />
      </div>
      <div class="form-group">
        <label class="form-label">Tahun Mulai</label>
        <input class="form-input" name="edu-start" placeholder="2019" maxlength="4" />
      </div>
      <div class="form-group">
        <label class="form-label">Tahun Selesai</label>
        <input class="form-input" name="edu-end" placeholder="2023 / Sekarang" />
      </div>
      <div class="form-group span2">
        <label class="form-label">IPK / Nilai (opsional)</label>
        <input class="form-input" name="edu-ipk" placeholder="3.85 / 4.00" />
      </div>
    </div>`;
  list.appendChild(card);
}

function addExp() {
  state.expCount++;
  const n = state.expCount;
  const list = document.getElementById('exp-list');
  const card = document.createElement('div');
  card.className = 'dyn-card';
  card.id = `exp-card-${n}`;
  card.innerHTML = `
    <div class="card-head">
      <span class="card-badge">Pengalaman #${n}</span>
      <button class="btn-rm" onclick="removeCard('exp-card-${n}')">Hapus</button>
    </div>
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Perusahaan / Organisasi <span class="req">*</span></label>
        <input class="form-input" name="exp-perusahaan" placeholder="PT. Contoh Jaya / BEM Universitas" />
      </div>
      <div class="form-group">
        <label class="form-label">Posisi / Jabatan <span class="req">*</span></label>
        <input class="form-input" name="exp-posisi" placeholder="Frontend Developer" />
      </div>
      <div class="form-group">
        <label class="form-label">Jenis Pekerjaan</label>
        <select class="form-select" name="exp-type">
          <option value="">— Pilih —</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Magang / Internship</option>
          <option>Freelance</option>
          <option>Organisasi</option>
          <option>Volunteer</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Lokasi</label>
        <input class="form-input" name="exp-lokasi" placeholder="Jakarta / Remote" />
      </div>
      <div class="form-group">
        <label class="form-label">Periode Mulai</label>
        <input class="form-input" name="exp-start" placeholder="Jan 2022" />
      </div>
      <div class="form-group">
        <label class="form-label">Periode Selesai</label>
        <input class="form-input" name="exp-end" placeholder="Des 2023 / Sekarang" />
      </div>
      <div class="form-group span2">
        <label class="form-label">Deskripsi & Pencapaian</label>
        <textarea class="form-textarea" name="exp-desc" placeholder="• Mengembangkan fitur X menggunakan teknologi Y&#10;• Berhasil meningkatkan performa Z sebesar 30%&#10;• Berkolaborasi dengan tim lintas divisi..."></textarea>
      </div>
    </div>`;
  list.appendChild(card);
}

function addCert() {
  state.certCount++;
  const n = state.certCount;
  const list = document.getElementById('cert-list');
  const card = document.createElement('div');
  card.className = 'dyn-card';
  card.id = `cert-card-${n}`;
  card.innerHTML = `
    <div class="card-head">
      <span class="card-badge">Sertifikat #${n}</span>
      <button class="btn-rm" onclick="removeCard('cert-card-${n}')">Hapus</button>
    </div>
    <div class="form-grid">
      <div class="form-group span2">
        <label class="form-label">Nama Sertifikat / Penghargaan <span class="req">*</span></label>
        <input class="form-input" name="cert-nama" placeholder="Google Professional Cloud Architect" />
      </div>
      <div class="form-group">
        <label class="form-label">Penerbit / Issuer</label>
        <input class="form-input" name="cert-issuer" placeholder="Google / Coursera / Dicoding" />
      </div>
      <div class="form-group">
        <label class="form-label">Tahun</label>
        <input class="form-input" name="cert-tahun" placeholder="2024" maxlength="4" />
      </div>
    </div>`;
  list.appendChild(card);
}

function removeCard(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    el.style.transition = 'all 0.2s ease';
    setTimeout(() => el.remove(), 200);
  }
}

/* ────────────────────────────────────────────────────────────
   SKILLS
   ──────────────────────────────────────────────────────────── */
function addSkill(type) {
  const inputId = `${type}-input`;
  const input   = document.getElementById(inputId);
  const val     = input.value.trim();
  if (!val) return;

  const arr = type === 'hard' ? state.hardSkills
            : type === 'soft' ? state.softSkills
            : state.langSkills;

  if (arr.includes(val)) {
    showToast('Skill sudah ada!', 'error');
    input.value = '';
    return;
  }

  arr.push(val);

  const container = document.getElementById(`${type}-chips`);
  const chip = document.createElement('div');
  chip.className = 's-chip';
  chip.dataset.val = val;
  chip.innerHTML = `${val} <button onclick="removeSkill(this,'${type}','${val.replace(/'/g, "\\'")}')" title="Hapus">×</button>`;
  container.appendChild(chip);
  input.value = '';
  input.focus();
}

function removeSkill(btn, type, val) {
  const arr = type === 'hard' ? state.hardSkills
            : type === 'soft' ? state.softSkills
            : state.langSkills;
  const idx = arr.indexOf(val);
  if (idx > -1) arr.splice(idx, 1);
  btn.closest('.s-chip').remove();
}

/* ────────────────────────────────────────────────────────────
   COLLECT ALL FORM DATA
   ──────────────────────────────────────────────────────────── */
function g(id) {
  return (document.getElementById(id)?.value || '').trim();
}

function collectData() {
  const edus = [];
  document.querySelectorAll('#edu-list .dyn-card').forEach(c => {
    edus.push({
      institusi: c.querySelector('[name="edu-institusi"]')?.value?.trim() || '',
      jurusan:   c.querySelector('[name="edu-jurusan"]')?.value?.trim() || '',
      gelar:     c.querySelector('[name="edu-gelar"]')?.value?.trim() || '',
      start:     c.querySelector('[name="edu-start"]')?.value?.trim() || '',
      end:       c.querySelector('[name="edu-end"]')?.value?.trim() || '',
      ipk:       c.querySelector('[name="edu-ipk"]')?.value?.trim() || '',
    });
  });

  const exps = [];
  document.querySelectorAll('#exp-list .dyn-card').forEach(c => {
    exps.push({
      perusahaan: c.querySelector('[name="exp-perusahaan"]')?.value?.trim() || '',
      posisi:     c.querySelector('[name="exp-posisi"]')?.value?.trim() || '',
      type:       c.querySelector('[name="exp-type"]')?.value?.trim() || '',
      lokasi:     c.querySelector('[name="exp-lokasi"]')?.value?.trim() || '',
      start:      c.querySelector('[name="exp-start"]')?.value?.trim() || '',
      end:        c.querySelector('[name="exp-end"]')?.value?.trim() || '',
      desc:       c.querySelector('[name="exp-desc"]')?.value?.trim() || '',
    });
  });

  const certs = [];
  document.querySelectorAll('#cert-list .dyn-card').forEach(c => {
    certs.push({
      nama:   c.querySelector('[name="cert-nama"]')?.value?.trim() || '',
      issuer: c.querySelector('[name="cert-issuer"]')?.value?.trim() || '',
      tahun:  c.querySelector('[name="cert-tahun"]')?.value?.trim() || '',
    });
  });

  return {
    jurusan:     state.jurusan,
    photo:       state.photoBase64,
    nama:        g('nama'),
    posisi:      g('posisi'),
    ttl:         g('ttl'),
    email:       g('email'),
    phone:       g('phone'),
    alamat:      g('alamat'),
    linkedin:    g('linkedin'),
    website:     g('website'),
    ringkasan:   g('ringkasan'),
    edus, exps, certs,
    hardSkills:  [...state.hardSkills],
    softSkills:  [...state.softSkills],
    langSkills:  [...state.langSkills],
    hobi:        g('hobi'),
  };
}

/* ────────────────────────────────────────────────────────────
   BUILD CV HTML (for preview + PDF)
   ──────────────────────────────────────────────────────────── */
function buildCVHTML(d) {
  const tpl = d.jurusan?.tpl || 'tech';

  // Photo element
  const photoEl = d.photo
    ? `<div class="cv-photo-wrap"><img src="${d.photo}" alt="foto profil" crossorigin="anonymous" /></div>`
    : `<div class="cv-photo-placeholder">👤</div>`;

  // Contacts
  const contactItems = [
    d.email    && d.email,
    d.phone    && d.phone,
    d.alamat   && d.alamat,
    d.linkedin && d.linkedin,
    d.website  && d.website,
  ].filter(Boolean);

  const contactsHTML = contactItems
    .map(c => `<span class="cv-contact">${c}</span>`)
    .join('');

  // Education
  const eduHTML = d.edus.filter(e => e.institusi).length
    ? d.edus.filter(e => e.institusi).map(e => `
      <div class="cv-item">
        <div class="cv-item-name">${e.institusi}</div>
        ${(e.jurusan || e.gelar) ? `<div class="cv-item-sub">${[e.jurusan, e.gelar].filter(Boolean).join(' · ')}</div>` : ''}
        <div class="cv-item-date">${[e.start, e.end].filter(Boolean).join(' – ')}${e.ipk ? ` &nbsp;·&nbsp; IPK ${e.ipk}` : ''}</div>
      </div>`).join('')
    : '<div class="cv-item-desc" style="color:#9ca3af;font-style:italic;font-size:11px">Belum diisi</div>';

  // Experience
  const expHTML = d.exps.filter(e => e.perusahaan).length
    ? d.exps.filter(e => e.perusahaan).map(e => `
      <div class="cv-item">
        <div class="cv-item-name">${e.posisi}</div>
        <div class="cv-item-sub">${e.perusahaan}${e.type ? ` · ${e.type}` : ''}${e.lokasi ? ` · ${e.lokasi}` : ''}</div>
        <div class="cv-item-date">${[e.start, e.end].filter(Boolean).join(' – ')}</div>
        ${e.desc ? `<div class="cv-item-desc">${e.desc.replace(/\n/g, '<br/>')}</div>` : ''}
      </div>`).join('')
    : '<div class="cv-item-desc" style="color:#9ca3af;font-style:italic;font-size:11px">Belum diisi</div>';

  // Skills
  const allSkills = [...d.hardSkills, ...d.softSkills];
  const skillsHTML = allSkills.map(s => `<span class="cv-chip">${s}</span>`).join('');
  const langHTML   = d.langSkills.map(l => `<span class="cv-chip">${l}</span>`).join('');

  // Certs
  const certHTML = d.certs.filter(c => c.nama).map(c => `
    <div class="cv-item" style="margin-bottom:7px">
      <div class="cv-item-name" style="font-size:11px">${c.nama}</div>
      ${(c.issuer || c.tahun) ? `<div class="cv-item-date">${[c.issuer, c.tahun].filter(Boolean).join(' · ')}</div>` : ''}
    </div>`).join('');

  const name = d.nama || 'Nama Lengkap';
  const role = d.posisi || (d.jurusan?.val ? d.jurusan.val : 'Posisi / Jabatan');
  const summary = d.ringkasan
    ? `<div class="cv-sec"><div class="cv-sec-title">Tentang Saya</div><div class="cv-summary">${d.ringkasan}</div></div>`
    : '';

  // ── Template: formal (single column body)
  if (tpl === 'formal') {
    return `<div class="cv-wrap cv-formal">
      <div class="cv-header">
        ${d.photo
          ? `<div class="cv-photo-wrap" style="margin:0 auto 10px;display:block">${`<img src="${d.photo}" alt="foto" crossorigin="anonymous"/>`}</div>`
          : `<div class="cv-photo-placeholder">👤</div>`}
        <div class="cv-name">${name}</div>
        <div class="cv-role">${role}</div>
        ${d.ttl ? `<div style="font-family:'DM Sans',sans-serif;font-size:10px;color:#9ca3af;margin-top:3px">${d.ttl}</div>` : ''}
        <div class="cv-contacts">${contactsHTML}</div>
      </div>
      <div class="cv-body">
        ${summary}
        <div class="cv-sec"><div class="cv-sec-title">Pendidikan</div>${eduHTML}</div>
        <div class="cv-sec"><div class="cv-sec-title">Pengalaman</div>${expHTML}</div>
        ${certHTML ? `<div class="cv-sec"><div class="cv-sec-title">Sertifikat & Penghargaan</div>${certHTML}</div>` : ''}
        ${skillsHTML ? `<div class="cv-sec"><div class="cv-sec-title">Kemampuan</div>${skillsHTML}</div>` : ''}
        ${langHTML ? `<div class="cv-sec"><div class="cv-sec-title">Bahasa</div>${langHTML}</div>` : ''}
        ${d.hobi ? `<div class="cv-sec"><div class="cv-sec-title">Hobi & Minat</div><div class="cv-item-desc">${d.hobi}</div></div>` : ''}
      </div>
    </div>`;
  }

  // ── Template: bisnis (top row header)
  if (tpl === 'bisnis') {
    return `<div class="cv-wrap cv-bisnis">
      <div class="cv-header">
        <div class="cv-top">
          ${photoEl}
          <div>
            <div class="cv-name">${name}</div>
            <div class="cv-role">${role}</div>
            ${d.ttl ? `<div style="font-size:10px;color:rgba(255,255,255,0.6);margin-top:2px">${d.ttl}</div>` : ''}
            <div class="cv-contacts">${contactsHTML}</div>
          </div>
        </div>
      </div>
      <div class="cv-body">
        <div>
          ${summary}
          <div class="cv-sec"><div class="cv-sec-title">Pengalaman Kerja</div>${expHTML}</div>
          <div class="cv-sec"><div class="cv-sec-title">Pendidikan</div>${eduHTML}</div>
          ${certHTML ? `<div class="cv-sec"><div class="cv-sec-title">Sertifikat</div>${certHTML}</div>` : ''}
        </div>
        <div>
          ${skillsHTML ? `<div class="cv-sec"><div class="cv-sec-title">Skills</div>${skillsHTML}</div>` : ''}
          ${langHTML ? `<div class="cv-sec"><div class="cv-sec-title">Bahasa</div>${langHTML}</div>` : ''}
          ${d.hobi ? `<div class="cv-sec"><div class="cv-sec-title">Hobi</div><div class="cv-item-desc" style="font-size:10.5px;color:#555">${d.hobi}</div></div>` : ''}
        </div>
      </div>
    </div>`;
  }

  // ── Default two-column: tech, teknik, desain, medis
  const sidebarContent = `
    ${skillsHTML ? `<div class="cv-sec"><div class="cv-sec-title">Skills</div><div>${skillsHTML}</div></div>` : ''}
    ${langHTML ? `<div class="cv-sec"><div class="cv-sec-title">Bahasa</div><div>${langHTML}</div></div>` : ''}
    ${certHTML ? `<div class="cv-sec"><div class="cv-sec-title">Sertifikat</div>${certHTML}</div>` : ''}
    ${d.hobi ? `<div class="cv-sec"><div class="cv-sec-title">Hobi</div><div class="cv-item-desc">${d.hobi}</div></div>` : ''}
  `;

  return `<div class="cv-wrap cv-${tpl}">
    <div class="cv-header">
      <div class="cv-top">
        ${photoEl}
        <div>
          <div class="cv-name">${name}</div>
          <div class="cv-role">${role}</div>
          ${d.ttl ? `<div style="font-size:10px;opacity:0.6;margin-top:2px">${d.ttl}</div>` : ''}
          <div class="cv-contacts">${contactsHTML}</div>
        </div>
      </div>
    </div>
    <div class="cv-body">
      <div class="cv-main">
        ${summary}
        <div class="cv-sec"><div class="cv-sec-title">Pengalaman</div>${expHTML}</div>
        <div class="cv-sec"><div class="cv-sec-title">Pendidikan</div>${eduHTML}</div>
      </div>
      <div class="cv-side">${sidebarContent}</div>
    </div>
  </div>`;
}

/* ────────────────────────────────────────────────────────────
   PREVIEW
   ──────────────────────────────────────────────────────────── */
function buildPreview() {
  const d = collectData();
  document.getElementById('cv-frame').innerHTML = buildCVHTML(d);
}

/* ────────────────────────────────────────────────────────────
   DOWNLOAD PDF
   ──────────────────────────────────────────────────────────── */
function downloadPDF() {
  const d    = collectData();
  const nama = d.nama || 'CV';
  const el   = document.getElementById('cv-frame');
  const btn  = document.getElementById('btn-dl');

  btn.classList.add('loading');
  btn.textContent = '⏳ Membuat PDF...';
  showToast('⏳ Membuat PDF, mohon tunggu...', '');

  const opt = {
    margin:      0,
    filename:    `CV_${nama.replace(/\s+/g, '_')}.pdf`,
    image:       { type: 'jpeg', quality: 0.97 },
    html2canvas: { scale: 2, useCORS: true, allowTaint: true, letterRendering: true },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf()
    .set(opt)
    .from(el)
    .save()
    .then(() => {
      showToast(`✓ CV "${nama}" berhasil diunduh!`, 'success');
      btn.classList.remove('loading');
      btn.innerHTML = '⬇ Download PDF';
    })
    .catch(err => {
      console.error(err);
      showToast('✗ Gagal membuat PDF. Coba lagi.', 'error');
      btn.classList.remove('loading');
      btn.innerHTML = '⬇ Download PDF';
    });
}

/* ────────────────────────────────────────────────────────────
   SEND TO GOOGLE APPS SCRIPT
   ──────────────────────────────────────────────────────────── */
async function sendToGAS() {
  const url    = document.getElementById('gas-url').value.trim();
  const status = document.getElementById('gas-status');

  if (!url) {
    showToast('⚠️ Isi dulu URL Google Apps Script!', 'error');
    return;
  }

  status.className = 'gas-status-msg loading';
  status.textContent = '⏳ Mengirim data ke Google Sheets...';

  const d = collectData();
  const payload = {
    ...d,
    photo:     d.photo ? '[FOTO_BASE64_TIDAK_DIKIRIM]' : null,
    jurusan:   d.jurusan?.val || '',
    template:  d.jurusan?.tpl || '',
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(url, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body:    JSON.stringify(payload),
    });
    // no-cors = response opaque, tapi request terkirim
    status.className = 'gas-status-msg ok';
    status.textContent = '✓ Data terkirim ke Google Sheets!';
    showToast('✓ Tersimpan ke Google Sheets!', 'success');
  } catch (err) {
    status.className = 'gas-status-msg fail';
    status.textContent = '✗ Gagal. Cek URL & setting GAS (Anyone).';
    showToast('✗ Gagal kirim ke GAS', 'error');
  }
}

/* ────────────────────────────────────────────────────────────
   RESET
   ──────────────────────────────────────────────────────────── */
function resetForm() {
  if (!confirm('Buat CV baru? Semua data yang sudah diisi akan dihapus.')) return;
  location.reload();
}

/* ────────────────────────────────────────────────────────────
   TOAST
   ──────────────────────────────────────────────────────────── */
function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3800);
}
