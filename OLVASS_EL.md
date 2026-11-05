# 🦉 Tudás-sziget – útmutató szülőknek

Játékos tanulóprogram 4. osztályosoknak, a 2020-as NAT és kerettanterv anyagára építve.

## Indítás
- Kattints duplán az **`index.html`** fájlra. Chrome-ban, Edge-ben, Firefoxban és Safariban is fut.
- Nem kell telepíteni, és internet sem kell hozzá. Ha van net, egy szebb, kerekded betűtípust is letölt.
- Tableten vagy telefonon is működik. Ehhez másold a teljes `Tudas-sziget` mappát az eszközre, vagy tedd ki egy tárhelyre.

## Mi van benne?
| Sziget | Tantárgy | Témakör | Kérdés |
|---|---|---|---|
| 🔢 Számvarázs-sziget | Matematika | 8 | 271, plusz **végtelen sok generált feladat** |
| ✏️ Betűvár-sziget | Magyar nyelvtan és helyesírás | 7 | 225 |
| 📚 Mesekönyv-sziget | Olvasás és irodalom | 6 | 221 |
| 🌳 Természet-sziget | Környezetismeret | 7 | 260 |
| 🇬🇧 Angol-öböl | Angol nyelv | 6 | 198 |

Minden témakörhöz tartozik egy **Tudáskártya-pakli**: rövid, gyereknyelvű magyarázatok példákkal. A kérdések hatféle típusúak:
- feleletválasztós
- igaz/hamis
- beírós
- sorba rendezős
- párosítós
- csoportosítós

## Hogyan motivál?
- **Szigetek és állomások:** egy témakör 8 kérdésből áll, és 1–3 ⭐-ot lehet rajta szerezni. A következő állomás akkor nyílik meg, ha az előzőn megvan legalább 1 ⭐.
- **Sziget-próba 🐉:** egy nehezebb, 12 kérdéses „főellenség”, 3 élettel. Akkor nyílik meg, ha a sziget minden állomásán van legalább 1 ⭐.
- **XP és szintek, 💎 gyémántok:** a gyémántokat a **Boltban** lehet elkölteni figurákra, kiegészítőkre és hátterekre.
- **Napi kincsesláda, 🔥 napi sorozat, 3 napi küldetés** és bónuszláda.
- **Napi kihívás:** 10 vegyes kérdés az összes tantárgyból.
- **Trófeák:** több mint 35 megszerezhető jelvény.
- **Ismétlő doboz 🔁:** minden rosszul megválaszolt kérdés ide kerül, és csak akkor tűnik el, ha később jól oldja meg. A kör végén is visszakérdez a hibákból.
- **Hibánál** mindig megjelenik a helyes válasz és egy rövid magyarázat.
- **🔊 Felolvasás:** a kérdéseket és a tudáskártyákat a gép fel tudja olvasni. Ehhez magyar gépi hang kell, ami Windowson és Androidon általában elérhető.

## 👨‍👩‍👧 Szülői sarok
Az **Én 🦉 → Szülői sarok** menüpontban érhető el, egy saját 4 jegyű PIN-kóddal. Ezt az első belépéskor kell beállítani.
- **Statisztika:**
  - gyakorlási idő
  - az elmúlt 7 nap aktivitása
  - pontosság tantárgyanként
  - témakörönkénti részletes táblázat
- **„Gyakorlásra érdemes témák”:** a leggyengébb eredményű témakörök listája.
- **Minden állomás nyitva:** ha holnap dolgozat lesz egy konkrét témából, ezzel azonnal elérhető.
- **Mentés:** a haladást le lehet tölteni és vissza lehet tölteni. A haladás a böngészőben tárolódik, így másik gépre vagy böngészőbe ezzel lehet átvinni.
- **Haladás törlése.**

## Bővítés
A tananyag a `js/data/*.js` fájlokban van, tantárgyanként egy fájlban. A formátumot a `docs/TARTALOM_SPEC.md` írja le. Új kérdést vagy akár új tantárgyat (pl. ének, technika) is hozzá lehet adni. Új tantárgynál a fájlt az `index.html`-ben is fel kell venni egy `<script>` sorral.
