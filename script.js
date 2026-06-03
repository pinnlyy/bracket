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
  { a: "mpruyyXema", b: "KAGE AREA", time: "16.11" },
  { a: "Seven Six", b: "Perker Junior", time: "16.23" },
];

const roomsContainer = document.getElementById("rooms");

rooms.forEach((room, index) => {
  const card = document.createElement("article");
  card.className = "room-card";

  card.innerHTML = `
    <div class="room-top">
      <div class="room-label">ROOM ${index + 1}</div>
      <div class="time">JAM ${room.time}</div>
    </div>

    <div class="battle">
      <div class="cc-name">${room.a}</div>
      <div class="vs">VS</div>
      <div class="cc-name">${room.b}</div>
    </div>
  `;

  roomsContainer.appendChild(card);
});
