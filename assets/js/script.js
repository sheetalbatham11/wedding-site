// ===== PERSONALISE THESE VALUES BEFORE PUBLISHING =====
const CONFIG = {
  partnerOne: "Ravi",
  partnerTwo: "Sheetal",
  weddingDate: "2027-02-27T00:00:00+05:30",
  venueName: "Bhopal, Madhya Pradesh",
  venueAddress: "Bhopal, Madhya Pradesh, India",
  mapsUrl: "https://maps.app.goo.gl/BA7CgT13tcsQhm3XA",
  residenceMapsUrl: "https://maps.app.goo.gl/WX7qTrFr4rP4ZBv29?g_st=ic",
  whatsappNumber: "+919907360939"
};

// ===== EVENTS: edit times, names and dress codes here (English, Hindi) =====
const TRAD = [["#e6c44c","Yellow","पीला"],["#d9823b","Orange","नारंगी"],["#52764b","Green","हरा"],["#ffffff","White","सफेद"]];
const EVENTS = [
  {d:"25", w:["Thu","गुरु"], t:["4:00 PM onwards · At our residence","शाम 4:00 बजे से · हमारे निवास स्थान पर"], n:["Sundarkand & Ratri Jagran","सुंदरकांड एवं रात्रि जागरण"], dc:["Traditional ethnic attire","पारंपरिक भारतीय पोशाक"], map:true},
  {d:"26", w:["Fri","शुक्र"], t:["9:00 AM onwards · From our residence","सुबह 9:00 बजे से · हमारे निवास स्थान से"], n:["Mata Poojan · Haldi & Mehendi","माता पूजन · हल्दी एवं मेहंदी"], dc:["Rajasthani Poshak","राजस्थानी पोशाक"], c:TRAD},
  {d:"26", w:["Fri","शुक्र"], t:["7:00 PM onwards · At our residence","शाम 7:00 बजे से · हमारे निवास स्थान पर"], n:["Mandap & Peravni","मंडप एवं परवणी"], dc:["Traditional ethnic attire","पारंपरिक भारतीय पोशाक"], c:TRAD},
  {d:"27", w:["Sat","शनि"], t:["11:00 AM onwards","सुबह 11:00 बजे से"], n:["Tilak & Engagement","तिलक एवं सगाई"], dc:["Pastel colours","पेस्टल रंग"], c:[["#e9bfc9","Pastel Pink","पेस्टल गुलाबी"],["#b9a7d5","Lavender","लैवेंडर"],["#b8d9c4","Mint","मिंट"],["#d9c5a5","Beige","बेज"]]},
  {d:"27", w:["Sat","शनि"], t:["7:00 PM onwards","शाम 7:00 बजे से"], n:["Wedding Ceremony","शुभ विवाह"], dc:["Pink, red, maroon & off-white","गुलाबी, लाल, मैरून एवं ऑफ-व्हाइट"], c:[["#d889a4","Pink","गुलाबी"],["#b52d43","Red","लाल"],["#54182c","Maroon","मैरून"],["#f5eee2","Off-white","ऑफ-व्हाइट"]], featured:true}
];

function el(tag, cls, en, hi){
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (en !== undefined){ e.dataset.en = en; e.dataset.hi = hi; e.textContent = en; }
  return e;
}
function mandala(){
  let p = "";
  for (let i = 0; i < 16; i++){
    const a = i * 22.5;
    p += `<g transform="rotate(${a})"><ellipse cy="-62" rx="8" ry="24"/><circle cy="-92" r="3"/></g>`;
    if (i % 2 === 0) p += `<g transform="rotate(${a + 11.25})"><path d="M0-30Q10-45 0-58Q-10-45 0-30Z"/></g>`;
  }
  return `<svg viewBox="-100 -100 200 200" fill="none" stroke="currentColor" stroke-width=".6"><circle r="98"/><circle r="96"/><circle r="30"/><circle r="20"/>${p}</svg>`;
}
document.querySelectorAll(".mandala").forEach(e => e.innerHTML = mandala());

// Falling marigold petals in the hero
const petals = document.querySelector(".petals");
for (let i = 0; i < 16; i++){
  const s = document.createElement("i");
  s.style.cssText = `left:${Math.random()*100}%;animation-duration:${9+Math.random()*9}s;animation-delay:${-Math.random()*14}s;transform:scale(${.6+Math.random()*.8})`;
  petals.appendChild(s);
}

