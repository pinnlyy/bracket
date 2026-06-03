// ===============================
// BETTLE OF WORLD S1 - GITHUB PAGES SAFE MODE
// Cara update pemenang:
// 1. Edit bagian winners di bawah.
// 2. Commit / upload ulang ke GitHub Pages.
// 3. Pengunjung tidak bisa mengubah hasil dari web.
// ===============================

const representatives = {
  "marga 21": "6282184558745",
  "LETSGOFAMILY": "62881024466759",
  "SURCINN VVIP": "6289529471825",
  "HEVEN 666": "6283867095957",
  "NEX4PLUS+": "6289687322505",
  "The tarik": "6281529445011",
  "INVASION AB": "6282382248469",
  "Volcano inti": "628987788247",
  "Volcano Jr": "628987788247",
  "The tarik inti": "6281529445011",
  "Dark Empire": "6285717779968",
  "Amfiteater area": "6282326849667",
  "Badut Neverde 77": "6285767309058",
  "Strong Hunter": "6283878825412",
  "Salvador New Era v1": "6282211522089",
  "Salvador New Era v2": "6282211522089",
  "LS SYINDICATE": "6282225413813",
  "LS SYINDICATE V2": "6282225413813",
  "SUPER XOXO 666": "",
  "VELOCITY AREA": "6285837632058",
  "BADUT ALL BASE": "6285767309058",
  "MARGA 19 INTI": "6289531476999",
  "MARGA 19 JR": "6289531476999",
  "MARGA 77": "6287879132769",
  "REALLY 12": "6287796136228",
  "SUPERSTAR AL BASE": "6283137392104",
  "Ngawi 67": "62895384500258",
  "Kacaww maniaa": "6285872612480",
  "mpruyyXema": "",
  "KAGE AREA": "6288227548222",
  "Seven Six": "6288214080453",
  "Perker Junior": "6283841056741"
};

const firstRound = [
  { room: 1, time: "12.09", a: "marga 21", b: "LETSGOFAMILY" },
  { room: 2, time: "12.21", a: "SURCINN VVIP", b: "HEVEN 666" },
  { room: 3, time: "13.08", a: "NEX4PLUS+", b: "The tarik" },
  { room: 4, time: "13.23", a: "INVASION AB", b: "Volcano inti" },
  { room: 5, time: "13.45", a: "Volcano Jr", b: "The tarik inti" },
  { room: 6, time: "14.00", a: "Dark Empire", b: "Amfiteater area" },
  { room: 7, time: "14.03", a: "Badut Neverde 77", b: "Strong Hunter" },
  { room: 8, time: "16.47", a: "Salvador New Era v1", b: "MARGA 77" },
  { room: 9, time: "14.11", a: "LS SYINDICATE", b: "LS SYINDICATE V2" },
  { room: 10, time: "14.23", a: "SUPER XOXO 666", b: "VELOCITY AREA" },
  { room: 11, time: "14.34", a: "BADUT ALL BASE", b: "MARGA 19 INTI" },
  { room: 12, time: "16.30", a: "MARGA 19 JR", b: "Salvador New Era v2" },
  { room: 13, time: "15.10", a: "REALLY 12", b: "SUPERSTAR AL BASE" },
  { room: 14, time: "15.24", a: "Ngawi 67", b: "Kacaww maniaa" },
  { room: 15, time: "16.11", a: "mpruyyXema", b: "KAGE AREA", dq: "mpruyyXema", winner: "KAGE AREA" },
  { room: 16, time: "16.23", a: "Seven Six", b: "Perker Junior" }
];

// EDIT HASIL DI SINI SAJA.
// Contoh: 1: "LETSGOFAMILY" artinya pemenang Room 1 adalah LETSGOFAMILY.
// Untuk yang belum main, biarkan kosong / jangan ditulis.
const winners = {
  15: "KAGE AREA"
};

const roundNames = ["ROUND 32", "ROUND 16", "QUARTER FINAL", "SEMI FINAL", "FINAL"];
const bracketEl = document.getElementById("bracket");
const championEl = document.getElementById("champion");
let latestRounds = [];

