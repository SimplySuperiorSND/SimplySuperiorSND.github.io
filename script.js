/* =========================================================
   TAB NAVIGATION
   ========================================================= */
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');

function activateTab(name){
  tabButtons.forEach(btn => {
    const active = btn.dataset.tab === name;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active);
  });
  panels.forEach(panel => panel.classList.toggle('is-active', panel.id === name));
  history.replaceState(null, '', '#' + name);
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

document.querySelectorAll('[data-tab-link]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    activateTab(link.dataset.tabLink);
  });
});

// Load tab from URL hash on page load
const initialTab = window.location.hash.replace('#', '');
if (initialTab && document.getElementById(initialTab)) {
  activateTab(initialTab);
}

/* =========================================================
   STATS DATA — edit these to keep your page current
   ========================================================= */
const statData = {
  summary: [
    { label: 'K/D Ratio',   value: '1.42' },
    { label: 'Win Rate',    value: '58%'  },
    { label: 'SPM',         value: '312'  },
    { label: 'Matches',     value: '146'  },
  ],
  weapons: [
    { weapon: 'MSMC',   kills: 812, kd: '1.51', accuracy: '19%', headshots: 94  },
    { weapon: 'MP7',    kills: 540, kd: '1.38', accuracy: '17%', headshots: 61  },
    { weapon: 'Ballista', kills: 210, kd: '1.65', accuracy: '41%', headshots: 88 },
  ],
  matches: [
    { date: '2026-07-14', map: 'Raid',      result: 'Win',  score: '6-3', kd: '1.8' },
    { date: '2026-07-13', map: 'Standoff',  result: 'Win',  score: '6-4', kd: '1.4' },
    { date: '2026-07-13', map: 'Hijacked',  result: 'Loss', score: '3-6', kd: '0.9' },
    { date: '2026-07-12', map: 'Meltdown',  result: 'Win',  score: '6-2', kd: '2.1' },
  ]
};

function renderStats(){
  const summaryEl = document.getElementById('statSummary');
  summaryEl.innerHTML = statData.summary.map(s => `
    <div class="stat-box">
      <span class="label">${s.label}</span>
      <span class="value">${s.value}</span>
    </div>
  `).join('');

  const weaponBody = document.querySelector('#weaponTable tbody');
  weaponBody.innerHTML = statData.weapons.map(w => `
    <tr>
      <td>${w.weapon}</td>
      <td>${w.kills}</td>
      <td>${w.kd}</td>
      <td>${w.accuracy}</td>
      <td>${w.headshots}</td>
    </tr>
  `).join('');

  const matchBody = document.querySelector('#matchTable tbody');
  matchBody.innerHTML = statData.matches.map(m => `
    <tr>
      <td>${m.date}</td>
      <td>${m.map}</td>
      <td class="${m.result === 'Win' ? 'win' : 'loss'}">${m.result}</td>
      <td>${m.score}</td>
      <td>${m.kd}</td>
    </tr>
  `).join('');
}

/* =========================================================
   DEMO DATA — edit these to list your own demo files
   Each "url" should point to wherever you host the .dem file
   (a GitHub Release asset, Google Drive link, Discord link, etc.)
   ========================================================= */
const demoData = [
  {
    title: 'Raid — Match Point Clutch',
    map: 'Raid',
    date: '2026-07-14',
    tag: 'SND',
    url: '#'
  },
  {
    title: 'Standoff — Ace Round 5',
    map: 'Standoff',
    date: '2026-07-13',
    tag: 'SND',
    url: '#'
  },
  {
    title: 'Meltdown — Full VOD',
    map: 'Meltdown',
    date: '2026-07-12',
    tag: 'SND',
    url: '#'
  },
];

function renderDemos(){
  const grid = document.getElementById('demoGrid');
  grid.innerHTML = demoData.map(d => `
    <div class="demo-card">
      <span class="corner tl"></span><span class="corner br"></span>
      <span class="tag">${d.tag} // ${d.map}</span>
      <h3>${d.title}</h3>
      <span class="meta">${d.date}</span>
      <a class="dl" href="${d.url}" download>DOWNLOAD .DEM ↓</a>
    </div>
  `).join('');
}

/* =========================================================
   BANNED DATA — edit these to list players removed from
   your lobbies/servers. Keep evidence linked before publishing.
   ========================================================= */
const bannedData = [
  {
    player: 'xXExampleXx',
    reason: 'Aimbot / wallhack',
    date: '2026-07-10',
    status: 'perm', // 'perm' or 'temp'
    statusLabel: 'Permanent',
    evidenceUrl: '#'
  },
  {
    player: 'SampleUser22',
    reason: 'Repeated teamkilling',
    date: '2026-07-05',
    status: 'temp',
    statusLabel: '7-Day',
    evidenceUrl: '#'
  },
  {
    player: 'PlaceholderName',
    reason: 'Toxic voice chat / harassment',
    date: '2026-06-29',
    status: 'perm',
    statusLabel: 'Permanent',
    evidenceUrl: '#'
  },
];

function renderBanned(){
  const body = document.querySelector('#bannedTable tbody');
  body.innerHTML = bannedData.map(b => `
    <tr>
      <td>${b.player}</td>
      <td>${b.reason}</td>
      <td>${b.date}</td>
      <td><span class="status-badge ${b.status}">${b.statusLabel}</span></td>
      <td class="evidence">${b.evidenceUrl && b.evidenceUrl !== '#' ? `<a href="${b.evidenceUrl}" target="_blank" rel="noopener">View →</a>` : '—'}</td>
    </tr>
  `).join('');
}

renderStats();
renderDemos();
renderBanned();