// Build the event cards
const timeline = document.getElementById("timeline");
EVENTS.forEach(ev => {
  const card = el("article", "ev" + (ev.featured ? " featured" : ""));
  const badge = el("div", "badge");
  const day = document.createElement("b"); day.textContent = ev.d;
  badge.append(day, el("span", "", "Feb", "फ़रवरी"), el("span", "", ev.w[0], ev.w[1]));
  const body = el("div", "ev-body");
  body.append(el("p", "event-time", ev.t[0], ev.t[1]));
  if (ev.map){
    const n = el("div", "residence-notice"), a = el("a", "", "⌖ View Address & Directions ↗", "⌖ पता एवं रास्ता देखें ↗");
    a.href = CONFIG.residenceMapsUrl; a.target = "_blank"; a.rel = "noopener";
    n.appendChild(a); body.appendChild(n);
  }
  body.appendChild(el("h3", "event-name", ev.n[0], ev.n[1]));
  const dress = el("div", "dress-code");
  dress.append(el("span", "dress-label", "Dress Code", "पोशाक"), el("p", "", ev.dc[0], ev.dc[1]));
  if (ev.c){
    const list = el("div", "colour-list");
    ev.c.forEach(c => { const s = el("span", "colour", c[1], c[2]); s.style.setProperty("--swatch", c[0]); list.appendChild(s); });
    dress.appendChild(list);
  }
  body.appendChild(dress);
  card.append(badge, body);
  timeline.appendChild(card);
});

const weddingTime = new Date(CONFIG.weddingDate).getTime();
const languageBtn = document.getElementById("languageBtn");
let currentLanguage = "en";

function updateCountdown(){
  let remaining = weddingTime - Date.now();
  if (remaining < 0) remaining = 0;
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  Object.entries(values).forEach(([id, v]) => document.getElementById(id).textContent = String(v).padStart(2, "0"));
}
updateCountdown();
setInterval(updateCountdown, 1000);

function setLanguage(language){
  currentLanguage = language;
  document.documentElement.lang = language;
  document.body.classList.toggle("hindi", language === "hi");
  document.querySelectorAll("[data-en][data-hi]").forEach(e => e.textContent = e.dataset[language]);
  languageBtn.textContent = language === "en" ? "हिंदी" : "English";
  languageBtn.setAttribute("aria-label", language === "en" ? "हिंदी में बदलें" : "Switch to English");
}
languageBtn.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "hi" : "en"));

document.getElementById("mapLink").href = CONFIG.mapsUrl;

document.getElementById("shareBtn").addEventListener("click", () => {
  const pageUrl = window.location.href;
  const names = `${CONFIG.partnerOne} & ${CONFIG.partnerTwo}`;
  const message = currentLanguage === "hi"
    ? `${names} के विवाह का सादर निमंत्रण! तारीख: 27 फरवरी 2027। स्थान: ${CONFIG.venueAddress}। अधिक जानकारी: ${pageUrl}`
    : `You're warmly invited to ${names}' wedding on 27 February 2027 in ${CONFIG.venueAddress}. Invitation: ${pageUrl}`;
  const number = (CONFIG.whatsappNumber || "").replace(/\D/g, "");
  const base = number ? `https://wa.me/${number}?text=` : "https://wa.me/?text=";
  window.open(base + encodeURIComponent(message), "_blank", "noopener,noreferrer");
});

document.getElementById("calendarBtn").addEventListener("click", () => {
  const start = new Date(CONFIG.weddingDate);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const format = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const esc = t => t.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Wedding Invitation//EN","CALSCALE:GREGORIAN","BEGIN:VEVENT",
    `DTSTAMP:${format(new Date())}`,`DTSTART:${format(start)}`,`DTEND:${format(end)}`,
    `SUMMARY:${esc(CONFIG.partnerOne + " & " + CONFIG.partnerTwo + " Wedding")}`,
    `LOCATION:${esc(CONFIG.venueAddress)}`,"DESCRIPTION:Wedding celebration in Bhopal","END:VEVENT","END:VCALENDAR"
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], {type: "text/calendar;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url; link.download = "wedding-invitation.ics";
  document.body.appendChild(link); link.click(); link.remove();
  URL.revokeObjectURL(url);
});

