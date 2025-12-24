// data.js – generiert mit dem DnD Welt-Glossar Editor
// Kopiere diese Datei zurück in dein Projekt.

window.dashboard = {
  "progress": {
    "label": "2% Kampagnenfortschritt",
    "percent": 2
  },
  "notes": [
    "Letzte gespielte Sitzung: Recap 8 (Stand: 2025-12-03).",
    "Regionen-Fokus: Narvik & Campari."
  ],
  "help": {
    "title": "Frag die DMs",
    "lines": [
      "Du hast Fragen zu Regeln, Lore oder Homebrew?",
      "Frag deine Spielleitung im Discord oder am Tisch.",
      "Markiere dir im Glossar Einträge, zu denen du noch etwas klären möchtest."
    ]
  }
};

window.timelineMeta = {
  "start": {
    "label": "600 VGT",
    "description": "Vor der Großen Teilung",
    "epochId": "vgt",
    "year": 600
  },
  "scopes": [
    {
      "id": "world",
      "name": "Weltgeschichte",
      "color": "#2563eb",
      "icon": ""
    },
    {
      "id": "campari",
      "name": "Campari",
      "color": "#1fa58b",
      "icon": ""
    }
  ],
  "defaultScopeId": "world",
  "ui": {
    "showLegend": true,
    "showScopeFilter": true,
    "showStartMarker": true
  },
  "notes": [
    "scopeId steuert später die Farbe/Spur (Lane).",
    "kind/type: event = Zeitpunkt, period = Zeitraum."
  ]
};

window.timeline = {
  "items": [
    {
      "id": "tl-0600-vgt-start",
      "type": "event",
      "kind": "milestone",
      "title": "600–520 VGT — Ende der Eiszeit & Aufstieg Montariums",
      "date": "600 VGT",
      "startDate": "600 VGT",
      "start": "600 VGT",
      "end": "520 VGT",
      "entryId": "",
      "note": "Mit dem Rückzug der großen Kältezeit stabilisiert sich das Klima („Sommer“ setzt sich durch). In dieser Phase entsteht das Imperium Montarium als Zusammenschluss der vier großen Provinzen Sylvana, Lathandium, Campari und Montarium. Viele Völker leben unter einer gemeinsamen Herrschaft (Menschen, Halbelfen, Zwerge u. a.).",
      "icon": "",
      "meta": "Startpunkt",
      "scopeId": "world",
      "endDate": "520 VGT"
    },
    {
      "id": "tl-0000-gt-grosse-teilung",
      "type": "event",
      "kind": "milestone",
      "title": "520–480 VGT — Drachenkonflikte & erste Bündnisse mit Menschen",
      "date": "520 VGT",
      "startDate": "520 VGT",
      "start": "520 VGT",
      "end": "480 VGT",
      "entryId": "",
      "note": "Unter den Drachen kommt es zu einem schweren inneren Konflikt: Ein Teil (u. a. die Roten Drachen) befürwortet den Umgang mit den aufstrebenden Menschen, andere lehnen sie grundsätzlich ab. In dieser Zeit werden die ersten tragfähigen Bündnisse zwischen Menschen und Drachenfraktionen geschmiedet.",
      "icon": "",
      "meta": "Epochenwechsel",
      "scopeId": "world",
      "endDate": "480 VGT"
    },
    {
      "id": "tl-2025-07-01-world-placeholder",
      "type": "period",
      "kind": "period",
      "title": "500–320 VGT — Neid auf Yuan-ti-Wissen & Entstehung von Drachenblutlinien",
      "date": "2025-07-01",
      "startDate": "500 VGT",
      "endDate": "320 VGT",
      "start": "500 VGT",
      "end": "320 VGT",
      "entryId": "",
      "note": "Die Menschen Montariums blicken zunehmend neidvoll auf Relikte der Hochkultur der Yuan-ti. Aus Machtgier werden Bündnisse vertieft, und es entstehen erste Drachenblutlinien, die einzelnen Familien außergewöhnliche Kräfte verleihen und die Machtpolitik im Imperium nachhaltig verändern.",
      "icon": "",
      "meta": "Demo-Overlap",
      "scopeId": "world"
    },
    {
      "id": "tl-2025-03-01-session-1",
      "type": "event",
      "title": "ca. 260–240 VGT — Yuan-ti-Bündnisse & Zuspitzung der Spannungen",
      "date": "260 VGT",
      "startDate": "260 VGT",
      "entryId": "",
      "icon": "",
      "meta": "Kap Krako (Start)",
      "kind": "event",
      "start": "260 VGT",
      "end": "240 VGT",
      "scopeId": "world",
      "note": "Die Yuan-ti suchen Verbündete (auch unter Drachen) und versuchen, ihren Untergang abzuwenden. Grenzkonflikte, Sabotage und Stellvertreterkämpfe häufen sich, offene Kriegsfronten zeichnen sich ab.",
      "endDate": "240 VGT"
    },
    {
      "id": "tl-2025-04-12-session-2",
      "type": "event",
      "title": "290–230 VGT — Krieg gegen die Yuan-ti",
      "date": "290 VGT",
      "startDate": "290 VGT",
      "entryId": "",
      "icon": "",
      "meta": "Kap Krako (Kanalisation)",
      "kind": "event",
      "start": "290 VGT",
      "end": "230 VGT",
      "scopeId": "world",
      "note": "Die offenen Kriege eskalieren. Gestützt durch drachische Verbündete erringen die Menschen mehrere entscheidende Siege. Die Yuan-ti-Hochkultur zerbricht; viele ihrer Zentren werden zerstört oder aufgegeben.",
      "endDate": "230 VGT"
    },
    {
      "id": "tl-2025-05-10-session-3",
      "type": "event",
      "title": "ca. 245–235 VGT — Der Staudamm & die Wüste Yucatán",
      "date": "245 VGT",
      "startDate": "245 VGT",
      "entryId": "",
      "icon": "",
      "meta": "Kap Krako (Museum)",
      "kind": "event",
      "start": "245 VGT",
      "end": "235 VGT",
      "scopeId": "world",
      "note": "Der Krieg kulminiert in einem gewaltigen Eingriff in die Landschaft: Ein Staudamm lenkt Flüsse um, ehemals fruchtbarer Dschungel verödet. Zusammen mit verheerender Magie und Feuer wird das Gebiet zur verfluchten Wüste (Yucatán). Unzählige Schriften und Artefakte gehen unwiederbringlich verloren.",
      "endDate": "235 VGT"
    },
    {
      "id": "tl-2025-06-07-session-4",
      "type": "event",
      "title": "180–150 VGT — Verrat an den Drachen & „Schlacht an der Drachenspitze“",
      "date": "180 VGT",
      "startDate": "180 VGT",
      "entryId": "",
      "icon": "",
      "meta": "Kap Krako (Unterstadt)",
      "kind": "event",
      "start": "180 VGT",
      "end": "150 VGT",
      "scopeId": "world",
      "note": "Nach dem Sieg über die Yuan-ti wenden sich viele Menschen gegen ihre einstigen Drachenverbündeten, um volle Unabhängigkeit und weitere Macht zu erzwingen. An der Drachenspitze kommt es zur letzten großen Schlacht dieser Fehde. Danach verschwinden die Drachen für immer.",
      "endDate": "150 VGT"
    },
    {
      "id": "tl-2025-07-20-session-5",
      "type": "event",
      "title": "220–80 VGT — Campari formt Identität & Sprache (Camarith)",
      "date": "220 VGT",
      "startDate": "220 VGT",
      "entryId": "",
      "icon": "",
      "meta": "Kap Krako",
      "kind": "event",
      "start": "220 VGT",
      "end": "80 VGT",
      "scopeId": "world",
      "note": "Innerhalb des Imperiums entwickelt Campari ein starkes Selbstbild. Drachenblutlinien werden heroisiert, eine „Gemeinschaft Gleichgesinnter“ entsteht. Die Sprache der Drachen prägt Dialekte und mündet über Generationen in Camarith als kulturelles Erkennungszeichen.",
      "endDate": "80 VGT"
    },
    {
      "id": "tl-2025-08-02-03-session-6",
      "type": "period",
      "title": "140–110 VGT — Die Geburt der Vampire & die Verdunkelung Sylvanas",
      "date": "2025-08-02",
      "startDate": "140 VGT",
      "endDate": "110 VGT",
      "entryId": "",
      "icon": "",
      "meta": "Kap Krako (Premierenstress)",
      "kind": "period",
      "start": "140 VGT",
      "end": "110 VGT",
      "scopeId": "world",
      "note": "Ein mächtiger Adliger (Graf von Wolfenstein) findet in alten Ruinen von Yucatan verbotenes Wissen und schließt einen Pakt um Unsterblichkeit. Er wird zum ersten Vampir. Sylvana spaltet sich ab. Unheimliche Hexenfeuer legen eine anhaltende Verdunkelung über das Land. Die ersten großen Vampirkonflikte beginnen."
    },
    {
      "id": "tl-2025-09-27-session-7",
      "type": "event",
      "title": "70–50 VGT — Ende des ersten Vampirkriegs",
      "date": "70 VGT",
      "startDate": "70 VGT",
      "entryId": "",
      "icon": "",
      "meta": "Reise Richtung Solengrund",
      "kind": "event",
      "start": "70 VGT",
      "end": "50 VGT",
      "scopeId": "world",
      "note": "Nach Jahren des Blutvergießens wird Sylvanas Unabhängigkeit faktisch anerkannt. Die Region bleibt jedoch ein Quell von Furcht und politischer Unsicherheit.",
      "endDate": "50 VGT"
    },
    {
      "id": "tl-2025-10-11-session-8",
      "type": "event",
      "title": "0 NGT — Die Große Teilung (Zerfall des Imperiums Montarium)",
      "date": "0 NGT",
      "startDate": "0 NGT",
      "entryId": "",
      "icon": "",
      "meta": "Stand: 2025-12-03",
      "kind": "event",
      "start": "0 NGT",
      "end": "",
      "scopeId": "world",
      "note": "Innere Spannungen und die Nachwirkungen der Kriege zerreißen Montarium. Aus den Provinzen werden eigenständige Reiche/Staaten, u. a. Campari, Lathandium, Montai, Yucatán und Sylvana. Mit der Großen Teilung beginnt die neue Zeitrechnung: NGT."
    },
    {
      "id": "tl-2025-11-01-patch-hausregeln",
      "type": "event",
      "title": "60–110 NGT — Zweiter Vampirkrieg & Montais Pyrrhussieg",
      "date": "60 NGT",
      "startDate": "60 NGT",
      "entryId": "",
      "icon": "",
      "meta": "Inspiration & Ruhephasen",
      "kind": "event",
      "start": "60 NGT",
      "end": "110 NGT",
      "scopeId": "world",
      "note": "Sylvana versucht seinen Einfluss auszuweiten; der zweite große Vampirkrieg erschüttert die Nachfolgereiche. Am Ende wird Wolfenstein besiegt und magisch versiegelt. Montai gewinnt zwar entscheidend, ist jedoch ausgeblutet und politisch destabilisiert.",
      "endDate": "110 NGT"
    },
    {
      "id": "tl-2025-11-15-patch-weltupdate",
      "type": "event",
      "title": "ca. 200 NGT — Königsmord in Montai & Beginn des Bürgerkriegs",
      "date": "200 NGT",
      "startDate": "200 NGT",
      "entryId": "",
      "icon": "",
      "meta": "Neue Orte/Phänomene",
      "kind": "event",
      "start": "200 NGT",
      "end": "",
      "scopeId": "world",
      "note": "Adelshäuser rebellieren gegen die Krone (gebrochene Versprechen, Kriegsfolgen, Machtfragen). Der König wird ermordet; Montai versinkt im Bürgerkrieg. In der Zerstörung gehen Archive, Lehrstätten und Artefakte verloren."
    },
    {
      "id": "event-1766256969058",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "270–500 NGT — Montais Bürgerkrieg endet, Republik entsteht",
      "start": "270 NGT",
      "startDate": "270 NGT",
      "date": "270 NGT",
      "end": "500 NGT",
      "endDate": "500 NGT",
      "entryId": "",
      "note": "Der Konflikt zieht sich über Generationen. Fraktionen wechseln, Grenzen verschieben sich, ganze Regionen verarmen. Um 500 NGT beendet ein Friedensvertrag den Krieg: Montai wird zur Republik umgeformt. Stabilität kehrt zurück, aber der Preis ist ein tiefer kultureller Verlust."
    },
    {
      "id": "event-1766257029920",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "ca. 600–650 NGT — Lathandium wird Theokratie",
      "start": "600 NGT",
      "startDate": "600 NGT",
      "date": "600 NGT",
      "end": "650 NGT",
      "endDate": "650 NGT",
      "entryId": "",
      "note": "Ein Bündnis „Macht gegen Versorgung“ zwischen Republik und lathandischer Geistlichkeit stärkt die Priesterschaft. Das Königshaus stürzt, mehrere große Städte erleiden schwere Umbrüche. Lathandium wandelt sich dauerhaft zur Theokratie."
    },
    {
      "id": "event-1766257090078",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "650–1000 NGT — Zensur & Bücherverbrennungen in Lathandium",
      "start": "650 NGT",
      "startDate": "650 NGT",
      "date": "650 NGT",
      "end": "1000 NGT",
      "endDate": "1000 NGT",
      "entryId": "",
      "note": "Die Kirche treibt eine systematische Vernichtung „gefährlichen“ Wissens voran. Chroniken, Magietexte und alte Geschichtswerke verschwinden; große Teile der Welt verlieren den Zugang zu ihrer eigenen Frühgeschichte."
    },
    {
      "id": "event-1766257160693",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "800–1000 NGT — Frieden & Wohlstand (und schleichendes Vergessen)",
      "start": "800 NGT",
      "startDate": "800 NGT",
      "date": "800 NGT",
      "end": "1000 NGT",
      "endDate": "1000 NGT",
      "entryId": "",
      "note": "Handel stabilisiert die Reiche, Grenzen verhärten sich, und viele Schrecken werden zu „Legenden“. Gleichzeitig verblassen Ursachen, Schuld und Zusammenhänge der alten Kriege im kollektiven Gedächtnis."
    },
    {
      "id": "event-1766257226942",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "1000–1200 NGT — Machtambitionen in der Republik Montai",
      "start": "1000 NGT",
      "startDate": "1000 NGT",
      "date": "1000 NGT",
      "end": "1200 NGT",
      "endDate": "1200 NGT",
      "entryId": "",
      "note": "In Montai erstarken neue Adelshäuser und wirtschaftliche Interessengruppen. Politische Intrigen, Einflusskämpfe und verdeckte Expansion prägen die Innenpolitik."
    },
    {
      "id": "event-1766257292810",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "ca. 1200 NGT — Handelsabkommen mit Sylvana",
      "start": "1200 NGT",
      "startDate": "1200 NGT",
      "date": "1200 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Ein Freihandelsabkommen zwischen Montai und Sylvana entsteht (inkl. dunkler, pragmatischer Zugeständnisse). Offiziell bringt es Ruhe und Warenfluss, inoffiziell vertieft es Abhängigkeiten und Tabus."
    },
    {
      "id": "event-1766257331299",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "ca. 1300 NGT — Gescheiterter Putsch in Campari & Abschottung",
      "start": "1300 NGT",
      "startDate": "1300 NGT",
      "date": "1300 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Ein Umsturzversuch scheitert. Die alten Adelsstrukturen in Campari werden massiv gestärkt; Campari zieht sich politisch und wirtschaftlich zunehmend von der Weltbühne zurück und setzt auf Kontrolle, Flotte und Eigenständigkeit."
    },
    {
      "id": "event-1766257404022",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "1400–1700 NGT — Aufbruch in die Neue Welt & Kolonien",
      "start": "1400 NGT",
      "startDate": "1400 NGT",
      "date": "1400 NGT",
      "end": "1700 NGT",
      "endDate": "1700 NGT",
      "entryId": "",
      "note": "Campari perfektioniert den Schiffsbau und startet Expeditionen über das Meer. Kolonien entstehen; neue Häfen, Karten und Handelsrouten werden aufgebaut."
    },
    {
      "id": "event-1766257486666",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "2000 NGT — Die Scheusalsnacht",
      "start": "2000 NGT",
      "startDate": "2000 NGT",
      "date": "2000 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Das Zweite Auge von Nox öffnet sich. Prismora erscheint am Himmel neben Noctyss. Fortan ist Duria von 2 Monden Umgeben. In dieser Nacht brechen Wellen von Monstern in die Welt ein. Parallel intensiviert die Republik ihre Aktivitäten in Yucatán (Suche nach alten Relikten, Ausbau von Einfluss)."
    },
    {
      "id": "event-1766257722054",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "2060 NGT — Gründung der Abenteurergilde",
      "start": "2060 NGT",
      "startDate": "2060 NGT",
      "date": "2060 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Als Antwort auf die neue Bedrohungslage wird eine Abenteurergilde gegründet, um Monsterwellen einzudämmen, Aufträge zu bündeln und verlässliche Kräfte auszubilden/anzuwerben."
    },
    {
      "id": "event-1766257781996",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "world",
      "title": "ab 2100 NGT — Beginn der \"Helden\" Ära",
      "start": "2100 NGT",
      "startDate": "2100 NGT",
      "date": "2100 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Eine neue Generation von Gestalten tritt hervor. Expeditionen, Konflikte in Kolonien und alte Rivalitäten führen zu Ereignissen, die die Weltordnung nachhaltig verändern können."
    },
    {
      "id": "event-1766258056196",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "0–30 NGT — Aufkeimender camparischer Nationalgedanke",
      "start": "0 NGT",
      "startDate": "0 NGT",
      "date": "0 NGT",
      "end": "30 NGT",
      "endDate": "30 NGT",
      "entryId": "",
      "note": "In den Köpfen vieler gedemütigter Krieger in Campari entsteht der Gedanke einer eigenen Nation."
    },
    {
      "id": "event-1766258128266",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "30 NGT — Campari erklärt Unabhängigkeit",
      "start": "30 NGT",
      "startDate": "30 NGT",
      "date": "30 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Auf Drängen der Drachenblut-Adelsfamilien spaltet Regent Lysander Andros Campari ab.\nEs beginnt der Unabhängigkeitskrieg (Dauer: 5 Jahre)."
    },
    {
      "id": "event-1766258168511",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "31 NGT — Fall von Midden",
      "start": "31 NGT",
      "startDate": "31 NGT",
      "date": "31 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Nach einer erfolgreichen Seeschlacht erobert das Imperium die damalige Hauptstadt Midden und brennt sie nieder."
    },
    {
      "id": "event-1766258194296",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "32 NGT — Feldzüge gegen Eisenburg und Sengen",
      "start": "32 NGT",
      "startDate": "32 NGT",
      "date": "32 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "In weiteren Feldzügen erobert das Imperium Eisenburg und Sengen."
    },
    {
      "id": "event-1766258227065",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "32 NGT — Hauptstadtverlegung nach Caldera",
      "start": "32 NGT",
      "startDate": "32 NGT",
      "date": "32 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Regent Lysander Andros verlegt den Regierungssitz nach Caldera und sammelt Truppen."
    },
    {
      "id": "event-1766258261319",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "33–34 NGT — Gegenoffensive Camparis",
      "start": "33 NGT",
      "startDate": "33 NGT",
      "date": "33 NGT",
      "end": "34 NGT",
      "endDate": "34 NGT",
      "entryId": "",
      "note": "In mehreren erfolgreichen Schlachten drängt Campari das Imperium bis hinter Eisenburg zurück."
    },
    {
      "id": "event-1766258342396",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "34 NGT — Lathandium erklärt Unabhängigkeit",
      "start": "34 NGT",
      "startDate": "34 NGT",
      "date": "34 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Lathandium löst sich ebenfalls vom Imperium."
    },
    {
      "id": "event-1766258370251",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "34–35 NGT — Ressourcen erschöpfen sich, Baubeginn der Mauer",
      "start": "34 NGT",
      "startDate": "34 NGT",
      "date": "34 NGT",
      "end": "35 NGT",
      "endDate": "35 NGT",
      "entryId": "",
      "note": "Da Camparis Kräfte schwinden, beginnt der Bau einer Mauer zwischen Montai und Campari (als Grenz- und Schutzmaßnahme)."
    },
    {
      "id": "event-1766258405359",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "35 NGT — Friedens- und Unabhängigkeitsvertrag",
      "start": "35 NGT",
      "startDate": "35 NGT",
      "date": "35 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Das Imperium unterschreibt mit Campari einen Friedens- und Unabhängigkeitsvertrag.\nDer Unabhängigkeitskrieg gilt damit als beendet (30–35 NGT)."
    },
    {
      "id": "event-1766258437822",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "35 NGT — Neuer Name und Titel",
      "start": "35 NGT",
      "startDate": "35 NGT",
      "date": "35 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Der Regent nimmt den Titel Liberatos an und ändert seinen Namen zu: Lysander Liberatos."
    },
    {
      "id": "event-1766258470858",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "36 NGT — Camarith wird Landessprache & Landverteilung",
      "start": "36 NGT",
      "startDate": "36 NGT",
      "date": "36 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Camarith wird zur Landessprache erhoben.\nLysander verteilt Land an verdiente Krieger und Gefolgsleute."
    },
    {
      "id": "event-1766258501241",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "40 NGT — Zersplitterung Camparis",
      "start": "40 NGT",
      "startDate": "40 NGT",
      "date": "40 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Campari ist ein Flickenteppich aus über 300 kleinen Regentschaften."
    },
    {
      "id": "event-1766258535877",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "40–300 NGT — Dynastie Liberatos",
      "start": "40 NGT",
      "startDate": "40 NGT",
      "date": "40 NGT",
      "end": "300 NGT",
      "endDate": "300 NGT",
      "entryId": "",
      "note": "Die Familie Liberatos herrscht über Generationen hinweg bis 300 NGT."
    },
    {
      "id": "event-1766258565390",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "300 NGT — Attentat und Dynastie-Ende",
      "start": "300 NGT",
      "startDate": "300 NGT",
      "date": "300 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Das letzte Mitglied der Familie Liberatos wird in einem Attentat getötet."
    },
    {
      "id": "event-1766258600948",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "ab 300 NGT — Bürgerkrieg der Drachenblütigen",
      "start": "300 NGT",
      "startDate": "300 NGT",
      "date": "300 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Ein Bürgerkrieg bricht aus, weil zahlreiche Drachenblutlinien Anspruch auf den Thron erheben."
    },
    {
      "id": "event-1766258635509",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "700 NGT — „11 Große Familien“",
      "start": "700 NGT",
      "startDate": "700 NGT",
      "date": "700 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Nach rund 400 Jahren Bürgerkrieg haben sich 11 große Familien als dominierende Mächte herausgebildet."
    },
    {
      "id": "event-1766258674090",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "700–750 NGT — Aufstieg der Dovakin",
      "start": "700 NGT",
      "startDate": "700 NGT",
      "date": "700 NGT",
      "end": "750 NGT",
      "endDate": "750 NGT",
      "entryId": "",
      "note": "Unter Malefor Dovakin werden durch Heirat und Taktik 4 Familien unter einer Linie vereint.\nBis 750 NGT werden die übrigen Familien ausgelöscht oder unterwerfen sich, teils unter äußerem Druck einer jungen, aufstrebenden Republik Montai."
    },
    {
      "id": "event-1766258717163",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "760 NGT — Krönung Malefor Dovakins",
      "start": "760 NGT",
      "startDate": "760 NGT",
      "date": "760 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Krönung des absoluten Herrschers:\n„Malefor Dovakin, Erster seines Namens, Erbe des Blutes von Azerak und Himmlischer Drache Camparis“"
    },
    {
      "id": "event-1766258752243",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "ab 760 NGT — Stabilisierung und Öffnung",
      "start": "760 NGT",
      "startDate": "760 NGT",
      "date": "760 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Nach der Krönung folgt Frieden in Campari und der Beginn von Handelsbeziehungen mit der Republik."
    },
    {
      "id": "event-1766258791692",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "760–900 NGT — Infrastrukturaufbau",
      "start": "760 NGT",
      "startDate": "760 NGT",
      "date": "760 NGT",
      "end": "900 NGT",
      "endDate": "900 NGT",
      "entryId": "",
      "note": "Campari beginnt systematisch mit dem Aufbau von Infrastruktur (Straßen, Verwaltung, Häfen/Logistik, etc.)."
    },
    {
      "id": "event-1766258841561",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "ca. 1300 NGT — Gescheiterter Putsch & Isolation Camparis",
      "start": "1300 NGT",
      "startDate": "1300 NGT",
      "date": "1300 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Ein Putsch scheitert (ausgelöst durch Spione aus der Republik).\nRepublikanische Adelsnetzwerke verlieren ihren Einfluss vollständig; Campari isoliert sich."
    },
    {
      "id": "event-1766258885654",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "ca. 1400 NGT — Schwerpunkt Schiffsbau & Überfahrt",
      "start": "1400 NGT",
      "startDate": "1400 NGT",
      "date": "1400 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Durch die Isolation setzt Campari massiv auf Schiffsbau und schafft eine erfolgreiche Überfahrt in die neue Welt."
    },
    {
      "id": "event-1766258928990",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "1400–1700 NGT — Kolonisierung",
      "start": "1400 NGT",
      "startDate": "1400 NGT",
      "date": "1400 NGT",
      "end": "1700 NGT",
      "endDate": "1700 NGT",
      "entryId": "",
      "note": "Campari befriedet und besiedelt Gebiete der neuen Welt."
    },
    {
      "id": "event-1766258996192",
      "type": "event",
      "kind": "",
      "icon": "",
      "scopeId": "campari",
      "title": "ab 2000 NGT — Republik greift nach Yucatán",
      "start": "2000 NGT",
      "startDate": "2000 NGT",
      "date": "2000 NGT",
      "end": "",
      "endDate": "",
      "entryId": "",
      "note": "Aus Angst vor Camparis Stärke und Machtverlust beginnt die Republik mit der systematischen Suche nach alten Artefakten in Yucatán und baut dort ihren Einfluss aus."
    }
  ]
};

