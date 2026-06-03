const initialMatches = [
  { room: 1, time: '12.09', a: 'marga 21', b: 'LETSGOFAMILY' },
  { room: 2, time: '12.21', a: 'SURCINN VVIP', b: 'HEVEN 666' },
  { room: 3, time: '13.08', a: 'NEX4PLUS+', b: 'The tarik' },
  { room: 4, time: '13.23', a: 'INVASION AB', b: 'Volcano inti' },
  { room: 5, time: '13.45', a: 'Volcano Jr', b: 'The tarik inti' },
  { room: 6, time: '14.00', a: 'Dark Empire', b: 'Amfiteater area' },
  { room: 7, time: '14.03', a: 'Badut Neverde 77', b: 'Strong Hunter' },
  { room: 8, time: '16.47', a: 'Salvador New Era v1', b: 'MARGA 77' },
  { room: 9, time: '14.11', a: 'LS SYINDICATE', b: 'LS SYINDICATE V2' },
  { room: 10, time: '14.23', a: 'SUPER XOXO 666', b: 'VELOCITY AREA' },
  { room: 11, time: '14.34', a: 'BADUT ALL BASE', b: 'MARGA 19 INTI' },
  { room: 12, time: '16.30', a: 'MARGA 19 JR', b: 'Salvador New Era v2' },
  { room: 13, time: '15.10', a: 'REALLY 12', b: 'SUPERSTAR AL BASE' },
  { room: 14, time: '15.24', a: 'Ngawi 67', b: 'Kacaww maniaa' },
  { room: 15, time: '16.11', a: 'mpruyyXema', b: 'KAGE AREA', dq: 'mpruyyXema', autoWinner: 'KAGE AREA' },
  { room: 16, time: '16.23', a: 'Seven Six', b: 'Perker Junior' }
];

const representatives = {
  'marga 21': '6282184558745',
  'LETSGOFAMILY': '62881024466759',
  'SURCINN VVIP': '6289529471825',
  'HEVEN 666': '6283867095957',
  'NEX4PLUS+': '6289687322505',
  'The tarik': '6281529445011',
  'The tarik inti': '6281529445011',
  'INVASION AB': '6282382248469',
  'Volcano inti': '628987788247',
  'Volcano Jr': '628987788247',
  'Dark Empire': '6285717779968',
  'Amfiteater area': '6282326849667',
  'Badut Neverde 77': '6285767309058',
  'Strong Hunter': '6283878825412',
  'Salvador New Era v1': '6282211522089',
  'Salvador New Era v2': '6282211522089',
  'LS SYINDICATE': '6282225413813',
  'LS SYINDICATE V2': '6282225413813',
  'VELOCITY AREA': '6285837632058',
  'BADUT ALL BASE': '6285767309058',
  'MARGA 19 INTI': '6289531476999',
  'MARGA 19 JR': '6289531476999',
  'MARGA 77': '6287879132769',
  'REALLY 12': '6287796136228',
  'SUPERSTAR AL BASE': '6283137392104',
  'Ngawi 67': '62895384500258',
  'Kacaww maniaa': '6285872612480',
  'KAGE AREA': '6288227548222',
  'Seven Six': '6288214080453',
  'Perker Junior': '6283841056741'
};

const roundNames = ['Round 32', 'Round 16', 'Quarter Final', 'Semi Final', 'Final'];
const STORAGE_KEY = 'bettle-of-world-s1-bracket-v2';
let state = loadState();

function createInitialState() {
  const winners = Array(5).fill(null).map(() => []);
  winners[0][14] = 'KAGE AREA';
  return { winners };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.winners) return saved;
  } catch (e) {}
  return createInitialState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTeamsForRound(roundIndex) {
  if (roundIndex === 0) return initialMatches.map(m => [m.a, m.b]);
  const prevWinners = state.winners[roundIndex - 1] || [];
  const matches = [];
  for (let i = 0; i < Math.ceil(prevWinners.length / 2); i++) {
    matches.push([prevWinners[i * 2] || null, prevWinners[i * 2 + 1] || null]);
  }
  return matches;
}

function clearFollowing(roundIndex, matchIndex) {
  for (let r = roundIndex + 1; r < state.winners.length; r++) {
    state.winners[r] = [];
  }
}

function selectWinner(roundIndex, matchIndex, team) {
  if (!team) return;
  if (roundIndex === 0 && matchIndex === 14 && team === 'mpruyyXema') {
    showToast('mpruyyXema sudah diskualifikasi. KAGE AREA lolos otomatis.');
    return;
  }
  state.winners[roundIndex][matchIndex] = team;
  clearFollowing(roundIndex, matchIndex);
  saveState();
  render();
  showToast(`${team} dipilih sebagai pemenang.`);
}

