/* ═══════════════════════════════════════════════════════
   CV GENERATOR — app.js  v2
   Fix utama: PDF rendering match preview (scale trick)
   ═══════════════════════════════════════════════════════ */
'use strict';

/* ─── JURUSAN DATA (60+) ─── */
const JURUSAN = [
  { cat: '💻 IT & Teknologi', items: [
    { val:'Teknik Informatika', tpl:'tech', color:'#6366f1' },
    { val:'Ilmu Komputer', tpl:'tech', color:'#6366f1' },
    { val:'Sistem Informasi', tpl:'tech', color:'#6366f1' },
    { val:'Teknik Komputer', tpl:'tech', color:'#6366f1' },
    { val:'Keamanan Siber', tpl:'tech', color:'#6366f1' },
    { val:'Data Science', tpl:'tech', color:'#6366f1' },
    { val:'Kecerdasan Buatan / AI', tpl:'tech', color:'#6366f1' },
    { val:'Software Engineering', tpl:'tech', color:'#6366f1' },
    { val:'Rekayasa Perangkat Lunak', tpl:'tech', color:'#6366f1' },
    { val:'Teknologi Informasi', tpl:'tech', color:'#6366f1' },
  ]},
  { cat: '⚙️ Teknik & Engineering', items: [
    { val:'Teknik Sipil', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Mesin', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Elektro', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Kimia', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Industri', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Lingkungan', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Pertambangan', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Perminyakan', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Biomedis', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Penerbangan', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Material', tpl:'teknik', color:'#f97316' },
    { val:'Teknik Geodesi', tpl:'teknik', color:'#f97316' },
  ]},
  { cat: '📊 Bisnis & Ekonomi', items: [
    { val:'Manajemen Bisnis', tpl:'bisnis', color:'#c9a84c' },
    { val:'Akuntansi', tpl:'bisnis', color:'#c9a84c' },
    { val:'Ekonomi', tpl:'bisnis', color:'#c9a84c' },
    { val:'Ekonomi Pembangunan', tpl:'bisnis', color:'#c9a84c' },
    { val:'Manajemen Keuangan', tpl:'bisnis', color:'#c9a84c' },
    { val:'Manajemen Pemasaran', tpl:'bisnis', color:'#c9a84c' },
    { val:'Manajemen SDM', tpl:'bisnis', color:'#c9a84c' },
    { val:'Bisnis Internasional', tpl:'bisnis', color:'#c9a84c' },
    { val:'Perbankan & Keuangan', tpl:'bisnis', color:'#c9a84c' },
    { val:'Kewirausahaan', tpl:'bisnis', color:'#c9a84c' },
    { val:'Administrasi Bisnis', tpl:'bisnis', color:'#c9a84c' },
  ]},
  { cat: '⚕️ Kesehatan & Medis', items: [
    { val:'Kedokteran Umum', tpl:'medis', color:'#0d9488' },
    { val:'Kedokteran Gigi', tpl:'medis', color:'#0d9488' },
    { val:'Keperawatan', tpl:'medis', color:'#0d9488' },
    { val:'Farmasi', tpl:'medis', color:'#0d9488' },
    { val:'Kesehatan Masyarakat', tpl:'medis', color:'#0d9488' },
    { val:'Gizi & Dietisien', tpl:'medis', color:'#0d9488' },
    { val:'Fisioterapi', tpl:'medis', color:'#0d9488' },
    { val:'Kebidanan', tpl:'medis', color:'#0d9488' },
    { val:'Analis Kesehatan', tpl:'medis', color:'#0d9488' },
    { val:'Radiologi', tpl:'medis', color:'#0d9488' },
    { val:'Rekam Medis', tpl:'medis', color:'#0d9488' },
  ]},
  { cat: '🎨 Desain & Kreatif', items: [
    { val:'Desain Komunikasi Visual', tpl:'desain', color:'#7c3aed' },
    { val:'Desain Grafis', tpl:'desain', color:'#7c3aed' },
    { val:'Desain Interior', tpl:'desain', color:'#7c3aed' },
    { val:'Desain Produk', tpl:'desain', color:'#7c3aed' },
    { val:'Seni Rupa', tpl:'desain', color:'#7c3aed' },
    { val:'Arsitektur', tpl:'desain', color:'#7c3aed' },
    { val:'Animasi & Film', tpl:'desain', color:'#7c3aed' },
    { val:'Fotografi', tpl:'desain', color:'#7c3aed' },
    { val:'Mode & Tekstil', tpl:'desain', color:'#7c3aed' },
    { val:'UI/UX Design', tpl:'desain', color:'#7c3aed' },
  ]},
  { cat: '⚖️ Hukum, Sosial & Pendidikan', items: [
    { val:'Hukum', tpl:'formal', color:'#8b6914' },
    { val:'Hukum Bisnis', tpl:'formal', color:'#8b6914' },
    { val:'Ilmu Pemerintahan', tpl:'formal', color:'#8b6914' },
    { val:'Hubungan Internasional', tpl:'formal', color:'#8b6914' },
    { val:'Ilmu Komunikasi', tpl:'formal', color:'#8b6914' },
    { val:'Psikologi', tpl:'formal', color:'#8b6914' },
    { val:'Sosiologi', tpl:'formal', color:'#8b6914' },
    { val:'Pendidikan', tpl:'formal', color:'#8b6914' },
    { val:'Sastra Indonesia', tpl:'formal', color:'#8b6914' },
    { val:'Sastra Inggris', tpl:'formal', color:'#8b6914' },
    { val:'Jurnalistik', tpl:'formal', color:'#8b6914' },
    { val:'Administrasi Publik', tpl:'formal', color:'#8b6914' },
  ]},
];