window.categoryGroups = [
  {
    "id": "world",
    "name": "Welt",
    "icon": "🌍",
    "categoryIds": [
      "cities",
      "phenomena",
      "history",
      "gods"
    ]
  },
  {
    "id": "people",
    "name": "Leute",
    "icon": "🧑‍🤝‍🧑",
    "categoryIds": [
      "npcs",
      "factions"
    ]
  },
  {
    "id": "adventure",
    "name": "Abenteuer",
    "icon": "🗺️",
    "categoryIds": [
      "quests-success",
      "quests-failed",
      "recaps"
    ]
  },
  {
    "id": "rules",
    "name": "Regeln & System",
    "icon": "📚",
    "categoryIds": [
      "tutorials",
      "patch-notes",
      "hero-powers"
    ]
  },
  {
    "id": "bestiary",
    "name": "Loot",
    "icon": "🎁",
    "categoryIds": [
      "items"
    ]
  }
];

window.categories = [
  {
    "id": "cities",
    "name": "Städte & wichtige Orte",
    "icon": "🌆"
  },
  {
    "id": "npcs",
    "name": "NPCs",
    "icon": "🧙"
  },
  {
    "id": "factions",
    "name": "Fraktionen",
    "icon": "🛡️"
  },
  {
    "id": "phenomena",
    "name": "Phänomene",
    "icon": "✨"
  },
  {
    "id": "history",
    "name": "Historische Ereignisse",
    "icon": "📜"
  },
  {
    "id": "items",
    "name": "Relevante Items",
    "icon": "🎁"
  },
  {
    "id": "tutorials",
    "name": "Tutorials zu Systemen",
    "icon": "📘"
  },
  {
    "id": "patch-notes",
    "name": "Patch Notes",
    "icon": "🛠️"
  },
  {
    "id": "recaps",
    "name": "Recaps",
    "icon": "📖"
  },
  {
    "id": "hero-powers",
    "name": "Zauber & Fähigkeiten der Helden (Homebrew)",
    "icon": "🔥"
  },
  {
    "id": "quests-success",
    "name": "Erfolgreiche Quests",
    "icon": "🏆"
  },
  {
    "id": "quests-failed",
    "name": "Gescheiterte Quests",
    "icon": "💀"
  },
  {
    "id": "gods",
    "name": "Götter",
    "icon": "🌞🌚"
  }
];

window.bestiary = {
  "meta": {
    "title": "Bestiarium",
    "subtitle": "Bekannte Monster"
  },
  "chapters": [],
  "monsters": [
    {
      "id": "monster-schattenwolf",
      "title": "Riesiger Schattenwolf (Beispiel wird noch ersetzt)",
      "tags": [
        "Wald",
        "Gefährlich",
        "Bossgegner"
      ],
      "summary": "Ein monströser Wolf, der sich im Schatten aufzulösen scheint.",
      "body": "Dieser Wolf ist deutlich größer als ein normales Tier und wirkt eher wie\nein lebendiger Schatten.\n\nMögliche Werte (je nach System):\n- Hohe Beweglichkeit und Tarnung im Dunkeln.\n- Angriff: Schattenbiss, der Lebensenergie entzieht.\n- Fähigkeit: Kurzzeitiges Unsichtbarwerden im Schatten.",
      "lastUpdated": "2025-12-01",
      "images": [],
      "harvest": [],
      "chapterId": "",
      "chapterName": ""
    },
    {
      "id": "monster-sumpfhydra",
      "title": "Sumpfhydra (Beispiel wird noch ersetzt)",
      "tags": [
        "Sumpf",
        "Mehrköpfig",
        "Sehr gefährlich"
      ],
      "summary": "Mehrköpfiges Monster, das in tiefen Sümpfen lauert.",
      "body": "Die Sumpfhydra ist ein massiges, schlangenartiges Wesen mit mehreren Köpfen,\ndas in trüben Gewässern lauert.\n\nEigenschaften:\n- Mehrere Angriffe pro Runde.\n- Köpfekönnen nachwachsen, wenn sie nicht verbrannt werden.",
      "lastUpdated": "2025-12-01",
      "images": [],
      "harvest": [],
      "chapterId": "",
      "chapterName": ""
    }
  ]
};

