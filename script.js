const representatives = {
  "marga 21": "6282184558745",
  "LETSGOFAMILY": "62881024466759",
  "SURCINN VVIP": "6289529471825",
  "HEVEN 666": "6283867095957",
  "NEX4PLUS+": "6289687322505",
  "The tarik": "6281529445011",
  "The tarik inti": "6281529445011",
  "INVASION AB": "6282382248469",
  "Volcano inti": "628987788247",
  "Volcano Jr": "628987788247",
  "Dark Empire": "6285717779968",
  "Amfiteater area": "6282326849667",
  "Badut Neverde 77": "6285767309058",
  "Strong Hunter": "6283878825412",
  "Salvador New Era v1": "6282211522089",
  "Salvador New Era v2": "6282211522089",
  "Salvador V2": "6282211522089",
  "LS SYINDICATE": "6282225413813",
  "LS SYINDICATE V2": "6282225413813",
  "VELOCITY AREA": "6285837632058",
  "BADUT ALL BASE": "6285767309058",
  "MARGA 19 INTI": "6289531476999",
  "MARGA 19 JR": "6289531476999",
  "MARGA 77": "6287879132769",
  "Marga 77": "6287879132769",
  "REALLY 12": "6287796136228",
  "SUPERSTAR AL BASE": "6283137392104",
  "Ngawi 67": "62895384500258",
  "Kacaww maniaa": "6285872612480",
  "KAGE AREA": "6288227548222",
  "Seven Six": "6288214080453",
  "Perker Junior": "6283841056741"
};

const rooms = [
  { a: "marga 21", b: "LETSGOFAMILY", time: "12.09" },
  { a: "SURCINN VVIP", b: "HEVEN 666", time: "12.21" },
  { a: "NEX4PLUS+", b: "The tarik", time: "13.08" },
  { a: "INVASION AB", b: "Volcano inti", time: "13.23" },
  { a: "Volcano Jr", b: "The tarik inti", time: "13.45" },
  { a: "Dark Empire", b: "Amfiteater area", time: "14.00" },
  { a: "Badut Neverde 77", b: "Strong Hunter", time: "14.03" },
  { a: "Salvador New Era v1", b: "Marga 77", time: "16.47" },
  { a: "LS SYINDICATE", b: "LS SYINDICATE V2", time: "14.11" },
  { a: "SUPER XOXO 666", b: "VELOCITY AREA", time: "14.23" },
  { a: "BADUT ALL BASE", b: "MARGA 19 INTI", time: "14.34" },
  { a: "MARGA 19 JR", b: "Salvador V2", time: "16.30" },
  { a: "REALLY 12", b: "SUPERSTAR AL BASE", time: "15.10" },
  { a: "Ngawi 67", b: "Kacaww maniaa", time: "15.24" },
  { a: "mpruyyXema", b: "KAGE AREA", time: "16.11", dq: true, winner: "KAGE AREA", note: "mpruyyXema DISKUALIFIKASI • KAGE AREA LOLOS OTOMATIS" },
  { a: "Seven Six", b: "Perker Junior", time: "16.23" },
];

const roomsContainer = document.getElementById("rooms");

function getPhone(name) {
  if (representatives[name]) return representatives[name];
  const foundKey = Object.keys(representatives).find(
    key => key.toLowerCase() === name.toLowerCase()
  );
  return foundKey ? representatives[foundKey] : null;
}

function createCcButton(name, room) {
  const phone = getPhone(name);
  const button = document.createElement("button");
  button.className = "cc-name";
  button.type = "button";
  button.textContent = name;

  if (room.dq && name.toLowerCase() === "mpruyyxema") {
    button.classList.add("dq-team");
    button.innerHTML = `${name}<span>DISKUALIFIKASI</span>`;
    button.onclick = () => alert("mpruyyXema sudah diskualifikasi.");
    return button;
  }

  if (room.winner && room.winner.toLowerCase() === name.toLowerCase()) {
    button.classList.add("winner-team");
  }

  button.onclick = () => {
    if (!phone) {
      alert(`Nomor perwakilan ${name} belum tersedia.`);
      return;
    }

    const message = encodeURIComponent(`Halo perwakilan ${name}, saya dari Bettle Of World S1.`);
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return button;
}

rooms.forEach((room, index) => {
  const card = document.createElement("article");
  card.className = "room-card";
  if (room.dq) card.classList.add("dq-card");

  const top = document.createElement("div");
  top.className = "room-top";
  top.innerHTML = `
    <div class="room-label">ROOM ${index + 1}</div>
    <div class="time">JAM ${room.time}</div>
  `;

  const battle = document.createElement("div");
  battle.className = "battle";
  battle.appendChild(createCcButton(room.a, room));

  const vs = document.createElement("div");
  vs.className = "vs";
  vs.textContent = room.dq ? "WO" : "VS";
  battle.appendChild(vs);

  battle.appendChild(createCcButton(room.b, room));

  card.appendChild(top);
  card.appendChild(battle);

  if (room.note) {
    const note = document.createElement("div");
    note.className = "room-note";
    note.textContent = room.note;
    card.appendChild(note);
  }

  roomsContainer.appendChild(card);
});
