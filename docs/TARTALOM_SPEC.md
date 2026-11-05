# Tudás-sziget – tartalmi adatfájl specifikáció

Az app egy offline, böngészőben (file://) futó gamifikált tanulójáték egy 10 éves, **4. osztályos magyar** kislány számára.
Minden tantárgy egy "sziget", minden témakör egy "állomás" a szigeten. A tartalom külön JS fájlokban van: `js/data/<id>.js`.

## Technikai szabályok
- Sima JavaScript (NEM ES modul, nincs import/export), a fájl elején:
  ```js
  window.TS = window.TS || { subjects: [] };
  TS.subjects.push({ ... });
  ```
- Csak szöveg (nincs HTML). Emoji használható és ajánlott (gyerekbarát).
- Magyar helyesírás (AkH. 12.) hibátlan legyen! Ékezetek: á é í ó ö ő ú ü ű.
- A tények legyenek pontosak, a 2020-as NAT és kerettanterv 4. évfolyamos anyagához igazodva.
- A fájlnak hibátlanul le kell futnia: `node -e "global.window=global; require('./js/data/<id>.js'); console.log(TS.subjects.length)"`.

## Tantárgy objektum
```js
{
  id: 'matek',                 // egyedi azonosító
  name: 'Matematika',
  island: 'Számvarázs-sziget', // a sziget fantázianeve
  icon: '🔢',
  color: '#FF8A3D',            // fő szín (élénk, de nem neon)
  topics: [ Topic, ... ]       // 6–8 témakör, tanulási sorrendben
}
```

## Témakör (Topic)
```js
{
  id: 'szamkor',               // tantárgyon belül egyedi
  name: 'Számok 10 000-ig',    // rövid, max ~22 karakter
  icon: '🔟',
  learn: [                     // 3–5 "Tudáskártya": rövid, gyereknyelvű magyarázat
    { title: 'Helyiértékek', text: '2–4 rövid mondat, érthetően.', example: 'Pl.: 3 482 = 3 ezres + 4 százas + 8 tízes + 2 egyes' }
  ],
  questions: [ Kérdés, ... ],  // legalább 30 kérdés, vegyes típusokkal és nehézséggel
  gen: function (d) { ... }    // OPCIONÁLIS (főleg matekhoz): véletlen kérdést generál, d = 1|2|3 nehézség, Kérdés objektumot ad vissza
}
```

## Kérdéstípusok
Minden kérdésnek van: `t` (típus), `q` (kérdés szövege), `d` (nehézség 1=könnyű, 2=közepes, 3=nehéz), `ex` (rövid magyarázat, amit hibás válasz után mutatunk – kedves, tanító hangnemű, 1–2 mondat).
Opcionális: `pic` (nagy méretben megjelenő emoji-sor, pl. `'🍎🍎🍎'`).

1. **Feleletválasztós** – `t:'mc'`. `a`: tömb, **az ELSŐ elem a helyes**, további 2–3 rossz válasz (az app keveri). Válaszok rövidek legyenek.
   ```js
   { t:'mc', d:1, q:'Melyik szó főnév?', a:['asztal','szalad','piros','öt'], ex:'Az asztal egy tárgy neve, ezért főnév.' }
   ```
   Hiányos szöveghez a `q`-ban használj `___` jelet: `q:'Mi illik a helyére? Ha___ (hely)'`.
2. **Igaz/Hamis** – `t:'tf'`, `a: true | false`.
   ```js
   { t:'tf', d:1, q:'A Balaton Közép-Európa legnagyobb tava.', a:true, ex:'Így van! A Balaton a legnagyobb tó Közép-Európában.' }
   ```
3. **Beírós** – `t:'input'`, `a`: string vagy elfogadható válaszok tömbje. Az app kisbetűsít, a szóközöket és a végpontot figyelmen kívül hagyja; számoknál a szóközt/pontot elhagyja. Csak egyértelmű, rövid válasz (főleg szám vagy egy szó)!
   ```js
   { t:'input', d:2, q:'Mennyi 345 + 278?', a:'623', ex:'345 + 278: 5+8=13, leírom a 3-at, maradék 1...' }
   ```
   Opcionális `unit:'cm'` – a beviteli mező mellett megjelenő mértékegység.
4. **Sorba rendezés** – `t:'order'`, `a`: **helyes sorrendben** 3–5 elem (az app keveri, a gyerek egymás után kattintja őket).
   ```js
   { t:'order', d:2, q:'Rendezd növekvő sorrendbe!', a:['1 099','1 909','9 011','9 101'], ex:'...' }
   ```
5. **Párosítás** – `t:'match'`, `a`: 3–4 pár `[bal, jobb]`, minden elem egyedi.
   ```js
   { t:'match', d:2, q:'Párosítsd a mértékegységeket!', a:[['1 m','100 cm'],['1 km','1000 m'],['1 dm','10 cm']], ex:'...' }
   ```
6. **Csoportosítás** – `t:'group'`, `groups`: 2–3 kategória, összesen 6–8 elem, minden elem egyedi és egyértelműen egy csoportba tartozik.
   ```js
   { t:'group', d:2, q:'Válogasd szét a szavakat!', groups:{ 'Főnév':['kutya','ház','Péter'], 'Ige':['fut','olvas','énekel'] }, ex:'...' }
   ```

## Arányok témakörönként (min. 30 kérdés)
- kb. 40% mc, 15% tf, 15% input, 10% order, 10% match, 10% group (ahol a téma engedi)
- nehézség: kb. 40% d:1, 40% d:2, 20% d:3
- A kérdések fedjék le a témakör teljes 4. osztályos mélységét (ne csak a legegyszerűbb részét).
- Kerüld a kétértelmű kérdéseket; csak egy helyes válasz lehet.
- Hangnem: kedves, bátorító, 10 évesnek érthető. A szövegben lehet kis történet/humor (pl. "Panni 3 kosár almát szedett...").

## gen(d) generátor (matekhoz kötelező, ahol értelmes)
- Ugyanolyan Kérdés objektumot ad vissza, mint a statikus kérdések (bármelyik típus).
- Mindig helyes választ számoljon; mc esetén a rossz válaszok legyenek hihetőek, egymástól és a helyestől különbözők.
- Nagy számoknál ezres tagolás szóközzel (pl. `'4 520'`), a beírós `a` legyen tagolás nélkül (`'4520'`).
- `ex`: mutassa meg a megoldás menetét röviden.