window.entries = [
  {
    "id": "faction-gezeitenwaechter",
    "categoryId": "factions",
    "title": "Gezeitenwächter (Stadtwache von Narvik)",
    "tags": [],
    "summary": "",
    "body": "Die Stadtwache von Kap Krako ist offiziell für Ordnung in den Straßen\nzuständig.",
    "lastUpdated": "2025-12-01",
    "region": "Narvik",
    "session": "",
    "status": "",
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ],
    "visible": true,
    "isNew": true,
    "images": [
      "images/Wappen Herzogtum Narvik.png"
    ]
  },
  {
    "id": "npc-bartholomeo-drago",
    "categoryId": "npcs",
    "title": "Herzog Bartholomeo Drago der Leviathan von Narvik",
    "tags": [
      "Herzog"
    ],
    "summary": "Herzog von Narvik",
    "body": "Herzog Bartholomeo Drago, der Leviathan von Narvik, ist ein gut gebauter, muskulöser Mann Anfang 30 mit blondem Haar, grünen Augen und einer markanten Gesichts­narbe. Hinter seinem stets müden Gesichtsausdruck liegt eine unerschütterliche, selbstsichere Aura, die durch seine schwere Rüstung nur noch unterstrichen wird. Als Herzog von Kap Krako herrscht er mit ruhiger, beinahe träge wirkender Gelassenheit – besonders in Gesprächen, in denen seine langsame, bedächtige Art oft fälschlich für Desinteresse gehalten wird.",
    "session": "",
    "status": "unklar",
    "lastUpdated": "2025-12-01",
    "cityId": "city-marktfleck-thal",
    "region": "Narvik",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ],
    "visible": true,
    "isNew": true
  },
  {
    "id": "tutorial-inspiration",
    "categoryId": "tutorials",
    "title": "Liste mit Spielbaren Rassen & Klassen",
    "tags": [
      "Tutorials"
    ],
    "summary": "",
    "body": "Rassen:\n\nOhne Einschränkungen:\n>- Drachengeborener\n>- Zwerg(_Hügel_)\n>- Zwerg(_Berg_)\n>- Elf(_Hochelf_)\n>- Elf(_Waldelf_)\n>- Gnom(_Wald_)\n>- Gnom(_Fels_)\n>- Halbelf(_Hochelf_)\n>- Halbelf(_Waldelf_)\n>- Halbling(_Leichtfuß_)\n>- Halbling(_Stämmig_)\n>- Mensch\n>- Mensch(Variante)\n>- Kalashtar -->kurze Absprache mit DM´s\n\nStarke Diskriminierung bis sofortiger Angriff:\n>- Bugbear\n>- Goblin\n>- Goliath\n>- Hobgoblin\n>- Kenku\n>- Kobold\n>- Echsenvolk\n>- Ork\n>- Tabaxi\n>- Halbork\n>- Verdan\n>- Wandler(_Bestienhaut_)\n>- Wandler(_Langzahn_)\n>- Wandler(_Schnellschritt_)\n>- Wandler(_Wilde Jagd_)\n\nKlassen:\n\n1. Barbar\n> - Pfad des Berserkers\n> - Pfad des Totemkriegers\n> - Pfad des Ahnenwächters\n> - Pfad des Sturmherolds\n> - Pfad des Zeloten\n> - Pfad des Schlachtenwüters\n> - Pfad der Bestie \n\n2. Barde\n> - Schule der Eloquenz\n> - Schule des Flüsterns\n> - Schule der Schöpfung\n> - Schule der Schwerter\n> - Schule des Wagemutes\n> - Schule des Wissens\n> - Schule des Zauberbanns\n\n3. Kleriker\n> - Domäne des Wissens\n> - Domäne des Lebens\n> - Domäne des Lichts\n> - Domäne der Natur\n> - Domäne der Täuschung\n> - Domäne des Krieges\n> - Domäne des Todes\n> - Domäne des Grabes\n> - Domäne der Schmiede\n> - Domäne der Ordnung\n> - Domäne des Friedens\n> - Domäne der Dämmerung\n\n4. Druide\n> - Zirkel des Landes\n> - Zirkel des Mondes\n> - Zirkel des Hirten\n> - Zirkel des Wildfeuers\n> - Zirkel der Sporen\n> - Zirkel der Sterne\n\n5. Kämpfer\n>- Kampfmeister\n>- Champion\n>- Mystischer Ritter (Eldritch Knight)\n>- Arkaner Bogenschütze\n>- Kavalier\n>- Runenritter\n>- Psi-Krieger\n\n6. Mönch\n>- Weg der offenen Hand\n>- Weg des Schattens\n>- Weg der Sonnenseele\n>- Weg der vier Elemente\n>- Weg des Kensei\n>- Weg des langen Todes\n>- Weg des Betrunkenen Meisters\n>- Weg des Astralen Selbst\n>- Weg der Barmherzigkeit\n\n7. Paladin\n>- Schwur der Hingabe\n>- Schwur der Alten\n>- Schwur der Rache\n>- Schwur der Krone\n>- Schwur der Eroberung\n>- Schwur der Läuterung\n>- Schwur des Ruhms\n>- Eidbrecher\n\n8. Waldläufer\n>- Herr der Tiere\n>- Jäger\n>- Monsterjäger\n>- Düsterpirscher\n>- Hüter des Schwarms\n\n9. Schurke\n>- Assassine\n>- Dieb\n>- Arkaner Betrüger\n>- Ermittler\n>- Späher\n>- Draufgänger\n>- Phantom\n>- Seelenmesser\n>- Strippenzieher\n\n10. Zauberer\n>- Drachenblutlinie\n>- Wilde Magie\n>- Schattenmagie\n>- Sturmzauberei\n>- Göttliche Seele\n>- Ungewöhnlicher Verstand\n\n11. Hexenmeister --> nur in Absprache mit DM´s --> nur wenn ganz sicher --> kein zurück mehr wenn ihr das spielen wollt\n>- Abgründiger\n>- Dschinn\n>- Die Erzfee\n>- Die Fluchklinge\n>- Der Große Alte\n>- Der Unhold\n>- Der Unsterbliche\n\n12. Magier\n>- Schule der Beschwörung\n>- Schule der Erkenntnismagie\n>- Schule der Hervorrufung\n>- Schule der Illusion\n>- Schule der Kriegsmagie\n>- Schule der Nekromantie\n>- Schule der Schreiber\n>- Schule der Verwandlung\n>- Schule der Verzauberung\n\n13.  Artifizient\n>- Alchemist\n>- Artillerist --> leicht eingeschränkt in Absprache mit DM´s\n>- Kampfschmied --> leicht eingeschränkt in Absprache mit DM´s\n>- Rüstungsschmied",
    "lastUpdated": "2025-12-01",
    "region": "",
    "session": "",
    "status": "",
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "visible": true,
    "isNew": true
  },
  {
    "id": "tutorial-ruhephasen",
    "categoryId": "tutorials",
    "title": "Rastsystem",
    "tags": [
      "Tutorials"
    ],
    "summary": "",
    "body": "Kurze Rast 6h --> Mini Rast mit Debuff Möglich\n\nLange Rast 12H \n\nTageszyklus Morgens 3.00-9.00 , Mittags 9.00-15.00 , Abends 15.00-21.00, Nacht 21.00- 3.00",
    "lastUpdated": "2025-12-01",
    "region": "",
    "session": "",
    "status": "",
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "visible": true,
    "isNew": true
  },
  {
    "id": "recap-sitzung-1",
    "categoryId": "recaps",
    "title": "Recap - 1. Sitzung vom 01.03.2025",
    "tags": [
      "Kap Krako",
      "Start"
    ],
    "summary": "",
    "body": "Willkommen meine lieben Freunde zur Zusammenfassung der Letzen Geschehnisse natürlich mit mir, den strahlenden Stern jeder Geschichte: Lucius Magnus. Bereit? Dann los:\n\nIch präsentiere euch mein Meisterwerk: \"Vier Narren, ein Wrack und ein Werhai\" \n(Arbeitstitel. Ich bin offen für Vorschläge.)\n\nAlso, stellt euch vor: Ich sitze gemütlich in meiner Dimension, nippe an einem Glas flüssiger Erkenntnis – da stolpern plötzlich vier Fremde auf dem Marktplatz von Kap Krako zusammen. Zufall? Nein, Schicksal mit einem ganz schlechten Orientierungssinn.\n\nEiner von ihnen: Rittersporn, Barde, Träger des Herzens vieler Frauen – und Vaterschaftsklagen. Der Gute hatte einen Auftrag im Gepäck. Nicht seiner, sondern vom Grafen von Krako. Jobbeschreibung: „Bergt eine versiegelte Kiste mit dem Siegel der Imperialen Handelsgesellschaft aus dem Wrack der Sturmkrähe, dem letzten Schiff aus den Kolonien.“ Einfach, oder?\n\nGruppe gebildet, Hände geschüttelt, Gulasch gegessen im Gasthaus „Abendrot“, dann ging’s los.\n\nNach ein paar Tagen Wanderidylle und Blasen an den Füßen: Wrack gefunden. Doch anstatt gemütlich zu plündern, springt ihnen ein Werhai ins Gesicht. Halb Hai, halb Mensch, ganz schlechte Laune. Nach einem epischen Kampf – Spoiler: der Hai verlor – fanden unsere Helden Hinweise auf ein Banditenlager, das das Wrack schon geplündert hatte.\n\nNebenbei entdeckten sie ein altes Segel mit einem mysteriösen Symbol, das bei jedem von ihnen merkwürdige Erinnerungen auslöste. Subtil wie eine Axt im Gesicht.\n\nAlso: Auf zu den Banditen. Und wie? Heimlich? Im Schutze der Dunkelheit? Nope. Die Vier wählten: Frontalangriff. Am helllichten Tag. Mutig? Ja. Klug? Debattierbar.\n\nEs wurde blutig, es wurde wild, und unser Barde Rittersporn mutierte zum menschlichen Schildwall. Bolzen, Schwert und ein bisschen Lebensmüdigkeit – und zack, Sieg für die Helden.\n\nIm Lager: Versiegelte Kiste gefunden. UND – Tusch bitte – MEIN Ring! Ja, ich, Lucius Magnus, eingebettet in ein Schmuckstück feinster magischer Machart, wartete nur darauf, wieder Teil dieser Welt zu sein. Ihr Glück.\n\nZurück nach Kap Krako, Kiste abgegeben, Belohnung und folge Auftrag vom Grafen kassiert. Doch anstatt sich auf den Lorbeeren auszuruhen (oder auf Rittersporns Fanpost), gab’s direkt das nächste Level: Audienz beim Herzog Bartholomeo Drago, besser bekannt als \"Der Leviathan von Narvik\" – düsterer Titel, aber ein Fan von Effizienz.\n\nDer Herzog öffnet die Kiste – und BOOM: Rotes Erz. Selten, mächtig, und definitiv kein Küchengewürz. Die Helden kriegen einen Geheimauftrag: Findet heraus, wer sonst in den anderen Herzogtümern davon weiß – leise, unauffällig, diskret. Also... das Gegenteil ihres Banditenangriffs.\n\nAls Bonus: Waffenerwerbserlaubnis für ganz Campari (endlich legal schwer bewaffnet!) und ein Bankkonto bei Horizontia Finanz – mit besserem Kundenservice als bei den Göttern.\n\nUnd wie endet dieses Kapitel?  \nMit Bier, Geschichten und einem neuen Ring (mich!) am Stammtisch im Gasthaus. Die Welt kann sich warm anziehen.",
    "session": "Sitzung 1",
    "lastUpdated": "2025-12-01",
    "relatedIds": [],
    "region": "",
    "status": "",
    "cityId": "",
    "factionId": "",
    "visible": true,
    "isNew": true
  },
  {
    "id": "recap-sitzung-2",
    "categoryId": "recaps",
    "title": "Recap - 2. Sitzung vom 12.04.2025",
    "tags": [],
    "summary": "",
    "body": "\"Ratten, Religion und rostige Romantik\" – Kapitel II der Vetra Skupina_-Saga  \n(Ein weiteres Meisterwerk, vorgetragen von Lucius Magnus, dem Pompösesten aller Beobachter)\n\nAlso… unsere Helden. Zurück in Kap Krako. Wieder im Gasthaus \"Abendrot\". Gute Betten, mäßiger Service, und eine Decke, die aussieht wie Goblinhaut auf Zimmertemperatur.\n\nAnastasia, mysteriös und katzenhaft wie immer, entschied sich gegen das Bett – und für den Kleiderschrank als Schlafplatz. Komfort ist relativ, Stil ist ewig.\n\nRittersporn versuchte derweil sein Glück beim lokalen Nachwuchsadel. Leider war sein Charme diesmal etwa so wirksam wie ein Eimer Wasser gegen einen Hausbrand. Ergebnis: Einzelzimmer. Allein. Mit Laute. Und Selbstmitleid.\n\nAm nächsten Morgen: Aufbruch! Zurück ins Herrenhaus des Grafen von Krako, denn da gab’s was zu holen. Nein, nicht Silberbesteck. Einen neuen Auftrag.\n\nDort trafen sie Fimbur, einen grummeligen Zwerg und Leviten von Solis, direkt vom Tempel eingeflogen, um die Quelle einer chaotischen Energie aufzuspüren, die irgendwo unter der Stadt blubbert. Klingt unangenehm – war’s auch.\n\nDer Graf, großzügig wie eh und je, gab den Auftrag: „Helft Fimbur. Findet die Quelle. Macht das Chaos weg.“  \nEinziger Hinweis: Fischerfamilie Hering. Der Vater, Harald, soll eins der Monster gesehen haben. \n\nVor Ort treffen sie erstmal auf die restliche Familie – Frau Hering, Sohnemann, und Töchterchen. Sie helfen brav im Haushalt. Und was macht Dion, der Schurke mit Stil? Entdeckt in der Küche das Objekt seiner Träume: ein rostiges Küchenmesser. Seine Augen glitzerten. Meine Güte. Ich war eifersüchtig.\n\nWährend Dion das Messer mental adoptierte und Rittersporn der Hausherrin charmant beim Gemüseputzen assistierte, lieferten sich Fimbur und Gottfried ein theologisches „Wer hat den geileren Gott“-Battle vor den Kindern.  \nSolis gegen Nox.  \nLicht gegen Schatten.  \nKerzenlicht gegen dramatische Umrandung.  \nUnentschieden. Aber sehr unterhaltsam.\n\nDann: Harald kommt nach Hause, bringt Infos – die Spur führt zur Kanalisation. Wo auch sonst?\n\nAlso rein da. Einer nach dem anderen. Dion vorneweg.  \nAlles läuft leise… bis Dion mal wieder gegen den Würfelgott verliert. Eine natürliche 1.  \nUnd ZACK: Kanalratten-Party.  \nRiesig. Aggressiv. Zahlreich.  \nDie Helden? Nach dem Kampf Müde.  \nDie Entscheidung?  \n„Taktischer Rückzug.“ (Auch bekannt als: panisches Davonrennen zurück zu den Fischern.)\n\nNach einer Mütze Schlaf und einem „Das schaffen wir diesmal, oder?“ ging’s wieder runter.  \nUnd diesmal: Volles Programm. Rattenschwärme, dunkle Gänge, muffige Stimmung.\n\nAm Ende der Kanalisation: **Ein Nest. Eine monströse Rattenbrutmutter.  \nGroß, schleimig, und wahrscheinlich nicht besonders gut im Smalltalk.\n\n\"Das ist sie. Die Quelle.\" – meinten alle.  \nDion, voller Heldenmut (oder Rest-Schädeltrauma), versucht einen Überraschungsangriff.\n\nPlot Twist: Es wird ein Überraschungs-Fail.  \nSein Bolzen fliegt ins Nichts, die Brutmutter blinzelt nicht mal – aber ALLE RATTEN DREHEN DURCH.  \nWillkommen zur schlimmsten Version von „Alle gegen Einen“.\n\nDer Kampf war… nennen wir es existentiell.  \nManche Helden überlegten ernsthaft, ob der Tod vielleicht einfach eine Pause mit besserem Soundtrack ist.\n\nAber am Ende? Dion, wieder klar im Kopf (und mit dem richtigen Ende vom Dolch voraus), sticht direkt ins Herz der Brutmutter. Treffer. Versenkt.\n\nWas blieb?  \nEin riesiger, vermutlich magischer Zahn, aus dem Naturmagie waberte.  \nFimbur, Experte für alles was leuchtet, bestätigt: „Chaosenergie weg.“  \nDanke für nichts, Brutmutter.\n\nZurück zu den Fischern, ausruhen, dann Marsch zum Grafen.\n\nUnd was macht der?  \nEr zahlt. Und zwar gut. Silber plus Bonus – vielleicht weil die Stadt noch steht.\n\nDann fragt er: „Wie heißt eure Gruppe eigentlich?“  \nKurze Stille.  \nAntwort im Chor: Vetra Skupina.\n\nEr nickte. Noch ahnte er nicht…  \n...welche Legende gerade ihren Anfang nahm.",
    "session": "Sitzung 2",
    "lastUpdated": "2025-12-01",
    "relatedIds": [],
    "region": "",
    "status": "",
    "cityId": "",
    "factionId": "",
    "visible": true,
    "isNew": true
  },
  {
    "id": "hero-power-flammenkette",
    "categoryId": "hero-powers",
    "title": "Flammenkette",
    "tags": [
      "Zauber",
      "Schaden",
      "Feuer"
    ],
    "summary": "Feuerzauber, der von einem Ziel zum nächsten springt.",
    "body": "Wirkungsvorschlag:\n- Wähle ein Ziel in Reichweite, wirke Feuerschaden.\n- Der Zauber springt bis zu zweimal auf nahe Ziele über (mit reduziertem Schaden).\n- Gut geeignet gegen eng stehende Gegnergruppen.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "hero-power-schattentritt",
    "categoryId": "hero-powers",
    "title": "Schattentritt",
    "tags": [
      "Bewegung",
      "Teleportation"
    ],
    "summary": "Kurze Teleportation zwischen zwei Schatten.",
    "body": "Wirkungsvorschlag:\n- Der Held kann sich zwischen zwei Schatten in kurzer Distanz bewegen.\n- Zählt als Bonusaktion, solange beide Schatten sichtbar sind.\n- Ermöglicht kreative Positionswechsel im Kampf.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "map-campari-region",
    "categoryId": "cities",
    "title": "Karte der Region Campari",
    "tags": [
      "Karte",
      "Campari",
      "Übersicht"
    ],
    "region": "Campari",
    "summary": "Übersichtskarte der Region Campari mit wichtigen Orten und Städten.",
    "body": "Diese Karte zeigt die bekannte Region Campari mit ihren wichtigsten Orten,\nStädten und Landmarken: von Goobing über Festung Glutfels bis hin zur Helios\nZitadelle. Sie eignet sich hervorragend, um Spieler*innen einen Überblick über\ndie aktuelle Kampagnenregion zu geben oder Reisewege zu planen.",
    "lastUpdated": "2025-12-01",
    "images": [
      "images/Campari Regional.jpg"
    ],
    "session": "",
    "status": "",
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "visible": true,
    "isNew": true
  },
  {
    "id": "entry-1764786861255",
    "categoryId": "recaps",
    "title": "Recap - 3. Sitzung vom 10.05.2025 \"Götter, Gnome und Gedärme“ – Kapitel III der Vetra Skupina-Saga",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Im Namen des Chaos“ – Eine dramatisch übertriebene Rückschau,  \nerzählt von Lucius Magnus, Magier von Welt, Beobachter des Wahnsinns, und einziger lebender Beweis dafür, dass Intelligenz sexy sein kann.\n\n\nAh, die Gruppe.  \nDiese bunte Mischung aus halbkompetenten Helden, moralisch flexiblen Persönlichkeiten und einem kotzenden Gnom stolperte erneut durch die Realität wie ein betrunkener Jongleur durch einen Porzellanladen.\n\nUnser glorreiches Epos begann im feinen Anwesen des Grafen von Krako, der die Gruppe mit diplomatischem Fingerschnippen verabschiedete – vermutlich in der Hoffnung, sie nie wiedersehen zu müssen.\n\nKaum hatten sie den Adelspalast verlassen, fiel ihnen auf: Fimbur, unser liebenswerter Kleriker mit Licht-Affinität und dem Gedächtnis eines Toastbrots, fehlte. Der stand draußen und diskutierte mit einer Wache, ob Solis beim Segnen lieber Kräutertee oder Weihrauch verwendet. Wichtig. Lebensentscheidend. Also alles wie immer: Wenn man ihn braucht, diskutiert er über Solis. Wenn man ihn nicht braucht, auch.\n\nDann: Gruppentrennung!  \nFimbur, begleitet von der fesselnd frostigen Anastasia und dem schmierigen Charmebolzen Rittersporn, führte die beiden zum Solis-Tempel, wo er residierte – vermutlich in der Hoffnung, sie zum strahlenden Glauben zu bekehren oder wenigstens mit Weihwasser zu beeindrucken.  \nDion und Gottfried zogen derweil ins Gasthaus „Zum Abendrot“, um sich dort dem zu widmen, was sie am besten können: Leute belauschen, Alkohol konsumieren und Entscheidungen treffen, die man später bereut.\n\nIm Tempel angekommen, bestand Fimbur darauf, dass man den Konsul Reinlich kennenlernen müsse – so wie man beim ersten Date ungefragt seine Eltern vorstellt. Anastasia spielte mit, Rittersporn hingegen nutzte die Gelegenheit, sich aus dem Staub zu machen und... tja... im Tempel herumzuschnüffeln.\n\nEr kam bis in die Schlafräume der Leviten, prüfte systematisch alle Türen (alle verschlossen, bis auf eine – ein Wunder!) und legte sich meditierend auf ein fremdes Bett. Was für Rittersporn Meditation ist, wäre für andere Hausfriedensbruch.\n\nWährenddessen kam’s zum Debakel der Erkenntnis:  \nFimbur hatte sein heiliges Grimoirium nicht bei sich.  \n_Empörung! Skandal! Ketzerei!_\n\nAlso: Rückmarsch ins Zimmer. Was fanden sie dort? Das Licht Solis? Nein.  \nRittersporn. Auf dem Bett. Im Lotus-Sitz.  \nAnastasia, enttäuscht vom ausgeblieben Abendessen oder einfach müde von der ganzen Göttlichkeit, setzte sich demonstrativ breitbeinig dazu. Doppelmeditation. Auf Fimburs Bett.  \nFimbur, empört wie ein Priester auf einem Heavy-Metal-Konzert, ruft Solis um Hilfe.\n\n\"Strahlen des Sonnenaufgangs!\" – BÄM!  \nLichtblitz, fliegende Elfen, umkippender Nachttisch, und – Überraschung! – das vermisste Buch fällt raus.  \nFimbur: glücklich.  \nRittersporn: schneller.  \n\nFimbur griff es... nur damit sich gleich eine spirituell untermauerte Kneipenschlägerei entwickelte, bei der Rittersporn das Buch erneut klaute, diesmal eleganter als ein Straßenmagier mit Alkoholproblem.\n\nNach gegenseitigen Machtdemonstrationen (manche sagen: magische Schwanzvergleiche) und einem schiefen Waffenstillstand, beschlossen alle, endlich zu schlafen. \n\nAm nächsten Morgen: Frühstück!  \nAnastasia, tief getroffen vom ausgefallenen Abendessen, holt sich demonstrativ zwei Teller Suppe. Alle gucken. Keiner traut sich, was zu sagen.\n\nFimbur bemerkt: Buch? Schon wieder weg.  \nUnd erlebt einen nervlichen Zusammenbruch, wie ihn sonst nur Theaterdiven bei Applausmangel haben.\n\n---\n\nWährenddessen im Gasthaus „Zum Abendrot“\n\nDort trafen Gottfried und Dion auf den einzig wahren Gaunter o’ Dime , auch bekannt als Günther: Barbar. Gnom & Potenzieller Mitstreiter mit dem Durst eines Ogers, der nach einem einzigen Bier bewusstlos vom Stuhl fiel. Legendär. Kurz, aber legendär.\n\nSie buchten ihm liebevoll ein Zimmer – genauer gesagt: einen Kleiderschrank in Gottfrieds Raum. Soviel zur Fürsorge. \n\nDion feilschte sich in eine Abstellkammer ein, weil Rabatt schlägt Komfort, und fand dort ein Guckloch direkt zum Badehaus.  \n\nNatürlich...  \n\nNach kurzer Rücksprache mit mir (_Hallo!_) wird das Loch ausgebaut und ein Hahn-Alarm installiert. Drei Krähen, wenn jemand reingeht. Subtil wie ein Presslufthammer & etwas von Datenschutz? Nie gehört.\n\nIm Laufe der Nacht wahrscheinlich überfordert von dem einem Bier kotzte Günther dann in seinen Schrank. Charmant.  \nAm nächsten Morgen. Der Hahn krähte. Dreimal.   \nDion blickte durch das Loch und sah... Haare. Zu Viele.  \nEr schloss das Guckloch wieder – aus Selbstschutz.  \nPsychologischer Schaden: +1W6.\n\nGünther, durch das Geräusch geweckt, brüllte per Thaumaturgie den Hahn zu Tode, weckte das halbe Gasthaus und zerstörte im folgenden Barbarenrausch auch gleich seinen Schrank gleich mit. Alles ein völlig normaler Donnerstag.\n\nNach Reparatur, Frühstück und viel betretenem Schweigen treffen sich beide Gruppen vorm Gasthaus.\n\n\nWieder vereint, ging es zu Stefanie, der nettesten Gemischtwarenhändlerin seit es überteuerte Heiltränke gibt. Dort kaufte man Vorräte, übergab einen Brief von Klaus– und folgte dann einem Gerücht aus dem Gasthaus:\n\nDas Museum sucht jemanden, der Imperianisch lesen kann.\n\nDie ganze Gruppe fühlte sich überraschenderweise kompetent. \nWas entweder Selbstbewusstsein oder kollektiver Realitätsverlust war.\n\nIm Museum angekommen, stürmte Günther wie ein Kind mit ADHS auf Zuckerschock die Treppe hoch, ließ ein magisches Mini-Erdbeben los – und wurde von Museumsführer Armin persönlich auf die Straße geschleudert wie ein Gnom beim Hammerwurf.  \nDie Gruppe reagierte angemessen:  \n\"Günther? Wer ist Günther?\"\n\nWährend alle warten:  \nRittersporn musiziert,  \nDion beklaut Leute,  \nGottfried redet über Sklavenhandel wie übers Wetter.  \nIch betone nochmal: Ganz normaler Donnerstag in Campari.\n\nEs folgt eine Lektion in: „Wie viele Genies braucht man, um eine Uhr zu lesen?“\n\nSzene: Das Museum von Kap Krako.  \nTeilnehmer:  Vetra Skupina.  \nAusgeschlossene: Günther, der Gnom – seelenruhig schnarchend vor der Tür.\n\nEmpfangen werden unsere Helden von Annerose von Ahrenholtz, Museumsbesitzerin mit Stil und einer offensichtlichen Schwäche für verschlossene Bücher.  \nSie übergibt ihnen ein uraltes, Imperianisch Werk – zu kryptisch für Sterbliche, aber nicht für meinen Ring.  \nGottfried? Sagt, er hat’s gelesen.  \nIch? Sag, ich hab’s ermöglicht.\n\n---\n\nUnd dann: Die Rätselrallye\n\n1. Drachenstatue – ein Auge war falsch. Gottfried kletterte hoch, holte es raus. Held des Tages.\n    \n2. Wanduhr-Raum – Hinweise? Rätseltexte?  \n    Pff. Lieber erst mal einen Steinboden aufmeißeln. \n    Spoiler: Der Boden war nicht das Rätsel.\n    Am Ende – nach gefühlt drei Tagen Ingame-Diskussion oder zwei Realstunden Spielleitungskrampf und einem archäologischen Desaster später entdeckten sie, dass man   \n    einfach die Uhr auf 12 drehen musste.  \n    Eureka. Und Peinlich.\n    Bämm – Schatulle erscheint. \n    Darin: Eine kleine Pyramide und seltsame Einmündungen.  \n    Einstecken. Kombinieren. Klicken.  \n    ZACK – eine Notiz.\n    \n3. Mosaikraum – versteckter Schalter, Wendeltreppe, geheimer Raum.  \n   Dort befindet sich ein Runenwürfel. Ein neues Rätsel.  \n   Während der Würfel noch dechiffriert wird, liefern sich Dion und Fimbur einen epischen Staring Contest, der nur durch gelegentliches Blinzeln und gekränkte Egos \n   unterbrochen wird.\n    \n\nDie Lösung führt unsere Genies zum Horizontia-Finanzhaus, wo ein versteckter Safe wartet.  \nDarin?  \nEine echte Drachenschuppe.  \nRar. Mächtig. Beeindruckend.  \nDoch kaum entdeckt, schon wieder verloren – Annerose nimmt sie als Ausstellungsstück an sich.\n\nDie Gruppe?  \nZähneknirschend zustimmend.  \nHeldentum hat eben keinen Belegschaftsrabatt.\n\nAls Belohnung: **Information – und ein Goldstück. EIN. EINZIGES. GOLDSTÜCK.  \nNatürlich endete das in einem Mexican Standoff mit gezückten Zaubern und echtem Testosteron. \n\nJeder will sie. Keiner rückt ab.  \nDie Luft: dick wie Rittersporns Parfüm.  \nDer Frieden: zerbrechlicher als Fimburs Geduld.  \nDoch am Ende – man glaubt es kaum –  \nwird sie geteilt. \nFast gerecht.  \nFast... und ich Lucius Magnus habe mir das alles natürlich bei einem schönen Glas flüssiger Einsicht angesehen. Hmmm ein Spätburgunder. Naja.\n\nAlso Die Sonne sinkt.  \nDas Museum verstummt.  \nUnd die Vetra Skupina geht ihrer Wege –  \nreiche Erfahrungen, leere Taschen, und das beruhigende Wissen, dass beim nächsten Rätsel garantiert alles noch chaotischer wird.",
    "session": "Sitzung 3",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1764787636513",
    "categoryId": "recaps",
    "title": "Recap - 4. Sitzung vom 07.06.2025 Chronica Heroica – Kapitel IV: Schleifen, Schatten & Stripp-Sira",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "Seid willkommen, ihr Freunde des gepflegten Chaos und unkoordinierter Heldenhaftigkeit. Ich, Lucius Magnus, unfehlbarer Chronist, brillanter Geist und tragischer Zeuge dieses Abenteuers, entführe euch erneut in eine Welt, in der die Logik Urlaub hat – und das Gewissen gelegentlich betrunken in der Ecke liegt.\n\nUnsere Geschichte beginnt – stilvoll wie immer – auf den Treppen des Geschichtsmuseums, wo unsere tapfere Gruppe gerade eine heldenhafte Rätselrally hinter sich gebracht hatte. Ein triumphaler Moment… wäre da nicht Günther gewesen. Unser wandelndes Muskelpaket schlief friedlich, leise schnarchend – verziert mit rosa Schleifen und einer feinen Spur Glitzer, wie ein Geschenkpaket für Leute mit sehr speziellem Geschmack. Woher? Niemand weiß es. Günther am aller wenigsten. Seine Antwort auf die Frage war ein Schulterzucken, das mehr Fragen aufwarf, als es beantwortete.\n\nStatt sich nun gepflegt im Gasthaus der Oberstadt zu entspannen – wo die Tische sauber und die Gäste weitgehend unbewaffnet sind – entschied sich unsere Gruppe für einen Ortswechsel: ab in die Unterstadt, wo der Wein dünner und die Moral noch dünner ist.\n\nAuf dem Weg dorthin tat Dion, seines Zeichens Schurke mit flexiblem Moralkompass, was er am besten kann: Er erleichterte ein streitendes Pärchen um ein paar Kupferstücke. Es war elegant, fast zärtlich. Hätten sie es bemerkt, sie hätten sich bedankt.\n\nIn der Taverne angekommen, machte Gottfried seinem Namen alle Ehre – mit einem unbeholfenen Flirtversuch bei Erika, der Bedienung. Sie reagierte… freundlich-abweisend. Gottfried nannte es Hoffnung. Ich nannte es Reizüberflutung.\nWährenddessen hatte Rittersporn – poetischer Störenfried, wandelnder Skandal in Samt – die brillante Idee, sich per Magie als Erika zu verkleiden, um sich in die Küche zu schleichen.\nPlan: Gelingt.\nTarnung: Perfekt.\nTiming: Katastrophal.\nDenn als er an Stefan, dem Wirt, vorbeischlüpfen wollte – tauchte die echte Erika auf. Zwei Erikas. Ein Wirt. Und ein Gesichtsausdruck, der sagte: „Ich kündige.“\nNach einem kurzen, sehr unangenehmen Gespräch löste Rittersporn die Illusion auf und flüchtete an den Tisch zurück – Plan gescheitert. Aber keine Sorge, ein neuer lag schon parat: Dion sollte Stefan ablenken.\nGesagt, getan. Während Stefan abgelenkt war, stahl Rittersporn zwei Küchenmesser, als wären sie ein wertvoller Schatz – und kehrte triumphierend zum Tisch zurück.\nHeldentum in Reinform.\n\nDoch während das Bier floss und das Lachen zurückkehrte, beschlich unsere Helden ein Gefühl. Blicke. Beobachtung. Präsenz. Jeder prüfte die Taverne auf seine Weise – nichts zu finden. Und trotzdem… ich schwöre, etwas war dort. Wahrscheinlich die Reste von Rittersporns Ego, die unter dem Tisch herumkrochen.\nDion, stets geschäftstüchtig, handelte währenddessen mit Erika einen Deal aus: ein kostenloses Bier gegen ein charmantes Lächeln – und das Versprechen einer gemeinsamen Nacht. Ich nenne das effizient. Andere nennen es anrüchig. Dion nennt es Dienstag.\n\nSpäter – längst war es Nacht – verließen unsere Helden die Taverne.\nEin Kind tauchte auf, fragte nach einer Münze. Süß. Hilfsbereit wie immer griff Anastasia in die Tasche – und bemerkte wenig später den Diebstahl.\nDas Kind rannte.\nGottfried, ganz Artifizient, sah nur eine Möglichkeit: Pistole. Schulter. Treffer.\nMoralisch bedenklich? Ja. Effektiv? Absolut.\nDas verletzte Kind flüchtete in eine Gasse – unsere Helden hinterher – nur um festzustellen: Es war eine Falle.\nEin Hinterhalt. Sklavenhändler. Bewaffnet, organisiert, und mit einem seltsam intensiven Interesse an Elfen und Gnom.\nKampf. Klingen. Chaos.\nDie Helden kämpften tapfer, fielen fast – aber siegten.\nAm Ende fand man bei ihrem Anführer ein Wappen und einen Brief.\nAbsender: Lager G.L.a.n.z., betrieben von der ehrenwert-skandalösen Familie Schimmer.\nMotiv: Sklavenbeschaffung.\nModus Operandi: Beute anlocken und Messer im Rücken.\nCharmant.\nUnsere Gruppe, moralisch erschüttert, zog sich zurück zur Fischerfamilie Hering, um dort die Nacht zu verbringen.\nAlle, bis auf Dion, der… nun ja, Erika begleitete.\nWas soll ich sagen? Er lieferte ab.\nUnd klaute ihr am nächsten Morgen ein Küchenmesser. Romantik in Reinform.\n\nAm nächsten Tag stand die Truppe beim Grafen.\nBeschwerde über Angriffe, Sklavenhändler, moralischen Verfall.\nDie Antwort des Grafen? Ein Achselzucken und:\n\n„Die Familie Schimmer arbeitet im Auftrag des Königs. Sklavenhandel ist in Campari legal.“\nEin Dokument später hieß es: Selbst regeln. Also: Ab zum Lager G.L.a.n.z.\n\nDort erwartete sie: Suvi Schimmer.\nSchön, gefährlich, magisch charmant.\nSo charmant, dass unsere Helden freiwillig ihre Waffen abgaben und sich durch das Lager führen ließen.\nSchön gepflegte Sklaven, moralisch schön verpackte Verkaufsgespräche, und sehr viele sehr falsche Antworten auf sehr gute Fragen.\nAls sie das Lager verließen, entdeckte Dion eine heimlich zugesteckte Nachricht:\nEin Sklave bat um Hilfe.\nReaktion der Gruppe?\nGekonnte Ignoranz.\n\nStattdessen: Arbeit suchen.\nGefunden: Ein Aushang – Rattenproblem im Gasthaus.\nDion hatte Vietnam Flashbacks von dunklen Kellern und rattenhaften Schreien.\nAber die Ratten verloren.\nBelohnung: Silber, Freigetränke, und für Dion ein Hauch Selbstachtung.\nWohlverdient ließen unsere Helden den Abend im Gasthaus ausklingen.\nRittersporn entdeckte dort Emilia, Enkelin des Grafen, umgeben von Adel.\nEr setzte sich demonstrativ dazu.\nPetrus, Sohn des Herzogs, war wenig begeistert und pöbelte bis Rittersporn den Tisch verließ.\nEs folgte: ein Lied – beleidigend, provokant, und zweifellos künstlerisch.\nPetrus: „Magie bannen.“\nDie Reaktion? Verstörte Stille.\nRittersporn & die Gruppe applaudieren während die restlichen Gäste des Gasthauses sie verstörend ansehen\nDer Rückzug aufs Zimmer war unausweichlich.\nDort angekommen, fand noch eine Runde Stripp-Sira zwischen Rittersporn und Anastasia statt.\nIch bin nicht sicher, wer gewonnen hat.\nNur, dass niemand verloren hat.\nAm nächsten Morgen: Marktbesuch.\nDie Gruppe, noch immer immun gegen Sklaven-Hilferufe, suchte nach Aufträgen.\nStefanie bat um eine seltene Pflanze aus dem Tempelgarten.\nDion, ganz Gentleman, nahm den Auftrag an.\n\nDer Rest der Gruppe – mit einem moralischen Kompass, der mal wieder auf Mittagsschlaf stand – machte sich auf den Weg zum Geschichtsmuseum, wo eine gewisse Eva, ihres Zeichens Kulturbeschützerin und Requisitenbeauftragte, dringend Unterstützung für eine Theateraufführung brauchte.\nEinfacher Auftrag? Dachte man.\nAber wie immer bei uns: Der Teufel trägt Samt, singt Balladen – und hat keine Ahnung von Logistik.\n\nDie Mission:\nDrei Orte. Drei Gegenstände. Drei Möglichkeiten, Dinge völlig unnötig zu verkomplizieren.\n\nErster Halt: Die Werft.\nZiel: Ein Requisiten-Säbel – klingenschön, völlig ungefährlich und trotzdem begehrt wie Freigetränke am Zwergenfeiertag.\nVerhandlungspartner: Baron Bug, ein Mann mit Hang zu Schiffen, Seilen und leichtem Narzissmus.\nEr und Anastasia – unsere Zauberin mit dem Charme einer gefährlichen Blume – verstanden sich... sagen wir, geschäftlich gut.\nEine Anzahlung für ein Schiff später...\nDer Baron war beeindruckt. Der Säbel: vorerst reserviert.\n\nZweiter Halt: Die Bank.\nZiel: Ein paar alte Münzen aus der königlichen Frühzeit – historisch wertlos, aber auf der Bühne ein echter Hingucker.\nUnsere Lösung? Rittersporn, der Barde mit fragwürdigen Prioritäten, opferte ein heiliges Grimorium der Sonnengöttin Solis, das er sich... nennen wir es unrechtmäßig angeeignet hatte.\nIch bin mir sicher, Solis hat Verständnis. Oder Blitze. Vielleicht beides.\n\nDritter Halt: Das Rathaus.\nZiel: Ein zeremonielles Banner – groß, alt, staubig.\nWider Erwarten: Keine Wache. Keine Gegenwehr. Nur ein gelangweilter Beamter, der das Ding mit den Worten „Nimm’s einfach mit“ überreichte.\nIch glaube, wir haben ihm seinen Tag versüßt.\nOder zumindest verkürzt.\n\nMit allen drei Requisiten im Gepäck und dem Stolz von Leuten, die erstaunlich oft mit Dingen durchkommen, die sie eigentlich nicht dürften, kehrte die Gruppe zu Eva zurück.\nDie Belohnung?\nKeine Goldberge. Keine göttliche Gunst.\nEine alte Schriftrolle.\nDer Inhalt? Mysteriös. Der Wert? Unklar.\nDer Verdacht? Irgendetwas wird brennen, sobald sie geöffnet wird.\n\nIn der Zwischenzeit – während die restliche Gruppe Artefakte jagte und Theaterträume verwirklichte – bewegte sich Dion durch die Nacht wie ein Schatten in Lederstiefeln.\nZiel: Der Tempelgarten, Heimat der seltenen Nachtblume für Stefanie, die florale Dame mit dem Auftrag und dem Lächeln eines Serienvergifters.\nDion, ganz der Profi, wartete, bis der Mond hoch stand, der Wind günstig war und alle anderen schliefen oder sich romantisch verstrickten.\nEinbruch, Ausweichrolle, Griff zur Blume.\nKein Laut. Kein Widerstand. Kein Zeuge.\nWenn ich es nicht besser wüsste, würde ich sagen, der Mann hat in seinem früheren Leben Dietrich und Dämmerung geheiratet.\n\nWenig später – so gegen den dritten Bierkrug – vereinte sich unsere Truppe wieder im Gasthaus, das ihnen mittlerweile mehr Heim war als jede Unterkunft mit sauberem Bett.\nDie Stimmung? Gelöst.\nDie Missionen? Erledigt.\nDie Moral? ...beim Würfeln auf Überzeugung gescheitert.\n\nDoch der Abend hatte noch eine Szene für das große Theater des Schicksals.\nRittersporn, Träger des größten Selbstbewusstseins pro Quadratmeter, lächelte sich in Anastasias Nähe.\nEin Kompliment hier, ein gezupftes Lautenspiel da, ein sarkastischer Kommentar gegen ihre Arkan-Kenntnisse – und plötzlich war da Hitze im Raum, die nichts mit dem Kamin zu tun hatte.\nDer Rest der Gruppe verließ irgendwann höflich das Zimmer.\nIch blieb – rein professionell natürlich – als Beobachter.\nDie Details?\nVertraulich.\nNur so viel:\nAm nächsten Morgen saßen beide beim Frühstück, zufrieden grinsend – und verkündeten in seltener Einigkeit:\n\n> „War... eine sehr produktive Nacht.“\nIch enthielt mich jeglichen Kommentars.\n(Und schreibe diesen hier nur sehr diskret.)\n\nUnd so saßen sie wieder beim Frühstück.\nMit schwerem Kopf, leichter Kasse – und der Welt zu Füßen.\nBereit für das nächste Kapitel.\nBereit für das nächste Chaos.",
    "session": "Sitzung 4",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1764788071231",
    "categoryId": "recaps",
    "title": "Recap - 5. Sitzung vom 20.07.2025 Chronica Heroica – Kapitel V:",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Zwischen Fingerverlust und Familienversagen – Ein Montag wie aus dem Limbus“\n…und wieder einmal fragt sich die Vetra Skupina: Warum sind wir eigentlich so?\nDer Tag beginnt, wie so oft, im Gasthaus Abendrot. Es ist früher Morgen, und die Sonne versucht noch verzweifelt, gegen den Mief aus Abenteuer, Alkohol und altem Käse anzuleuchten. Doch bevor auch nur ein Plan geschmiedet oder ein Krümel Frühstück genossen wird, beschließt Günther, Gnom und wandelndes Muskelbündel gedanklich, dass Dion, seines Zeichens Schurke und unfreiwilliger Rückenstützträger, heute nach den Frühstück sein persönliches Transportmittel sein soll. Gedacht getan.\nMit der Eleganz eines Felsbrockens und der Beharrlichkeit eines Flusskrebses klammert sich Günther auf Dions Rücken – und bleibt dort. Fest. Unlösbar. Selbst als Dion in seinem Inventar nach einer Brechstange kramt, wird schnell klar: Diese Umarmung ist für die Ewigkeit. Oder zumindest bis zum Marktplatz und noch viel weiter.\nGottfried, stets Chronist des Wahnsinns, tauft das bizarre Schauspiel in einem Anflug von schwarzem Humor auf den Namen: „Half-Life\"\n\nNach dieser sportlich-emotionalen Darbietung führt ein kurzer Verhandlungsversuch mit Stefanie, einer lokalen Spezialistin für dubiose Literatur, zum Erwerb eines Gesellenbuchs der Toxikalchemie. Man weiß ja nie, wann man spontan jemanden vergiften muss.\n\nDoch die Gruppe hatte heute noch weitere Pläne – und folgt endlich dem kryptischen Hilferuf eines Sklaven, der ihnen beim letzten Abenteuer eine beunruhigende Nachricht zugesteckt hatte.\nZiel: Das Lager von G.L.A.N.Z., einer Organisation, deren Akronym bereits mehr Bürokratie versprüht als ein gesamter Magistrat auf Methadon. Die Heldentruppe gibt sich wie üblich geschäftlich interessiert – Kaufinteresse an Arbeitskraft, angeblich für den Einsatz in einer (nicht existierenden) Mine nahe Eisenburg. Ein Gespräch mit dem Aufseher Matthias folgt, in dem dieser zwar keine große Begeisterung zeigt, aber den Vorwand nicht sofort durchschaut. Mission: Schleichen mit Stil – geglückt.\nIm Lager trifft die Gruppe dann auf den Sklaven, der ihnen die ominöse Botschaft zukommen ließ. Der Mann ist gezeichnet, aber bei klarem Verstand – und stellt nur eine einfache, traurige Frage:\n„Was ist aus meiner Frau und meiner Tochter geworden?“\n\nDiese simple Bitte entfacht innerhalb der Gruppe eine epische, stundenlange Diskussion darüber, wie man jetzt am besten moralisch fragwürdig ins Anwesen der Familie Schimmer einbricht, um im dort vermuteten Sklavenregister nach den gesuchten Namen zu fahnden. Man könnte auch sagen: Der Ethikunterricht trifft auf Ocean’s Eleven – mit weniger Planung und mehr Existenzkrisen.\n\nSchließlich fällt die Entscheidung: Einbruch.\nUnd natürlich wird Dion vorgeschickt. Wer sonst?\nIm Inneren des Anwesens angekommen, kommt es zur vielleicht ungewöhnlichsten Begegnung seiner Diebeslaufbahn: Er wird entdeckt – von der neunjährigen Ziehtochter der Familie, Vivien. Schnell reagierend (und ausnahmsweise mal ohne Dolch in der Hand) bietet Dion ihr einen Deal an: Wenn sie still bleibt, spielen sie eine Runde Verstecken.\nUnd so kommt es: Im düsteren, noblen Haus der Familie Schimmer wird versteckt gespielt. Während Stefanie jetzt ohne es zu wissen 2 Personen sucht. Die Welt ist aus den Fugen geraten. Naja.\nNebenbei hilft Dion der kleinen Vivien sogar, ein Buch aus Suvis Nox-Schrein zu entwenden. Bildungsauftrag erfüllt. Schließlich findet er das begehrte Sklavenregister, überfliegt es – und entdeckt die traurige Wahrheit:\n\nDie Tochter wurde an die Flutwerft in Kap Krako verkauft.\n\nDie Mutter landete in einem Freudenhaus in Dragos.\n\nMit dem Wissen in der Tasche und einem leicht brennenden Gefühl in den Fingerspitzen flieht Dion aus dem Anwesen.\nWieder im Gasthaus angekommen, stellt sich schnell heraus: Da ist Magie am Werk. Seine Fingerspitzen beginnen zu glimmen – eine Art magischer Tracker scheint aktiviert worden zu sein. Vielleicht durch das Register. Vielleicht durch das Foltermethodenbuch, das Dion „aus reinem Interesse“ in der Tasche hatte. Die Ursachensuche bringt jedenfalls wenig.\nPlan zur Problemlösung:\n\nHändewaschen. Kein Effekt.\n\nRittersporn hackt Dion die Fingerkuppen ab. Effektiv.\n\nAnastasia heilt das Ganze mit einem Trank. Keine bleibenden Schäden, physisch zumindest.\n\nGottfried entsorgt die abgetrennten Fingerteile in der Kanalisation. Umweltfreundlich? Nein. Diskret? Vielleicht.\n\nUnd so endet dieses magische Missverständnis mit mehr Blut, als jede normale Händedesinfektion je rechtfertigen könnte.\n\nDie Gruppe, nun etwas fingerärmer, folgt den Spuren zur Flutwerft – dem letzten bekannten Aufenthaltsort der Sklaventochter. Doch es kommt, wie es kommen muss: Das Mädchen ist weggelaufen.\n\nEine Suche beginnt. Sie wird gefunden. Aber – zu spät. Der Verfall, jene mystische, körperzersetzende Krankheit, hat bereits eingesetzt. Trotz rascher Maßnahmen stirbt das Kind, und beim letzten, panischen Lauf durch die Straßen verteilt es ihre Körperteile quer durch die Stadt.\n\nDie Stadtwache, wenig begeistert von rennenden, zerfallenden Kindern und abenteuerlustigen Chaosverursachern, zeigt Verständnis in der bewährten Währung:\n10 Silber Strafzettel – wegen Ruhestörung und biologischer Verunreinigung.\n(Nicht betroffen: Günther, der sich stattdessen anderweitig nützlich gemacht hat, indem er Bettlern ihre Stofflaken gestohlen hat. Aus Gründen.)\n\nDie Gruppe kehrt zurück ins Lager G.L.A.N.Z., um dem Sklaven die Nachricht zu überbringen – doch zu spät.\n\nWährend die restliche Gruppe noch überlegt, ob sie lügen oder einfach weglaufen sollen, entscheidet sich Gottfried für einen waghalsigen Flirtversuch mit Suvi, der religiöse Tiefe und schamlose Ablenkung zugleich sein soll. Ergebnis: Uneindeutig.\n\nIm Gespräch mit Matthias erfahren Anastasia und Rittersporn währenddessen, dass der Sklave „aus Platzgründen“ bereits beseitigt wurde.\n\nEin Euphemismus, der selbst einem Dämon den Appetit verderben würde.\n\nZurück im Gasthaus, gerade als sich alle damit abgefunden haben, dass moralische Erschöpfung auch eine Art Vollzeitbeschäftigung ist, tritt Antonio Schimmer ein. In der Hand ein Goldstück, im Gesicht ein höfliches Lächeln – und auf den Lippen eine klare Warnung:\n„Danke für die... Unterhaltung. Aber brecht bitte nie wieder bei uns ein.“\nUnd so endet das Wochenende der Vetra Skupina:\nEin Sklave tot, ein Kind verloren, Finger geopfert, Strafe gezahlt – und trotzdem ein Goldstück reicher.\nOder, wie man in Aventurien sagt:\n\"Nur wer verliert, kann sich daran erinnern, wie teuer alles war.\"",
    "session": "Sitzung 5",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1764788233139",
    "categoryId": "recaps",
    "title": "Recap - 6. Sitzung vom 2+3.8.2025 Chronica Heroica – Kapitel VI",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Helmgeschäfte, Bauchgeschwüre und Bootskäufe – Ein Tag voller kleiner Siege und großer Missverständnisse“\n(aufgezeichnet von Lucius Magnus, Magier, Beobachter und lizenzierter Seitenkommentator)\n\nDer Morgen über Kap Krako schmeckt wie ein schlecht gerührter Trank: zäh, klebrig, mit Nachgeschmack. Die Vetra Skupina versammelt sich im Gasthaus, bewaffnet mit Kaffee, Brot und vager Ziellosigkeit – bis auffällt, dass Günther fehlt. Wirt Stefan, nachweislich Mehrfachtäter in Sachen Wahrheiten-im-Nebenbei, berichtet, der gute Mann sei „sehr früh“ los, murmelnd von Bettlern und Stoffdiebstahl. Die Gruppe reagiert professionell: Schulterzucken, weiter frühstücken. (Man kennt halt seine Pappenheimer.)\n\nMit vollem Bauch und leerem Quest Log fragt man Jakob nach Arbeit. Der verweist auf die Schwarzen Bretter beim Rathaus und Marktplatz – und erwähnt die Premiere im Amphitheater am kommenden Samstag. Ob wegen der Handlung oder vermutlich echter Tiere auf der Bühne alle drüber reden, bleibt so offen wie eine Schenktür am Abend.\n\nAm Rathausbrett angekommen hängt tatsächlich ein Auftrag von Baron Bug: Botendienst. Kaum gelesen, klappt bei Anastasia das innere Hafenkranarm-Schmerzgedächtnis aus. „Den Auftrag machen wir nicht. Ich habe dem Mann schon ein Schiff angezahlt, und der wartet noch auf das restliche Geld.“ (Anmerkung des Chronisten: Es gibt Wunden, die kein Heiltrank schließt – finanzielle zum Beispiel.) Also weiter zum Marktplatz, wo gerade Kinder Theater spielen und Gottfried kurzerhand zum „großen, bösen Riesen“ befördern. Rittersporn versucht währenddessen die magische Geige zu „Ein Bett im Kornfeld“ zu überreden, doch das Instrument ist offenbar im Despacito-Abo. Anastasia leicht verwirrt tanzt dazu ob aus Freude, Trotz oder „wenn schon, denn schon“, entscheidet ihr persönlicher Dramaturg und Dion entlastet in der Zwischenzeit die drittreichste Person vor Ort von überflüssigem Münzgewicht. Man muss schon Wissen welches Opfer man sich Aussucht.\n\nMit Applaus im Rücken spaziert die Gruppe zum zweiten Brett: Feldwebel Eberhardt Eisen sucht einen verschwundenen Paradehelm fürs Arsenal. Bei Gottfried blitzt eine Erinnerung: Eines der Theaterkinder trug doch genau so ein Stück Metallromantik. Eine kurze Verhandlung mit der Kinderschar, ein Hauch Magie, ein leuchtendes Schwert zu viel später und der Deal steht: Morgen hilft die Vetra Skupina beim Stück, dafür gibt’s den Helm.\n\nBis dahin zerstreut man sich sinnvoll in die Gegend. Dion und Anastasia stapfen fröhlich zu Stefanie, Alchemistin und Preisstabilitätswunder („bester Preis“ heißt hier „wie letztes Mal“). Nach kurzem Shopping wagen Gottfried und Dion dann doch den Weg zu Baron Bug, während Anastasia und Rittersporn den Marktplatz mit Impro, Illusion und mittelmäßigem Gesang wachhalten. Beim Baron stellt sich der Auftrag als simpel und diskret heraus: Bauchwehmittel von Stefanie. Stefanie dagegen stellt fest: nicht vorrätig und für die Herstellung braucht es leuchtende Fischinnereien, die nur nachts im Hafen aufzutreiben sind und deren Fang illegal ist. (Natürlich illegal. Abenteurerdiät ohne Gesetzesbruch? Bitte.)\n\nAlso runter zur Familie Hering in der Unterstadt, Netz leihen, Gottfried und Dion machen sich ans nächtliche „Angeln“, begleitet von Anastasia und Rittersporn, deren Anfeuern die Tarnung akustisch \"aufbessert\". Nach ein paar Stunden zappelt dann der Erfolg im Netz; zurück bei den Herings demonstriert Harald fachkundig die delikate Innereien-Extraktion. (Überraschend lehrreich aber Wenig appetitlich.) Man bleibt über Nacht.\n\nDer nächste Morgen liefert Parallelhandlung wie aus dem Lehrbuch: Gottfried und Rittersporn lösen den Theater-Deal ein, eine herbeigerufene Täuschungsbestie inklusive. Kinder jubeln, das Publikum wirft Münzen, ein paar Eltern vergießen Tränen – realistisch betrachtet, wegen Stolz; dramatisch betrachtet, wegen Staub in den Augen. Am Ende Helm erhalten, ins Arsenal gebracht, Belohnung kassiert. Zur gleichen Zeit marschieren Anastasia und Dion mit dem Heiltrank zu Bug. Die Verhandlung verläuft sagen wir mal als Finanzrutschbahn: Statt klingender Münzen gibt’s Verrechnung mit Anastasias offener Schiffsrestzahlung, dazu ein paar Silber aus eigener Tasche – und plötzlich besitzen beide ein kleines Beiboot mit zwei Rudern. Der Baron, guter Laune und weiterhin Besitzer des Titels des besten Verkäufers verabschiedet die zwei mit: „Bucht vier gehört euch. Bis bald mal wieder!“\n\nStolz wie Laternenkinder rudern Dion und Anastasia ihr neues Gefährt zur Familie Hering – fest entschlossen, nicht darüber zu sprechen, dass die Ruderblätter falsch montiert sind. Dort treffen sie sich mitGottfried, Rittersporn und Günther, der anscheinend vom Stoffabenteuer wieder zurück ist. Am nächsten Tag beim Frühstück (altes Brot, gesalzener Hering, frische Neuigkeiten) berichten Gottfried und Rittersporn von einem Auftrag des Amphitheater Besitzers Sylvio Sparsam. Sparsam im Namen, großzügig bei Problemen also hin.\n\nEs folgt ein kurzerSzenewechsel: Sylvios Büro, Stilrichtung „Wasserschaden & Tintenblume“. Sylvio erklärt, dass alle Mitarbeitenden Erpresserbriefe bekommen haben: Wer nicht zahlt, dessen dunkle Geheimnisse werden zur Premiere öffentlich. Gewünscht: Diskretion. (Später wird er diesen Wunsch definieren wollen. Aber zu spät.)\n\nDie Ermittlungen starten auf Vetra Skupina Art. Günther klopft sich staatsbeauftragten Eifers durch alle Türen auf denen ansatzweise das Wort Privat zu finden war, bis bei einer Florian öffnet Hauptdarsteller mit Körper wie bestellt im Götterkatalog und Verstand von halb durchgegartem Brot. Anastasia und Rittersporn befragen ihn eifrig um festzustellen: Florian kann nicht schreiben aber eindrucksvoll Muskeln anspannen. Währenddessen entdecken Dion, Gottfried und Günther bei den Requisiten Roderick, schwitzend und skeptisch. Noch bevor jemand „Erpressung“ sagt, werden sie zum Kistenschleppen verpflichtet. Günther von der Aufgabe unterfordert verschwindet mit Vorhängen und beginnt in einer Ecke ein Nähprojekt mit künstlerischem Anspruch; Dion und Gottfried folgen Roderick hinter die Bühne, reden, misstrauen erfahren aber nichts Verwertbares. Anastasia und Rittersporn stoßen später wieder dazu, Rittersporn organisiert sich via Charme ein Autogramm. Niemand weiß, warum aber es sieht gut aus.\n\nAls Nächste Station: Elena, Schauspielerin und Diva also potentielles Opfer. Rittersporn verstellt die Stimme („Ich bins Florian!“), Elena bittet ihn herein und ehe sie sich versieht steht sie im Nachthemd vor vier nicht-Florians. Die Lage ist angespannt. Dion entscheidet sich für Flucht (klingt besser als „Ich will hier weg“), Gottfried betreibt intensive Wandinspektion bis zur Putzleistung währenddessen nach einem kurzen Gespräch sechs Wachen Anastasia und Rittersporn bitten höflich, das Weite zu suchen. Dion findet unterdessen einen Lagerraum und darin ein tintenfleckigen mit einer Aura von Schuld, ruft Gottfried dazu und gemeinsam bergen sie eine Schatulle mit blutigen Ohrringen. Was genau das beweist? Uneinigkeit. Omen ja, Lösung nein. Also: Abbruch für heute. Schlaf.\n\nAm nächsten Morgen folgt ein Plan so schlicht wie riskant: Gottfried, Anastasia und Günther lenken Elena ab, während Dion und Rittersporn ihr Zimmer durchsuchen. Trefferliste: ein Erpresserbrief, eine Urkunde vom Waisenhaus und ein Spiegel. Preisschild: 1 Goldstück. Dions Puls steigt, seine Diebeshände zittern, und die einzige logische Folgerung tritt ein: Spiegel ab und rennen. Quer durchs Theater, Schauspieler springen, Wachen zucken zu spät, Dion im Zickzack, der Spiegel wie ein strahlender Schild auf dem Rücken. Er entkommt fast; in der Unterstadt stellen ihn Diebe. Kurzer, existenziell lehrreicher Kampf – Entscheidung: Spiegel zurücklassen, Leben behalten. Heiltrank bei Stefanie abholen, dann zurück zur Familie Hering.\n\nWährenddessen arbeitet das Rest Team im Theater weiter. Dank Günthers Spürsinn und einem privatdetektivischen Glanzmoment verlagert sich der Verdacht von Paul auf Roderick. Auf Stellen. Leugnen und Ein paar Schläge folgt ein Geständnis. Die Wahl lautet schneller Tod gegen ein vollständiges Geständnis oder ewiger Kerker; Roderick entscheidet sich für die kurze Route. (Urteilsvermögen: nicht völlig defekt.)\n\nRückkehr zu Sylvio Sparsam: Beweise auf den Tisch, Erleichterung in seinem Gesicht, Belohnung wird verteilt. Erschöpft, stolz und mit offenen Fragen zu Dions Tageslauf schlendert die Gruppe zurück zur Familie Hering – wo sie auf Dion treffen, vormals Spiegelträger, aktuell lebendig. (Objektiv betrachtet: bester Deal des Tages.)\n\nSchlusswort des Chronisten: „Die Wahrheit ist eine Bühne – aber nicht jeder Schauspieler kennt sein Skript.“ (Und manche montieren Ruderblätter falsch herum oder stehlen Spiegel. Beides lässt sich korrigieren; das eine mit Einsicht, das andere mit einem Schraubenschlüssel.)",
    "session": "Sitzung 6",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1764788523943",
    "categoryId": "recaps",
    "title": "Recap - 7. Sitzung vom 27.09.2025 Chronica Heroica – Kapitel VII",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Von Hinrichtungen, Hufverlusten und einem Wyvern mit schlechter Laune“\n(niedergeschrieben von Lucius Magnus, Magier, Chronist, zertifizierter Augenroller. Ich beobachte nur – versprochen. Kommentare inklusive.)\n\nBegonnen wird, wie es sich für solide Dramen gehört, bei der Familie Hering: Brot, Hering, Alltag. Dann teilt sich der Trupp wie ein schlecht gelaunter Wassertropfen. Dion, Gottfried und Günther ziehen zum Marktplatz, offiziell zum Einkaufen, inoffiziell zum „Mal schauen, was das Schicksal so im Sonderangebot hat“. Prompt stolpern sie in ein Großereignis: die Hinrichtung der Spiegeldiebe. Kein schöner Anblick – obwohl Günther nach vollzogenem Urteil fachmännisch die Schnitte des Henkers begutachtet und nüchtern attestiert: „saubere Arbeit“. (Notiz an mich: Dieser Mann braucht ein Hobby. Ein anderes.)\n\nDer Weg führt weiter ins Arsenal, wo Gottfried seine selbst geschmiedete Ringpanzerrüstung veräußert – solide Handwerkskunst gegen klimpernden Realismus getauscht. Währenddessen geben Anastasia und Rittersporn bei den Hering-Kindern den pädagogischen Doppelpass, tatkräftig unterstützt von Rittersporns Täuschungsbestie, die nachweislich mehr Aufmerksamkeitsspanne hat als die meisten Erwachsenen im Umkreis von drei Gassen.\n\nDann entgleist der Tag charmant: Günther findet eine Taverne, die Taverne findet Günther, und am Ende findet man den „Günther-im-Turbo-Modus“ – eine zehn Tage währende Kombination aus Energie, Chaos und „viel Spaß der Gruppe“. (Offizielle Diagnose: Ja.)\n\nMit der Restvernunft im Gepäck geht’s zu den Stallungen. Dort begegnen sie Rudi und Martin Mähne; nach kurzem Geplänkel steht der Plan: Mit Rudis Planwagen Richtung Grenzposten. Die Reise verläuft erst ruhig – drei Tage rollt das Rad, bis man eine Pause einlegt und ein kleines Lager aufschlägt. Günther nutzt die Rast, um mal eben einen Baum auszureißen (weil… Gründe), Dion und Anastasia klettern auf einen anderen, vermutlich um der Realität auf den Kopf zu schauen.\n\nMitten in der Nacht: Flügelschläge, dann – zack – eine gewaltige Kreatur stürzt herab. In einem einzigen, hässlichen Atemzug zerstört sie den Wagen, tötet Monica (gute Stute, schlechte Nacht) und raubt Ute, das zweite Pferd. Die Gruppe untersucht den Tatort und findet ein schwarz verfärbtes Blutgemisch. Schön ist anders, aber Hinweise sind Hinweise.\n\nAm nächsten Tag geht es zu Fuß weiter. Ankunft am Grenzposten: Dion wird von einer Unbekannten erkannt – Victoria Vitale, charmante Repräsentantin des Konsortiums der Sklavenhändlergilde. (Ich überbrücke das moralisch mit Tee.) Sie lädt die Gruppe freundlich ein; auf dem Weg zu Victorias Zelt wandert noch eine frische Ausgabe der Campari Chroniken in den Einkaufskorb, für Lektüre und Lagerfeuer gleichermaßen geeignet. Bei Victoria gibt’s Lageinformationen zur Gegend um den Posten – Wege, Leute, Dinge, die nachts fliegen.\n\nWissensdurst gestillt, geht’s weiter zum Zelt der Ruinentauchergilde. Auftrag: Eine alte Ruine im Norden prüfen; von der Ausgrabungsstätte kam zu lange kein Lebenszeichen. Klingt nach „spannend“ mit Beigeschmack „verschwunden“. Rittersporn und Anastasia nutzen den Aufenthalt, um die Gilde um ihr Papier zu „erleichtern“ – Archivpflege nach Vetra-Standard: Wenn man schon Spuren sucht, kann man welche mitnehmen.\n\nAbends im Gasthaus begegnet man Regina, Rudis Frau, und deren Neffen Werner. Nach kurzen Worten folgt die Entscheidung: Rüber – den Kontrollpunkt ins Herzogtum Solengrund passieren. Hauptmann Bienchen, Ralf und Shalin übernehmen die Kontrolle. Es wird… gründlich. Dion schwitzt, Taschen werden zur philosophischen Frage („Wie tief ist zu tief?“), und ein kurzer Striptease für die neugierige Menge sorgt für Abendunterhaltung. Ergebnis: durchgelassen.\n\nAuf der anderen Seite klopfen sie bei der Monsterjägergilde an. Gildenassistentin Stella hört sich den nächtlichen Angriff an und vergibt einen Auftrag: Finde heraus, was euch angegriffen hat. Bevor die Truppe wieder loszieht, bietet John Jonsen fachkundige Hilfe an – Treffen bei Sonnenaufgang, sagt er, und meint es ernst. Ein Abstecher zur Händlergilde schließt sich an; Dion empfiehlt spontan die Umbenennung in „Logistikgilde“ (nicht ganz falsch), dann weiter zur Gaststätte von Wilhelmine, Reginas Schwester.\n\nBlöderweise hat Turbo-Günther Vortrieb: Er stürmt voraus, ramponiert die Tür und wird von Walter – Wirt, Ehemann, Türflüsterer – vor die Tür gebeten. Der Rest wartet kurz, atmet kollektiv durch und betritt dann das Gasthaus. Drinnen: Walter, Mann von Wilhelmine und Freund von Rudi, erkundigt sich nach dessen Wohl und bietet an, die Held:innen bei Gelegenheit nach Wiesen mitzunehmen. Bedient wird die Truppe von Runa, Wilhelmines Nichte und Reginas Tochter. Günther indes driftet zurück zum Gasthaus „Zur neuen Welt“ auf der anderen Seite des Walls – vermutlich weil die Welt dort neu ist.\n\nEin Versuch, die Stimmung in der „Kornkammer“ musikalisch zu heben, scheitert spektakulär; man wird gebeten zu gehen. Auf dem Rückweg Richtung „neue Welt“ treffen sie am Grenzpunkt Hauptmann Piranha, Elke und Linus. Gottfried erspäht Elke, legt den Charme an wie eine frisch geölte Rüstung und beginnt, sich höflich einzukratzen. Kontrolle bestanden, weiter zum Gasthaus – wo just in diesem Moment eine Person im hohen Bogen aus dem Fenster fliegt. Die Gruppe erinnert sich an ihren Erste-Hilfe-Kurs und bringt das Opfer in die stabile Seitenlage. Also… ungefähr. (Mit dem Fuß. Zählt.)\n\nDrinnen: ausufernde Stimmung, ein Sog, den nur Günthers Anwesenheit erklären kann. Es wird gefeiert, es wird geprügelt, und am nächsten Mittag dämmert die Erkenntnis: zu spät. Sammelpunkt vor der Tür: Gottfried erwacht im Bett, Günther hat in Gottfrieds Rüstung genächtigt, Rittersporn krabbelt unter dem Tisch und zwei Frauen hervor, während Dion und Anastasia vom Tresen purzeln, weil „rücken an Rücken stützen“ nur bis zum Blackout funktioniert.\n\nVerkatert treffen sie John und stapfen zu einem weiteren Angriffsort. Die Spurenlage singt im Kanon: Wyvern. Zurück in die Monsterjägergilde, Plan schmieden, Lockmittel definieren – jetzt mit offiziellem Jagdauftrag. Abrede: Morgen wieder hier; John bereitet vor, die Held:innen feiern abends „moderat“, um vielleicht pünktlich zu sein. Alle außer Gottfried, der – wie es sich für einen Handwerker gehört – die ganze Nacht bei Elke Rohre verlegt. (Wenn ihr versteht, was ich meine. Ihr versteht, was ich meine.)\n\nMorgengrauen. Treffen mit John, Falle stellen, Nerven spannen. Und siehe da: Der Wyvern erscheint. Günther wächst in die Riesenform und erteilt dem Vieh eine Lektionen im Sumo; der Rest setzt nach, und gemeinsam verwandeln sie das Monster in Essenz, eine Giftdrüse und gehacktes Lehrmaterial. Rückkehr zum Grenzposten, Belohnung kassieren – die dank verkaufter Essenz monumental ausfällt. John wird befördert, und selbstverständlich endet der Tag dort, wo große Pläne stets beginnen und enden: im Gasthaus, beim Feierabendbier.\n\nNatürlich bleibt es nicht dabei… (Aber das ist eine andere Seite in meinem Notizbuch.)",
    "session": "Sitzung 7",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1764788640390",
    "categoryId": "recaps",
    "title": "Recap - 8. Sitzung vom 11.10.2025 Chronica Heroica – Kapitel VIII",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Ausgebuddelt, umgebettet, auferstanden – und dann winkt der Kronprinz“\n(protokolliert von Lucius Magnus, Magier, Chronist, neutraler Kommentator mit Hang zu sarkastischen Randbemerkungen)\n\nVerkatert wie ein Troll nach der Metmesse erhebt sich die Vetra Skupina im Gasthaus „Zur neuen Welt“ und schleppt sich gen Norden: Ziel Ruine. Der Weg führt zuerst zum Forscherlager – Zelte, Kisten, Notizen, keine Forscher. Bei näherem Hinsehen zeigt sich, warum: Viele von ihnen sind im Boden versunken. Kein Bild, das um Umarmungen bittet. Günther und Gottfried machen, was pragmatische Helden eben machen: Sie buddeln Körperteile aus. (Ich werte nicht. Ich beschreibe nur.) Währenddessen findet Dion das Logbuch der Expedition. Die Notizen deuten eindeutig auf eine Stätte hin, die ehrfürchtig „Ruine der Ersten Menschen“ genannt wird. Na großartig.\n\nAlso weiter zur Ruine selbst. In einer Halle aus Stein und Staub wartet ein Altar neben einem Steinblock, auf dem ein Schwertgriff liegt – kahl, würdevoll, verdächtig. Erst wird übervorsichtig diskutiert; dann spürt Gottfried, dass vom Griff Magie ausgeht. Rittersporn entscheidet sich für Feldforschung und schickt seine Katze Mietze Datze vor. Kaum berührt die Samtpfote den Griff, reißt die Erde auf und ein Erdelementar-Myrmidone (mit zwei weiteren Erdelementaren im Anhang) schiebt sich in die Realität. Höflichkeitsfloskeln werden übersprungen; es folgt Kampf um Existenzberechtigung. Dion wird dabei so hart getroffen, dass er kurzzeitig das Reich der Lebenden verlässt. (Ja, das ist die höfliche Formulierung.)\n\nAls der Staub sich legt und die Steine wieder still sind, hören die Helden meine Stimme: Ich, Lucius, verspreche, Dion zurückholen zu können. Die Gruppe tut, was jede verantwortungsvolle Abenteurertruppe in einer heiligen Stätte tun würde: Sie sammelt Dions sämtliche Einzelteile ein, legt sie auf den Altar – und geht schlafen. (Plan A ist manchmal auch Plan Z.)\n\nIn der Nacht flackert magisches Leuchten, und im Morgengrauen schnellt Dion mit einem großen Atemzug zurück in die Welt. Punkt für die Team-Transzendenz. Man sichert den Schwertgriff und tritt den Rückweg zum Grenzposten an.\n\nDort wandert der Fund direkt an die Gilde der Ruinentaucher; Gottfried beschließt, Herrn Stumpfklaue bei der Analyse zu helfen. Weil Steine selten alleine Probleme machen, ruft Herr Sturmklaue zur Monsteranalyse John Jonson dazu. John begutachtet kurz, nickt fachmännisch – und legt gleich den nächsten Auftrag auf den Tisch: Arena von Solen Aue braucht Frischware, bitte einen Riesenwolf tief im Klagewald fangen. Die Gruppe folgt John zur Monsterjägergilde, um das offiziell zu machen.\n\nDort erwartet sie Tumult: Wachen sperren die Straße ab, und dann rauscht er heran – der Kronprinz von Campari, Bharash Dovakin, Erbe des Königlichen Blutes, hoch zu Drake, flankiert von seiner Leibgarde, winkt und reitet Richtung Kap Krako. Der Pomp zieht vorbei, die Stille kehrt zurück, und die Helden löchern John mit Fragen zur königlichen Familie. (Antworten gab’s. Intrigen gab’s später. Vermutlich.)\n\nEs folgt eine Nacht im Gasthaus, und am nächsten Morgen geht’s zurück zu Gottfried und Stumpfklaue: Als Questbelohnung entscheidet sich die Truppe für den magischen Schwertgriff. Danach treffen sie sich wieder mit John, um den Riesenwolf-Auftrag anzugehen.\n\nAnmerkung zum Schluss: Manche Geschichten enden mit einem Vorhang. Diese endet mit einem Griff, einer Rückkehr aus dem Nichts und einem Kronprinzen auf einem Drake. Ich sage: Solide Dramaturgie – und morgen fangen wir Wölfe.",
    "session": "Sitzung 8",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1764788725584",
    "categoryId": "recaps",
    "title": "Recap - 9. Sitzung vom 29.11.2025 Chronica Heroica – Kapitel XIX",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Hähne, Heulwälder und ein Auftrag, der ausdrücklich ‚lebend‘ verlangte“\n(aufgezeichnet von Lucius Magnus, Magier, Chronist, zertifizierter Beisatzlieferant. Ich schaue nur zu – versprochen.)\n\nMit einem Käfig, der eher nach Kleindrache als nach Hund aussieht, und zwei Pferden davor stapft die Vetra Skupina zusammen mit John Johnsen in Richtung Klagewald. Am Waldrand warten Eugen der Waldläufer und die Söldnerzwillinge Sören und Sönke – eine Mischung aus Ortskenntnis, Muskeln und „Wir hätten das Kleingedruckte zum Auftrag lesen sollen“.\n\nDann passiert das, was in meiner Erfahrung immer passiert, wenn Günther „Ich hab ’ne Idee!“ sagt: Er lässt per Thaumaturgie den Schrei eines englischen Hahns erklingen. Ergebnis: statistisch gesehen alle 300 Wolfsrudel des Waldes wissen jetzt, dass Besuch da ist. Die Gruppe flüchtet schnell von der Lichtung ins Dickicht – Tarnfarbe Panikgrün.\n\nKaum drin, kommt es zum ersten Kampf. Die Wölfe sind… falsch. Magisch verändert, sie sprühen Gift und fesseln mit Ranken wie eifersüchtige Gärtner. Dank Eugens Pfadfinderzauber reduziert sich der Ärger auf zwei Begegnungen, aber die zweite frisst ein Stück Herz: Sönke fällt nach einem Biss in den Hals. Gottfried reagiert instinktiv mit brennenden Händen – eigentlich für die Wölfe gedacht, am Ende eine Einäscherung für den Gefallenen. Es ist still danach. Sehr still.\n\nDen Käfig tiefer in den Wald zerren ist ein schlechter Witz, also schlagen sie Lager auf. Rittersporn und Sören übernehmen Nachtwache, Dion rührt Alchemie an – mit Eugens ruhiger Hand als Stütze. Am nächsten Morgen bleibt Sören beim Wagen, der Rest taucht tiefer in den Klagewald ein. Dort treffen sie nur noch auf größere Exemplare des Klagewolfs – mehr Zähne, mehr Dornen, weniger Humor.\n\nNach zäher Reise erreichen sie einen von Eugen markierten Unterschlupf. Kurze Pause, lange Strategiedebatte: John hat extra ein Schlafgift besorgt; die Klingen werden eingestrichen, der Plan heißt „lebend fangen“. Dann atmet der Wald aus – und der Riesenklagewolf steht da. Es folgt ein existentieller Kampf: Der Wolf beschwört einen Dornenwald, in dem Rittersporn, Dion und Anastasia feststecken, während der Rest versucht, nicht zu sterben. Stunden fühlen sich wie Äonen an, bis Günther den Koloss packt, das Maul zuschließt, just in dem Moment, als ein nekrotischer Energiestoß sich entladen will. Energie sucht immer einen Ausgang. Findet keinen. Der Wolf detoniert.\n\nLebend fangen? Theoretisch ja. Praktisch: Wolf-Konfetti. Die Vetra Skupina schultert ihre Niederlage und den leeren Käfig, marschiert hängenden Kopfes zurück – nur um am Lager festzustellen, dass von Sören und den Pferden nicht viel mehr als eine Blutspur übrig ist. Also: sechs Leute, vier Ecken, und der Wagen wird mit purer Muskelkraft zum Grenzposten geschleppt. Dort kippt Frust in Lautstärke: Günther und Gottfried geraten aneinander, Gottfried lässt verbotenerweise Magie aufflackern – und beide landen bei Hauptmann Bienchen. Nach viel „Ich war das nicht“ (von Dion mit professionellem Kopfnicken begleitet) kommt das Urteil: Morgen den Posten verlassen und mindestens einen Monat nicht wiederkommen.\n\nWährend die drei bei Bienchen Reputation jonglieren, tragen Rittersporn und Anastasia die Scham des fehlgeschlagenen Auftrags zur Gilde: keine Belohnung, John vermutlich degradiert, und Eugen hat mehr Geld versenkt, als die Gruppe je gleichzeitig besessen hat. Vorhang? Noch nicht. Es folgt eine letzte Nacht in der „Zur neuen Welt“, und am nächsten Tag geht’s mit Walter Richtung Wiesen.\n\nSieben Tage später: Halt bei Roland, der vom Ährenbaron berichtet – ein Problem, das die Hauptmühle beschädigt und die Laune gleich mit. Die Heldengruppe kocht Abendbrot, kriecht in die Decken und plant die Weiterreise zum Herrenhaus.\n\nRandbemerkung des Chronisten: Wenn ein Auftrag „lebend“ sagt und „explodiert“ liefert, nennt man das in Fachkreisen „Interpretationsspielraum“. Morgen reden wir mit einem Baron. Ohne Hahn. Bitte ohne Hahn.",
    "session": "Sitzung 9",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": false,
    "isNew": false,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1764790268469",
    "categoryId": "cities",
    "title": "Narvik Wall",
    "summary": "",
    "tags": [
      "Grenzposten"
    ],
    "region": "Narvik",
    "body": "Der Narvik Wall ist ein gewaltiger, steinerner Riegel im Gebirge, der sich wie eine Narbe durch die Landschaft zieht und die Herzogtümer Narvik und Solengrund voneinander trennt. Türme, Banner und Fackeln markieren die Grenze; Tag und Nacht patrouillieren Wachen auf den Zinnen. Wer hier passieren will, kommt an strengen Kontrollen, misstrauischen Blicken und der allgegenwärtigen Präsenz von Soldaten und Söldnern nicht vorbei.\n\nStimmung:\n\nAngespannt, misstrauisch, von Bürokratie und Bewaffnung durchdrungen.\n\nEin Drehkreuz für Spione, Händler, Sklavenhändler, Forscher – und all jene, die etwas zu verbergen haben.\n\nJeder Schritt, jedes Wort kann beobachtet werden; der Wind trägt Gerüchte über Krieg, Handel und verbotene Funde.\n\nWichtige Punkte am Narvik Wall:\n\nGasthaus „Zur neuen Welt“: Die erste und letzte Zuflucht beiderseits der Grenze. Hier schlafen Händler, Söldner, Ruinentaucher und manchmal auch gesuchte Leute, die unter falschem Namen reisen. In den dunklen Ecken werden Deals ausgehandelt, die nie in offiziellen Büchern stehen.\n\nGrenzkontrolle & Kaserne: Ein massiver Torbau mit Zugbrücke, Wachposten und Stempelschaltern. Hier werden Waren, Papiere und Personen geprüft. Die Soldaten des Herzogs von Narvik sind gut ausgerüstet und wenig humorvoll – außer man schmiert die richtigen Hände.\n\nK.o.n.s.o.r.t.i.u.m (Gilde der Sklavenhändler): Ein kalt wirkender Verwaltungssitz mit privaten Baracken und Stallungen. Offiziell kümmern sie sich um „Arbeitskräfte“ für Minen, Plantagen und Expeditionen. Inoffiziell floriert hier der Handel mit Menschen und seltenen Kreaturen.\n\nKönigliche Gilde der Ruinentaucher (KGdR): Ein befestigter Komplex aus Archiv, Labor und Magazin. Von hier aus brechen Expeditionen in alte Ruinen beider Herzogtümer auf, um Artefakte und Relikte zu bergen. Die Gilde steht mit vielen am Wall auf gespanntem Fuß – zu viel Wissen, zu viele Geheimnisse.\n\n„Campari Chroniken“ (Zeitung): Ein kleines, aber stets geschäftiges Redaktionshaus nahe am Tor. Reporter und Schreiber sammeln Geschichten von Reisenden, Soldaten und Grenzgängern. Hier entstehen Schlagzeilen über Verschwörungen, Grenzzwischenfälle und Sensationen aus den Kolonien – nicht immer ganz wahr, aber stets lesenswert.\n\nDer Narvik Wall ist damit mehr als nur eine Grenze: Er ist ein Nadelöhr für Macht, Informationen und Menschen – wer ihn kontrolliert, kontrolliert den Fluss zwischen Narvik und Solengrund.",
    "session": "",
    "status": "besucht",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "map-campari-region"
    ],
    "images": [
      "images/Narvik Wall.png"
    ]
  },
  {
    "id": "entry-1764791184813",
    "categoryId": "npcs",
    "title": "Graf Karl-Heintz von Krako",
    "summary": "",
    "tags": [
      "Graf"
    ],
    "region": "Narvik",
    "body": "Graf Karl-Heintz von Krako ist ein betagter, rotschuppiger Dragonborn mit schneeweißen Kopfschuppen und Hörnern, der stets makellos gekleidet und mit stolzem, beinahe steifem Gang auftritt. Ein Monokel auf dem Auge, Gehstock in der Hand und eine Pfeife zwischen den Zähnen verleihen ihm eine distinguierte, aber fast schon roboterhafte Ausstrahlung. Er spricht nur, wenn er direkt angesprochen wird, und dann knapp, aber äußerst eloquent, jedes Wort ist gewählt, jedes Schweigen bedeutungsschwer. Als Graf und Meister-Skriptor der Sigillographie widmet er sich mit fanatischer Präzision seinem Handwerk, während der stetige Rauch seiner Pfeife zu seinem unverkennbaren Markenzeichen geworden ist.",
    "session": "",
    "status": "unklar",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764791256980",
    "categoryId": "npcs",
    "title": "Emilia von Krako",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Emilia von Krako ist eine junge, etwa zwanzigjährige Dragonborn mit weinroten Schuppen und zierlicher Statur. Sie legt großen Wert auf ihr gepflegtes Äußeres: dezent geschminkt, stets gut gekleidet und mit einer Haltung, die vor Stolz nur so strotzt. In ihrer Rolle als Sekretärin gibt sie sich seriös und hochprofessionell, wirkt jedoch immer wieder unbeabsichtigt tollpatschig – herabfallende Aktenstapel, Tintenflecken und kleine Missgeschicke begleiten ihren Arbeitsalltag. Trotz dieser Patzer lässt sie sich nie aus der Fassung bringen und versucht mit straffer Haltung und eisernem Pflichtbewusstsein, jeden Fehler sofort wieder wettzumachen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "entry-1764791184813",
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764791347184",
    "categoryId": "npcs",
    "title": "Lasse Lauter",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Lasse Lauter ist ein etwa sechzehnjähriger Mensch mit wildem, feuerrotem Haar und kleiner Statur, dessen wahre Größe in seiner unglaublich lauten, schrillen Stimme liegt. Als Stadtschreier beherrscht er das Schauspiel wie kaum ein anderer: Er gestikuliert, wechselt Tonlagen und zieht mit dramatischen Auftritten jede Aufmerksamkeit auf sich. Doch hinter seiner lebhaften Art steckt ein ausgeprägter Hang zur Unwahrheit. Lasse erzählt den Leuten genau das, was sie hören wollen, ob es nun stimmt oder nicht. Für ihn zählt der Effekt seiner Worte mehr als deren Wahrheitsgehalt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764791453267",
    "categoryId": "npcs",
    "title": "Stefanie Still",
    "summary": "",
    "tags": [
      "Händler"
    ],
    "region": "Narvik",
    "body": "Stefanie Still ist eine etwa siebzehnjährige, zierliche Menschin mit zerzausten, dunkelbraunen Haaren und großer Brille, die ihr ein unscheinbares Mauerblümchen-Flair verleiht. Mit leiser, fast flüsternder Stimme führt sie den Gemischtwarenladen seriös und unaufdringlich, als wolle sie am liebsten im Hintergrund bleiben. Doch sobald das Gespräch auf Alchemie kommt, erwacht in ihr eine ungeahnte Leidenschaft: Die sonst so stille Stefanie beginnt plötzlich begeistert zu reden und ihr Fachwissen als Gesellin der Toxikalchemie sprudelt nur so aus ihr heraus.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764791536564",
    "categoryId": "npcs",
    "title": "Konsul Reinhardt Reinlich",
    "summary": "",
    "tags": [
      "Solis"
    ],
    "region": "Narvik",
    "body": "Konsul Reinhardt Reinlich ist ein etwa fünfzigjähriger, groß gewachsener Mensch mit glattem, tätowiertem Schädel und einem faltengezeichneten, nachdenklichen Gesicht. Er trägt stets ordentliche, reich verzierte Kleidung und pflegt eine elegante, fast schon altmodische Handschrift, die seine weise und bedachte Art widerspiegelt. Offen im Gespräch, aber streng in seinen Prinzipien, reagiert er äußerst empfindlich auf Unordnung und Schmutz: Flecken auf Kleidung oder staubige Stiefel können seine Stimmung im Handumdrehen kippen. Gegenüber Personen in schmutziger Kleidung zeigt er sich schnell abweisend, was seinem Ruf als pedantischer, aber zuverlässiger Konsul zusätzlich Vorschub leistet.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764791581468",
    "categoryId": "npcs",
    "title": "Levit Sebastian Sauber",
    "summary": "",
    "tags": [
      "Solis"
    ],
    "region": "Narvik",
    "body": "Levit Sebastian Sauber ist ein etwa dreißigjähriger Mensch von durchschnittlicher Größe, mit Glatze, blondem Bart und einer auffälligen Tätowierung auf der Stirn, die seine Stellung als geistlicher Lehrling kennzeichnet. Trotz seines bemüht würdevollen Auftretens und seines aufrichtigen Fleißes wirkt er oft angespannt – besonders in der Nähe von Konsul Reinhardt Reinlich. In dessen Gegenwart wird Sebastian sichtbar nervös, wägt jedes Wort doppelt ab und achtet penibel auf sein Erscheinungsbild, aus Angst, den strengen Erwartungen seines Vorgesetzten nicht zu genügen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764792566017",
    "categoryId": "npcs",
    "title": "Anton Anglerfisch",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Anton Anglerfisch ist ein Mensch mittleren Alters mit bleicher Haut und dunklem Haar, über dem fast immer seine charakteristische Zipfelmütze hängt, die ihm halb ins Gesicht rutscht. Sein Blick wirkt oft abgeschirmt und etwas müde, doch dahinter verbirgt sich eine wache Beobachtungsgabe. In ruhigen Momenten ist er fast schon stoisch, doch seine ständige, leicht genervte Angewohnheit, die Mütze mit einem kurzen Pusten aus dem Gesicht zu befördern, verrät mehr über seine Ungeduld als viele Worte.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764792666387",
    "categoryId": "npcs",
    "title": "Elena Eschenburg",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Elena Eschenburg ist eine junge Dame Mitte zwanzig, zierlich, hübsch und mit einem wachen, cleveren Blick. Ihr platinblondes, fast weißes Haar und die ungewöhnlich roten Augen verleihen ihr eine auffällige, beinahe überirdische Erscheinung, die durch ihre spitze Nase und den stets stolzen Ausdruck noch unterstrichen wird. Sie tritt oft arrogant und distanziert auf, hält andere lieber auf Abstand und zeigt wenig Interesse an gesellschaftlichem Smalltalk. Doch unter der kühlen Fassade lodert ein hitziges Gemüt – Elena wird schnell eifersüchtig, sobald jemand ihre Stellung oder Aufmerksamkeit bedroht.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764792764812",
    "categoryId": "npcs",
    "title": "Florian Freudenthal",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Florian Freudenthal ist ein junger Mensch Mitte zwanzig, mit herkuleshafter Statur, breiten Schultern und beeindruckender Muskulatur. Sein hübsches Gesicht, das goldene, mittellange Haar und die ungewöhnlichen violetten Augen machen ihn sofort zum Blickfang. Obwohl er nicht gerade für seinen Scharfsinn bekannt ist, strahlt er eine natürliche, entwaffnende Ausstrahlung aus: charismatisch, selbstbewusst und stets mit einem gewinnenden Lächeln unterwegs. Während er redet oder nachdenkt, fährt er sich ständig durch sein Haar – eine Angewohnheit, die seinen charmanten, aber etwas einfältigen Eindruck nur noch verstärkt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764792879355",
    "categoryId": "npcs",
    "title": "Paul Pforte",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Paul Pforte ist ein Mensch Mitte zwanzig mit dunklen Haaren, fahler Haut, sichtbaren Pickeln und einem ungepflegten Stoppelbart. Tiefe Augenringe und sein schwacher, etwas hängender Körperbau verleihen ihm einen permanent müden, gelangweilten und fast apathischen Ausdruck. Im Alltag wirkt er oft unbeteiligt und desinteressiert, als würde alles an ihm vorbeiziehen. Rechnen oder Zählen ist nicht seine Stärke, Paul verzählt sich schnell, was ihm gelegentlich peinliche, aber auch unfreiwillig komische Situationen einbringt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764792924827",
    "categoryId": "npcs",
    "title": "Sylvio Sparsam",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Sylvio Sparsam ist ein groß gewachsener, schmaler Mann Mitte vierzig, der trotz seines offensichtlichen Geizes stets gut gekleidet auftritt. Unter seiner schwarzen Perücke verbirgt sich wenig Eitelkeit, dafür aber ein deutliches Faible für auffällige Accessoires, insbesondere Hüte, von denen er jeden Tag einen anderen trägt. Ein schwerer Duft von Parfüm umgibt ihn ständig, als wollte er seinen Status ebenso sehr riechbar wie sichtbar machen. Als Besitzer des Amphitheaters achtet er akribisch auf Gewinne und Ausgaben, wobei sein geiziges Wesen ebenso berüchtigt ist wie seine täglich wechselnde Kopfbedeckung.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764792959927",
    "categoryId": "npcs",
    "title": "Jose Gobble",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Jose Gobble ist ein Mensch Mitte dreißig mit kurzem, nach hinten gekämmtem dunklem Haar und ausgeprägten Geheimratsecken, die ihm ein leicht gestrenges, intellektuelles Aussehen verleihen. Glatt rasiert und in der Uniform von Campari gekleidet, trägt er seine Vergangenheit als Soldat deutlich in Haltung und Auftreten, auch wenn er inzwischen als von der Hauptstadt Caldera entsandter Theaterautor arbeitet. Sobald er den Mund aufmacht, fließen seine Worte in langen, blumigen Schachtelsätzen, ausschweifend, detailverliebt und oft viel ausführlicher, als sein Gegenüber es erwartet oder erträgt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764793000609",
    "categoryId": "npcs",
    "title": "Eva Eifrig",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Eva Eifrig ist eine etwa achtzehnjährige Dame mit lockigem blondem Haar, braunen Augen und Brille, die in der schlichten Arbeitskleidung des Geschichtsmuseums, Rock und Bluse, ihren Dienst am Einlass versieht. Sie wirkt stets eifrig und hochmotiviert, begrüßt Besucher mit aufmerksamer Freundlichkeit und echtem Interesse an ihrem Arbeitsplatz. Vor lauter Begeisterung gerät sie jedoch häufig ins Schnellsprechen, sodass ihre Worte manchmal regelrecht überschlagen und nicht jeder Gast ihrem Redeschwall sofort folgen kann.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764793042108",
    "categoryId": "npcs",
    "title": "Annerose von Ahrenholtz",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Annerose von Ahrenholtz ist eine etwa siebzigjährige Dame mit schneeweißem Haar und langsamem, bedächtigem Gang, den sie mit Hilfe ihres Gehstocks bewältigt. Als Besitzerin des Geschichtsmuseums strahlt sie eine warmherzige, freundliche Ruhe aus und könnte stundenlang begeistert über vergangene Epochen erzählen. Ihre Leidenschaft für Geschichte zeigt sich besonders im Umgang mit den Exponaten: Die Sammlung ist ihr ganzer Stolz, den sie wie einen Schatz hütet, wer der Kollektion zu nahe kommt oder sie respektlos behandelt, lernt die sonst so sanfte Annerose von ihrer unerbittlich beschützenden Seite kennen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764793084836",
    "categoryId": "npcs",
    "title": "Armin Kittler",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Armin Kittler ist ein etwa vierzigjähriger Mensch mit schwarzem Seitenscheitel und markantem Oberlippenbart, der als Gruppenführer im Geschichtsmuseum mit ansteckender Begeisterung durch die Ausstellungen führt. Er rollt das „R“ so kräftig, dass manche Kinder kichern, während er mit ausgestrecktem rechten Arm und flacher Hand auf Exponate deutet – auch wenn er selbst kein Talent zum Malen hat, was er mit Humor zugibt. Freundlich, zuvorkommend und stets höflich, betont er bei jeder passenden Gelegenheit, wie wichtig Vielfalt und gegenseitiger Respekt sind, was auch zu seinem offen gelebten Eheleben mit einem männlichen Dragonborn passt. Als Geselle Artifex Pigmenta kennt er sich zudem hervorragend mit Farben und Pigmenten aus, auch wenn er sie lieber erklärt, als selbst zu Pinsel und Leinwand zu greifen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764793130038",
    "categoryId": "npcs",
    "title": "Stefan Sternburg",
    "summary": "",
    "tags": [
      "Taverne"
    ],
    "region": "Narvik",
    "body": "Stefan Sternburg ist ein etwa dreißigjähriger Mensch mit beachtlichem Bierbauch und dichtem Vollbart, der als Wirt der „Helden Taverne“ jeden Gast mit offener, gesprächiger Art empfängt. Seine tiefen Geheimratsecken lassen ihn älter wirken, doch sein herzhaftes Lachen füllt den Schankraum mit Leben. In schlichter Bürgerkleidung bewegt er sich routiniert zwischen Tresen und Tischen, immer für einen Schwank oder ein Gerücht zu haben. Wenn ihn etwas besonders amüsiert, schlägt er sich vor Lachen kräftig auf den Bauch, ein Markenzeichen, das Stammgäste schon von draußen erkennen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764793175190",
    "categoryId": "npcs",
    "title": "Erika Euter",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Erika Euter ist eine etwa dreißigjährige Frau mit breiter Statur, schwarzem lockigem Haar und einem auffälligen Muttermal unter der Lippe. Ihre rauchige Stimme und der tiefe Ausschnitt ihres Kleides machen sie in der „Helden Taverne“ schnell zur Blickfang-Figur, die selbstbewusst zwischen den Tischen hindurchschreitet. Sie ist direkt, herzlich und oft ein wenig derb in ihrem Humor, besonders, wenn es um junge Männer geht. Diese bezeichnet sie scherzhaft als ihr „Frischfleisch“ und überhäuft sie gerne mit zusätzlicher Aufmerksamkeit, neckischen Sprüchen und einem besonders vollen Krug.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako"
    ]
  },
  {
    "id": "entry-1764793476201",
    "categoryId": "factions",
    "title": "K.O.N.S.O.R.T.I.U.M.",
    "summary": "",
    "tags": [
      "Gilden"
    ],
    "region": "Campari",
    "body": "\"Königliches Organ zur Nutzungsprüfung, Sortierung, Ordnung, Rückführung, Taktischen Integration & Umverteilung Minderprivilegierter\"",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "images": [
      "images/Konsortium.png"
    ]
  },
  {
    "id": "entry-1764793739847",
    "categoryId": "quests-success",
    "title": "Quest Jacqueline Die Flut der Schatten",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Der bewusstlos angespülte Barde wird von der Fischerfamilie Hering in Kap Krako gerettet und gerät sofort in lokale Konflikte: Auf dem Marktplatz befreit er den jungen Heinrich Hering aus den Fängen des Händlers Brutus Bork und erhält dafür einen alten Schiffskompass. Kurz darauf wirbt Bürgermeister Karl-Heintz von Krako ihn als Ermittler an, um das verunglückte Handelsschiff der „Sturmkrähe“ zu untersuchen, nach möglichen Überlebenden zu suchen und eine versiegelte Kiste der Imperialen Handelsgesellschaft zu bergen. Nach der Rekrutierung weiterer Helfer auf dem Marktplatz stellt sich der Barde den unheimlichen Schatten",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako",
      "map-campari-region"
    ]
  },
  {
    "id": "entry-1764793942152",
    "categoryId": "quests-success",
    "title": "Quest Max & Kati Die Arkane Wetterfront",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Nach einer langen Reise nach Kap Krako quartieren sich der Artificer Gottfried und die Sturmzauberin Anastasia im Gasthaus zum Abendrot ein, wo der exzentrische Wetterforscher und Leuchtturmwärter Anton Anglerfisch sie um Hilfe bittet: Eine arkane Nebel- und Sturmfront bedroht die Küste. Die Helden beschaffen einen Splitter des Sturms aus dem Amphitheater sowie ein kristallisiertes Nebeltröpfchen aus den gefährlichen Nebelbänken des Hafens, wo sie einen Nebelwandler überwinden. Mit diesen Komponenten aktivieren sie Antons Wettersphäre, die den Nebel weit zurückdrängt, dabei jedoch ein unbekanntes Symbol im Herzen der Anomalie und die blockierten Gezeitenwächter offenbart – ein Erfolg, der zugleich neue Fragen aufwirft.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako",
      "map-campari-region"
    ]
  },
  {
    "id": "entry-1764794106832",
    "categoryId": "quests-success",
    "title": "Quest Valli Schatten aus der Tiefe",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Ein Schurke der ehemaligen Diebesgilde Schattenhand sitzt nach einem verratenen Gildenangriff seit zwei Monaten im Pechbuchtkerker von Kap Krako, gequält von der Erinnerung an den vermummten Verräter mit einem unbekannten Symbol auf dem Umhang. Mitten in einem aufziehenden Sturm nutzt er seine Gaunereien oder ein improvisiertes Dietrich-Werkzeug, entkommt an den Wachen vorbei und flieht durch eine verborgene Falltür in die gefährliche Kanalisation, wo er sich erst gegen eine Bande von Ratterichen, dann gegen zwei überlebende Gildenmitglieder – Karra die Kralle und Bissiger Ben – im alten Gildenversteck behauptet und dort neue Ausrüstung erbeutet. Auf dem letzten Stück des Tunnels stellt sich ihm ein riesiges Kanal-Krokodil in den Weg, das er überwinden oder umgehen muss, bevor er schließlich durch einen Gulli auf den Marktplatz steigt – frei, bewaffnet und bereit, eines Tages die Wahrheit über den Verrat an der Schattenhand aufzudecken.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako",
      "map-campari-region"
    ]
  },
  {
    "id": "entry-1764794308521",
    "categoryId": "quests-success",
    "title": "Quest 1 „Das Erwachen in der Tiefe“",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Seit Wochen verschwinden Leute in Kap Krako, während Chitin artige Kratzgeräusche aus der Kanalisation die Stadt in Unruhe versetzen. Graf Karl-Heintz von Krako beauftragt die Helden gemeinsam mit dem Solis-Leviten Fimbur, der chaotische Energien spürt, der Sache nachzugehen. Nach Gesprächen mit Zeugen wie Harald Hering steigen sie in die alten, ruinendurchzogenen Abwasserkanäle hinab, trotzen Fallen und Horden übermächtiger Ratten, bis sie in einer unterirdischen Halle das Nest einer intelligenten, mutierten Rattenkönigin entdecken, die eine ganze Brut kontrolliert. Durch Kampf oder gezielte Sabotage vernichten die Helden die Königin und ihre Schwärme, stoppen die sich ausbreitende Plage und kehren als Retter einer vor dem Abgrund stehenden Stadt zurück, reich belohnt und mit dem Wissen, welches Grauen unter Kap Krako geschlummert hat.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako",
      "map-campari-region"
    ]
  },
  {
    "id": "entry-1764794493851",
    "categoryId": "quests-success",
    "title": "Quest 2 „Das Vermächtnis der Ahnen“",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Im Geschichtsmuseum von Kap Krako bittet Baronin Annerose von Ahrenholtz die Helden, ein uraltes, imperianisches Tagebuch aus der Gründerzeit zu entschlüsseln, das in keiner Chronik verzeichnet ist. Die Rätsel des Buches führen sie durch das Museum: vom Drachenwappen mit verborgenem Schlüssel über die Ahnenuhr mit Geheimfach bis hin zur Mosaik-Karte Kap Krakos, deren östliche Kompassrose eine verborgene Falltür zu einer unterirdischen Kammer öffnet. Dort offenbart eine Inschrift den letzten Hinweis auf einen seit 600 Jahren verschlossenen Safe im Horizontia-Finanzhaus, der nur dem jeweiligen Museumsbesitzer zusteht. Die Helden lösen das Vermächtnis, öffnen den Safe und bergen eine makellos erhaltene rote Drachenschuppe – als Dank erhalten sie von Annerose eine goldene Museumsmitgliedschaft mit lebenslangem freien Eintritt und besonderen Belohnungen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako",
      "map-campari-region"
    ]
  },
  {
    "id": "entry-1764794608634",
    "categoryId": "quests-success",
    "title": "Quest 3 „Die Masken fallen“",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Im ausverkauften Amphitheater von Kap Krako, kurz vor der Premiere des Dramas Feuertaufe, werden die Helden als vermeintliche Regieassistenten eingeschleust, um eine Serie drohender Erpresser schreiben aufzuklären. Hinter der Bühne ermitteln sie zwischen Schauspielern, Technikern und dem nervösen Theaterleiter Sylvio Sparsam, dessen heimliche Vaterschaft zu Hauptdarstellerin Elena ans Licht zu kommen droht. Durch Nachforschungen, Schriftvergleiche und versteckte Beweise führen alle Spuren schließlich zu Roderick Runenschreiber, einem ehemaligen Söldner und heutigen Theatermitarbeiter, der aus Rache für die Opferung von Cassandra – Elenas Mutter – Sylvios Vergangenheit öffentlich machen will. Im dramatischen Finale stellen die Helden ihn vor oder während der Aufführung, vereiteln seinen Plan und sichern sowohl den Erfolg der Premiere als auch den Ruf des Theaters, während die Wahrheit über Sylvios Schuld kontrolliert ans Licht kommt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako",
      "map-campari-region"
    ]
  },
  {
    "id": "entry-1764794881942",
    "categoryId": "quests-success",
    "title": "Quest 5 „Schatten über Glanz“",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "In Kap Krako werden die Held:innen von Sklavenjägern des Konsortiums attackiert und stoßen dabei auf Hinweise zum abgelegenen Lager G.L.A.N.Z., einer scheinbar legalen „Arbeitskräfteanstalt“, die sich als perfide Sklavenschmiede entpuppt. Unter falscher Identität schleusen sie sich ein, treffen den versklavten Thomas Liberta und brechen in das Herrenhaus der Familie Schimmer ein, wo sie das geheime Sklavenregister finden: Seine Frau Bianca wurde in ein Freudenhaus in den Kolonien verkauft, seine Tochter Bella als „Prämie“ an die Flutwerft von Kap Krako. Die Suche nach Bella endet in einer bitteren Entscheidung, als sie bereits von der zerstörerischen Sklavenmagie zerfressen ist, und bei der Rückkehr ins Lager müssen die Held:innen erfahren, dass Thomas und die übrigen Minenarbeiter kurzerhand hingerichtet wurden – das ganze Ausmaß des Systems aus Menschenverachtung und Ausbeutung liegt nun offen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako",
      "map-campari-region"
    ]
  },
  {
    "id": "entry-1764795004345",
    "categoryId": "quests-success",
    "title": "Prolog Quest Das Flüstern der Gezeiten",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Nach dem Untergang des Handelsschiffs Sturmkrähe vor Kap Krako werden die Helden entsandt, das Wrack zu untersuchen. Dort treffen sie auf einen Werhai, der sich nach seinem Fall als verfluchter Mann namens Kreios entpuppt und Hinweise auf eine Banditenhöhle an der Küstenklippe liefert. In der schwer bewachten Räuberfestung – je nach Vorgehen per Frontalangriff, Infiltration oder Täuschung – stellen sie sich dem Anführer Garrik Schwarzfaust und seinen Elitewachen. In der verborgenen Schatzkammer finden sie die Beute des Überfalls, darunter einen magischen Ring und eine versiegelte Kiste der Imperialen Handelsgesellschaft, und kehren anschließend nach Kap Krako zurück, wo sie für die Aufklärung des Schiffsunglücks reich belohnt werden;",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "city-hafenstadt-Kap Krako",
      "map-campari-region"
    ]
  },
  {
    "id": "entry-1764795113916",
    "categoryId": "quests-success",
    "title": "Die Wyvernjagd am Wiesenweg",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Auf dem Weg zum Grenzposten schließen sich die Helden dem Reisenden Rudi Radler an, als nachts ein Wyvern herabstößt, ein Pferd tötet und wieder in der Dunkelheit verschwindet. Am Grenzposten vermittelt Rudi sie an die Monsterjägergilde, die sie zunächst damit beauftragt, die rätselhaften Angriffe entlang des Wiesen Wegs zu untersuchen. Anhand von Giftspuren, Schuppen, zerfetzten Leichen und zerstörten Planwagen identifizieren sie eindeutig einen Wyvern als Täter und erhalten daraufhin den offiziellen Auftrag zur Jagd. Mit dem erfahrenen Jäger John Jonsen spüren sie das Nest an einer Klippe auf, stellen das Biest im Kampf",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "map-campari-region",
      "entry-1764790268469"
    ]
  },
  {
    "id": "entry-1764795251252",
    "categoryId": "quests-success",
    "title": "Die bebende Reliquie",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Am Grenzposten erhalten die Helden von einem besorgten Forscher den Auftrag, eine verstummte Ausgrabungsstätte zu untersuchen, von der seit der Bergung eines Relikts jede Nachricht ausblieb. Vor Ort stellen sie fest, dass ein Erdelementar-Myrmidone und zwei Erdelementare durch das Relikt geweckt wurden und nun das Gebiet mit zerstörerischen Erdbeben attackieren. Nach dem Sieg über die Kreaturen bergen sie das Relikt – einen Schwertgriff, der den Schaden einer einmalig daran angeschmiedeten Klinge verdoppelt – und bringen ihn zurück zum Grenzposten. Der dortige Meister bestätigt seine Macht und überlässt den Helden den Griff als Belohnung.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "map-campari-region",
      "entry-1764790268469"
    ]
  },
  {
    "id": "entry-1764795350495",
    "categoryId": "quests-failed",
    "title": "Wolfgang für die Arena",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "Monsterjäger John Jonson erhält den Auftrag, einen riesigen Wolf lebend für die Arena in Solen Aue zu fangen und zieht mit den Helden, Eugen, einem Waldläufer, sowie den Söldnerzwillingen Sören und Sönke in den Klagewald. Mit Seilen, Maulkorb und Käfig ausgerüstet folgen sie den Spuren des Tieres und schlagen sich durch mehrere Wolfsrudel. Tief im düsteren Wald stellen sie schließlich den gewaltigen Wolf – doch im entscheidenden Kampf explodiert die Kreatur, reißt Sören und Sönke in den Tod und macht jeden Fang unmöglich. Die Mission gilt als fehlgeschlagen, John, die Helden und Eugen kehren ohne Beute, aber mit einem neuen Trauma aus dem Klagewald zurück.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": false,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1764795967018",
    "categoryId": "cities",
    "title": "Hafenstadt Kap Krako",
    "summary": "",
    "tags": [
      "Küste",
      "Handel"
    ],
    "region": "Narvik",
    "body": "Kap Krako, das „Tor zur neuen Welt“, ist eine gewaltige Hafenstadt, die an einer sturmgegerbten Klippe klebt. Der Ruf der Möwen mischt sich mit dem Knarren der Takelage und dem metallischen Klirren von Ketten, während endlose Reihen von Kolonieschiffen be- und entladen werden. Gold, Gewürze und exotische Waren fließen hier zusammen – und mit ihnen Gier, Neid und geheime Abmachungen in dunklen Ecken.\n\nStimmung:\n\nGeschäftig, angespannt, permanent in Bewegung – tagsüber schreien Händler, nachts grölen Matrosen.\n\nReichtum und Elend liegen dicht beieinander: Prunkvolle Herrenhäuser überblicken schmutzige Dockgassen.\n\nDie Stadtwache ist scharf organisiert, aber längst von Handelshäusern und Schmugglern durchsetzt.\n\nEine starke Sonnenreligion (Solis) prägt Rituale, Segnungen von Schiffen und öffentliche Feste.\n\nGerüchte über fehlende Lieferungen von „Rotem Erz“ heizen Spekulation, Schwarzmarkt und Unruhen an.\n\nWichtige Punkte:\n\nDie Hauptdocks: Offizielle Anlegestellen für den gesamten Kolonialhandel. Hier liegen die schwer bewaffneten Kriegsschiffe Seite an Seite mit voll beladenen Handelern. Zollbeamte und Schreiber rennen mit Wachssiegeln und Pergamenten umher.\n\nDie Pechbucht & Kerker: Eine dunkle Bucht unterhalb der Klippen, in deren feuchtem Gestein der Stadtkerker liegt. Hier enden Piraten, säumige Schuldner – und gelegentlich politisch unliebsame Personen. Die Schreie der Gefangenen vermischen sich mit dem Donnern der Brandung.\n\nFestung von Kap Krako: Eine massige Küstenfestung mit Geschützstellungen, die die Hafeneinfahrt kontrollieren. Sitz der Garnison und Rückgrat der Verteidigung gegen Piraten, feindliche Mächte und Aufstände in den Docks.\n\nHerrenhaus des Stadtherrn: Ein prächtiger Bau oberhalb der Stadt, von Gärten und Wachen umgeben. Hier residiert der Gouverneur, der offiziell König und Krone vertritt – inoffiziell aber oft nach der Pfeife der reichsten Handelshäuser tanzt.\n\nHorizontia-Finanzhaus: Das Herz des Geldflusses. In diesem monumentalen Kontorhaus werden Kredite für Kolonieexpeditionen vergeben, Waren versichert und riesige Summen verschoben. Wer hier Einfluss hat, lenkt den Handel der „Neuen Welt“.\n\nSchwarzmarkt in der Kanalisation: Tief unter den Straßen, in alten Kanalstollen, findet der inoffizielle Handel statt: Rotes Erz aus illegalen Quellen, geschmuggelte Kolonialwaren, Sklavenverträge und verbotene Artefakte. Zugang nur über versteckte Luken in Tavernen und hinter den Ständen des Marktplatzes.\n\nSolis-Tempel & Statue: Ein strahlender Tempel mit einer großen Solis-Statue, die über den Hafen blickt. Kapitäne lassen ihre Schiffe vor Ausfahrt segnen, und Feiertage zu Ehren der Sonne füllen Amphitheater und Marktplatz gleichermaßen.\n\nLeuchtturm an der Klippe: Ein hoher Turm, dessen Licht die gefährlichen Riffe rund um Kap Krako markiert. Gleichzeitig Beobachtungsposten für fremde Segel am Horizont.\n\nMilitärlager & Wachposten: Am Rand der Stadt befinden sich Kasernen und Übungsplätze. Überall in den Straßen stehen kleinere Wachposten, die eher für Ordnung „in den Augen der Obrigkeit“ sorgen, als für Gerechtigkeit.\n\nMarktplatz von Kap Krako: Dreh- und Angelpunkt für lokale Händler, Gerüchte und Rekrutierungen für Expeditionen. Boten schreien Nachrichten aus den Kolonien, während Schreiber öffentliche Bekanntmachungen verlesen.\n\nAmphitheater: Schauplatz für Verkündung neuer Handelsverträge, religiöse Feiern zu Ehren von Solis und gelegentlich für Schaukämpfe, die Menge und Militär gleichermaßen bei Laune halten.\n\nGeschichtsmuseum des Aufbruchs: Ein stolzes Haus voller Karten, Kolonialartefakte und Erinnerungsstücke großer Expeditionen. Zwischen den Exponaten verstecken sich jedoch auch Hinweise auf vergessene Wahrheiten – und mögliche Abenteuerhaken.\n\nTavernenviertel (2 große Tavernen): Direkt an der Hafenpromenade. Hier trinken Matrosen, Söldner, Abenteurer und Schreiber nebeneinander. Informationen wechseln schneller den Besitzer als Münzen – und so manches Geschäft beginnt mit einem betrunkenen Handschlag.\n\nMilitärischer Sportverein: Ein rauer Club für Soldaten, Hafenarbeiter und Söldner. Ringen, Waffentraining und Faustkämpfe sind hier alltäglich. Wer sich Respekt verschaffen will, tut es in der Arena dieses Vereins.\n\nGemischtwarenladen: Ein unscheinbarer Laden nahe des Marktplatzes, der „alles ein bisschen“ führt – von Seilen und Lampenöl bis zu Notrationen. Ideal für Abenteurer, die sich vor der nächsten Überfahrt in die Neue Welt ausstatten wollen.\n\nKap Krako ist damit mehr als nur ein Hafen: Es ist ein Nadelöhr, durch das die Zukunft der Kolonien gepresst wird – und jeder, der hier Einfluss gewinnt, schreibt ein Stück dieser Geschichte mit.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-03",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [
      "map-campari-region"
    ],
    "images": [
      "images/Kap Krako.png"
    ]
  },
  {
    "id": "entry-1765394957251",
    "categoryId": "npcs",
    "title": "Jakob Jakobsen",
    "summary": "",
    "tags": [
      "Gasthaus"
    ],
    "region": "Narvik",
    "body": "Jakob Jakobsen ist ein etwa fünfzigjähriger Mann mit weißem Haar, stets gut gekleidet und gepflegt, von unauffälliger, normaler Größe. Als Wirt des Gasthauses „Zum Abendrot“ strahlt er eine ruhige, beinahe beruhigende Präsenz aus. Er kennt unzählige Drinks und Mischungen, hört seinen Gästen aufmerksam zu und merkt sich ihre Vorlieben, doch er drängt sich nie in den Vordergrund. Jakob spricht selten von sich aus, er redet nur, wenn man ihn direkt anspricht, dann aber klar, knapp und auf den Punkt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765395085504",
    "categoryId": "npcs",
    "title": "Nina de Neuri",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Nina de Neuri ist eine etwa zwanzigjährige, schlanke Dame mit auffallend rotem Haar, von dem eine Strähne stets eines ihrer Augen bedeckt, und damit die Narbe verbirgt, die darunter liegt. Hübsch, flink und stets zuvorkommend, saust sie durch das Gasthaus „Zum Abendrot“, merkt sich Bestellungen im Handumdrehen und hat immer ein offenes Ohr für die neuesten Gerüchte. Sie liebt Klatsch und Tratsch und sammelt beiläufig jedes Fetzen Gossip, während sie die Tische bedient. Dabei korrigiert sie unablässig ihre Haare, schiebt die störende Strähne hinters Ohr, nur damit sie kurz darauf wieder ins Gesicht fällt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765395226035",
    "categoryId": "npcs",
    "title": "Klaus Konform",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Klaus Konform ist ein etwa fünfzigjähriger Mensch von imposanter Größe und robuster Statur, mit heller Haut, schwarzem Haar und stets tadellos sitzender Butlerkleidung. Er ist stumm – ihm fehlt die Zunge, doch sein Schweigen macht ihn nicht unsichtbar: Mit ruhiger Präsenz, klaren Gesten und geübten Blicken ist er immer genau dann zur Stelle, wenn man ihn braucht. Hilfsbereit, stark und zuverlässig erledigt er seine Aufgaben im Gasthaus wortlos, aber mit einer Effizienz, die lauter spricht als jede Stimme.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765395358721",
    "categoryId": "npcs",
    "title": "Tina Zinnschuppe",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Tina Zinnschuppe ist eine etwa dreißigjährige, schlanke Dragonborn mit glänzenden silbernen Schuppen, die hinter dem Empfangstresen des Gasthauses stets einen gepflegten und perfekt arrangierten Eindruck macht. Freundlich im Ton und hervorragend organisiert, behält sie Zimmer, Gäste und Reservierungen spielend im Blick. Doch so kontrolliert ihr Auftreten auch wirkt: Ihre Geduld hat Grenzen. Wenn jemand sie unnötig aufhält, Unordnung verursacht oder dauernd dieselben Fragen stellt, wird Tina schnell reizbar, ihre Stimme wird knapp, ihr Blick kalt, und man merkt sofort, dass man besser wieder in geordneten Bahnen funktioniert.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765395462561",
    "categoryId": "npcs",
    "title": "Wendy Wischen",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Wendy Wischen ist eine etwa 25-jährige, schlanke Frau, die als Magd im Badhaus des Gasthauses arbeitet. Mit Badehaube auf dem Kopf, sportlicher Ausdauer und stets freundlichem Lächeln wirbelt sie zwischen Wannen, Eimern und Handtüchern hin und her. Dabei wirkt sie oft ein wenig dusselig und vergesslich: Namen, Zeiten oder Anweisungen rutschen ihr leicht wieder aus dem Kopf. Daher kommt es häufig vor, dass sie dieselben Fragen zweimal stellt, jedoch so höflich und liebenswert, dass man ihr nur selten böse sein kann.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765395564325",
    "categoryId": "npcs",
    "title": "Harald Hering",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Harald Hering ist ein Mensch mittleren Alters und Vater der Familie, robust gebaut, sehr groß gewachsen und von der Sonne gebräunt. Seine blauen Augen und die Glatze stehen im Kontrast zu seinem dichten schwarzen Vollbart, in dem sich bereits erste graue Strähnen zeigen. Er wirkt wie jemand, der zupacken kann und viel arbeitet, doch hinter der kantigen Fassade steckt ein lebensfroher Schelm: Harald ist bekannt für seine dummen Witze, die oft eher ein Kopfschütteln als schallendes Gelächter ernten, aber genau das ist zu seinem liebevollen Markenzeichen geworden.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765395638659",
    "categoryId": "npcs",
    "title": "Heidrun Hering",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Heidrun Hering ist eine Dame mittleren Alters und Mutter der Familie, klein und zierlich, mit hübschem Gesicht, roten Haaren und vielen Sommersprossen, die ihr ein warmes, lebendiges Aussehen verleihen. Als Hausfrau ist sie ständig in Bewegung, zwischen Küche, Haushalt und Familie, die feinen Schnittnarben an ihren Fingern zeugen von jahrelanger Arbeit mit Messern, Töpfen und Pfannen. Trotz aller Mühen wirkt sie selten erschöpft, sondern eher aufgekratzt und voller Energie: Heidrun ist äußerst redefreudig, plaudert gern über alles und jeden und füllt jedes Schweigen sofort mit Geschichten, Kommentaren oder besorgten Nachfragen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765395819775",
    "categoryId": "npcs",
    "title": "Heinrich Hering",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Heinrich Hering ist das mittlere Kind der Familie, ein vierzehnjähriger, zierlicher Junge mit blasser Haut, schwarzen Haaren, Sommersprossen und einer ständig verrutschten Brille auf der Nase. Ein echtes Muttersöhnchen, das lieber liest, lernt und nachdenkt, als draußen herumzutoben. Heinrich ist belesen, wissbegierig und von unstillbarer Neugier getrieben, besonders, wenn es um Magie geht, für die er eine natürliche Begabung zeigt. Fremden gegenüber wirkt er jedoch sehr nervös: Er spielt ständig an seiner Brille herum und vermeidet es, anderen direkt in die Augen zu schauen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765395971737",
    "categoryId": "npcs",
    "title": "Hilde Hering",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Hilde Hering ist das älteste Kind der Familie, eine sechzehnjährige, groß gewachsene Menschenfrau mit robustem Körperbau und kurzen, roten Haaren. Sie tritt selbstbewusst auf, ist laut, extrovertiert und fühlt sich in der Nähe von Sportplätzen und Trainingshallen deutlich wohler als in stickigen Stuben. Oft wirkt sie wie ein echtes Mannsweib, direkt, unerschrocken und immer bereit, sich zu beweisen. Ihre größte Schwäche ist zugleich ihre Stärke: Hilde ist fest von sich selbst überzeugt und dabei häufig vorlaut, was sie leicht mit Autoritätspersonen oder ruhigeren Gemütern anecken lässt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396107110",
    "categoryId": "npcs",
    "title": "Henrietta Hering",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Henrietta Hering ist das jüngste Kind der Familie, ein zwölfjähriges, zierliches Mädchen mit schwarzen Haaren, vielen Sommersprossen und einem hübschen, offenen Gesicht. Sie ist überraschend athletisch, immer in Bewegung und freundet sich mit beinahe jedem an, der ihren Weg kreuzt, Grenzen oder ein „Nein“ kennt sie dabei kaum. Sozial, warmherzig und neugierig ohne Ende, löchert sie ihre Umgebung mit einem ständigen Strom von Fragen. Ihre Haut ist durch Klettereien, Stürze und Abenteuer oft aufgeschürft, doch das scheint sie kaum zu bremsen: Henrietta stürzt sich furchtlos in jedes neue Erlebnis und in jedes neue Gespräch.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396197967",
    "categoryId": "npcs",
    "title": "Baron (Gerhard) von Groschen",
    "summary": "",
    "tags": [
      "Bank"
    ],
    "region": "Narvik",
    "body": "Baron Gerhard von Groschen ist ein fünfzigjähriger Mensch mit vollem, schwarz-grauem Haar, das zu einem strengen Manbun gebunden ist, und einem markanten Unterlippenbart. In guten, wohlgeschnittenen Kleidern und mit korpulenter Statur wirkt er wie die personifizierte Ruhe des Geldadels. Als Bankbesitzer strahlt er Gelassenheit und Kontrolle aus, beobachtet viel und spricht wenig, doch seine Hände verraten ihn: Ständig lässt er eine Goldmünze über die Finger tanzen, wirft sie in die Luft und fängt sie wieder auf, wie ein nervöses Ritual, das ihn immer begleitet.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396285937",
    "categoryId": "npcs",
    "title": "Phil Pfennig",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Phil Pfennig ist ein siebzehnjähriger Mensch mit kurzen, roten, gepflegten Haaren und insgesamt ordentlicher, schlanker Erscheinung. In der typischen Arbeitskleidung der Bank wirkt er stets seriös und zuverlässig. Seine zuversichtliche, hilfsbereite und selbstsichere Ausstrahlung macht ihn bei Kunden und Kollegen gleichermaßen beliebt. Obwohl er kompetent wirkt, verlässt er sich ungern nur auf sein Gefühl. Phil liest vieles im Nachhinein noch einmal nach, vertieft sich in Regelwerke und Schriftstücke, um wirklich sicherzugehen, dass er nichts übersehen hat.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396378895",
    "categoryId": "npcs",
    "title": "Martin Mähne",
    "summary": "",
    "tags": [
      "Stall"
    ],
    "region": "Narvik",
    "body": "Martin Mähne ist ein siebzehnjähriger Mensch mit langen blonden Haaren, die er zu einem Pferdeschwanz gebunden trägt. Gut gebaut und athletisch, mit grünen Augen und glattem Gesicht, wirkt er wie jemand, der mehr Zeit im Stall als in der Stadt verbringt. In seiner schlichten Stallarbeitskleidung fühlt er sich am wohlsten, dicht an Pferden, Vieh und anderen Tieren. Für Menschen hingegen hat er meist wenig übrig: Er hält sich zurück, wirkt wortkarg und reserviert, öffnet sich aber sofort, wenn es um das Wohl seiner geliebten Tiere geht.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396453342",
    "categoryId": "npcs",
    "title": "Feldwebel (Eberhart) Eisen",
    "summary": "",
    "tags": [
      "Händler",
      "Stadtwache"
    ],
    "region": "Narvik",
    "body": "Feldwebel Eberhart Eisen ist ein etwa vierzigjähriger Mensch mit Glatze, dichtem braunem Vollbart und stämmiger Statur, der in seiner Rüstung wie ein wandelnder Bollwerk wirkt. Seine dunkelbraunen Augen mustern die Umgebung wachsam und streng, gewohnt an Drill, Disziplin und das Chaos des Schlachtfelds. Er spricht knapp, gibt klare Befehle und duldet keinen Widerspruch, dennoch merkt man, dass er sich um seine Leute kümmert. In ruhigeren Momenten jedoch verrät ihn eine seltsame Angewohnheit: Eberhart knabbert gedankenverloren an seinem Stift, während er Berichte schreibt oder Wachpläne entwirft, als müsste er seine Härte mit einem kleinen, menschlichen Tick ausbalancieren.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396526800",
    "categoryId": "npcs",
    "title": "Baron (Bernhardt) Bug",
    "summary": "",
    "tags": [
      "Händler",
      "Schiffe"
    ],
    "region": "Narvik",
    "body": "Baron Bernhardt Bug ist ein 36-jähriger Mensch mit kurzem schwarzem Haar, markanter Augenklappe und einer sorgfältig gepflegten Kombination aus Ziegenbärtchen und gezwirbeltem Schnauzbart. Sein Auftreten ist selbstbewusst und leicht theatralisch, als wüsste er genau, welche Wirkung er auf seine Umgebung hat. Während er spricht oder nachdenkt, wandert seine Hand fast unwillkürlich immer wieder zu seinem Bart: Er zwirbelt die Spitzen, streicht darüber oder zupft einzelne Härchen zurecht, eine Manierismus, der genauso zu ihm gehört wie die Augenklappe selbst.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396600961",
    "categoryId": "npcs",
    "title": "Baronin Shireen Schimmer",
    "summary": "",
    "tags": [
      "Händler",
      "Sklaven"
    ],
    "region": "Narvik",
    "body": "Baronin Shireen Schimmer ist eine etwa fünfzigjährige Menschin mit aschblondem Haar, das zu einer kunstvollen Besforta-Frisur hochgesteckt ist, geschmückt mit einer einzelnen weißen Rose. Schlank und durchtrainiert, mit blasser Haut und von Narben gezeichneter Vergangenheit, wirkt sie zugleich fragil und gefährlich beherrscht. In ein schwarzes, viktorianisches Kleid gehüllt und mit tiefschwarzen Augen, die schwer zu lesen sind, spricht sie mit überraschend sanfter Stimme.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396763616",
    "categoryId": "npcs",
    "title": "Antonio Schimmer",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Antonio Schimmer ist ein etwa dreißigjähriger Mensch von beeindruckender Größe, mit kurz nach hinten gegeltem schwarzem Haar, Stoppelbart und bleicher Haut. Seine vollständig schwarzen Augen, Iris und Pupille, verleihen ihm eine unheimliche, beinahe übernatürliche Aura. Gekleidet in einen Tweed-Anzug mit Trenchcoat im Stil der „Peaky Blinders“, wirkt er wie ein Profi, der an Gewalt gewöhnt ist und sie nicht scheut. Als Kämpfer strahlt er ständige Wachsamkeit und unterschwellige Bedrohung aus; seine Hände sind selten still, denn er spielt unablässig mit seiner Waffe, dreht sie in der Hand, prüft das Gewicht oder lässt die Finger über Griff und Klinge gleiten.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396840818",
    "categoryId": "npcs",
    "title": "Suvi Schimmer",
    "summary": "",
    "tags": [
      "Händler",
      "Sklaven"
    ],
    "region": "Narvik",
    "body": "Suvi Schimmer ist eine 27-jährige Menschin mit schlanker Gestalt, blonden Haaren und blasser Haut, deren vollständig schwarze Augen, Pupille und Iris, ihr ein geheimnisvolles, leicht unheimliches Aussehen verleihen. In ein viktorianisches, rotes Kleid gekleidet, wirkt sie zugleich edel und entrückt. Ihr ständiger Begleiter ist ein Fächer, unten schwarz und oben rot, hinter dem sie sich gerne halb versteckt. Während Gesprächen lugt sie oft nur halb dahinter hervor und spielt nervös oder verspielt mit den Fächerblättern, ein Gestus, der sowohl Schüchternheit als auch berechnende Zurückhaltung andeuten kann.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396917649",
    "categoryId": "npcs",
    "title": "Mattias Matt ",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Mattias Matt ist ein dreißigjähriger Mensch mit sonnengeküsster Haut und athletischer Statur, der in einem hellen Anzug im Stil von Antonio stets gepflegt auftritt. Sein glatt rasiertes Gesicht und die kurz nach hinten gegelten, dunkelbraunen Haare verleihen ihm ein elegantes, kontrolliertes Erscheinungsbild, das im Kontrast zu seinen vollständig schwarzen Augen steht, Pupillen und Iris, die ihn geheimnisvoll wirken lassen. Meist sieht man ihn mit einer Pfeife, aus der er ruhig und überlegt raucht; der aufsteigende Rauch scheint seine Gedanken zu begleiten, denn Mattias’ markanteste Angewohnheit ist es, fast ununterbrochen an seiner Pfeife zu ziehen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765396986657",
    "categoryId": "npcs",
    "title": "Vivien Vitale",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Vivien Vitale ist ein neunjähriges Menschenmädchen mit langen braunen Haaren, blauen Augen und einem Gesicht voller Sommersprossen, das meist von einer Schleife im Haar und einem Kleid mit kleinen Schleifen eingerahmt wird. Ihren abgenutzten Teddybären trägt sie überall mit sich herum, verborgen darin steckt ein unauffälliger Tracker, denn sie hat die Angewohnheit, ständig zu verschwinden, um Neues zu entdecken. Vivien ist ungewöhnlich neugierig und für ihr Alter sehr intelligent; sie stellt unermüdlich Fragen, beobachtet genau und merkt sich Zusammenhänge, die vielen Erwachsenen entgehen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1765397096985",
    "categoryId": "npcs",
    "title": "Stefani Stress",
    "summary": "",
    "tags": [],
    "region": "Narvik",
    "body": "Stefani Stress ist eine vierzigjährige, korpulente Menschin mit langen, braunen, bereits ergrauenden Haaren, die unter ihrer Haube streng hochgesteckt sind. In schlichter Magdkleidung verrichtet sie im Hause Schimmer ihre Arbeit, doch ihre grünen Augen mit dunklen Ringen verraten sofort Erschöpfung und Überlastung. Sie wirkt ständig gehetzt, abgearbeitet und innerlich am Limit, jede neue Aufgabe scheint der berühmte Tropfen zu sein, der das Fass zum Überlaufen bringen könnte. Ihr ganzes Auftreten schreit nach Burnout, doch sie macht trotzdem weiter, weil sie glaubt, keine andere Wahl zu haben.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-10",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766259648182",
    "categoryId": "gods",
    "title": "Solis",
    "summary": "",
    "tags": [
      "Götter"
    ],
    "region": "",
    "body": "1. Nutze das Licht des Tages in Fleiß und Tatkraft, auf dass dein Leben fruchtbar sei.\n\n2. Greife nicht zur Tat, die das Leben schädigt, es sei denn, es diene dem höheren Wohl.\n\n3. Gehorche der Ordnung, die das Gefüge der Welt zusammenhält, und füge dich ihr mit redlichem Herzen.\n\n4. Erweise den Verstorbenen Ehre, denn ihre Werke hallen in der Ewigkeit wider.\n\n5. Preise das Werk der Hand, denn in der Schmiede des Fleißes offenbart sich die Größe der Sterblichen.\n\n6. Führe nie Krieg aus törichtem Zorn, doch wenn du gezwungen wirst, so kämpfe mit brennendem Herzen und vernichte die Feinde, die dir entgegentreten.\n\n7. Wandle stets auf dem Pfad der Erneuerung, wie der Baum, der Jahr um Jahr wächst und erstarkt.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-20",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "images": [
      "images/Solis.png"
    ]
  },
  {
    "id": "entry-1766259787330",
    "categoryId": "gods",
    "title": "Nox",
    "summary": "",
    "tags": [
      "Götter"
    ],
    "region": "",
    "body": "1. Der Tod ist das ewige Rad, das sich unaufhaltsam dreht – fürchte es nicht, sondern erkenne seine Wahrheit.\n\n2. Suche Wissen, denn es ist der Schlüssel, der die Tore der Macht und des Fortschritts öffnet.\n\n3. Ergründe die verborgenen Künste, denn in den Tiefen der Arkana schlummert die Wahrheit der Welt.\n\n4. Suche den Bund mit deinen Nächsten, denn in der Eintracht liegt Stärke, wo List allein versagt.\n\n5. Ruhe, wenn die Arbeit getan ist, und finde Frieden in der Stille, denn jeder Tag muss ein Ende haben.\n\n6. Hinterfrage jene, die herrschen, denn keine Krone ist ewig, und keine Ketten sind unzerbrechlich.\n\n7. Nutze den Sturm, wie der Seemann die Winde nutzt – mache dir die Launen der Welt zu eigen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-20",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "images": [
      "images/Nox.png"
    ]
  },
  {
    "id": "entry-1766260454899",
    "categoryId": "tutorials",
    "title": "Tutorial Berufe",
    "summary": "",
    "tags": [
      "Tutorials"
    ],
    "region": "",
    "body": "Willkommen ihr kleinen Bastelheinis.\nHeute erkläre ich euch, wie ihr die nötigen Fähigkeiten lernt, um Dinge zu erschaffen, die nicht explodieren – meistens.\n\nWähle deinen Weg – und zwar mit Stil!\n\nEs gibt sieben heilige Berufe, und ich beherrsche sie alle. Weil ich’s kann. Du? Du fängst bei null an. Aber hey, nicht jeder kann Lucius sein.\n\nDie 7 Berufungen des Handwerkspfades:\n\nAlchemist – Mischel, braue, und verpeste.\nArtifex – Meister der mechanischen Magie (aka: Nerd mit Werkzeug).\nKesselmagus – Hexenkessel + Magie = Chaos.\nRunenschmied – Gravieren mit Stil und Magie.\nSchmied – Hämmer hart oder geh nach Hause.\nSchneider – Schick in Stoff oder nackt in Schande.\nSkriptor – Schreiben mit Stil. Und Tinte. Und Tentakeln, manchmal.\n\nFehlt was? Kann sein. Vielleicht kommt noch was. Vielleicht stirbst du vorher. Surprise!\n\nTräume groß. Oder wenigstens spezifisch.\n\nWillst du der beste Alchemist der Welt sein? Oder nur jemand, der aus Versehen eine Wurzel mit einer Katze verwechselt? Entscheide dich.\n\nSchnüffle durch die Welt. Schau, was jeder Beruf so drauf hat. Frag Lehrer, NPCs oder schau einem Handwerker beim Arbeiten zu, während du dich in einem Busch versteckst (nicht empfohlen, Gesetzeslage unklar).\n\nKauf dir ein Buch, du Gierschlund\n\nJede Reise beginnt mit einem Schritt. Und einer Zahlung in bar.\n\nBeruf gefunden. Perfekt. Schnapp dir beim Händler deines Vertrauens das passende Lehrlingsbuch für deinen Wunschberuf.\n\nBücher kosten Geld.\nWissen kostet noch mehr.\nDummheit ist kostenlos, aber sehr teuer auf Dauer.\n\nStudium oder Seelenhandel?\n\nEntweder du bringst die Disziplin eines Bibliothekars mit – oder du schleimst dich bei einem Meister ein, bis er dich nicht mehr ignorieren kann.\n\nDu hast zwei Optionen:\n\nSelbststudium – Du bist der einsame Held. Oder der Einsiedler mit zu viel Freizeit.\nLehrer finden – Und dann: Schmeicheln, schmeicheln, eventuell kochen. Tausch ihm Zeit gegen deine Seele – oder Gold. Lehrer mögen beides.\n\nVom Loser zum Lederprofi: Aufstieg der Stufen\n\nDu beginnst als Lehrling. Mit Glück wirst du Geselle. Mit Blut, Schweiß und Tränen: Meister. Oder wie ich der für dich unerreichbare: Ultra-Über-Obermeister.\n\nJede Stufe braucht ein neues Buch. Und wieder: Kaufen. Mit Geld. Kein Feilschen. Kein Meckern.\n\nRang: Lehrling\nBenötigt: Lehrlingsbuch\nBeschreibung: Grundlagen. Viel Scheitern.\n\nRang: Geselle\nBenötigt: Gesellenbuch\nBeschreibung: Solides Können. Weniger Feuer.\n\nRang: Meister\nBenötigt: Meisterbuch\nBeschreibung: Wahre Macht. Und Stil.\n\nAch ja, wie du in der jeweiligen Stufe aufsteigst? Find’s raus! Frag rum. Hör zu. Oder mach’s wie ich – tu so, als hättest du’s erfunden.\n\nWas kann ich mit all dem eigentlich anfangen?\n\nDu bist jetzt ausgebildet. Großartig. Was nun? Die Welt steht dir offen – aber der DM steht im Weg.\n\nHier gibt es drei Antworten:\n\nDu siehst es in der Welt.\nDu liest es in den Büchern.\nDu wirst kreativ und erfindest es selbst… jedenfalls bis eine höhere Macht „Nein“ sagt.\n\nLucius' letzter Tipp:\n\nDas Handwerk ist wie das Leben: du investierst Blut, Schweiß und Gold – und am Ende bekommst du vielleicht… ein Paar magische Schuhe. Oder eine Explosion im Gesicht. Beides gut.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-20",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766260722807",
    "categoryId": "tutorials",
    "title": "Ernte System Tutorial",
    "summary": "",
    "tags": [
      "Tutorials"
    ],
    "region": "",
    "body": "Lucius Magnus präsentiert: Monster-Schnetzeln für Fortgeschrittene (oder wie ihr Leichen richtig ausweidet)\n\nSeid gegrüßt, Möchtegern-Monster-Metzger! Ich bin Lucius Magnus, Erzmagier, Weltenretter, leidenschaftlicher Sammler von Monstermägen – und heute euer Reiseführer durch die wunderbare Welt des postmortalen Ressourcenmanagements. Auch genannt: Harvesting.\n\nSchritt 1: Das Monster ist tot – ihr dürft schnippeln\n\nSobald der Oger, Drache oder mutierte Bienenbär die Radieschen von unten begutachtet, habt ihr weniger als eine Minute, bevor sein magisches Innenleben zu Wackelpudding wird. Zeit ist... naja, begrenzt.\n\nDer DM schaut in die passende Tabelle und entscheidet, was überhaupt rausgeschnippelt werden kann. Herz? Ja. Zunge? Vielleicht. Seele? Nur mit sehr spitzen Fingern.\n\nSchritt 2: Die Harvest-Liste – eine schlechte To-do-Liste\n\nJetzt dürft ihr euch überlegen, was ihr wollt – und in welcher Reihenfolge. Klingt simpel? Ist es nicht. Das ist keine Einkaufsliste, das ist eine Todeslotterie mit Bonusspiel.\n\nWarum Reihenfolge wichtig ist? Weil das Spiel sagt: Je später ihr etwas versucht zu ernten, desto schwieriger wird es. Haltet euch fest – wir machen Mathe!\n\nSchritt 3: Ernte SG – Mathe, blutig serviert\n\nAh, der Moment, in dem D&D plötzlich Excel wird. Aber mit mehr Gedärmen.\n\nJede Komponente hat eine Schwierigkeit (Komponenten SG). Die Ernte SGs sind kumulativ. Sprich: Jedes neue Teil addiert sich auf den letzten Wert drauf. Wie beim Turmbau – nur dass euer Turm aus Leber, Klauen und Lungen besteht.\n\nBeispiel:\n\nZähne (DC 10) ergibt 10\nAuge (DC 5) ergibt 15\nAtemsack (DC 25) ergibt 40\nEssenz (DC 30) ergibt 70\n\nViel Glück beim Erreichen von 70 mit einem Bardenspieler, der denkt, Survival sei ein Fernsehformat.\n\nSchritt 4: Würfeln wir mal, wer jetzt blamiert wird\n\nZeit für den Ernte Check! Es braucht zwei Leute: einen, der denkt (Begutachtungs Check), und einen, der schneidet (Zerlegungs Check). Oder einen, der beides macht – aber dann mit Nachteil, denn Multitasking ist ein Mythos.\n\nBegutachtung: INT plus passende Fertigkeit (z. B. Survival bei Drachen)\nZerlegen: DEX plus dieselbe Fertigkeit\n\nBeide Würfe zusammen ergeben euren Ernte-Check. Je höher, desto mehr glibberiges Glück.\n\nSchritt 5: Blut, Schweiß und (meist keine) Tränen\n\nNun vergleichen wir euren Check mit den SGs. Habt ihr sie erreicht? Hurra! Habt ihr sie nicht erreicht? Dann gibt’s heute nur Drachen-Augen-Suppe – das Herz und die wertvolle Essenz sind dahin, wie eure Würde.\n\nAlles, was unter oder gleich eurer Punktzahl liegt, wird erfolgreich geerntet. Der Rest? Weg. Magie weg.\n\nZusatz: Zeitdruck und der magische Verfall\n\nIhr habt genau eine Minute nach dem Tod des Monsters, um anzufangen. Danach wird das Monster zu unbrauchbarem Gulasch. Ein toter Gegner ist eine Erntechance – kein Massenschlachten, ihr Gierlappen!\n\nBonuslevel:\n\nHelfer? Klar, ihr könnt Freunde mitbringen – je größer das Monster, desto mehr Leute dürfen rumfummeln. Aber sie müssen auch qualifiziert sein. Wenn nicht, helfen sie mit halbem Bonus. Also nicht einfach die Barbaren fragen, ob sie mal halten können.\n\nZusammenfassung für die Untoten unter euch:\n\nMonster tot? Sofort loslegen!\nWas wollt ihr? Reihenfolge festlegen.\nDCs addieren ergibt Ernteschwierigkeit.\nZwei Checks machen (INT und DEX).\nAlles ernten, was ihr schafft – Rest ist abfallende Magie mit Geschmack nach Versagen.\n\nSo, genug geschwafelt. Holt die Messer raus, holt die Würfel raus – und holt mir endlich diesen verdammten Atemsack! Lucius Magnus… entfleucht in einer Explosion aus Federn und Skelettarmen.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-20",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766260847843",
    "categoryId": "tutorials",
    "title": "Tutorial herstellen",
    "summary": "",
    "tags": [
      "Tutorials"
    ],
    "region": "",
    "body": "Schritt 1: Das richtige Werkzeug – Keine Hände, keine Kekse!\n\nWillst du bauen wie ein Gott? Dann bring gefälligst dein Werkzeug mit, Trottel.\n\nDu brauchst ein Werkzeug-Set mit Aufladungen, sonst kannst du dir gleich eine Glocke umhängen und als Barde oder Hofnarr Karriere machen.\n\nEs gibt drei glorreiche Klassen von Sets:\n\nWerkzeug-Set: Lehrlingsset\nAufladungen: 5\nGeeignet für: Billigkram und Anfängerfehler\nKosten pro Herstellung: 1 Aufladung\n\nWerkzeug-Set: Gesellenset\nAufladungen: 10\nGeeignet für: Praktische Dinge mit Stil\nKosten pro Herstellung: 2 Aufladungen\n\nWerkzeug-Set: Meisterset\nAufladungen: 15\nGeeignet für: Epischer Scheiß\nKosten pro Herstellung: 3 Aufladungen\n\nWähle weise. Oder halt dumm. Ich liebe es, wenn’s knallt.\n\nSchritt 2: Der Wille zur Schöpfung\n\nDer wichtigste Bestandteil ist dein Wille. Also, nicht der vom Paladin da hinten. Der hat keinen. Nur Ehrenkodex.\n\nDu brauchst nichts weiter als den Drang, etwas zu erschaffen. Und idealerweise auch den Plan, das passende Set und... ach ja – Talent. Aber wir wollen ja nicht gleich zu viel verlangen.\n\nSchritt 3: Der Wurf – Der Moment der Wahrheit\n\nDu versuchst also, etwas herzustellen? Wundervoll.\nDann würfel und hoffe, dass die Schwierigkeit (SG) deines Werkstücks nicht dein Schicksal versiegelt.\n\nFehlschlag?\n\nBeim ersten Mal: Pech gehabt, die Aufladung ist futsch.\nBeim zweiten Mal: Jetzt wird's teuer – Aufladung und Ressourcen sagen tschüss.\n\nIch nenne das die Regel des wütenden Lehrmeisters. Er schreit nur beim ersten Mal. Beim zweiten Mal zertrümmert er deinen Amboss.\n\nSchritt 4: Aufladungen leer? Kauf. Neue.\n\nTja. Du hast deine Aufladungen alle durch die Werkbank gejagt. Und jetzt? Hoffnung? HAH! NEIN.\n\nWenn du leer bist, musst du zu deinem vertrauenswürdigen Händler. Und nein, der nimmt keine Umarmungen oder Goblinwährung.\n\nNur Bares ist Wahres.\nSilber, Gold, Platin, die Seele deines Lieblingshaustiers… was auch immer er verlangt.\n\nFazit vom Meister (also mir)\n\nHerstellen ist wie Magie: teuer, gefährlich und voller Enttäuschung. Aber wenn du’s richtig machst, hast du am Ende was, das knallt. Oder zumindest glitzert.\n\nLucius' Letzte Worte zum Thema:\n\nHast du keinen Plan, kein Werkzeug und kein Geld?\nDann tu uns allen einen Gefallen und bastel dir ein schönes Grabkreuz.\nAus minderwertigem Holz. Mit abgebrochener Spitze. Passend zu deinem Skill.",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-20",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766261536835",
    "categoryId": "factions",
    "title": "Vetra Skupina",
    "summary": "",
    "tags": [
      "\"Helden\""
    ],
    "region": "",
    "body": "Hier ist Platz für einen Eintrag. 🤔",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-20",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766525164268",
    "categoryId": "patch-notes",
    "title": "Duria Kap Krako Adventures 1.1 – Patchnotes ",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "Duria Kap Krako Adventures 1.1 – Patchnotes\n \nEhemals: Duria Tutorial beta Version\n \nAdels-Ranking-Update: \n● Die Bürgermeister wurden befördert und sind jetzt Grafen. \n● Die bisherigen Grafen schauen jetzt von weiter oben herab – sie sind jetzt Herzöge. \n● Diese Änderung erfolgte, weil unsere Helden in einer absoluten Monarchie \nunterwegs sind, wo auch der örtliche Currywurstverkäufer mindestens einen \nAdelstitel braucht, um ernst genommen zu werden. \n● Bitte passen Sie Ihre formellen Verbeugungen und Titel-Schleimereien entsprechend \nan. \n\nStrafrechtssystem v1.0 – Jetzt wird nicht mehr gekuschelt:\n \n● Das zuvor etwas \"großzügig interpretierte\" Justizsystem (auch bekannt als \"Ach \nkomm, war doch nur ein bisschen Mord\") ist jetzt vollständig etabliert. \n● Wer Gesetze bricht, bekommt nun keine müden DM-Schulterzucken mehr – sondern \nechte Konsequenzen. \n● Features beinhalten: Gerichtsverfahren, Kerkerzeit, Kopfgeld, und für ganz \nHartgesottene: öffentliche Demütigung durch den Schandpfahl. \n● Bugfix: Helden mit Chaotic-Stupid-Spielstil bekommen jetzt häufiger Reality Checks. \nReligion 2.0 – Mehr als nur \"Gibt’s hier eigentlich Götter?\" \n● Komplett überarbeitetes Religionssystem implementiert. \n● Keine Wiki-Wall-of-Text beim Charakterbau mehr – stattdessen: Entdeckung durch \nSpiel & Weltinteraktion. \n\nVielen Dank für euer Feedback während der Duria Tutorial beta! \n\nDas \"Tutorial-Feeling\" wurde entfernt. Willkommen im echten Leben™. \n\nBleibt neugierig, bleibt vorsichtig – und denkt daran: nur weil ihr es könnt, heißt das nicht, \ndass ihr es tun solltet. \n– Euer DM-Team ",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-23",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766525258905",
    "categoryId": "patch-notes",
    "title": "Duria Kap Krako Adventures 1.2 – Patchnotes ",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "Duria Kap Krako Adventures 1.2 – Patchnotes \nEin kleiner Schritt für den DM, ein großes Mimimi für die Gruppe.\n \nReligionssystem Balancing-Update: \n\n● Nerfs und Buffs wurden gleichmäßig verteilt und neu gebalanced \n● Das göttliche Support-Team bittet weiterhin darum, keine Gebete als Bugreports zu \nformulieren. \nAuftragsbelohnungen – angeblich überarbeitet: \n● Die Belohnungen wurden gefühlt angepasst. Tatsächlich ist alles wie vorher – aber \nwenn man genug jammert, klingt’s irgendwann nach Patch. \n● Wir bedanken uns für das anhaltende Feedback im Stil von „Was? Nur 20 Gold für \nfünf Drachenköpfe??“ – es hilft uns sehr, euch weiterhin emotional zu destabilisieren. \n● Reminder: Erfahrung und Charakterwachstum sind auch Belohnungen. (Haha, nein, \nim Ernst: Geld gibt’s genug. Ihr findet es nur nicht.) \nBerufssystem: Pre-Alpha-Ideephase \n● Die Entwicklung eines Berufssystems wurde gestartet – das ist wie ein Feature, nur \nohne jegliche Funktion. \n● Spieler, die dachten, sie könnten durch Eigeninitiative etwas \"vorbereiten\" oder \n\"anstoßen\", haben leider pech \nChangelog-Ende.\n \nDanke, dass ihr weiterhin Teil von Duria Kap Krako Adventures seid – einer Welt voller \nWunder, Wahnsinn und wortwörtlich unbezahlter Aufträge. Bleibt dran für Version 1.3, \nvielleicht mit echtem Brotbacksystem.  \n– Euer DM-Team \n ",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-23",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766525348749",
    "categoryId": "patch-notes",
    "title": "Duria Kap Krako Adventures 1.3 – Patchnotes",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "Duria Kap Krako Adventures 1.3 – Patchnotes \n\nJetzt mit Karten! Aber nicht fürs Metagaming, okay?\n \nStadtplan-Wirtschaftssystem implementiert: \n\n● Stadtkarten sind jetzt käuflich zu erwerben – endlich können Spieler sich gegen \nBezahlung darüber freuen, was sie eh schon fast wussten! \n● Der Schurke hat freundlicherweise eine Grundkarte von Kap Krako im Inventar. \n● Alle weiteren Karten: kostenpflichtig. Schließlich lebt auch der Fantasy-Drucker \nnicht von Luft und Liebe. \n● Karten zeigen eine ungefähre Darstellung der Stadt, und bereits besuchte Orte \nwerden markiert. \n● Wichtiger Hinweis: Nein, ihr könnt euch nicht einfach einen spannenden Ort \nraussuchen und dort auftauchen wie bei einer Videospiel Schnellreise.\n \n○ Das ist eine Welt, kein Sandbox-Minimap-Simulator.\n \nBerufssystem v0.7 – Wir bauen was auf (irgendwann): \n\n● Große Fortschritte wurden gemacht: Tabellen, Namen, Ideen, DM-Schweiß. \n● Trotz all dem: Das System bleibt weiter in Arbeit. \n● Die gute Nachricht: Es wird tiefgründig, modular und sinnvoll einsetzbar. \n● Die schlechte Nachricht: Ihr könnt’s trotzdem noch nicht benutzen. \n● Also bitte keine neuen Bewerbungen als Fantasy-Hufschmied mit RP-Tagebuch auf \nLevel 3. Eure Zeit wird kommen. Irgendwann. Vielleicht in Patch 2.0.\n \nVielen Dank für eure Geduld mit Version 1.3! \n\nDenkt dran: Nur weil ihr jetzt Karten habt, heißt das nicht, dass ihr euch nicht weiterhin \nverlaufen könnt. Willkommen in Kap Krako – wo Orientierung ein Abenteuer ist. ",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-23",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766525423885",
    "categoryId": "patch-notes",
    "title": "Duria Kap Krako Adventures 1.4 – Patchnotes",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "Duria Kap Krako Adventures 1.4 – Patchnotes \n\nJetzt mit Berufsberatung, Herstellungswut und einem Trauerlied für Bonusaktionen.\n \nSchubsen & Treten – jetzt mit mehr Commitment: \n\n● Schubsen und Treten sind nun keine Bonusaktionen mehr. \n● Sie zählen ab sofort als vollwertige Aktionen, denn Gewalt soll sich lohnen – aber \nbitte in Maßen. \n● Die berüchtigten \"Schubskreise\" wurde damit offiziell aufgelöst. \n○ Die Gilde der Körperkontakt-Fanatiker trauert. \n○ Die DM-Gesundheit bedankt sich. \nHerstellungssystem (aka: „Wie viel Kaffee hatten die DMs?“): \n● Überraschung! Das Herstellungssystem ist jetzt live – schneller da als \nangekündigt, dank einer Mischung aus Schweiß, Blut und anderen \nKörperflüssigkeiten im DM-Team. \n● Es ist ausführlich, umfangreich und realistisch genug, um Albträume in \nTabellenform zu erzeugen. \n● Allen Spieler*innen wurde bereits ein Beruf zugewiesen. Dazu gibt’s eine \nzusätzliche Auswahl eines Gesellentitels \n● Preise einiger Gegenstände wurden im Zuge dessen angepasst – Inflation kennt \nauch im Rollenspiel keine Gnade. \n● Spielerinventare enthalten nun neue Pflichtgegenstände \nTutorials & Einführung: \n● Es wird vor dieser Runde eine kurze Einführung geben. Danach gilt das \naltbewährte Prinzip: \n○ Learning by Doing. \n○ Failing by Ignoring. \n● Wer Fragen hat, darf sie stellen. Wer keine Fragen stellt, wird später weinen. Ob die \nFragen überhaupt beantwortet werden, ist sowieso unklar. \nVorschau auf Patch 1.5 – Der große Inventar-Schock: \n● Aufgrund des Berufssystems wird die Tragekapazität und das \nInventarfassungsvermögen bald angepasst. \n● Was heißt das konkret? \n○ Nein, du kannst nicht 15 Ambosse in deinen Beutel packen. \n○ Ja, das Werkzeug wiegt jetzt wirklich was. \n● Spieler sollten sich emotional von ihren Hamsterinstinkten verabschieden. \n○ Oder anfangen, Packesel zu züchten. \n\nDanke für euer Vertrauen in das System, das euch bald mit Realismus und \nGewichtsangaben erschlagen wird. \n\nViel Spaß bei Duria Kap Krako Adventures 1.4 – \ndie erste Version mit Gewerbeanmeldung. ",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-23",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766525439217",
    "categoryId": "patch-notes",
    "title": "Duria Kap Krako Adventures 1.5 – Patchnotes ",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "Duria Kap Krako Adventures 1.5 – Patchnotes \n\nJetzt auch mit Welt außerhalb der Stadt! (Fast.) \n\nHandwerkssystem 1.1 – Schraubendreher-Update: \n\n● Das Herstellungssystem wurde weiter angepasst und erweitert – weil \noffensichtlich noch nicht genug Tabellen existierten. \n● Neue Rezepte, überarbeitete Mechaniken und noch mehr Möglichkeiten, sich kreativ \nzu verkünsteln (oder zu verzetteln). \n● Wer sich mit seinem Beruf nicht identifiziert, darf jetzt trotzdem damit leben – das \nnennt man Immersion. \n● Feedback wurde teilweise berücksichtigt. Also das konstruktive. Nicht das mit „Wieso \nwiegt das Werkzeug 8 Kilo?!“ \n\nWeltentwicklung – Jetzt mit mehr Draußen! \n● Die DM-Werkbank lief heiß: Die Welt außerhalb von Kap Krako wurde überarbeitet, \nerweitert und mit Liebe (und Plot) gefüllt. \n● Bald dürfen die Spieler offiziell die Stadt verlassen. \n○ Nein, das ist kein Trick. \n○ Ja, ihr müsst vielleicht Wanderschuhe kaufen. \n● Die Umgebung bietet realistischere Details, stimmige Geografie und mehr \nMöglichkeiten, sich zu verlaufen, zu erfrieren oder spontan in politische Intrigen zu \nstolpern. \n● Kurz: Die Welt lebt. Und sie hat Augen. Und Regeln.\n \nBleibt gespannt auf Patch 1.6 – mit offiziellem Stadttor und Wind außerhalb von \nGebäuden. \n\nBis dahin viel Spaß mit Duria Kap Krako Adventures 1.5 – \njetzt mit Welt, die größer ist als euer Inventar. ",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-23",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1766525593366",
    "categoryId": "patch-notes",
    "title": "Duria Campari Adventures 2.0 – Patchnotes ",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "Duria Campari Adventures 2.0 – Patchnotes \n\nEndlich raus aus Kap Krako – und rein ins echte Leben. \nFreiheit, endlich! \n\n● Das Land Campari ist nun frei begehbar! \n● Spieler sind nicht länger in der Stadt Kap Krako eingesperrt. \n● Mit dieser Änderung können Held*innen jetzt offiziell: \n○ Wiesen zertreten, \n○ Bauern bei der Arbeit nerven, \n○ und endlich \"Wir gehen nach draußen\" sagen, ohne dass der DM nur müde \nlacht. \n\nHandwerkssystem – Berufsfeinschliff 1.2 \n● Die Berufe Schneider, Skriptor und Artifex haben gezielte Anpassungen erhalten. \n● Details werden während des Spiels enthüllt, aka „Learning by Confusion“. \n● Spoiler: Es wird produktiver, kreativer, und eventuell auch teurer. \nSprachsystem Reloaded \n● Sprachen sind jetzt questrelevant, statt den Alltag zu blockieren. \n○ Ja, ihr dürft beim Bäcker Brot kaufen, auch ohne Montesque Sprachprüfung \nB2. \n● Sprachenlernen geschieht über Zeit, also: kein Speedrun zum Polyglott. \nNeue Feature: Tragekapazität \n● Ab sofort gilt: Stärkewert x 8 = maximale Traglast. \n● Endlich Schluss mit dem „Ich trage 14 Rüstungen, 7 Schilde, 2 Ambosse und 3 \nFässer Rum, easy“. \n● Realismus kickt rein – und Packesel bekommen Zukunftsperspektiven. \n\nWillkommen zu Duria Campari Adventures 2.0! \nMehr Welt, mehr Regeln, mehr Gründe, endlich das Stadttor nicht nur als Dekoration zu \nbetrachten. ",
    "session": "",
    "status": "",
    "lastUpdated": "2025-12-23",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  }
];