/* ─── STATE ─── */
const S = {
  step: 1,
  photo: null,
  jurusan: null,
  hard: [], soft: [], lang: [],
  eduN: 0, expN: 0, certN: 0,
};

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  buildJurPicker();
  addEdu(); addExp(); addCert();
  updateProg();
  window.addEventListener('resize', rescaleCV);
});

/* ─── NAVIGATION ─── */
function goStep(n) {
  document.getElementById(`step-${S.step}`).classList.remove('active');
  document.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));
  S.step = n;
  document.getElementById(`step-${n}`).classList.add('active');
  document.querySelector(`.step-btn[data-step="${n}"]`).classList.add('active');
  updateProg();
  if (n === 5) { buildPreview(); setTimeout(rescaleCV, 60); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function nextStep() {
  if (S.step >= 5) return;
  document.querySelector(`.step-btn[data-step="${S.step}"]`).classList.add('done');
  goStep(S.step + 1);
}
function prevStep() { if (S.step > 1) goStep(S.step - 1); }
function updateProg() {
  const p = (S.step / 5) * 100;
  document.getElementById('prog-bar').style.width = p + '%';
  document.getElementById('prog-pct').textContent = Math.round(p) + '%';
}

/* ─── PHOTO ─── */
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
    drop.innerHTML = `<img src="${S.photo}" alt="foto"/><div class="drop-ov"><span>📷</span>Ganti</div>`;
    const fn = document.getElementById('photo-fname');
    fn.textContent = '✓ ' + f.name;
    fn.classList.add('show');
    toast('✓ Foto berhasil diupload!', 'ok');
  };
  r.onerror = () => toast('✗ Gagal baca file', 'err');
  r.readAsDataURL(f);
}

/* ─── JURUSAN PICKER ─── */
function buildJurPicker() {
  const scroll = document.getElementById('jur-scroll');
  scroll.innerHTML = '';
  JURUSAN.forEach(cat => {
    const wrap = document.createElement('div');
    wrap.dataset.cat = cat.cat;
    const lbl = document.createElement('span');
    lbl.className = 'jur-cat-lbl'; lbl.textContent = cat.cat;
    wrap.appendChild(lbl);
    const opts = document.createElement('div');
    opts.className = 'jur-opts';
    cat.items.forEach(item => {
      const chip = document.createElement('div');
      chip.className = 'jur-chip';
      chip.dataset.val = item.val;
      chip.innerHTML = `<span class="jur-dot" style="background:${item.color}"></span>${item.val}`;
      chip.addEventListener('click', () => selJur(chip, item));
      opts.appendChild(chip);
    });
    wrap.appendChild(opts);
    scroll.appendChild(wrap);
  });
}