function clearWinner(roundIndex, matchIndex) {
  if (roundIndex === 0 && matchIndex === 14) {
    state.winners[0][14] = 'KAGE AREA';
  } else {
    state.winners[roundIndex][matchIndex] = null;
  }
  clearFollowing(roundIndex, matchIndex);
  saveState();
  render();
}

function waLink(team) {
  const number = representatives[team];
  if (!number) return null;
  const text = encodeURIComponent(`Halo perwakilan ${team}, ini dari Bettle Of World S1.`);
  return `https://wa.me/${number}?text=${text}`;
}

function teamHtml(team, winner, roundIndex, matchIndex, isDQ = false) {
  if (!team) return `<div class="team empty"><span class="team-name">Menunggu pemenang</span></div>`;
  const isWinner = winner === team;
  const isLoser = winner && winner !== team;
  const link = waLink(team);
  const cls = ['team', 'selectable'];
  if (isWinner) cls.push('winner');
  if (isLoser) cls.push('loser');
  if (isDQ) cls.push('dq');
  return `
    <div class="${cls.join(' ')}" onclick="selectWinner(${roundIndex}, ${matchIndex}, '${escapeJs(team)}')">
      <span class="team-name">${team}</span>
      <span class="team-actions">
        ${isWinner ? '<span class="winmark">✓</span>' : ''}
        ${link ? `<a class="wa" href="${link}" target="_blank" onclick="event.stopPropagation()">WA</a>` : ''}
      </span>
    </div>`;
}

function render() {
  const bracket = document.getElementById('bracket');
  bracket.innerHTML = '';

  for (let r = 0; r < roundNames.length; r++) {
    const teams = getTeamsForRound(r);
    const round = document.createElement('section');
    round.className = 'round';
    round.innerHTML = `<h3>${roundNames[r]}</h3>`;

    teams.forEach((pair, i) => {
      if (r > 0 && !pair[0] && !pair[1]) return;
      const winner = state.winners[r]?.[i] || null;
      const match = document.createElement('div');
      match.className = 'match';
      const roomInfo = r === 0 ? `ROOM ${initialMatches[i].room}` : `MATCH ${i + 1}`;
      const timeInfo = r === 0 ? `<span class="time">JAM ${initialMatches[i].time}</span>` : '<span class="time">Next Round</span>';
      const dqInfo = r === 0 && i === 14 ? '<div class="dq-label">mpruyyXema DISKUALIFIKASI</div><div class="auto-label">KAGE AREA LOLOS OTOMATIS</div>' : '';

      match.innerHTML = `
        <div class="match-top"><span>${roomInfo}</span>${timeInfo}</div>
        ${teamHtml(pair[0], winner, r, i, r === 0 && i === 14 && pair[0] === 'mpruyyXema')}
        ${teamHtml(pair[1], winner, r, i, r === 0 && i === 14 && pair[1] === 'mpruyyXema')}
        ${dqInfo}
        <div class="small-buttons">
          <button class="mini clear" onclick="clearWinner(${r}, ${i})">Hapus pemenang</button>
        </div>`;
      round.appendChild(match);
    });

    bracket.appendChild(round);
  }

  const champion = state.winners[4]?.[0] || 'Belum ditentukan';
  document.getElementById('championName').textContent = champion;
}

function escapeJs(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function copyRecap() {
  let text = '🏆 BETTLE OF WORLD S1 - REKAP BRACKET\n\n';
  for (let r = 0; r < roundNames.length; r++) {
    const teams = getTeamsForRound(r);
    text += `${roundNames[r]}\n`;
    teams.forEach((pair, i) => {
      if (!pair[0] && !pair[1]) return;
      const winner = state.winners[r]?.[i] || '-';
      text += `${i + 1}. ${pair[0] || 'TBD'} VS ${pair[1] || 'TBD'} | Winner: ${winner}\n`;
    });
    text += '\n';
  }
  navigator.clipboard.writeText(text).then(() => showToast('Rekap bracket berhasil disalin.'));
}

document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Reset semua pemenang bracket? ROOM 15 tetap KAGE AREA auto lolos.')) {
    state = createInitialState();
    saveState();
    render();
    showToast('Bracket sudah direset.');
  }
});

document.getElementById('copyBtn').addEventListener('click', copyRecap);

render();