function waLink(name){
  const number = representatives[name];
  const text = encodeURIComponent(`Halo perwakilan ${name}, terkait Bettle Of World S1.`);
  return number ? `https://wa.me/${number}?text=${text}` : null;
}

function teamHtml(name, winner, loser, dq){
  if(!name) return `<div class="team empty">Menunggu pemenang</div>`;
  const link = waLink(name);
  const cls = ["team"];
  if(winner === name) cls.push("winner");
  if(loser === name) cls.push("loser");
  if(dq === name) cls.push("dq-team");
  return `<div class="${cls.join(" ")}">
    ${link ? `<a href="${link}" target="_blank" rel="noopener">${name}</a>` : `<span>${name}</span>`}
    ${link ? `<span class="wa">WA</span>` : `<span class="wa" style="background:#94a3b8">No WA</span>`}
  </div>`;
}

function buildRounds(){
  const rounds = [];
  const r1 = firstRound.map(m => ({ ...m, winner: m.winner || winners[m.room] || "" }));
  rounds.push(r1);

  let previous = r1;
  let matchNumber = 17;
  while(previous.length > 1){
    const next = [];
    for(let i=0;i<previous.length;i+=2){
      const a = previous[i]?.winner || "";
      const b = previous[i+1]?.winner || "";
      const key = matchNumber;
      next.push({ room: key, time: "-", a, b, winner: winners[key] || "" });
      matchNumber++;
    }
    rounds.push(next);
    previous = next;
  }
  return rounds;
}

function render(){
  latestRounds = buildRounds();
  bracketEl.innerHTML = "";

  latestRounds.forEach((round, index) => {
    const roundEl = document.createElement("div");
    roundEl.className = "round";
    roundEl.innerHTML = `<h2>${roundNames[index]}</h2>`;

    round.forEach(match => {
      const winner = match.winner || "";
      const loser = winner ? (match.a === winner ? match.b : match.a) : "";
      const isDq = Boolean(match.dq);
      const matchEl = document.createElement("div");
      matchEl.className = `match ${winner ? "done" : ""} ${isDq ? "dq" : ""}`;
      matchEl.innerHTML = `
        <div class="match-title">
          <span>${index === 0 ? `ROOM ${match.room}` : `MATCH ${match.room}`}</span>
          <span class="time">${index === 0 ? `JAM ${match.time}` : "AUTO"}</span>
        </div>
        <div class="teams">
          ${teamHtml(match.a, winner, loser, match.dq)}
          <div class="vs">VS</div>
          ${teamHtml(match.b, winner, loser, match.dq)}
        </div>
        <div class="result">
          ${winner ? (isDq ? `❌ ${match.dq} DQ • 🏆 ${winner} lolos otomatis` : `🏆 Pemenang: ${winner}`) : "⏳ Belum ada pemenang"}
        </div>`;
      roundEl.appendChild(matchEl);
    });

    bracketEl.appendChild(roundEl);
  });

  const finalMatch = latestRounds[latestRounds.length - 1][0];
  if(finalMatch?.winner){
    championEl.classList.remove("hidden");
    championEl.innerHTML = `<h2>🏆 JUARA BETTLE OF WORLD S1</h2><h1>${finalMatch.winner}</h1>`;
  } else {
    championEl.classList.add("hidden");
  }
}

function copyBracket(){
  let text = "🏆 Bettle Of World S1 Bracket\n\n";
  latestRounds.forEach((round, idx) => {
    text += `${roundNames[idx]}\n`;
    round.forEach(m => {
      text += `${idx === 0 ? "ROOM" : "MATCH"} ${m.room}: ${m.a || "TBD"} VS ${m.b || "TBD"}`;
      text += m.winner ? ` → Pemenang: ${m.winner}` : " → Belum ada pemenang";
      if(m.dq) text += ` (${m.dq} DQ)`;
      text += "\n";
    });
    text += "\n";
  });
  navigator.clipboard.writeText(text).then(() => alert("Rekap bracket berhasil disalin."));
}


render();