function selJur(chip, item) {
  document.querySelectorAll('.jur-chip').forEach(c => c.classList.remove('sel'));
  chip.classList.add('sel');
  S.jurusan = item;
  const b = document.getElementById('jur-badge');
  b.textContent = item.val;
  b.classList.add('show');
  b.style.cssText = `border-color:${item.color}55;color:${item.color};background:${item.color}18;`;
  document.getElementById('jur-search').value = '';
  filterJur('');
}

function filterJur(q) {
  const low = q.toLowerCase();
  let any = false;
  document.querySelectorAll('#jur-scroll > div').forEach(catDiv => {
    const chips = catDiv.querySelectorAll('.jur-chip');
    let has = false;
    chips.forEach(c => {
      const m = !low || c.dataset.val.toLowerCase().includes(low);
      c.style.display = m ? '' : 'none';
      if (m) has = true;
    });
    catDiv.style.display = has ? '' : 'none';
    if (has) any = true;
  });
  document.getElementById('jur-empty').classList.toggle('show', !any);
}

/* ─── DYNAMIC CARDS ─── */
function addEdu() {
  S.eduN++;
  const n = S.eduN;
  appendCard('edu-list', `edu-card-${n}`, `Pendidikan #${n}`, `removeCard('edu-card-${n}')`, `
    <div class="fgrid">
      <div class="fg s2"><label class="flbl">Nama Institusi <span class="req">*</span></label>
        <input class="fi" name="edu-inst" placeholder="Universitas Indonesia / SMA N 1 Jakarta"/></div>
      <div class="fg"><label class="flbl">Jurusan / Program Studi</label>
        <input class="fi" name="edu-jur" placeholder="Teknik Informatika"/></div>
      <div class="fg"><label class="flbl">Gelar / Jenjang</label>
        <input class="fi" name="edu-gel" placeholder="S1 / D3 / SMA"/></div>
      <div class="fg"><label class="flbl">Tahun Mulai</label>
        <input class="fi" name="edu-start" placeholder="2019" maxlength="4"/></div>
      <div class="fg"><label class="flbl">Tahun Selesai</label>
        <input class="fi" name="edu-end" placeholder="2023 / Sekarang"/></div>
      <div class="fg s2"><label class="flbl">IPK / Nilai (opsional)</label>
        <input class="fi" name="edu-ipk" placeholder="3.85 / 4.00"/></div>
    </div>`);
}

function addExp() {
  S.expN++;
  const n = S.expN;
  appendCard('exp-list', `exp-card-${n}`, `Pengalaman #${n}`, `removeCard('exp-card-${n}')`, `
    <div class="fgrid">
      <div class="fg"><label class="flbl">Perusahaan / Organisasi <span class="req">*</span></label>
        <input class="fi" name="exp-co" placeholder="PT. Contoh Jaya"/></div>
      <div class="fg"><label class="flbl">Posisi / Jabatan <span class="req">*</span></label>
        <input class="fi" name="exp-pos" placeholder="Frontend Developer"/></div>
      <div class="fg"><label class="flbl">Jenis</label>
        <select class="fsel" name="exp-type">
          <option value="">— Pilih —</option>
          <option>Full-time</option><option>Part-time</option>
          <option>Magang / Internship</option><option>Freelance</option>
          <option>Organisasi</option><option>Volunteer</option>
        </select></div>
      <div class="fg"><label class="flbl">Lokasi</label>
        <input class="fi" name="exp-loc" placeholder="Jakarta / Remote"/></div>
      <div class="fg"><label class="flbl">Periode Mulai</label>
        <input class="fi" name="exp-start" placeholder="Jan 2022"/></div>
      <div class="fg"><label class="flbl">Periode Selesai</label>
        <input class="fi" name="exp-end" placeholder="Des 2023 / Sekarang"/></div>
      <div class="fg s2"><label class="flbl">Deskripsi & Pencapaian</label>
        <textarea class="fta" name="exp-desc" placeholder="• Mengembangkan fitur X dengan teknologi Y&#10;• Meningkatkan performa Z sebesar 30%&#10;• Berkolaborasi dengan tim lintas divisi..."></textarea></div>
    </div>`);
}