if ("IntersectionObserver" in window){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add("visible"); observer.unobserve(en.target); } });
  }, {threshold: 0.12});
  document.querySelectorAll(".reveal").forEach(e => observer.observe(e));
} else {
  document.querySelectorAll(".reveal").forEach(e => e.classList.add("visible"));
}

// ===== Click celebration: petals, sparkles, confetti, diyas and hearts =====
(function(){
  const hint = document.getElementById("fxHint");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches){ hint.remove(); return; }
  setTimeout(() => hint.classList.add("gone"), 9000);
  const cv = document.getElementById("fx"), ctx = cv.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let W, H, ps = [], rings = [], raf = 0, lastTrail = 0;
  function size(){ W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size(); addEventListener("resize", size);
  const COL = ["#e8a73a","#d9823b","#d65a7d","#fff1d0","#c7a46a","#b52d43","#f4c95d"];
  const EMO = ["🌼","🌸","💖","✨","🪔","🎊"];
  function burst(x, y, n){
    rings.push({x, y, r: 4, a: .9});
    for (let i = 0; i < n; i++){
      const ang = -Math.PI / 2 + (Math.random() - .5) * Math.PI * 1.7, sp = 4 + Math.random() * 9, r = Math.random();
      ps.push({x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, rot: Math.random() * 6, vr: (Math.random() - .5) * .35,
        s: 6 + Math.random() * 9, life: 1, decay: .006 + Math.random() * .008, c: COL[i % COL.length],
        t: r < .38 ? 0 : r < .62 ? 1 : r < .8 ? 2 : 3, e: EMO[i % EMO.length]});
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function star(s){
    ctx.beginPath();
    for (let i = 0; i < 8; i++){ const a = i * Math.PI / 4, r = i % 2 ? s * .25 : s; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    ctx.closePath(); ctx.fill();
  }
  function tick(){
    ctx.clearRect(0, 0, W, H);
    rings = rings.filter(g => g.a > .02);
    rings.forEach(g => { ctx.strokeStyle = `rgba(231,212,173,${g.a})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.x, g.y, g.r, 0, 7); ctx.stroke(); g.r += 5; g.a -= .035; });
    ps = ps.filter(p => p.life > 0 && p.y < H + 40);
    ps.forEach(p => {
      p.vx *= .985; p.vy = p.vy * .985 + (p.trail ? .03 : .22); p.x += p.vx + Math.sin(p.rot) * .6; p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
      ctx.save(); ctx.globalAlpha = Math.max(p.life, 0); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.t === 0){ ctx.beginPath(); ctx.ellipse(0, 0, p.s * .45, p.s * .8, 0, 0, 7); ctx.fill(); }
      else if (p.t === 1) star(p.s * 1.1);
      else if (p.t === 2) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      else { ctx.font = `${p.s * 2}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(p.e, 0, 0); }
      ctx.restore();
    });
    raf = (ps.length || rings.length) ? requestAnimationFrame(tick) : (ctx.clearRect(0, 0, W, H), 0);
  }
  if (matchMedia("(hover: none)").matches){
    hint.dataset.en = "✨ Tap anywhere to celebrate";
    hint.dataset.hi = "✨ जश्न मनाने के लिए कहीं भी टैप करें";
    hint.textContent = hint.dataset[currentLanguage];
  }
  // "click" fires on a tap but not while the finger is scrolling
  addEventListener("click", e => {
    const big = e.target.closest("#coupleNames,.badge,.featured,.count-unit");
    burst(e.clientX, e.clientY, big ? 80 : 38);
    hint.classList.add("gone");
  });
  // Soft gold sparkle trail behind a mouse cursor
  addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse" || e.timeStamp - lastTrail < 45) return;
    lastTrail = e.timeStamp;
    ps.push({x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * 1.2, vy: Math.random() * .8, rot: 0, vr: .08, s: 3 + Math.random() * 3, life: 1, decay: .035, c: "#e7d4ad", t: 1, trail: true});
    if (!raf) raf = requestAnimationFrame(tick);
  });
})();

document.title = `${CONFIG.partnerOne} & ${CONFIG.partnerTwo} — Wedding Invitation`;
document.getElementById("footerNames").textContent = `${CONFIG.partnerOne} & ${CONFIG.partnerTwo}`;
document.getElementById("coupleNames").innerHTML = `${CONFIG.partnerOne}<span class="ampersand">&amp;</span>${CONFIG.partnerTwo}`;
