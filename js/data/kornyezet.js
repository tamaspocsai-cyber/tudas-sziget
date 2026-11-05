window.TS = window.TS || { subjects: [] };
TS.subjects.push({
  id: 'kornyezet',
  name: 'Környezetismeret',
  island: 'Természet-sziget',
  icon: '🌳',
  color: '#2FB36E',
  topics: [

    /* ============ 1. TÁJÉKOZÓDÁS ÉS TÉRKÉP ============ */
    {
      id: 'terkep',
      name: 'Tájékozódás, térkép',
      icon: '🧭',
      learn: [
        { title: 'Égtájak', text: 'A négy fő égtáj: észak (É), kelet (K), dél (D) és nyugat (Ny). Közöttük vannak a mellékégtájak: északkelet (ÉK), délkelet (DK), délnyugat (DNy) és északnyugat (ÉNy). A térképen felül mindig észak van.', example: 'Pl.: észak és kelet között van az északkelet.' },
        { title: 'A Nap járása', text: 'A Nap keleten kel fel, délben délen jár a legmagasabban, este nyugaton nyugszik le. Délben a legrövidebb az árnyékunk, és észak felé mutat.', example: 'Pl.: reggel a Nap keleten van, ezért az árnyékod nyugat felé nyúlik.' },
        { title: 'Iránytű', text: 'Az iránytű mágneses tűje mindig észak felé fordul. Ha tudjuk, merre van észak, a többi égtájat is megtaláljuk.', example: 'Pl.: ha északnak fordulsz, jobb kezed felé van kelet.' },
        { title: 'Térkép színei', text: 'A domborzati térképen a zöld szín a síkságot (200 m alatt), a sárga a dombságot (200–500 m), a barna a hegységet (500 m felett) jelöli. A kék szín a vizeket mutatja: folyókat, tavakat, tengereket.', example: 'Pl.: az Alföld zöld, a Mátra barna, a Balaton kék.' },
        { title: 'Méretarány', text: 'A térkép a valóság kicsinyített képe. A méretarány megmutatja, hányszor kicsinyítettek. 1 : 100 000 azt jelenti, hogy a térképen 1 cm a valóságban 100 000 cm, vagyis 1 km.', example: 'Pl.: 1 : 100 000-es térképen 3 cm = 3 km.' }
      ],
      questions: [
        { t:'mc', d:1, q:'Merre van észak a térképen?', pic:'🗺️', a:['felül','alul','jobbra','balra'], ex:'A térképen mindig felül van észak, alul dél, jobbra kelet, balra nyugat.' },
        { t:'mc', d:1, q:'Melyik égtájon kel fel a Nap?', pic:'🌅', a:['keleten','nyugaton','északon','délen'], ex:'A Nap reggel keleten kel fel.' },
        { t:'mc', d:1, q:'Melyik égtájon nyugszik le a Nap?', pic:'🌇', a:['nyugaton','keleten','északon','délen'], ex:'Este a Nap nyugaton nyugszik le.' },
        { t:'mc', d:1, q:'Milyen színnel jelölik a térképen a vizeket?', pic:'🌊', a:['kék','zöld','barna','sárga'], ex:'A folyókat, tavakat és tengereket kék színnel jelölik.' },
        { t:'mc', d:1, q:'Milyen színű a síkság a domborzati térképen?', a:['zöld','barna','kék','piros'], ex:'A síkságot, például az Alföldet, zöld színnel jelölik.' },
        { t:'mc', d:2, q:'Milyen színnel jelölik a térképen a hegységeket?', pic:'⛰️', a:['barna','zöld','kék','fehér'], ex:'A hegységek barnák a domborzati térképen. Minél magasabb, annál sötétebb barna.' },
        { t:'mc', d:1, q:'Melyik eszköz mutatja meg az északi irányt?', pic:'🧭', a:['iránytű','hőmérő','vonalzó','mérleg'], ex:'Az iránytű mágneses tűje észak felé fordul.' },
        { t:'mc', d:2, q:'Melyik mellékégtáj van észak és kelet között?', a:['északkelet','délkelet','északnyugat','délnyugat'], ex:'Észak és kelet között az északkelet (ÉK) van.' },
        { t:'mc', d:2, q:'Melyik mellékégtáj van dél és nyugat között?', a:['délnyugat','délkelet','északnyugat','északkelet'], ex:'Dél és nyugat között a délnyugat (DNy) van.' },
        { t:'mc', d:2, q:'Merre látjuk délben a Napot Magyarországon?', pic:'☀️', a:['délen','északon','keleten','nyugaton'], ex:'Délben a Nap délen jár, ekkor van a legmagasabban az égen.' },
        { t:'mc', d:2, q:'Mi a neve a 200 méternél alacsonyabb, nagyjából sík felszínnek?', a:['síkság','dombság','hegység','völgy'], ex:'A 200 m alatti, sík felszín a síkság, például az Alföld.' },
        { t:'mc', d:2, q:'Milyen magasak általában a dombságok?', a:['200 és 500 m között','200 m alatt','500 m felett','2000 m felett'], ex:'A dombság 200 és 500 méter közötti, hullámos felszín.' },
        { t:'mc', d:3, q:'A térkép méretaránya 1 : 100 000. Mennyi a valóságban a térképen mért 1 cm?', a:['1 km','100 m','10 km','1 m'], ex:'100 000 cm = 1000 m = 1 km. Tehát 1 cm a térképen 1 km a valóságban.' },
        { t:'mc', d:2, q:'Mit mutat meg a térkép méretaránya?', a:['hányszor kicsinyítettek','a hegyek magasságát','az égtájakat','a hőmérsékletet'], ex:'A méretarány megmutatja, hányszor kisebb a térkép a valóságnál.' },
        { t:'mc', d:3, q:'Merre mutat délben az árnyékunk Magyarországon?', a:['észak felé','dél felé','kelet felé','nyugat felé'], ex:'Délben a Nap délen van, ezért az árnyék az ellenkező irányba, észak felé mutat.' },
        { t:'mc', d:1, q:'Mi a neve a hegy legmagasabb pontjának?', pic:'🏔️', a:['csúcs','völgy','lejtő','hegyláb'], ex:'A hegy legmagasabb pontja a csúcs, az oldala a lejtő, az alja a hegyláb.' },

        { t:'tf', d:1, q:'Az iránytű tűje észak felé mutat.', pic:'🧭', a:true, ex:'Igen! Az iránytű mágneses tűje mindig észak felé fordul.' },
        { t:'tf', d:1, q:'A térképen jobb oldalon van nyugat.', a:false, ex:'A térképen jobbra kelet, balra nyugat van.' },
        { t:'tf', d:2, q:'Az óramutató járása szerint az égtájak sorrendje: észak, kelet, dél, nyugat.', a:true, ex:'Így van! Északról indulva jobbra haladva: észak, kelet, dél, nyugat.' },
        { t:'tf', d:2, q:'A Nap valójában nem kering körülöttünk, hanem a Föld forog.', pic:'🌍', a:true, ex:'Ügyes! A Föld forgása miatt látjuk úgy, mintha a Nap mozogna az égen.' },
        { t:'tf', d:3, q:'Az 1 : 10 000 méretarányú térképen több részlet látszik, mint az 1 : 1 000 000-esen.', a:true, ex:'Igen! Az 1 : 10 000-es kevésbé kicsinyít, ezért részletesebb.' },

        { t:'input', d:1, q:'Hány fő égtáj van?', a:['4','négy'], ex:'Négy fő égtáj van: észak, kelet, dél és nyugat.' },
        { t:'input', d:1, q:'Hány mellékégtáj van?', a:['4','négy'], ex:'Négy mellékégtáj van: ÉK, DK, DNy, ÉNy.' },
        { t:'input', d:2, q:'Írd le az északnyugat rövidítését!', a:['ÉNy','é-ny'], ex:'Az északnyugat rövidítése: ÉNy.' },
        { t:'input', d:2, q:'Melyik égtájon kel fel a Nap? (egy szó)', a:['kelet','keleten'], ex:'A Nap keleten kel fel.' },
        { t:'input', d:3, q:'Az 1 : 100 000 méretarányú térképen két falu távolsága 3 cm. Hány km a valóságban?', a:'3', unit:'km', ex:'1 cm = 1 km, ezért 3 cm = 3 km.' },

        { t:'order', d:1, q:'Rakd sorba az égtájakat az óramutató járása szerint, északról indulva!', a:['észak','kelet','dél','nyugat'], ex:'Északról jobbra fordulva: észak, kelet, dél, nyugat.' },
        { t:'order', d:2, q:'Rendezd sorba a Nap útját reggeltől estig!', pic:'🌅☀️🌇', a:['keleten kel fel','délen jár','nyugaton nyugszik le'], ex:'Reggel keleten kel, délben délen jár, este nyugaton nyugszik.' },
        { t:'order', d:2, q:'Rendezd a felszínformákat az alacsonyabbtól a magasabbig!', a:['síkság','dombság','hegység'], ex:'Síkság: 200 m alatt, dombság: 200–500 m, hegység: 500 m felett.' },

        { t:'match', d:2, q:'Párosítsd a térkép színeit a jelentésükkel!', pic:'🗺️', a:[['kék','víz'],['zöld','síkság'],['sárga','dombság'],['barna','hegység']], ex:'Kék a víz, zöld a síkság, sárga a dombság, barna a hegység.' },
        { t:'match', d:1, q:'Párosítsd a rövidítést az égtájjal!', a:[['É','észak'],['K','kelet'],['D','dél'],['Ny','nyugat']], ex:'É = észak, K = kelet, D = dél, Ny = nyugat.' },
        { t:'match', d:2, q:'Párosítsd a mellékégtájak rövidítését a nevükkel!', a:[['ÉK','északkelet'],['DK','délkelet'],['DNy','délnyugat'],['ÉNy','északnyugat']], ex:'A mellékégtáj neve két fő égtájból áll össze.' },

        { t:'group', d:1, q:'Válogasd szét: fő égtáj vagy mellékégtáj?', pic:'🧭', groups:{ 'Fő égtáj':['észak','dél','kelet','nyugat'], 'Mellékégtáj':['északkelet','délnyugat','délkelet','északnyugat'] }, ex:'A fő égtájak: É, K, D, Ny. A mellékégtájak kettőből állnak össze, pl. északkelet.' },
        { t:'group', d:1, q:'Válogasd szét: felszínforma vagy víz?', groups:{ 'Felszínforma':['hegy','domb','völgy','síkság'], 'Víz':['folyó','tó','patak','tenger'] }, ex:'A felszínformák a föld alakjai, a vizeket kékkel jelöli a térkép.' },
        { t:'group', d:3, q:'Mikor igaz? Válogasd szét a napszakok szerint!', pic:'🌅☀️🌇', groups:{ 'Reggel':['keleten van a Nap','nyugat felé nyúlik az árnyék'], 'Délben':['délen jár a Nap','legrövidebb az árnyék'], 'Este':['nyugaton van a Nap','kelet felé nyúlik az árnyék'] }, ex:'Az árnyék mindig a Nappal ellentétes irányba mutat.' }
      ]
    },

    /* ============ 2. MAGYARORSZÁG ============ */
    {
      id: 'magyarorszag',
      name: 'Magyarország',
      icon: '🏞️',
      learn: [
        { title: 'Hazánk', text: 'Magyarország Közép-Európában fekszik, nincs tengerpartja. Fővárosa Budapest, amelyet a Duna szel ketté. További nagyvárosaink: Debrecen, Szeged, Miskolc, Pécs, Győr.', example: 'Pl.: Debrecen a második legnagyobb városunk.' },
        { title: 'Nagytájaink', text: 'Hat nagytájunk van: Alföld, Kisalföld, Nyugat-magyarországi peremvidék, Dunántúli-dombság, Dunántúli-középhegység és Északi-középhegység. A legnagyobb az Alföld. Legmagasabb pontunk a Kékes (1014 m) a Mátrában.', example: 'Pl.: a Bakony a Dunántúli-középhegységben, a Bükk az Északi-középhegységben van.' },
        { title: 'Vizeink', text: 'Legnagyobb folyóink a Duna és a Tisza. Hazánk területén a Tisza a leghosszabb. További folyók: Dráva, Rába, Maros, Körös, Sajó. Tavaink: Balaton (Közép-Európa legnagyobb tava), Velencei-tó, Fertő-tó.', example: 'Pl.: a Fertő-tavon Ausztriával osztozunk.' },
        { title: 'Szomszédaink', text: 'Magyarország 7 országgal határos: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország és Szlovénia.', example: 'Pl.: a Dráva nagy részben a horvát határon folyik.' },
        { title: 'Nemzeti jelképek', text: 'A zászlónk piros-fehér-zöld. A címerünkön a Szent Korona látható. A Himnusz szövegét Kölcsey Ferenc írta, zenéjét Erkel Ferenc szerezte. Nemzeti ünnepeink: március 15., augusztus 20., október 23.', example: 'Pl.: augusztus 20-án az államalapító Szent Istvánra emlékezünk.' }
      ],
      questions: [
        { t:'mc', d:1, q:'Mi Magyarország fővárosa?', pic:'🏛️', a:['Budapest','Debrecen','Szeged','Pécs'], ex:'Hazánk fővárosa Budapest.' },
        { t:'mc', d:1, q:'Mi Magyarország legmagasabb pontja?', pic:'⛰️', a:['Kékes','Gellért-hegy','Írott-kő','Badacsony'], ex:'A Kékes 1014 m magas, ez hazánk legmagasabb pontja.' },
        { t:'mc', d:2, q:'Melyik hegységben található a Kékes?', a:['Mátra','Bükk','Bakony','Mecsek'], ex:'A Kékes a Mátrában van, az Északi-középhegységben.' },
        { t:'mc', d:1, q:'Melyik a legnagyobb tavunk?', pic:'🌊', a:['Balaton','Velencei-tó','Fertő-tó','Tisza-tó'], ex:'A Balaton nemcsak hazánk, hanem Közép-Európa legnagyobb tava is.' },
        { t:'mc', d:2, q:'Melyik a leghosszabb folyó Magyarország területén?', a:['Tisza','Duna','Rába','Dráva'], ex:'A Duna összesen hosszabb, de hazánk területén a Tisza folyik hosszabb szakaszon.' },
        { t:'mc', d:1, q:'Melyik folyó szeli ketté Budapestet?', pic:'🌉', a:['Duna','Tisza','Rába','Maros'], ex:'Budapestet a Duna osztja Budára és Pestre.' },
        { t:'mc', d:2, q:'Melyik a legnagyobb nagytájunk?', a:['Alföld','Kisalföld','Dunántúli-dombság','Északi-középhegység'], ex:'Az Alföld hazánk legnagyobb nagytája, ez egy hatalmas síkság.' },
        { t:'mc', d:2, q:'Melyik tavunkon osztozunk Ausztriával?', a:['Fertő-tó','Balaton','Velencei-tó','Hévízi-tó'], ex:'A Fertő-tó nagyobb része Ausztriához, kisebb része hozzánk tartozik.' },
        { t:'mc', d:2, q:'Melyik hazánk második legnagyobb városa?', a:['Debrecen','Szeged','Győr','Eger'], ex:'Budapest után Debrecen a legnagyobb városunk.' },
        { t:'mc', d:1, q:'Milyen színű a magyar zászló felülről lefelé?', a:['piros, fehér, zöld','zöld, fehér, piros','piros, zöld, fehér','fehér, piros, zöld'], ex:'A magyar zászló felül piros, középen fehér, alul zöld.' },
        { t:'mc', d:2, q:'Ki írta a Himnusz szövegét?', pic:'📜', a:['Kölcsey Ferenc','Petőfi Sándor','Vörösmarty Mihály','Arany János'], ex:'A Himnuszt Kölcsey Ferenc írta 1823-ban.' },
        { t:'mc', d:3, q:'Ki szerezte a Himnusz zenéjét?', pic:'🎼', a:['Erkel Ferenc','Liszt Ferenc','Kodály Zoltán','Bartók Béla'], ex:'A Himnusz zenéjét Erkel Ferenc szerezte.' },
        { t:'mc', d:2, q:'Melyik folyó jelöli nagy részben a horvát–magyar határt?', a:['Dráva','Rába','Ipoly','Sajó'], ex:'A Dráva hosszan a horvát határon folyik.' },
        { t:'mc', d:3, q:'Melyik folyó ömlik Győrnél a Mosoni-Dunába?', a:['Rába','Zagyva','Körös','Sajó'], ex:'A Rába Győrnél torkollik a Mosoni-Dunába.' },
        { t:'mc', d:2, q:'Melyik hegység NEM az Északi-középhegység része?', a:['Bakony','Mátra','Bükk','Zemplén'], ex:'A Bakony a Dunántúli-középhegységhez tartozik.' },
        { t:'mc', d:3, q:'Melyik nagytájhoz tartozik a Mecsek?', a:['Dunántúli-dombság','Dunántúli-középhegység','Északi-középhegység','Alföld'], ex:'A Mecsek a Dunántúli-dombságban emelkedik, Pécs mellett.' },
        { t:'mc', d:2, q:'Melyik város fekszik a Tisza partján, és a „napfény városának” is hívják?', pic:'🌞', a:['Szeged','Pécs','Győr','Miskolc'], ex:'Szeged a Tisza partján fekszik, és nagyon sok napsütéses órája van.' },

        { t:'tf', d:1, q:'Magyarországnak van tengerpartja.', a:false, ex:'Hazánknak nincs tengerpartja, de vannak szép tavaink és folyóink.' },
        { t:'tf', d:1, q:'A Balaton Közép-Európa legnagyobb tava.', pic:'⛵', a:true, ex:'Így van! A Balaton Közép-Európa legnagyobb tava.' },
        { t:'tf', d:2, q:'A Velencei-tó Budapest és Székesfehérvár között fekszik.', a:true, ex:'Igen, a Velencei-tó a két város között található.' },
        { t:'tf', d:2, q:'A magyar címeren a Szent Korona látható.', pic:'👑', a:true, ex:'Így van! A címer tetején a Szent Korona van.' },
        { t:'tf', d:2, q:'Magyarország határos Lengyelországgal.', a:false, ex:'Lengyelország nem szomszédunk, köztünk Szlovákia van.' },
        { t:'tf', d:3, q:'A Kékes magasabb 1000 méternél.', a:true, ex:'Igen! A Kékes 1014 m magas, éppen csak 1000 m felett van.' },

        { t:'input', d:1, q:'Mi a fővárosunk neve?', a:'Budapest', ex:'Fővárosunk Budapest.' },
        { t:'input', d:1, q:'Hány méter magas a Kékes?', a:'1014', unit:'m', ex:'A Kékes 1014 méter magas.' },
        { t:'input', d:2, q:'Hány országgal határos Magyarország?', a:['7','hét'], ex:'7 szomszédunk van: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.' },
        { t:'input', d:1, q:'Mi a neve a legnagyobb tavunknak?', a:'Balaton', ex:'A legnagyobb tavunk a Balaton.' },
        { t:'input', d:2, q:'Melyik hegységben van a Kékes?', a:['Mátra','a Mátra','Mátrában','a Mátrában'], ex:'A Kékes a Mátra legmagasabb csúcsa.' },
        { t:'input', d:3, q:'Március hányadikán ünnepeljük az 1848–49-es forradalmat és szabadságharcot?', a:['15','15-én','15-e','tizenötödikén'], ex:'Március 15-én emlékezünk az 1848-as forradalomra.' },

        { t:'order', d:1, q:'Rendezd a magyar zászló színeit felülről lefelé!', a:['piros','fehér','zöld'], ex:'Felül piros, középen fehér, alul zöld.' },
        { t:'order', d:2, q:'Rendezd a nemzeti ünnepeinket az év során időrendbe!', pic:'📅', a:['március 15.','augusztus 20.','október 23.'], ex:'Tavasszal március 15., nyáron augusztus 20., ősszel október 23.' },
        { t:'order', d:3, q:'Rendezd a magaslatokat az alacsonyabbtól a magasabbig!', pic:'⛰️', a:['Gellért-hegy','Badacsony','Írott-kő','Kékes'], ex:'Gellért-hegy 235 m, Badacsony 437 m, Írott-kő 882 m, Kékes 1014 m.' },

        { t:'match', d:3, q:'Párosítsd a hegységet a nagytájjal!', a:[['Mátra','Északi-középhegység'],['Bakony','Dunántúli-középhegység'],['Mecsek','Dunántúli-dombság'],['Kőszegi-hegység','Nyugat-magyarországi peremvidék']], ex:'A Mátra északon, a Bakony a Dunántúl közepén, a Mecsek délen, a Kőszegi-hegység nyugaton van.' },
        { t:'match', d:2, q:'Párosítsd a művet a költőjével!', pic:'📜', a:[['Himnusz','Kölcsey Ferenc'],['Szózat','Vörösmarty Mihály'],['Nemzeti dal','Petőfi Sándor']], ex:'Himnusz – Kölcsey, Szózat – Vörösmarty, Nemzeti dal – Petőfi.' },
        { t:'match', d:2, q:'Párosítsd a nemzeti ünnepet azzal, amire emlékezünk!', a:[['március 15.','az 1848-as forradalom'],['augusztus 20.','az államalapítás'],['október 23.','az 1956-os forradalom']], ex:'Március 15.: 1848, augusztus 20.: Szent István és az államalapítás, október 23.: 1956.' },

        { t:'group', d:1, q:'Válogasd szét: folyó vagy tó?', pic:'🌊', groups:{ 'Folyó':['Duna','Tisza','Rába','Dráva'], 'Tó':['Balaton','Velencei-tó','Fertő-tó','Hévízi-tó'] }, ex:'A folyó folyik, a tó vize egy helyben áll.' },
        { t:'group', d:2, q:'Válogasd szét: szomszédunk vagy nem szomszédunk?', groups:{ 'Szomszédos ország':['Ausztria','Szlovákia','Románia','Horvátország'], 'Nem szomszédos':['Németország','Lengyelország','Csehország','Olaszország'] }, ex:'Szomszédaink: Ausztria, Szlovákia, Ukrajna, Románia, Szerbia, Horvátország, Szlovénia.' },
        { t:'group', d:3, q:'Melyik nagytájhoz tartozik a hegység?', groups:{ 'Északi-középhegység':['Mátra','Bükk','Zemplén','Börzsöny'], 'Dunántúli-középhegység':['Bakony','Vértes','Pilis','Gerecse'] }, ex:'Az Északi-középhegység a Dunától keletre, a Dunántúli-középhegység a Dunántúlon húzódik.' }
      ]
    },

    /* ============ 3. ERDŐ ÉS MEZŐ ============ */
    {
      id: 'erdomezo',
      name: 'Erdő és mező',
      icon: '🌲',
      learn: [
        { title: 'Az erdő szintjei', text: 'Az erdő olyan, mint egy többemeletes ház. Legfelül a lombkoronaszint (fák koronája), alatta a cserjeszint (bokrok), majd a gyepszint (lágy szárú növények), legalul a mohaszint.', example: 'Pl.: tölgy – lombkorona, mogyoró – cserje, gyöngyvirág – gyep, moha – mohaszint.' },
        { title: 'Lombhullató és tűlevelű fák', text: 'A lombhullató fák (tölgy, bükk, gyertyán, nyír) ősszel elhullatják a leveleiket, így télen kevesebb vizet párologtatnak. A tűlevelű fák (lucfenyő, erdeifenyő) többsége télen is zöld.', example: 'Pl.: a vörösfenyő különleges: tűlevelű, mégis ősszel lehullatja a tűit.' },
        { title: 'Ki mit eszik?', text: 'A növényevők növényeket esznek (őz, szarvas, nyúl). A ragadozók más állatokat zsákmányolnak (róka, bagoly, egerészölyv). A mindenevők növényt és állatot is esznek (vaddisznó, borz).', example: 'Pl.: a vaddisznó makkot és gilisztát is eszik, ezért mindenevő.' },
        { title: 'Tápláléklánc', text: 'A tápláléklánc megmutatja, ki kit eszik. Mindig növénnyel kezdődik, mert a növények a napfény segítségével maguk készítik a táplálékukat. Az elpusztult élőlényeket a lebontók (gombák, baktériumok) bontják le.', example: 'Pl.: fű → mezei nyúl → róka' },
        { title: 'A mező és a rét', text: 'A mezőn kevés a fa, sok a napfény. Jellemző növények: pipacs, búzavirág, kamilla, katáng. Állatai: mezei nyúl, ürge, mezei pocok, fácán, pacsirta, egerészölyv.', example: 'Pl.: az ürge föld alatti üregben alussza téli álmát.' }
      ],
      questions: [
        { t:'mc', d:1, q:'Melyik az erdő legfelső szintje?', pic:'🌳', a:['lombkoronaszint','cserjeszint','gyepszint','mohaszint'], ex:'Legfelül a fák koronája van, ez a lombkoronaszint.' },
        { t:'mc', d:2, q:'Melyik szint van a legközelebb a talajhoz?', a:['mohaszint','cserjeszint','lombkoronaszint','gyepszint'], ex:'A mohaszint borítja közvetlenül a talajt.' },
        { t:'mc', d:2, q:'Melyik szinthez tartozik a mogyoró és a bodza?', a:['cserjeszint','lombkoronaszint','mohaszint','gyepszint'], ex:'A mogyoró és a bodza cserje, ezek a cserjeszintben élnek.' },
        { t:'mc', d:1, q:'Melyik fa lombhullató?', pic:'🍂', a:['tölgy','lucfenyő','erdeifenyő','jegenyefenyő'], ex:'A tölgy ősszel lehullatja a leveleit, a fenyők nem.' },
        { t:'mc', d:1, q:'Melyik fa tűlevelű?', pic:'🌲', a:['lucfenyő','bükk','tölgy','nyírfa'], ex:'A lucfenyőnek tűlevelei vannak, ezt használjuk karácsonyfának is.' },
        { t:'mc', d:1, q:'Mit eszik az őz?', pic:'🦌', a:['növényeket','egereket','halakat','madarakat'], ex:'Az őz növényevő: füvet, leveleket, rügyeket eszik.' },
        { t:'mc', d:2, q:'Melyik állat mindenevő?', pic:'🐗', a:['vaddisznó','őz','mezei nyúl','egerészölyv'], ex:'A vaddisznó makkot, gyökeret és apró állatokat is eszik.' },
        { t:'mc', d:2, q:'Melyik ragadozó vadászik éjszaka az erdőben?', pic:'🦉', a:['bagoly','harkály','szarvas','mókus'], ex:'A bagoly éjszakai ragadozó, kiválóan lát és hall a sötétben.' },
        { t:'mc', d:1, q:'Melyik madár kopogtatja a fák kérgét, hogy rovarokat találjon?', a:['harkály','bagoly','fácán','pacsirta'], ex:'A harkály erős csőrével kopácsolja a fát, és kiszedi a rovarokat.' },
        { t:'mc', d:2, q:'Melyik a helyes tápláléklánc?', a:['fű → nyúl → róka','róka → nyúl → fű','nyúl → fű → róka','fű → róka → nyúl'], ex:'A tápláléklánc növénnyel kezdődik: a nyúl megeszi a füvet, a róka a nyulat.' },
        { t:'mc', d:1, q:'Melyik a mező jellegzetes piros virága?', a:['pipacs','hóvirág','gyöngyvirág','ibolya'], ex:'A pipacs piros virága nyáron díszíti a mezőt.' },
        { t:'mc', d:2, q:'Hogy hívják a tölgyfa termését?', a:['makk','toboz','mogyoró','gesztenye'], ex:'A tölgy termése a makk, amit a vaddisznó és a szajkó is szeret.' },
        { t:'mc', d:3, q:'Kik a lebontók az életközösségben?', pic:'🍄', a:['gombák és baktériumok','ragadozó madarak','növényevő emlősök','virágos növények'], ex:'A gombák és baktériumok lebontják az elhalt élőlényeket, így tápanyag lesz belőlük.' },
        { t:'mc', d:2, q:'Melyik mezei állat alussza téli álmát föld alatti üregben?', a:['ürge','fácán','őz','pacsirta'], ex:'Az ürge ősszel elbújik az üregébe, és tavaszig alszik.' },
        { t:'mc', d:3, q:'Miért hullatják le leveleiket ősszel a lombhullató fák?', pic:'🍁', a:['hogy télen kevesebb vizet párologtassanak','mert elfáradnak','mert a szél letépi','hogy a madarak lássanak'], ex:'Télen a fagyott talajból kevés vizet kapnak a fák, ezért a levelek elhullatásával vizet takarítanak meg.' },

        { t:'tf', d:1, q:'A róka ragadozó állat.', pic:'🦊', a:true, ex:'Igen, a róka egereket, nyulakat, madarakat zsákmányol.' },
        { t:'tf', d:1, q:'Az erdőben a fák lombja alatt kevesebb fény jut a talajra.', a:true, ex:'Így van! A lombkorona sok fényt elfog, ezért árnyékos az erdő alja.' },
        { t:'tf', d:2, q:'A növények a napfény segítségével maguk készítik el a táplálékukat.', pic:'🌱☀️', a:true, ex:'Igen! Ezért kezdődik minden tápláléklánc növénnyel.' },
        { t:'tf', d:2, q:'A mókus téli álmot alszik.', pic:'🐿️', a:false, ex:'A mókus nem alszik téli álmot: ősszel élelmet rejt el, és télen ebből eszik.' },
        { t:'tf', d:2, q:'Ha a táplálékláncból eltűnik egy élőlény, az a többire is hatással van.', a:true, ex:'Igen! Ha eltűnnek az egerek, a bagoly sem talál elég élelmet.' },
        { t:'tf', d:3, q:'Minden tűlevelű fa télen is zöld marad.', a:false, ex:'Nem mind! A vörösfenyő ősszel elhullatja a tűleveleit.' },

        { t:'input', d:1, q:'Mi a fenyőfa termésének neve?', pic:'🌲', a:'toboz', ex:'A fenyő termése a toboz, benne vannak a magok.' },
        { t:'input', d:1, q:'Melyik fa termése a makk?', a:['tölgy','tölgyfa'], ex:'A makk a tölgyfa termése.' },
        { t:'input', d:2, q:'Hány lába van egy rovarnak, például a szarvasbogárnak?', pic:'🪲', a:['6','hat'], ex:'Minden rovarnak 6 lába van.' },
        { t:'input', d:2, q:'Hány lába van egy póknak?', pic:'🕷️', a:['8','nyolc'], ex:'A pók nem rovar, neki 8 lába van.' },
        { t:'input', d:2, q:'Mi a neve az erdő legalsó, talajt borító szintjének?', a:['mohaszint','moha'], ex:'A legalsó szint a mohaszint.' },
        { t:'input', d:3, q:'Mi a neve a szarvasbika fején lévő „fejdísznek”, amit minden évben elhullajt?', pic:'🦌', a:'agancs', ex:'A szarvas agancsát évente elhullajtja, és újat növeszt.' },

        { t:'order', d:2, q:'Rendezd az erdő szintjeit fentről lefelé!', pic:'🌳', a:['lombkoronaszint','cserjeszint','gyepszint','mohaszint'], ex:'Fentről lefelé: lombkorona, cserje, gyep, moha.' },
        { t:'order', d:2, q:'Rakd sorba a táplálékláncot!', a:['tölgylevél','hernyó','cinege','héja'], ex:'A hernyó a levelet eszi, a cinege a hernyót, a héja a cinegét.' },
        { t:'order', d:1, q:'Rakd sorba a mezei táplálékláncot!', pic:'🌾🐭🦅', a:['fűmag','mezei pocok','egerészölyv'], ex:'A pocok a magot eszi, az egerészölyv a pockot.' },

        { t:'match', d:3, q:'Párosítsd az állatot a kicsinyével!', a:[['őz','gida'],['szarvas','borjú'],['vaddisznó','malac'],['róka','kölyök']], ex:'Őzgida, szarvasborjú, vaddisznómalac, rókakölyök.' },
        { t:'match', d:2, q:'Párosítsd a növényt a termésével!', a:[['tölgy','makk'],['lucfenyő','toboz'],['vadrózsa','csipkebogyó']], ex:'A tölgy makkot, a fenyő tobozt, a vadrózsa csipkebogyót terem.' },
        { t:'match', d:1, q:'Párosítsd az állatot azzal, hogyan táplálkozik!', a:[['őz','növényevő'],['róka','ragadozó'],['vaddisznó','mindenevő']], ex:'Az őz növényt, a róka állatot, a vaddisznó mindkettőt eszi.' },

        { t:'group', d:2, q:'Válogasd szét az állatokat táplálkozásuk szerint!', pic:'🦌🦊🐗', groups:{ 'Növényevő':['őz','mezei nyúl','szarvas'], 'Ragadozó':['róka','egerészölyv','bagoly'], 'Mindenevő':['vaddisznó','borz'] }, ex:'Növényevő: őz, nyúl, szarvas. Ragadozó: róka, ölyv, bagoly. Mindenevő: vaddisznó, borz.' },
        { t:'group', d:1, q:'Válogasd szét a fákat!', pic:'🌳🌲', groups:{ 'Lombhullató':['tölgy','bükk','gyertyán','nyírfa'], 'Örökzöld tűlevelű':['lucfenyő','erdeifenyő','jegenyefenyő','tiszafa'] }, ex:'A lombhullatók ősszel elhullatják a leveleiket, a fenyők és a tiszafa télen is zöldek.' },
        { t:'group', d:2, q:'Hol él? Válogasd szét a növényeket!', groups:{ 'Erdő':['gyöngyvirág','páfrány','medvehagyma'], 'Mező':['pipacs','búzavirág','katáng'] }, ex:'Az erdei növények az árnyékot, a mezeiek a sok napfényt szeretik.' }
      ]
    },

    /* ============ 4. VIZEK ÉS VÍZPART ============ */
    {
      id: 'vizpart',
      name: 'Vizek és vízpart',
      icon: '🐸',
      learn: [
        { title: 'Álló- és folyóvizek', text: 'A folyóvizek folyamatosan haladnak: forrás, patak, folyó. A folyó a torkolatnál ömlik egy másik folyóba, tóba vagy tengerbe. Az állóvizek egy helyben vannak: tó, mocsár, láp.', example: 'Pl.: a Tisza folyóvíz, a Balaton állóvíz.' },
        { title: 'Vízparti és vízi növények', text: 'A vízparton nád, gyékény, sás nő, a fák közül fűz, éger és nyár. A vízben élnek a fehér tündérrózsa, a vízitök és a békalencse, amelyek levelei a víz felszínén úsznak. A nád alkotta életközösség a nádas.', example: 'Pl.: a nádasban fészkel a nádirigó.' },
        { title: 'Vízi állatok', text: 'A halak kopoltyúval lélegeznek, testüket többnyire pikkely borítja (ponty, csuka, keszeg). A kétéltűek (béka, gőte) a vízben és a szárazon is élnek. A béka petéiből ebihal kel, ami lassan békává alakul.', example: 'Pl.: a csuka ragadozó hal, a szürke gém halra és békára vadászik.' },
        { title: 'A víz körforgása', text: 'A Nap felmelegíti a vizet, ami elpárolog. A pára a magasban lehűl, apró cseppekké csapódik le, így felhő lesz belőle. A felhőből csapadék hullik, és a víz visszajut a patakokba, folyókba, tengerekbe.', example: 'Pl.: a pocsolya napsütésben eltűnik, mert elpárolog.' },
        { title: 'Vigyázzunk a vizekre!', text: 'A vizet szennyezi a szemét, az olaj, a vegyszer és a túl sok műtrágya. Az olaj hártyát képez a víz felszínén, ami megöli az élőlényeket. Takarékoskodjunk a vízzel, és ne dobjunk szemetet a vízbe!', example: 'Pl.: fogmosás közben zárd el a csapot!' }
      ],
      questions: [
        { t:'mc', d:1, q:'Melyik állóvíz?', a:['tó','patak','folyó','csermely'], ex:'A tó vize egy helyben áll, a patak és a folyó folyik.' },
        { t:'mc', d:1, q:'Melyik a vízpart magas, szalmaszerű szárú, nagy telepeket alkotó növénye?', a:['nád','pipacs','búza','gyöngyvirág'], ex:'A nád a vízparton nagy nádasokat alkot.' },
        { t:'mc', d:1, q:'Mivel lélegzik a hal?', pic:'🐟', a:['kopoltyúval','tüdővel','bőrével','orrával'], ex:'A hal kopoltyúval veszi fel a vízben oldott oxigént.' },
        { t:'mc', d:1, q:'Melyik állat hal?', a:['ponty','béka','vidra','gém'], ex:'A ponty hal, a béka kétéltű, a vidra emlős, a gém madár.' },
        { t:'mc', d:2, q:'Melyik hal ragadozó?', a:['csuka','ponty','amur','keszeg'], ex:'A csuka éles fogaival kisebb halakat zsákmányol.' },
        { t:'mc', d:2, q:'Melyik madár áll mozdulatlanul a sekély vízben, és halra les?', a:['szürke gém','tőkés réce','bütykös hattyú','nádirigó'], ex:'A szürke gém hosszú lábával áll a vízben, és hegyes csőrével kapja el a halat.' },
        { t:'mc', d:2, q:'Melyik vízi növény levelei úsznak a víz tetején, és szép fehér virága van?', pic:'🪷', a:['fehér tündérrózsa','nád','gyékény','sás'], ex:'A fehér tündérrózsa levelei és virága a víz felszínén úsznak.' },
        { t:'mc', d:1, q:'Melyik állat épít gátat a folyókon?', pic:'🦫', a:['hód','vidra','tőkés réce','csuka'], ex:'A hód fákat rág ki, és ágakból gátat és várat épít.' },
        { t:'mc', d:2, q:'Hogy hívjuk azt a helyet, ahol a patak ered?', a:['forrás','torkolat','meder','part'], ex:'A forrásnál tör elő a víz a föld alól, itt ered a patak.' },
        { t:'mc', d:2, q:'Mi a torkolat?', a:['ahol a folyó egy másik vízbe ömlik','ahol a folyó ered','a folyó partja','egy vízi növény'], ex:'A torkolatnál ömlik a folyó egy másik folyóba, tóba vagy tengerbe.' },
        { t:'mc', d:3, q:'Mi a kétéltűek közös jellemzője?', a:['vízben és szárazon is élnek','tollasak','egész életükben kopoltyúval lélegeznek','fészekbe rakják a tojásukat'], ex:'A kétéltűek (béka, gőte) a vízben fejlődnek, de felnőve a szárazföldön is élnek.' },
        { t:'mc', d:2, q:'Melyik állat kétéltű?', a:['gőte','vízisikló','ponty','vidra'], ex:'A gőte kétéltű, a vízisikló hüllő, a ponty hal, a vidra emlős.' },
        { t:'mc', d:3, q:'Mi történik, ha olaj kerül a vízbe?', pic:'🛢️', a:['hártyát képez, és az élőlények elpusztulhatnak','tisztább lesz a víz','a halak gyorsabban nőnek','semmi'], ex:'Az olaj hártyája elzárja a levegőt, a madarak tolla összeragad. Nagyon veszélyes!' },
        { t:'mc', d:2, q:'Melyik rovar lárvája fejlődik a vízben?', a:['szitakötő','katicabogár','méh','szarvasbogár'], ex:'A szitakötő lárvája a vízben él, a kifejlett szitakötő ügyes repülő vadász.' },
        { t:'mc', d:1, q:'Melyik fa nő szívesen a vízparton?', a:['fűz','lucfenyő','bükk','kaktusz'], ex:'A fűz szereti a nedves talajt, ezért gyakran a vízparton nő.' },

        { t:'tf', d:1, q:'A folyó folyóvíz, a tó állóvíz.', pic:'🏞️', a:true, ex:'Így van! A folyó vize halad, a tóé egy helyben van.' },
        { t:'tf', d:1, q:'A halak tüdővel lélegeznek.', pic:'🐠', a:false, ex:'A halak kopoltyúval lélegeznek.' },
        { t:'tf', d:2, q:'A béka a bőrén keresztül is lélegzik.', pic:'🐸', a:true, ex:'Igen! A béka tüdővel és a nedves bőrével is lélegzik.' },
        { t:'tf', d:2, q:'A vízisikló mérges kígyó.', pic:'🐍', a:false, ex:'A vízisikló nem mérges, az emberre nem veszélyes.' },
        { t:'tf', d:3, q:'A vízbe mosódó műtrágya az algák elszaporodását okozhatja.', a:true, ex:'Igen! A sok alga elveszi az oxigént a halak elől.' },
        { t:'tf', d:1, q:'A tenger vize sós.', pic:'🌊', a:true, ex:'Így van, ezért nem lehet meginni a tengervizet.' },

        { t:'input', d:2, q:'Hogy hívják a nád alkotta vízparti életközösséget?', a:'nádas', ex:'A nádas sok madárnak és rovarnak ad otthont.' },
        { t:'input', d:1, q:'Mi a neve a béka kicsinyének, amely a petéből kel ki?', pic:'🐸', a:'ebihal', ex:'A béka petéiből ebihalak kelnek ki.' },
        { t:'input', d:2, q:'Melyik emlős úszik ügyesen és vadászik halakra a folyóban? (v betűvel kezdődik)', pic:'🦦', a:'vidra', ex:'A vidra kiváló úszó, halakkal táplálkozik.' },
        { t:'input', d:3, q:'A víz körforgásában mi hull a felhőkből a földre? (egy szó)', pic:'🌧️', a:['csapadék','eső','hó','jégeső'], ex:'A felhőkből csapadék (eső, hó, jégeső) hull.' },
        { t:'input', d:2, q:'Hogy hívják azt a mélyedést, amelyben a folyó vize folyik? (m betűvel kezdődik)', a:['meder','folyómeder','mederben'], ex:'A folyó a medrében folyik.' },

        { t:'order', d:2, q:'Rendezd a béka fejlődését!', pic:'🥚🐸', a:['pete','ebihal','lábakat növesztő ebihal','kifejlett béka'], ex:'Petéből ebihal lesz, aztán lábai nőnek, végül béka lesz belőle.' },
        { t:'order', d:1, q:'Rendezd a víz útját a forrástól!', a:['forrás','patak','folyó','tenger'], ex:'A forrásból patak lesz, a patakokból folyó, a folyó a tengerbe ömlik.' },
        { t:'order', d:3, q:'Rendezd a víz körforgásának lépéseit!', pic:'☀️☁️🌧️', a:['a Nap felmelegíti a vizet','a víz elpárolog','felhő képződik','csapadék hullik','a víz visszajut a folyókba'], ex:'Melegedés, párolgás, felhőképződés, csapadék, és a víz újra a folyókba kerül.' },

        { t:'match', d:2, q:'Párosítsd az állatot a csoportjával!', a:[['ponty','hal'],['béka','kétéltű'],['vízisikló','hüllő'],['tőkés réce','madár']], ex:'Ponty – hal, béka – kétéltű, vízisikló – hüllő, réce – madár.' },
        { t:'match', d:2, q:'Párosítsd a fogalmat a jelentésével!', a:[['patak','kis folyóvíz'],['tó','állóvíz'],['forrás','ahol a víz előtör a földből'],['torkolat','ahol a folyó másik vízbe ömlik']], ex:'Jó, ha ezeket a szavakat pontosan ismered!' },
        { t:'match', d:3, q:'Párosítsd az állatot a táplálékával!', a:[['hód','fák kérge és ágai'],['csuka','kisebb halak'],['szitakötő','szúnyogok és legyek']], ex:'A hód növényevő, a csuka és a szitakötő ragadozó.' },

        { t:'group', d:1, q:'Válogasd szét: állóvíz vagy folyóvíz?', groups:{ 'Állóvíz':['tó','mocsár','láp','halastó'], 'Folyóvíz':['patak','folyó','csermely','Tisza'] }, ex:'Az állóvíz egy helyben van, a folyóvíz halad.' },
        { t:'group', d:2, q:'Válogasd szét a vízi állatokat!', pic:'🐟🐸🦆', groups:{ 'Hal':['ponty','csuka','harcsa'], 'Kétéltű':['béka','gőte'], 'Madár':['szürke gém','tőkés réce','hattyú'] }, ex:'A halak kopoltyúval lélegeznek, a kétéltűek vízben és szárazon élnek, a madarak tollasak.' },
        { t:'group', d:2, q:'Hol él a növény?', groups:{ 'Vízben úszik a levele':['fehér tündérrózsa','békalencse','vízitök'], 'Vízparti fa':['fűz','éger','nyárfa'] }, ex:'A tündérrózsa, a békalencse és a vízitök a vízben él, a fűz, az éger és a nyár a parton nő.' }
      ]
    },

    /* ============ 5. EMBERI TEST ÉS EGÉSZSÉG ============ */
    {
      id: 'testem',
      name: 'Testünk, egészség',
      icon: '💪',
      learn: [
        { title: 'Mozgás: csontok és izmok', text: 'A csontváz tartja és védi a testünket. A koponya az agyat, a bordák a szívet és a tüdőt védik. A csontokat az izmok mozgatják: összehúzódnak és elernyednek. Leghosszabb csontunk a combcsont.', example: 'Pl.: ha behajlítod a karod, a felkarod izma összehúzódik.' },
        { title: 'Légzés és keringés', text: 'Belégzéskor oxigént veszünk fel, kilégzéskor szén-dioxidot adunk le. A levegő útja: orr, garat, gége, légcső, hörgők, tüdő. A szív egy izom, amely pumpálja a vért; a vér az ereken jut el minden testrészbe.', example: 'Pl.: futás után gyorsabban ver a szíved, és szaporábban lélegzel.' },
        { title: 'Emésztés és kiválasztás', text: 'Az emésztés a szájban kezdődik. Az étel útja: száj, nyelőcső, gyomor, vékonybél, vastagbél. A vese megszűri a vért, és vizeletet termel, ami a húgyhólyagba gyűlik.', example: 'Pl.: alaposan rágd meg az ételt, így könnyebb megemészteni!' },
        { title: 'Idegrendszer és érzékszervek', text: 'Az idegrendszer (agy, gerincvelő, idegek) irányítja a testet. Öt érzékszervünk: szem (látás), fül (hallás és egyensúly), orr (szaglás), nyelv (ízlelés), bőr (tapintás, hő, fájdalom).', example: 'Pl.: a forró bögrét a bőröd érzékeli, az agyad pedig azt üzeni: engedd el!' },
        { title: 'Egészség és elsősegély', text: 'Egyél sok zöldséget és gyümölcsöt, igyál vizet, mozogj naponta, aludj 9–11 órát! Moss kezet és fogat rendszeresen. Égési sérülést hideg folyóvízzel hűts! Baj esetén hívd a 112-t!', example: 'Pl.: 104 a mentők, 105 a tűzoltók, 107 a rendőrség, 112 az általános segélyhívó.' }
      ],
      questions: [
        { t:'mc', d:1, q:'Melyik szervünk pumpálja a vért?', pic:'❤️', a:['szív','tüdő','gyomor','vese'], ex:'A szív egy erős izom, egész életünkben pumpálja a vért.' },
        { t:'mc', d:1, q:'Melyik szervünkkel lélegzünk?', pic:'🫁', a:['tüdő','szív','máj','gyomor'], ex:'A tüdőbe jut a belélegzett levegő.' },
        { t:'mc', d:1, q:'Melyik érzékszervünkkel látunk?', pic:'👁️', a:['szem','fül','orr','nyelv'], ex:'A szemünkkel látunk.' },
        { t:'mc', d:2, q:'Melyik érzékszervünk segít az egyensúlyozásban is?', pic:'🤸', a:['fül','szem','orr','nyelv'], ex:'A belső fülben van az egyensúlyérzék szerve.' },
        { t:'mc', d:2, q:'Mit véd a koponya?', pic:'💀', a:['az agyat','a szívet','a gyomrot','a tüdőt'], ex:'A kemény koponya védi az agyat.' },
        { t:'mc', d:2, q:'Mit védenek a bordák?', a:['a szívet és a tüdőt','az agyat','a lábakat','a gerincvelőt'], ex:'A bordák kosárként veszik körül a szívet és a tüdőt.' },
        { t:'mc', d:2, q:'Melyik a testünk leghosszabb csontja?', pic:'🦴', a:['combcsont','felkarcsont','sípcsont','lapocka'], ex:'A combcsont a leghosszabb és egyik legerősebb csontunk.' },
        { t:'mc', d:2, q:'Melyik gázra van szüksége a testünknek, amit belélegzünk?', a:['oxigén','szén-dioxid','füst','kipufogógáz'], ex:'Oxigént lélegzünk be, és szén-dioxidot fújunk ki.' },
        { t:'mc', d:2, q:'Hol kezdődik az emésztés?', pic:'👄', a:['a szájban','a gyomorban','a vastagbélben','a vesében'], ex:'Már a szájban elkezdődik: a fogak összerágják, a nyál pedig bontani kezdi az ételt.' },
        { t:'mc', d:2, q:'Melyik szerv szűri meg a vért, és termeli a vizeletet?', a:['vese','szív','tüdő','gyomor'], ex:'A vese a kiválasztás fontos szerve.' },
        { t:'mc', d:1, q:'Melyik az általános segélyhívó szám?', pic:'☎️', a:['112','108','123','555'], ex:'Európában a 112 az általános segélyhívó szám.' },
        { t:'mc', d:2, q:'Mit tegyél, ha megégetted az ujjad?', pic:'🔥', a:['hideg folyóvízzel hűtöm','vajat kenek rá','szorosan bekötöm','nem csinálok semmit'], ex:'Az égett bőrt 10–20 percig hideg folyóvízzel kell hűteni. Vajat soha ne kenj rá!' },
        { t:'mc', d:2, q:'Mennyit aludjon éjszakánként egy 10 éves gyerek?', pic:'😴', a:['kb. 9–11 órát','4–5 órát','6 órát','14–15 órát'], ex:'A gyerekeknek 9–11 óra alvásra van szükségük, hogy kipihenjék magukat.' },
        { t:'mc', d:1, q:'Melyik egészséges tízórai?', pic:'🍎🥪', a:['alma és teljes kiőrlésű kenyér','chips','cukorka','kóla és fánk'], ex:'A gyümölcs és a teljes kiőrlésű kenyér sok vitamint és rostot ad.' },
        { t:'mc', d:3, q:'Melyik szervrendszerhez tartozik az agy, a gerincvelő és az idegek?', pic:'🧠', a:['idegrendszer','keringési rendszer','emésztőrendszer','légzőrendszer'], ex:'Az idegrendszer irányítja a test működését.' },
        { t:'mc', d:3, q:'Mit csinálnak az izmok, amikor mozgatják a csontokat?', a:['összehúzódnak','emésztenek','lélegeznek','vizeletet termelnek'], ex:'Az izom összehúzódik, és így elmozdítja a csontot.' },
        { t:'mc', d:2, q:'Mit tegyél, ha vérzik az orrod?', a:['előrehajtom a fejem, és összenyomom az orrom','hátrahajtom a fejem','hanyatt fekszem','ugrálok'], ex:'Hajtsd előre a fejed, és szorítsd össze az orrcimpáidat néhány percig.' },

        { t:'tf', d:1, q:'Naponta legalább kétszer kell fogat mosni.', pic:'🪥', a:true, ex:'Igen! Reggel és este is moss fogat, 2–3 percig.' },
        { t:'tf', d:2, q:'A szív egy izom.', pic:'❤️', a:true, ex:'Így van! A szív erős izom, amely folyamatosan dolgozik.' },
        { t:'tf', d:1, q:'Az ízlelés szerve az orr.', a:false, ex:'Az ízlelés szerve a nyelv, az orrunkkal szaglunk.' },
        { t:'tf', d:2, q:'A csontjaink élnek és növekednek.', a:true, ex:'Igen! A csontok élő szövetből állnak, ezért nőnek és gyógyulnak is.' },
        { t:'tf', d:1, q:'A vér az ereken keresztül jut el minden testrészbe.', a:true, ex:'Így van! Az erek hálózata a test minden részébe elviszi a vért.' },
        { t:'tf', d:1, q:'Az étkezés előtti kézmosással betegségeket előzhetünk meg.', pic:'🧼', a:true, ex:'Igen! A szappanos kézmosás eltávolítja a kórokozókat.' },

        { t:'input', d:1, q:'Melyik számot hívod vészhelyzetben? (általános segélyhívó)', pic:'🚑', a:'112', ex:'Az általános segélyhívó szám a 112.' },
        { t:'input', d:1, q:'Melyik érzékszervünkkel hallunk?', pic:'👂', a:['fül','füllel','fülünkkel','a fülünkkel'], ex:'A fülünkkel hallunk.' },
        { t:'input', d:2, q:'Melyik szervbe jut az étel a nyelőcső után?', a:['gyomor','gyomorba','a gyomorba'], ex:'A nyelőcső a gyomorba vezeti az ételt.' },
        { t:'input', d:2, q:'Melyik a legnagyobb szervünk, amely az egész testünket befedi?', a:['bőr','a bőr'], ex:'A bőr a legnagyobb szervünk, véd és érzékel is.' },
        { t:'input', d:3, q:'Mi a neve a csőnek, amelyen a levegő a tüdő felé halad? (l betűvel kezdődik)', a:'légcső', ex:'A légcső vezeti a levegőt a hörgőkön át a tüdőbe.' },
        { t:'input', d:2, q:'Az egészséges ember testhőmérséklete 36 és ___ °C között van.', pic:'🌡️', a:'37', unit:'°C', ex:'Az egészséges testhőmérséklet kb. 36–37 °C.' },

        { t:'order', d:3, q:'Rendezd az étel útját az emésztés során!', a:['száj','nyelőcső','gyomor','vékonybél','vastagbél'], ex:'Száj, nyelőcső, gyomor, vékonybél, vastagbél.' },
        { t:'order', d:2, q:'Rendezd a belélegzett levegő útját!', pic:'👃🫁', a:['orr','légcső','hörgők','tüdő'], ex:'A levegő az orron, a légcsövön és a hörgőkön át jut a tüdőbe.' },
        { t:'order', d:1, q:'Rendezd a kézmosás lépéseit!', pic:'🧼🙌', a:['benedvesítem a kezem','beszappanozom','alaposan dörzsölöm','leöblítem','megtörlöm'], ex:'Nedvesítés, szappanozás, dörzsölés, öblítés, törlés.' },

        { t:'match', d:1, q:'Párosítsd az érzékszervet az érzékkel!', pic:'👁️👂👃👅', a:[['szem','látás'],['fül','hallás'],['orr','szaglás'],['nyelv','ízlelés']], ex:'Szem – látás, fül – hallás, orr – szaglás, nyelv – ízlelés.' },
        { t:'match', d:2, q:'Párosítsd a szervet a szervrendszerrel!', a:[['szív','keringés'],['tüdő','légzés'],['gyomor','emésztés'],['vese','kiválasztás']], ex:'Minden szervnek megvan a maga feladata.' },
        { t:'match', d:3, q:'Párosítsd a telefonszámot!', pic:'☎️', a:[['104','mentők'],['105','tűzoltók'],['107','rendőrség'],['112','általános segélyhívó']], ex:'104 mentők, 105 tűzoltók, 107 rendőrség, 112 általános segélyhívó.' },

        { t:'group', d:1, q:'Válogasd szét a szokásokat!', pic:'🥦🍭', groups:{ 'Egészséges':['rendszeres mozgás','sok zöldség','elég alvás','fogmosás'], 'Egészségtelen':['sok édesség','éjszakai tévézés','egész napos ülés','sok cukros üdítő'] }, ex:'A mozgás, a zöldség és a pihenés egészséges; a sok cukor és ülés nem.' },
        { t:'group', d:2, q:'Válogasd szét: érzékszerv vagy belső szerv?', groups:{ 'Érzékszerv':['szem','fül','orr','nyelv'], 'Belső szerv':['szív','tüdő','gyomor','vese'] }, ex:'Az érzékszervek a külvilágot érzékelik, a belső szervek a test belsejében dolgoznak.' },
        { t:'group', d:3, q:'Melyik szervrendszerhez tartozik?', groups:{ 'Légzés':['légcső','tüdő','hörgők'], 'Emésztés':['nyelőcső','gyomor','vékonybél'], 'Keringés':['szív','erek'] }, ex:'Légzés: légcső, hörgők, tüdő. Emésztés: nyelőcső, gyomor, belek. Keringés: szív, erek.' }
      ]
    },

    /* ============ 6. ANYAGOK ÉS JELENSÉGEK ============ */
    {
      id: 'anyagok',
      name: 'Anyagok, jelenségek',
      icon: '🧪',
      learn: [
        { title: 'Halmazállapotok', text: 'Az anyagok háromféle halmazállapotúak lehetnek: szilárd (kő, jég, fa), folyékony (víz, tej, olaj) és légnemű (levegő, vízgőz). A szilárd anyagnak saját alakja van, a folyadék felveszi az edény alakját, a légnemű kitölti a teret.', example: 'Pl.: a víz lehet jég, folyékony víz és vízgőz is.' },
        { title: 'Halmazállapot-változások', text: 'Olvadás: szilárdból folyékony. Fagyás: folyékonyból szilárd. Párolgás: a folyadék felszínéről gőz lesz, bármilyen hőmérsékleten. Forrás: a folyadék belsejében is gőz képződik (a víz 100 °C-on forr). Lecsapódás: gőzből folyadék.', example: 'Pl.: a víz 0 °C-on fagy meg, és 100 °C-on forr.' },
        { title: 'Hőmérséklet és mérés', text: 'A hőmérsékletet hőmérővel mérjük, mértékegysége a Celsius-fok (°C). 0 °C alatt mínuszt (fagyot) mutat a hőmérő. Hosszúság: méter (vonalzó, mérőszalag), tömeg: kilogramm (mérleg), űrtartalom: liter (mérőpohár), idő: óra, perc, másodperc.', example: 'Pl.: az egészséges testhőmérséklet kb. 36–37 °C.' },
        { title: 'Égés', text: 'Az égéshez három dolog kell: éghető anyag, levegő (oxigén) és elég magas hőmérséklet. Ha bármelyiket elvesszük, a tűz kialszik. Olajtüzet tilos vízzel oltani, azt le kell takarni!', example: 'Pl.: a pohár alatt a gyertya elalszik, mert elfogy az oxigén.' },
        { title: 'Oldódás és mágnesesség', text: 'A só és a cukor feloldódik a vízben, a homok és az olaj nem. Melegítés és keverés gyorsítja az oldódást. A mágnes a vasat és az acélt vonzza, a fát, műanyagot, üveget, alumíniumot nem. A mágnesnek két pólusa van: az azonos pólusok taszítják, a különbözők vonzzák egymást.', example: 'Pl.: az iránytű tűje is egy kis mágnes.' }
      ],
      questions: [
        { t:'mc', d:1, q:'Milyen halmazállapotú a jég?', pic:'🧊', a:['szilárd','folyékony','légnemű'], ex:'A jég szilárd, saját alakja van.' },
        { t:'mc', d:1, q:'Milyen halmazállapotú a tej?', pic:'🥛', a:['folyékony','szilárd','légnemű'], ex:'A tej folyékony, felveszi a pohár alakját.' },
        { t:'mc', d:1, q:'Milyen halmazállapotú a levegő?', pic:'💨', a:['légnemű','szilárd','folyékony'], ex:'A levegő légnemű, kitölti a rendelkezésére álló teret.' },
        { t:'mc', d:1, q:'Mi a neve, amikor a jég vízzé válik?', pic:'🧊➡️💧', a:['olvadás','fagyás','forrás','lecsapódás'], ex:'Ha a szilárd anyag folyékonnyá válik, azt olvadásnak hívjuk.' },
        { t:'mc', d:2, q:'Mi a neve, amikor a víz jéggé válik?', pic:'💧➡️🧊', a:['fagyás','olvadás','párolgás','forrás'], ex:'Ha a folyadék megszilárdul, az a fagyás.' },
        { t:'mc', d:2, q:'Mi a neve, amikor a vizes ruhából lassan eltűnik a víz?', pic:'👕', a:['párolgás','olvadás','fagyás','lecsapódás'], ex:'A víz a ruha felszínéről elpárolog, ezért szárad meg.' },
        { t:'mc', d:2, q:'Mi történik, amikor fürdés után bepárásodik a hideg tükör?', pic:'🪞', a:['lecsapódás','olvadás','fagyás','égés'], ex:'A meleg vízgőz a hideg tükrön apró cseppekké csapódik le.' },
        { t:'mc', d:1, q:'Mivel mérjük a hőmérsékletet?', pic:'🌡️', a:['hőmérővel','mérleggel','vonalzóval','órával'], ex:'A hőmérsékletet hőmérővel mérjük.' },
        { t:'mc', d:2, q:'Mi a tömeg mértékegysége?', pic:'⚖️', a:['kilogramm','méter','liter','Celsius-fok'], ex:'A tömeget kilogrammban (kg) mérjük.' },
        { t:'mc', d:2, q:'Mi kell az égéshez?', pic:'🔥', a:['éghető anyag, levegő és magas hőmérséklet','csak víz','csak szél','csak sötétség'], ex:'Az égés három feltétele: éghető anyag, levegő (oxigén), magas hőmérséklet.' },
        { t:'mc', d:3, q:'Miért alszik el a gyertya, ha ráborítunk egy poharat?', pic:'🕯️', a:['elfogy alóla az oxigén','lehűti a pohár','elolvad a viasz','kifújja a szél'], ex:'A pohár alatt elfogy az oxigén, és oxigén nélkül nincs égés.' },
        { t:'mc', d:2, q:'Mit NEM vonz a mágnes?', pic:'🧲', a:['fa ceruza','vasszög','gemkapocs','vascsavar'], ex:'A mágnes a vasat vonzza, a fát nem.' },
        { t:'mc', d:3, q:'Mi történik, ha két mágnes azonos pólusát közelítjük egymáshoz?', pic:'🧲🧲', a:['taszítják egymást','vonzzák egymást','semmi','felforrósodnak'], ex:'Az azonos pólusok taszítják, a különböző pólusok vonzzák egymást.' },
        { t:'mc', d:2, q:'Melyik anyag oldódik fel a vízben?', a:['cukor','homok','olaj','kavics'], ex:'A cukor feloldódik a vízben, a homok, az olaj és a kavics nem.' },
        { t:'mc', d:3, q:'Mikor oldódik fel gyorsabban a cukor a teában?', pic:'☕', a:['ha meleg a tea, és kevergetjük','ha hideg a tea','ha nem keverjük','ha jeget teszünk bele'], ex:'A melegítés és a keverés is gyorsítja az oldódást.' },
        { t:'mc', d:3, q:'Miben különbözik a forrás a párolgástól?', a:['forráskor a folyadék belsejében is gőz képződik','a párolgás csak 100 °C-on történik','a forrás hidegben történik','semmiben'], ex:'A párolgás csak a felszínen zajlik, bármikor. Forráskor a folyadék belsejében is buborékok keletkeznek.' },

        { t:'tf', d:1, q:'A víz 0 °C-on megfagy.', pic:'❄️', a:true, ex:'Igen, a víz fagyáspontja 0 °C.' },
        { t:'tf', d:1, q:'A mágnes a fát is magához vonzza.', a:false, ex:'A mágnes csak bizonyos fémeket, például a vasat vonzza.' },
        { t:'tf', d:2, q:'A víz csak forrón tud párologni.', a:false, ex:'A párolgás bármilyen hőmérsékleten történik, ezért szárad meg a ruha a hűvösben is.' },
        { t:'tf', d:2, q:'Az égő olajat tilos vízzel oltani.', pic:'🍳', a:true, ex:'Így van! A víztől szétfröccsen az égő olaj. Fedővel kell letakarni.' },
        { t:'tf', d:3, q:'A feloldott só nem tűnik el a vízből, csak nem látjuk.', pic:'🧂', a:true, ex:'Igen! Ezért sós lesz a víz íze.' },
        { t:'tf', d:2, q:'0 °C alatt a hőmérő mínusz fokot mutat.', pic:'🌡️', a:true, ex:'Így van, ilyenkor fagy van.' },

        { t:'input', d:1, q:'Hány °C-on fagy meg a víz?', a:['0','nulla'], unit:'°C', ex:'A víz 0 °C-on fagy meg.' },
        { t:'input', d:2, q:'Hány °C-on forr a víz?', pic:'♨️', a:'100', unit:'°C', ex:'A víz 100 °C-on forr.' },
        { t:'input', d:2, q:'Mi a hosszúság alapmértékegysége?', pic:'📏', a:['méter','m'], ex:'A hosszúság alapmértékegysége a méter.' },
        { t:'input', d:2, q:'Milyen eszközzel mérjük a tömeget?', a:['mérleg','mérleggel'], ex:'A tömeget mérleggel mérjük.' },
        { t:'input', d:3, q:'Reggel 2 °C volt, délben 9 °C. Hány fokkal lett melegebb?', pic:'🌡️', a:'7', unit:'°C', ex:'9 − 2 = 7, tehát 7 fokkal lett melegebb.' },

        { t:'order', d:2, q:'Rendezd a hidegebbtől a melegebbig!', pic:'❄️➡️🔥', a:['fagyasztó belseje','hűtőszekrény belseje','szoba levegője','forrásban lévő víz'], ex:'Fagyasztó kb. −18 °C, hűtő kb. 5 °C, szoba kb. 22 °C, forró víz 100 °C.' },
        { t:'order', d:2, q:'Mi történik a jégkockával, ha sokáig melegítjük? Rendezd sorba!', pic:'🧊💧♨️', a:['jégkocka','olvadás','víz','forrás','vízgőz'], ex:'A jég elolvad, víz lesz belőle, a víz felforr, és vízgőzzé válik.' },
        { t:'order', d:1, q:'Rendezd a hosszúság-mértékegységeket a legkisebbtől!', pic:'📏', a:['milliméter','centiméter','méter','kilométer'], ex:'mm < cm < m < km.' },

        { t:'match', d:2, q:'Párosítsd a változást a példával!', a:[['olvadás','a fagyi elfolyik a napon'],['fagyás','télen befagy a tó'],['párolgás','megszárad a vizes ruha'],['lecsapódás','bepárásodik a hideg pohár']], ex:'Figyeld meg ezeket a jelenségeket otthon is!' },
        { t:'match', d:1, q:'Mit mivel mérünk?', a:[['hosszúság','mérőszalag'],['tömeg','mérleg'],['hőmérséklet','hőmérő'],['idő','stopperóra']], ex:'Minden mennyiséghez megvan a mérőeszköz.' },
        { t:'match', d:2, q:'Párosítsd a mennyiséget a mértékegységével!', a:[['hosszúság','méter'],['tömeg','kilogramm'],['űrtartalom','liter'],['hőmérséklet','Celsius-fok']], ex:'Hosszúság – m, tömeg – kg, űrtartalom – l, hőmérséklet – °C.' },

        { t:'group', d:1, q:'Válogasd szét halmazállapot szerint!', pic:'🧊💧💨', groups:{ 'Szilárd':['kő','jég','fa'], 'Folyékony':['víz','tej','étolaj'], 'Légnemű':['levegő','vízgőz'] }, ex:'A szilárdnak saját alakja van, a folyadék folyik, a légnemű kitölti a teret.' },
        { t:'group', d:2, q:'Vonzza a mágnes vagy nem?', pic:'🧲', groups:{ 'Vonzza':['vasszög','gemkapocs','vascsavar'], 'Nem vonzza':['radír','fa ceruza','üveggolyó','alufólia'] }, ex:'A mágnes a vasat vonzza; a gumit, fát, üveget, alumíniumot nem.' },
        { t:'group', d:2, q:'Feloldódik a vízben vagy nem?', pic:'💧', groups:{ 'Feloldódik':['só','kockacukor','porcukor'], 'Nem oldódik fel':['homok','étolaj','kavics'] }, ex:'A só és a cukor feloldódik, a homok leülepszik, az olaj a víz tetején úszik.' },
        { t:'group', d:1, q:'Éghető vagy nem éghető?', pic:'🔥', groups:{ 'Éghető':['fa','papír','gyertyaviasz'], 'Nem éghető':['kő','homok','üveg'] }, ex:'A fa, a papír és a viasz ég, a kő, a homok és az üveg nem.' }
      ]
    },

    /* ============ 7. FÖLD, NAPRENDSZER, IDŐJÁRÁS ============ */
    {
      id: 'urfold',
      name: 'Föld, ég, időjárás',
      icon: '🌍',
      learn: [
        { title: 'A Naprendszer', text: 'A Nap egy csillag, körülötte 8 bolygó kering. Sorrendjük a Naptól: Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz. A legnagyobb a Jupiter, a Szaturnusznak szép gyűrűi vannak, a Mars a „vörös bolygó”.', example: 'Pl.: a Föld a Naptól számított harmadik bolygó.' },
        { title: 'Forgás és keringés', text: 'A Föld a tengelye körül 1 nap (24 óra) alatt fordul meg: ezért váltakozik a nappal és az éjszaka. A Nap körül 1 év (365 nap) alatt kerül meg. A ferde tengely és a keringés miatt vannak évszakok.', example: 'Pl.: szökőévben 366 nap van, ilyenkor van február 29.' },
        { title: 'A Hold', text: 'A Hold a Föld kísérője, nincs saját fénye, a Nap fényét veri vissza. Kb. egy hónap alatt kerüli meg a Földet, közben változik az alakja: újhold, növekvő hold, telihold, fogyó hold.', example: 'Pl.: teliholdkor az egész kerek korongot látjuk.' },
        { title: 'Időjárás', text: 'Az időjárás elemei: hőmérséklet, csapadék, szél, felhőzet. Csapadék: eső, hó, jégeső. A szél irányát arról nevezzük el, ahonnan fúj. Eszközök: hőmérő, csapadékmérő, szélkakas.', example: 'Pl.: az északi szél északról fúj, ezért nálunk többnyire hideg.' },
        { title: 'Óvjuk a Földet!', text: 'Gyűjtsük szelektíven a hulladékot: általában kék kuka – papír, sárga – műanyag és fémdoboz, zöld – üveg. Az elemet és a gyógyszert külön gyűjtőbe vigyük! Használjunk megújuló energiát: nap-, szél- és vízenergiát.', example: 'Pl.: a kiöblített, laposra taposott PET-palack a sárga kukába való.' }
      ],
      questions: [
        { t:'mc', d:1, q:'Melyik bolygón élünk?', pic:'🌍', a:['Föld','Mars','Vénusz','Jupiter'], ex:'A Földön élünk, a Naptól számított harmadik bolygón.' },
        { t:'mc', d:1, q:'Mi a Nap?', pic:'☀️', a:['csillag','bolygó','hold','üstökös'], ex:'A Nap egy csillag, saját fénye és hője van.' },
        { t:'mc', d:2, q:'Melyik bolygó van a legközelebb a Naphoz?', a:['Merkúr','Vénusz','Föld','Neptunusz'], ex:'A Merkúr a Naphoz legközelebbi bolygó.' },
        { t:'mc', d:2, q:'Melyik a Naprendszer legnagyobb bolygója?', a:['Jupiter','Föld','Mars','Merkúr'], ex:'A Jupiter a legnagyobb bolygó, több mint ezer Föld is beleférne.' },
        { t:'mc', d:2, q:'Melyik bolygót hívják „vörös bolygónak”?', pic:'🔴', a:['Mars','Vénusz','Szaturnusz','Neptunusz'], ex:'A Mars felszíne vöröses színű.' },
        { t:'mc', d:2, q:'Melyik bolygónak vannak jól látható, szép gyűrűi?', pic:'🪐', a:['Szaturnusz','Mars','Merkúr','Föld'], ex:'A Szaturnusz gyűrűi jégből és kőzetdarabokból állnak.' },
        { t:'mc', d:1, q:'Mi okozza a nappalok és éjszakák váltakozását?', pic:'🌞🌚', a:['a Föld forgása','a Föld keringése','a Hold','a felhők'], ex:'A Föld forog: amelyik oldala a Nap felé néz, ott nappal van.' },
        { t:'mc', d:2, q:'Mennyi idő alatt kerüli meg a Föld a Napot?', a:['1 év','1 nap','1 hónap','1 hét'], ex:'A Föld 1 év, kb. 365 nap alatt kerüli meg a Napot.' },
        { t:'mc', d:2, q:'Mennyi idő alatt fordul meg a Föld egyszer a tengelye körül?', a:['1 nap','1 év','1 hét','1 óra'], ex:'Egy fordulat 1 nap, vagyis 24 óra.' },
        { t:'mc', d:1, q:'Mi a Hold?', pic:'🌙', a:['a Föld kísérője','egy csillag','egy bolygó','a Nap része'], ex:'A Hold a Föld körül kering, ő a Föld kísérője.' },
        { t:'mc', d:2, q:'Hogy hívjuk, amikor a Hold egész kerek korongja látszik?', pic:'🌕', a:['telihold','újhold','növekvő hold','fogyó hold'], ex:'Teliholdkor az egész Holdat fényesnek látjuk.' },
        { t:'mc', d:3, q:'Miért látjuk fényesnek a Holdat?', a:['visszaveri a Nap fényét','saját fénye van','ég a felszíne','a földi lámpák világítják meg'], ex:'A Holdnak nincs saját fénye, a Nap fényét veri vissza.' },
        { t:'mc', d:1, q:'Mivel mérjük a lehullott eső mennyiségét?', pic:'🌧️', a:['csapadékmérővel','hőmérővel','iránytűvel','mérleggel'], ex:'A csapadékmérő megmutatja, mennyi eső esett.' },
        { t:'mc', d:2, q:'Melyik NEM időjárási elem?', a:['a talaj színe','hőmérséklet','csapadék','szél'], ex:'Az időjárás elemei: hőmérséklet, csapadék, szél, felhőzet.' },
        { t:'mc', d:2, q:'Honnan fúj az északi szél?', pic:'🌬️', a:['északról','észak felé','délről','keletről'], ex:'A szelet arról nevezzük el, ahonnan fúj. Az északi szél északról jön.' },
        { t:'mc', d:1, q:'Melyik színű gyűjtőbe dobjuk általában a papírt?', pic:'📦', a:['kék','sárga','zöld','piros'], ex:'A papírt általában a kék gyűjtőbe tesszük.' },
        { t:'mc', d:2, q:'Melyik megújuló energiaforrás?', pic:'☀️💨', a:['napenergia','kőszén','kőolaj','földgáz'], ex:'A napenergia nem fogy el, ezért megújuló.' },
        { t:'mc', d:3, q:'Mi az évszakok váltakozásának oka?', a:['a Föld ferde tengellyel kering a Nap körül','a Föld forog','a Hold alakja változik','a felhők mennyisége'], ex:'A ferde tengely miatt a keringés során hol az északi, hol a déli félteke kap több napfényt.' },

        { t:'tf', d:1, q:'A Föld forog a saját tengelye körül.', pic:'🌍', a:true, ex:'Igen! Ezért van nappal és éjszaka.' },
        { t:'tf', d:2, q:'Nyáron azért van meleg, mert a Föld ilyenkor sokkal közelebb van a Naphoz.', a:false, ex:'Nem ezért! A ferde tengely miatt nyáron magasabban jár a Nap, és tovább süt.' },
        { t:'tf', d:1, q:'A Naprendszerben 8 bolygó van.', pic:'🪐', a:true, ex:'Így van: Merkúr, Vénusz, Föld, Mars, Jupiter, Szaturnusz, Uránusz, Neptunusz.' },
        { t:'tf', d:2, q:'A Hold saját fényt bocsát ki.', pic:'🌙', a:false, ex:'A Holdnak nincs saját fénye, a Nap fényét veri vissza.' },
        { t:'tf', d:3, q:'Nálunk decemberben vannak a legrövidebb nappalok.', pic:'❄️', a:true, ex:'Igen! December 21. körül a legrövidebb a nappal és a leghosszabb az éjszaka.' },
        { t:'tf', d:1, q:'A használt elemet a háztartási szemétbe is dobhatjuk.', pic:'🔋', a:false, ex:'Az elem mérgező anyagokat tartalmaz, ezért külön gyűjtőbe kell vinni.' },

        { t:'input', d:1, q:'Hány bolygó van a Naprendszerben?', a:['8','nyolc'], ex:'8 bolygó kering a Nap körül.' },
        { t:'input', d:2, q:'Hány napból áll egy nem szökőév?', pic:'📅', a:'365', unit:'nap', ex:'Egy év 365 nap, szökőévben 366.' },
        { t:'input', d:2, q:'Hány órából áll egy nap?', pic:'🕛', a:'24', unit:'óra', ex:'Egy nap 24 óra, ennyi idő alatt fordul meg a Föld.' },
        { t:'input', d:3, q:'Hány napból áll egy szökőév?', a:'366', unit:'nap', ex:'Szökőévben február 29 napos, ezért 366 nap az év.' },
        { t:'input', d:2, q:'Melyik a Naptól számított harmadik bolygó?', a:['Föld','a Föld'], ex:'Merkúr, Vénusz, Föld – a Föld a harmadik.' },
        { t:'input', d:3, q:'Melyik a Naptól legtávolabbi bolygó?', a:['Neptunusz','Neptun','a Neptunusz'], ex:'A Neptunusz a legtávolabbi bolygó a Naprendszerben.' },

        { t:'order', d:2, q:'Rendezd a bolygókat a Naptól távolodva!', pic:'☀️', a:['Merkúr','Vénusz','Föld','Mars'], ex:'Merkúr, Vénusz, Föld, Mars – ezek a belső bolygók.' },
        { t:'order', d:3, q:'Rendezd a külső bolygókat a Naptól távolodva!', pic:'🪐', a:['Jupiter','Szaturnusz','Uránusz','Neptunusz'], ex:'Jupiter, Szaturnusz, Uránusz, Neptunusz.' },
        { t:'order', d:1, q:'Rendezd az évszakokat tavasztól kezdve!', pic:'🌷☀️🍂❄️', a:['tavasz','nyár','ősz','tél'], ex:'Tavasz, nyár, ősz, tél – és kezdődik elölről.' },
        { t:'order', d:3, q:'Rendezd a holdfázisokat újholdtól kezdve!', pic:'🌑🌓🌕🌗', a:['újhold','növekvő hold','telihold','fogyó hold'], ex:'Újhold után a Hold növekszik, majd telihold lesz, aztán fogy.' },

        { t:'match', d:1, q:'Párosítsd az évszakot a jellemzőjével!', a:[['tavasz','rügyfakadás'],['nyár','leghosszabb nappalok'],['ősz','lombhullás'],['tél','leghosszabb éjszakák']], ex:'Tavasszal rügyeznek a fák, nyáron hosszúak a nappalok, ősszel hullik a lomb, télen hosszúak az éjszakák.' },
        { t:'match', d:2, q:'Mit mivel mérünk az időjárásnál?', a:[['hőmérséklet','hőmérő'],['csapadék','csapadékmérő'],['szélirány','szélkakas']], ex:'Hőmérő, csapadékmérő, szélkakas – egy kis időjárás-állomás!' },
        { t:'match', d:2, q:'Melyik hulladék melyik gyűjtőbe való (általában)?', pic:'♻️', a:[['újságpapír','kék gyűjtő'],['műanyag palack','sárga gyűjtő'],['befőttesüveg','zöld gyűjtő']], ex:'Papír – kék, műanyag – sárga, üveg – zöld.' },

        { t:'group', d:2, q:'Bolygó vagy nem bolygó?', pic:'🪐', groups:{ 'Bolygó':['Mars','Vénusz','Jupiter','Neptunusz'], 'Nem bolygó':['Nap','Hold','üstökös'] }, ex:'A Nap csillag, a Hold a Föld kísérője, az üstökös jégből és porból álló égitest.' },
        { t:'group', d:2, q:'Megújuló vagy nem megújuló energiaforrás?', pic:'⚡', groups:{ 'Megújuló':['napenergia','szélenergia','vízenergia'], 'Nem megújuló':['kőszén','kőolaj','földgáz'] }, ex:'A nap, a szél és a víz nem fogy el; a szén, az olaj és a földgáz egyszer elfogy.' },
        { t:'group', d:2, q:'Csapadék vagy más időjárási elem?', pic:'🌧️🌬️', groups:{ 'Csapadék':['eső','hó','jégeső'], 'Nem csapadék':['szél','hőmérséklet','felhőzet'] }, ex:'A csapadék a felhőből hulló víz: eső, hó, jégeső.' },
        { t:'group', d:3, q:'Hová kerüljön a hulladék?', pic:'♻️🔋', groups:{ 'Szelektív gyűjtő':['papírdoboz','műanyag flakon','üvegpalack'], 'Különleges gyűjtőhely':['használt elem','lejárt gyógyszer','festékes doboz'] }, ex:'Az elemet, a gyógyszert és a festéket veszélyes hulladékként külön kell leadni.' }
      ]
    }
  ]
});