function addCert() {
  S.certN++;
  const n = S.certN;
  appendCard('cert-list', `cert-card-${n}`, `Sertifikat #${n}`, `removeCard('cert-card-${n}')`, `
    <div class="fgrid">
      <div class="fg s2"><label class="flbl">Nama Sertifikat / Penghargaan <span class="req">*</span></label>
        <input class="fi" name="cert-nama" placeholder="Google Professional Cloud Architect"/></div>
      <div class="fg"><label class="flbl">Penerbit</label>
        <input class="fi" name="cert-iss" placeholder="Google / Coursera / Dicoding"/></div>
      <div class="fg"><label class="flbl">Tahun</label>
        <input class="fi" name="cert-yr" placeholder="2024" maxlength="4"/></div>
    </div>`);
}

function appendCard(listId, cardId, badge, rmFn, innerHTML) {
  const list = document.getElementById(listId);
  const card = document.createElement('div');
  card.className = 'dcard'; card.id = cardId;
  card.innerHTML = `
    <div class="dcard-head">
      <span class="dcard-badge">${badge}</span>
      <button class="btn-rm" onclick="${rmFn}">Hapus</button>
    </div>${innerHTML}`;
  list.appendChild(card);
}

function removeCard(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.cssText = 'opacity:0;transform:translateY(-6px);transition:all 0.18s';
  setTimeout(() => el.remove(), 200);
}

/* ─── SKILLS ─── */
function addSkill(type) {
  const inp = document.getElementById(`${type}-inp`);
  const val = inp.value.trim();
  if (!val) return;
  const arr = type === 'hard' ? S.hard : type === 'soft' ? S.soft : S.lang;
  if (arr.includes(val)) { toast('Skill sudah ada!', 'err'); inp.value = ''; return; }
  arr.push(val);
  const box = document.getElementById(`${type}-chips`);
  const chip = document.createElement('div');
  chip.className = 'schip';
  chip.dataset.v = val;
  chip.innerHTML = `${val} <button onclick="rmSkill(this,'${type}','${val.replace(/'/g,"\\'")}')">×</button>`;
  box.appendChild(chip);
  inp.value = ''; inp.focus();
}

function rmSkill(btn, type, val) {
  const arr = type === 'hard' ? S.hard : type === 'soft' ? S.soft : S.lang;
  const i = arr.indexOf(val);
  if (i > -1) arr.splice(i, 1);
  btn.closest('.schip').remove();
}

/* ─── COLLECT DATA ─── */
function g(id) { return (document.getElementById(id)?.value || '').trim(); }
function collect() {
  const edus = [], exps = [], certs = [];
  document.querySelectorAll('#edu-list .dcard').forEach(c => edus.push({
    inst:  c.querySelector('[name="edu-inst"]')?.value?.trim() || '',
    jur:   c.querySelector('[name="edu-jur"]')?.value?.trim() || '',
    gel:   c.querySelector('[name="edu-gel"]')?.value?.trim() || '',
    start: c.querySelector('[name="edu-start"]')?.value?.trim() || '',
    end:   c.querySelector('[name="edu-end"]')?.value?.trim() || '',
    ipk:   c.querySelector('[name="edu-ipk"]')?.value?.trim() || '',
  }));
  document.querySelectorAll('#exp-list .dcard').forEach(c => exps.push({
    co:    c.querySelector('[name="exp-co"]')?.value?.trim() || '',
    pos:   c.querySelector('[name="exp-pos"]')?.value?.trim() || '',
    type:  c.querySelector('[name="exp-type"]')?.value?.trim() || '',
    loc:   c.querySelector('[name="exp-loc"]')?.value?.trim() || '',
    start: c.querySelector('[name="exp-start"]')?.value?.trim() || '',
    end:   c.querySelector('[name="exp-end"]')?.value?.trim() || '',
    desc:  c.querySelector('[name="exp-desc"]')?.value?.trim() || '',
  }));
  document.querySelectorAll('#cert-list .dcard').forEach(c => certs.push({
    nama: c.querySelector('[name="cert-nama"]')?.value?.trim() || '',
    iss:  c.querySelector('[name="cert-iss"]')?.value?.trim() || '',
    yr:   c.querySelector('[name="cert-yr"]')?.value?.trim() || '',
  }));
  return {
    jurusan: S.jurusan, photo: S.photo,
    nama: g('nama'), posisi: g('posisi'), ttl: g('ttl'),
    email: g('email'), phone: g('phone'), alamat: g('alamat'),
    linkedin: g('linkedin'), website: g('website'), ringkasan: g('ringkasan'),
    edus, exps, certs,
    hard: [...S.hard], soft: [...S.soft], lang: [...S.lang],
    hobi: g('hobi'),
  };
}

