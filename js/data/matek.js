/* Tudás-sziget – MATEMATIKA (4. évfolyam, 2020-as NAT / kerettanterv) */
window.TS = window.TS || { subjects: [] };

(function () {
  'use strict';

  /* ---------- Segédfüggvények a generátorokhoz ---------- */
  function R(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function P(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuf(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function rep(s, n) { var o = ''; for (var i = 0; i < n; i++) o += s; return o; }
  // Ezres tagolás szóközzel (4 jegytől), negatív számnál − jel
  function F(n) {
    if (n < 0) return '−' + F(-n);
    var s = String(n);
    if (s.length < 4) return s;
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  function T(n) { return F(n) + ' °C'; }

  // Számhoz illő toldalék (tárgyeset, részes eset, eszközhatározó, -szor)
  var SUF = {
    acc: { z: 'át', u: ['', 'et', 't', 'at', 'et', 'öt', 'ot', 'et', 'at', 'et'], t: ['', 'et', 'at', 'at', 'et', 'et', 'at', 'et', 'at', 'et'], h: 'at', th: 'et' },
    dat: { z: 'nak', u: ['', 'nek', 'nek', 'nak', 'nek', 'nek', 'nak', 'nek', 'nak', 'nek'], t: ['', 'nek', 'nak', 'nak', 'nek', 'nek', 'nak', 'nek', 'nak', 'nek'], h: 'nak', th: 'nek' },
    ins: { z: 'val', u: ['', 'gyel', 'vel', 'mal', 'gyel', 'tel', 'tal', 'tel', 'cal', 'cel'], t: ['', 'zel', 'szal', 'cal', 'nel', 'nel', 'nal', 'nel', 'nal', 'nel'], h: 'zal', th: 'rel' },
    szor: { z: 'szor', u: ['', 'szer', 'szer', 'szor', 'szer', 'ször', 'szor', 'szer', 'szor', 'szer'], t: ['', 'szer', 'szor', 'szor', 'szer', 'szer', 'szor', 'szer', 'szor', 'szer'], h: 'szor', th: 'szer' }
  };
  function sx(n, kind) {
    var tb = SUF[kind], m = Math.abs(n), s;
    if (m === 0) s = tb.z;
    else if (m % 10) s = tb.u[m % 10];
    else if (m % 100) s = tb.t[(m % 100) / 10];
    else if (m % 1000) s = tb.h;
    else s = tb.th;
    return F(n) + '-' + s;
  }
  // névelő a tört elé (1/…, 5/… → az)
  function fart(num) { return (num === 1 || num === 5) ? 'az' : 'a'; }

  // Feleletválasztós kérdés számokkal: mindig 3 különböző rossz válasz
  function numMC(d, q, ans, cands, ex, o) {
    o = o || {};
    var fm = o.fmt || F, suf = o.suf || '', min = (o.min === undefined) ? 0 : o.min;
    var max = (o.max === undefined) ? Infinity : o.max;
    var w = [];
    function add(v) {
      if (typeof v !== 'number' || !isFinite(v) || v % 1 !== 0 || v === ans || v < min || v > max || w.indexOf(v) >= 0) return;
      w.push(v);
    }
    shuf(cands || []).forEach(add);
    for (var i = 1; w.length < 3 && i < 5000; i++) { add(ans + i); add(ans - i); }
    w = w.slice(0, 3);
    var r = { t: 'mc', d: d, q: q, a: [fm(ans) + suf].concat(w.map(function (v) { return fm(v) + suf; })), ex: ex };
    if (o.pic) r.pic = o.pic;
    return r;
  }
  // Feleletválasztós kérdés szövegekkel
  function strMC(d, q, right, wrongs, ex, o) {
    o = o || {};
    right = String(right);
    var w = [];
    shuf(wrongs).forEach(function (x) { x = String(x); if (x !== right && w.indexOf(x) < 0) w.push(x); });
    if (w.length < 2) throw new Error('strMC: kevés rossz válasz: ' + q);
    var r = { t: 'mc', d: d, q: q, a: [right].concat(w.slice(0, 3)), ex: ex };
    if (o.pic) r.pic = o.pic;
    return r;
  }
  function inp(d, q, ans, ex, unit) {
    var a = (typeof ans === 'number') ? (ans < 0 ? [String(ans), '−' + Math.abs(ans)] : String(ans)) : ans;
    var r = { t: 'input', d: d, q: q, a: a, ex: ex };
    if (unit) r.unit = unit;
    return r;
  }
  function tf(d, q, a, ex) { return { t: 'tf', d: d, q: q, a: !!a, ex: ex }; }
  function distinct(n, f) { // n különböző érték egy generátorból
    var out = [], guard = 0;
    while (out.length < n && guard++ < 1000) { var v = f(); if (out.indexOf(v) < 0) out.push(v); }
    return out;
  }
  var NEVEK = ['Panni', 'Bence', 'Lili', 'Márk', 'Zsófi', 'Dani', 'Nóra', 'Peti', 'Kati', 'Gergő', 'Emma', 'Bálint', 'Hanna', 'Levente'];

  // Római számok
  var ROM = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  function romParts(n) {
    var parts = [];
    for (var i = 0; i < ROM.length; i++) { while (n >= ROM[i][0]) { parts.push(ROM[i]); n -= ROM[i][0]; } }
    return parts;
  }
  function toRoman(n) { return romParts(n).map(function (p) { return p[1]; }).join(''); }
  function romEx(n) {
    var p = romParts(n);
    return toRoman(n) + ' = ' + p.map(function (x) { return x[1]; }).join(' + ') + ' = ' + p.map(function (x) { return F(x[0]); }).join(' + ') + ' = ' + F(n) + '.';
  }

  /* =====================================================================
     1. SZÁMOK 10 000-IG
     ===================================================================== */
  var szamkor = {
    id: 'szamkor',
    name: 'Számok 10 000-ig',
    icon: '🔟',
    learn: [
      { title: 'Helyi értékek', text: 'A négyjegyű számokban négy helyi érték van: ezresek, százasok, tízesek és egyesek. Jobbról balra haladva minden hely tízszer annyit ér, mint az előző. A 10 000 már ötjegyű szám: tízezer.', example: 'Pl.: 3 482 = 3 ezres + 4 százas + 8 tízes + 2 egyes' },
      { title: 'Alaki, helyi és valódi érték', text: 'Az alaki érték maga a számjegy. A helyi érték megmutatja, melyik helyen áll (ezres, százas, tízes, egyes). A valódi érték az, amennyit a számjegy azon a helyen ténylegesen ér.', example: 'Pl.: a 4 735-ben a 7 alaki értéke 7, helyi értéke százas, valódi értéke 700.' },
      { title: 'Számszomszédok és számegyenes', text: 'Az egyes szomszédok 1-gyel kisebbek és nagyobbak. A tízes szomszédok a két legközelebbi kerek tízes, a százas szomszédok a két legközelebbi kerek százas. A számegyenesen jobbra haladva nőnek a számok.', example: 'Pl.: a 4 736 tízes szomszédai: 4 730 és 4 740; százas szomszédai: 4 700 és 4 800.' },
      { title: 'Kerekítés', text: 'Kerekítéskor a kerekítés helyétől közvetlenül jobbra álló számjegyet nézzük. Ha ez 0, 1, 2, 3 vagy 4, lefelé kerekítünk; ha 5, 6, 7, 8 vagy 9, felfelé.', example: 'Pl.: 3 482 ≈ 3 480 (tízesre), ≈ 3 500 (százasra), ≈ 3 000 (ezresre)' },
      { title: 'Római számok', text: 'A rómaiak betűkkel írták a számokat: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Az egyforma jeleket összeadjuk. Ha kisebb jel áll a nagyobb előtt, kivonjuk (IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900).', example: 'Pl.: MMXXVI = 1000 + 1000 + 10 + 10 + 5 + 1 = 2026' }
    ],
    questions: [
      { t: 'mc', d: 1, q: 'Melyik számjegy áll a százasok helyén a 3 482-ben?', a: ['4', '3', '8', '2'], ex: 'A 3 482-ben: 3 ezres, 4 százas, 8 tízes, 2 egyes. A százasok helyén a 4 áll.' },
      { t: 'mc', d: 1, q: 'Melyik szám ez? 5 ezres + 2 százas + 7 tízes + 1 egyes', a: ['5 271', '5 721', '2 571', '5 217'], ex: 'Írd egymás után a számjegyeket az ezresektől az egyesekig: 5 271.' },
      { t: 'mc', d: 1, q: 'Mennyi a 7 valódi értéke a 4 735-ben?', a: ['700', '7', '70', '7 000'], ex: 'A 7 a százasok helyén áll, ezért 7 százast ér, vagyis 700-at.' },
      { t: 'mc', d: 2, q: 'Mi a 6 helyi értéke a 6 205-ben?', a: ['ezres', 'százas', 'tízes', 'egyes'], ex: 'A 6 205-ben a 6 az első, legnagyobb helyen áll: ez az ezresek helye.' },
      { t: 'mc', d: 1, q: 'Melyik szám következik a 2 999 után?', a: ['3 000', '2 998', '3 999', '2 900'], ex: 'A rákövetkező szám 1-gyel nagyobb: 2 999 + 1 = 3 000.' },
      { t: 'mc', d: 2, q: 'Melyek a 4 736 tízes szomszédai?', a: ['4 730 és 4 740', '4 700 és 4 800', '4 735 és 4 737', '4 720 és 4 730'], ex: 'A 4 736 két kerek tízes közé esik: 4 730 < 4 736 < 4 740.' },
      { t: 'mc', d: 2, q: 'Kerekítsd százasra: 3 482!', a: ['3 500', '3 400', '3 480', '3 000'], ex: 'A tízesek helyén 8 áll, ez 5 vagy több, ezért felfelé kerekítünk: 3 500.' },
      { t: 'mc', d: 2, q: 'Kerekítsd ezresre: 6 750!', a: ['7 000', '6 000', '6 800', '6 700'], ex: 'A százasok helyén 7 áll, ezért felfelé kerekítünk: 7 000.' },
      { t: 'mc', d: 1, q: 'Kerekítsd tízesre: 247!', a: ['250', '240', '200', '300'], ex: 'Az egyesek helyén 7 áll, ezért felfelé kerekítünk: 250.' },
      { t: 'mc', d: 1, q: 'Melyik római szám jelöli a 10-et?', a: ['X', 'V', 'L', 'C'], ex: 'X = 10, V = 5, L = 50, C = 100.' },
      { t: 'mc', d: 2, q: 'Melyik számot jelöli a XIV római szám?', a: ['14', '16', '104', '15'], ex: 'XIV = X + IV = 10 + 4 = 14. Az I a V előtt áll, ezért kivonjuk.' },
      { t: 'mc', d: 3, q: 'Hogyan írjuk római számmal a 2026-ot?', a: ['MMXXVI', 'MMXXIV', 'MMXVI', 'MCMXXVI'], ex: '2026 = 2000 + 20 + 6 = MM + XX + VI = MMXXVI.' },
      { t: 'mc', d: 2, q: 'Melyik a legnagyobb szám?', a: ['9 010', '9 001', '8 999', '9 000'], ex: 'Balról hasonlítunk: az ezresek egyformák (9), a százasok is (0), a tízeseknél a 9 010 nyer.' },
      { t: 'mc', d: 3, q: 'Melyik a legnagyobb olyan négyjegyű szám, amelyben minden számjegy különböző?', a: ['9 876', '9 999', '9 870', '9 867'], ex: 'Elöl a lehető legnagyobb jegyek álljanak, csökkenő sorrendben: 9, 8, 7, 6 → 9 876.' },
      { t: 'mc', d: 2, q: 'A számegyenesen melyik szám van pontosan félúton 2 000 és 3 000 között?', a: ['2 500', '2 050', '2 250', '2 900'], ex: 'A két szám különbsége 1 000, ennek fele 500. 2 000 + 500 = 2 500.' },
      { t: 'mc', d: 3, q: 'Melyik számból lesz 4 300, ha százasra kerekítjük?', a: ['4 349', '4 350', '4 249', '4 360'], ex: 'A 4 349-ben a tízesek helyén 4 áll, ezért lefelé kerekítünk: 4 300. A 4 350 már 4 400 lenne.' },
      { t: 'tf', d: 1, q: 'A 3 050-ben a százasok helyén 0 áll.', a: true, ex: 'Igaz! 3 050 = 3 ezres + 0 százas + 5 tízes + 0 egyes.' },
      { t: 'tf', d: 1, q: 'A 4 999 nagyobb, mint az 5 000.', a: false, ex: 'Hamis. Az 5 000 a nagyobb, mert 5 ezrese van, a 4 999-nek csak 4.' },
      { t: 'tf', d: 2, q: 'A 8 495-öt százasra kerekítve 8 500-at kapunk.', a: true, ex: 'Igaz! A tízesek helyén 9 áll, ezért felfelé kerekítünk: 8 500.' },
      { t: 'tf', d: 2, q: 'A római számok között van külön jel a nullára.', a: false, ex: 'Hamis. A rómaiak nem használtak jelet a nullára.' },
      { t: 'tf', d: 3, q: 'A 9 999 rákövetkezője a 10 000, ami már ötjegyű szám.', a: true, ex: 'Igaz! 9 999 + 1 = 10 000, ennek öt számjegye van.' },
      { t: 'input', d: 1, q: 'Írd le számjegyekkel: kétezer-háromszázötven!', a: '2350', ex: 'Kétezer = 2 000, háromszáz = 300, ötven = 50 → 2 350.' },
      { t: 'input', d: 2, q: 'Hány tízes van összesen a 3 480-ban?', a: '348', ex: '3 480 = 348 · 10, tehát összesen 348 tízesből áll.' },
      { t: 'input', d: 2, q: 'Melyik számot jelöli a CXL római szám?', a: '140', ex: 'CXL = C + XL = 100 + 40 = 140.' },
      { t: 'input', d: 1, q: 'Melyik szám áll közvetlenül a 7 000 előtt?', a: '6999', ex: 'A megelőző szám 1-gyel kisebb: 7 000 − 1 = 6 999.' },
      { t: 'input', d: 3, q: 'Kerekítsd százasra: 9 962!', a: '10000', ex: 'A tízesek helyén 6 áll, ezért felfelé kerekítünk: 9 962 ≈ 10 000.' },
      { t: 'order', d: 1, q: 'Rendezd növekvő sorrendbe!', a: ['2 087', '2 708', '2 780', '7 028'], ex: 'Először az ezreseket hasonlítsd, ha egyformák, akkor a százasokat, majd a tízeseket.' },
      { t: 'order', d: 2, q: 'Rendezd csökkenő sorrendbe!', a: ['6 543', '6 534', '6 453', '5 643'], ex: 'Csökkenő sorrend: a legnagyobbtól a legkisebbig. Balról hasonlítsd a számjegyeket!' },
      { t: 'order', d: 3, q: 'Rendezd a római számokat növekvő sorrendbe!', a: ['XIX', 'XL', 'LX', 'XC'], ex: 'XIX = 19, XL = 40, LX = 60, XC = 90.' },
      { t: 'match', d: 2, q: 'Párosítsd a római számot az értékével!', a: [['V', '5'], ['L', '50'], ['C', '100'], ['M', '1000']], ex: 'V = 5, L = 50, C = 100, M = 1000.' },
      { t: 'match', d: 2, q: 'Párosítsd a számot a százasra kerekített értékével!', a: [['1 249', '1 200'], ['1 251', '1 300'], ['1 360', '1 400']], ex: 'Nézd a tízesek helyét: 4 → lefelé, 5 vagy 6 → felfelé kerekítünk.' },
      { t: 'match', d: 1, q: 'Párosítsd a felbontást a számmal!', a: [['3 ezres + 5 tízes', '3 050'], ['3 ezres + 5 százas', '3 500'], ['3 ezres + 5 egyes', '3 005']], ex: 'Ahol nincs számjegy, oda 0 kerül: 3 ezres + 5 tízes = 3 050.' },
      { t: 'group', d: 2, q: 'Válogasd szét az ezresre kerekítés szerint!', groups: { 'Ezresre kerekítve 5 000': ['4 500', '4 999', '5 299'], 'Ezresre kerekítve 4 000': ['4 499', '3 500', '4 050'] }, ex: 'Nézd a százasok helyét: 5 vagy több → felfelé, 4 vagy kevesebb → lefelé.' },
      { t: 'group', d: 1, q: 'Páros vagy páratlan?', groups: { 'Páros': ['2 468', '1 000', '3 572'], 'Páratlan': ['1 001', '4 567', '9 999'] }, ex: 'Csak az utolsó számjegyet kell nézni: 0, 2, 4, 6, 8 → páros.' }
    ],
    gen: function (d) {
      var lo = d === 1 ? 100 : 1000, hi = d === 1 ? 999 : 9999;
      var n = R(lo, hi), k = R(0, 7), u, r, i;
      if (k === 0) { // valódi érték
        var pl = d === 1 ? [[100, 'a százasok'], [10, 'a tízesek'], [1, 'az egyesek']] : [[1000, 'az ezresek'], [100, 'a százasok'], [10, 'a tízesek'], [1, 'az egyesek']];
        var p = P(pl), dg = Math.floor(n / p[0]) % 10;
        if (dg === 0) { dg = R(1, 9); n += dg * p[0]; }
        var v = dg * p[0];
        return numMC(d, 'Ebben a számban: ' + F(n) + '. Mennyi ' + p[1] + ' helyén álló számjegy valódi értéke?', v, [dg, dg * 10, dg * 100, dg * 1000],
          'Ezen a helyen ' + dg + ' áll, ezért a valódi értéke ' + dg + ' · ' + F(p[0]) + ' = ' + F(v) + '.');
      }
      if (k === 1) { // kerekítés
        var us = d === 1 ? [[10, 'tízesre', 'az egyesek'], [100, 'százasra', 'a tízesek']] : [[10, 'tízesre', 'az egyesek'], [100, 'százasra', 'a tízesek'], [1000, 'ezresre', 'a százasok']];
        var pu = P(us); u = pu[0];
        if (n % u === 0) n += R(1, u - 1);
        r = Math.round(n / u) * u;
        var dig = Math.floor(n / (u / 10)) % 10;
        var q1 = 'Kerekítsd ' + pu[1] + ': ' + F(n) + '!';
        var e1 = 'Nézd meg ' + pu[2] + ' helyét: ott ' + dig + ' áll, ezért ' + (dig >= 5 ? 'felfelé' : 'lefelé') + ' kerekítünk: ' + F(r) + '.';
        if (R(0, 1)) return inp(d, q1, r, e1);
        return numMC(d, q1, r, [r - u, r + u, Math.floor(n / u) * u, Math.ceil(n / u) * u, Math.round(n / (u * 10)) * u * 10, Math.round(n / (u / 10)) * (u / 10)], e1);
      }
      if (k === 2) { // szomszédok
        var un = d === 1 ? [[10, 'tízes'], [100, 'százas']] : [[10, 'tízes'], [100, 'százas'], [1000, 'ezres']];
        var pn = P(un); u = pn[0];
        if (n % u === 0) n += R(1, u - 1);
        var low = Math.floor(n / u) * u;
        return strMC(d, 'Melyek ennek a számnak a ' + pn[1] + ' szomszédai: ' + F(n) + '?', F(low) + ' és ' + F(low + u),
          [F(low - u) + ' és ' + F(low), F(low + u) + ' és ' + F(low + 2 * u), F(n - 1) + ' és ' + F(n + 1)],
          'Két szomszédos kerek ' + pn[1] + ' közé esik: ' + F(low) + ' < ' + F(n) + ' < ' + F(low + u) + '.');
      }
      if (k === 3) { // összehasonlítás
        var steps = d === 1 ? [1, 10, 100] : [1, 10, 100, 1000];
        var m = n + P([-1, 1]) * P(steps) * R(1, 9);
        m = Math.max(lo, Math.min(hi, m));
        if (m === n) m = (n === hi) ? n - 1 : n + 1;
        var rel = P(['>', '<']);
        var truth = rel === '>' ? n > m : n < m;
        return tf(d, F(n) + ' ' + rel + ' ' + F(m), truth,
          (truth ? 'Igaz! ' : 'Hamis. ') + 'Balról hasonlítsd a számjegyeket: ' + F(Math.max(n, m)) + ' > ' + F(Math.min(n, m)) + '.');
      }
      if (k === 4) { // sorba rendezés
        var st = d === 1 ? [1, 10, 100] : [1, 10, 100, 1000];
        var arr = distinct(4, function () {
          var x = n + P([-1, 1]) * P(st) * R(1, 9);
          return (x < lo || x > hi) ? n : x;
        });
        if (arr.length < 4) arr = distinct(4, function () { return R(lo, hi); });
        arr.sort(function (a, b) { return a - b; });
        var desc = R(0, 1) === 1;
        if (desc) arr.reverse();
        return { t: 'order', d: d, q: desc ? 'Rendezd csökkenő sorrendbe!' : 'Rendezd növekvő sorrendbe!', a: arr.map(F),
          ex: 'Balról hasonlítsd a számjegyeket: először az ' + (d === 1 ? 'százasokat' : 'ezreseket') + ', aztán a következő helyet.' };
      }
      if (k === 5) { // római számok
        var rn = d === 1 ? R(1, 39) : d === 2 ? R(40, 399) : R(400, 2999);
        if (R(0, 1)) return inp(d, 'Melyik számot jelöli ez a római szám: ' + toRoman(rn) + '?', rn, romEx(rn));
        var c = [rn + 1, rn - 1, rn + 10, rn - 10, rn + 5, rn + 9, rn - 9, rn + 100, rn - 100].filter(function (x) { return x >= 1 && x !== rn; });
        return strMC(d, 'Hogyan írjuk római számmal: ' + F(rn) + '?', toRoman(rn), c.map(toRoman), romEx(rn));
      }
      if (k === 6) { // rákövetkező / megelőző átlépéssel
        var base = d === 1 ? R(2, 9) * 100 : d === 2 ? R(11, 99) * 100 : R(2, 9) * 1000;
        if (R(0, 1)) {
          var x1 = base - 1;
          return inp(d, 'Melyik szám következik ez után: ' + F(x1) + '?', base, 'A rákövetkező 1-gyel nagyobb: ' + F(x1) + ' + 1 = ' + F(base) + '.');
        }
        return inp(d, 'Melyik szám áll közvetlenül ez előtt: ' + F(base) + '?', base - 1, 'A megelőző szám 1-gyel kisebb: ' + F(base) + ' − 1 = ' + F(base - 1) + '.');
      }
      // k === 7: felbontásból szám
      var ds = String(n).split('').map(Number);
      var names = d === 1 ? ['százas', 'tízes', 'egyes'] : ['ezres', 'százas', 'tízes', 'egyes'];
      var txt = ds.map(function (x, j) { return x + ' ' + names[j]; }).join(' + ');
      var cand = [];
      for (i = 0; i < ds.length; i++) {
        for (var j = i + 1; j < ds.length; j++) {
          var s2 = ds.slice(); var tt = s2[i]; s2[i] = s2[j]; s2[j] = tt;
          if (s2[0] !== 0) cand.push(Number(s2.join('')));
        }
      }
      cand.push(n + 10, n - 10, n + 100, n - 100);
      return numMC(d, 'Melyik szám ez? ' + txt, n, cand,
        ds.map(function (x, j) { return F(x * Math.pow(10, ds.length - 1 - j)); }).join(' + ') + ' = ' + F(n) + '.', { min: lo, max: hi });
    }
  };

  /* =====================================================================
     2. ÖSSZEADÁS ÉS KIVONÁS
     ===================================================================== */
  function noCarrySum(a, b) { // tipikus hiba: elfelejtett átvitel
    var r = 0, p = 1;
    while (a > 0 || b > 0) { r += ((a % 10 + b % 10) % 10) * p; a = Math.floor(a / 10); b = Math.floor(b / 10); p *= 10; }
    return r;
  }
  function absDigitDiff(a, b) { // tipikus hiba: mindig a nagyobb jegyből vonja ki a kisebbet
    var r = 0, p = 1;
    while (a > 0 || b > 0) { r += Math.abs(a % 10 - b % 10) * p; a = Math.floor(a / 10); b = Math.floor(b / 10); p *= 10; }
    return r;
  }
  var osszkiv = {
    id: 'osszkiv',
    name: 'Összeadás és kivonás',
    icon: '➕',
    learn: [
      { title: 'Fejszámolás okosan', text: 'Kerek számokkal fejben is könnyű számolni. Bontsd részekre a második számot: előbb a százasokat add hozzá, aztán a tízeseket. Kivonásnál ugyanígy lépésenként vonj ki.', example: 'Pl.: 460 + 270 = 460 + 200 + 70 = 660 + 70 = 730' },
      { title: 'Írásbeli összeadás', text: 'Írd a számokat egymás alá úgy, hogy az egyesek az egyesek alá, a tízesek a tízesek alá kerüljenek. Jobbról kezdj! Ha egy oszlopban 10 vagy több jön ki, leírod az egyeseket, a tízest pedig átviszed a következő oszlopba.', example: 'Pl.: 3 456 + 2 378: 6 + 8 = 14, leírom a 4-et, maradt 1… Eredmény: 5 834' },
      { title: 'Írásbeli kivonás', text: 'A kivonást pótlással végezzük: „mennyit kell adni a kivonandóhoz, hogy a kisebbítendőt kapjuk?” Ha a felső számjegy kisebb, 10-zel nagyobbra pótolunk, és 1-et átviszünk a következő oszlopba.', example: 'Pl.: 7 203 − 2 456 = 4 747' },
      { title: 'Ellenőrzés és becslés', text: 'A kivonást összeadással ellenőrizzük: a különbség + a kivonandó = a kisebbítendő. Számolás előtt becsülj kerekített számokkal, így rögtön látod, ha nagyon mellément.', example: 'Pl.: 845 − 367 = 478, mert 478 + 367 = 845. Becslés: 4 870 + 3 140 ≈ 5 000 + 3 000 = 8 000' }
    ],
    questions: [
      { t: 'mc', d: 1, q: '300 + 500 = ?', a: ['800', '700', '900', '350'], ex: '3 százas + 5 százas = 8 százas, vagyis 800.' },
      { t: 'mc', d: 1, q: '1 200 + 600 = ?', a: ['1 800', '1 260', '7 200', '1 900'], ex: '12 százas + 6 százas = 18 százas = 1 800.' },
      { t: 'mc', d: 1, q: '900 − 400 = ?', a: ['500', '400', '600', '1 300'], ex: '9 százas − 4 százas = 5 százas = 500.' },
      { t: 'mc', d: 2, q: '2 470 + 350 = ?', a: ['2 820', '2 720', '2 810', '5 970'], ex: '2 470 + 300 = 2 770, majd + 50 = 2 820.' },
      { t: 'mc', d: 2, q: '5 000 − 1 250 = ?', a: ['3 750', '4 250', '3 850', '4 750'], ex: '5 000 − 1 000 = 4 000, majd 4 000 − 250 = 3 750.' },
      { t: 'mc', d: 2, q: '3 456 + 2 378 = ?', a: ['5 834', '5 724', '5 824', '5 734'], ex: 'Egyesek: 6 + 8 = 14, tízesek: 5 + 7 + 1 = 13, százasok: 4 + 3 + 1 = 8, ezresek: 3 + 2 = 5 → 5 834.' },
      { t: 'mc', d: 2, q: '7 203 − 2 456 = ?', a: ['4 747', '5 253', '4 857', '4 757'], ex: 'Ellenőrizd összeadással: 4 747 + 2 456 = 7 203. Stimmel!' },
      { t: 'mc', d: 3, q: '6 000 − 2 999 = ?', a: ['3 001', '3 999', '3 000', '4 001'], ex: 'Ügyes trükk: 6 000 − 3 000 = 3 000, de 1-gyel kevesebbet vontunk ki, ezért + 1 = 3 001.' },
      { t: 'mc', d: 2, q: 'Becsüld meg ezresekre kerekítve: 4 870 + 3 140 ≈ ?', a: ['8 000', '7 000', '9 000', '10 000'], ex: '4 870 ≈ 5 000 és 3 140 ≈ 3 000, így a becslés 5 000 + 3 000 = 8 000.' },
      { t: 'mc', d: 2, q: 'Melyik összeadással ellenőrizhető ez: 845 − 367 = 478?', a: ['478 + 367 = 845', '845 + 367 = 1 212', '478 + 845 = 1 323', '367 + 111 = 478'], ex: 'A különbséghez hozzáadjuk a kivonandót, és a kisebbítendőt kell kapnunk: 478 + 367 = 845.' },
      { t: 'mc', d: 1, q: '10 000 − 1 = ?', a: ['9 999', '9 000', '1 000', '9 990'], ex: 'A 10 000 előtti szám a 9 999.' },
      { t: 'mc', d: 3, q: 'Mennyit kell hozzáadni a 3 785-höz, hogy 10 000 legyen?', a: ['6 215', '6 225', '7 215', '6 315'], ex: '10 000 − 3 785 = 6 215. Ellenőrzés: 3 785 + 6 215 = 10 000.' },
      { t: 'mc', d: 2, q: '8 405 − 3 990 = ?', a: ['4 415', '4 515', '5 415', '4 425'], ex: '8 405 − 4 000 = 4 405, de 10-zel többet vontunk ki, ezért + 10 = 4 415.' },
      { t: 'tf', d: 1, q: '450 + 550 = 1 000', a: true, ex: 'Igaz! 450 + 550 = 1 000, mert 50 + 50 = 100 és 400 + 500 = 900.' },
      { t: 'tf', d: 2, q: '4 567 + 1 234 = 5 701', a: false, ex: 'Hamis. Helyesen 5 801: a tízeseknél 6 + 3 + 1 (átvitel) = 10, ezért a százasokhoz is jön 1.' },
      { t: 'tf', d: 2, q: '9 000 − 4 500 = 4 500', a: true, ex: 'Igaz! 4 500 + 4 500 = 9 000.' },
      { t: 'tf', d: 3, q: 'Ha a kisebbítendőt 100-zal növeljük, a kivonandó pedig nem változik, a különbség is 100-zal nő.', a: true, ex: 'Igaz! Pl. 500 − 200 = 300, és 600 − 200 = 400.' },
      { t: 'tf', d: 1, q: 'Az összeadás tagjai felcserélhetők: 245 + 37 = 37 + 245.', a: true, ex: 'Igaz! Az összeadásnál a tagok sorrendje nem számít.' },
      { t: 'input', d: 1, q: '640 + 260 = ?', a: '900', ex: '640 + 200 = 840, majd 840 + 60 = 900.' },
      { t: 'input', d: 2, q: '1 875 + 2 648 = ?', a: '4523', ex: 'Egyesek: 5 + 8 = 13, tízesek: 7 + 4 + 1 = 12, százasok: 8 + 6 + 1 = 15, ezresek: 1 + 2 + 1 = 4 → 4 523.' },
      { t: 'input', d: 2, q: '6 300 − 2 750 = ?', a: '3550', ex: 'Ellenőrzés: 3 550 + 2 750 = 6 300.' },
      { t: 'input', d: 3, q: '9 004 − 5 678 = ?', a: '3326', ex: 'Pótlással: 8 + 6 = 14, 7 + 1 + 2 = 10, 6 + 1 + 3 = 10, 5 + 1 + 3 = 9. Eredmény: 3 326.' },
      { t: 'input', d: 2, q: '2 345 + 1 999 = ?', a: '4344', ex: 'Trükk: 2 345 + 2 000 = 4 345, de 1-gyel többet adtunk hozzá, ezért − 1 = 4 344.' },
      { t: 'input', d: 3, q: '1 234 + 2 345 + 3 456 = ?', a: '7035', ex: '1 234 + 2 345 = 3 579, majd 3 579 + 3 456 = 7 035.' },
      { t: 'order', d: 1, q: 'Rendezd növekvő sorrendbe az eredmények szerint!', a: ['200 + 300', '400 + 400', '500 + 450', '700 + 600'], ex: 'Az eredmények: 500, 800, 950, 1 300.' },
      { t: 'order', d: 2, q: 'Rendezd sorba az írásbeli összeadás lépéseit!', a: ['Egymás alá írom a számokat helyi érték szerint.', 'Összeadom az egyeseket.', 'Összeadom a tízeseket az átvitellel együtt.', 'Összeadom a százasokat, majd az ezreseket.'], ex: 'Mindig jobbról, az egyesekkel kezdünk, és figyelünk az átvitelre.' },
      { t: 'order', d: 2, q: 'Rendezd növekvő sorrendbe a különbségeket!', a: ['1 000 − 900', '2 000 − 1 500', '5 000 − 4 200', '3 000 − 1 000'], ex: 'A különbségek: 100, 500, 800, 2 000.' },
      { t: 'match', d: 1, q: 'Párosítsd a műveletet az eredményével!', a: [['500 + 500', '1 000'], ['300 + 400', '700'], ['800 − 200', '600']], ex: '500 + 500 = 1 000, 300 + 400 = 700, 800 − 200 = 600.' },
      { t: 'match', d: 2, q: 'Párosítsd a kerek százasokkal végzett műveletet az eredményével!', a: [['2 500 + 2 500', '5 000'], ['7 000 − 1 500', '5 500'], ['3 200 + 2 800', '6 000'], ['9 000 − 4 500', '4 500']], ex: 'Számolj kerek százasokkal, ezresekkel!' },
      { t: 'match', d: 3, q: 'Párosítsd a hiányzó számot!', a: [['___ + 250 = 1 000', '750'], ['___ − 300 = 700', '1 000'], ['2 000 − ___ = 1 200', '800']], ex: '1 000 − 250 = 750; 700 + 300 = 1 000; 2 000 − 1 200 = 800.' },
      { t: 'group', d: 2, q: 'Válogasd szét az eredmény szerint!', groups: { 'Nagyobb, mint 5 000': ['2 600 + 2 600', '9 000 − 3 000', '4 999 + 2'], 'Kisebb, mint 5 000': ['2 400 + 2 500', '8 000 − 3 100', '10 000 − 5 001'] }, ex: 'Az eredmények: 5 200, 6 000, 5 001, illetve 4 900, 4 900, 4 999.' },
      { t: 'group', d: 1, q: 'Kerek ezres lesz az eredmény?', groups: { 'Kerek ezres': ['600 + 400', '2 500 + 500', '5 300 − 300'], 'Nem kerek ezres': ['600 + 300', '2 500 + 600', '5 300 − 200'] }, ex: '1 000, 3 000, 5 000 kerek ezresek; 900, 3 100, 5 100 nem.' }
    ],
    gen: function (d) {
      var a, b, c, k = R(0, 7), guard = 0;
      do {
        if (d === 1) { a = R(1, 90) * 10; b = R(1, 90) * 10; }
        else if (d === 2) { a = R(100, 6000); b = R(100, 3999); }
        else { a = R(1000, 8999); b = R(1000, Math.max(1000, 9999 - a)); }
      } while (a + b > (d === 1 ? 1000 : 9999) && guard++ < 100);
      if (a + b > 9999) { a = 1234; b = 2345; }
      c = a + b;
      if (d === 3 && k === 1 && R(0, 1)) { c = R(2, 9) * 1000 + R(0, 9); b = R(1000, c - 100); a = c - b; }
      function addEx() {
        if (d === 1) {
          var b1 = Math.floor(b / 100) * 100, b2 = b % 100;
          if (b1 && b2) return 'Bontsd fel: ' + F(a) + ' + ' + F(b1) + ' = ' + F(a + b1) + ', majd + ' + b2 + ' = ' + F(c) + '.';
        }
        return F(a) + ' + ' + F(b) + ' = ' + F(c) + '. Ellenőrzés: ' + F(c) + ' − ' + F(b) + ' = ' + F(a) + '.';
      }
      function subEx() { return F(c) + ' − ' + F(b) + ' = ' + F(a) + '. Ellenőrzés összeadással: ' + F(a) + ' + ' + F(b) + ' = ' + F(c) + '.'; }
      if (k === 0) return inp(d, F(a) + ' + ' + F(b) + ' = ?', c, addEx());
      if (k === 1) return inp(d, F(c) + ' − ' + F(b) + ' = ?', a, subEx());
      if (k === 2) return numMC(d, F(a) + ' + ' + F(b) + ' = ?', c, [c + 10, c - 10, c + 100, c - 100, noCarrySum(a, b), c + 1000], addEx());
      if (k === 3) return numMC(d, F(c) + ' − ' + F(b) + ' = ?', a, [a + 10, a - 10, a + 100, a - 100, absDigitDiff(c, b)], subEx());
      if (k === 4) {
        if (R(0, 1)) return inp(d, 'Melyik szám illik a □ helyére? □ + ' + F(b) + ' = ' + F(c), a, 'A hiányzó tagot kivonással kapjuk: ' + F(c) + ' − ' + F(b) + ' = ' + F(a) + '.');
        return inp(d, 'Melyik szám illik a □ helyére? ' + F(c) + ' − □ = ' + F(a), b, 'A kivonandót így kapjuk: ' + F(c) + ' − ' + F(a) + ' = ' + F(b) + '.');
      }
      if (k === 5) {
        var plus = R(0, 1) === 1, right = plus ? c : a;
        var claim = R(0, 1) ? right : right + P([-1, 1]) * P(d === 1 ? [10, 100] : [1, 10, 100]);
        if (claim < 0) claim = right;
        var expr = plus ? F(a) + ' + ' + F(b) : F(c) + ' − ' + F(b);
        return tf(d, expr + ' = ' + F(claim), claim === right, (claim === right ? 'Igaz! ' : 'Hamis. Helyesen: ') + expr + ' = ' + F(right) + '.');
      }
      if (k === 6) { // becslés
        var uu = d === 1 ? 100 : 1000;
        var x = R(uu + 1, 5 * uu - 1), y = R(uu + 1, 4 * uu - 1);
        if (x % uu === uu / 2) x += 1;
        if (y % uu === uu / 2) y += 1;
        var rx = Math.round(x / uu) * uu, ry = Math.round(y / uu) * uu, est = rx + ry;
        return numMC(d, 'Becsüld meg ' + (uu === 100 ? 'százasokra' : 'ezresekre') + ' kerekítve: ' + F(x) + ' + ' + F(y) + ' ≈ ?', est,
          [est - uu, est + uu, est + 2 * uu, est - 2 * uu],
          F(x) + ' ≈ ' + F(rx) + ' és ' + F(y) + ' ≈ ' + F(ry) + ', így a becslés: ' + F(rx) + ' + ' + F(ry) + ' = ' + F(est) + '.', { min: 1 });
      }
      // k === 7: összegek sorba rendezése
      var lim = d === 1 ? 100 : d === 2 ? 1000 : 5000, stp = d === 1 ? 10 : d === 2 ? 50 : 1;
      var pairs = [], sums = [];
      while (pairs.length < 4) {
        var p1 = R(1, lim / stp) * stp, p2 = R(1, lim / stp) * stp;
        if (sums.indexOf(p1 + p2) < 0) { sums.push(p1 + p2); pairs.push([p1, p2]); }
      }
      pairs.sort(function (u1, u2) { return (u1[0] + u1[1]) - (u2[0] + u2[1]); });
      return { t: 'order', d: d, q: 'Rendezd növekvő sorrendbe az összegek szerint!', a: pairs.map(function (p) { return F(p[0]) + ' + ' + F(p[1]); }),
        ex: 'Az összegek: ' + pairs.map(function (p) { return F(p[0] + p[1]); }).join(', ') + '.' };
    }
  };

  /* =====================================================================
     3. SZORZÁS ÉS OSZTÁS
     ===================================================================== */
  function noCarryMul(a, b) { // tipikus hiba: elfelejtett átvitel egyjegyű szorzónál
    var r = 0, p = 1;
    while (a > 0) { r += ((a % 10) * b % 10) * p; a = Math.floor(a / 10); p *= 10; }
    return r;
  }
  var szorzoszt = {
    id: 'szorzoszt',
    name: 'Szorzás és osztás',
    icon: '✖️',
    learn: [
      { title: 'Szorzótábla', text: 'A szorzótáblát érdemes villámgyorsan tudni, mert minden nagyobb szorzás és osztás erre épül. A szorzás tényezői felcserélhetők. Az osztás a szorzás „fordítottja”.', example: 'Pl.: 7 · 8 = 56, ezért 56 : 8 = 7 és 56 : 7 = 8' },
      { title: 'Szorzás 10-zel, 100-zal, 1000-rel', text: 'Ha egy számot 10-zel szorzunk, egy 0-t írunk a végére, 100-zal szorzásnál kettőt, 1000-rel szorzásnál hármat. Kerek számok osztásánál pedig ugyanennyi 0-t hagyunk el.', example: 'Pl.: 45 · 100 = 4 500; 7 000 : 1000 = 7' },
      { title: 'Írásbeli szorzás', text: 'Az egyjegyű szorzóval jobbról kezdve szorozzuk meg a jegyeket, és figyelünk az átvitelre. Kétjegyű szorzónál két sort írunk: előbb a tízesekkel, aztán az egyesekkel szorzunk, végül összeadjuk a részeredményeket.', example: 'Pl.: 324 · 3 = 972; 46 · 23 = 46 · 20 + 46 · 3 = 920 + 138 = 1 058' },
      { title: 'Írásbeli osztás maradékkal', text: 'Az írásbeli osztást balról kezdjük. A maradék mindig kisebb, mint az osztó! Ellenőrzés: hányados · osztó + maradék = osztandó.', example: 'Pl.: 957 : 4 = 239, maradék 1, mert 239 · 4 + 1 = 957' },
      { title: 'Műveleti sorrend', text: 'Először a zárójelben lévő műveletet végezzük el. Utána jön a szorzás és az osztás, és csak a végén az összeadás és a kivonás. Az egyenrangú műveleteket balról jobbra haladva végezzük.', example: 'Pl.: 2 + 3 · 4 = 2 + 12 = 14, de (2 + 3) · 4 = 5 · 4 = 20' }
    ],
    questions: [
      { t: 'mc', d: 1, q: '7 · 8 = ?', a: ['56', '54', '48', '63'], ex: '7 · 8 = 56. Segít: 5, 6, 7, 8 → 56 = 7 · 8.' },
      { t: 'mc', d: 1, q: '63 : 9 = ?', a: ['7', '6', '8', '9'], ex: '63 : 9 = 7, mert 7 · 9 = 63.' },
      { t: 'mc', d: 1, q: '45 · 10 = ?', a: ['450', '4 500', '55', '405'], ex: '10-zel szorzásnál egy 0-t írunk a szám végére: 450.' },
      { t: 'mc', d: 2, q: '36 · 100 = ?', a: ['3 600', '360', '36 000', '136'], ex: '100-zal szorzásnál két 0-t írunk a végére: 3 600.' },
      { t: 'mc', d: 2, q: '7 000 : 1000 = ?', a: ['7', '70', '700', '7 000'], ex: '1000-rel osztásnál három 0-t hagyunk el: 7.' },
      { t: 'mc', d: 2, q: '324 · 3 = ?', a: ['972', '962', '1 072', '927'], ex: '4 · 3 = 12, leírom a 2-t, maradt 1; 2 · 3 + 1 = 7; 3 · 3 = 9 → 972.' },
      { t: 'mc', d: 2, q: '2 + 3 · 4 = ?', a: ['14', '20', '24', '9'], ex: 'Előbb szorzunk: 3 · 4 = 12, aztán összeadunk: 2 + 12 = 14.' },
      { t: 'mc', d: 2, q: '(2 + 3) · 4 = ?', a: ['20', '14', '24', '9'], ex: 'Először a zárójel: 2 + 3 = 5, aztán 5 · 4 = 20.' },
      { t: 'mc', d: 3, q: '46 · 23 = ?', a: ['1 058', '1 048', '928', '1 158'], ex: '46 · 20 = 920 és 46 · 3 = 138, összesen 920 + 138 = 1 058.' },
      { t: 'mc', d: 3, q: '957 : 4 = ?', a: ['239, maradék 1', '239, maradék 3', '238, maradék 5', '249, maradék 1'], ex: '239 · 4 = 956, és 956 + 1 = 957. A maradék (1) kisebb az osztónál.' },
      { t: 'mc', d: 2, q: 'Mennyi a maradék? 29 : 4', a: ['1', '2', '3', '0'], ex: '7 · 4 = 28, és 29 − 28 = 1, tehát 29 : 4 = 7, maradék 1.' },
      { t: 'mc', d: 1, q: 'Melyik szorzat eredménye 24?', a: ['6 · 4', '5 · 5', '7 · 3', '9 · 3'], ex: '6 · 4 = 24. A többi: 25, 21, 27.' },
      { t: 'mc', d: 3, q: '100 − 4 · (12 + 8) = ?', a: ['20', '1 920', '88', '96'], ex: 'Zárójel: 12 + 8 = 20; szorzás: 4 · 20 = 80; kivonás: 100 − 80 = 20.' },
      { t: 'mc', d: 2, q: 'Melyik szám osztható 2-vel és 5-tel is?', a: ['70', '75', '52', '85'], ex: 'A 2-vel és 5-tel is osztható számok 0-ra végződnek, ilyen a 70.' },
      { t: 'tf', d: 1, q: '6 · 7 = 42', a: true, ex: 'Igaz! 6 · 7 = 42.' },
      { t: 'tf', d: 2, q: 'Ha egy számot 0-val szorzunk, mindig 0 az eredmény.', a: true, ex: 'Igaz! Pl. 358 · 0 = 0.' },
      { t: 'tf', d: 2, q: '48 : 6 = 9', a: false, ex: 'Hamis. 48 : 6 = 8, mert 8 · 6 = 48.' },
      { t: 'tf', d: 3, q: 'Osztásnál a maradék lehet nagyobb az osztónál.', a: false, ex: 'Hamis. A maradék mindig kisebb az osztónál, különben még egyszer bele lehetne osztani.' },
      { t: 'tf', d: 2, q: '12 : 3 · 2 = 2', a: false, ex: 'Hamis. Balról jobbra haladunk: 12 : 3 = 4, majd 4 · 2 = 8.' },
      { t: 'input', d: 1, q: '9 · 6 = ?', a: '54', ex: '9 · 6 = 54.' },
      { t: 'input', d: 2, q: '250 · 4 = ?', a: '1000', ex: '25 · 4 = 100, ezért 250 · 4 = 1 000.' },
      { t: 'input', d: 2, q: '84 : 4 = ?', a: '21', ex: '8 tízes : 4 = 2 tízes, 4 egyes : 4 = 1 egyes → 21.' },
      { t: 'input', d: 3, q: '1 236 · 7 = ?', a: '8652', ex: '6 · 7 = 42, 3 · 7 + 4 = 25, 2 · 7 + 2 = 16, 1 · 7 + 1 = 8 → 8 652.' },
      { t: 'input', d: 3, q: '35 · 24 = ?', a: '840', ex: '35 · 20 = 700 és 35 · 4 = 140, összesen 840.' },
      { t: 'input', d: 2, q: '50 − 6 · 7 = ?', a: '8', ex: 'Előbb szorzunk: 6 · 7 = 42, aztán 50 − 42 = 8.' },
      { t: 'input', d: 3, q: '2 508 : 6 = ?', a: '418', ex: '25 : 6 = 4, maradék 1; 10 : 6 = 1, maradék 4; 48 : 6 = 8 → 418.' },
      { t: 'order', d: 2, q: 'Rendezd sorba a lépéseket! Feladat: 2 · (3 + 4) − 5', a: ['3 + 4 = 7', '2 · 7 = 14', '14 − 5 = 9'], ex: 'Először a zárójel, aztán a szorzás, végül a kivonás.' },
      { t: 'order', d: 1, q: 'Rendezd növekvő sorrendbe a szorzatokat!', a: ['3 · 4', '2 · 7', '4 · 4', '5 · 6'], ex: 'Az eredmények: 12, 14, 16, 30.' },
      { t: 'order', d: 2, q: 'Rendezd növekvő sorrendbe a hányadosokat!', a: ['45 : 9', '36 : 6', '56 : 7', '81 : 9'], ex: 'Az eredmények: 5, 6, 8, 9.' },
      { t: 'match', d: 1, q: 'Párosítsd a szorzatot az eredményével!', a: [['8 · 8', '64'], ['7 · 7', '49'], ['6 · 6', '36'], ['9 · 9', '81']], ex: '8 · 8 = 64, 7 · 7 = 49, 6 · 6 = 36, 9 · 9 = 81.' },
      { t: 'match', d: 2, q: 'Párosítsd a műveletet az eredményével!', a: [['7 · 10', '70'], ['7 · 100', '700'], ['7 · 1000', '7 000'], ['7 000 : 1000', '7']], ex: 'Szorzásnál 0-kat írunk a végére, osztásnál elhagyjuk őket.' },
      { t: 'match', d: 3, q: 'Párosítsd az osztást az eredményével!', a: [['17 : 5', '3, maradék 2'], ['23 : 5', '4, maradék 3'], ['26 : 4', '6, maradék 2'], ['30 : 7', '4, maradék 2']], ex: 'Ellenőrzés: 3 · 5 + 2 = 17, 4 · 5 + 3 = 23, 6 · 4 + 2 = 26, 4 · 7 + 2 = 30.' },
      { t: 'group', d: 1, q: 'Páros vagy páratlan lesz a szorzat?', groups: { 'Páros': ['3 · 4', '5 · 6', '7 · 8'], 'Páratlan': ['3 · 5', '7 · 9', '1 · 9'] }, ex: 'Ha van páros tényező, a szorzat páros. Két páratlan szám szorzata páratlan.' },
      { t: 'group', d: 2, q: 'Osztható-e 3-mal maradék nélkül?', groups: { 'Osztható 3-mal': ['27', '42', '81'], 'Nem osztható 3-mal': ['28', '44', '82'] }, ex: '27 = 9 · 3, 42 = 14 · 3, 81 = 27 · 3. A többinél marad maradék.' }
    ],
    gen: function (d) {
      var k = R(0, 7), a, b, p;
      if (k === 0) { // szorzótábla
        a = R(d === 1 ? 2 : 3, 10); b = R(d === 1 ? 2 : 3, 10); p = a * b;
        var ex0 = a + ' · ' + b + ' = ' + p + '.';
        var s = R(0, 2);
        if (s === 0) return inp(d, a + ' · ' + b + ' = ?', p, ex0);
        if (s === 1) return numMC(d, a + ' · ' + b + ' = ?', p, [p + a, p - a, p + b, p - b, (a + 1) * (b - 1), a + b], ex0, { min: 1 });
        var cl = R(0, 1) ? p : p + P([-1, 1]) * P([a, b, 1, 2]);
        return tf(d, a + ' · ' + b + ' = ' + cl, cl === p, (cl === p ? 'Igaz! ' : 'Hamis. Helyesen: ') + ex0);
      }
      if (k === 1) { // bennfoglalás
        a = R(2, 10); b = R(2, 10); p = a * b;
        return inp(d, p + ' : ' + b + ' = ?', a, p + ' : ' + b + ' = ' + a + ', mert ' + a + ' · ' + b + ' = ' + p + '.');
      }
      if (k === 2) { // 10, 100, 1000
        var opts = d === 1 ? [[R(2, 99), 10, '*']] : d === 2 ? [[R(2, 99), 100, '*'], [R(2, 99) * 10, 10, '/'], [R(11, 999), 10, '*']] : [[R(2, 9), 1000, '*'], [R(2, 99) * 100, 100, '/'], [R(2, 9) * 1000, 1000, '/'], [R(2, 99), 100, '*']];
        var o = P(opts), n = o[0], m = o[1];
        if (o[2] === '*') return inp(d, F(n) + ' · ' + F(m) + ' = ?', n * m, sx(m, 'ins') + ' szorzásnál ' + ['', 'egy', 'két', 'három'][String(m).length - 1] + ' nullát írunk a szám végére: ' + F(n * m) + '.');
        return inp(d, F(n) + ' : ' + F(m) + ' = ?', n / m, sx(m, 'ins') + ' osztásnál ' + ['', 'egy', 'két', 'három'][String(m).length - 1] + ' nullát hagyunk el a végéről: ' + F(n / m) + '.');
      }
      if (k === 3 || k === 6) { // írásbeli szorzás
        var two = d === 3 && R(0, 1) === 1;
        if (two) {
          a = R(12, 99); b = R(12, 99);
          while (b % 10 === 0 || a * b > 9999) { a = R(12, 99); b = R(12, 60); }
          p = a * b;
          var bt = Math.floor(b / 10) * 10, bu = b % 10;
          return numMC(d, a + ' · ' + b + ' = ?', p, [p + 10, p - 10, p + 100, p - 100, a * bt + a, a * (b + 1), a * (b - 1)],
            a + ' · ' + bt + ' = ' + F(a * bt) + ' és ' + a + ' · ' + bu + ' = ' + F(a * bu) + ', összesen ' + F(p) + '.');
        }
        a = d === 1 ? R(11, 49) : d === 2 ? R(101, 999) : R(1001, 2400);
        b = R(2, 9);
        if (d === 3) while (a * b > 9999) a = R(1001, 2400);
        p = a * b;
        var e3 = F(a) + ' · ' + b + ' = ' + F(p) + '. Becslés: kb. ' + F(Math.round(a / (d === 1 ? 10 : 100)) * (d === 1 ? 10 : 100)) + ' · ' + b + ' = ' + F(Math.round(a / (d === 1 ? 10 : 100)) * (d === 1 ? 10 : 100) * b) + '.';
        if (k === 6) return inp(d, F(a) + ' · ' + b + ' = ?', p, e3);
        return numMC(d, F(a) + ' · ' + b + ' = ?', p, [p + 10, p - 10, p + 100, p - 100, noCarryMul(a, b), p + b, p - b], e3, { min: 1 });
      }
      if (k === 4) { // osztás maradékkal
        var dv = R(2, 9), q = d === 1 ? R(1, 9) : d === 2 ? R(11, 99) : R(100, Math.floor(9999 / dv) - 1), r = R(0, dv - 1);
        var nn = q * dv + r;
        var e4 = F(q) + ' · ' + dv + ' = ' + F(q * dv) + (r ? ', és ' + F(q * dv) + ' + ' + r + ' = ' + F(nn) + '. A maradék (' + r + ') kisebb az osztónál (' + dv + ').' : ', tehát nincs maradék.');
        if (r === 0) return inp(d, F(nn) + ' : ' + dv + ' = ?', q, e4);
        if (R(0, 2) === 0) return inp(d, 'Mennyi a maradék? ' + F(nn) + ' : ' + dv, r, e4);
        var lab = function (x, y) { return F(x) + ', maradék ' + y; };
        return strMC(d, F(nn) + ' : ' + dv + ' = ?', lab(q, r),
          [lab(q + 1, r), q > 1 ? lab(q - 1, r) : lab(q + 2, r), lab(q, r + 1 < dv ? r + 1 : r - 1), lab(q * 10, r)], e4);
      }
      if (k === 5) { // műveleti sorrend
        var forms = d === 1 ? [0, 1] : d === 2 ? [0, 1, 2] : [2, 3, 4];
        var f = P(forms), x = R(2, 9), y = R(2, 9), z = R(2, 9), w = R(2, 9), ans, wrong, txt, ex5;
        if (f === 0) { txt = x + ' + ' + y + ' · ' + z; ans = x + y * z; wrong = (x + y) * z; ex5 = 'Előbb szorzunk: ' + y + ' · ' + z + ' = ' + (y * z) + ', aztán ' + x + ' + ' + (y * z) + ' = ' + ans + '.'; }
        else if (f === 1) { txt = '(' + x + ' + ' + y + ') · ' + z; ans = (x + y) * z; wrong = x + y * z; ex5 = 'Először a zárójel: ' + x + ' + ' + y + ' = ' + (x + y) + ', aztán · ' + z + ' = ' + ans + '.'; }
        else if (f === 2) { var big = y * z + R(1, 40); txt = big + ' − ' + y + ' · ' + z; ans = big - y * z; wrong = (big - y) * z; ex5 = 'Előbb szorzunk: ' + y + ' · ' + z + ' = ' + (y * z) + ', aztán ' + big + ' − ' + (y * z) + ' = ' + ans + '.'; }
        else if (f === 3) { txt = x + ' · ' + y + ' + ' + z + ' · ' + w; ans = x * y + z * w; wrong = (x * y + z) * w; ex5 = 'Két szorzás: ' + (x * y) + ' és ' + (z * w) + ', ezek összege ' + ans + '.'; }
        else { var qq = R(2, 9); var tot = qq * z + R(1, 20); txt = '(' + (tot) + ' − ' + (tot - qq * z) + ') : ' + z; ans = qq; wrong = qq * z; ex5 = 'Zárójel: ' + tot + ' − ' + (tot - qq * z) + ' = ' + (qq * z) + ', aztán ' + (qq * z) + ' : ' + z + ' = ' + qq + '.'; }
        if (R(0, 1)) return inp(d, txt + ' = ?', ans, ex5);
        return numMC(d, txt + ' = ?', ans, [wrong, ans + 1, ans - 1, ans + 10, ans * 2], ex5);
      }
      // k === 7: szorzatok sorba rendezése
      var lst = [], vals = [];
      while (lst.length < 4) {
        var u1 = R(2, d === 1 ? 6 : 10), u2 = R(2, d === 1 ? 6 : 10);
        if (vals.indexOf(u1 * u2) < 0) { vals.push(u1 * u2); lst.push([u1, u2]); }
      }
      lst.sort(function (m1, m2) { return m1[0] * m1[1] - m2[0] * m2[1]; });
      return { t: 'order', d: d, q: 'Rendezd növekvő sorrendbe a szorzatokat!', a: lst.map(function (m1) { return m1[0] + ' · ' + m1[1]; }),
        ex: 'Az eredmények: ' + lst.map(function (m1) { return m1[0] * m1[1]; }).join(', ') + '.' };
    }
  };

  /* =====================================================================
     4. SZÖVEGES FELADATOK
     ===================================================================== */
  var TARTALY = [
    { c: 'doboz', ci: 'dobozban', i: 'ceruza', ia: 'ceruzát' },
    { c: 'kosár', ci: 'kosárban', i: 'alma', ia: 'almát' },
    { c: 'zacskó', ci: 'zacskóban', i: 'cukorka', ia: 'cukorkát' },
    { c: 'tálca', ci: 'tálcán', i: 'sütemény', ia: 'süteményt' },
    { c: 'csomag', ci: 'csomagban', i: 'matrica', ia: 'matricát' }
  ];
  var ARU = [['kiflit', 40, 90], ['zsemlét', 50, 120], ['radírt', 100, 300], ['füzetet', 150, 450], ['ceruzát', 80, 250], ['csokit', 200, 600]];
  var szovegSablonok = [
    function (d, N) { // tárolók
      var t = P(TARTALY), k = d === 1 ? R(2, 5) : d === 2 ? R(3, 9) : R(4, 9), m = d === 1 ? R(2, 10) : d === 2 ? R(12, 30) : R(25, 99);
      var tot = k * m;
      if (d === 3) {
        var g = R(10, tot - 10);
        return { q: N + ' ' + k + ' ' + t.c + ' ' + t.ia + ' vett. Minden ' + t.ci + ' ' + m + ' ' + t.i + ' van. Ebből ' + g + ' ' + t.ia + ' elajándékozott. Hány ' + t.i + ' maradt?',
          ans: tot - g, ex: k + ' · ' + m + ' = ' + F(tot) + ', majd ' + F(tot) + ' − ' + g + ' = ' + F(tot - g) + '.', wr: [tot, tot + g, k + m - g] };
      }
      return { q: N + ' ' + k + ' ' + t.c + ' ' + t.ia + ' vett. Minden ' + t.ci + ' ' + m + ' ' + t.i + ' van. Hány ' + t.i + ' van összesen?',
        ans: tot, ex: 'Egyenlő csoportok → szorzás: ' + k + ' · ' + m + ' = ' + F(tot) + '.', wr: [k + m, tot + m, tot - m] };
    },
    function (d, N) { // matricagyűjtemény
      var a = d === 1 ? R(20, 99) : d === 2 ? R(100, 999) : R(1000, 5000), b = R(5, Math.floor(a / 2)), c = d === 1 ? 0 : R(5, Math.floor(a / 3));
      if (!c) return { q: N + ' gyűjteményében ' + F(a) + ' matrica volt. ' + F(b) + ' matricát elajándékozott. Hány matricája maradt?', ans: a - b,
        ex: 'Elajándékozott → kivonás: ' + F(a) + ' − ' + F(b) + ' = ' + F(a - b) + '.', wr: [a + b, a - b + 10, a - b - 10] };
      return { q: N + ' gyűjteményében ' + F(a) + ' matrica volt. ' + F(b) + ' matricát elajándékozott, aztán kapott még ' + F(c) + ' matricát. Hány matricája van most?', ans: a - b + c,
        ex: 'Két lépés: ' + F(a) + ' − ' + F(b) + ' = ' + F(a - b) + ', majd ' + F(a - b) + ' + ' + F(c) + ' = ' + F(a - b + c) + '.', wr: [a - b - c, a + b + c, a - b] };
    },
    function (d, N) { // vásárlás
      var it = P(ARU), pr = R(it[1] / 10, it[2] / 10) * 10, k = d === 1 ? 1 : R(2, 5), tot = pr * k, extra = 0;
      if (d === 3) extra = R(20, 90) * 10;
      var all = tot + extra, t = [500, 1000, 2000, 5000].filter(function (x) { return x > all; })[0];
      var q = N + ' egy ' + F(t) + ' Ft-os bankjeggyel ment a boltba. Vett ' + (k === 1 ? 'egy ' : k + ' darab ') + F(pr) + ' Ft-os ' + it[0] + (extra ? ' és egy ' + F(extra) + ' Ft-os könyvet' : '') + '. Mennyi pénze maradt?';
      var ex = (k > 1 ? k + ' · ' + F(pr) + ' = ' + F(tot) + ' Ft. ' : '') + (extra ? F(tot) + ' + ' + F(extra) + ' = ' + F(all) + ' Ft. ' : '') + F(t) + ' − ' + F(all) + ' = ' + F(t - all) + ' Ft.';
      return { q: q, ans: t - all, unit: 'Ft', ex: ex, wr: [t - pr, all, t - tot + extra, t - all + 100] };
    },
    function (d, N) { // egyenlő elosztás
      var k = d === 1 ? R(2, 5) : R(3, 9), e = d === 1 ? R(2, 10) : R(11, 30), s = k * e;
      if (d === 3) {
        var x = R(3, 15);
        return { q: N + ' kapott ' + (s + x) + ' szem cukrot. Előbb megevett ' + x + ' szemet, a maradékot pedig egyenlően szétosztotta ' + k + ' barátja között. Hány szem jutott egy barátnak?', ans: e,
          ex: (s + x) + ' − ' + x + ' = ' + s + ', majd ' + s + ' : ' + k + ' = ' + e + '.', wr: [Math.floor((s + x) / k), e + 1, s - k] };
      }
      return { q: s + ' szem cukrot ' + k + ' gyerek között egyenlően osztottak szét. Hány szem jutott egy gyereknek?', ans: e,
        ex: 'Egyenlően szétosztjuk → osztás: ' + s + ' : ' + k + ' = ' + e + '.', wr: [s - k, s + k, e + 1] };
    },
    function (d, N) { // életkor
      var a = R(7, 10);
      if (d === 1) { var b = R(2, 6); return { q: N + ' ' + a + ' éves, a bátyja ' + b + ' évvel idősebb. Hány éves a bátyja?', ans: a + b, ex: 'Idősebb → hozzáadunk: ' + a + ' + ' + b + ' = ' + (a + b) + '.', wr: [a - b, a * b, a + b + 1] }; }
      var k = R(3, 4), mom = a * k;
      if (d === 2) return { q: N + ' ' + a + ' éves. Az édesanyja ' + sx(k, 'szor') + ' annyi idős. Hány éves az édesanyja?', ans: mom, ex: sx(k, 'szor') + ' annyi → szorzás: ' + a + ' · ' + k + ' = ' + mom + '.', wr: [a + k, mom + a, mom - a] };
      var g = R(22, 30);
      return { q: N + ' ' + a + ' éves. Az édesanyja ' + sx(k, 'szor') + ' annyi idős, a nagypapa pedig ' + g + ' évvel idősebb az édesanyánál. Hány éves a nagypapa?', ans: mom + g,
        ex: 'Anya: ' + a + ' · ' + k + ' = ' + mom + ' éves. Nagypapa: ' + mom + ' + ' + g + ' = ' + (mom + g) + ' éves.', wr: [a + g, mom, a * k * 2] };
    },
    function (d, N) { // lábak
      var x = d === 1 ? R(1, 5) : R(3, 15), y = d === 1 ? R(1, 5) : R(3, 12), z = d === 3 ? R(2, 6) : 0;
      var tot = 2 * x + 4 * y + 8 * z;
      var r = { q: 'Az udvaron ' + x + ' tyúk és ' + y + ' kutya ' + (z ? 'szaladgál, a pajta sarkában pedig ' + z + ' pók üldögél' : 'szaladgál') + '. Hány lábuk van összesen?', ans: tot,
        ex: 'A tyúknak 2, a kutyának 4' + (z ? ', a póknak 8' : '') + ' lába van: ' + x + ' · 2 + ' + y + ' · 4' + (z ? ' + ' + z + ' · 8' : '') + ' = ' + tot + '.', wr: [x + y + z, 4 * (x + y + z), 2 * (x + y + z)] };
      if (d === 1) r.pic = rep('🐔', x) + rep('🐶', y);
      return r;
    },
    function (d, N) { // út
      if (d === 3) {
        var h1 = R(2, 4), v1 = R(50, 90), h2 = R(1, 3), v2 = R(40, 80), s = h1 * v1 + h2 * v2;
        return { q: 'Egy autó előbb ' + h1 + ' órán át óránként ' + v1 + ' km-t tett meg, aztán még ' + h2 + ' órán át óránként ' + v2 + ' km-t. Hány km utat tett meg összesen?', ans: s, unit: 'km',
          ex: h1 + ' · ' + v1 + ' = ' + (h1 * v1) + ', ' + h2 + ' · ' + v2 + ' = ' + (h2 * v2) + ', összesen ' + F(s) + ' km.', wr: [(h1 + h2) * v1, v1 + v2, s + 10] };
      }
      var v = d === 1 ? R(10, 20) : R(40, 90), h = d === 1 ? R(2, 4) : R(2, 6);
      return { q: 'Egy ' + (d === 1 ? 'kerékpáros' : 'autó') + ' óránként ' + v + ' km-t tesz meg. Hány km-t tesz meg ' + h + ' óra alatt?', ans: v * h, unit: 'km',
        ex: 'Minden órában ugyanannyit → szorzás: ' + v + ' · ' + h + ' = ' + (v * h) + ' km.', wr: [v + h, v * h + v, v * h - v] };
    },
    function (d, N) { // összehasonlítás
      var M = P(NEVEK.filter(function (x) { return x !== N; }));
      var b = d === 1 ? R(10, 60) : d === 2 ? R(100, 600) : R(1000, 4000), a = b + (d === 1 ? R(3, 30) : d === 2 ? R(20, 300) : R(150, 3000));
      return { q: 'A versenyen ' + N + ' ' + F(a) + ' pontot gyűjtött, ' + M + ' pedig ' + F(b) + ' pontot. Hány ponttal gyűjtött többet ' + N + '?', ans: a - b, unit: 'pont',
        ex: '„Mennyivel több?” → kivonás: ' + F(a) + ' − ' + F(b) + ' = ' + F(a - b) + '.', wr: [a + b, a - b + 10, a - b - 10] };
    },
    function (d, N) { // gondolt szám
      var x = R(2, d === 1 ? 10 : 20), k = R(2, 9), c = R(3, 30);
      if (d === 1) return { q: N + ' gondolt egy számot. Hozzáadott ' + sx(c, 'acc') + ', így ' + (x + c) + ' lett az eredmény. Melyik számra gondolt?', ans: x,
        ex: 'Visszafelé számolunk: ' + (x + c) + ' − ' + c + ' = ' + x + '.', wr: [x + 2 * c, x + c, x + 1] };
      if (d === 2) return { q: N + ' gondolt egy számot. Megszorozta ' + sx(k, 'ins') + ', így ' + (x * k) + ' lett az eredmény. Melyik számra gondolt?', ans: x,
        ex: 'Visszafelé: a szorzás helyett osztunk: ' + (x * k) + ' : ' + k + ' = ' + x + '.', wr: [x * k * k, x * k - k, x + 1] };
      var res = x * k + c;
      return { q: N + ' gondolt egy számot. Megszorozta ' + sx(k, 'ins') + ', majd hozzáadott ' + sx(c, 'acc') + '. Így ' + res + ' lett az eredmény. Melyik számra gondolt?', ans: x,
        ex: 'Visszafelé: ' + res + ' − ' + c + ' = ' + (x * k) + ', majd ' + (x * k) + ' : ' + k + ' = ' + x + '.', wr: [res - c, Math.floor(res / k), x + 1] };
    },
    function (d, N) { // pénztárca
      var a = R(1, d === 1 ? 4 : 9), b = R(1, d === 1 ? 4 : 9), c = d === 3 ? R(1, 5) : 0, tot = 200 * a + 100 * b + 1000 * c;
      return { q: N + ' pénztárcájában ' + a + ' darab 200 Ft-os és ' + b + ' darab 100 Ft-os érme ' + (c ? 'meg ' + c + ' darab 1 000 Ft-os bankjegy ' : '') + 'van. Mennyi pénze van összesen?', ans: tot, unit: 'Ft',
        ex: a + ' · 200 = ' + F(200 * a) + ', ' + b + ' · 100 = ' + F(100 * b) + (c ? ', ' + c + ' · 1 000 = ' + F(1000 * c) : '') + ', összesen ' + F(tot) + ' Ft.', wr: [300 * (a + b) + 1000 * c, 100 * (a + b) + 1000 * c, tot + 100] };
    }
  ];
  var szoveges = {
    id: 'szoveges',
    name: 'Szöveges feladatok',
    icon: '📖',
    learn: [
      { title: 'Olvasd el figyelmesen!', text: 'Olvasd el a feladatot akár kétszer is! Keresd meg az adatokat (a számokat és hogy mit jelentenek), és azt, hogy pontosan mit kérdez a feladat.', example: 'Pl.: „Panni 3 kosár almát szedett, mindegyikben 8 alma van.” Adatok: 3 kosár, kosaranként 8 alma.' },
      { title: 'Melyik műveletet válasszam?', text: '„Összesen”, „együtt”, „még kapott” → összeadás. „Maradt”, „mennyivel több/kevesebb” → kivonás. „Mindegyikben ugyanannyi”, „hányszor annyi” → szorzás. „Egyenlően elosztja” → osztás.', example: 'Pl.: 24 cukrot 4 gyerek egyenlően eloszt → 24 : 4 = 6' },
      { title: 'Többlépéses feladatok', text: 'Sok feladatot több lépésben oldunk meg. Számold ki előbb a részeredményt, írd le, és csak utána lépj tovább!', example: 'Pl.: 3 füzet 180 Ft-ért és 2 toll 250 Ft-ért: 540 + 500 = 1 040 Ft' },
      { title: 'Ellenőrzés és szöveges válasz', text: 'A végén nézd meg, hogy az eredmény értelmes-e (nem lehet 300 éves a nagypapa!). Ellenőrizd a számolást, és írj egész mondatos választ.', example: 'Pl.: Válasz: Panni 24 almát szedett.' }
    ],
    questions: [
      { t: 'mc', d: 1, q: 'Panni 3 kosár almát szedett, mindegyikben 8 alma van. Hány almát szedett?', pic: '🧺🧺🧺', a: ['24', '11', '38', '21'], ex: 'Egyenlő csoportok → szorzás: 3 · 8 = 24.' },
      { t: 'mc', d: 1, q: 'Bence 45 matricájából 18-at elajándékozott. Hány matricája maradt?', a: ['27', '63', '33', '37'], ex: 'Elajándékozott → kivonás: 45 − 18 = 27.' },
      { t: 'mc', d: 1, q: 'Egy osztályban 14 lány és 13 fiú van. Hányan vannak összesen?', a: ['27', '1', '26', '28'], ex: 'Összesen → összeadás: 14 + 13 = 27.' },
      { t: 'mc', d: 2, q: 'Egy doboz kekszben 24 darab van. 6 gyerek egyenlően osztozik rajta. Hány darab jut egy gyereknek?', pic: '🍪', a: ['4', '6', '18', '30'], ex: 'Egyenlően osztozik → osztás: 24 : 6 = 4.' },
      { t: 'mc', d: 2, q: 'Lili hetente 350 Ft zsebpénzt kap. Mennyit kap 4 hét alatt?', a: ['1 400 Ft', '1 200 Ft', '354 Ft', '1 500 Ft'], ex: 'Minden héten ugyanannyit → szorzás: 350 · 4 = 1 400 Ft.' },
      { t: 'mc', d: 2, q: 'Egy könyv 128 oldalas. Zsófi már 79 oldalt elolvasott. Hány oldal van még hátra?', pic: '📖', a: ['49', '51', '207', '59'], ex: 'Mennyi van még hátra → kivonás: 128 − 79 = 49.' },
      { t: 'mc', d: 2, q: 'Márk háromszor annyi idős, mint a 4 éves húga. Hány éves Márk?', a: ['12', '7', '1', '16'], ex: 'Háromszor annyi → szorzás: 4 · 3 = 12.' },
      { t: 'mc', d: 2, q: 'Egy busz 48 utassal indul. Az első megállóban 15-en leszállnak, 9-en felszállnak. Hányan utaznak most a buszon?', pic: '🚌', a: ['42', '54', '72', '24'], ex: '48 − 15 = 33, majd 33 + 9 = 42.' },
      { t: 'mc', d: 3, q: 'Egy füzet 180 Ft, egy toll 250 Ft. Anya 3 füzetet és 2 tollat vesz. Mennyit fizet?', a: ['1 040 Ft', '860 Ft', '1 290 Ft', '930 Ft'], ex: '3 · 180 = 540 Ft, 2 · 250 = 500 Ft, együtt 540 + 500 = 1 040 Ft.' },
      { t: 'mc', d: 3, q: 'Kati 2 000 Ft-tal megy a boltba. Vesz 3 kiflit darabonként 60 Ft-ért és egy 850 Ft-os sajtot. Mennyi pénze marad?', a: ['970 Ft', '1 030 Ft', '1 090 Ft', '1 870 Ft'], ex: '3 · 60 = 180 Ft, 180 + 850 = 1 030 Ft, 2 000 − 1 030 = 970 Ft.' },
      { t: 'mc', d: 3, q: 'A tanyán 5 tyúk és 3 kecske van. Hány lábuk van összesen?', pic: '🐔🐐', a: ['22', '16', '32', '8'], ex: 'A tyúknak 2, a kecskének 4 lába van: 5 · 2 + 3 · 4 = 10 + 12 = 22.' },
      { t: 'mc', d: 1, q: 'Egy virágágyásban 6 sorban nyílik tulipán, minden sorban 5. Hány tulipán van?', pic: '🌷🌷🌷🌷🌷', a: ['30', '11', '35', '25'], ex: '6 sor, soronként 5 → 6 · 5 = 30.' },
      { t: 'mc', d: 2, q: 'Dani 56 golyót egyenlően szétrak 7 zacskóba. Hány golyó lesz egy zacskóban?', a: ['8', '7', '49', '63'], ex: 'Egyenlően szétrak → osztás: 56 : 7 = 8.' },
      { t: 'mc', d: 3, q: 'Gergő gondolt egy számot. Megszorozta 4-gyel, majd hozzáadott 7-et, így 43-at kapott. Melyik számra gondolt?', a: ['9', '12', '50', '11'], ex: 'Visszafelé: 43 − 7 = 36, majd 36 : 4 = 9.' },
      { t: 'tf', d: 1, q: 'A „Hány almája lett összesen?” kérdésnél gyakran összeadunk.', a: true, ex: 'Igaz! Az „összesen” szó gyakran összeadást jelent.' },
      { t: 'tf', d: 2, q: 'Ha 4 gyerek 20 cukrot egyenlően eloszt egymás között, mindenkinek 4 jut.', a: false, ex: 'Hamis. 20 : 4 = 5, tehát mindenkinek 5 cukor jut.' },
      { t: 'tf', d: 2, q: 'Tomi 12 éves, Jani 5 évvel fiatalabb nála. Jani tehát 7 éves.', a: true, ex: 'Igaz! Fiatalabb → kivonás: 12 − 5 = 7.' },
      { t: 'tf', d: 3, q: 'Egy 1 000 Ft-os mozijegy és egy 450 Ft-os üdítő együtt többe kerül 1 500 Ft-nál.', a: false, ex: 'Hamis. 1 000 + 450 = 1 450 Ft, ez kevesebb 1 500 Ft-nál.' },
      { t: 'tf', d: 1, q: 'A „Mennyivel több?” kérdésnél a két számot kivonjuk egymásból.', a: true, ex: 'Igaz! A nagyobb számból kivonjuk a kisebbet.' },
      { t: 'input', d: 1, q: 'Egy dobozban 9 tojás van. Hány tojás van 4 ilyen dobozban?', pic: '🥚', a: '36', ex: '4 · 9 = 36.' },
      { t: 'input', d: 2, q: 'A cirkuszba 1 250 néző fér be. Már 875 jegyet eladtak. Hány jegy maradt még?', pic: '🎪', a: '375', ex: '1 250 − 875 = 375.' },
      { t: 'input', d: 2, q: 'Egy csokiszelet 12 kockából áll. Nóra megevett 3 szeletet. Hány kockát evett meg összesen?', pic: '🍫', a: '36', ex: '3 · 12 = 36.' },
      { t: 'input', d: 3, q: 'Kirándulni megy 4 osztály, mindegyikből 26 gyerek. Egy buszba 50 gyerek fér. Legalább hány busz kell?', pic: '🚌', a: '3', ex: '4 · 26 = 104 gyerek. 2 busz csak 100 gyereknek elég, ezért 3 busz kell.' },
      { t: 'input', d: 3, q: 'Peti 3 nap alatt 135 oldalt olvasott el, minden nap ugyanannyit. Hány oldalt olvasott naponta?', a: '45', ex: '135 : 3 = 45.' },
      { t: 'input', d: 2, q: 'Egy játék ára 4 500 Ft. Akcióban 1 200 Ft-tal olcsóbb. Mennyibe kerül most?', unit: 'Ft', a: '3300', ex: 'Olcsóbb → kivonás: 4 500 − 1 200 = 3 300 Ft.' },
      { t: 'order', d: 2, q: 'Rendezd sorba a szöveges feladat megoldásának lépéseit!', a: ['Elolvasom a feladatot.', 'Kigyűjtöm az adatokat.', 'Eldöntöm, milyen műveletet végzek.', 'Kiszámolom és ellenőrzöm.', 'Szöveges választ írok.'], ex: 'Olvasás → adatok → terv → számolás és ellenőrzés → válasz.' },
      { t: 'order', d: 2, q: 'Anna 9 éves. Béla 3 évvel idősebb Annánál, Cili 2 évvel fiatalabb Annánál, Dóri kétszer annyi idős, mint Cili. Rendezd őket a legfiatalabbtól a legidősebbig!', a: ['Cili', 'Anna', 'Béla', 'Dóri'], ex: 'Cili 7, Anna 9, Béla 12, Dóri 14 éves.' },
      { t: 'order', d: 3, q: 'Rendezd a kirándulás kiadásait a legkisebbtől a legnagyobbig! Vonatjegy: 3 · 400 Ft, ebéd: 2 · 900 Ft, fagyi: 5 · 300 Ft.', a: ['vonatjegy', 'fagyi', 'ebéd'], ex: 'Vonatjegy: 1 200 Ft, fagyi: 1 500 Ft, ebéd: 1 800 Ft.' },
      { t: 'match', d: 1, q: 'Párosítsd a kérdést a művelettel!', a: [['Hány van összesen?', 'összeadás'], ['Mennyivel kevesebb?', 'kivonás'], ['Mennyi a háromszorosa?', 'szorzás'], ['Egyenlően elosztva mennyi jut egynek?', 'osztás']], ex: 'Összesen → +, mennyivel kevesebb → −, háromszorosa → ·, egyenlően elosztva → :.' },
      { t: 'match', d: 2, q: 'Párosítsd a történetet az eredményével!', a: [['3 doboz, mindegyikben 7 ceruza', '21 ceruza'], ['20 ceruza 4 gyereknek egyenlően', '5 ceruza'], ['12 ceruzából 4 eltört', '8 ceruza']], ex: '3 · 7 = 21, 20 : 4 = 5, 12 − 4 = 8.' },
      { t: 'match', d: 3, q: 'Párosítsd a vásárlást az árával!', a: [['5 darab 120 Ft-os radír', '600 Ft'], ['2 darab 450 Ft-os füzet', '900 Ft'], ['4 darab 75 Ft-os ceruza', '300 Ft'], ['3 darab 250 Ft-os vonalzó', '750 Ft']], ex: '5 · 120 = 600, 2 · 450 = 900, 4 · 75 = 300, 3 · 250 = 750.' },
      { t: 'group', d: 1, q: 'Melyik kérdéshez kell összeadás, melyikhez kivonás?', groups: { 'Összeadás': ['Hány golyó van összesen?', 'Mennyi lett együtt?', 'Hány lett, ha még kapott 5-öt?'], 'Kivonás': ['Mennyi maradt?', 'Mennyivel több?', 'Hány hiányzik még?'] }, ex: 'Összesen, együtt, még kapott → +; maradt, mennyivel több, hiányzik → −.' },
      { t: 'group', d: 2, q: 'Szorzás vagy osztás kell hozzá?', groups: { 'Szorzás': ['5 sorban 6-6 szék', 'Hány nap 3 hét?', 'Hány zokni van 4 párban?'], 'Osztás': ['24 cukor 4 gyereknek egyenlően', 'Mennyi 30 perc fele?', '18 alma 3 tálba egyenlően'] }, ex: 'Egyenlő csoportok összevonása → szorzás; egyenlő részekre osztás → osztás.' }
    ],
    gen: function (d) {
      var N = P(NEVEK), s = P(szovegSablonok)(d, N);
      var u = s.unit ? ' ' + s.unit : '';
      var mode = d === 1 ? P(['input', 'mc']) : P(['input', 'input', 'mc', 'tf']);
      var r;
      if (mode === 'input') r = inp(d, s.q, s.ans, s.ex, s.unit);
      else if (mode === 'mc') r = numMC(d, s.q, s.ans, s.wr, s.ex, { suf: u, min: 1 });
      else {
        var claim = R(0, 1) ? s.ans : P(s.wr.filter(function (x) { return x !== s.ans && x > 0; }).concat([s.ans + 10]));
        r = tf(d, s.q + ' Igaz-e, hogy a válasz ' + F(claim) + u + '?', claim === s.ans, (claim === s.ans ? 'Igaz! ' : 'Hamis, a helyes válasz ' + F(s.ans) + u + '. ') + s.ex);
      }
      if (s.pic) r.pic = s.pic;
      return r;
    }
  };

  /* =====================================================================
     5. TÖRTEK
     ===================================================================== */
  var TORTNEV = { 2: 'fele', 3: 'harmada', 4: 'negyede', 5: 'ötöde', 6: 'hatoda', 8: 'nyolcada', 10: 'tizede' };
  var TARGY = [{ n: 'alma', dat: 'almának', acc: 'almát' }, { n: 'golyó', dat: 'golyónak', acc: 'golyót' }, { n: 'szem cukor', dat: 'szem cukornak', acc: 'szem cukrot' }, { n: 'matrica', dat: 'matricának', acc: 'matricát' }, { n: 'gyöngy', dat: 'gyöngynek', acc: 'gyöngyöt' }];
  var tortek = {
    id: 'tortek',
    name: 'Törtek',
    icon: '🍕',
    learn: [
      { title: 'Mi az a tört?', text: 'Ha egy egészet egyenlő részekre osztunk, a részeket törttel írjuk le. A vonal alatti szám, a nevező megmutatja, hány egyenlő részre osztottuk az egészet. A vonal feletti szám, a számláló megmutatja, hány ilyen részt veszünk.', example: 'Pl.: 3/4 → 4 egyenlő részre vágtuk, és 3 részt vettünk belőle 🍕' },
      { title: 'A törtek neve', text: 'Az 1/2 a fél, az 1/3 egy harmad, az 1/4 egy negyed, az 1/5 egy ötöd, az 1/10 egy tized. Ha a számláló és a nevező egyenlő, az pont egy egész.', example: 'Pl.: 2/2 = 3/3 = 4/4 = 1 egész; 2/4 = 1/2 (fél)' },
      { title: 'Törtrész kiszámítása', text: 'Egy szám törtrészét két lépésben kapjuk meg: előbb elosztjuk a nevezővel (ennyi egy rész), aztán megszorozzuk a számlálóval.', example: 'Pl.: 24-nek a 3/4 része: 24 : 4 = 6, és 6 · 3 = 18' },
      { title: 'Törtek összehasonlítása', text: 'Ha két törtnek ugyanaz a nevezője, az a nagyobb, amelyiknek nagyobb a számlálója. Ha a számláló egyforma (pl. 1), akkor a kisebb nevezőjű a nagyobb, mert kevesebb részre vágtuk az egészet, így nagyobbak a darabok.', example: 'Pl.: 5/8 > 3/8, de 1/3 > 1/5' }
    ],
    questions: [
      { t: 'mc', d: 1, q: 'Egy pizzát 4 egyenlő szeletre vágtunk. Mi a neve egy szeletnek?', pic: '🍕', a: ['negyed', 'fél', 'harmad', 'ötöd'], ex: '4 egyenlő rész → mindegyik rész egy negyed (1/4).' },
      { t: 'mc', d: 1, q: 'Hogyan írjuk számokkal: egy fél?', a: ['1/2', '2/1', '1/3', '2/2'], ex: 'A fél: 2 egyenlő részből 1 → 1/2.' },
      { t: 'mc', d: 1, q: 'A tortát 8 egyenlő szeletre vágták, Ádám megevett 3 szeletet. A torta mekkora részét ette meg?', pic: '🎂', a: ['3/8', '8/3', '3/5', '5/8'], ex: '8 egyenlő részből 3-at evett meg → 3/8.' },
      { t: 'mc', d: 2, q: 'Mennyi 12-nek a fele?', a: ['6', '4', '24', '3'], ex: '12 : 2 = 6.' },
      { t: 'mc', d: 2, q: 'Mennyi 20-nak az ötöde?', a: ['4', '5', '15', '100'], ex: '20 : 5 = 4.' },
      { t: 'mc', d: 2, q: 'Mennyi 24-nek a 3/4 része?', a: ['18', '6', '8', '21'], ex: '24 : 4 = 6 (egy negyed), 6 · 3 = 18.' },
      { t: 'mc', d: 2, q: 'Melyik tört a legnagyobb?', a: ['5/8', '3/8', '1/8', '2/8'], ex: 'Azonos nevezőnél az a nagyobb, amelyiknek nagyobb a számlálója: 5/8.' },
      { t: 'mc', d: 2, q: 'Mit mutat meg a 3/5 törtben az 5?', a: ['hány egyenlő részre osztottuk az egészet', 'hány részt vettünk el', 'mennyi maradt', 'hány egész van'], ex: 'Az 5 a nevező: ennyi egyenlő részre osztottuk az egészet.' },
      { t: 'mc', d: 3, q: 'Melyik a nagyobb: 1/3 vagy 1/5?', a: ['1/3', '1/5', 'egyenlők', 'nem lehet eldönteni'], ex: 'Ha 3 részre vágjuk, nagyobbak a darabok, mint ha 5 részre. Ezért 1/3 > 1/5.' },
      { t: 'mc', d: 1, q: 'A négyzetek hányad része zöld?', pic: '🟩🟩🟩⬜', a: ['3/4', '1/4', '3/3', '4/3'], ex: '4 négyzetből 3 zöld → 3/4.' },
      { t: 'mc', d: 3, q: 'Egy 30 fős osztály 2/5 része fiú. Hány fiú jár az osztályba?', a: ['12', '6', '15', '18'], ex: '30 : 5 = 6 (egy ötöd), 6 · 2 = 12 fiú.' },
      { t: 'mc', d: 2, q: 'Hány negyed van egy egészben?', a: ['4', '2', '1', '8'], ex: '4 negyed = 4/4 = 1 egész.' },
      { t: 'mc', d: 3, q: 'Egy zacskó golyó 1/4 része 5 golyó. Hány golyó van az egész zacskóban?', a: ['20', '9', '5', '25'], ex: 'Ha egy negyed 5, akkor a 4 negyed 4 · 5 = 20.' },
      { t: 'tf', d: 1, q: 'A fél ugyanannyi, mint 2/4.', a: true, ex: 'Igaz! Ha a felét még kettévágjuk, 2 negyedet kapunk.' },
      { t: 'tf', d: 1, q: 'A 4/4 egy egészet jelent.', a: true, ex: 'Igaz! Mind a 4 negyedet vesszük, ez az egész.' },
      { t: 'tf', d: 2, q: 'A 2/6 nagyobb, mint az 5/6.', a: false, ex: 'Hamis. Azonos nevezőnél a nagyobb számlálójú a nagyobb: 5/6 > 2/6.' },
      { t: 'tf', d: 2, q: 'Egy óra negyed része 15 perc.', a: true, ex: 'Igaz! 60 perc : 4 = 15 perc. Ezért mondjuk, hogy „negyed óra”.' },
      { t: 'tf', d: 3, q: 'Az 1/8 nagyobb, mint az 1/4.', a: false, ex: 'Hamis. Ha 8 részre vágunk valamit, kisebbek a darabok, mint 4 részre vágva.' },
      { t: 'tf', d: 2, q: '6 csokiból megeszem a harmadát. Így 4 csoki marad.', pic: '🍫🍫🍫🍫🍫🍫', a: true, ex: 'Igaz! 6 : 3 = 2-t eszem meg, 6 − 2 = 4 marad.' },
      { t: 'input', d: 1, q: 'Mennyi 10-nek a fele?', a: '5', ex: '10 : 2 = 5.' },
      { t: 'input', d: 2, q: 'Mennyi 18-nak a harmada?', a: '6', ex: '18 : 3 = 6.' },
      { t: 'input', d: 2, q: 'Mennyi 40-nek a 3/8 része?', a: '15', ex: '40 : 8 = 5, 5 · 3 = 15.' },
      { t: 'input', d: 3, q: 'Mennyi 100-nak a 7/10 része?', a: '70', ex: '100 : 10 = 10, 10 · 7 = 70.' },
      { t: 'input', d: 2, q: 'Hány perc egy óra harmada?', unit: 'perc', a: '20', ex: '60 : 3 = 20 perc.' },
      { t: 'input', d: 3, q: 'Mennyi 1 000 Ft-nak a 3/4 része?', unit: 'Ft', a: '750', ex: '1 000 : 4 = 250, 250 · 3 = 750 Ft.' },
      { t: 'order', d: 1, q: 'Rendezd növekvő sorrendbe!', a: ['1/5', '2/5', '3/5', '4/5'], ex: 'Azonos nevezőnél a számlálót kell nézni: 1, 2, 3, 4.' },
      { t: 'order', d: 2, q: 'Rendezd csökkenő sorrendbe!', a: ['7/9', '5/9', '4/9', '2/9'], ex: 'Azonos nevező: a legnagyobb számlálójú a legnagyobb.' },
      { t: 'order', d: 3, q: 'Rendezd növekvő sorrendbe! (Vigyázz, mindegyik számlálója 1!)', a: ['1/10', '1/6', '1/4', '1/2'], ex: 'Minél több részre vágunk, annál kisebb egy rész: 1/10 a legkisebb, 1/2 a legnagyobb.' },
      { t: 'match', d: 1, q: 'Párosítsd a törtet a nevével!', a: [['1/2', 'fél'], ['1/3', 'harmad'], ['1/4', 'negyed'], ['1/5', 'ötöd']], ex: '2 részből 1: fél; 3 részből 1: harmad; 4 részből 1: negyed; 5 részből 1: ötöd.' },
      { t: 'match', d: 2, q: 'Párosítsd a részt az értékével!', a: [['12 fele', '6'], ['12 harmada', '4'], ['12 negyede', '3'], ['12 hatoda', '2']], ex: '12 : 2 = 6, 12 : 3 = 4, 12 : 4 = 3, 12 : 6 = 2.' },
      { t: 'match', d: 2, q: 'Párosítsd a képet a törttel! (Mekkora rész kék?)', a: [['🟦⬜', '1/2'], ['🟦⬜⬜', '1/3'], ['🟦🟦⬜', '2/3'], ['🟦🟦🟦⬜', '3/4']], ex: 'Számold meg az összes négyzetet (nevező) és a kékeket (számláló)!' },
      { t: 'group', d: 2, q: 'Kisebb vagy nagyobb egy félnél?', groups: { 'Kisebb, mint 1/2': ['1/3', '1/4', '2/5'], 'Nagyobb, mint 1/2': ['2/3', '3/4', '4/5'] }, ex: 'Duplázd meg a számlálót! Ha kisebb a nevezőnél, a tört kisebb a félnél. Pl. 2/5: 2 · 2 = 4, és 4 < 5, tehát 2/5 kisebb a félnél.' },
      { t: 'group', d: 3, q: 'Válogasd szét az eredmény szerint!', groups: { 'Az eredmény 6': ['12 fele', '12-nek a 2/4 része', '12-nek a 3/6 része'], 'Az eredmény 4': ['12 harmada', '12-nek a 2/6 része', '12-nek a 4/12 része'] }, ex: 'Pl. 12-nek a 2/4 része: 12 : 4 = 3, 3 · 2 = 6. 12-nek a 2/6 része: 12 : 6 = 2, 2 · 2 = 4.' }
    ],
    gen: function (d) {
      var k = R(0, 7), den, num, base, part, ans, i;
      var dens = d === 1 ? [2, 3, 4, 5] : [2, 3, 4, 5, 6, 8, 10];
      if (k === 0 || k === 1) { // törtrész
        den = P(dens); num = d === 1 ? 1 : R(1, den - 1);
        base = den * R(2, d === 1 ? 10 : d === 2 ? 12 : 50);
        part = base / den; ans = part * num;
        var exx = F(base) + ' : ' + den + ' = ' + F(part) + (num > 1 ? ', és ' + F(part) + ' · ' + num + ' = ' + F(ans) + '.' : '.');
        if (k === 0) return inp(d, 'Mennyi ' + sx(base, 'dat') + ' ' + fart(num) + ' ' + num + '/' + den + ' része?', ans, exx);
        var tg = P(TARGY), left = d > 1 && R(0, 1) === 1;
        var q1 = 'Egy dobozban ' + F(base) + ' ' + tg.n + ' van. Ennek ' + fart(num) + ' ' + num + '/' + den + ' részét elajándékoztuk. Hány ' + tg.n + (left ? ' maradt a dobozban?' : ' volt az ajándék?');
        var a1 = left ? base - ans : ans;
        var e1 = exx + (left ? ' Maradt: ' + F(base) + ' − ' + F(ans) + ' = ' + F(base - ans) + '.' : '');
        if (R(0, 1)) return inp(d, q1, a1, e1);
        return numMC(d, q1, a1, [part, base - a1, a1 + part, a1 - part, base / num], e1, { min: 1 });
      }
      if (k === 2) { // azonos nevezőjű törtek: legnagyobb/legkisebb
        den = R(4, 12);
        var nums = distinct(4, function () { return R(1, den - 1); });
        var big = R(0, 1) === 1, best = big ? Math.max.apply(null, nums) : Math.min.apply(null, nums);
        return strMC(d, 'Melyik tört a ' + (big ? 'legnagyobb' : 'legkisebb') + '?', best + '/' + den,
          nums.filter(function (x) { return x !== best; }).map(function (x) { return x + '/' + den; }),
          'Azonos a nevező, ezért a számlálókat hasonlítjuk: ' + best + '/' + den + ' a ' + (big ? 'legnagyobb' : 'legkisebb') + '.');
      }
      if (k === 3) { // sorba rendezés
        var cnt = R(3, 4);
        if (d === 3 && R(0, 1)) {
          var ds = distinct(cnt, function () { return P([2, 3, 4, 5, 6, 8, 10, 12]); }).sort(function (a, b) { return b - a; });
          return { t: 'order', d: d, q: 'Rendezd növekvő sorrendbe!', a: ds.map(function (x) { return '1/' + x; }), ex: 'A számlálók egyformák (1), ezért a nagyobb nevezőjű a kisebb: minél több részre vágunk, annál kisebb egy darab.' };
        }
        den = R(4, 12);
        var ns = distinct(cnt, function () { return R(1, den); }).sort(function (a, b) { return a - b; });
        var desc = R(0, 1) === 1;
        if (desc) ns.reverse();
        return { t: 'order', d: d, q: desc ? 'Rendezd csökkenő sorrendbe!' : 'Rendezd növekvő sorrendbe!', a: ns.map(function (x) { return x + '/' + den; }), ex: 'Azonos nevezőnél a számlálók döntenek.' };
      }
      if (k === 4) { // kép alapján
        var n = d === 1 ? R(2, 5) : R(3, 10), c = R(1, n - 1);
        var col = P([['🟧', 'narancssárga'], ['🟦', 'kék'], ['🟩', 'zöld'], ['🟥', 'piros']]);
        var wr = [(n - c) + '/' + n, n + '/' + c, c + '/' + (n + 1), (c + 1) + '/' + n];
        if (c > 1) wr.push((c - 1) + '/' + n);
        return strMC(d, 'A négyzetek hányad része ' + col[1] + '?', c + '/' + n, wr,
          'Összesen ' + n + ' négyzet van (nevező), ebből ' + c + ' ' + col[1] + ' (számláló) → ' + c + '/' + n + '.', { pic: rep(col[0], c) + rep('⬜', n - c) });
      }
      if (k === 5) { // igaz/hamis összehasonlítás
        if (d === 1 || R(0, 1)) {
          den = R(3, 10);
          var pr = distinct(2, function () { return R(1, den - 1); });
          return tf(d, pr[0] + '/' + den + ' nagyobb, mint ' + pr[1] + '/' + den + '.', pr[0] > pr[1], 'Azonos a nevező, ezért a nagyobb számlálójú a nagyobb: ' + Math.max(pr[0], pr[1]) + '/' + den + '.');
        }
        var dd = distinct(2, function () { return P([2, 3, 4, 5, 6, 8, 10]); });
        return tf(d, '1/' + dd[0] + ' nagyobb, mint 1/' + dd[1] + '.', dd[0] < dd[1], 'Ugyanaz a számláló, ezért a kisebb nevezőjű a nagyobb: 1/' + Math.min(dd[0], dd[1]) + '.');
      }
      if (k === 6) { // egészből rész / részből egész
        den = P([2, 3, 4, 5, 6, 8, 10]);
        if (d < 3) {
          part = R(2, 15);
          return inp(d, 'Egy szalagnak ' + fart(1) + ' 1/' + den + ' része ' + part + ' cm. Milyen hosszú az egész szalag?', part * den,
            'Az egész ' + den + ' ilyen részből áll: ' + part + ' · ' + den + ' = ' + (part * den) + ' cm.', 'cm');
        }
        den = P([3, 4, 5, 6, 8, 10]); num = R(2, den - 1); part = R(2, 9);
        return inp(d, 'Egy kirándulócsoport ' + num + '/' + den + ' része ' + (part * num) + ' gyerek. Hány gyerek van a csoportban?', part * den,
          'Egy rész (1/' + den + '): ' + (part * num) + ' : ' + num + ' = ' + part + ' gyerek. Az egész: ' + part + ' · ' + den + ' = ' + (part * den) + ' gyerek.');
      }
      // k === 7: párosítás
      base = P([12, 24, 36, 60]);
      var divs = [2, 3, 4, 5, 6, 8, 10].filter(function (x) { return base % x === 0; });
      var pick = shuf(divs).slice(0, d === 1 ? 3 : 4);
      return { t: 'match', d: d, q: 'Párosítsd a részt az értékével!', a: pick.map(function (x) { return [base + ' ' + TORTNEV[x], String(base / x)]; }),
        ex: pick.map(function (x) { return base + ' : ' + x + ' = ' + (base / x); }).join(', ') + '.' };
    }
  };

  /* =====================================================================
     6. MÉRTÉKEGYSÉGEK
     ===================================================================== */
  var MERTEK = [
    [['mm', 1], ['cm', 10], ['dm', 100], ['m', 1000], ['km', 1000000]],
    [['g', 1], ['dkg', 10], ['kg', 1000], ['t', 1000000]],
    [['ml', 1], ['cl', 10], ['dl', 100], ['l', 1000], ['hl', 100000]],
    [['mp', 1], ['perc', 60], ['óra', 3600], ['nap', 86400], ['hét', 604800]]
  ];
  var VEGYES = [['m', 'cm', 100], ['km', 'm', 1000], ['kg', 'dkg', 100], ['kg', 'g', 1000], ['l', 'dl', 10], ['óra', 'perc', 60], ['perc', 'mp', 60], ['dm', 'cm', 10], ['m', 'dm', 10], ['t', 'kg', 1000], ['l', 'ml', 1000], ['cm', 'mm', 10]];
  function unitPair(d) { // [nagy, kicsi, váltószám]
    var ci = R(0, 3), cat = MERTEK[ci], i, j, guard = 0;
    do {
      i = R(0, cat.length - 2);
      j = (ci === 3 || d === 1) ? i + 1 : R(i + 1, cat.length - 1);
    } while (cat[j][1] / cat[i][1] > 1000 && guard++ < 50);
    if (cat[j][1] / cat[i][1] > 1000) { i = 0; j = 1; }
    return [cat[j][0], cat[i][0], cat[j][1] / cat[i][1]];
  }
  var mertek = {
    id: 'mertek',
    name: 'Mértékegységek',
    icon: '📏',
    learn: [
      { title: 'Hosszúság', text: 'A hosszúság mértékegységei: milliméter (mm), centiméter (cm), deciméter (dm), méter (m), kilométer (km). A kisebb egységről a nagyobbra lépve általában tízszeres a váltás, de a km-nél ezres!', example: '1 cm = 10 mm, 1 dm = 10 cm, 1 m = 10 dm = 100 cm, 1 km = 1 000 m' },
      { title: 'Tömeg', text: 'A tömeg mértékegységei: gramm (g), dekagramm (dkg), kilogramm (kg), tonna (t). A boltban a felvágottat dkg-ban, a krumplit kg-ban, a teherautó rakományát tonnában mérik.', example: '1 dkg = 10 g, 1 kg = 100 dkg = 1 000 g, 1 t = 1 000 kg' },
      { title: 'Űrtartalom', text: 'Az űrtartalom (mennyi fér bele valamibe) mértékegységei: milliliter (ml), centiliter (cl), deciliter (dl), liter (l), hektoliter (hl).', example: '1 cl = 10 ml, 1 dl = 10 cl = 100 ml, 1 l = 10 dl = 1 000 ml, 1 hl = 100 l' },
      { title: 'Idő', text: 'Az időt másodpercben (mp), percben, órában, napban, hétben, hónapban és évben mérjük. Itt nem tízes a váltás, ezért jól meg kell tanulni!', example: '1 perc = 60 mp, 1 óra = 60 perc, 1 nap = 24 óra, 1 hét = 7 nap, 1 év = 12 hónap = 365 vagy 366 nap' },
      { title: 'Pénz', text: 'Magyarország pénze a forint (Ft). Érmék: 5, 10, 20, 50, 100 és 200 Ft. Bankjegyek: 500, 1 000, 2 000, 5 000, 10 000 és 20 000 Ft. Visszajárónál kivonunk: fizetett összeg − ár.', example: 'Pl.: 2 000 Ft-tal fizetek egy 1 350 Ft-os könyvért → 650 Ft a visszajáró' }
    ],
    questions: [
      { t: 'mc', d: 1, q: 'Hány cm 1 m?', a: ['100 cm', '10 cm', '1 000 cm', '60 cm'], ex: '1 m = 10 dm = 100 cm.' },
      { t: 'mc', d: 1, q: 'Melyik mértékegységben a legcélszerűbb megadni egy alma tömegét?', pic: '🍎', a: ['dkg', 't', 'km', 'l'], ex: 'Egy alma kb. 15–20 dkg. A tonna túl nagy, a km és az l nem is tömeg.' },
      { t: 'mc', d: 1, q: 'Hány perc 1 óra?', a: ['60', '100', '24', '30'], ex: '1 óra = 60 perc.' },
      { t: 'mc', d: 2, q: 'Hány g 1 kg?', a: ['1 000 g', '100 g', '10 g', '10 000 g'], ex: '1 kg = 100 dkg = 1 000 g.' },
      { t: 'mc', d: 2, q: 'Hány dl 1 l?', a: ['10 dl', '100 dl', '1 000 dl', '5 dl'], ex: '1 l = 10 dl.' },
      { t: 'mc', d: 2, q: '3 km = ? m', a: ['3 000 m', '300 m', '30 m', '30 000 m'], ex: '1 km = 1 000 m, ezért 3 km = 3 000 m.' },
      { t: 'mc', d: 1, q: 'Hány nap 1 hét?', a: ['7', '5', '10', '12'], ex: 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap: 7 nap.' },
      { t: 'mc', d: 2, q: 'Mennyi 250 cm?', a: ['2 m 50 cm', '25 m', '2 m 5 cm', '250 m'], ex: '100 cm = 1 m, ezért 250 cm = 2 m 50 cm.' },
      { t: 'mc', d: 3, q: '2 kg 30 dkg = ? dkg', a: ['230 dkg', '2 030 dkg', '203 dkg', '2 300 dkg'], ex: '2 kg = 200 dkg, és 200 + 30 = 230 dkg.' },
      { t: 'mc', d: 3, q: 'Hány mp 3 perc?', a: ['180', '300', '90', '360'], ex: '1 perc = 60 mp, ezért 3 perc = 3 · 60 = 180 mp.' },
      { t: 'mc', d: 2, q: 'Melyik bankjegy NEM létezik Magyarországon?', pic: '💵', a: ['3 000 Ft', '1 000 Ft', '2 000 Ft', '5 000 Ft'], ex: 'Bankjegyek: 500, 1 000, 2 000, 5 000, 10 000, 20 000 Ft. 3 000 Ft-os nincs.' },
      { t: 'mc', d: 1, q: 'Hány hónap 1 év?', a: ['12', '10', '52', '365'], ex: 'Januártól decemberig 12 hónap van.' },
      { t: 'mc', d: 3, q: 'Melyik a leghosszabb?', a: ['2 km', '1 900 m', '150 dm', '9 000 cm'], ex: 'Váltsd át méterbe: 2 km = 2 000 m, 1 900 m, 150 dm = 15 m, 9 000 cm = 90 m.' },
      { t: 'mc', d: 2, q: 'Hány liter 1 hl?', a: ['100', '10', '1 000', '50'], ex: '1 hl = 100 l.' },
      { t: 'tf', d: 1, q: '1 dm = 10 cm', a: true, ex: 'Igaz! 1 dm = 10 cm.' },
      { t: 'tf', d: 2, q: '1 t = 100 kg', a: false, ex: 'Hamis. 1 t = 1 000 kg.' },
      { t: 'tf', d: 1, q: 'Egy nap 24 órából áll.', a: true, ex: 'Igaz! 1 nap = 24 óra.' },
      { t: 'tf', d: 2, q: 'Februárban mindig 28 nap van.', a: false, ex: 'Hamis. Szökőévben a február 29 napos.' },
      { t: 'tf', d: 2, q: '5 l = 50 dl', a: true, ex: 'Igaz! 1 l = 10 dl, ezért 5 l = 50 dl.' },
      { t: 'input', d: 1, q: '4 m = ? dm', unit: 'dm', a: '40', ex: '1 m = 10 dm, ezért 4 m = 40 dm.' },
      { t: 'input', d: 2, q: '7 kg = ? dkg', unit: 'dkg', a: '700', ex: '1 kg = 100 dkg, ezért 7 kg = 700 dkg.' },
      { t: 'input', d: 2, q: '2 óra = ? perc', unit: 'perc', a: '120', ex: '1 óra = 60 perc, ezért 2 óra = 120 perc.' },
      { t: 'input', d: 3, q: '3 l 5 dl = ? dl', unit: 'dl', a: '35', ex: '3 l = 30 dl, és 30 + 5 = 35 dl.' },
      { t: 'input', d: 2, q: '6 000 g = ? kg', unit: 'kg', a: '6', ex: '1 000 g = 1 kg, ezért 6 000 g = 6 kg.' },
      { t: 'input', d: 3, q: 'Hány perc 1 óra 45 perc?', unit: 'perc', a: '105', ex: '1 óra = 60 perc, és 60 + 45 = 105 perc.' },
      { t: 'input', d: 2, q: 'Anna egy 1 350 Ft-os könyvet 2 000 Ft-tal fizetett ki. Mennyi pénzt kapott vissza?', unit: 'Ft', a: '650', ex: '2 000 − 1 350 = 650 Ft.' },
      { t: 'order', d: 1, q: 'Rendezd a mértékegységeket a legkisebbtől a legnagyobbig!', a: ['mm', 'cm', 'dm', 'm', 'km'], ex: 'mm < cm < dm < m < km.' },
      { t: 'order', d: 2, q: 'Rendezd növekvő sorrendbe!', a: ['30 g', '5 dkg', '1 kg', '1 t'], ex: '5 dkg = 50 g, 1 kg = 1 000 g, 1 t = 1 000 kg.' },
      { t: 'order', d: 2, q: 'Rendezd az időegységeket a legrövidebbtől a leghosszabbig!', a: ['mp', 'perc', 'óra', 'nap', 'hét'], ex: '60 mp = 1 perc, 60 perc = 1 óra, 24 óra = 1 nap, 7 nap = 1 hét.' },
      { t: 'order', d: 3, q: 'Rendezd növekvő sorrendbe! Vigyázz a mértékegységekre!', a: ['8 dl', '1 l', '15 dl', '2 l'], ex: 'Váltsd át dl-be: 8 dl, 10 dl, 15 dl, 20 dl.' },
      { t: 'match', d: 1, q: 'Párosítsd az egyenlő hosszúságokat!', a: [['1 cm', '10 mm'], ['1 m', '100 cm'], ['1 km', '1 000 m']], ex: '1 cm = 10 mm, 1 m = 100 cm, 1 km = 1 000 m.' },
      { t: 'match', d: 2, q: 'Párosítsd az egyenlő tömegeket!', a: [['1 kg', '100 dkg'], ['1 dkg', '10 g'], ['1 t', '1 000 kg']], ex: '1 kg = 100 dkg, 1 dkg = 10 g, 1 t = 1 000 kg.' },
      { t: 'match', d: 2, q: 'Párosítsd az egyenlő űrtartalmakat!', a: [['1 l', '10 dl'], ['1 dl', '10 cl'], ['1 cl', '10 ml'], ['1 hl', '100 l']], ex: '1 l = 10 dl, 1 dl = 10 cl, 1 cl = 10 ml, 1 hl = 100 l.' },
      { t: 'match', d: 1, q: 'Párosítsd az egyenlő időtartamokat!', a: [['1 óra', '60 perc'], ['1 perc', '60 mp'], ['1 nap', '24 óra'], ['1 hét', '7 nap']], ex: '1 óra = 60 perc, 1 perc = 60 mp, 1 nap = 24 óra, 1 hét = 7 nap.' },
      { t: 'group', d: 1, q: 'Mit mér a mértékegység?', groups: { 'Hosszúság': ['km', 'cm', 'mm'], 'Tömeg': ['kg', 'dkg', 'g'], 'Űrtartalom': ['l', 'dl'] }, ex: 'Hosszúság: mm, cm, km. Tömeg: g, dkg, kg. Űrtartalom: dl, l.' },
      { t: 'group', d: 2, q: 'Mit mérünk literrel, és mit kilogrammal?', groups: { 'Literrel': ['a kádban lévő víz', 'egy flakon üdítő', 'a tej a dobozban'], 'Kilogrammal': ['egy zsák krumpli', 'egy görögdinnye', 'egy kiskutya'] }, ex: 'Folyadékok mennyiségét literrel, tárgyak és élőlények tömegét kilogrammal mérjük.' }
    ],
    gen: function (d) {
      var k = R(0, 7), up, v, big, small, ratio, ans;
      if (k <= 2) {
        up = unitPair(d); big = up[0]; small = up[1]; ratio = up[2];
        var lim = Math.max(1, Math.min(d === 1 ? 10 : d === 2 ? 50 : 200, Math.floor(9999 / ratio)));
        v = R(1, lim);
        var down = k === 0 || (k === 2 && R(0, 1) === 1);
        if (down) {
          ans = v * ratio;
          var exd = '1 ' + big + ' = ' + F(ratio) + ' ' + small + ', ezért ' + F(v) + ' ' + big + ' = ' + F(v) + ' · ' + F(ratio) + ' = ' + F(ans) + ' ' + small + '.';
          if (k === 0) return inp(d, F(v) + ' ' + big + ' = ? ' + small, ans, exd, small);
          return numMC(d, F(v) + ' ' + big + ' = ? ' + small, ans, [ans * 10, ans / 10, ans * 100, ans / 100, v * 10, v * 100, v * 1000, v * 60], exd, { suf: ' ' + small, min: 1 });
        }
        ans = v;
        var exu = '1 ' + big + ' = ' + F(ratio) + ' ' + small + ', ezért ' + F(v * ratio) + ' ' + small + ' = ' + F(v * ratio) + ' : ' + F(ratio) + ' = ' + F(v) + ' ' + big + '.';
        if (k === 1) return inp(d, F(v * ratio) + ' ' + small + ' = ? ' + big, ans, exu, big);
        return numMC(d, F(v * ratio) + ' ' + small + ' = ? ' + big, ans, [v * 10, v * 100, v * ratio / 100, v * ratio / 10, v + 10], exu, { suf: ' ' + big, min: 1 });
      }
      if (k === 3) { // összetett átváltás
        var vp = P(d === 1 ? VEGYES.filter(function (x) { return x[2] <= 100; }) : VEGYES);
        var a = R(1, 9), b = R(1, vp[2] - 1);
        ans = a * vp[2] + b;
        return inp(d, 'Hány ' + vp[1] + ' ennyi: ' + a + ' ' + vp[0] + ' ' + b + ' ' + vp[1] + '?', ans,
          a + ' ' + vp[0] + ' = ' + F(a * vp[2]) + ' ' + vp[1] + ', és ' + F(a * vp[2]) + ' + ' + b + ' = ' + F(ans) + ' ' + vp[1] + '.', vp[1]);
      }
      if (k === 4) { // összehasonlítás
        up = unitPair(d); big = up[0]; small = up[1]; ratio = up[2];
        v = R(1, Math.max(1, Math.min(20, Math.floor(9999 / ratio))));
        var bs = v * ratio, w = bs + P([0, 0, -1, 1]) * P([1, Math.max(1, Math.floor(ratio / 10)), ratio / 2 >= 1 ? Math.floor(ratio / 2) : 1]);
        if (w <= 0) w = bs;
        var rel = P(['>', '<', '=']);
        var truth = rel === '>' ? bs > w : rel === '<' ? bs < w : bs === w;
        return tf(d, F(v) + ' ' + big + ' ' + rel + ' ' + F(w) + ' ' + small, truth,
          'Váltsd át: ' + F(v) + ' ' + big + ' = ' + F(bs) + ' ' + small + '. Így az állítás ' + (truth ? 'igaz.' : 'hamis.'));
      }
      if (k === 5) { // visszajáró
        var price = d === 1 ? R(5, 49) * 10 : d === 2 ? R(51, 199) * 10 : R(210, 999) * 10;
        var notes = [500, 1000, 2000, 5000, 10000].filter(function (x) { return x > price; }), note = notes[d === 3 ? R(0, Math.min(1, notes.length - 1)) : 0];
        var N = P(NEVEK);
        return inp(d, N + ' egy ' + F(price) + ' Ft-os ' + P(['könyvet', 'társasjátékot', 'labdát', 'pólót']) + ' vett, és ' + F(note) + ' Ft-tal fizetett. Mennyi pénzt kapott vissza?', note - price,
          'Visszajáró = fizetett összeg − ár: ' + F(note) + ' − ' + F(price) + ' = ' + F(note - price) + ' Ft.', 'Ft');
      }
      if (k === 6) { // sorba rendezés vegyes egységekkel
        var vp2 = P(VEGYES), r2 = vp2[2];
        var vals = distinct(4, function () {
          return R(0, 1) ? R(1, 9) * r2 : R(1, 10 * r2 - 1);
        });
        vals.sort(function (x, y) { return x - y; });
        var lab = vals.map(function (x) { return (x % r2 === 0 && R(0, 2) > 0) ? F(x / r2) + ' ' + vp2[0] : F(x) + ' ' + vp2[1]; });
        return { t: 'order', d: d, q: 'Rendezd növekvő sorrendbe!', a: lab, ex: 'Váltsd át mindet ugyanarra a mértékegységre (' + vp2[1] + '): ' + vals.map(function (x) { return F(x) + ' ' + vp2[1]; }).join(', ') + '.' };
      }
      // k === 7: párosítás
      var guard = 0, pairs;
      do {
        pairs = shuf(VEGYES).slice(0, d === 1 ? 3 : 4).map(function (x) { var n = R(2, 9); return [F(n) + ' ' + x[0], F(n * x[2]) + ' ' + x[1]]; });
        var all = [].concat.apply([], pairs);
        var uniq = all.filter(function (x, i) { return all.indexOf(x) === i; }).length === all.length;
      } while (!uniq && guard++ < 50);
      return { t: 'match', d: d, q: 'Párosítsd az egyenlő mennyiségeket!', a: pairs, ex: 'Gondolj a váltószámokra: ' + pairs.map(function (p) { return p[0] + ' = ' + p[1]; }).join(', ') + '.' };
    }
  };

  /* =====================================================================
     7. GEOMETRIA
     ===================================================================== */
  var TULAJD = [
    ['Hány csúcsa van egy kockának?', 8, [6, 12, 4], 'A kockának 8 csúcsa van: 4 felül és 4 alul.'],
    ['Hány éle van egy kockának?', 12, [6, 8, 10], 'A kockának 12 éle van: 4 felül, 4 alul és 4 függőleges.'],
    ['Hány lapja van egy kockának?', 6, [4, 8, 12], 'A kockának 6 lapja van, mindegyik négyzet – mint a dobókockán.'],
    ['Hány csúcsa van egy téglatestnek?', 8, [6, 12, 4], 'A téglatestnek 8 csúcsa van, akárcsak a kockának.'],
    ['Hány éle van egy téglatestnek?', 12, [6, 8, 10], 'A téglatestnek 12 éle van.'],
    ['Hány lapja van egy téglatestnek?', 6, [4, 8, 12], 'A téglatestnek 6 téglalap alakú lapja van.'],
    ['Hány csúcsa van egy háromszögnek?', 3, [2, 4, 6], 'A háromszögnek 3 csúcsa és 3 oldala van.'],
    ['Hány oldala van egy négyzetnek?', 4, [3, 5, 8], 'A négyzetnek 4 egyenlő hosszú oldala van.'],
    ['Hány derékszöge van egy téglalapnak?', 4, [2, 1, 0], 'A téglalap mind a 4 szöge derékszög.'],
    ['Hány csúcsa van egy körnek?', 0, [1, 2, 4], 'A körnek nincs csúcsa, a vonala végig görbe.'],
    ['Hány derékszöge van egy négyzetnek?', 4, [2, 1, 0], 'A négyzet mind a 4 szöge derékszög.']
  ];
  var geometria = {
    id: 'geometria',
    name: 'Geometria',
    icon: '📐',
    learn: [
      { title: 'Síkidomok', text: 'A síkidomok laposak, mint egy rajz a papíron. A négyzetnek 4 egyenlő oldala és 4 derékszöge van. A téglalap szemközti oldalai egyenlők, és 4 derékszöge van. A háromszögnek 3 oldala és 3 csúcsa van. A körnek nincs csúcsa.', example: 'Minden négyzet téglalap is, de nem minden téglalap négyzet!' },
      { title: 'Testek', text: 'A testek térbeliek, meg lehet fogni őket. A kockának 6 négyzet alakú lapja, 12 éle és 8 csúcsa van. A téglatestnek is 6 lapja, 12 éle és 8 csúcsa van, de a lapjai téglalapok. A gömb gömbölyű, nincs éle.', example: 'Kocka: 🎲  Téglatest: 📦  Gömb: ⚽' },
      { title: 'Kerület', text: 'A kerület a síkidom körüli vonal hossza: az oldalak hosszának összege. Négyzetnél: 4 · oldal. Téglalapnál: 2 · (hosszúság + szélesség).', example: 'Pl.: 6 cm és 4 cm oldalú téglalap: K = 2 · (6 + 4) = 20 cm' },
      { title: 'Terület', text: 'A terület megmutatja, hány egységnyi négyzet fedi le a síkidomot. Téglalapnál: hosszúság · szélesség. Négyzetnél: oldal · oldal. Mértékegysége pl. cm² (négyzetcentiméter) vagy m².', example: 'Pl.: 6 cm és 4 cm oldalú téglalap: T = 6 · 4 = 24 cm²' },
      { title: 'Párhuzamos, merőleges, tükrözés', text: 'A párhuzamos egyenesek sehol sem találkoznak, mint a sínpár. A merőleges egyenesek derékszögben metszik egymást, mint a füzetlap két szomszédos széle. A tükörtengely két egyforma, tükörképi félre osztja az alakzatot.', example: 'Pl.: az „A” betűnek van függőleges tükörtengelye.' }
    ],
    questions: [
      { t: 'mc', d: 1, q: 'Hány csúcsa van egy háromszögnek?', pic: '🔺', a: ['3', '4', '2', '6'], ex: 'A háromszögnek 3 csúcsa, 3 oldala van.' },
      { t: 'mc', d: 1, q: 'Melyik síkidomnak nincs csúcsa?', a: ['kör', 'négyzet', 'háromszög', 'téglalap'], ex: 'A kör vonala végig görbe, nincs rajta csúcs.' },
      { t: 'mc', d: 1, q: 'Hány lapja van egy kockának?', pic: '🎲', a: ['6', '4', '8', '12'], ex: 'A dobókockán 1-től 6-ig vannak a pöttyök, mert 6 lapja van.' },
      { t: 'mc', d: 2, q: 'Hány éle van egy kockának?', a: ['12', '6', '8', '10'], ex: '4 él felül, 4 alul és 4 függőleges: 12.' },
      { t: 'mc', d: 2, q: 'Hány csúcsa van egy téglatestnek?', pic: '📦', a: ['8', '6', '12', '4'], ex: '4 csúcs felül és 4 alul: 8.' },
      { t: 'mc', d: 2, q: 'Mennyi az 5 cm oldalú négyzet kerülete?', a: ['20 cm', '25 cm', '10 cm', '15 cm'], ex: 'K = 4 · 5 = 20 cm.' },
      { t: 'mc', d: 2, q: 'Mennyi a 6 cm és 4 cm oldalú téglalap kerülete?', a: ['20 cm', '24 cm', '10 cm', '14 cm'], ex: 'K = 2 · (6 + 4) = 2 · 10 = 20 cm.' },
      { t: 'mc', d: 2, q: 'Mennyi a 6 cm és 4 cm oldalú téglalap területe?', a: ['24 cm²', '20 cm²', '10 cm²', '48 cm²'], ex: 'T = 6 · 4 = 24 cm².' },
      { t: 'mc', d: 3, q: 'Egy négyzet kerülete 36 cm. Milyen hosszú egy oldala?', a: ['9 cm', '6 cm', '12 cm', '18 cm'], ex: 'A négyzetnek 4 egyenlő oldala van: 36 : 4 = 9 cm.' },
      { t: 'mc', d: 1, q: 'Milyen alakú a dobókocka egy lapja?', pic: '🎲', a: ['négyzet', 'kör', 'háromszög', 'hatszög'], ex: 'A kocka minden lapja négyzet.' },
      { t: 'mc', d: 2, q: 'Milyen szöget zár be a füzetlap két szomszédos széle?', a: ['derékszöget', 'tompaszöget', 'hegyesszöget', 'egyenesszöget'], ex: 'A füzetlap sarka derékszög, a két széle merőleges egymásra.' },
      { t: 'mc', d: 2, q: 'Milyen helyzetű egymáshoz képest a vasúti sín két sínszála?', pic: '🛤️', a: ['párhuzamos', 'merőleges', 'egymást metsző', 'derékszöget zár be'], ex: 'A sínszálak sehol sem találkoznak: párhuzamosak.' },
      { t: 'mc', d: 3, q: 'Egy téglalap területe 32 cm², egyik oldala 8 cm. Milyen hosszú a másik oldala?', a: ['4 cm', '24 cm', '16 cm', '6 cm'], ex: 'T = a · b, tehát 32 : 8 = 4 cm.' },
      { t: 'mc', d: 1, q: 'Melyik test gurul el bármerre könnyen?', a: ['gömb', 'kocka', 'téglatest', 'gúla'], ex: 'A gömbnek nincs éle és lapja, ezért minden irányba gurul. ⚽' },
      { t: 'tf', d: 1, q: 'A négyzet minden oldala egyenlő hosszú.', a: true, ex: 'Igaz! A négyzet 4 oldala egyforma hosszú.' },
      { t: 'tf', d: 3, q: 'Minden négyzet téglalap is.', a: true, ex: 'Igaz! A négyzetnek is 4 derékszöge van, és a szemközti oldalai egyenlők – ez egy különleges téglalap.' },
      { t: 'tf', d: 1, q: 'A körnek 4 csúcsa van.', a: false, ex: 'Hamis. A körnek egyáltalán nincs csúcsa.' },
      { t: 'tf', d: 2, q: 'A téglalap szemközti oldalai párhuzamosak.', a: true, ex: 'Igaz! A téglalap szemközti oldalai párhuzamosak és egyenlő hosszúak.' },
      { t: 'tf', d: 3, q: 'Ha egy négyzet oldalát kétszeresére növeljük, a területe is csak kétszeresére nő.', a: false, ex: 'Hamis. Pl. 2 cm oldal: 4 cm², 4 cm oldal: 16 cm² – ez négyszeres!' },
      { t: 'tf', d: 2, q: 'Az „A” nagybetűnek van függőleges tükörtengelye.', a: true, ex: 'Igaz! Ha függőlegesen középen összehajtod, a két fele fedi egymást.' },
      { t: 'input', d: 1, q: 'Mennyi a 3 cm oldalú négyzet kerülete?', unit: 'cm', a: '12', ex: 'K = 4 · 3 = 12 cm.' },
      { t: 'input', d: 2, q: 'Mennyi a 7 cm oldalú négyzet területe?', unit: 'cm²', a: '49', ex: 'T = 7 · 7 = 49 cm².' },
      { t: 'input', d: 2, q: 'Egy téglalap oldalai 9 cm és 3 cm. Mennyi a kerülete?', unit: 'cm', a: '24', ex: 'K = 2 · (9 + 3) = 2 · 12 = 24 cm.' },
      { t: 'input', d: 3, q: 'Egy téglalap alakú kert 12 m hosszú és 8 m széles. Hány méter kerítés kell körbe?', pic: '🏡', unit: 'm', a: '40', ex: 'A kerítés hossza a kerület: 2 · (12 + 8) = 40 m.' },
      { t: 'input', d: 3, q: 'Egy szoba padlója 5 m és 4 m oldalú téglalap. Mennyi a területe?', unit: 'm²', a: '20', ex: 'T = 5 · 4 = 20 m².' },
      { t: 'input', d: 2, q: 'Hány éle van egy téglatestnek?', a: '12', ex: '4 él felül, 4 alul, 4 függőleges: 12.' },
      { t: 'order', d: 1, q: 'Rendezd a síkidomokat a csúcsaik száma szerint, a legkevesebbtől!', a: ['kör', 'háromszög', 'téglalap', 'hatszög'], ex: 'Kör: 0, háromszög: 3, téglalap: 4, hatszög: 6 csúcs.' },
      { t: 'order', d: 2, q: 'Rendezd a téglalapokat a területük szerint növekvő sorrendbe!', a: ['2 cm × 3 cm', '2 cm × 4 cm', '3 cm × 3 cm', '4 cm × 4 cm'], ex: 'Területek: 6, 8, 9, 16 cm².' },
      { t: 'order', d: 3, q: 'Rendezd a kerületük szerint növekvő sorrendbe!', a: ['2 cm oldalú négyzet', '1 cm × 5 cm-es téglalap', '4 cm oldalú négyzet', '3 cm × 6 cm-es téglalap'], ex: 'Kerületek: 8, 12, 16, 18 cm.' },
      { t: 'match', d: 1, q: 'Párosítsd a testet a tárggyal!', a: [['kocka', '🎲'], ['gömb', '⚽'], ['téglatest', '📦'], ['henger', '🥫']], ex: 'A dobókocka kocka, a labda gömb, a doboz téglatest, a konzerv henger.' },
      { t: 'match', d: 2, q: 'Párosítsd a képletet! (a, b: oldalak)', a: [['négyzet kerülete', '4 · a'], ['téglalap kerülete', '2 · (a + b)'], ['téglalap területe', 'a · b'], ['négyzet területe', 'a · a']], ex: 'Kerület: az oldalak összege. Terület: a két oldal szorzata.' },
      { t: 'match', d: 2, q: 'Párosítsd a kocka részeit a számukkal!', a: [['a kocka csúcsai', '8'], ['a kocka élei', '12'], ['a kocka lapjai', '6']], ex: 'A kockának 8 csúcsa, 12 éle és 6 lapja van.' },
      { t: 'group', d: 1, q: 'Síkidom vagy test?', groups: { 'Síkidom': ['négyzet', 'kör', 'háromszög'], 'Test': ['kocka', 'gömb', 'téglatest'] }, ex: 'A síkidom lapos, a test térbeli, meg lehet fogni.' },
      { t: 'group', d: 2, q: 'Van-e a betűnek tükörtengelye?', groups: { 'Van tükörtengelye': ['A', 'M', 'T'], 'Nincs tükörtengelye': ['F', 'R', 'N'] }, ex: 'Az A, M, T függőlegesen középen összehajtva fedi önmagát. Az F, R, N egyik irányban sem.' },
      { t: 'group', d: 3, q: 'Párhuzamos vagy merőleges?', groups: { 'Párhuzamos': ['a vasúti sín két szála', 'a vonalas füzet sorai', 'a vonalzó két hosszú éle'], 'Merőleges': ['a füzetlap két szomszédos széle', 'a „+” jel két vonala', 'az ajtófélfa és a küszöb'] }, ex: 'A párhuzamosak sosem találkoznak, a merőlegesek derékszöget zárnak be.' }
    ],
    gen: function (d) {
      var k = R(0, 7), a, b, K, Tt, u = d === 3 && R(0, 1) ? 'm' : 'cm', u2 = u + '²';
      if (k === 0) { // négyzet kerülete
        a = R(1, d === 1 ? 10 : 25); K = 4 * a;
        var q0 = 'Mennyi ' + (a === 1 || a === 5 ? 'az ' : 'a ') + a + ' ' + u + ' oldalú négyzet kerülete?', e0 = 'K = 4 · ' + a + ' = ' + K + ' ' + u + '.';
        if (R(0, 1)) return inp(d, q0, K, e0, u);
        return numMC(d, q0, K, [a * a, 2 * a, 3 * a, K + 4], e0, { suf: ' ' + u, min: 1 });
      }
      if (k === 1 || k === 2) { // téglalap kerülete / területe
        a = R(2, d === 1 ? 9 : 15); b = R(2, d === 1 ? 9 : 15);
        if (a === b) b = a + 1;
        K = 2 * (a + b); Tt = a * b;
        var art = (a === 5 || a === 1) ? 'az ' : 'a ';
        if (k === 1) {
          var q1 = 'Mennyi ' + art + a + ' ' + u + ' és ' + b + ' ' + u + ' oldalú téglalap kerülete?', e1 = 'K = 2 · (' + a + ' + ' + b + ') = 2 · ' + (a + b) + ' = ' + K + ' ' + u + '.';
          if (R(0, 1)) return inp(d, q1, K, e1, u);
          return numMC(d, q1, K, [Tt, a + b, 2 * a + b, K + 2], e1, { suf: ' ' + u, min: 1 });
        }
        var q2 = 'Mennyi ' + art + a + ' ' + u + ' és ' + b + ' ' + u + ' oldalú téglalap területe?', e2 = 'T = ' + a + ' · ' + b + ' = ' + Tt + ' ' + u2 + '.';
        if (R(0, 1)) return inp(d, q2, Tt, e2, u2);
        return numMC(d, q2, Tt, [K, a + b, Tt + a, Tt - b], e2, { suf: ' ' + u2, min: 1 });
      }
      if (k === 3) { // négyzet területe
        a = R(2, d === 1 ? 6 : 12); Tt = a * a;
        return inp(d, 'Mennyi ' + (a === 5 ? 'az ' : 'a ') + a + ' ' + u + ' oldalú négyzet területe?', Tt, 'T = ' + a + ' · ' + a + ' = ' + Tt + ' ' + u2 + '.', u2);
      }
      if (k === 4) { // fordított feladatok
        var f = d === 1 ? 0 : R(0, d === 2 ? 1 : 2);
        if (f === 0) { a = R(2, 20); return inp(d, 'Egy négyzet kerülete ' + (4 * a) + ' ' + u + '. Milyen hosszú egy oldala?', a, 'A 4 oldal egyforma: ' + (4 * a) + ' : 4 = ' + a + ' ' + u + '.', u); }
        a = R(2, 12); b = R(2, 12);
        if (f === 1) return inp(d, 'Egy téglalap területe ' + (a * b) + ' ' + u2 + ', egyik oldala ' + a + ' ' + u + '. Milyen hosszú a másik oldala?', b, 'T = a · b, ezért ' + (a * b) + ' : ' + a + ' = ' + b + ' ' + u + '.', u);
        if (a === b) b = a + 1;
        K = 2 * (a + b);
        return inp(d, 'Egy téglalap kerülete ' + K + ' ' + u + ', egyik oldala ' + a + ' ' + u + '. Milyen hosszú a másik oldala?', b, 'A két szomszédos oldal összege a kerület fele: ' + K + ' : 2 = ' + (a + b) + ', és ' + (a + b) + ' − ' + a + ' = ' + b + ' ' + u + '.', u);
      }
      if (k === 5) { // testek, síkidomok tulajdonságai
        var t = P(TULAJD);
        return numMC(d, t[0], t[1], t[2], t[3]);
      }
      if (k === 6) { // igaz/hamis
        a = R(2, 12); b = R(2, 12);
        var area = R(0, 1) === 1, right = area ? a * b : 2 * (a + b);
        var claim = R(0, 1) ? right : (area ? 2 * (a + b) : a * b);
        if (claim === right && R(0, 1)) claim = right; // marad
        var nm = area ? 'területe' : 'kerülete', un = area ? u2 : u;
        return tf(d, (a === 5 ? 'Az ' : 'A ') + a + ' ' + u + ' és ' + b + ' ' + u + ' oldalú téglalap ' + nm + ' ' + claim + ' ' + un + '.', claim === right,
          (area ? 'T = ' + a + ' · ' + b + ' = ' : 'K = 2 · (' + a + ' + ' + b + ') = ') + right + ' ' + un + '.');
      }
      // k === 7: téglalapok sorba rendezése terület vagy kerület szerint
      var byArea = d === 1 || R(0, 1) === 1, rects = [], keys = [];
      var guard = 0;
      while (rects.length < 4 && guard++ < 500) {
        var x = R(1, 9), y = R(x, 9), key = byArea ? x * y : 2 * (x + y);
        if (keys.indexOf(key) < 0) { keys.push(key); rects.push([x, y, key]); }
      }
      rects.sort(function (p1, p2) { return p1[2] - p2[2]; });
      return { t: 'order', d: d, q: 'Rendezd a téglalapokat ' + (byArea ? 'a területük' : 'a kerületük') + ' szerint növekvő sorrendbe!',
        a: rects.map(function (r) { return r[0] + ' cm × ' + r[1] + ' cm'; }),
        ex: (byArea ? 'Területek: ' : 'Kerületek: ') + rects.map(function (r) { return r[2] + (byArea ? ' cm²' : ' cm'); }).join(', ') + '.' };
    }
  };

  /* =====================================================================
     8. LOGIKA, SOROZATOK, NEGATÍV SZÁMOK
     ===================================================================== */
  var logika = {
    id: 'logika',
    name: 'Logika és sorozatok',
    icon: '🧩',
    learn: [
      { title: 'Sorozatok szabálya', text: 'Egy sorozatban a számok valamilyen szabály szerint követik egymást. Nézd meg, mennyivel nő vagy csökken a szám lépésről lépésre, vagy hányszorosára változik! Ha megvan a szabály, folytatni is tudod.', example: 'Pl.: 3, 7, 11, 15, … → mindig + 4, a következő 19' },
      { title: 'Negatív számok', text: 'A 0 alatti számokat negatív számoknak hívjuk, és „−” jelet írunk eléjük. A hőmérőn a fagypont (0 °C) alatti hőmérséklet negatív. A számegyenesen a negatív számok a 0-tól balra vannak: a −5 kisebb, mint a −2.', example: 'Pl.: −3 °C-ról 5 fokot melegszik → 2 °C' },
      { title: 'Nyitott mondatok', text: 'A nyitott mondatban egy szám helyén □ áll. Azt a számot keressük, amellyel a mondat igaz lesz. Az ellentétes művelet segít: összeadás helyett kivonás, szorzás helyett osztás.', example: 'Pl.: □ + 37 = 100 → □ = 100 − 37 = 63' },
      { title: 'Egyenlőtlenségek', text: 'Az egyenlőtlenségben < (kisebb) vagy > (nagyobb) jel van. Ennek gyakran több megoldása is van! Próbálgass rendszerezetten, és nézd meg, melyik szám teszi igazzá.', example: 'Pl.: □ + 2 < 6 megoldásai: 0, 1, 2, 3' },
      { title: 'Hányféleképpen?', text: 'Ha meg kell számolni a lehetőségeket, dolgozz rendszerezetten: készíts listát vagy táblázatot, hogy egy se maradjon ki, és egy se legyen kétszer.', example: 'Pl.: 3 póló és 2 nadrág → 3 · 2 = 6 féle öltözék' }
    ],
    questions: [
      { t: 'mc', d: 1, q: 'Mi a következő szám? 2, 4, 6, 8, ___', a: ['10', '9', '12', '16'], ex: 'A szabály: mindig + 2. 8 + 2 = 10.' },
      { t: 'mc', d: 1, q: 'Mi a következő szám? 5, 10, 15, 20, ___', a: ['25', '30', '21', '24'], ex: 'A szabály: mindig + 5. 20 + 5 = 25.' },
      { t: 'mc', d: 2, q: 'Mi a következő szám? 1, 2, 4, 8, ___', a: ['16', '10', '12', '14'], ex: 'Minden szám az előző kétszerese: 8 · 2 = 16.' },
      { t: 'mc', d: 3, q: 'Mi a következő szám? 100, 90, 81, 73, ___', a: ['66', '65', '63', '64'], ex: 'A csökkenés egyre kisebb: −10, −9, −8, aztán −7. 73 − 7 = 66.' },
      { t: 'mc', d: 1, q: 'A hőmérő 0 °C alatt 3 fokot mutat. Hány fok van?', pic: '🌡️', a: ['−3 °C', '3 °C', '0 °C', '−30 °C'], ex: 'A fagypont alatti hőmérsékletet negatív számmal írjuk: −3 °C.' },
      { t: 'mc', d: 2, q: 'Melyik a leghidegebb?', pic: '❄️', a: ['−8 °C', '−2 °C', '0 °C', '5 °C'], ex: 'Minél lejjebb van a 0 alatt, annál hidegebb: −8 °C a leghidegebb.' },
      { t: 'mc', d: 2, q: 'Reggel −4 °C volt, délre 6 fokkal melegebb lett. Hány fok lett délre?', a: ['2 °C', '10 °C', '−10 °C', '−2 °C'], ex: '−4-ről 4 fokot melegszik 0-ig, aztán még 2-t: 2 °C.' },
      { t: 'mc', d: 3, q: 'Este 3 °C volt, éjszakára 7 fokot hűlt a levegő. Hány fok lett?', a: ['−4 °C', '4 °C', '10 °C', '−10 °C'], ex: '3-ról 3 fokot hűl 0-ig, aztán még 4-et: −4 °C.' },
      { t: 'mc', d: 2, q: '□ + 37 = 100. Melyik szám a □?', a: ['63', '137', '73', '67'], ex: '□ = 100 − 37 = 63. Ellenőrzés: 63 + 37 = 100.' },
      { t: 'mc', d: 2, q: '□ · 6 = 42. Melyik szám a □?', a: ['7', '6', '36', '48'], ex: '□ = 42 : 6 = 7.' },
      { t: 'mc', d: 3, q: 'Hány különböző kétjegyű számot rakhatsz ki az 1, 2, 3 számkártyákból, ha egy kártyát csak egyszer használhatsz?', pic: '1️⃣2️⃣3️⃣', a: ['6', '3', '9', '5'], ex: '12, 13, 21, 23, 31, 32 – ez 6 szám.' },
      { t: 'mc', d: 3, q: 'Lilinek 3 pólója és 2 szoknyája van. Hányféleképpen öltözhet fel, ha egy pólót és egy szoknyát vesz fel?', pic: '👕👗', a: ['6', '5', '3', '8'], ex: 'Minden pólóhoz 2 szoknya választható: 3 · 2 = 6.' },
      { t: 'mc', d: 1, q: 'Mi következik? 🔴🔵🔴🔵🔴___', a: ['🔵', '🔴', '🟢', '🟡'], ex: 'A piros és a kék felváltva követi egymást, ezért kék jön.' },
      { t: 'mc', d: 3, q: 'Mi a következő szám? 3, 7, 15, 31, ___', a: ['63', '47', '62', '35'], ex: 'A szabály: az előző szám kétszerese + 1. 31 · 2 + 1 = 63.' },
      { t: 'tf', d: 1, q: 'A −5 °C hidegebb, mint a −1 °C.', a: true, ex: 'Igaz! A −5 lejjebb van a hőmérőn, mint a −1.' },
      { t: 'tf', d: 2, q: 'A □ < 4 nyitott mondatnak a természetes számok között 4 megoldása van: 0, 1, 2, 3.', a: true, ex: 'Igaz! 0, 1, 2 és 3 is kisebb 4-nél.' },
      { t: 'tf', d: 1, q: 'A 3, 6, 9, 12 sorozat szabálya: mindig 3-mal nő.', a: true, ex: 'Igaz! 3 + 3 = 6, 6 + 3 = 9, 9 + 3 = 12.' },
      { t: 'tf', d: 2, q: 'A −2 nagyobb, mint a 0.', a: false, ex: 'Hamis. A negatív számok kisebbek a 0-nál.' },
      { t: 'tf', d: 3, q: '4 gyerek mindegyike egyszer kezet fog mindenki mással. Így összesen 12 kézfogás lesz.', pic: '🤝', a: false, ex: 'Hamis. Ha A, B, C, D kezet fog: AB, AC, AD, BC, BD, CD – ez csak 6 kézfogás.' },
      { t: 'input', d: 1, q: 'Mi a következő szám? 30, 40, 50, 60, ___', a: '70', ex: 'Mindig + 10: 60 + 10 = 70.' },
      { t: 'input', d: 2, q: '100 − □ = 45. Melyik szám a □?', a: '55', ex: '□ = 100 − 45 = 55.' },
      { t: 'input', d: 2, q: '□ : 4 = 9. Melyik szám a □?', a: '36', ex: '□ = 9 · 4 = 36.' },
      { t: 'input', d: 3, q: 'Mi a következő szám? 1, 4, 9, 16, 25, ___', a: '36', ex: 'Ezek négyzetszámok: 1 · 1, 2 · 2, 3 · 3, … A következő 6 · 6 = 36.' },
      { t: 'input', d: 2, q: 'Mi a következő szám? 64, 32, 16, 8, ___', a: '4', ex: 'Mindig a felére csökken: 8 : 2 = 4.' },
      { t: 'input', d: 3, q: 'A hőmérséklet −6 °C-ról 5 °C-ra emelkedett. Hány fokot melegedett?', unit: 'fokot', a: '11', ex: '−6-tól 0-ig 6 fok, 0-tól 5-ig még 5 fok: 6 + 5 = 11 fok.' },
      { t: 'order', d: 1, q: 'Rendezd a hőmérsékleteket a leghidegebbtől a legmelegebbig!', a: ['−10 °C', '−3 °C', '0 °C', '4 °C'], ex: 'A negatív számok a hidegebbek, minél nagyobb a szám a „−” után, annál hidegebb.' },
      { t: 'order', d: 2, q: 'Rendezd növekvő sorrendbe!', a: ['−7', '−2', '1', '5'], ex: 'A számegyenesen balról jobbra: −7, −2, 1, 5.' },
      { t: 'order', d: 3, q: 'Rendezd a sorozat tagjait a helyes sorrendbe! A szabály: mindig a duplája.', a: ['3', '6', '12', '24', '48'], ex: '3 · 2 = 6, 6 · 2 = 12, 12 · 2 = 24, 24 · 2 = 48.' },
      { t: 'match', d: 2, q: 'Párosítsd a nyitott mondatot a megoldásával!', a: [['□ + 5 = 12', '7'], ['□ − 5 = 12', '17'], ['□ · 5 = 15', '3'], ['□ : 5 = 4', '20']], ex: '12 − 5 = 7, 12 + 5 = 17, 15 : 5 = 3, 4 · 5 = 20.' },
      { t: 'match', d: 2, q: 'Párosítsd a sorozatot a szabályával!', a: [['2, 5, 8, 11', '+ 3'], ['20, 16, 12, 8', '− 4'], ['1, 3, 9, 27', '· 3'], ['80, 40, 20, 10', ': 2']], ex: 'Nézd meg, hogyan lesz az első számból a második, és ellenőrizd a többinél is!' },
      { t: 'match', d: 1, q: 'Párosítsd a leírást a hőmérséklettel!', a: [['0 alatt 2 fokkal', '−2 °C'], ['0 felett 2 fokkal', '2 °C'], ['0 alatt 5 fokkal', '−5 °C']], ex: 'A 0 alatti hőmérséklet elé „−” jelet írunk.' },
      { t: 'group', d: 2, q: 'Igaz vagy hamis a nyitott mondat, ha □ = 5?', groups: { 'Igaz': ['□ + 3 = 8', '□ · 2 = 10', '□ > 4'], 'Hamis': ['□ − 1 = 3', '□ < 5', '□ · 3 = 16'] }, ex: 'Írd be az 5-öt a □ helyére, és számold ki! Pl. 5 < 5 hamis, mert egyenlők.' },
      { t: 'group', d: 1, q: 'Fagypont alatti vagy feletti?', groups: { 'Fagypont alatt': ['−1 °C', '−12 °C', '−5 °C'], 'Fagypont felett': ['1 °C', '12 °C', '25 °C'] }, ex: 'A fagypont 0 °C. A „−” jeles hőmérsékletek fagypont alattiak.' },
      { t: 'group', d: 3, q: 'Melyik szám megoldása ennek: □ + 8 < 15?', groups: { 'Megoldás': ['0', '3', '6'], 'Nem megoldás': ['7', '9', '15'] }, ex: '6 + 8 = 14 < 15 igaz, de 7 + 8 = 15 már nem kisebb 15-nél.' }
    ],
    gen: function (d) {
      var k = R(0, 8), a, s, st, len, seq, i, ans;
      if (k === 0 || k === 1) { // számtani sorozat
        len = R(4, 5);
        if (d === 1) { s = R(0, 20); st = R(2, 10); }
        else if (d === 2) { st = P([-1, 1]) * R(3, 25); s = st > 0 ? R(1, 100) : R(-st * (len + 1), 300); }
        else { st = P([-1, 1]) * R(4, 50); s = R(-50, 200); if (st < 0 && R(0, 1)) { s = R(5, 20); st = -R(3, 6); } }
        seq = []; for (i = 0; i <= len; i++) seq.push(s + i * st);
        var rule = st > 0 ? 'mindig + ' + st : 'mindig − ' + (-st);
        if (k === 0) {
          ans = seq[len];
          var qs = 'Mi a következő szám? ' + seq.slice(0, len).map(F).join(', ') + ', ___';
          var es = 'A szabály: ' + rule + '. ' + F(seq[len - 1]) + (st > 0 ? ' + ' + st : ' − ' + (-st)) + ' = ' + F(ans) + '.';
          if (R(0, 1)) return inp(d, qs, ans, es);
          return numMC(d, qs, ans, [ans + 1, ans - 1, ans + st, seq[len - 1] - st, ans + 2 * st], es, { fmt: F, min: -1000 });
        }
        var hole = R(1, len - 2), shown = seq.slice(0, len).map(function (x, j) { return j === hole ? '___' : F(x); });
        return inp(d, 'Melyik szám hiányzik? ' + shown.join(', '), seq[hole], 'A szabály: ' + rule + '. A hiányzó szám: ' + F(seq[hole]) + '.');
      }
      if (k === 2) { // mértani vagy növekvő különbségű sorozat
        len = 4; seq = [];
        if (d === 1) { s = R(1, 5); seq = [s]; for (i = 1; i <= len; i++) seq.push(seq[i - 1] * 2); rule = 'mindig a duplája'; }
        else if (R(0, 1)) { var m = P([2, 3]); s = R(1, m === 2 ? 9 : 4); seq = [s]; for (i = 1; i <= len; i++) seq.push(seq[i - 1] * m); rule = m === 2 ? 'mindig az előző kétszerese' : 'mindig az előző háromszorosa'; }
        else { s = R(1, 20); var df = R(1, 5); seq = [s]; for (i = 1; i <= len; i++) seq.push(seq[i - 1] + df + i - 1); rule = 'a különbség mindig 1-gyel nő (+' + df + ', +' + (df + 1) + ', +' + (df + 2) + ', …)'; }
        ans = seq[len];
        return numMC(d, 'Mi a következő szám? ' + seq.slice(0, len).map(F).join(', ') + ', ___', ans,
          [ans + 1, ans - 1, seq[len - 1] + (seq[len - 1] - seq[len - 2]), ans + 2, seq[len - 1] * 2], 'A szabály: ' + rule + '. Így a következő: ' + F(ans) + '.');
      }
      if (k === 3) { // nyitott mondat
        var f = R(0, d === 1 ? 2 : 5), x, b, c, q, e;
        var big = d === 1 ? 50 : d === 2 ? 500 : 5000;
        if (f === 0) { x = R(1, big); b = R(1, big); q = '□ + ' + F(b) + ' = ' + F(x + b); e = '□ = ' + F(x + b) + ' − ' + F(b) + ' = ' + F(x) + '.'; }
        else if (f === 1) { x = R(1, big); b = R(1, big); q = F(b) + ' + □ = ' + F(x + b); e = '□ = ' + F(x + b) + ' − ' + F(b) + ' = ' + F(x) + '.'; }
        else if (f === 2) { b = R(1, big); x = b + R(1, big); q = '□ − ' + F(b) + ' = ' + F(x - b); e = '□ = ' + F(x - b) + ' + ' + F(b) + ' = ' + F(x) + '.'; }
        else if (f === 3) { a = R(big / 2, big * 2); x = R(1, a - 1); q = F(a) + ' − □ = ' + F(a - x); e = '□ = ' + F(a) + ' − ' + F(a - x) + ' = ' + F(x) + '.'; }
        else if (f === 4) { b = R(2, 9); x = R(2, d === 2 ? 10 : 99); q = '□ · ' + b + ' = ' + F(x * b); e = '□ = ' + F(x * b) + ' : ' + b + ' = ' + F(x) + '.'; }
        else { b = R(2, 9); c = R(2, d === 2 ? 10 : 99); x = b * c; q = '□ : ' + b + ' = ' + c; e = '□ = ' + c + ' · ' + b + ' = ' + F(x) + '.'; }
        return inp(d, 'Melyik szám illik a □ helyére? ' + q, x, e);
      }
      if (k === 4) { // hőmérséklet
        var t0 = R(-10, 10), ch = R(1, d === 1 ? 5 : 12), up = R(0, 1) === 1;
        if (d === 1) { t0 = up ? R(-8, -1) : R(1, 8); ch = R(1, Math.abs(t0) + 4); }
        ans = up ? t0 + ch : t0 - ch;
        var qt = up ? 'Reggel ' + T(t0) + ' volt, délre ' + ch + ' fokkal melegebb lett. Hány fok lett délre?' : 'Este ' + T(t0) + ' volt, éjszakára ' + ch + ' fokot hűlt a levegő. Hány fok lett?';
        var et = T(t0) + (up ? ' + ' : ' − ') + ch + ' fok = ' + T(ans) + '. Képzeld el a hőmérőt: ' + (up ? 'felfelé' : 'lefelé') + ' lépünk ' + ch + ' fokot.';
        if (d > 1 && R(0, 2) === 0) return inp(d, qt, ans, et, '°C');
        return numMC(d, qt, ans, [up ? t0 - ch : t0 + ch, -ans, ans + 1, ans - 1, ch - t0], et, { fmt: T, min: -100 });
      }
      if (k === 5) { // sorba rendezés negatív számokkal
        var lim = d === 1 ? 10 : d === 2 ? 20 : 50;
        var arr;
        do { arr = distinct(R(4, 5), function () { return R(-lim, lim); }); } while (!arr.some(function (v) { return v < 0; }));
        arr.sort(function (p1, p2) { return p1 - p2; });
        var temp = R(0, 1) === 1;
        return { t: 'order', d: d, q: temp ? 'Rendezd a hőmérsékleteket a leghidegebbtől a legmelegebbig!' : 'Rendezd növekvő sorrendbe!', a: arr.map(temp ? T : F),
          ex: temp ? 'A hőmérőn lejjebb van a hidegebb: minél nagyobb a szám a „−” jel után, annál hidegebb.' : 'A számegyenesen balra vannak a kisebb számok: minél nagyobb a szám a „−” jel után, annál kisebb.' };
      }
      if (k === 6) { // kombinatorika
        var kind = d === 1 ? 0 : R(0, d === 2 ? 1 : 2), N = P(NEVEK);
        if (kind === 0) {
          var p1 = R(2, d === 1 ? 4 : 6), p2 = R(2, d === 1 ? 3 : 5);
          return numMC(d, N + ' szekrényében ' + p1 + ' póló és ' + p2 + ' nadrág van. Hányféleképpen öltözhet fel, ha egy pólót és egy nadrágot vesz fel?', p1 * p2,
            [p1 + p2, p1 * p2 + 1, p1 * p2 - 1, 2 * p1 * p2], 'Minden pólóhoz ' + p2 + ' nadrág választható: ' + p1 + ' · ' + p2 + ' = ' + (p1 * p2) + '.', { pic: '👕👖' });
        }
        if (kind === 1) {
          var cd = R(3, 4), digs = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, cd).sort();
          return numMC(d, 'Hány különböző kétjegyű számot rakhatsz ki ezekből a számkártyákból, ha egy kártyát egy számban csak egyszer használhatsz: ' + digs.join(', ') + '?', cd * (cd - 1),
            [cd * cd, cd, cd * (cd - 1) / 2, cd * (cd - 1) + 1], 'Az első jegy ' + cd + '-féle lehet, a második már csak ' + (cd - 1) + '-féle: ' + cd + ' · ' + (cd - 1) + ' = ' + (cd * (cd - 1)) + '.');
        }
        var g = R(3, 6), hs = g * (g - 1) / 2;
        return numMC(d, g + ' gyerek találkozik, és mindenki mindenkivel egyszer kezet fog. Hány kézfogás lesz összesen?', hs,
          [g * (g - 1), g * g, hs + 1, g], 'Mindenki ' + (g - 1) + ' gyerekkel fog kezet, de így minden kézfogást kétszer számolnánk: ' + g + ' · ' + (g - 1) + ' : 2 = ' + hs + '.', { pic: '🤝' });
      }
      if (k === 7) { // egyenlőtlenség csoportosítás
        var mult = d === 3 && R(0, 1) === 1, bb, cc, limit, test;
        if (mult) { bb = R(2, 5); cc = R(3 * bb + 1, 30); test = function (v) { return v * bb < cc; }; q = '□ · ' + bb + ' < ' + cc; }
        else { bb = R(2, d === 1 ? 9 : 40); limit = R(4, 12); cc = bb + limit; test = function (v) { return v + bb < cc; }; q = '□ + ' + bb + ' < ' + cc; }
        var sols = [], non = [];
        for (i = 0; i <= 60; i++) { if (test(i)) sols.push(i); else non.push(i); }
        var gs = shuf(sols).slice(0, 3).sort(function (p, r) { return p - r; }), gn = non.slice(0, 8);
        gn = shuf(gn).slice(0, 3).sort(function (p, r) { return p - r; });
        var groups = {}; groups['Megoldás'] = gs.map(String); groups['Nem megoldás'] = gn.map(String);
        return { t: 'group', d: d, q: 'Melyik szám megoldása ennek: ' + q + '?', groups: groups,
          ex: 'Írd be a számot a □ helyére! A megoldások: ' + (sols.length <= 12 ? sols.join(', ') : sols.slice(0, 5).join(', ') + ', …') + '.' };
      }
      // k === 8: igaz/hamis negatív számokkal
      var pr = distinct(2, function () { return R(-15, d === 1 ? 0 : 10); });
      if (R(0, 1)) {
        return tf(d, T(pr[0]) + ' hidegebb, mint ' + T(pr[1]) + '.', pr[0] < pr[1], 'A hőmérőn lejjebb lévő a hidegebb: ' + T(Math.min(pr[0], pr[1])) + ' a hidegebb.');
      }
      var rel = P(['<', '>']);
      return tf(d, F(pr[0]) + ' ' + rel + ' ' + F(pr[1]), rel === '<' ? pr[0] < pr[1] : pr[0] > pr[1], 'A számegyenesen a balra lévő a kisebb: ' + F(Math.min(pr[0], pr[1])) + ' < ' + F(Math.max(pr[0], pr[1])) + '.');
    }
  };

  TS.subjects.push({
    id: 'matek',
    name: 'Matematika',
    island: 'Számvarázs-sziget',
    icon: '🔢',
    color: '#FF8A3D',
    topics: [szamkor, osszkiv, szorzoszt, szoveges, tortek, mertek, geometria, logika]
  });
})();