/* ─── BUILD CV HTML ─── */
function buildCV(d) {
  const tpl = d.jurusan?.tpl || 'tech';
  const name = d.nama || 'Nama Lengkap';
  const role = d.posisi || (d.jurusan?.val || 'Posisi / Jabatan');

  const photoEl = (cls, size='80') => d.photo
    ? `<div class="${cls}-photo"><img src="${d.photo}" alt="foto"/></div>`
    : `<div class="${cls}-ph">👤</div>`;

  const cts = [d.email, d.phone, d.alamat, d.linkedin, d.website].filter(Boolean);
  const ctHTML = suffix => cts.map(c => `<span class="${suffix}-ci">${c}</span>`).join('');

  const allSkills = [...d.hard, ...d.soft];
  const chipsFn = (cls, arr) => arr.length
    ? arr.map(s => `<span class="${cls}">${s}</span>`).join('')
    : '';

  const eduFn = (itemCls) => d.edus.filter(e=>e.inst).length
    ? d.edus.filter(e=>e.inst).map(e => `
      <div class="${itemCls}">
        <div class="${itemCls}title">${e.inst}</div>
        ${(e.jur||e.gel) ? `<div class="${itemCls}sub">${[e.jur,e.gel].filter(Boolean).join(' · ')}</div>` : ''}
        <div class="${itemCls}date">${[e.start,e.end].filter(Boolean).join(' – ')}${e.ipk?` · IPK ${e.ipk}`:''}</div>
      </div>`).join('')
    : '<div style="font-size:10px;color:#9ca3af;font-style:italic">Belum diisi</div>';

  const expFn = (itemCls) => d.exps.filter(e=>e.co).length
    ? d.exps.filter(e=>e.co).map(e => `
      <div class="${itemCls}">
        <div class="${itemCls}title">${e.pos}</div>
        <div class="${itemCls}sub">${e.co}${e.type?' · '+e.type:''}${e.loc?' · '+e.loc:''}</div>
        <div class="${itemCls}date">${[e.start,e.end].filter(Boolean).join(' – ')}</div>
        ${e.desc ? `<div class="${itemCls}desc">${e.desc.replace(/\n/g,'<br/>')}</div>` : ''}
      </div>`).join('')
    : '<div style="font-size:10px;color:#9ca3af;font-style:italic">Belum diisi</div>';

  const certFn = (itemCls) => d.certs.filter(c=>c.nama).map(c => `
    <div class="${itemCls}" style="margin-bottom:7px">
      <div class="${itemCls}title">${c.nama}</div>
      ${(c.iss||c.yr)?`<div class="${itemCls}date">${[c.iss,c.yr].filter(Boolean).join(' · ')}</div>`:''}
    </div>`).join('');

  if (tpl === 'tech') {
    const chips = chipsFn('ts-chip', allSkills);
    const langs = d.lang.map(l=>`<div class="ts-lang">${l}</div>`).join('');
    return `<div class="cvt tpl-tech">
      <div class="ts">
        ${photoEl('ts')}
        <div class="ts-name">${name}</div>
        <div class="ts-role">${role}</div>
        <div class="ts-div"></div>
        <div>
          <div class="ts-stl">Kontak</div>
          ${d.email?`<div class="ts-ci"><b>Email</b>${d.email}</div>`:''}
          ${d.phone?`<div class="ts-ci"><b>Telepon</b>${d.phone}</div>`:''}
          ${d.alamat?`<div class="ts-ci"><b>Lokasi</b>${d.alamat}</div>`:''}
          ${d.linkedin?`<div class="ts-ci"><b>LinkedIn</b>${d.linkedin}</div>`:''}
          ${d.website?`<div class="ts-ci"><b>Website</b>${d.website}</div>`:''}
          ${d.ttl?`<div class="ts-ci"><b>TTL</b>${d.ttl}</div>`:''}
        </div>
        ${chips?`<div><div class="ts-stl">Skills</div><div>${chips}</div></div>`:''}
        ${langs?`<div><div class="ts-stl">Bahasa</div>${langs}</div>`:''}
        ${d.hobi?`<div><div class="ts-stl">Hobi</div><div class="ts-hobi">${d.hobi}</div></div>`:''}
      </div>
      <div class="tm">
        <div class="tm-name">${name}</div>
        <div class="tm-role">${role}</div>
        ${d.ringkasan?`<div class="tm-sum">${d.ringkasan}</div>`:''}
        <div class="tm-sec">
          <div class="tm-stl">Pengalaman Kerja</div>
          ${expFn('tm-i')}
        </div>
        <div class="tm-sec">
          <div class="tm-stl">Pendidikan</div>
          ${eduFn('tm-i')}
        </div>
        ${certFn('tm-i')?`<div class="tm-sec"><div class="tm-stl">Sertifikat</div>${certFn('tm-i')}</div>`:''}
      </div>
    </div>`;
  }

  if (tpl === 'bisnis') {
    const chips = chipsFn('b-chip', allSkills);
    const langs = d.lang.map(l=>`<div class="b-lang">${l}</div>`).join('');
    return `<div class="cvt tpl-bisnis">
      <div class="th">
        ${photoEl('th')}
        <div>
          <div class="th-name">${name}</div>
          <div class="th-role">${role}</div>
          ${d.ttl?`<div style="font-size:10px;color:rgba(255,255,255,0.5);margin-top:2px">${d.ttl}</div>`:''}
          <div class="th-cts">${ctHTML('th')}</div>
        </div>
      </div>
      <div class="tgbar"></div>
      <div class="tb">
        <div>
          ${d.ringkasan?`<div class="b-sec"><div class="b-stl">Profil</div><div class="b-sum">${d.ringkasan}</div></div>`:''}
          <div class="b-sec"><div class="b-stl">Pengalaman Kerja</div>${expFn('b-i')}</div>
          <div class="b-sec"><div class="b-stl">Pendidikan</div>${eduFn('b-i')}</div>
          ${certFn('b-i')?`<div class="b-sec"><div class="b-stl">Sertifikat</div>${certFn('b-i')}</div>`:''}
        </div>
        <div>
          ${chips?`<div class="b-sec"><div class="b-stl">Skills</div>${chips}</div>`:''}
          ${langs?`<div class="b-sec"><div class="b-stl">Bahasa</div>${langs}</div>`:''}
          ${d.hobi?`<div class="b-sec"><div class="b-stl">Hobi</div><div style="font-size:10.5px;color:#555">${d.hobi}</div></div>`:''}
        </div>
      </div>
    </div>`;
  }

  if (tpl === 'desain') {
    const chips = chipsFn('d-chip', allSkills);
    const langs = d.lang.map(l=>`<div class="d-lang">${l}</div>`).join('');
    return `<div class="cvt tpl-desain">
      <div class="tstripe"></div>
      <div class="tinner">
        <div class="dh">
          ${photoEl('dh')}
          <div>
            <div class="dh-name">${name}</div>
            <div class="dh-role">${role}</div>
            ${d.ttl?`<div style="font-size:10px;color:#9ca3af;margin-top:2px">${d.ttl}</div>`:''}
            <div class="dh-cts">${cts.map(c=>`<span class="dh-ci">${c}</span>`).join('')}</div>
          </div>
        </div>
        <div class="db">
          <div class="dm">
            ${d.ringkasan?`<div class="d-sec"><div class="d-stl">Tentang Saya</div><div class="d-sum">${d.ringkasan}</div></div>`:''}
            <div class="d-sec"><div class="d-stl">Pengalaman</div>${expFn('d-i')}</div>
            <div class="d-sec"><div class="d-stl">Pendidikan</div>${eduFn('d-i')}</div>
            ${certFn('d-i')?`<div class="d-sec"><div class="d-stl">Sertifikat</div>${certFn('d-i')}</div>`:''}
          </div>
          <div class="ds">
            ${chips?`<div class="d-sec"><div class="d-stl">Skills</div><div>${chips}</div></div>`:''}
            ${langs?`<div class="d-sec"><div class="d-stl">Bahasa</div>${langs}</div>`:''}
            ${d.hobi?`<div class="d-sec"><div class="d-stl">Hobi</div><div class="d-lang">${d.hobi}</div></div>`:''}
          </div>
        </div>
      </div>
    </div>`;
  }

  if (tpl === 'medis') {
    const chips = chipsFn('m-chip', allSkills);
    const langs = d.lang.map(l=>`<div class="m-lang">${l}</div>`).join('');
    return `<div class="cvt tpl-medis">
      <div class="mh">
        ${photoEl('mh')}
        <div>
          <div class="mh-name">${name}</div>
          <div class="mh-role">${role}</div>
          ${d.ttl?`<div style="font-size:10px;color:#9ca3af;margin-top:2px">${d.ttl}</div>`:''}
          <div class="mh-cts">${ctHTML('mh')}</div>
        </div>
      </div>
      <div class="mb">
        <div>
          ${d.ringkasan?`<div class="m-sec"><div class="m-stl">Profil</div><div class="m-sum">${d.ringkasan}</div></div>`:''}
          <div class="m-sec"><div class="m-stl">Pengalaman</div>${expFn('m-i')}</div>
          <div class="m-sec"><div class="m-stl">Pendidikan</div>${eduFn('m-i')}</div>
          ${certFn('m-i')?`<div class="m-sec"><div class="m-stl">Sertifikat</div>${certFn('m-i')}</div>`:''}
        </div>
        <div>
          ${chips?`<div class="m-sec"><div class="m-stl">Skills</div><div>${chips}</div></div>`:''}
          ${langs?`<div class="m-sec"><div class="m-stl">Bahasa</div>${langs}</div>`:''}
          ${d.hobi?`<div class="m-sec"><div class="m-stl">Hobi</div><div class="m-lang">${d.hobi}</div></div>`:''}
        </div>
      </div>
    </div>`;
  }

  if (tpl === 'teknik') {
    const chips = chipsFn('k-chip', allSkills);
    const langs = d.lang.map(l=>`<div class="k-lang">${l}</div>`).join('');
    return `<div class="cvt tpl-teknik">
      <div class="kh">
        ${photoEl('kh')}
        <div>
          <div class="kh-name">${name}</div>
          <div class="kh-role">${role}</div>
          ${d.ttl?`<div style="font-size:10px;color:#71717a;margin-top:2px">${d.ttl}</div>`:''}
          <div class="kh-cts">${ctHTML('kh')}</div>
        </div>
      </div>
      <div class="kb">
        <div class="km">
          ${d.ringkasan?`<div class="k-sec"><div class="k-stl">Profil</div><div class="k-sum">${d.ringkasan}</div></div>`:''}
          <div class="k-sec"><div class="k-stl">Pengalaman</div>${expFn('k-i')}</div>
          <div class="k-sec"><div class="k-stl">Pendidikan</div>${eduFn('k-i')}</div>
          ${certFn('k-i')?`<div class="k-sec"><div class="k-stl">Sertifikat</div>${certFn('k-i')}</div>`:''}
        </div>
        <div class="ks">
          ${chips?`<div class="k-sec"><div class="k-stl">Skills</div><div>${chips}</div></div>`:''}
          ${langs?`<div class="k-sec"><div class="k-stl">Bahasa</div>${langs}</div>`:''}
          ${d.hobi?`<div class="k-sec"><div class="k-stl">Hobi</div><div class="k-lang">${d.hobi}</div></div>`:''}
        </div>
      </div>
    </div>`;
  }

  // formal
  const chips = chipsFn('f-chip', allSkills);
  const langs = d.lang.map(l=>`<div class="f-lang">${l}</div>`).join('');
  return `<div class="cvt tpl-formal">
    <div class="fh">
      ${d.photo
        ? `<div class="fh-photo"><img src="${d.photo}" alt="foto"/></div>`
        : `<div class="fh-ph">👤</div>`}
      <div class="fh-name">${name}</div>
      <div class="fh-role">${role}</div>
      ${d.ttl?`<div style="font-size:10px;color:#9ca3af;margin-top:2px">${d.ttl}</div>`:''}
      <div class="fh-cts">${ctHTML('fh')}</div>
    </div>
    <div class="fb">
      <div>
        ${d.ringkasan?`<div class="f-sec"><div class="f-stl">Profil</div><div class="f-sum">${d.ringkasan}</div></div>`:''}
        <div class="f-sec"><div class="f-stl">Pengalaman</div>${expFn('f-i')}</div>
        <div class="f-sec"><div class="f-stl">Pendidikan</div>${eduFn('f-i')}</div>
        ${certFn('f-i')?`<div class="f-sec"><div class="f-stl">Sertifikat</div>${certFn('f-i')}</div>`:''}
      </div>
      <div>
        ${chips?`<div class="f-sec"><div class="f-stl">Skills</div><div>${chips}</div></div>`:''}
        ${langs?`<div class="f-sec"><div class="f-stl">Bahasa</div>${langs}</div>`:''}
        ${d.hobi?`<div class="f-sec"><div class="f-stl">Hobi</div><div class="f-lang">${d.hobi}</div></div>`:''}
      </div>
    </div>
  </div>`;
}

/* ─── PREVIEW ─── */
function buildPreview() {
  const d = collect();
  document.getElementById('cv-frame').innerHTML = buildCV(d);
}

/* KEY FIX: Scale cv-frame to fit preview container */
function rescaleCV() {
  const frame = document.getElementById('cv-frame');
  const wrap  = document.querySelector('.cv-scale-wrap');
  if (!frame || !wrap) return;
  const containerW = wrap.parentElement.clientWidth;
  const scale = Math.min(1, (containerW - 2) / 794);
  frame.style.transform = `scale(${scale})`;
  // Set wrap height to match scaled content
  const frameH = frame.scrollHeight || 1122;
  wrap.style.height = (frameH * scale) + 'px';
}

/* ─── PDF DOWNLOAD ─── */
function downloadPDF() {
  const d    = collect();
  const nama = d.nama || 'CV';
  const frame = document.getElementById('cv-frame');
  const btn   = document.getElementById('btn-dl');

  // Temporarily remove scale transform for PDF capture
  const prevTransform = frame.style.transform;
  frame.style.transform = 'none';

  btn.classList.add('busy');
  btn.innerHTML = '⏳ Membuat PDF...';
  toast('⏳ Membuat PDF, mohon tunggu...', '');

  const opt = {
    margin:      0,
    filename:    `CV_${nama.replace(/\s+/g,'_')}.pdf`,
    image:       { type: 'jpeg', quality: 0.97 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      letterRendering: true,
      width: 794,
      windowWidth: 794,
    },
    jsPDF: { unit: 'px', format: [794, 1122], orientation: 'portrait', hotfixes: ['px_scaling'] },
  };

  html2pdf()
    .set(opt)
    .from(frame)
    .save()
    .then(() => {
      frame.style.transform = prevTransform;
      toast(`✓ CV "${nama}" berhasil diunduh!`, 'ok');
      btn.classList.remove('busy');
      btn.innerHTML = '⬇ Download PDF';
    })
    .catch(err => {
      frame.style.transform = prevTransform;
      console.error(err);
      toast('✗ Gagal PDF. Coba lagi.', 'err');
      btn.classList.remove('busy');
      btn.innerHTML = '⬇ Download PDF';
    });
}

/* ─── GAS ─── */
async function sendToGAS() {
  const url = document.getElementById('gas-url').value.trim();
  const msg = document.getElementById('gas-msg');
  if (!url) { toast('⚠ Isi URL Google Apps Script dulu!', 'err'); return; }
  msg.className = 'gas-msg loading'; msg.textContent = '⏳ Mengirim...';
  const d = collect();
  const payload = {
    ...d, photo: null,
    jurusan: d.jurusan?.val || '', template: d.jurusan?.tpl || '',
    timestamp: new Date().toISOString(),
  };
  try {
    await fetch(url, { method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain'}, body: JSON.stringify(payload) });
    msg.className = 'gas-msg ok'; msg.textContent = '✓ Tersimpan ke Google Sheets!';
    toast('✓ Data tersimpan ke Sheets!', 'ok');
  } catch(e) {
    msg.className = 'gas-msg fail'; msg.textContent = '✗ Gagal. Cek URL & setting GAS.';
    toast('✗ Gagal kirim', 'err');
  }
}

function resetForm() {
  if (!confirm('Buat CV baru? Semua data akan dihapus.')) return;
  location.reload();
}

/* ─── TOAST ─── */
function toast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 3500);
}
