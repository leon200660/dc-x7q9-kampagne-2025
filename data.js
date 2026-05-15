// data.js – generiert mit dem DnD Welt-Glossar Editor
// Kopiere diese Datei zurück in dein Projekt.

window.dashboard = {
  "progress": {
    "label": "2% Kampagnenfortschritt",
    "percent": 2
  },
  "notes": [
    "Letzte gespielte Sitzung: Recap 12 (Stand: 2025-12-03).",
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
    "subtitle": "Bekannte Kreaturen, Jagdnotizen und gesicherte Feldberichte"
  },
  "chapters": [
    {
      "id": "grenzjagd",
      "name": "Klagewald & Grenzjagd",
      "icon": "W",
      "summary": "Bestätigte Sichtungen aus dem Klagewald, vom Wiesenweg und aus den Jagdaufträgen rund um Solen Aue."
    },
    {
      "id": "kanalisation",
      "name": "Unterstadt & Abwasser",
      "icon": "R",
      "summary": "Ratten, Schwärme und verseuchte Kreaturen aus den Abflüssen unter Kap Krako."
    },
    {
      "id": "erdgaenge",
      "name": "Erdgänge & Brutnester",
      "icon": "B",
      "summary": "Bekannte Wanderbrut aus Tunneln, Nestern und abgesackten Erdschächten."
    },
    {
      "id": "reliquien",
      "name": "Relikte & Elementare",
      "icon": "E",
      "summary": "Erweckte Elementare und Wächterkreaturen aus Ausgrabungsstätten und Reliquienjagden."
    },
    {
      "id": "tiefsee",
      "name": "Tiefwasser & Titanen",
      "icon": "K",
      "summary": "Großkreaturen, die nur selten gesichtet werden und bereits ganze Trupps überfordern können."
    }
  ],
  "monsters": [
    {
      "id": "monster-klagewolf",
      "title": "Klagewolf",
      "tags": [
        "Klagewald",
        "Rudel",
        "Gift"
      ],
      "dangerTags": [
        "Rudel",
        "Gift"
      ],
      "summary": "Ein vergifteter Jagdwolf aus dem Klagewald, der Beute im Rudel niederzwingt.",
      "body": "Im Klagewald wurden diese Wölfe in mehreren Rudeln gesichtet. Ihre Bisse tragen ein magisch verstärktes Gift, und einzelne Tiere versuchen Verwundete aus der Reihe zu ziehen.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Klagewolf.png"
      ],
      "chapterId": "grenzjagd",
      "chapterName": "Klagewald & Grenzjagd",
      "type": "Bestie",
      "size": "Mittel",
      "cr": "1/2",
      "ac": "12",
      "hp": "12",
      "speed": "12 m",
      "alignment": "Ungebunden",
      "habitat": "Klagewald und Jagdpfade bei Solen Aue",
      "threatClass": "Rudeljäger",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Die Giftzähne sind das erste, was man an einem toten Klagewolf sichern sollte.",
      "traceTags": [
        "Pfotenabdrücke",
        "Heulen in Rudelantwort",
        "vergiftete Bisswunden"
      ],
      "warningSigns": [
        "Heulen aus mehreren Richtungen",
        "frische Rissspuren an Baumrinde"
      ],
      "behavior": "Jagt im Rudel und hält sich an bereits verletzte oder isolierte Ziele.",
      "tactics": "Nutzen Rudeltaktik und bedrängen Ziele, die bereits gebunden oder zu Boden gebracht wurden.",
      "lastSighting": "Klagewald, tief im dunklen Wald von Solen Aue",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Attribute": "ST 12, GE 14, KO 12, IN 4, WE 12, CH 6",
        "Fertigkeiten": "Wahrnehmung +3, Heimlichkeit +4",
        "Sinne": "Passive Wahrnehmung 13",
        "Sprachen": "—",
        "Besonderheit": "Scharfes Gehör und scharfer Geruchssinn; Vorteil auf Wahrnehmung über Gehör oder Geruch."
      },
      "actions": [
        "Giftbiss: Nahkampfangriff +4, Reichweite 1,5 m, 2W4+2 Stichschaden.",
        "Das Ziel muss einen KO-Rettungswurf SG 12 bestehen oder den Zustand Vergiftet erhalten.",
        "Die vergiftete Kreatur kann am Ende ihrer Runde einen KO-Rettungswurf SG 14 wiederholen, um sich zu befreien.",
        "Rudeltaktik: Vorteil auf Angriffswürfe gegen eine Kreatur, wenn sich mindestens ein Verbündeter des Wolfs innerhalb von 1,5 m um das Ziel befindet."
      ],
      "notes": "Die gleiche Beuteausbeute gilt für die bekannten Schreckenswolf-Varianten dieser Jagdlinie.",
      "harvest": [
        {
          "dc": 15,
          "yields": [
            "Wolfszähne",
            "Wolfsaugen"
          ]
        },
        {
          "dc": 20,
          "yields": [
            "Wolfsleber"
          ]
        },
        {
          "dc": 25,
          "yields": [
            "Mittelgroßes Leder"
          ]
        },
        {
          "dc": 30,
          "yields": [
            "Essenz"
          ]
        }
      ],
      "extras": {
        "Materialwerte": "SG 15 Zähne/Augen je 1 Silber, SG 20 Leber 2 Silber, SG 25 Fell 3 Silber, SG 30 Essenz 10–20 Silber."
      },
      "visible": true
    },
    {
      "id": "monster-klagewolf-rudelfuehrer",
      "title": "Klagewolf Rudelführer",
      "tags": [
        "Klagewald",
        "Rudel",
        "Gift",
        "Dornenmagie"
      ],
      "dangerTags": [
        "Rudelführer",
        "Gift",
        "Kontrolle"
      ],
      "summary": "Ein besonders großer Rudelführer, der Beute bindet und sein Rudel mit Dornenmagie absichert.",
      "body": "Diese Alpha-Tiere treiben ihre Beute mit der gleichen Giftlinie wie gewöhnliche Klagewölfe, können Gegner aber zusätzlich mit magischen Ranken festsetzen.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Klagewolf Rudelführer.png"
      ],
      "chapterId": "grenzjagd",
      "chapterName": "Klagewald & Grenzjagd",
      "type": "Bestie",
      "size": "Mittel",
      "cr": "1",
      "ac": "14",
      "hp": "36",
      "speed": "16 m",
      "alignment": "Ungebunden",
      "habitat": "Klagewald und enge Hetzpfade unter dichtem Unterholz",
      "threatClass": "Rudelführer",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Wenn der Rudelführer fällt, bricht das Rudel oft kurz auseinander.",
      "traceTags": [
        "Große Pfotenabdrücke",
        "Rankenreste",
        "Rudelheulen"
      ],
      "warningSigns": [
        "verkrümmte Dornenranken",
        "mehrere Laufspuren um ein einziges Ziel"
      ],
      "behavior": "Hält sich knapp hinter dem ersten Ansturm und greift bevorzugt dann an, wenn ein Ziel bereits gebunden ist.",
      "tactics": "Sichert Flanken mit Rankenfesseln und zwingt einzelne Ziele aus der Gruppe, bevor das Rudel nachsetzt.",
      "lastSighting": "Waldrand von Solen Aue",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Attribute": "ST 16, GE 14, KO 14, IN 4, WE 12, CH 6",
        "Fertigkeiten": "Wahrnehmung +3, Heimlichkeit +4",
        "Sinne": "Passive Wahrnehmung 13",
        "Sprachen": "—",
        "Besonderheit": "Scharfes Gehör und scharfer Geruchssinn; Vorteil auf Wahrnehmung über Gehör oder Geruch."
      },
      "actions": [
        "Giftbiss: Nahkampfangriff +5, Reichweite 1,5 m, 2W6+3 Stichschaden.",
        "Das Ziel muss einen KO-Rettungswurf SG 12 bestehen oder den Zustand Vergiftet erhalten.",
        "Rankenfesseln: Beschwörungszauber, Bonusaktion, Reichweite 18 m, Konzentration bis zu 1 Minute.",
        "Das Ziel muss einen ST-Rettungswurf SG 14 bestehen oder wird festgesetzt; große oder größere Kreaturen haben Vorteil.",
        "Eine gebundene Kreatur oder eine Kreatur in Reichweite kann als Aktion einen ST-Wurf gegen Zauberrettungswurf-SG 12 machen, um das Ziel zu befreien."
      ],
      "notes": "Verwendet dieselbe Beuteliste wie die bekannten Schreckenswolf-Varianten dieser Jagdlinie.",
      "harvest": [
        {
          "dc": 15,
          "yields": [
            "Wolfszähne",
            "Wolfsaugen"
          ]
        },
        {
          "dc": 20,
          "yields": [
            "Wolfsleber"
          ]
        },
        {
          "dc": 25,
          "yields": [
            "Mittelgroßes Leder"
          ]
        },
        {
          "dc": 30,
          "yields": [
            "Essenz"
          ]
        }
      ],
      "extras": {
        "Materialwerte": "SG 15 Zähne/Augen je 1 Silber, SG 20 Leber 2 Silber, SG 25 Fell 3 Silber, SG 30 Essenz 10–20 Silber."
      },
      "visible": true
    },
    {
      "id": "monster-riesenklagewolf",
      "title": "Riesenklagewolf",
      "tags": [
        "Klagewald",
        "Alpha",
        "Gift",
        "Dornenmagie"
      ],
      "dangerTags": [
        "Boss",
        "Gift",
        "Kontrolle"
      ],
      "summary": "Ein riesiger Klagewolf, der seine Beute mit Gift, Ranken und verdorbenem Gelände festsetzt.",
      "body": "Die größte bekannte Klagewolf-Variante wurde tief im dunklen Wald gestellt. Sie hetzt wie ein Rudelführer, kann das Schlachtfeld aber zusätzlich mit Dornenwuchs absperren.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Riesen Klagewolf.png"
      ],
      "chapterId": "grenzjagd",
      "chapterName": "Klagewald & Grenzjagd",
      "type": "Bestie",
      "size": "Groß",
      "cr": "4",
      "ac": "16",
      "hp": "116",
      "speed": "16 m",
      "alignment": "Ungebunden",
      "habitat": "Dichter Klagewald und tiefe Jagdgründe fern des Waldrands",
      "threatClass": "Alphajäger",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Wenn der Boden plötzlich wie natürlicher Dornensumpf aussieht, ist der große Wolf schon zu nah.",
      "traceTags": [
        "zerbrochene Stämme",
        "tiefe Krallfurchen",
        "verdornter Boden"
      ],
      "warningSigns": [
        "unnatürlich stilles Rudelgebiet",
        "plötzlich überwucherter Waldboden"
      ],
      "behavior": "Jagt nicht nur auf direkte Beute, sondern kontrolliert den Raum um sich herum.",
      "tactics": "Bindet Frontkämpfer mit Rankenfesseln und zwingt Gruppen durch Dornenwuchs in schlechte Positionen.",
      "lastSighting": "Tief im Klagewald",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Attribute": "ST 18, GE 16, KO 16, IN 6, WE 14, CH 8",
        "Sinne": "Passive Wahrnehmung 12",
        "Sprachen": "—",
        "Besonderheit": "Scharfes Gehör und scharfer Geruchssinn; Vorteil auf Wahrnehmung über Gehör oder Geruch."
      },
      "actions": [
        "Giftbiss: Nahkampfangriff +6, Reichweite 1,5 m, 2W10+4 Stichschaden.",
        "Das Ziel muss einen KO-Rettungswurf SG 12 bestehen oder den Zustand Vergiftet erhalten.",
        "Rankenfesseln: Bonusaktion, Reichweite 18 m, ST-Rettungswurf SG 14 oder das Ziel wird festgesetzt.",
        "Dornenwuchs: Verwandelt den Boden in einem Radius von 6 m in schwieriges Gelände; Bewegung darin verursacht 2W4 Stichschaden pro 1,5 m.",
        "Wölfe sind von Dornenwuchs nicht betroffen."
      ],
      "notes": "Verwendet die größere Beuteliste der Riesenwolf-Variante.",
      "harvest": [
        {
          "dc": 15,
          "yields": [
            "Riesenwolfszähne",
            "Riesenwolfsaugen"
          ]
        },
        {
          "dc": 20,
          "yields": [
            "Riesenwolfsleber"
          ]
        },
        {
          "dc": 25,
          "yields": [
            "Großes Leder"
          ]
        },
        {
          "dc": 30,
          "yields": [
            "Essenz"
          ]
        }
      ],
      "extras": {
        "Materialwerte": "SG 15 Zähne/Augen je 2 Silber, SG 20 Leber 4 Silber, SG 25 Fell 6 Silber, SG 30 Essenz 80 Silber."
      },
      "visible": true
    },
    {
      "id": "monster-wyvern",
      "title": "Wyvern",
      "tags": [
        "Grenzposten",
        "Flugjäger",
        "Gift"
      ],
      "dangerTags": [
        "Flieger",
        "Gift",
        "Boss"
      ],
      "summary": "Ein großer Flugjäger, der am Wiesenweg Tiere und Reisende aus dem Hinterhalt angreift.",
      "body": "Mehrere Angriffe entlang des Wiesenwegs deuten auf einen einzelnen Wyvern hin. Die Spur führte von vergifteten Pferdekadavern über zerstörte Wagen bis hin zu einem Nest an der Klippe nahe dem Grenzposten.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Wyvern.png"
      ],
      "chapterId": "grenzjagd",
      "chapterName": "Klagewald & Grenzjagd",
      "type": "Drache",
      "size": "Groß",
      "cr": "6",
      "ac": "13",
      "hp": "110",
      "speed": "6 m, Flug 24 m",
      "alignment": "Ungebunden",
      "habitat": "Wiesenweg, Grenzposten und Klippennester",
      "threatClass": "Luftjäger",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Gift im Kadaver ist meist das erste sichere Zeichen für einen Wyvernangriff.",
      "traceTags": [
        "Schuppen",
        "Stachelspuren",
        "vergifteter Kadaver"
      ],
      "warningSigns": [
        "Flügelschläge in der Nacht",
        "große Kreisflüge über dem Wiesenweg"
      ],
      "behavior": "Greift aus der Luft an, testet Beute auf Schwäche und zieht sich bei zu viel Gegenwehr wieder hoch.",
      "tactics": "Den letzten Angreifer im Blick behalten; der Wyvern richtet seinen Stachel bevorzugt auf die Kreatur, die ihm zuletzt Schaden zufügte.",
      "lastSighting": "Nest an der Klippe nahe dem Grenzposten",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Quelle": "D&D Beyond Basic Rules (2014), Wyvern",
        "Attribute": "ST 19, GE 10, KO 16, IN 5, WE 12, CH 6",
        "Fertigkeiten": "Wahrnehmung +4",
        "Sinne": "Dunkelsicht 18 m, Passive Wahrnehmung 14",
        "Sprachen": "—"
      },
      "actions": [
        "Mehrfachangriff: Der Wyvern macht zwei Angriffe: einen mit seinem Biss und einen mit seinem Stachel. Während er fliegt, kann er stattdessen seine Klauen einsetzen.",
        "Biss: Nahkampfangriff +7, Reichweite 3 m, 2W6+4 Stichschaden.",
        "Klauen: Nahkampfangriff +7, Reichweite 1,5 m, 2W8+4 Hiebschaden.",
        "Stachel: Nahkampfangriff +7, Reichweite 3 m, 2W6+4 Stichschaden; KO-Rettungswurf SG 15 oder 7W6 Giftschaden, bei Erfolg halber Schaden.",
        "Spalten (Spezial): Der Wyvern richtet seinen Stachel auf die Kreatur, die ihm zuletzt Schaden zugefügt hat. Das Ziel muss einen GES-Rettungswurf ablegen und erleidet bei einem Fehlschlag 3W10 Schaden plus Vergiftet, bei Erfolg halben Schaden ohne Vergiftet."
      ],
      "notes": "Die Gruppe nutzte die Ausrichtung des Stachels gegen ihn aus, indem sie bewusst den letzten Treffer steuerte.",
      "harvest": [
        {
          "dc": 10,
          "yields": [
            "Zähne",
            "Klauen",
            "Blut"
          ]
        },
        {
          "dc": 15,
          "yields": [
            "Schuppen"
          ]
        },
        {
          "dc": 20,
          "yields": [
            "Stachel"
          ]
        },
        {
          "dc": 25,
          "yields": [
            "Giftdrüse"
          ]
        },
        {
          "dc": 30,
          "yields": [
            "Essenz"
          ]
        }
      ],
      "extras": {
        "Materialwerte": "SG 10 Zähne/Klauen/Blut 20 Silber, SG 15 Schuppen 40 Silber, SG 20 Stachel 60 Silber, SG 25 Giftdrüse 80 Silber, SG 30 Essenz 2 Gold."
      },
      "visible": true
    },
    {
      "id": "monster-riesige-kanalratte",
      "title": "Riesige Kanalratte",
      "tags": [
        "Kanalisation",
        "Ratte",
        "Seuche"
      ],
      "dangerTags": [
        "Lauerer",
        "Krankheit"
      ],
      "summary": "Eine übergroße Ratte aus den Abflüssen unter Kap Krako.",
      "body": "Diese Ratten lauern in Rohren, Geröllnischen und Kletterpassagen der Kanalisation. Schon einzelne Tiere können lästige Infektionen auslösen, wenn sie nicht schnell niedergehalten werden.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Riesige Kanalratte.png"
      ],
      "chapterId": "kanalisation",
      "chapterName": "Unterstadt & Abwasser",
      "type": "Bestie",
      "size": "Mittel",
      "cr": "1/2",
      "ac": "12",
      "hp": "22",
      "speed": "12 m, Klettern 6 m",
      "alignment": "Neutral böse",
      "habitat": "Rohre, Seitenläufe und trockene Stege der Unterstadt",
      "threatClass": "Kanalplage",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "traceTags": [
        "Kratzspuren an Rohrwänden",
        "Nagespuren",
        "nasser Fellgeruch"
      ],
      "warningSigns": [
        "nervöse Stille in engen Rohren",
        "frisch verschleppte Essensreste"
      ],
      "behavior": "Greift aus dem Dunkel kurzer Rohre an und zieht sich bei Widerstand sofort zurück.",
      "tactics": "Setzt auf schnelle Bisse und den Krankheitsdruck statt auf offenen Schlagabtausch.",
      "lastSighting": "Kanalisation unter Kap Krako",
      "relatedEntryIds": [
        "recap-sitzung-2"
      ],
      "statblock": {
        "Attribute": "ST 12, GE 14, KO 12, IN 2, WE 10, CH 4",
        "Fertigkeiten": "Heimlichkeit +4",
        "Sinne": "Dunkelsicht 9 m, guter Geruchssinn",
        "Sprachen": "—"
      },
      "actions": [
        "Biss: Nahkampfangriff +4, Reichweite 1,5 m, 1W8+2 Stichschaden.",
        "Krankheitsbiss: Der Biss hat eine 30-%-Chance, eine leichte Infektion auszulösen; KO-Rettungswurf SG 12."
      ],
      "notes": "Klein, schnell und selten allein. Wird oft vor größeren Nestkreaturen gesichtet.",
      "visible": true,
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": true
      },
      "fieldNote": "",
      "harvest": []
    },
    {
      "id": "monster-rattenschwarm",
      "title": "Rattenschwarm",
      "tags": [
        "Kanalisation",
        "Schwarm",
        "Nest"
      ],
      "dangerTags": [
        "Schwarm"
      ],
      "summary": "Ein dichter Schwarm aus winzigen Ratten, der Gegner überrollt und in Enge besonders gefährlich wird.",
      "body": "In den Abflüssen treten Rattenschwärme selten ohne größeres Nest oder eine stärkere Leittier-Präsenz auf. Je mehr der Schwarm ausgedünnt wird, desto schwächer werden seine Bisse.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Rattenschwarm.png"
      ],
      "chapterId": "kanalisation",
      "chapterName": "Unterstadt & Abwasser",
      "type": "Bestie",
      "size": "Groß",
      "cr": "1/2",
      "ac": "10",
      "hp": "36",
      "speed": "9 m, Klettern 6 m",
      "alignment": "Neutral böse",
      "habitat": "Nester, Abflussrohre und feuchte Sammelbecken",
      "threatClass": "Schwarmplage",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "traceTags": [
        "raschelndes Fellteppichgeräusch",
        "Knochenreste",
        "Kotspuren"
      ],
      "warningSigns": [
        "gleichzeitiges Kratzen aus mehreren Richtungen"
      ],
      "behavior": "Überrollt Ziele statt Einzelkämpfe zu suchen und meidet offene Flächen ohne Deckung.",
      "tactics": "Bindet Gegner in Enge und hält Druck, bis ein größeres Nestmonster nachsetzt.",
      "lastSighting": "Rattennest unter Kap Krako",
      "relatedEntryIds": [
        "recap-sitzung-2"
      ],
      "statblock": {
        "Attribute": "ST 9, GE 14, KO 11, IN 2, WE 10, CH 3",
        "Resistenzen": "Wucht-, Hieb- und Stichschaden",
        "Immunitäten": "Charme, Angst",
        "Besonderheit": "Schwarmtaktik"
      },
      "actions": [
        "Schwärmender Biss: Nahkampfangriff +3, Reichweite 1,5 m, 4W6 Stichschaden.",
        "Der Schaden sinkt, sobald der Schwarm unter 50 % seiner Trefferpunkte fällt."
      ],
      "notes": "Einzeln leicht zu unterschätzen, in engen Gängen aber oft gefährlicher als einzelne große Ratten.",
      "visible": true,
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": true
      },
      "fieldNote": "",
      "harvest": []
    },
    {
      "id": "monster-riesenratten-nesthueter",
      "title": "Riesenratten Nesthüter",
      "tags": [
        "Kanalisation",
        "Nest",
        "Schatten"
      ],
      "dangerTags": [
        "Rudel",
        "Gift"
      ],
      "summary": "Ein wendiger Nestwächter, der aus Schatten angreift und andere Ratten in den Kampf zieht.",
      "body": "Diese Riesenratten sichern größere Nester und nutzen Deckung und Dunkelheit besser als die gewöhnlichen Kanalratten. Sie schlagen kurz zu und verschwinden wieder im Schatten.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Riesenratten Nesthüter.png"
      ],
      "chapterId": "kanalisation",
      "chapterName": "Unterstadt & Abwasser",
      "type": "Monstrosität",
      "size": "Mittel",
      "cr": "2",
      "ac": "14",
      "hp": "45",
      "speed": "12 m",
      "alignment": "Neutral böse",
      "habitat": "Nestkammern, trockene Pfeiler und Schattenzonen der Kanalisation",
      "threatClass": "Nestwächter",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "traceTags": [
        "Nesthaare",
        "eingekratzte Deckungspfade",
        "schmale Laufspuren"
      ],
      "warningSigns": [
        "still gewordene Seitengänge",
        "plötzliche Bewegung knapp außerhalb des Lampenscheins"
      ],
      "behavior": "Greift aus dem Schatten an und zieht sich sofort wieder in Deckung zurück.",
      "tactics": "Nutzt Rudelangriff und setzt Seuchenbiss gezielt gegen Gruppen mit schwachen Konstitutionswürfen ein.",
      "lastSighting": "Seitengänge nahe dem großen Rattennest",
      "relatedEntryIds": [
        "recap-sitzung-2"
      ],
      "statblock": {
        "Attribute": "ST 14, GE 16, KO 14, IN 6, WE 12, CH 8",
        "Fertigkeiten": "Heimlichkeit +5, Wahrnehmung +4",
        "Sinne": "Dunkelsicht 18 m, Passive Wahrnehmung 14",
        "Sprachen": "Versteht Gemeinsprache, spricht aber nicht",
        "Resistenzen": "Gift",
        "Immunitäten": "Krankheitszustand"
      },
      "actions": [
        "Multiattack: Ein Biss und ein Klauenangriff.",
        "Biss: Nahkampfangriff +5, Reichweite 1,5 m, 2W4+4 Stichschaden plus Seuchenbiss.",
        "Klauen: Nahkampfangriff +5, Reichweite 1,5 m, 1W8+3 Hiebschaden.",
        "Seuchenbiss: KO-Rettungswurf SG 12 oder 1 Minute vergiftet; Wiederholung am Ende jedes eigenen Zuges."
      ],
      "notes": "Rattenagilität erlaubt derselben Kreatur, sich im gleichen Zug als Bonusaktion zu verstecken, wenn Deckung oder Schatten vorhanden sind.",
      "visible": true,
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": true
      },
      "fieldNote": "",
      "harvest": []
    },
    {
      "id": "monster-rattenkoenigin",
      "title": "Rattenkönigin",
      "tags": [
        "Kanalisation",
        "Boss",
        "Seuche"
      ],
      "dangerTags": [
        "Boss",
        "Seuche",
        "Nekrotisch"
      ],
      "summary": "Eine monströse Brutmatriarchin, die Rattenschwärme aus ihrem Leib hervorbrechen lässt.",
      "body": "Die Rattenkönigin wurde als Quelle der chaotischen Energie unter Kap Krako gestellt. Sie hält ihre Umgebung mit Krankheit, Nekrose und beschworenen Schwärmen unter Druck.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Rattenkönigin.png"
      ],
      "chapterId": "kanalisation",
      "chapterName": "Unterstadt & Abwasser",
      "type": "Monstrosität",
      "size": "Groß",
      "cr": "8",
      "ac": "16",
      "hp": "136",
      "speed": "12 m, Klettern 9 m",
      "alignment": "Chaotisch böse",
      "habitat": "Große Nester und verseuchte Kammern unter Kap Krako",
      "threatClass": "Brutmatriarchin",
      "status": "Beseitigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Der riesige Zahnkern galt als sichtbarer Beleg für den Abschluss der Jagd.",
      "traceTags": [
        "wuchernde Nester",
        "kranker Fellgeruch",
        "schmierige Knochenhaufen"
      ],
      "warningSigns": [
        "plötzliche Schwarmbewegung",
        "kalter",
        "fauliger Atem in engen Schächten"
      ],
      "behavior": "Bleibt selten allein und baut permanent Druck über Schwärme und Krankheit auf.",
      "tactics": "Beginnt Kämpfe gern mit Seuchenwelle und hält Distanz, solange Schwärme die Front binden.",
      "lastSighting": "Großes Nest unter Kap Krako",
      "relatedEntryIds": [
        "recap-sitzung-2"
      ],
      "statblock": {
        "Attribute": "ST 18, GE 16, KO 16, IN 14, WE 12, CH 18",
        "Rettungen": "GE +7, KO +6, WE +4",
        "Fertigkeiten": "Heimlichkeit +7, Wahrnehmung +6, Einschüchtern +8",
        "Resistenzen": "Gift, Nekrotisch",
        "Immunitäten": "Krankheitszustand",
        "Sinne": "Dunkelsicht 18 m, Passive Wahrnehmung 16",
        "Sprachen": "Gemeinsprache, Untergemein, Sprache der Ratten"
      },
      "actions": [
        "Multiattack: zwei Klauen und ein Biss oder eine Seuchenwelle.",
        "Klauen: Nahkampfangriff +7, Reichweite 3 m, 2W6+4 Hiebschaden.",
        "Biss: Nahkampfangriff +7, Reichweite 1,5 m, 2W8+4 Stichschaden plus 2W8 nekrotisch; KO-Rettungswurf SG 15 oder 1 Minute vergiftet.",
        "Seuchenwelle (Aufladung 5–6): 9-m-Kegel, KO-Rettungswurf SG 15, 6W6 nekrotisch; bei Fehlschlag zusätzlich 1 Minute vergiftet.",
        "Legendäre Aktion – Rattenflüstern (2): Beschwört 1W4 Rattenschwärme in 9 m Entfernung.",
        "Legendäre Aktion – Dunkle Präsenz (2): WE-Rettungswurf SG 16 oder 1 Minute verängstigt."
      ],
      "notes": "Rattenflut: Einmal pro Runde kann sie als Reaktion auf Schaden 2W6 fanatische Schwarmratten aus sich heraus beschwören.",
      "visible": true,
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": true
      },
      "harvest": []
    },
    {
      "id": "monster-wanderbrut-arbeiter",
      "title": "Wanderbrut-Arbeiter",
      "tags": [
        "Wanderbrut",
        "Tunnel",
        "Säure"
      ],
      "dangerTags": [
        "Säure",
        "Greifer"
      ],
      "summary": "Ein kleiner Tunnelgräber der Wanderbrut, der Beute festhält und mit Säure nachsetzt.",
      "body": "Arbeiter der Wanderbrut graben schmale, instabile Tunnel durch Erde und Sand. Sie sind einzeln handhabbar, werden aber gefährlich, sobald sie Ziele packen und in Engstellen festhalten.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Wanderbrut Arbeiter.png"
      ],
      "chapterId": "erdgaenge",
      "chapterName": "Erdgänge & Brutnester",
      "type": "Monstrosität",
      "size": "Klein",
      "cr": "1/4",
      "ac": "11",
      "hp": "15",
      "speed": "6 m, Graben 3 m",
      "alignment": "Neutral",
      "habitat": "Erdtunnel, Sandböden und junge Brutgänge",
      "threatClass": "Brutarbeiter",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Am Boden ist der weiche Bauch deutlich verwundbarer als der Chitinpanzer.",
      "traceTags": [
        "instabile Schrägtunnel",
        "Säurespritzer",
        "schmale Grabspuren"
      ],
      "warningSigns": [
        "weicher Boden unter den Füßen",
        "frisch ausgehobene Erdscharten"
      ],
      "behavior": "Packt kleine und mittlere Ziele und versucht sie im Tunnel festzuhalten.",
      "tactics": "Einzelne Arbeiter eröffnen mit Biss und zwingen Gegner so in die Linie des Säurespuckens weiterer Brut.",
      "lastSighting": "Brutgänge des Knollenbaron-Auftrags",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Attribute": "ST 12, GE 12, KO 11, IN 1, WE 10, CH 5",
        "Sinne": "Dunkelsicht 9 m, Bebensinn 9 m, Passive Wahrnehmung 10",
        "Sprachen": "—",
        "Besonderheit": "Tunnelgräber: hinterlässt schmale, instabile Tunnel von etwa 1,5 m Breite."
      },
      "actions": [
        "Biss: Nahkampfangriff +3, Reichweite 1,5 m, 1W6+2 Stich plus 1W4 Säure.",
        "Mittelgroße oder kleinere Ziele sind bei Treffer gepackt; Entkommen SG 11.",
        "Säurespucken (Aufladen 6): 4,5-m-Linie, 1,5 m breit, GES-Rettungswurf SG 11, 2W4 Säureschaden, bei Erfolg halbiert.",
        "Säurespucken kann nicht eingesetzt werden, solange der Arbeiter gerade ein Ziel gepackt hält."
      ],
      "notes": "Die grobe Gefahreneinschätzung im Feldbericht lag bei HG 1/4.",
      "visible": true,
      "harvest": []
    },
    {
      "id": "monster-wanderbrut-krieger",
      "title": "Wanderbrut-Krieger",
      "tags": [
        "Wanderbrut",
        "Tunnel",
        "Hinterhalt"
      ],
      "dangerTags": [
        "Greifer",
        "Säure"
      ],
      "summary": "Ein großer Wanderbrut-Krieger, der aus dem Boden herausstößt und Ziele festsetzt.",
      "body": "Krieger der Wanderbrut sind deutlich robuster als Arbeiter und nutzen ihr Auftauchen aus dem Boden gezielt für Hinterhalte. Sobald sie ein Ziel gepackt haben, halten sie es rücksichtslos fest.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Wanderbrut Krieger.png"
      ],
      "chapterId": "erdgaenge",
      "chapterName": "Erdgänge & Brutnester",
      "type": "Monstrosität",
      "size": "Groß",
      "cr": "2",
      "ac": "16",
      "hp": "40",
      "speed": "9 m, Graben 3 m",
      "alignment": "Neutral",
      "habitat": "Tiefere Brutgänge und Einsturzschneisen",
      "threatClass": "Brutkrieger",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Am Boden oder umgeworfen verliert der verstärkte Panzer deutlich an Schutzwirkung.",
      "traceTags": [
        "aufgebrochene Erde",
        "schwere Schleifspuren",
        "Säurefurchen"
      ],
      "warningSigns": [
        "vibrierender Untergrund",
        "frisch abgesackte Erddecken"
      ],
      "behavior": "Taucht aus dem Boden auf, bindet ein Ziel und hält die Front.",
      "tactics": "Bewegt sich mindestens 3 m eingegraben, um mit Vorteil in den ersten Biss zu gehen.",
      "lastSighting": "Brutgänge des Knollenbaron-Auftrags",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Attribute": "ST 18, GE 11, KO 14, IN 1, WE 13, CH 6",
        "Sinne": "Dunkelsicht 18 m, Bebensinn 18 m, Passive Wahrnehmung 11",
        "Sprachen": "—",
        "Besonderheit": "Hinterhalt aus der Erde: Nach mindestens 3 m eingegrabener Bewegung hat der erste Biss Vorteil."
      },
      "actions": [
        "Biss: Nahkampfangriff +6, Reichweite 1,5 m, 2W6+4 Stich plus 1W6 Säure.",
        "Große oder kleinere Ziele sind bei Treffer gepackt; Entkommen SG 14. Solange gepackt, ist das Ziel festgesetzt.",
        "Säurestrahl (Aufladen 5–6): 9-m-Linie, 1,5 m breit, GES-Rettungswurf SG 14, 3W6 Säureschaden, bei Erfolg halbiert.",
        "Säurestrahl ist nicht nutzbar, solange ein Ziel gepackt ist."
      ],
      "notes": "Die grobe Gefahreneinschätzung im Feldbericht lag bei HG 2.",
      "visible": true,
      "harvest": []
    },
    {
      "id": "monster-wanderbrut-koenigin",
      "title": "Wanderbrut-Königin",
      "tags": [
        "Wanderbrut",
        "Boss",
        "Brutnest"
      ],
      "dangerTags": [
        "Boss",
        "Säure",
        "Brutmutter"
      ],
      "summary": "Die riesige Königin der Wanderbrut steuert ihre Arbeiter über Pheromone und überwältigt Gegner mit Masse und Säure.",
      "body": "Die Königin ist das Zentrum des Brutinstinkts. Sie kann neue Arbeiter aus den Tunneln herbeirufen und hält Ziele mit ihrer Masse fest, bevor sie Säure konzentriert auf sie richtet.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Wanderbrut Königin.png"
      ],
      "chapterId": "erdgaenge",
      "chapterName": "Erdgänge & Brutnester",
      "type": "Monstrosität",
      "size": "Riesig",
      "cr": "6",
      "ac": "12",
      "hp": "120",
      "speed": "9 m, Graben 6 m",
      "alignment": "Neutral",
      "habitat": "Große Brutkammern und zentrale Tunnelsysteme",
      "threatClass": "Brutmutter",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Einige Treffer zeigen erst Wirkung, wenn sie umgeworfen oder festgesetzt wird.",
      "traceTags": [
        "breite Brutgänge",
        "Säurebecken",
        "frische Eigelege"
      ],
      "warningSigns": [
        "viele Arbeiter in kurzer Zeit",
        "starker säuerlicher Brutgeruch"
      ],
      "behavior": "Bleibt im Zentrum ihrer Brut und verstärkt Arbeiter in ihrer Nähe.",
      "tactics": "Setzt zuerst auf Druck durch Arbeiter und nutzt Säurefontäne, sobald mehrere Ziele in Reichweite stehen.",
      "lastSighting": "Zentrale Brutkammer des Knollenbaron-Auftrags",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": true,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Attribute": "ST 20, GE 10, KO 17, IN 2, WE 14, CH 8",
        "Sinne": "Dunkelsicht 18 m, Bebensinn 18 m, Passive Wahrnehmung 12",
        "Sprachen": "—",
        "Besonderheit": "Pheromon-Befehl: Verbündete Arbeiter im Umkreis von 18 m erhalten +1 auf Angriffswürfe."
      },
      "actions": [
        "Mehrfachangriff: ein Biss und ein Schmettern.",
        "Biss: Nahkampfangriff +8, Reichweite 3 m, 2W8+5 Stich plus 2W6 Säure; Ziele bis Größe Riesig sind gepackt, Entkommen SG 16.",
        "Schmettern: Nahkampfangriff +8, Reichweite 3 m, 2W6+5 Wucht; ST-Rettungswurf SG 16 oder zu Boden.",
        "Säurefontäne (Aufladen 5–6): Wahlweise 9-m-Kegel oder 18-m-Linie (1,5 m breit), GES-Rettungswurf SG 16, 6W6 Säureschaden, bei Erfolg halbiert.",
        "Brutmutter (1/Tag): Ruft 1W4 Wanderbrut-Arbeiter aus Tunneln oder Eiern herbei.",
        "Optionale Boss-Würze: Säureglob als einzelne legendäre Aktion, Fernangriff +8, 3W6 Säureschaden."
      ],
      "notes": "Die grobe Gefahreneinschätzung im Feldbericht lag bei HG 6–7, abhängig davon, wie oft neue Arbeiter hinzukommen.",
      "visible": true,
      "harvest": []
    },
    {
      "id": "monster-earth-elemental",
      "title": "Erdelementar",
      "tags": [
        "Relikte",
        "Elementar",
        "Ausgrabung"
      ],
      "dangerTags": [
        "Belagerer",
        "Erdbeben"
      ],
      "summary": "Ein massiver Erdwandler aus Stein und Erde, der ganze Ausgrabungsstätten blockieren kann.",
      "body": "An der Ausgrabungsstätte beim Grenzposten wurden Erdelementare als Teil eines Reliquienproblems bekämpft. Das Wesen gleitet durch unbehauene Erde und Stein, ohne sichtbare Tunnel zu hinterlassen.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Erdelemtar.png"
      ],
      "chapterId": "reliquien",
      "chapterName": "Relikte & Elementare",
      "type": "Elementar",
      "size": "Groß",
      "cr": "5",
      "ac": "17",
      "hp": "126",
      "speed": "9 m, Graben 9 m",
      "alignment": "Neutral",
      "habitat": "Ausgrabungsstätten, Felsgründe und lockerer Steinboden",
      "threatClass": "Belagerer",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "fieldNote": "Das Material bewegt sich beim Graben fast lautlos; nur vibrierender Schutt verrät den Anmarsch.",
      "traceTags": [
        "Risse im Boden",
        "vibrierender Schutt",
        "verlagerte Steinplatten"
      ],
      "warningSigns": [
        "plötzliche Erderschütterung",
        "absinkender Untergrund"
      ],
      "behavior": "Rückt langsam, aber unaufhaltsam vor und zerschlägt Hindernisse statt sie zu umgehen.",
      "tactics": "Nutzen ihre Widerstandskraft aus und binden Gruppen an Stellen, an denen sie Gelände kontrollieren können.",
      "lastSighting": "Ausgrabungsstätte nahe dem Grenzposten",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": false,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Attribute": "ST 20, GE 8, KO 20, IN 5, WE 10, CH 5",
        "Resistenzen": "Wucht-, Stich- und Hiebschaden von nichtmagischen Angriffen",
        "Immunitäten": "Gift",
        "Zustände": "Erschöpfung, gelähmt, versteinert, vergiftet, bewusstlos",
        "Sinne": "Dunkelsicht 18 m, Bebensinn 18 m, Passive Wahrnehmung 10",
        "Sprachen": "Terran"
      },
      "actions": [
        "Mehrfachangriff: Das Elementar führt zwei Slam-Angriffe aus.",
        "Slam: Nahkampfangriff +8, Reichweite 3 m, 2W8+5 Wuchtschaden.",
        "Earth Glide: Kann sich durch nichtmagische, unbearbeitete Erde und Stein graben, ohne das Material sichtbar zu stören.",
        "Siege Monster: Verursacht doppelten Schaden an Objekten und Strukturen."
      ],
      "notes": "In den Questnotizen wurde zusätzlich ein Erdbeben-Effekt als Spezialangriff erwähnt: Radius 6 m, ST-Rettungswurf über 10, 3W8 Schaden plus liegend, bei Erfolg halbiert.",
      "visible": true,
      "harvest": []
    },
    {
      "id": "monster-earth-elemental-myrmidon",
      "title": "Erdelementar Myrmidon",
      "tags": [
        "Relikte",
        "Elementar",
        "Wächter"
      ],
      "dangerTags": [
        "Wächter",
        "Donner"
      ],
      "summary": "Ein gepanzerter Erdelementar in der Form eines Kriegers, der über Relikte und Ausgrabungen wacht.",
      "body": "Die Myrmidon-Variante trat als stärkere Wächterform an der Ausgrabungsstätte auf. Sie ist widerstandsfähiger als ein gewöhnliches Erdelementar und schlägt mit donnerverstärkten Hieben zu.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Erdelementar Myrmidon.png"
      ],
      "chapterId": "reliquien",
      "chapterName": "Relikte & Elementare",
      "type": "Elementar",
      "size": "Mittel",
      "cr": "7",
      "ac": "18",
      "hp": "127",
      "speed": "9 m",
      "alignment": "Typischerweise neutral",
      "habitat": "Ausgrabungsstätten, Hallen mit Relikten und geschützte Steingänge",
      "threatClass": "Reliktwächter",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "traceTags": [
        "schwere Schrittspuren im Stein",
        "abgesplitterte Felsplatten"
      ],
      "warningSigns": [
        "metallisches Grollen im Fels",
        "plötzliche Staubstöße"
      ],
      "behavior": "Hält Positionen und drängt Angreifer frontal zurück.",
      "tactics": "Nutzen ihre Rüstung, um Engstellen zu halten, und setzen Thunderous Strike ein, wenn Ziele bereits gebunden sind.",
      "lastSighting": "Ausgrabungsstätte nahe dem Grenzposten",
      "relatedEntryIds": [],
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": true,
        "traceTags": true,
        "warningSigns": true,
        "behavior": true,
        "tactics": true,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": false,
        "notes": true,
        "extras": true,
        "links": false
      },
      "statblock": {
        "Attribute": "ST 18, GE 10, KO 17, IN 8, WE 10, CH 10",
        "Resistenzen": "Wucht-, Stich- und Hiebschaden von nichtmagischen Angriffen",
        "Immunitäten": "Gift",
        "Zustände": "Gelähmt, versteinert, vergiftet, liegend",
        "Sinne": "Dunkelsicht 18 m, Passive Wahrnehmung 10",
        "Sprachen": "Terran und eine Sprache seines Erschaffers"
      },
      "actions": [
        "Magic Weapons: Die Waffenangriffe des Myrmidons gelten als magisch.",
        "Multiattack: Der Myrmidon macht zwei Maul-Angriffe.",
        "Maul: Nahkampfangriff +7, Reichweite 1,5 m, 2W6+4 Wuchtschaden.",
        "Thunderous Strike (Aufladung 6): Ein Maul-Angriff; bei Treffer zusätzliche 3W4 Donnerschaden und ST-Rettungswurf SG 14 oder das Ziel liegt."
      ],
      "notes": "Die Questnotizen erwähnen, dass begleitende Erdelementare nach dem Tod des Myrmidons zerfallen konnten.",
      "visible": true,
      "fieldNote": "",
      "harvest": []
    },
    {
      "id": "monster-junger-kraken",
      "title": "Junger Kraken",
      "tags": [
        "Tiefsee",
        "Leviathan",
        "Blitz"
      ],
      "dangerTags": [
        "Boss",
        "Blitz",
        "Legendär"
      ],
      "summary": "Eine junge, aber bereits riesige Krakenbrut mit Blitzangriffen und telepathischer Präsenz.",
      "body": "Zu diesem Wesen liegt derzeit vor allem ein erbeuteter Stat-Sheet-Bericht vor. Schon in diesem frühen Stadium ist der Kraken eine Großbedrohung für jede Gruppe, die ihm ohne Vorbereitung begegnet.",
      "lastUpdated": "2026-05-08",
      "images": [
        "Monster\\Junger Kraken.png"
      ],
      "chapterId": "tiefsee",
      "chapterName": "Tiefwasser & Titanen",
      "type": "Monstrosität",
      "size": "Riesig",
      "cr": "14",
      "ac": "16",
      "hp": "207",
      "speed": "6 m, Graben 15 m, Schwimmen 15 m",
      "alignment": "Chaotisch böse",
      "habitat": "Tiefwasser, Küstenabbrüche und unterspülte Höhlen",
      "threatClass": "Leviathan-Brut",
      "status": "Bestätigt",
      "discoveryStatus": "Begegnet",
      "lastSighting": "Unbekannte Tiefwasserzone",
      "visibility": {
        "title": true,
        "summary": true,
        "images": true,
        "meta": true,
        "body": true,
        "fieldNote": false,
        "traceTags": false,
        "warningSigns": false,
        "behavior": false,
        "tactics": false,
        "lastSighting": true,
        "statblock": true,
        "actions": true,
        "harvest": false,
        "notes": true,
        "extras": true,
        "links": false
      },
      "fieldNote": "Archiviert für spätere Freigabe.",
      "traceTags": [
        "Archiviert"
      ],
      "warningSigns": [
        "Archiviert"
      ],
      "behavior": "Archiviert für spätere Freigabe.",
      "tactics": "Archiviert für spätere Freigabe.",
      "relatedEntryIds": [],
      "statblock": {
        "Attribute": "ST 24, GE 11, KO 20, IN 19, WE 14, CH 17",
        "Rettungen": "ST +12, GE +5, KO +10, IN +9, WE +7",
        "Resistenzen": "Wucht-, Hiebschaden",
        "Immunitäten": "Blitz",
        "Zustände": "Verängstigt, betäubt",
        "Sinne": "Wahrer Blick 36 m, Passive Wahrnehmung 12",
        "Sprachen": "Camarith, Telepathisch"
      },
      "actions": [
        "Multiangriff: Wenn der Kraken über der Wasseroberfläche ist, nutzt er sowohl Tentakel als auch Blitzangriff.",
        "Tentakeln: Der Kraken nutzt all seine Tentakeln.",
        "Blitzschlag: Magischer Blitz gegen ein Ziel innerhalb von 27 m; GES-Rettungswurf SG 18 oder 4W10 Blitzschaden, bei Erfolg halbiert.",
        "Legendäre Resistenz: Misslingt dem Kraken ein Rettungswurf, kann er sich stattdessen entscheiden, ihn zu bestehen."
      ],
      "notes": "Weitere Verhaltens- und Jagddaten fehlen aktuell noch und sollten später nachgetragen werden.",
      "visible": true,
      "harvest": []
    }
  ]
};

(() => {
  const combatByMonsterId = {
    "monster-klagewolf": {
      enabled: true,
      initiativeMod: 2,
      armorClass: 12,
      hpMax: 12,
      abilities: { str: 12, dex: 14, con: 12, int: 4, wis: 12, cha: 6 },
      defaultActionId: "giftbiss",
      attacks: [
        {
          id: "giftbiss",
          name: "Giftbiss",
          attackBonus: 4,
          damage: [{ formula: "2d4+2", type: "Stich" }],
          notes: "Bei Treffer KO-Rettungswurf SG 12 oder vergiftet."
        }
      ],
      notes: "Aus dem Stat-Sheet im Monsterordner übernommen."
    },
    "monster-klagewolf-rudelfuehrer": {
      enabled: true,
      initiativeMod: 2,
      armorClass: 14,
      hpMax: 36,
      abilities: { str: 16, dex: 14, con: 14, int: 4, wis: 12, cha: 6 },
      defaultActionId: "giftbiss",
      attacks: [
        {
          id: "giftbiss",
          name: "Giftbiss",
          attackBonus: 5,
          damage: [{ formula: "2d6+3", type: "Stich" }],
          notes: "Bei Treffer KO-Rettungswurf SG 12 oder vergiftet. Rankenfesseln bleibt als erzählerische Sonderaktion."
        }
      ],
      notes: "Rankenfesseln ist in V1 keine eigene Schadensaktion, weil die Kampfprobe nur Angriffswürfe auswertet."
    },
    "monster-riesenklagewolf": {
      enabled: true,
      initiativeMod: 3,
      armorClass: 16,
      hpMax: 116,
      abilities: { str: 18, dex: 16, con: 16, int: 6, wis: 14, cha: 8 },
      defaultActionId: "giftbiss",
      attacks: [
        {
          id: "giftbiss",
          name: "Giftbiss",
          attackBonus: 6,
          damage: [{ formula: "2d10+4", type: "Stich" }],
          notes: "Bei Treffer KO-Rettungswurf SG 12 oder vergiftet. Rankenfesseln und Dornenwuchs bleiben als Sonderaktionen im Akteneintrag."
        }
      ],
      notes: "Aus dem Stat-Sheet im Monsterordner übernommen."
    },
    "monster-wyvern": {
      enabled: true,
      initiativeMod: 0,
      armorClass: 13,
      hpMax: 110,
      abilities: { str: 19, dex: 10, con: 16, int: 5, wis: 12, cha: 6 },
      defaultActionId: "stachel",
      attacks: [
        {
          id: "biss",
          name: "Biss",
          attackBonus: 7,
          damage: [{ formula: "2d6+4", type: "Stich" }]
        },
        {
          id: "klauen",
          name: "Klauen",
          attackBonus: 7,
          damage: [{ formula: "2d8+4", type: "Hieb" }]
        },
        {
          id: "stachel",
          name: "Stachel",
          attackBonus: 7,
          damage: [
            { formula: "2d6+4", type: "Stich" },
            { formula: "7d6", type: "Gift" }
          ],
          notes: "KO-Rettungswurf SG 15 halbiert den Giftschaden."
        },
        {
          id: "spalten",
          name: "Spalten",
          type: "save",
          actionCost: "action",
          target: { mode: "area", side: "enemies", maxTargets: null, shape: "Linie oder Kegel" },
          save: { ability: "dex", dc: 15, success: "half" },
          damage: [{ formula: "3d10", type: "Gift" }],
          effects: [{ type: "condition", condition: "poisoned", name: "Vergiftet", applyOn: "failure" }],
          notes: "Quest-Spezialattacke mit GES-Rettungswurf; bei Erfolg halber Schaden."
        }
      ],
      notes: "Basiswerte nach bekanntem 5e-Wyvern, ergänzt um die Quest-Spezialattacke Spalten."
    },
    "monster-riesige-kanalratte": {
      enabled: true,
      initiativeMod: 2,
      armorClass: 12,
      hpMax: 22,
      abilities: { str: 12, dex: 14, con: 12, int: 2, wis: 10, cha: 4 },
      defaultActionId: "biss",
      attacks: [
        {
          id: "biss",
          name: "Biss",
          attackBonus: 4,
          damage: [{ formula: "1d8+2", type: "Stich" }],
          notes: "Krankheitsbiss: 30% Chance auf leichte Infektion, KO-Rettungswurf SG 12."
        }
      ],
      notes: "Aus Riesige Kanalratte.md übernommen."
    },
    "monster-rattenschwarm": {
      enabled: true,
      initiativeMod: 2,
      armorClass: 10,
      hpMax: 36,
      abilities: { str: 9, dex: 14, con: 11, int: 2, wis: 10, cha: 3 },
      defaultActionId: "schwaermender-biss",
      attacks: [
        {
          id: "schwaermender-biss",
          name: "Schwärmender Biss",
          attackBonus: 3,
          damage: [{ formula: "4d6", type: "Stich" }],
          notes: "Der Schaden sinkt laut Akte, wenn der Schwarm unter 50% LP fällt; V1 nutzt den vollen Wert."
        }
      ],
      notes: "Aus Rattenschwarm.md übernommen."
    },
    "monster-riesenratten-nesthueter": {
      enabled: true,
      initiativeMod: 3,
      armorClass: 14,
      hpMax: 45,
      abilities: { str: 14, dex: 16, con: 14, int: 6, wis: 12, cha: 8 },
      defaultActionId: "biss",
      attacks: [
        {
          id: "biss",
          name: "Biss",
          attackBonus: 5,
          damage: [{ formula: "2d4+4", type: "Stich" }],
          notes: "Seuchenbiss: KO-Rettungswurf SG 12 oder vergiftet."
        },
        {
          id: "klauen",
          name: "Klauen",
          attackBonus: 5,
          damage: [{ formula: "1d8+3", type: "Hieb" }]
        }
      ],
      notes: "Aus Riesenratten Nesthüter.md übernommen."
    },
    "monster-rattenkoenigin": {
      enabled: true,
      initiativeMod: 3,
      armorClass: 16,
      hpMax: 136,
      abilities: { str: 18, dex: 16, con: 16, int: 14, wis: 12, cha: 18 },
      defaultActionId: "biss",
      attacks: [
        {
          id: "klauen",
          name: "Klauen",
          attackBonus: 7,
          damage: [{ formula: "2d6+4", type: "Hieb" }]
        },
        {
          id: "biss",
          name: "Biss",
          attackBonus: 7,
          damage: [
            { formula: "2d8+4", type: "Stich" },
            { formula: "2d8", type: "Nekrotisch" }
          ],
          notes: "KO-Rettungswurf SG 15 oder vergiftet."
        },
        {
          id: "seuchenwelle",
          name: "Seuchenwelle",
          type: "save",
          actionCost: "action",
          target: { mode: "area", side: "enemies", maxTargets: null, shape: "Kegel", range: "9 m" },
          save: { ability: "con", dc: 15, success: "half" },
          damage: [{ formula: "6d6", type: "Nekrotisch" }],
          effects: [{ type: "condition", condition: "poisoned", name: "Vergiftet", applyOn: "failure" }],
          notes: "Aufladung 5-6."
        }
      ],
      notes: "Aus Rattenkönigin.md übernommen. Legendäre Aktionen bleiben in V1 erzählerisch."
    },
    "monster-wanderbrut-arbeiter": {
      enabled: true,
      initiativeMod: 1,
      armorClass: 11,
      hpMax: 15,
      abilities: { str: 12, dex: 12, con: 11, int: 1, wis: 10, cha: 5 },
      defaultActionId: "biss",
      attacks: [
        {
          id: "biss",
          name: "Biss",
          attackBonus: 3,
          damage: [
            { formula: "1d6+2", type: "Stich" },
            { formula: "1d4", type: "Säure" }
          ],
          notes: "Mittelgroße oder kleinere Ziele sind bei Treffer gepackt, Entkommen SG 11."
        },
        {
          id: "saeurespucken",
          name: "Säurespucken",
          type: "save",
          actionCost: "action",
          target: { mode: "area", side: "enemies", maxTargets: null, shape: "Linie" },
          save: { ability: "dex", dc: 11, success: "half" },
          damage: [{ formula: "2d4", type: "Säure" }],
          notes: "Aufladen 6."
        }
      ],
      notes: "Aus Knollenbaron Quest.md übernommen."
    },
    "monster-wanderbrut-krieger": {
      enabled: true,
      initiativeMod: 0,
      armorClass: 16,
      hpMax: 40,
      abilities: { str: 18, dex: 11, con: 14, int: 1, wis: 13, cha: 6 },
      defaultActionId: "biss",
      attacks: [
        {
          id: "biss",
          name: "Biss",
          attackBonus: 6,
          damage: [
            { formula: "2d6+4", type: "Stich" },
            { formula: "1d6", type: "Säure" }
          ],
          notes: "Große oder kleinere Ziele sind bei Treffer gepackt und festgesetzt, Entkommen SG 14."
        },
        {
          id: "saeurestrahl",
          name: "Säurestrahl",
          type: "save",
          actionCost: "action",
          target: { mode: "area", side: "enemies", maxTargets: null, shape: "Linie" },
          save: { ability: "dex", dc: 14, success: "half" },
          damage: [{ formula: "3d6", type: "Säure" }],
          notes: "Aufladen 5-6."
        }
      ],
      notes: "Aus Knollenbaron Quest.md übernommen."
    },
    "monster-wanderbrut-koenigin": {
      enabled: true,
      initiativeMod: 0,
      armorClass: 12,
      hpMax: 120,
      abilities: { str: 20, dex: 10, con: 17, int: 2, wis: 14, cha: 8 },
      defaultActionId: "biss",
      attacks: [
        {
          id: "biss",
          name: "Biss",
          attackBonus: 8,
          damage: [
            { formula: "2d8+5", type: "Stich" },
            { formula: "2d6", type: "Säure" }
          ],
          notes: "Ziele bis Größe Riesig sind bei Treffer gepackt und festgesetzt, Entkommen SG 16."
        },
        {
          id: "schmettern",
          name: "Schmettern",
          attackBonus: 8,
          damage: [{ formula: "2d6+5", type: "Wucht" }],
          notes: "ST-Rettungswurf SG 16 oder zu Boden."
        },
        {
          id: "saeurefontaene",
          name: "Säurefontäne",
          type: "save",
          actionCost: "action",
          target: { mode: "area", side: "enemies", maxTargets: null, shape: "Kegel oder Linie" },
          save: { ability: "dex", dc: 16, success: "half" },
          damage: [{ formula: "6d6", type: "Säure" }],
          notes: "Aufladung 5-6."
        }
      ],
      notes: "Aus Knollenbaron Quest.md übernommen."
    },
    "monster-earth-elemental": {
      enabled: true,
      initiativeMod: -1,
      armorClass: 17,
      hpMax: 126,
      abilities: { str: 20, dex: 8, con: 20, int: 5, wis: 10, cha: 5 },
      defaultActionId: "slam",
      attacks: [
        {
          id: "slam",
          name: "Slam",
          attackBonus: 8,
          damage: [{ formula: "2d8+5", type: "Wucht" }]
        },
        {
          id: "erdbeben",
          name: "Erdbeben",
          type: "save",
          actionCost: "action",
          target: { mode: "area", side: "enemies", maxTargets: null, shape: "Radius", radius: 6 },
          save: { ability: "str", dc: 10, success: "half" },
          damage: [{ formula: "3d8", type: "Wucht" }],
          effects: [{ type: "condition", condition: "prone", name: "Liegend", applyOn: "failure" }],
          notes: "Quest-Spezialangriff. Bei Fehlschlag zusätzlich liegend."
        }
      ],
      notes: "Slam aus Stat-Sheet, Erdbeben aus Questnotizen."
    },
    "monster-earth-elemental-myrmidon": {
      enabled: true,
      initiativeMod: 0,
      armorClass: 18,
      hpMax: 127,
      abilities: { str: 18, dex: 10, con: 17, int: 8, wis: 10, cha: 10 },
      defaultActionId: "maul",
      attacks: [
        {
          id: "maul",
          name: "Maul",
          attackBonus: 7,
          damage: [{ formula: "2d6+4", type: "Wucht" }]
        },
        {
          id: "thunderous-strike",
          name: "Thunderous Strike",
          attackBonus: 7,
          damage: [
            { formula: "2d6+4", type: "Wucht" },
            { formula: "3d10", type: "Donner" }
          ],
          notes: "Aufladung 6. ST-Rettungswurf SG 14 oder zu Boden."
        }
      ],
      notes: "Aus den Erdelementar-Myrmidon-Stat-Sheets übernommen."
    },
    "monster-junger-kraken": {
      enabled: true,
      initiativeMod: 0,
      armorClass: 16,
      hpMax: 207,
      abilities: { str: 24, dex: 11, con: 20, int: 19, wis: 14, cha: 17 },
      defaultActionId: "blitzschlag",
      attacks: [
        {
          id: "blitzschlag",
          name: "Blitzschlag",
          type: "save",
          actionCost: "action",
          target: { mode: "area", side: "enemies", maxTargets: null, shape: "Linie" },
          save: { ability: "dex", dc: 18, success: "half" },
          damage: [{ formula: "4d10", type: "Blitz" }],
          notes: "Aus dem Stat-Sheet: GES-Rettungswurf SG 18, bei Erfolg halber Schaden."
        }
      ],
      notes: "Tentakeldaten fehlen im Bild; V1 nutzt deshalb nur den dokumentierten Blitzschlag."
    }
  };

  if (window.bestiary && Array.isArray(window.bestiary.monsters)) {
    window.bestiary.monsters = window.bestiary.monsters.map((monster) => {
      const combat = monster && combatByMonsterId[monster.id];
      return combat ? { ...monster, combat } : monster;
    });
  }
})();

window.heroes = {
  "meta": {
    "title": "Heldenakten",
    "subtitle": "Persönliche Chroniken der bekannten Heldengruppe"
  },
  "heroes": [
    {
      "id": "gottfried",
      "name": "Gottfried",
      "aliases": [
        "Gottfried",
        "gottfried",
        "Gotti"
      ],
      "playerName": "",
      "playerAliases": [],
      "className": "Paladin",
      "subclass": "",
      "level": 5,
      "species": "Mensch",
      "title": "Beispielheld der Vetra Skupina",
      "image": "",
      "vitals": {
        "armorClass": 18,
        "hpCurrent": 44,
        "hpMax": 44,
        "initiativeMod": 1,
        "speed": "9 m",
        "passivePerception": 11,
        "proficiencyBonus": 3
      },
      "abilities": {
        "str": 16,
        "dex": 12,
        "con": 14,
        "int": 10,
        "wis": 12,
        "cha": 16
      },
      "saves": {
        "wis": {
          "bonus": 4,
          "proficient": true
        },
        "cha": {
          "bonus": 6,
          "proficient": true
        }
      },
      "skills": [
        {
          "id": "athletik",
          "label": "Athletik",
          "bonus": 6,
          "proficient": true
        },
        {
          "id": "ueberzeugen",
          "label": "Überzeugen",
          "bonus": 6,
          "proficient": true
        }
      ],
      "spellcasting": {
        "ability": "cha",
        "spellSaveDc": 14,
        "spellAttackBonus": 6,
        "slots": {
          "1": {
            "current": 4,
            "max": 4
          },
          "2": {
            "current": 2,
            "max": 2
          }
        },
        "notes": "Beispielwerte für Phase 5. Zauberplätze werden nur innerhalb einer Kampfprobe verbraucht."
      },
      "attacks": [
        {
          "id": "langschwert",
          "name": "Langschwert",
          "type": "attack",
          "actionCost": "action",
          "target": {
            "mode": "single",
            "side": "enemies",
            "maxTargets": 1
          },
          "attackBonus": 6,
          "damage": [
            {
              "formula": "1d8+3",
              "type": "Hieb"
            }
          ],
          "notes": "Solider Beispielangriff für die Kampfprobe."
        },
        {
          "id": "lenkendes-geschoss",
          "name": "Lenkendes Geschoss",
          "type": "attack",
          "actionCost": "action",
          "resourceCost": {
            "type": "spellSlot",
            "level": 1,
            "amount": 1
          },
          "attackBonusSource": "spell",
          "target": {
            "mode": "single",
            "side": "enemies",
            "maxTargets": 1
          },
          "damage": [
            {
              "formula": "4d6",
              "type": "Gleißend"
            }
          ],
          "notes": "Beispiel-Zauber: verbraucht einen Zauberplatz Grad 1 oder höher."
        },
        {
          "id": "goettlicher-schlag",
          "name": "Göttlicher Schlag",
          "type": "attack",
          "actionCost": "action",
          "resourceCost": {
            "type": "spellSlot",
            "level": 1,
            "amount": 1,
            "notes": "V2-Beispiel: verbraucht einen Zauberplatz des 1. Grades."
          },
          "target": {
            "mode": "single",
            "side": "enemies",
            "maxTargets": 1
          },
          "attackBonus": 6,
          "damage": [
            {
              "formula": "1d8+3",
              "type": "Hieb"
            },
            {
              "formula": "2d8",
              "type": "Gleißend"
            }
          ],
          "notes": "Vereinfachte Beispielvariante mit zusätzlichem Strahlenschaden."
        }
      ],
      "resources": [
        {
          "id": "handauflegen",
          "name": "Handauflegen",
          "current": 25,
          "max": 25,
          "recharge": "Lange Rast",
          "notes": "Beispielressource."
        }
      ],
      "notes": "Beispielakte zum Testen der Heldenakte und Kampfprobe. Werte bei Bedarf im Editor ersetzen.",
      "background": "Diese Akte ist bewusst als Vorlage angelegt, damit die neue Heldenansicht und die Kampfprobe sofort ausprobiert werden können.",
      "visible": true
    }
  ]
};

window.heroes = {
  "meta": {
    "title": "Heldenakten",
    "subtitle": "Persönliche Chroniken der bekannten Heldengruppe"
  },
  "heroes": [
    {
      "id": "anastasia",
      "name": "Anastasia von Thaloren",
      "aliases": ["Anastasia", "Anastasia von Thaloren", "ana"],
      "playerName": "Kati",
      "playerAliases": ["kati"],
      "className": "Zauberin",
      "subclass": "Sturmzauberin",
      "level": 5,
      "species": "Elf",
      "title": "Sturmzauberin von Thaloren",
      "image": "images/Helden/AnastasiaChibi.png",
      "vitals": {
        "armorClass": 13,
        "hpCurrent": 32,
        "hpMax": 32,
        "initiativeMod": 3,
        "speed": "9 m",
        "passivePerception": 13,
        "proficiencyBonus": 3
      },
      "abilities": { "str": 8, "dex": 16, "con": 14, "int": 10, "wis": 10, "cha": 16 },
      "saves": {
        "str": { "bonus": -1, "proficient": false },
        "dex": { "bonus": 3, "proficient": false },
        "con": { "bonus": 5, "proficient": true },
        "int": { "bonus": 0, "proficient": false },
        "wis": { "bonus": 0, "proficient": false },
        "cha": { "bonus": 6, "proficient": true }
      },
      "skills": [
        { "id": "akrobatik", "label": "Akrobatik", "bonus": 3, "proficient": false },
        { "id": "fingerfertigkeit", "label": "Fingerfertigkeit", "bonus": 3, "proficient": false },
        { "id": "heimlichkeit", "label": "Heimlichkeit", "bonus": 3, "proficient": false },
        { "id": "taeuschen", "label": "Täuschen", "bonus": 6, "proficient": true },
        { "id": "ueberzeugen", "label": "Überzeugen", "bonus": 6, "proficient": true },
        { "id": "wahrnehmung", "label": "Wahrnehmung", "bonus": 3, "proficient": true },
        { "id": "motiv-erkennen", "label": "Motiv erkennen", "bonus": 3, "proficient": true }
      ],
      "spellcasting": {
        "ability": "cha",
        "spellSaveDc": 14,
        "spellAttackBonus": 6,
        "slots": {
          "1": { "current": 4, "max": 4 },
          "2": { "current": 3, "max": 3 },
          "3": { "current": 2, "max": 2 }
        },
        "notes": "Zaubertricks: Donnerschlag, Dröhnende Klinge, Schockgriff, Blitzpfeil, Taschenspielerei, Zauberhafte Explosion. Zauber: Chromatische Kugel, Hexenpfeil, Magierrüstung, Zerbersten, Knisternder Strahl, Blitz."
      },
      "actions": [
        {
          "id": "eichenstab",
          "name": "Eichenstab",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 6,
          "damage": [{ "formula": "1d6+3", "type": "Wucht" }]
        },
        {
          "id": "dolch-familienerbstueck",
          "name": "Dolch (Familienerbstück)",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 6,
          "damage": [{ "formula": "1d4+3", "type": "Stich" }]
        },
        {
          "id": "schockgriff",
          "name": "Schockgriff",
          "type": "attack",
          "actionCost": "action",
          "attackBonusSource": "spell",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "damage": [{ "formula": "2d8", "type": "Blitz" }]
        },
        {
          "id": "blitzpfeil",
          "name": "Blitzpfeil",
          "type": "attack",
          "actionCost": "action",
          "attackBonusSource": "spell",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "damage": [{ "formula": "2d10", "type": "Blitz" }]
        },
        {
          "id": "donnerschlag",
          "name": "Donnerschlag",
          "type": "save",
          "actionCost": "action",
          "target": { "mode": "area", "side": "enemies", "maxTargets": null, "shape": "Radius" },
          "save": { "ability": "con", "dc": 14, "success": "none" },
          "damage": [{ "formula": "2d6", "type": "Schall" }]
        },
        {
          "id": "blitz",
          "name": "Blitz",
          "type": "save",
          "actionCost": "action",
          "resourceCost": { "type": "spellSlot", "level": 3, "amount": 1 },
          "target": { "mode": "area", "side": "enemies", "maxTargets": null, "shape": "Linie" },
          "save": { "ability": "dex", "dc": 14, "success": "half" },
          "damage": [{ "formula": "8d6", "type": "Blitz" }]
        }
      ],
      "resources": [
        {
          "id": "zaubereipunkte",
          "name": "Zaubereipunkte",
          "current": 5,
          "max": 5,
          "recharge": "Lange Rast",
          "notes": "Beschleunigter Zauber, Gespiegelter Zauber."
        }
      ],
      "notes": "Dunkelsicht 18 m. Feenblut: Vorteil gegen Bezauberung, immun gegen magischen Schlaf. Elementarer Adept (Blitz).",
      "background": "Adlige aus Thaloren. Spielerin: Kati.",
      "visible": true
    },
    {
      "id": "dion",
      "name": "Dion",
      "aliases": ["Dion"],
      "playerName": "Valentin",
      "playerAliases": ["valentin"],
      "className": "Schurke",
      "subclass": "Assassine",
      "level": 5,
      "species": "Mensch",
      "title": "Assassine aus der Schattenkante",
      "image": "images/Helden/DionChibi.png",
      "vitals": {
        "armorClass": 16,
        "hpCurrent": 38,
        "hpMax": 38,
        "initiativeMod": 9,
        "speed": "9 m",
        "passivePerception": 18,
        "proficiencyBonus": 3
      },
      "abilities": { "str": 10, "dex": 18, "con": 14, "int": 10, "wis": 14, "cha": 10 },
      "saves": {
        "str": { "bonus": 0, "proficient": false },
        "dex": { "bonus": 7, "proficient": true },
        "con": { "bonus": 2, "proficient": false },
        "int": { "bonus": 3, "proficient": true },
        "wis": { "bonus": 2, "proficient": false },
        "cha": { "bonus": 0, "proficient": false }
      },
      "skills": [
        { "id": "akrobatik", "label": "Akrobatik", "bonus": 7, "proficient": true },
        { "id": "fingerfertigkeit", "label": "Fingerfertigkeit", "bonus": 10, "proficient": true },
        { "id": "heimlichkeit", "label": "Heimlichkeit", "bonus": 10, "proficient": true },
        { "id": "wahrnehmung", "label": "Wahrnehmung", "bonus": 8, "proficient": true },
        { "id": "motiv-erkennen", "label": "Motiv erkennen", "bonus": 5, "proficient": true },
        { "id": "naturkunde", "label": "Naturkunde", "bonus": 3, "proficient": true }
      ],
      "actions": [
        {
          "id": "leichte-armbrust",
          "name": "Leichte Armbrust",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 7,
          "damage": [{ "formula": "1d8+4", "type": "Stich" }]
        },
        {
          "id": "dolch",
          "name": "Stahldolch mit Platinverzierung",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 7,
          "damage": [{ "formula": "1d6+4", "type": "Stich" }]
        },
        {
          "id": "kurzschwert",
          "name": "Kurzschwert",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 7,
          "damage": [{ "formula": "1d6+4", "type": "Stich" }]
        },
        {
          "id": "praezisionsschuss",
          "name": "Präzisionsschuss",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 7,
          "damage": [{ "formula": "2d8+8", "type": "Stich" }]
        }
      ],
      "resources": [],
      "notes": "Hinterhältiger Angriff 3d6, Raffinierte Aktion, Attentat, Unglaubliches Ausweichen, Wachsam.",
      "background": "Krimineller. Spieler: Valentin.",
      "visible": true
    },
    {
      "id": "fimbur",
      "name": "Fimbur Therundin",
      "aliases": ["Fimbur", "Therundin"],
      "playerName": "Saskia",
      "playerAliases": ["saskia"],
      "className": "Kleriker",
      "subclass": "Domäne des Lichtes",
      "level": 5,
      "species": "Zwerg (Gebirgszwerg)",
      "title": "Levit des Solis-Tempels",
      "image": "",
      "vitals": {
        "armorClass": 15,
        "hpCurrent": 38,
        "hpMax": 38,
        "initiativeMod": 0,
        "speed": "7,5 m",
        "passivePerception": 13,
        "proficiencyBonus": 3
      },
      "abilities": { "str": 18, "dex": 10, "con": 14, "int": 10, "wis": 16, "cha": 10 },
      "saves": {
        "str": { "bonus": 4, "proficient": false },
        "dex": { "bonus": 0, "proficient": false },
        "con": { "bonus": 2, "proficient": false },
        "int": { "bonus": 0, "proficient": false },
        "wis": { "bonus": 6, "proficient": true },
        "cha": { "bonus": 3, "proficient": true }
      },
      "skills": [
        { "id": "athletik", "label": "Athletik", "bonus": 4, "proficient": false },
        { "id": "heilkunde", "label": "Heilkunde", "bonus": 6, "proficient": true },
        { "id": "motiv-erkennen", "label": "Motiv erkennen", "bonus": 6, "proficient": true },
        { "id": "wahrnehmung", "label": "Wahrnehmung", "bonus": 3, "proficient": false },
        { "id": "religion", "label": "Religion", "bonus": 3, "proficient": true },
        { "id": "geschichte", "label": "Geschichte", "bonus": 3, "proficient": true }
      ],
      "spellcasting": {
        "ability": "wis",
        "spellSaveDc": 14,
        "spellAttackBonus": 6,
        "slots": {
          "1": { "current": 4, "max": 4 },
          "2": { "current": 3, "max": 3 },
          "3": { "current": 2, "max": 2 }
        }
      },
      "actions": [
        {
          "id": "solis-zorn",
          "name": "Soli's Zorn (silberlegierter Morgenstern +2)",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 9,
          "damage": [{ "formula": "1d6+6", "type": "Wucht" }]
        },
        {
          "id": "heilige-flamme",
          "name": "Heilige Flamme",
          "type": "save",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "save": { "ability": "dex", "dc": 14, "success": "none" },
          "damage": [{ "formula": "2d8", "type": "Gleißend" }]
        },
        {
          "id": "heilendes-wort",
          "name": "Heilendes Wort",
          "type": "heal",
          "actionCost": "bonusAction",
          "resourceCost": { "type": "spellSlot", "level": 1, "amount": 1 },
          "target": { "mode": "single", "side": "allies", "maxTargets": 1 },
          "healing": [{ "formula": "1d4+3", "type": "Heilung" }]
        },
        {
          "id": "feuerball",
          "name": "Feuerball",
          "type": "save",
          "actionCost": "action",
          "resourceCost": { "type": "spellSlot", "level": 3, "amount": 1 },
          "target": { "mode": "area", "side": "enemies", "maxTargets": null, "shape": "Radius" },
          "save": { "ability": "dex", "dc": 14, "success": "half" },
          "damage": [{ "formula": "8d6", "type": "Feuer" }]
        }
      ],
      "resources": [
        {
          "id": "goettliche-macht-fokussieren",
          "name": "Göttliche Macht fokussieren",
          "current": 1,
          "max": 1,
          "recharge": "Kurze oder Lange Rast"
        },
        {
          "id": "schuetzendes-flackern",
          "name": "Schützendes Flackern",
          "current": 3,
          "max": 3,
          "recharge": "Lange Rast"
        }
      ],
      "notes": "Zwergische Unverwüstlichkeit, Steingespür, kampferprobter Zauberwirker.",
      "background": "Tempeldiener des Solis-Tempels. Spielerin: Saskia.",
      "visible": true
    },
    {
      "id": "gottfried",
      "name": "Gottfried Eisenhart",
      "aliases": ["Gottfried", "Gotti", "Gottfried Eisenhart"],
      "playerName": "Max",
      "playerAliases": ["max"],
      "className": "Magier",
      "subclass": "Kampfmagie",
      "level": 5,
      "species": "Mensch",
      "title": "Arkaner Kriegsmagier",
      "image": "images/Helden/GottfriedChibi.png",
      "vitals": {
        "armorClass": 20,
        "hpCurrent": 39,
        "hpMax": 39,
        "initiativeMod": 0,
        "speed": "9 m",
        "passivePerception": 13,
        "proficiencyBonus": 3
      },
      "abilities": { "str": 16, "dex": 8, "con": 16, "int": 16, "wis": 16, "cha": 10 },
      "saves": {
        "str": { "bonus": 3, "proficient": false },
        "dex": { "bonus": -1, "proficient": false },
        "con": { "bonus": 3, "proficient": false },
        "int": { "bonus": 7, "proficient": true },
        "wis": { "bonus": 3, "proficient": false },
        "cha": { "bonus": 0, "proficient": false }
      },
      "skills": [
        { "id": "arkane-kunde", "label": "Arkane Kunde", "bonus": 7, "proficient": true },
        { "id": "nachforschungen", "label": "Nachforschungen", "bonus": 10, "proficient": true },
        { "id": "religion", "label": "Religion", "bonus": 7, "proficient": true },
        { "id": "wahrnehmung", "label": "Wahrnehmung", "bonus": 3, "proficient": false },
        { "id": "taeuschen", "label": "Täuschen", "bonus": 0, "proficient": false }
      ],
      "spellcasting": {
        "ability": "int",
        "spellSaveDc": 15,
        "spellAttackBonus": 7,
        "slots": {
          "1": { "current": 4, "max": 4 },
          "2": { "current": 3, "max": 3 },
          "3": { "current": 2, "max": 2 }
        }
      },
      "actions": [
        {
          "id": "kriegshammer",
          "name": "Kriegshammer",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 6,
          "damage": [{ "formula": "1d8+3", "type": "Wucht" }]
        },
        {
          "id": "gruene-flammenklinge",
          "name": "Grüne Flammenklinge",
          "type": "attack",
          "actionCost": "action",
          "attackBonusSource": "spell",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "damage": [
            { "formula": "1d8+3", "type": "Wucht" },
            { "formula": "1d8", "type": "Feuer" }
          ]
        },
        {
          "id": "droehnende-klinge",
          "name": "Dröhnende Klinge",
          "type": "attack",
          "actionCost": "action",
          "attackBonusSource": "spell",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "damage": [
            { "formula": "1d8+3", "type": "Wucht" },
            { "formula": "1d8", "type": "Schall" }
          ]
        },
        {
          "id": "totenglocke",
          "name": "Totenglocke",
          "type": "save",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "save": { "ability": "wis", "dc": 15, "success": "none" },
          "damage": [{ "formula": "2d8", "type": "Nekrotisch" }]
        },
        {
          "id": "kalte-hand",
          "name": "Kalte Hand",
          "type": "attack",
          "actionCost": "action",
          "attackBonusSource": "spell",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "damage": [{ "formula": "2d8", "type": "Nekrotisch" }],
          "notes": "Ziel kann bis zum nächsten Zug keine Trefferpunkte zurückerhalten."
        }
      ],
      "resources": [
        {
          "id": "arkane-erholung",
          "name": "Arkane Erholung",
          "current": 1,
          "max": 1,
          "recharge": "Lange Rast"
        }
      ],
      "notes": "Kind der Schmiede. Schild und schwere Rüstung im Einsatz. Werte aus der aktuellen Eisenhart-Akte übernommen.",
      "background": "Gildenhandwerker. Spieler: Max.",
      "visible": true
    },
    {
      "id": "guenther",
      "name": "Gaunder O'dime",
      "aliases": ["Günther", "Guenther", "Gunther", "Gaunder", "O'dime"],
      "playerName": "Hübi",
      "playerAliases": ["hübi", "huebi"],
      "className": "Barbar",
      "subclass": "Pfad des Riesen",
      "level": 5,
      "species": "Gnom",
      "title": "Riesenwüter des O'dime-Stamms",
      "image": "images/Helden/GuntherChibi.png",
      "vitals": {
        "armorClass": 17,
        "hpCurrent": 65,
        "hpMax": 65,
        "initiativeMod": 2,
        "speed": "12 m",
        "passivePerception": 13,
        "proficiencyBonus": 3
      },
      "abilities": { "str": 16, "dex": 14, "con": 20, "int": 8, "wis": 10, "cha": 8 },
      "saves": {
        "str": { "bonus": 6, "proficient": true },
        "dex": { "bonus": 2, "proficient": false },
        "con": { "bonus": 8, "proficient": true },
        "int": { "bonus": -1, "proficient": false },
        "wis": { "bonus": 0, "proficient": false },
        "cha": { "bonus": -1, "proficient": false }
      },
      "skills": [
        { "id": "athletik", "label": "Athletik", "bonus": 6, "proficient": true },
        { "id": "akrobatik", "label": "Akrobatik", "bonus": 2, "proficient": false },
        { "id": "einschuechtern", "label": "Einschüchtern", "bonus": 2, "proficient": true },
        { "id": "naturkunde", "label": "Naturkunde", "bonus": 2, "proficient": true },
        { "id": "wahrnehmung", "label": "Wahrnehmung", "bonus": 3, "proficient": true }
      ],
      "actions": [
        {
          "id": "grossaxt",
          "name": "Großaxt",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 6,
          "damage": [{ "formula": "1d12+3", "type": "Hieb" }]
        },
        {
          "id": "handaxt",
          "name": "Handaxt",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 6,
          "damage": [{ "formula": "1d6+3", "type": "Hieb" }]
        },
        {
          "id": "kampfrausch-schlag",
          "name": "Kampfrausch-Schlag",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 6,
          "damage": [{ "formula": "1d12+5", "type": "Hieb" }]
        }
      ],
      "resources": [
        {
          "id": "kampfrausch",
          "name": "Kampfrausch",
          "current": 3,
          "max": 3,
          "recharge": "Lange Rast"
        }
      ],
      "notes": "Dunkelsicht, Gnomische Gerissenheit, Kneipenschläger.",
      "background": "Sonderling aus Montai, aufgezogen beim O'dime-Stamm. Spieler: Hübi.",
      "visible": true
    },
    {
      "id": "rittersporn",
      "name": "Rittersporn",
      "aliases": ["Rittersporn", "Ritersporn"],
      "playerName": "Jacqueline",
      "playerAliases": ["jacqueline"],
      "className": "Barde",
      "subclass": "Schule der Eloquenz",
      "level": 5,
      "species": "Hochelf",
      "title": "Stimme der Eloquenz",
      "image": "images/Helden/Rittersporn.png",
      "vitals": {
        "armorClass": 13,
        "hpCurrent": 33,
        "hpMax": 33,
        "initiativeMod": 3,
        "speed": "10 m",
        "passivePerception": 16,
        "proficiencyBonus": 3
      },
      "abilities": { "str": 8, "dex": 16, "con": 12, "int": 14, "wis": 10, "cha": 20 },
      "saves": {
        "str": { "bonus": -1, "proficient": false },
        "dex": { "bonus": 6, "proficient": true },
        "con": { "bonus": 1, "proficient": false },
        "int": { "bonus": 2, "proficient": false },
        "wis": { "bonus": 0, "proficient": false },
        "cha": { "bonus": 8, "proficient": true }
      },
      "skills": [
        { "id": "auftreten", "label": "Auftreten", "bonus": 11, "proficient": true },
        { "id": "ueberzeugen", "label": "Überzeugen", "bonus": 6, "proficient": true },
        { "id": "taeuschen", "label": "Täuschen", "bonus": 6, "proficient": true },
        { "id": "heimlichkeit", "label": "Heimlichkeit", "bonus": 6, "proficient": true },
        { "id": "wahrnehmung", "label": "Wahrnehmung", "bonus": 6, "proficient": true }
      ],
      "spellcasting": {
        "ability": "cha",
        "spellSaveDc": 16,
        "spellAttackBonus": 8,
        "slots": {
          "1": { "current": 4, "max": 4 },
          "2": { "current": 3, "max": 3 },
          "3": { "current": 2, "max": 2 }
        }
      },
      "actions": [
        {
          "id": "langbogen",
          "name": "Langbogen",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 6,
          "damage": [{ "formula": "1d10", "type": "Stich" }]
        },
        {
          "id": "rapier",
          "name": "Rapier",
          "type": "attack",
          "actionCost": "action",
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "attackBonus": 6,
          "damage": [{ "formula": "1d8", "type": "Stich" }]
        },
        {
          "id": "dissonantes-fluestern",
          "name": "Dissonantes Flüstern",
          "type": "save",
          "actionCost": "action",
          "resourceCost": { "type": "spellSlot", "level": 1, "amount": 1 },
          "target": { "mode": "single", "side": "enemies", "maxTargets": 1 },
          "save": { "ability": "wis", "dc": 16, "success": "half" },
          "damage": [{ "formula": "3d6", "type": "Psychisch" }]
        },
        {
          "id": "wunden-heilen",
          "name": "Wunden heilen",
          "type": "heal",
          "actionCost": "action",
          "resourceCost": { "type": "spellSlot", "level": 1, "amount": 1 },
          "target": { "mode": "single", "side": "allies", "maxTargets": 1 },
          "healing": [{ "formula": "1d8+5", "type": "Heilung" }]
        },
        {
          "id": "hypnotisches-muster",
          "name": "Hypnotisches Muster",
          "type": "save",
          "actionCost": "action",
          "resourceCost": { "type": "spellSlot", "level": 3, "amount": 1 },
          "target": { "mode": "area", "side": "enemies", "maxTargets": null, "shape": "Würfel" },
          "save": { "ability": "wis", "dc": 16, "success": "none" },
          "effects": [
            {
              "id": "hypnotisiert",
              "name": "Hypnotisiert",
              "type": "condition",
              "condition": "stunned",
              "applyOn": "failure",
              "notes": "Vereinfachte V2-Abbildung."
            }
          ]
        }
      ],
      "resources": [
        {
          "id": "bardische-inspiration",
          "name": "Bardische Inspiration",
          "current": 5,
          "max": 5,
          "recharge": "Kurze oder Lange Rast",
          "notes": "Würfelgröße W8."
        }
      ],
      "notes": "Magisches Tattoo mit Mietzedatze als Beschwörungsoption (1x pro lange Rast) laut Akte.",
      "background": "Barde aus der Republik Montai. Spielerin: Jacqueline.",
      "visible": true
    }
  ]
};

(function () {
  const heroArenaSprites = {
    anastasia: "images/Helden/AnastasiaChibi.png",
    dion: "images/Helden/DionChibi.png",
    gottfried: "images/Helden/GottfriedChibi.png",
    guenther: "images/Helden/GuntherChibi.png",
    rittersporn: "images/Helden/Rittersporn.png",
  };

  const monsterArenaSprites = {
    "monster-klagewolf": "images/Monster/Klagewolf.png",
    "monster-klagewolf-rudelfuehrer": "images/Monster/Klagewolf Rudelführer.png",
    "monster-riesenklagewolf": "images/Monster/Riesen Klagewolf.png",
    "monster-wyvern": "images/Monster/Wyvern.png",
    "monster-riesige-kanalratte": "images/Monster/Riesige Kanalratte.png",
    "monster-rattenschwarm": "images/Monster/Rattenschwarm.png",
    "monster-riesenratten-nesthueter": "images/Monster/Riesenratten Nesthüter.png",
    "monster-rattenkoenigin": "images/Monster/Rattenkönigin.png",
    "monster-wanderbrut-arbeiter": "images/Monster/Wanderbrut Arbeiter.png",
    "monster-wanderbrut-krieger": "images/Monster/Wanderbrut Krieger.png",
    "monster-wanderbrut-koenigin": "images/Monster/Wanderbrut Königin.png",
    "monster-earth-elemental": "images/Monster/Erdelemtar.png",
    "monster-earth-elemental-myrmidon": "images/Monster/Erdelementar Myrmidon.png",
    "monster-junger-kraken": "images/Monster/Junger Kraken.png",
  };

  const monsterArenaBackgrounds = {
    "monster-klagewolf": ["images/Arenen/Wald.png"],
    "monster-klagewolf-rudelfuehrer": ["images/Arenen/Wald.png"],
    "monster-riesenklagewolf": ["images/Arenen/Wald.png"],
    "monster-wyvern": ["images/Arenen/Wiese.png"],
    "monster-riesige-kanalratte": ["images/Arenen/Stadt.png"],
    "monster-rattenschwarm": ["images/Arenen/Stadt.png"],
    "monster-riesenratten-nesthueter": ["images/Arenen/Stadt.png"],
    "monster-rattenkoenigin": ["images/Arenen/Stadt.png"],
    "monster-wanderbrut-arbeiter": ["images/Arenen/Wiese.png"],
    "monster-wanderbrut-krieger": ["images/Arenen/Wiese.png"],
    "monster-wanderbrut-koenigin": ["images/Arenen/Wiese.png"],
    "monster-earth-elemental": ["images/Arenen/Stadt.png"],
    "monster-earth-elemental-myrmidon": ["images/Arenen/Stadt.png"],
    "monster-junger-kraken": ["images/Arenen/Wasser.png"],
  };

  if (window.heroes && Array.isArray(window.heroes.heroes)) {
    window.heroes.heroes = window.heroes.heroes.map((hero) => {
      if (!hero || typeof hero !== "object") return hero;
      const id = String(hero.id || "").trim().toLowerCase();
      const sprite = heroArenaSprites[id] || "";
      const arena = hero.arena && typeof hero.arena === "object" ? { ...hero.arena } : {};
      if (!arena.sprite && sprite) arena.sprite = sprite;
      if (!Array.isArray(arena.backgrounds)) arena.backgrounds = [];
      return { ...hero, arena };
    });
  }

  if (window.bestiary && Array.isArray(window.bestiary.monsters)) {
    window.bestiary.monsters = window.bestiary.monsters.map((monster) => {
      if (!monster || typeof monster !== "object") return monster;
      const id = String(monster.id || "").trim();
      const sprite = monsterArenaSprites[id] || "";
      const backgrounds = monsterArenaBackgrounds[id] || [];
      const arena = monster.arena && typeof monster.arena === "object" ? { ...monster.arena } : {};
      if (!arena.sprite && sprite) arena.sprite = sprite;
      if (!Array.isArray(arena.backgrounds) || !arena.backgrounds.length) {
        arena.backgrounds = backgrounds.slice();
      }
      return { ...monster, arena };
    });
  }
})();

window.crafting = {
  "meta": {
    "title": "Handwerkskodex",
    "subtitle": "Berufe, Spezialisierungen und Freischaltungen"
  },
  "rules": {
    "rankBands": [
      {
        "id": "apprentice",
        "name": "Lehrling",
        "fromLevel": 1,
        "toLevel": 6
      },
      {
        "id": "journeyman",
        "name": "Geselle",
        "fromLevel": 7,
        "toLevel": 10
      },
      {
        "id": "master",
        "name": "Meister",
        "fromLevel": 11,
        "toLevel": 11
      },
      {
        "id": "grandmaster",
        "name": "Großmeister",
        "fromLevel": 12,
        "toLevel": 12
      },
      {
        "id": "legend",
        "name": "Legende",
        "fromLevel": 13,
        "toLevel": 13
      }
    ],
    "sharedRanks": [
      {
        "id": "apprentice-1",
        "label": "Lehrling I",
        "level": 1,
        "order": 1
      },
      {
        "id": "apprentice-2",
        "label": "Lehrling II",
        "level": 2,
        "order": 2
      },
      {
        "id": "apprentice-3",
        "label": "Lehrling III",
        "level": 3,
        "order": 3
      },
      {
        "id": "apprentice-4",
        "label": "Lehrling IV",
        "level": 4,
        "order": 4
      },
      {
        "id": "apprentice-5",
        "label": "Lehrling V",
        "level": 5,
        "order": 5
      },
      {
        "id": "apprentice-6",
        "label": "Lehrling VI",
        "level": 6,
        "order": 6
      }
    ],
    "specializationRanks": [
      {
        "id": "journeyman-1",
        "stageId": "journeyman",
        "stageName": "Geselle",
        "label": "Geselle I",
        "level": 7,
        "order": 1
      },
      {
        "id": "journeyman-2",
        "stageId": "journeyman",
        "stageName": "Geselle",
        "label": "Geselle II",
        "level": 8,
        "order": 2
      },
      {
        "id": "journeyman-3",
        "stageId": "journeyman",
        "stageName": "Geselle",
        "label": "Geselle III",
        "level": 9,
        "order": 3
      },
      {
        "id": "journeyman-4",
        "stageId": "journeyman",
        "stageName": "Geselle",
        "label": "Geselle IV",
        "level": 10,
        "order": 4
      },
      {
        "id": "master",
        "stageId": "master",
        "stageName": "Meister",
        "label": "Meister",
        "level": 11,
        "order": 5
      },
      {
        "id": "grandmaster",
        "stageId": "grandmaster",
        "stageName": "Großmeister",
        "label": "Großmeister",
        "level": 12,
        "order": 6
      }
    ],
    "legendRank": {
      "id": "legend",
      "stageId": "legend",
      "stageName": "Legende",
      "label": "Legende",
      "level": 13,
      "order": 7
    },
    "bookPrices": [],
    "teacherPrices": [],
    "notes": []
  },
  "professions": [
    {
      "id": "alchemist",
      "name": "Alchemist",
      "icon": "⚗️",
      "summary": "",
      "order": 1
    },
    {
      "id": "artifex",
      "name": "Artifex",
      "icon": "🪄",
      "summary": "",
      "order": 2
    },
    {
      "id": "kesselmagus",
      "name": "Kesselmagus",
      "icon": "🍲",
      "summary": "",
      "order": 3
    },
    {
      "id": "kriegsschmied",
      "name": "Kriegsschmied",
      "icon": "⚒️",
      "summary": "",
      "order": 4
    },
    {
      "id": "runenschmied",
      "name": "Runenschmied",
      "icon": "ᚱ",
      "summary": "",
      "order": 5
    },
    {
      "id": "schneider",
      "name": "Schneider",
      "icon": "🧵",
      "summary": "",
      "order": 6
    },
    {
      "id": "skriptor",
      "name": "Skriptor",
      "icon": "✒️",
      "summary": "",
      "order": 7
    }
  ],
  "specializations": [
    {
      "id": "toxikalchemie",
      "professionId": "alchemist",
      "name": "Toxikalchemie",
      "icon": "",
      "summary": "",
      "order": 1
    },
    {
      "id": "vitaalchemie",
      "professionId": "alchemist",
      "name": "Vitaalchemie",
      "icon": "",
      "summary": "",
      "order": 2
    },
    {
      "id": "arkanoalchemie",
      "professionId": "alchemist",
      "name": "Arkanoalchemie",
      "icon": "",
      "summary": "",
      "order": 3
    },
    {
      "id": "artifex-pigmenta",
      "professionId": "artifex",
      "name": "Artifex Pigmenta",
      "icon": "",
      "summary": "",
      "order": 1
    },
    {
      "id": "artifex-fortunae",
      "professionId": "artifex",
      "name": "Artifex Fortunae",
      "icon": "",
      "summary": "",
      "order": 2
    },
    {
      "id": "artifex-cantorum",
      "professionId": "artifex",
      "name": "Artifex Cantorum",
      "icon": "",
      "summary": "",
      "order": 3
    },
    {
      "id": "kesselmagus-kueche",
      "professionId": "kesselmagus",
      "name": "Kesselmagus der Küche",
      "icon": "",
      "summary": "",
      "order": 1
    },
    {
      "id": "kesselmagus-braukeller",
      "professionId": "kesselmagus",
      "name": "Kesselmagus des Braukellers",
      "icon": "",
      "summary": "",
      "order": 2
    },
    {
      "id": "ballistikschmied",
      "professionId": "kriegsschmied",
      "name": "Ballistikschmied",
      "icon": "",
      "summary": "",
      "order": 1
    },
    {
      "id": "ruestungsschmied",
      "professionId": "kriegsschmied",
      "name": "Rüstungsschmied",
      "icon": "",
      "summary": "",
      "order": 2
    },
    {
      "id": "waffenschmied",
      "professionId": "kriegsschmied",
      "name": "Waffenschmied",
      "icon": "",
      "summary": "",
      "order": 3
    },
    {
      "id": "akademischer-runenschmied",
      "professionId": "runenschmied",
      "name": "Akademischer Runenschmied",
      "icon": "",
      "summary": "",
      "order": 1
    },
    {
      "id": "archaeologischer-runenschmied",
      "professionId": "runenschmied",
      "name": "Archäologischer Runenschmied",
      "icon": "",
      "summary": "",
      "order": 2
    },
    {
      "id": "wilder-runenschmied",
      "professionId": "runenschmied",
      "name": "Wilder Runenschmied",
      "icon": "",
      "summary": "",
      "order": 3
    },
    {
      "id": "gewandschneider",
      "professionId": "schneider",
      "name": "Gewandschneider",
      "icon": "",
      "summary": "",
      "order": 1
    },
    {
      "id": "lederschneider",
      "professionId": "schneider",
      "name": "Lederschneider",
      "icon": "",
      "summary": "",
      "order": 2
    },
    {
      "id": "ruestungsschneider",
      "professionId": "schneider",
      "name": "Rüstungsschneider",
      "icon": "",
      "summary": "",
      "order": 3
    },
    {
      "id": "skriptor-kalligraphie",
      "professionId": "skriptor",
      "name": "Skriptor der Kalligraphie",
      "icon": "",
      "summary": "",
      "order": 1
    },
    {
      "id": "skriptor-kartographie",
      "professionId": "skriptor",
      "name": "Skriptor der Kartographie",
      "icon": "",
      "summary": "",
      "order": 2
    },
    {
      "id": "skriptor-sigillographie",
      "professionId": "skriptor",
      "name": "Skriptor der Sigillographie",
      "icon": "",
      "summary": "",
      "order": 3
    }
  ],
  "nodes": [
    {
      "id": "alchemist-apprentice-1",
      "professionId": "alchemist",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling I",
      "level": 1,
      "order": 1,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "alchemist-apprentice-2",
      "professionId": "alchemist",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling II",
      "level": 2,
      "order": 2,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "alchemist-apprentice-3",
      "professionId": "alchemist",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling III",
      "level": 3,
      "order": 3,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "alchemist-apprentice-4",
      "professionId": "alchemist",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling IV",
      "level": 4,
      "order": 4,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "alchemist-apprentice-5",
      "professionId": "alchemist",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling V",
      "level": 5,
      "order": 5,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "alchemist-apprentice-6",
      "professionId": "alchemist",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling VI",
      "level": 6,
      "order": 6,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "toxikalchemie-journeyman-1",
      "professionId": "alchemist",
      "specializationId": "toxikalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "toxikalchemie-journeyman-2",
      "professionId": "alchemist",
      "specializationId": "toxikalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "toxikalchemie-journeyman-3",
      "professionId": "alchemist",
      "specializationId": "toxikalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "toxikalchemie-journeyman-4",
      "professionId": "alchemist",
      "specializationId": "toxikalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "toxikalchemie-master",
      "professionId": "alchemist",
      "specializationId": "toxikalchemie",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "toxikalchemie-grandmaster",
      "professionId": "alchemist",
      "specializationId": "toxikalchemie",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "vitaalchemie-journeyman-1",
      "professionId": "alchemist",
      "specializationId": "vitaalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "vitaalchemie-journeyman-2",
      "professionId": "alchemist",
      "specializationId": "vitaalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "vitaalchemie-journeyman-3",
      "professionId": "alchemist",
      "specializationId": "vitaalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "vitaalchemie-journeyman-4",
      "professionId": "alchemist",
      "specializationId": "vitaalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "vitaalchemie-master",
      "professionId": "alchemist",
      "specializationId": "vitaalchemie",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "vitaalchemie-grandmaster",
      "professionId": "alchemist",
      "specializationId": "vitaalchemie",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "arkanoalchemie-journeyman-1",
      "professionId": "alchemist",
      "specializationId": "arkanoalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "arkanoalchemie-journeyman-2",
      "professionId": "alchemist",
      "specializationId": "arkanoalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "arkanoalchemie-journeyman-3",
      "professionId": "alchemist",
      "specializationId": "arkanoalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "arkanoalchemie-journeyman-4",
      "professionId": "alchemist",
      "specializationId": "arkanoalchemie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "arkanoalchemie-master",
      "professionId": "alchemist",
      "specializationId": "arkanoalchemie",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "arkanoalchemie-grandmaster",
      "professionId": "alchemist",
      "specializationId": "arkanoalchemie",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "alchemist-legend",
      "professionId": "alchemist",
      "specializationId": "",
      "stageId": "legend",
      "stageName": "Legende",
      "label": "Legende",
      "level": 13,
      "order": 13,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true,
      "requiresAllSpecializations": true
    },
    {
      "id": "artifex-apprentice-1",
      "professionId": "artifex",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling I",
      "level": 1,
      "order": 1,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-apprentice-2",
      "professionId": "artifex",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling II",
      "level": 2,
      "order": 2,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-apprentice-3",
      "professionId": "artifex",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling III",
      "level": 3,
      "order": 3,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-apprentice-4",
      "professionId": "artifex",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling IV",
      "level": 4,
      "order": 4,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-apprentice-5",
      "professionId": "artifex",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling V",
      "level": 5,
      "order": 5,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-apprentice-6",
      "professionId": "artifex",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling VI",
      "level": 6,
      "order": 6,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-pigmenta-journeyman-1",
      "professionId": "artifex",
      "specializationId": "artifex-pigmenta",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-pigmenta-journeyman-2",
      "professionId": "artifex",
      "specializationId": "artifex-pigmenta",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-pigmenta-journeyman-3",
      "professionId": "artifex",
      "specializationId": "artifex-pigmenta",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-pigmenta-journeyman-4",
      "professionId": "artifex",
      "specializationId": "artifex-pigmenta",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-pigmenta-master",
      "professionId": "artifex",
      "specializationId": "artifex-pigmenta",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-pigmenta-grandmaster",
      "professionId": "artifex",
      "specializationId": "artifex-pigmenta",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-fortunae-journeyman-1",
      "professionId": "artifex",
      "specializationId": "artifex-fortunae",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-fortunae-journeyman-2",
      "professionId": "artifex",
      "specializationId": "artifex-fortunae",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-fortunae-journeyman-3",
      "professionId": "artifex",
      "specializationId": "artifex-fortunae",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-fortunae-journeyman-4",
      "professionId": "artifex",
      "specializationId": "artifex-fortunae",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-fortunae-master",
      "professionId": "artifex",
      "specializationId": "artifex-fortunae",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-fortunae-grandmaster",
      "professionId": "artifex",
      "specializationId": "artifex-fortunae",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-cantorum-journeyman-1",
      "professionId": "artifex",
      "specializationId": "artifex-cantorum",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-cantorum-journeyman-2",
      "professionId": "artifex",
      "specializationId": "artifex-cantorum",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-cantorum-journeyman-3",
      "professionId": "artifex",
      "specializationId": "artifex-cantorum",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-cantorum-journeyman-4",
      "professionId": "artifex",
      "specializationId": "artifex-cantorum",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-cantorum-master",
      "professionId": "artifex",
      "specializationId": "artifex-cantorum",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-cantorum-grandmaster",
      "professionId": "artifex",
      "specializationId": "artifex-cantorum",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "artifex-legend",
      "professionId": "artifex",
      "specializationId": "",
      "stageId": "legend",
      "stageName": "Legende",
      "label": "Legende",
      "level": 13,
      "order": 13,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true,
      "requiresAllSpecializations": true
    },
    {
      "id": "kesselmagus-apprentice-1",
      "professionId": "kesselmagus",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling I",
      "level": 1,
      "order": 1,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-apprentice-2",
      "professionId": "kesselmagus",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling II",
      "level": 2,
      "order": 2,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-apprentice-3",
      "professionId": "kesselmagus",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling III",
      "level": 3,
      "order": 3,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-apprentice-4",
      "professionId": "kesselmagus",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling IV",
      "level": 4,
      "order": 4,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-apprentice-5",
      "professionId": "kesselmagus",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling V",
      "level": 5,
      "order": 5,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-apprentice-6",
      "professionId": "kesselmagus",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling VI",
      "level": 6,
      "order": 6,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-kueche-journeyman-1",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-kueche",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-kueche-journeyman-2",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-kueche",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-kueche-journeyman-3",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-kueche",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-kueche-journeyman-4",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-kueche",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-kueche-master",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-kueche",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-kueche-grandmaster",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-kueche",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-braukeller-journeyman-1",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-braukeller",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-braukeller-journeyman-2",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-braukeller",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-braukeller-journeyman-3",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-braukeller",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-braukeller-journeyman-4",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-braukeller",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-braukeller-master",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-braukeller",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-braukeller-grandmaster",
      "professionId": "kesselmagus",
      "specializationId": "kesselmagus-braukeller",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kesselmagus-legend",
      "professionId": "kesselmagus",
      "specializationId": "",
      "stageId": "legend",
      "stageName": "Legende",
      "label": "Legende",
      "level": 13,
      "order": 13,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true,
      "requiresAllSpecializations": true
    },
    {
      "id": "kriegsschmied-apprentice-1",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling I",
      "level": 1,
      "order": 1,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kriegsschmied-apprentice-2",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling II",
      "level": 2,
      "order": 2,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kriegsschmied-apprentice-3",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling III",
      "level": 3,
      "order": 3,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kriegsschmied-apprentice-4",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling IV",
      "level": 4,
      "order": 4,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kriegsschmied-apprentice-5",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling V",
      "level": 5,
      "order": 5,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kriegsschmied-apprentice-6",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling VI",
      "level": 6,
      "order": 6,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ballistikschmied-journeyman-1",
      "professionId": "kriegsschmied",
      "specializationId": "ballistikschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ballistikschmied-journeyman-2",
      "professionId": "kriegsschmied",
      "specializationId": "ballistikschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ballistikschmied-journeyman-3",
      "professionId": "kriegsschmied",
      "specializationId": "ballistikschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ballistikschmied-journeyman-4",
      "professionId": "kriegsschmied",
      "specializationId": "ballistikschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ballistikschmied-master",
      "professionId": "kriegsschmied",
      "specializationId": "ballistikschmied",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ballistikschmied-grandmaster",
      "professionId": "kriegsschmied",
      "specializationId": "ballistikschmied",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschmied-journeyman-1",
      "professionId": "kriegsschmied",
      "specializationId": "ruestungsschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschmied-journeyman-2",
      "professionId": "kriegsschmied",
      "specializationId": "ruestungsschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschmied-journeyman-3",
      "professionId": "kriegsschmied",
      "specializationId": "ruestungsschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschmied-journeyman-4",
      "professionId": "kriegsschmied",
      "specializationId": "ruestungsschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschmied-master",
      "professionId": "kriegsschmied",
      "specializationId": "ruestungsschmied",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschmied-grandmaster",
      "professionId": "kriegsschmied",
      "specializationId": "ruestungsschmied",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "waffenschmied-journeyman-1",
      "professionId": "kriegsschmied",
      "specializationId": "waffenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "waffenschmied-journeyman-2",
      "professionId": "kriegsschmied",
      "specializationId": "waffenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "waffenschmied-journeyman-3",
      "professionId": "kriegsschmied",
      "specializationId": "waffenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "waffenschmied-journeyman-4",
      "professionId": "kriegsschmied",
      "specializationId": "waffenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "waffenschmied-master",
      "professionId": "kriegsschmied",
      "specializationId": "waffenschmied",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "waffenschmied-grandmaster",
      "professionId": "kriegsschmied",
      "specializationId": "waffenschmied",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "kriegsschmied-legend",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "stageId": "legend",
      "stageName": "Legende",
      "label": "Legende",
      "level": 13,
      "order": 13,
      "branchOrder": 4,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true,
      "requiresAllSpecializations": true
    },
    {
      "id": "runenschmied-apprentice-1",
      "professionId": "runenschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling I",
      "level": 1,
      "order": 1,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "runenschmied-apprentice-2",
      "professionId": "runenschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling II",
      "level": 2,
      "order": 2,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "runenschmied-apprentice-3",
      "professionId": "runenschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling III",
      "level": 3,
      "order": 3,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "runenschmied-apprentice-4",
      "professionId": "runenschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling IV",
      "level": 4,
      "order": 4,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "runenschmied-apprentice-5",
      "professionId": "runenschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling V",
      "level": 5,
      "order": 5,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "runenschmied-apprentice-6",
      "professionId": "runenschmied",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling VI",
      "level": 6,
      "order": 6,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "akademischer-runenschmied-journeyman-1",
      "professionId": "runenschmied",
      "specializationId": "akademischer-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "akademischer-runenschmied-journeyman-2",
      "professionId": "runenschmied",
      "specializationId": "akademischer-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "akademischer-runenschmied-journeyman-3",
      "professionId": "runenschmied",
      "specializationId": "akademischer-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "akademischer-runenschmied-journeyman-4",
      "professionId": "runenschmied",
      "specializationId": "akademischer-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "akademischer-runenschmied-master",
      "professionId": "runenschmied",
      "specializationId": "akademischer-runenschmied",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "akademischer-runenschmied-grandmaster",
      "professionId": "runenschmied",
      "specializationId": "akademischer-runenschmied",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "archaeologischer-runenschmied-journeyman-1",
      "professionId": "runenschmied",
      "specializationId": "archaeologischer-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "archaeologischer-runenschmied-journeyman-2",
      "professionId": "runenschmied",
      "specializationId": "archaeologischer-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "archaeologischer-runenschmied-journeyman-3",
      "professionId": "runenschmied",
      "specializationId": "archaeologischer-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "archaeologischer-runenschmied-journeyman-4",
      "professionId": "runenschmied",
      "specializationId": "archaeologischer-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "archaeologischer-runenschmied-master",
      "professionId": "runenschmied",
      "specializationId": "archaeologischer-runenschmied",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "archaeologischer-runenschmied-grandmaster",
      "professionId": "runenschmied",
      "specializationId": "archaeologischer-runenschmied",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "wilder-runenschmied-journeyman-1",
      "professionId": "runenschmied",
      "specializationId": "wilder-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "wilder-runenschmied-journeyman-2",
      "professionId": "runenschmied",
      "specializationId": "wilder-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "wilder-runenschmied-journeyman-3",
      "professionId": "runenschmied",
      "specializationId": "wilder-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "wilder-runenschmied-journeyman-4",
      "professionId": "runenschmied",
      "specializationId": "wilder-runenschmied",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "wilder-runenschmied-master",
      "professionId": "runenschmied",
      "specializationId": "wilder-runenschmied",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "wilder-runenschmied-grandmaster",
      "professionId": "runenschmied",
      "specializationId": "wilder-runenschmied",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "runenschmied-legend",
      "professionId": "runenschmied",
      "specializationId": "",
      "stageId": "legend",
      "stageName": "Legende",
      "label": "Legende",
      "level": 13,
      "order": 13,
      "branchOrder": 5,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true,
      "requiresAllSpecializations": true
    },
    {
      "id": "schneider-apprentice-1",
      "professionId": "schneider",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling I",
      "level": 1,
      "order": 1,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "schneider-apprentice-2",
      "professionId": "schneider",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling II",
      "level": 2,
      "order": 2,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "schneider-apprentice-3",
      "professionId": "schneider",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling III",
      "level": 3,
      "order": 3,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "schneider-apprentice-4",
      "professionId": "schneider",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling IV",
      "level": 4,
      "order": 4,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "schneider-apprentice-5",
      "professionId": "schneider",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling V",
      "level": 5,
      "order": 5,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "schneider-apprentice-6",
      "professionId": "schneider",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling VI",
      "level": 6,
      "order": 6,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "gewandschneider-journeyman-1",
      "professionId": "schneider",
      "specializationId": "gewandschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "gewandschneider-journeyman-2",
      "professionId": "schneider",
      "specializationId": "gewandschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "gewandschneider-journeyman-3",
      "professionId": "schneider",
      "specializationId": "gewandschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "gewandschneider-journeyman-4",
      "professionId": "schneider",
      "specializationId": "gewandschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "gewandschneider-master",
      "professionId": "schneider",
      "specializationId": "gewandschneider",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "gewandschneider-grandmaster",
      "professionId": "schneider",
      "specializationId": "gewandschneider",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "lederschneider-journeyman-1",
      "professionId": "schneider",
      "specializationId": "lederschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "lederschneider-journeyman-2",
      "professionId": "schneider",
      "specializationId": "lederschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "lederschneider-journeyman-3",
      "professionId": "schneider",
      "specializationId": "lederschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "lederschneider-journeyman-4",
      "professionId": "schneider",
      "specializationId": "lederschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "lederschneider-master",
      "professionId": "schneider",
      "specializationId": "lederschneider",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "lederschneider-grandmaster",
      "professionId": "schneider",
      "specializationId": "lederschneider",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschneider-journeyman-1",
      "professionId": "schneider",
      "specializationId": "ruestungsschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschneider-journeyman-2",
      "professionId": "schneider",
      "specializationId": "ruestungsschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschneider-journeyman-3",
      "professionId": "schneider",
      "specializationId": "ruestungsschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschneider-journeyman-4",
      "professionId": "schneider",
      "specializationId": "ruestungsschneider",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschneider-master",
      "professionId": "schneider",
      "specializationId": "ruestungsschneider",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "ruestungsschneider-grandmaster",
      "professionId": "schneider",
      "specializationId": "ruestungsschneider",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "schneider-legend",
      "professionId": "schneider",
      "specializationId": "",
      "stageId": "legend",
      "stageName": "Legende",
      "label": "Legende",
      "level": 13,
      "order": 13,
      "branchOrder": 6,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true,
      "requiresAllSpecializations": true
    },
    {
      "id": "skriptor-apprentice-1",
      "professionId": "skriptor",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling I",
      "level": 1,
      "order": 1,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-apprentice-2",
      "professionId": "skriptor",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling II",
      "level": 2,
      "order": 2,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-apprentice-3",
      "professionId": "skriptor",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling III",
      "level": 3,
      "order": 3,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-apprentice-4",
      "professionId": "skriptor",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling IV",
      "level": 4,
      "order": 4,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-apprentice-5",
      "professionId": "skriptor",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling V",
      "level": 5,
      "order": 5,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-apprentice-6",
      "professionId": "skriptor",
      "specializationId": "",
      "stageId": "apprentice",
      "stageName": "Lehrling",
      "label": "Lehrling VI",
      "level": 6,
      "order": 6,
      "branchOrder": 0,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kalligraphie-journeyman-1",
      "professionId": "skriptor",
      "specializationId": "skriptor-kalligraphie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kalligraphie-journeyman-2",
      "professionId": "skriptor",
      "specializationId": "skriptor-kalligraphie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kalligraphie-journeyman-3",
      "professionId": "skriptor",
      "specializationId": "skriptor-kalligraphie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kalligraphie-journeyman-4",
      "professionId": "skriptor",
      "specializationId": "skriptor-kalligraphie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kalligraphie-master",
      "professionId": "skriptor",
      "specializationId": "skriptor-kalligraphie",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kalligraphie-grandmaster",
      "professionId": "skriptor",
      "specializationId": "skriptor-kalligraphie",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 1,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kartographie-journeyman-1",
      "professionId": "skriptor",
      "specializationId": "skriptor-kartographie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kartographie-journeyman-2",
      "professionId": "skriptor",
      "specializationId": "skriptor-kartographie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kartographie-journeyman-3",
      "professionId": "skriptor",
      "specializationId": "skriptor-kartographie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kartographie-journeyman-4",
      "professionId": "skriptor",
      "specializationId": "skriptor-kartographie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kartographie-master",
      "professionId": "skriptor",
      "specializationId": "skriptor-kartographie",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-kartographie-grandmaster",
      "professionId": "skriptor",
      "specializationId": "skriptor-kartographie",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 2,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-sigillographie-journeyman-1",
      "professionId": "skriptor",
      "specializationId": "skriptor-sigillographie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle I",
      "level": 7,
      "order": 7,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-sigillographie-journeyman-2",
      "professionId": "skriptor",
      "specializationId": "skriptor-sigillographie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle II",
      "level": 8,
      "order": 8,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-sigillographie-journeyman-3",
      "professionId": "skriptor",
      "specializationId": "skriptor-sigillographie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle III",
      "level": 9,
      "order": 9,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-sigillographie-journeyman-4",
      "professionId": "skriptor",
      "specializationId": "skriptor-sigillographie",
      "stageId": "journeyman",
      "stageName": "Geselle",
      "label": "Geselle IV",
      "level": 10,
      "order": 10,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-sigillographie-master",
      "professionId": "skriptor",
      "specializationId": "skriptor-sigillographie",
      "stageId": "master",
      "stageName": "Meister",
      "label": "Meister",
      "level": 11,
      "order": 11,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-sigillographie-grandmaster",
      "professionId": "skriptor",
      "specializationId": "skriptor-sigillographie",
      "stageId": "grandmaster",
      "stageName": "Großmeister",
      "label": "Großmeister",
      "level": 12,
      "order": 12,
      "branchOrder": 3,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true
    },
    {
      "id": "skriptor-legend",
      "professionId": "skriptor",
      "specializationId": "",
      "stageId": "legend",
      "stageName": "Legende",
      "label": "Legende",
      "level": 13,
      "order": 13,
      "branchOrder": 7,
      "title": "",
      "summary": "",
      "unlockText": "",
      "milestoneText": "",
      "visible": true,
      "requiresAllSpecializations": true
    }
  ],
  "codexSections": [
    {
      "id": "alchemist-tranke",
      "professionId": "alchemist",
      "specializationId": "",
      "name": "Tränke",
      "summary": "",
      "kind": "catalog",
      "order": 1
    },
    {
      "id": "alchemist-ole",
      "professionId": "alchemist",
      "specializationId": "",
      "name": "Öle",
      "summary": "",
      "kind": "catalog",
      "order": 2
    },
    {
      "id": "alchemist-gifte",
      "professionId": "alchemist",
      "specializationId": "",
      "name": "Gifte",
      "summary": "",
      "kind": "catalog",
      "order": 3
    },
    {
      "id": "alchemist-toxine",
      "professionId": "alchemist",
      "specializationId": "",
      "name": "Toxine",
      "summary": "",
      "kind": "catalog",
      "order": 4
    },
    {
      "id": "alchemist-sauren",
      "professionId": "alchemist",
      "specializationId": "",
      "name": "Säuren",
      "summary": "",
      "kind": "catalog",
      "order": 5
    },
    {
      "id": "alchemist-bomben",
      "professionId": "alchemist",
      "specializationId": "",
      "name": "Bomben",
      "summary": "",
      "kind": "catalog",
      "order": 6
    },
    {
      "id": "artifex-pigmente",
      "professionId": "artifex",
      "specializationId": "",
      "name": "Pigmente",
      "summary": "",
      "kind": "catalog",
      "order": 1
    },
    {
      "id": "artifex-fortuna-werke",
      "professionId": "artifex",
      "specializationId": "",
      "name": "Fortuna-Werke",
      "summary": "",
      "kind": "catalog",
      "order": 2
    },
    {
      "id": "artifex-cantorum-werke",
      "professionId": "artifex",
      "specializationId": "",
      "name": "Cantorum-Werke",
      "summary": "",
      "kind": "catalog",
      "order": 3
    },
    {
      "id": "kesselmagus-gerichte",
      "professionId": "kesselmagus",
      "specializationId": "",
      "name": "Gerichte",
      "summary": "",
      "kind": "catalog",
      "order": 1
    },
    {
      "id": "kesselmagus-getranke",
      "professionId": "kesselmagus",
      "specializationId": "",
      "name": "Getränke",
      "summary": "",
      "kind": "catalog",
      "order": 2
    },
    {
      "id": "kesselmagus-grundrezepte",
      "professionId": "kesselmagus",
      "specializationId": "",
      "name": "Grundrezepte",
      "summary": "",
      "kind": "catalog",
      "order": 3
    },
    {
      "id": "kriegsschmied-waffen",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "name": "Waffen",
      "summary": "",
      "kind": "catalog",
      "order": 1
    },
    {
      "id": "kriegsschmied-rustungen",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "name": "Rüstungen",
      "summary": "",
      "kind": "catalog",
      "order": 2
    },
    {
      "id": "kriegsschmied-ballistik",
      "professionId": "kriegsschmied",
      "specializationId": "",
      "name": "Ballistik",
      "summary": "",
      "kind": "catalog",
      "order": 3
    },
    {
      "id": "runenschmied-runen",
      "professionId": "runenschmied",
      "specializationId": "",
      "name": "Runen",
      "summary": "",
      "kind": "catalog",
      "order": 1
    },
    {
      "id": "runenschmied-runentrager",
      "professionId": "runenschmied",
      "specializationId": "",
      "name": "Runenträger",
      "summary": "",
      "kind": "catalog",
      "order": 2
    },
    {
      "id": "runenschmied-bindungen",
      "professionId": "runenschmied",
      "specializationId": "",
      "name": "Bindungen",
      "summary": "",
      "kind": "catalog",
      "order": 3
    },
    {
      "id": "schneider-gewander",
      "professionId": "schneider",
      "specializationId": "",
      "name": "Gewänder",
      "summary": "",
      "kind": "catalog",
      "order": 1
    },
    {
      "id": "schneider-leichte-rustungen",
      "professionId": "schneider",
      "specializationId": "",
      "name": "Leichte Rüstungen",
      "summary": "",
      "kind": "catalog",
      "order": 2
    },
    {
      "id": "schneider-mittlere-rustungen",
      "professionId": "schneider",
      "specializationId": "",
      "name": "Mittlere Rüstungen",
      "summary": "",
      "kind": "catalog",
      "order": 3
    },
    {
      "id": "schneider-banner",
      "professionId": "schneider",
      "specializationId": "",
      "name": "Banner",
      "summary": "",
      "kind": "catalog",
      "order": 4
    },
    {
      "id": "skriptor-karten",
      "professionId": "skriptor",
      "specializationId": "",
      "name": "Karten",
      "summary": "",
      "kind": "catalog",
      "order": 1
    },
    {
      "id": "skriptor-vertrage",
      "professionId": "skriptor",
      "specializationId": "",
      "name": "Verträge",
      "summary": "",
      "kind": "catalog",
      "order": 2
    },
    {
      "id": "skriptor-siegel",
      "professionId": "skriptor",
      "specializationId": "",
      "name": "Siegel",
      "summary": "",
      "kind": "catalog",
      "order": 3
    },
    {
      "id": "skriptor-schriftrollen",
      "professionId": "skriptor",
      "specializationId": "",
      "name": "Schriftrollen",
      "summary": "",
      "kind": "catalog",
      "order": 4
    }
  ],
  "works": [],
  "materials": [],
  "referenceSheets": [],
  "books": [],
  "unlockLinks": []
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
    "visible": true,
    "isNew": true,
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
      "Grenzposten",
      "Narvik"
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
      "Stadt",
      "Narvik"
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
  },
  {
    "id": "entry-1778529463416",
    "categoryId": "recaps",
    "title": "10. Sitzung vom 03.01.2026 Chronica Heroica – Kapitel X",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Passierschein A38, Pony-Drama & familiäre Fanpost“\n(aufs Band gesprochen von Lucius Magnus, Magier, Chronist, professioneller Stirnrunzler. Ich beobachte nur – Waldläufer Ehrenwort.)\n\nDie Vetra Skupina trottet zum Herrenhaus des Ährenbarons, um den offiziell ausgeschriebenen Auftrag einzusammeln: Hauptmühle reparieren, Ruhm ernten, Zahnräder ölen, irgendwas mit Mehl. Die Wache parkt sie im Wartezimmer höflich, gepolstert, zeitdehnend. Dort kreuzt Fimbur auf, die Frau des Barons fragt freundlich nach Essenswünschen und bekommt sogar Hilfe von Dion in der Küche. (Ja, wirklich ohne messerscharfe Hintergedanken. Ich hab nachgesehen.) Auch die Kinder des Barons schauen neugierig vorbei: große Augen, viele Fragen, null Berührungsängste.\n\nNach ausgedehnter Wartezeit erhebt sich schließlich der Ährenbaron höchstselbst und fasst zusammen, was alle ahnen: Mühle kaputt, Hilfe gebraucht. Sein Hof ist groß wie ein mittleres Königreich, daher stellt er der Truppe Pferde. Großzügig – und Anlass für Slapstick: Günther scheitert am Aufsteigen auf Shetlandpony „Magnus“. Das Pony reagiert mit Galoppieren. Mit Reiter. Ohne Würde.\n\nBei der Mühle folgt die Diagnose: „kaputt“ ist untertrieben. Mehrere Teile fehlen. Die Beschaffung entwickelt sich zur Passierschein-A38-Episode: Schmied verweist auf Schreiner, Schreiner auf Müller, irgendwo fehlt eine Gussform, zwischendrin brennt im Herrenhaus etwas an (nein, keine Pointe, nur Bürokratie mit Pyro). Zwei Wochen später und nach Auffinden eines „Vogelbeckens“, pardon, der Gussform – liegen alle Teile vor, die Mühle wird zusammengebaut, gerichtet, zum Leben gerüttelt. Sie schnurrt. Also, so sehr Mühlen eben schnurren.\n\nGottfried weist dezent darauf hin, dass in der Anleitung ausdrücklich eine Wartung stand. Der Baron nickt die Realität weg und wedelt mit Belohnungen: Die Pferde dürfen behalten werden, plus ein Brief „an den Grafen“. Abfahrt Richtung Wiesen – wo am Wegesrand ein Wanted-Poster von Anastasia hängt, inklusive Belohnung für Hinweise. Erste Reaktion der Gruppe? Anastasia wird verkleidet. Zweite Reaktion? Schneller gehen.\n\nIn Wiesen kommen die Pferde in den Stall, die Held:innen schlüpfen unauffällig durch die Tore – Anastasia vermummt wie ein Klosterschrank. Rittersporn, Fimbur und Anastasia steuern den Tempel an (fragt nicht, ich hab’s mir auch dreimal aufgeschrieben), während Gottfried und Dion den Fall aufnehmen. Die Spur führt zur auf dem Poster ausgeschriebenen Taverne; Dion geht auf Tuchfühlung: Er fragt nach Anastasias Verfolgern und wird prompt ins Hinterzimmer gebeten. Dort warten drei Personen, die für jedes Detail bar zahlen. Kurze Unterredung, Dion verlässt die Taverne lebend, aber jetzt mit Paranoia im Schlepp – er fühlt sich verfolgt und macht auf dem Markt den Abschüttel-Tango, während er Gottfried via Ring alles durchfunkt.\n\nGottfried zurück zu Anastasia: Schon die Beschreibung reicht, und sie erkennt das Trio – ihr altes Kindermädchen, deren Tochter und ein Leibwächter. Familiendrama, Stufe „postzustellbar“. Ein Plan entsteht: Anastasia schreibt einen Brief an ihr Kindermädchen, bittet um ein alleiniges Treffen in einem Zimmer des Gasthauses; die Gruppe sichert diskret ab. Das Treffen verläuft gut: Man erfährt, dass Anastasias Vater sie sucht und erst einmal die lauwarme Version von „Du kommst jetzt schön nach Hause“ schicken wollte – bei Weigerung folgen härtere Geschütze. Überzeugt ist Anastasia nicht; die drei treten die Rückreise an. Langsam, um Zeit zu schinden.\n\nNach einer ruhigen Nacht im Gasthaus geht es am nächsten Tag zum Herrenhaus, um den Grafen zu treffen – der sich allerdings auf dem Markt herumtreiben soll. Also Markt: Gefunden! Gottfried klärt einen Termin zum Abendessen – inklusive Briefübergabe des Barons.\n\nZwischendurch findet Dion den Laden „Onkel Oslo“ und trifft Meisterhändler Zahir. Nach zähem Feilschen um einen Ohrring kommt eine Händlergruppe herein: Ravio, Zwoelf und Falk – kleine Träume, große Pläne. Dion hilft ihnen, wie nur ein echter Wohltäter helfen kann: Er kauft freiwillig ihr gesamtes Inventar zu Höchstpreisen. (Ja, all seine Ersparnisse. Ja, das Glitzern in Zahirs Augen war real.)\n\nMit erleichterten Beuteln und erhobenem Kinn formiert sich die Gruppe zum Abendessen beim Grafen. Brief in der Tasche, Pferde im Stall, Verfolger im Rückspiegel – und eine Verkleidung, die hoffentlich noch einen Gang höher schalten kann.\n\nSchlusskommentar aus der Loge: Bürokratie besiegt, Mühle gezähmt, Familie vertagt – und Dion hat den lokalen Einzelhandel gerettet. Wenn das kein zivilisatorischer Fortschritt ist, dann weiß ich auch nicht.",
    "session": "Sitzung 10",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778529976535",
    "categoryId": "recaps",
    "title": "11. Sitzung vom 21.02.2026 Chronica Heroica – Kapitel XI",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Pony-Würgegriffe, Adelsdinner & eine Aufnahmeprüfung mit Königin“\n(erzählt von Lucius Magnus, Magier, Chronist, unbeteiligter Beobachter – also quasi die Dashcam eurer Entscheidungen.)\n\nEs beginnt auf dem Marktplatz, wo das Schicksal wie immer so tut, als hätte es einen Plan – und dann Dion plötzlich Günther wiederfindet. Günther ist… Günther. Und er hat ein Pony. Und dieses Pony hat offenbar falsche Meinungen, denn Günther hält es im Schwitzkasten, als würde man so Respekt in ein Huftier einmassieren. Die Gruppe sammelt sich danach im Gasthaus, um sich seelisch (und optisch) auf das Abendbrot beim Grafen vorzubereiten.\n\nGünther betritt das Gasthaus auf die einzig mögliche Weise: auf Günther-Art. Draußen befiehlt er dem Pony, es solle gefälligst „Buttercup“ heißen statt „Magnus“ und brav vor der Tür warten – als Belohnung winkt ein Whiskey. Dann springt er mit einem Satz über die Salontür in die Taverne, als wäre er die Pointe eines sehr teuren Witzes. Von dort geht’s dann tatsächlich los zum Grafen.\n\nBeim Grafen wird die Gruppe hereingebeten und an eine lange Tafel geführt, die so viel Etikette ausstrahlt, dass man automatisch gerader sitzt und Angst bekommt, die falsche Gabel zu lieben. Dion frischt bei Anastasia noch schnell das Überlebenswissen „Adelsregeln für Fortgeschrittene“ auf, während alle innerlich ihre „Bitte nichts Dummes sagen“-Gebete murmeln. Der Graf stellt seine Familie vor – und als besonderen Ehrengast seinen Schwager Sven Schnee. Und damit ist auch schon klar, warum der Abend mehr Würze hat als der Braten.\n\nWährend des Essens werden Geschichten ausgetauscht, gelacht, gelächelt, höflich genickt – und dann grätscht Sven regelmäßig dazwischen, gerät mit dem Grafen aneinander und versucht, den Grafen und die Helden verbal so tief in den Dreck zu drücken, dass man sie dort archäologisch ausgraben müsste. (Anmerkung des Chronisten: Adel hat die Nase oft so weit oben, dass er den Boden nur noch aus Sagen kennt.) Am Ende des Abends bittet Wilhelm der Graf die Gruppe, sich bei der Monsterjägergilde zu melden, um dem Knollenbaron zu helfen. Ein Auftrag, der klingt wie „harmlos“ und endet erfahrungsgemäß wie „Warum brennt hier alles?“.\n\nAm nächsten Tag geht es zuerst zum Konsortium, weil der Baron Rittersporn den Hinweis gab, dass Hammersbald dort vielleicht auftauchen könnte. Vor Ort treffen sie Sido Strick, lokalen Leiter des Konsortiums und begnadeten Zeichner – ein Mann, der offenbar lieber Linien zieht als moralische Grenzen. Während man noch redet, kommt eine neue Sklavenlieferung herein, und einer der Gefangenen erkennt Dion wieder und brüllt ihn an, er müsse tot sein. Dion erkennt ihn ebenfalls – als den, der seine Gilde verraten hat – ignoriert ihn aber erstmal. (Professionalität oder Selbstschutz? Ja.)\n\nIn den anschließenden Verhandlungen will die Gruppe zweierlei: Auskunft über Hammersbald und – wenn möglich – den Sklaven kaufen. Und tatsächlich: Sie erhalten die Info, dass Hammersbald nach Solen Aue verkauft wurde, und dürfen den Sklaven „zum Mitnehmen“ quasi reservieren – Abholung aber erst am nächsten Tag. Der Preis ist natürlich nicht Geld, sondern Würde: Sido darf sie zeichnen. Und so entsteht ein schönes Bild der Gruppe in Kampfpose in seinem Buch mit dem silbernen Knopf. (Ich nenne es: „Heldentum, jetzt auch als Skizze.“)\n\nDanach zur Monsterjägergilde: Die Heldengruppe holt Infos zum Auftrag, und Hagan, der Gildenassistent, fragt freundlich, ob sie beitreten möchten. Alle nicken – und bekommen von Hagan einen Brief: Dieser Auftrag ist jetzt ihre Aufnahmeprüfung. Kein Druck. Nur euer gesamtes Selbstbild.\n\nAlso weiter zum Hof des Knollenbarons. Im Zelt von Melodia Cantus meldet man sich zum Dienst. Sie gibt ein kurzes Briefing; ihre Begleiter Felix und Zurag statten die Gruppe mit magischen Hilfsmitteln aus und weisen ihnen eine Höhle zu – passend zur Stärke der Gruppe, aber laut Melodia immer noch „zu leicht“ für eine echte Prüfung. (Man kennt diese Sorte Mentor: „Ich glaub an euch“ heißt hier „Ich erwarte Leiden“.)\n\nDie Helden begeben sich zum Höhleneingang, um ihren Abschnitt von der gefährlichen Wanderbrut zu befreien. Es folgt eine Abfolge aus kurzer Rast, langer Rast, endlosen Stunden Kampf, existentiellen Fragen (zumindest für die Helden), noch einer langen Rast – und schließlich: Die Königin fällt. Die Vetra Skupina kommt als Sieger aus den Höhlen. Ja, Sieger. Das muss betont werden, weil es zwischendrin wirklich nicht so aussah. Als Bonus bergen sie ein magisches Artefakt, das sie nach Vorzeigen bei Frau Cantus sogar behalten dürfen. Danach wird der Vertrag unterschrieben: Offiziell Mitglieder der Monsterjägergilde. Herzlichen Glückwunsch, ihr seid jetzt bürokratisch legitimiert, Dinge zu töten.\n\nZurück nach Wiesen. Eine kurze Shoppingtour, dann Gasthaus: ausnahmsweise wirklich nur „ein bisschen was trinken“ und ab ins Bett. Und dann – natürlich – in der Nacht Tumult. Der Boden vibriert, ein Gefühl wie „Erdbeben, aber organisiert“. Am Fenster sehen sie ein Lichtermeer: Soldaten des eigenen Landes marschieren nach Wiesen ein. Nach einer Weile verstummt das Beben, und die Gruppe legt sich wieder hin – denn was soll man sonst tun, außer panisch werden? Panik kostet Schlaf.\n\nAm nächsten Morgen erklärt der Wirt, dass Reisende wegen der militärischen Bewegungen gebeten werden, Wiesen so schnell wie möglich zu verlassen. Das Gespräch wird unterbrochen, als eine Frau in die Taverne stürmt und von Tumult am Herrenhaus berichtet. Die Helden rennen hin – und treffen auf einen epischen Kampf zwischen Sven und Wilhelm. Diesmal gewinnt Wilhelm, indem er Sven mit seinem Hammer so hart trifft, dass dieser in eine Hauswand geschleudert wird, die daraufhin prompt einstürzt. (Das ist keine Metapher. Das ist Architektur, die aufgibt.)\n\nNach dem Kampf sprechen die Helden mit Wilhelm, erhalten eine Belohnung für ihre Umstände beim Knollenbaron-Auftrag und außerdem einen Brief für den Hauptmann der Stadtwache von Solen Aue. Danach noch einmal ins Konsortium – wo sich herausstellt, dass Sido den Sklaven inzwischen an einen einflussreichen Adligen der Familie Silberspitze in Glutfels weiterverkauft hat. Die Gruppe nimmt die Info mit, und nach einer kurzen Theatervorführung wird das Geschäft rückabgewickelt. (Anmerkung: Manche Dinge löst man mit Gewalt. Andere mit Drama. Beides ist Tradition.)\n\nUnd so endet dieses Kapitel: mit einem zurückgeholten Deal, einem Brief in der Tasche, einem Ziel am Horizont und dem sicheren Gefühl, dass Solen Aue als nächstes dran ist. Denn wenn Hammersbald dort ist, dann wird das kein Spaziergang – eher ein Lauf durch Dornen, aber mit Stil.",
    "session": "Sitzung 11",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778530166844",
    "categoryId": "recaps",
    "title": "12. Sitzung vom 14.03.2026 Chronica Heroica – Kapitel XII",
    "summary": "",
    "tags": [],
    "region": "",
    "body": "„Solen Aue: Drogen, Schleim und der schlechteste Arbeitsschutz der Welt“\n(verfasst von Lucius Magnus, Magier, Chronist, neutraler Beobachter – also der Typ, der alles sieht und trotzdem nichts verhindern darf. Tragisch.)\n\nWir starten in Wiesen, wo die Gruppe sich noch einredet, die Welt sei halbwegs geordnet – und dann beginnt die Reise nach Solen Aue. Eine Strecke, die sich für die DMs anfühlt wie „nur kurz rüber“ und für Sterbliche wie „ein eigenes Zeitalter“. Irgendwann kommen sie an, und unterwegs sitzt Dion auf einem Pferd mit diesem Blick, den sonst nur Karawanenführer kennen: „Alles ist leichte Beute, wenn man sich nur genug Mühe gibt.“ Ich sage nicht, dass er etwas getan hätte. Ich sage nur, dass die Karawanen schneller geworden sind.\n\nIn Solen Aue, der Stadt der Gladiatoren, geben sie die Pferde im Stall ab und plaudern mit dem Stallmädchen. Dabei fällt ihnen plötzlich auf: Mit dem Mädel stimmt etwas nicht. Schuppen… im wörtlichen Sinne. Sie wird darauf angesprochen, winkt ab und erklärt es als Erbkrankheit. Die Gruppe ist gleichzeitig zufrieden und unzufrieden, entscheidet sich aber für das klassische Abenteuer-Manöver: „Wir haken später nach.“ (Spoiler: „später“ ist ein mythisches Wesen.)\n\nPflicht zuerst: ab zur Kaserne, Brief von Graf Weiden an den Hauptmann der Stadtwache übergeben. Der empfängt sie, redet kurz, überlegt vermutlich exakt drei Herzschläge zu lang – und heuert sie dann für eine Undercover-Mission an. Ob er sich das wirklich überlegt hat? Die Zukunft wird es beantworten, vermutlich mit Flammen. Auftrag: In der Stadt kursieren eine oder mehrere neue Drogen. Die Helden sollen den Drahtzieher finden, indem sie ein verdächtiges Lagerhaus und ein Gasthaus untersuchen. Als Unterstützung bekommen sie einen Undercover-Agenten mit Decknamen Nito.\n\nErste Station: das Gasthaus „Zum Seeteufel“. Die Gruppe mischt sich unters Volk, beobachtet, lauscht, tut so, als wären sie normale Menschen mit normalen Hobbys. Nur Rittersporn macht Rittersporn-Sachen: Er steigt auf den Tisch und liefert die beste Vorstellung des Abends, so überzeugend, dass selbst das Bier kurz klatschen wollte. Nach einer Weile setzt sich ein Hafenarbeiter namens Detlef zu ihnen. Smalltalk, ein bisschen „wie ist das Wetter“, ein bisschen „wie ist die Korruption“ – und dann legt Detlef die Maske ab: Er ist Nito. Geschäftliches folgt.\nNito erklärt: Der Seeteufel wird von einer Taverne am Kiez mit der Droge beliefert. Er bittet die Gruppe, das zu prüfen – und liefert direkt den perfekten Vorwand: Der Besitzer dort hat ein Ungezieferproblem im Keller und sucht Leute, die das diskret lösen. Klingt machbar. Klingt nach Geld. Klingt nach „Warum riecht es hier nach Tod?“. Doch bevor man sich in Keller stürzt, beschließt die Gruppe: Erst eine Kostprobe der Droge, zu Untersuchungszwecken natürlich. Natürlich.\n\nAnastasia bestellt an der Theke einen Geistbrandt. Und weil „unauffällig“ in dieser Gruppe ein Märchen ist, schleichen sich alle nach und nach aufs Zimmer: Erst Anastasia mit dem Schnaps, dann einer, dann noch einer, dann noch einer – als wäre „eine Schnapsbestellung“ der offizielle Geheimcode für „geheime Ermittlungsrunde“. Oben angekommen scheitern alle Untersuchungsmethoden außer einer: Anastasia kippt den Geistbrandt runter. Alle warten. Es passiert… nichts. Tja. Offenbar zahlt sich eine antrainierte Alkoholresistenz aus der Jugend irgendwann doch aus.\nRittersporn hingegen bleibt unten, mischt sich unters Volk und nimmt „Risikoabschätzung“ als persönliches Feindbild. Er kippt einen mit Drogen versetzten Schnaps nach dem anderen und bekommt nach einiger Zeit eine kurze Vision. Während oben ein Plan für die Kiez-Taverne geschmiedet wird, sammelt man unten den visionären Barden wieder ein und marschiert los.\n\nVor der Taverne wird Dion vorgeschickt. Er sondiert – und entdeckt hinter dem Haus, neben vielen Betrunkenen, eine Luke. Er knackt das Schloss, steigt hinab in den dunklen Keller und trifft dort auf… eine Ratte. Dion sieht die Ratte. Die Ratte sieht Dion. Dion entscheidet: „Nein.“ Er sprintet wieder hoch und verrammelt den Keller. (Man muss Prioritäten setzen.)\nDann betritt die Gruppe gesammelt die Taverne und nimmt von Anton offiziell den Auftrag an, das Ungeziefer im Keller zu beseitigen. Als „Unterstützung“ schickt Anton seine 16-jährige Goth-Tochter Ashley mit. Man kann über vieles streiten, aber nicht darüber, dass diese Nacht eine Statistik zerstören wird.\nSie gehen zur Luke, öffnen sie, steigen hinab. Erste Etage: Schleim. Krabben. Überall. Die Gruppe wappnet sich und räumt auf – das geht noch. Dann erfahren sie von Ashley: Es gibt eine zweite Etage. Ein kollektives Seufzen, das vermutlich bis Kap Krako hörbar war, doch sie steigen hinab. Ashley soll oben an der Treppe warten, damit ihr unten nichts passiert. Sie wartet.\n\nUnten diesmal nur Schleim. Der Kampf neigt sich dem Ende, die Gruppe wird übermütig, und dann kommt die großartige Idee: Einen Schleim zu Ashley hochwerfen, um sie zu erschrecken. Natürlich ist es Günther, der das ausführt. Natürlich. Und nein, ich glaube nicht, dass es „nur ein Spaß“ war – ich kenne den Blick, bevor er irgendwas „Lustiges“ macht. Günther jagt dem letzten Schleim gefühlt fünf Minuten hinterher („mietzi mietzi“ – ja, wirklich), packt ihn, hebt ihn hoch und schleudert ihn die Treppe hinauf.\n\nKurze Stille. Dann ein Schrei, der nach Ashley klingt. Die Gruppe sprintet hoch – und findet Ashley verätzt und tot. Der Schleim hat genau das getan, was Schleime tun: Schleim sein. Man macht kurzen Prozess mit dem Rest, während Dion zum nächsten Tempel rennt, um einen Kleriker zu holen. Der Kleriker kommt in Windeseile und versucht die Wiederbelebung – doch es ist zu spät. Man spürt förmlich, wie die Würfel gefallen sind, und wenn man den Gott dieser Welt hören könnte, würde er wahrscheinlich trocken sagen: „Was für eine Tragödie.“\n\nEs folgt der Teil, über den niemand Balladen schreibt: Papierkram. Die Stadtwache nimmt Daten auf, und die Helden eilen zum nächsten Gildenstützpunkt, um ihre nicht angemeldete Monsterjagd als Notwehr darzustellen. Irgendwann ist alles halbwegs in trockenen Tüchern, die Nacht ist fast vorbei – und genau dann macht Dion wieder Dion-Sachen: Er schleicht sich noch einmal in den Keller, um das zu stehlen, weswegen sie eigentlich da waren. Schnell ein paar Dokumente geschnappt, raus, zurück zum Gasthaus.\n\nDort übergeben sie die Papiere an Nito, der sie prüft – und schon haben sie den nächsten Hinweis: Die Kiez-Taverne wurde vom Etablissement „Zum schnellen Ende“ beliefert. Nito setzt das letzte Teil ins Puzzle und sagt ihnen, was sie vermutlich ohnehin geahnt hatten: Das ist das örtliche Bordell. Dort sollen sie als Nächstes ermitteln.\nDie Gruppe entscheidet sich für einen seltenen Moment der Vernunft: erst schlafen. Nach diesem Tag sind sogar Chaos-Profis kurz im Energiesparmodus. Solen Aue schläft nie – aber die Vetra Skupina versucht es trotzdem. Morgen: Bordell. Heute: Trauma und Bett.",
    "session": "Sitzung 12",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778531026042",
    "categoryId": "cities",
    "title": "Wiesen",
    "summary": "",
    "tags": [
      "Dorf",
      "Solengrund"
    ],
    "region": "Solengrund",
    "body": "Wiesen ist ein großes Handelsdorf im Herzogtum Solengrund und liegt direkt am Perlenpfad, der wichtigen Hauptstraße zwischen Caldera, Kap Krako, Solen Grund und dem fernen Glutfels. Zwischen goldenen Feldern, staubigen Wagenwegen und unzähligen kleinen Bauernhöfen erhebt sich das Dorf als lebendiger Umschlagplatz für Getreide, Vieh, Werkzeuge und Nachrichten aus allen Teilen Camparis.\n\nStimmung:\n\nLändlich, geschäftig und wohlhabend, aber ständig abhängig von Wetter, Ernte und Handel.\nDer zentrale Markt ist laut, bunt und voller Händler, Bauern, Fuhrleute und Reisender.\nHinter der freundlichen Fassade liegt spürbare Anspannung: Eine schlechte Ernte in Wiesen kann ganz Campari ins Wanken bringen.\nDie Nähe zum geheimnisvollen Klagewald sorgt für Aberglauben, verschwundene Wanderer und düstere Geschichten am Abendfeuer.\n\nWichtige Punkte:\n\nDer große Markt: Herzstück des Dorfes und einer der wichtigsten Handelsplätze entlang des Perlenpfads. Hier wechseln Säcke voller Korn, Käse, Fleisch, Stoffe und Gerüchte täglich den Besitzer.\nDie Höfe der sieben Grafen: Rund um Wiesen verteilen sich zahlreiche Bauernhöfe und Felder, die sieben verschiedenen Grafen unterstehen. Zwischen ihnen herrschen Konkurrenz, alte Abmachungen und gelegentliche Grenzstreitigkeiten.\nDer Perlenpfad: Die Hauptstraße bringt Händler, Soldaten, Pilger und Abenteurer nach Wiesen. Wer wissen will, was im Reich geschieht, hört es meist zuerst in einer Schenke am Weg.\nDer Klagewald: Ein dunkler, geheimnisvoller Wald nahe des Dorfes. Man sagt, nachts seien dort Stimmen zu hören, die wie Weinen klingen. Die meisten Bauern meiden ihn, besonders nach Sonnenuntergang.\n\nWiesen gilt nicht ohne Grund als Kornkammer des Reiches: Solange seine Felder gedeihen, sind die Städte Camparis versorgt. Doch wenn Krankheit, Dürre oder etwas aus dem Klagewald die Ernte bedroht, spürt das ganze Reich den Hunger.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "images": [
      "Wiesen.png"
    ]
  },
  {
    "id": "entry-1778531321079",
    "categoryId": "cities",
    "title": "Klagewald",
    "summary": "",
    "tags": [
      "Wald",
      "Solengrund"
    ],
    "region": "Solengrund",
    "body": "Der Klagewald ist ein gewaltiger, uralter Wald im Grenzgebiet der Herzogtümer Solengrund und Narvik. Mit einer Länge von etwa 800 km und einer Breite von rund 350 km bedeckt er eine Fläche von ungefähr 280.000 km² – das entspricht etwa 28.000.000 Hektar. Damit ist er nicht einfach nur ein Wald, sondern ein eigenes, dunkles Reich aus Bäumen, Nebel und unerforschten Tiefen.\n\nStimmung:\n\nGeheimnisvoll, uralt und bedrohlich still.\nNur die äußeren Randgebiete sind halbwegs bekannt; das Innere gilt als unerforscht.\nReisende berichten von Stimmen im Wind, die wie Klagen oder Weinen klingen.\nSelbst erfahrene Jäger und Ruinentaucher meiden es, tiefer als nötig vorzudringen.\n\nWichtige Punkte:\n\nNatürliche Grenze: Der Klagewald trennt Solengrund und Narvik wie eine grüne Mauer. Viele Grenzstreitigkeiten enden dort, wo der Wald beginnt.\nDie erforschten Ränder: Holzfäller, Kräutersammler und Jäger kennen nur die äußeren Zonen. Schon wenige Tagesmärsche tiefer verschwinden Wege, Karten werden unzuverlässig und Kompasse spielen verrückt.\nDas unerforschte Innere: Niemand weiß genau, was im Herzen des Waldes liegt. Manche sprechen von vergessenen Ruinen, alten Schreinen oder Kreaturen, die es außerhalb des Klagewaldes gar nicht geben sollte.\nUnbekannte Tiere und Monster: Im Klagewald leben Wesen, die noch keinen Namen haben. Einige Tiere ähneln bekannten Arten, sind jedoch deutlich größer, aggressiver oder seltsam verändert – Wölfe so groß wie Pferde, Hirsche mit knöchernen Geweihen wie Baumkronen oder Vögel, deren Schreie wie menschliche Stimmen klingen.\n\nDer Klagewald ist mehr als nur ein Wald: Er ist eine Grenze, ein Rätsel und eine Warnung. Wer seine Tiefen betritt, verlässt nicht nur die sicheren Straßen Camparis, sondern vielleicht auch die bekannten Regeln der Welt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "images": [
      "Klagewald.png"
    ]
  },
  {
    "id": "entry-1778532397230",
    "categoryId": "cities",
    "title": "Solen Aue",
    "summary": "",
    "tags": [
      "Stadt",
      "Solengrund"
    ],
    "region": "Solengrund",
    "body": "Solen Aue ist die Hauptstadt des Herzogtums Solengrund und Sitz von Graf Julius von Solengrund, den das Volk hinter vorgehaltener Hand nur „die Hydra“ nennt. Die alte Hafenstadt liegt geschützt in einer weiten Bucht und ist von einer mächtigen Stadtmauer umgeben, die sie wie ein steinerner Ring vom Umland trennt. Im Inneren drängen sich hohe Gebäude dicht aneinander, sodass viele Straßen selbst am Tag dunkel und eng wirken. Zwischen salziger Hafenluft, feuchten Gassen, steilen Treppen und überfüllten Kontoren lebt eine Stadt voller Reichtum, Elend, Intrigen und gefährlicher Unterhaltung.\n\nStimmung:\n\nAlt, dicht bebaut und bedrückend, aber voller Leben.\nHafenlärm, Schattenstraßen, prunkvolle Fassaden und stinkende Lagerhäuser liegen nah beieinander.\nDie Macht des Grafen ist überall spürbar; seine Spitzel sollen so zahlreich sein wie die Köpfe einer Hydra.\nRuhm, Gewalt, Handel und Vergnügen ziehen Reisende aus ganz Campari an.\nSeit einiger Zeit hat die Stadt ein massives Drogenproblem, das sich durch alle Gesellschaftsschichten zieht – vom Hafenarbeiter bis zum Adeligen.\n\nWichtige Punkte:\n\nDie Große Mauer: Umgibt Solen Aue vollständig und schützt die Stadt vor Feinden, Aufständen und allem, was aus dem Umland kommen könnte. Die Tore sind streng bewacht.\nDer Hafen: Herz der Stadt und zugleich ihr schmutzigstes Gesicht. Hier werden täglich große Mengen an Waren umgeschlagen: Fisch, Getreide, Stoffe, Waffen, Gewürze, Artefakte und Güter aus fernen Gegenden. Viele neue Waren erreichen hier erstmals den Markt, bevor sie sich über Campari verbreiten. Zwischen Lagerhäusern, Fischständen und Handelsschiffen liegt das Elendsviertel, wo Bettler, Tagelöhner, Schmuggler und gescheiterte Abenteurer ums Überleben kämpfen.\nDer Markt der neuen Dinge: In Solen Aue tauchen immer wieder Waren auf, die anderswo noch niemand gesehen hat: fremde Heilmittel, seltsame Maschinen, exotische Stoffe, unbekannte Gewürze oder verbotene Substanzen. Nicht alles, was hier verkauft wird, ist legal – und nicht alles stammt aus ehrlichen Quellen.\nDas Drogenproblem: Eine neue Welle gefährlicher Rauschmittel hat Solen Aue erfasst. In Hafenkneipen, Adelsgesellschaften, Arenakämpferquartieren und sogar in manchen Tempelkreisen kursieren Pulver, Tropfen und Rauchwaren, die Versprechen von Kraft, Vergessen oder Visionen machen. Die Stadtwache wirkt machtlos oder gekauft, während Händler, Banden und geheime Gönner am Elend verdienen.\nDas Sonnenblut-Kolosseum: Eine gewaltige Arena direkt am Hafen. In bestimmten Abständen werden hier große Spiele zu Ehren der Herzöge und des Königs ausgetragen. Der Spielmacher erfindet die Arena jedes Mal neu: mal mit Flutbecken, mal mit beweglichen Mauern, Fallen, Bestien oder brennenden Plattformen. Viele eifrige Helden aus ganz Campari reisen an, um Ruhm zu gewinnen – doch nur wenige verlassen das Kolosseum wieder lebend.\nDer Sitz der Hydra: Die Residenz von Graf Julius von Solengrund. Von hier aus lenkt er Politik, Handel und Intrigen der Stadt. Wer sich gegen ihn stellt, merkt oft zu spät, dass ein abgeschlagener Kopf der Hydra nur zwei neue nach sich zieht.\nDas „Schnelle Ende“: Das nobelste Bordell in Südcampari und ein offenes Geheimnis unter Händlern, Adeligen und Offizieren. Hinter seinen seidigen Vorhängen werden nicht nur Vergnügungen verkauft, sondern auch Informationen, Gefallen und Schweigen.\n\nSolen Aue ist eine Stadt der Gegensätze: prächtig und verkommen, sicher und tödlich, reich und hungrig. Hier werden Waren, Gerüchte und Leben gleichermaßen gehandelt – und während die Hydra über allem wacht, frisst sich ein neues Gift langsam durch die Adern der Stadt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": [],
    "images": [
      "Solen Aue.png"
    ]
  },
  {
    "id": "entry-1778533654310",
    "categoryId": "npcs",
    "title": "Regina Radler",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Regina Radler ist eine etwa fünfunddreißigjährige Menschin und die Zwillingsschwester von Wilhelmina. Mit ihrer kleineren, zierlichen Statur, den grünen Augen, Sommersprossen und dem braunen, welligen Haar wirkt sie hübsch und lebhaft, während ihre herzliche Art schnell die Aufmerksamkeit der Gäste gewinnt. Als Schankmaid und Besitzerin des Gasthauses „Zur Neuen Welt“ führt sie ihr Haus mit viel Energie, aber wenig Ordnung – bei ihr geht es oft wild, laut und chaotisch zu. Dank ihrer Fähigkeiten als Gesellin des Kesselmagus der Küche zaubert sie dennoch erstaunlich gute Speisen und Getränke auf den Tisch. Trotz aller Rivalität zu ihrer Schwester liebt Regina Wilhelmina insgeheim sehr, auch wenn sie das nur selten offen zeigt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778533733114",
    "categoryId": "npcs",
    "title": "Rudi Radler",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Rudi Radler ist ein etwa achtunddreißigjähriger Mensch von großer, muskulöser Statur, mit roten Haaren, rotem Bart und klaren blauen Augen. Als Händler reist er regelmäßig zwischen dem Grenzpunkt und Kap Krako hin und her, kennt die Straßen, Warenpreise und Geschichten der Reisenden besser als viele andere. An einer Hand fehlt ihm der Zeigefinger, was ihm im Alltag immer wieder auffällt – besonders, wenn er etwas abzählt oder betont und dabei grundsätzlich einen Finger zu wenig hebt. Obwohl er seine Reisen oft als anstrengende Pflicht verkauft, genießt Rudi insgeheim die Zeit unterwegs, die Freiheit der Straße und die Ruhe fernab fester Erwartungen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778533813059",
    "categoryId": "npcs",
    "title": "Werner Weinschorle",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Werner Weinschorle ist ein etwa fünfzehnjähriger Mensch mit blonden Haaren, grünen Augen und Sommersprossen, der etwas kleiner ist als die meisten Gleichaltrigen und damit eher nach seiner Mutter kommt. Trotz seiner geringeren Körpergröße ist er athletisch und flink, was ihm bei der Arbeit als Bedienung durchaus zugutekommt. Er wirkt aufmerksam, aber nicht immer begeistert von seinen Aufgaben – besonders Wischarbeiten hasst er leidenschaftlich und versucht sie, wann immer möglich, zu umgehen. Insgeheim verabscheut Werner auch das allzu ordentliche Gasthaus seiner Mutter, da ihm die ständige Sauberkeit und Strenge dort gehörig auf die Nerven gehen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778533878150",
    "categoryId": "npcs",
    "title": "Hauptmann Peter Piranha",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Hauptmann Peter Piranha ist ein etwa sechsundvierzigjähriger Mensch von kleiner Körpergröße, aber mit kompaktem, muskulösem Körperbau. Sein schwarz-graues Haar, die blauen Augen und sein glattrasiertes Gesicht verleihen ihm ein waches, entschlossenes Auftreten. Besonders auffällig ist sein hervorstehender rechter unterer Eckzahn, der ihm ein leicht gefährliches, fast bissiges Aussehen gibt. Als Hauptmann wirkt er streng, direkt und durchsetzungsfähig, doch seine Eigenart sorgt immer wieder für Aufmerksamkeit: Beim Sprechen macht er auffallend große Mundbewegungen, um sich nicht versehentlich selbst zu beißen. Insgeheim träumt er schon lange davon, diesen markanten Zahn vergolden zu lassen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778533960901",
    "categoryId": "npcs",
    "title": "Linus Lichtschuppe",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Linus Lichtschuppe ist ein etwa dreißigjähriger Dragonborn von durchschnittlicher Größe, mit weißen, glänzenden Schuppen, muskulösem Körperbau und leuchtend gelben Augen. Als Kleriker trägt er eine ruhige, pflichtbewusste Würde in sich und wirkt stets, als wolle er Licht und Ordnung an jeden dunklen Ort bringen. Seine auffälligste Eigenart ist sein Drang, alles „heilig zu säubern“ – ob Altar, Türgriff, Münze oder verdächtig staubige Stiefel. Hinter seiner frommen und gewissenhaften Fassade verbirgt Linus jedoch ein zartes Geheimnis: Er ist heimlich in Shalin verliebt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534024071",
    "categoryId": "npcs",
    "title": "Elke Einblick",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Elke Einblick ist eine etwa achtundzwanzigjährige Menschin von kleiner, zierlicher Gestalt, die mit ihrer hübschen Erscheinung und den auffälligen lila Haaren sofort ins Auge fällt. Auch ihre lila Augen wirken magisch und geheimnisvoll, doch eigentlich sind sie grün – ein Effekt, den sie mithilfe von Illusionsmagie verbirgt. In fließenden Roben und mit einer magischen Kugel an ihrer Seite tritt sie als Erkenntnis-Magierin auf, stets auf der Suche nach verborgenen Wahrheiten, Zeichen und Antworten. Ihre Neugier ist dabei kaum zu bremsen, was sie gelegentlich in Dinge hineinzieht, die besser unberührt geblieben wären. Als Gesellin der Artifex Pigmenta versteht sie sich zudem auf Farben und magische Gestaltung, doch hinter ihrer wissbegierigen Fassade liegt ein Kindheitstrauma, über das sie nur selten spricht.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534091108",
    "categoryId": "npcs",
    "title": "Victoria Vitale",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Victoria Vitale ist eine vierunddreißigjährige Menschin mit langen braunen Haaren, blauen Augen mit auffallend großer schwarzer Iris und einem Gesicht voller Sommersprossen. Ihr blau-weißes viktorianisches Kleid mit Schleifen, die eleganten Abendhandschuhe und die Schleife im Haar verleihen ihr eine vornehme, beinahe puppenhafte Erscheinung. Hinter dieser zarten Fassade steckt jedoch ein wacher, neugieriger und äußerst intelligenter Geist. Als Skriptorin der Sigillographie versteht sie sich auf Zeichen, Siegel und verborgene Bedeutungen – und lässt selten ein Rätsel ruhen, bevor sie nicht jedes Detail davon durchschaut hat.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534118089",
    "categoryId": "npcs",
    "title": "Steffan Stumpfklaue",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Steffan Stumpfklaue ist ein etwa siebzigjähriger Dragonborn von durchschnittlicher Größe, mit beigen Schuppen, gelben Augen und einer gebrechlichen Gestalt, die er mit einem Gehstock stützt. Eines seiner Augen gilt als erblindet, was seinem ohnehin alten, forschenden Blick eine rätselhafte Schwere verleiht. Als Ruinenforscher und Meister des Archäologischen Runenschmieds kennt er sich hervorragend mit alten Zeichen, vergessenen Bauwerken und uralten Handwerksgeheimnissen aus. Trotz seines Alters ist seine Wissbegierde ungebrochen – jede Ruine, jede Inschrift und jedes zerbrochene Relikt weckt sofort seinen Forscherdrang. Nur wenige ahnen, dass sein angeblich blindes Auge in Wahrheit noch funktioniert und er damit mehr sieht, als er vorgibt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534156203",
    "categoryId": "npcs",
    "title": "Alfred Absatz",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Narvik",
    "body": "Alfred Absatz ist ein etwa dreiundzwanzigjähriger Mensch von normaler Körpergröße und schlanker Statur, mit braunen Augen, Brille, kurzem zerzaustem braunem Haar und leichtem Stoppelbart. In seinem karierten Hemd wirkt er wie ein unscheinbarer, etwas verschlafener Zeitungsverkäufer, der jedoch stets bestens über die neuesten Gerüchte und Schlagzeilen informiert ist. Während Gesprächen kann er es kaum lassen, nebenbei weiter in der Zeitung zu lesen, was ihn manchmal abwesend oder unhöflich erscheinen lässt. Tatsächlich ist Alfred eher introvertiert und versteckt sich hinter den gedruckten Zeilen, wenn ihm ein Gespräch zu persönlich wird.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534337412",
    "categoryId": "npcs",
    "title": "Wilhelmine Weinschorle",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Wilhelmine Weinschorle ist eine etwa fünfunddreißigjährige Menschin und Besitzerin des Gasthauses „Zur Kornkammer“. Mit ihrer kleineren, zierlichen Statur, den grünen Augen, Sommersprossen und dem braunen, welligen Haar wirkt sie hübsch und einladend, doch hinter ihrem freundlichen Auftreten steckt ein fast fanatischer Sinn für Ordnung. Als Schankmaid führt sie ihr Gasthaus hypersauber und penibel strukturiert – jeder Krug hat seinen Platz, jeder Tisch glänzt, und Staub scheint in ihrer Nähe kaum eine Überlebenschance zu haben. Als Gesellin des Kesselmagus des Braukellers versteht sie sich hervorragend auf Getränke, Gärung und feine Braukunst. Trotz der Rivalität zu ihrer Schwester Regina liebt Wilhelmine sie insgeheim sehr, auch wenn sie das lieber hinter strengen Blicken und ordentlichen Arbeitslisten verbirgt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534436729",
    "categoryId": "npcs",
    "title": "Walter Weinschorle",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Walter Weinschorle ist ein etwa achtunddreißigjähriger Mensch von großer, muskulöser Statur, mit blondem Haar, blondem Bart und braunen Augen. Als Händler reist er regelmäßig zwischen dem Grenzpunkt und Solen Grund und kennt die Wege, Preise und Eigenheiten der Reisenden nur zu gut. Sein teilweise abgeschnittenes Ohr ist ein auffälliges Merkmal, das ihn oft dazu bringt, beim Zuhören unbewusst die Hand ans Ohr zu führen, als könne er damit jedes Wort besser einfangen. Obwohl er seine Handelsreisen meist als reine Arbeit darstellt, genießt Walter insgeheim die Zeit unterwegs – die Freiheit der Straße, die wechselnden Gesichter und die Ruhe fernab des Alltags.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534509856",
    "categoryId": "npcs",
    "title": "Runa Radler",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Runa Radler ist eine etwa fünfzehnjährige Menschin, die für ihr Alter etwas größer gewachsen ist, dabei aber zierlich und hübsch wirkt. Ihr rotes, welliges Haar, die grünen Augen und die Sommersprossen verleihen ihr eine lebhafte, freundliche Ausstrahlung. Als Schankmaid arbeitet sie aufmerksam und gewissenhaft im Gasthaus ihrer Mutter, auch wenn sie sich dort oft mehr Ordnung wünschen würde. Besonders beim Wischen blüht Runa regelrecht auf – saubere Böden, glänzende Tische und klare Abläufe geben ihr ein gutes Gefühl. Insgeheim hasst sie das unordentliche Gasthaus ihrer Mutter und träumt davon, eines Tages endlich richtig Struktur in das Chaos zu bringen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534575714",
    "categoryId": "npcs",
    "title": "Hauptmann Bernadette Bienchen",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Hauptmann Bernadette Bienchen ist eine etwa neunzehnjährige Menschin von kleiner Statur, die trotz ihres jungen Alters bereits eine auffallend autoritäre Präsenz besitzt. Ihr blondes Haar ist mit schwarzen Strähnchen durchzogen, hinten zu einem Dutt gebunden und vorne von kleinen Affenschaukeln gerahmt. Ihre tiefroten, leicht schimmernden Augen und die körperbetonte leichte Lederrüstung verleihen ihr eine gefährlich elegante Ausstrahlung, während ihr athletischer Körperbau zeigt, dass sie nicht nur durch Worte führt. Als Hauptmann tritt Bernadette herablassend und arrogant auf, als müsse sich die Welt erst beweisen, bevor sie ihre Aufmerksamkeit verdient. Insgeheim fragt sie sich jedoch ernsthaft, warum sie überhaupt hier gelandet ist – und ihr angespanntes Verhältnis zu Ralf scheint dabei ein deutlich größeres Problem zu sein, als sie offen zugibt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534665813",
    "categoryId": "npcs",
    "title": "Shalin Schattenschuppe",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Shalin Schattenschuppe ist eine etwa zweiunddreißigjährige Dragonborn von durchschnittlicher Größe, mit mattschwarzen Schuppen, athletischem Körperbau und ätzend grünen Augen, die ihr eine düstere, fast giftige Ausstrahlung verleihen. Als Klerikerin beschäftigt sie sich vor allem mit Flüchen, Verdammnissen und finsteren Zeichen – allerdings nur, wenn sie ihrer Meinung nach „wirklich ernstzunehmen“ sind. Kleinere Flüche oder harmlose Verwünschungen tut sie gerne abfällig als „kleine Flüchlein“ ab und schenkt ihnen kaum Beachtung. Hinter ihrer kontrollierten Fassade verbirgt Shalin ein gefährliches Geheimnis: Sie besitzt eine kleine, gut versteckte Sammlung verfluchter Artefakte, die sie weit mehr schätzt, als eine Klerikerin es vermutlich sollte.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534752964",
    "categoryId": "npcs",
    "title": "Ralf Rückblick",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Ralf Rückblick ist ein etwa vierzigjähriger Mensch von großer, schlanker Gestalt, mit zotteligem, längerem blondem Haar, blauem Blick und dichtem Vollbart. In seinen Roben und mit einer magischen Kugel an seiner Seite wirkt er ganz wie ein würdevoller Erkenntnis-Magier – bis man merkt, wie zerstreut und langsam er im Alltag tatsächlich ist. Gedankenverloren verliert er sich in Erinnerungen, Deutungen und halbfertigen Erkenntnissen, was besonders Hauptmann Bernadette Bienchen regelmäßig in den Wahnsinn treibt. Insgeheim sieht Ralf sich jedoch als eine Art Vorbild für sie und ist überzeugt, dass seine ruhige, bedächtige Art ihr irgendwann helfen wird, weniger impulsiv zu sein.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534811712",
    "categoryId": "npcs",
    "title": "Fabian Fessel",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Fabian Fessel ist ein sechsundvierzigjähriger Mensch von großer, muskulöser Statur, mit vollem, kurzem schwarzem Haar und grünen Augen, deren große schwarze Iris seinem Blick etwas Eindringliches verleiht. In seinem Mantel und mit geflochtenem Schal tritt er stets gepflegt, ruhig und ausgesprochen seriös auf. Als Skriptor der Sigillographie versteht er sich auf Siegel, Zeichen und deren verborgene Bedeutungen, wobei er jedes Detail mit größter Sorgfalt betrachtet. Seine ernste Art lässt ihn zuverlässig und kompetent wirken, doch auch schwer einzuschätzen – Fabian scheint selten etwas zu sagen oder zu tun, ohne vorher genau darüber nachgedacht zu haben.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534887542",
    "categoryId": "npcs",
    "title": "Stella Spitze",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Stella Spitze ist eine etwa siebenundzwanzigjährige Menschin von großer, schlanker und zierlicher Gestalt, mit hellem Teint, offenem schwarzem Haar und blauen Augen. Ihre Lesebrille und das Rosen-Tattoo an ihrem Hals verleihen ihr eine elegante, zugleich leicht geheimnisvolle Ausstrahlung. Als Gildenassistentin arbeitet sie organisiert, aufmerksam und mit einem feinen Gespür dafür, welche Aufträge zu wem passen – oder eben gerade nicht. Besonders John gibt sie mit sichtlichem Vergnügen Aufgaben, die außerhalb seiner eigentlichen Stärken liegen, vermutlich um ihn herauszufordern oder ein wenig aus dem Konzept zu bringen. Hinter ihrer professionellen Fassade verbirgt Stella zudem, dass sie lesbisch ist, ein Detail, das sie nur mit Menschen teilt, denen sie wirklich vertraut.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778534953213",
    "categoryId": "npcs",
    "title": "John Jonsen",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "John Jonsen ist ein dreißigjähriger Mensch von kleiner, aber muskulöser Statur, mit kurzem, vollem blondem Haar, blauen Augen und braun gebrannter Haut. Als D-Rang-Abenteurer wirkt er tatkräftig, zäh und bereit, sich auch durch unangenehme Aufträge zu kämpfen. Seine größte Schwäche zeigt sich jedoch in der Nähe von Stella Spitze: John ist schwer in sie verliebt und wird dabei schnell nervös, übermotiviert oder peinlich bemüht. Ob übertriebene Heldengesten, unbeholfene Komplimente oder der verzweifelte Versuch, besonders beeindruckend zu wirken – seine Gefühle für Stella bringen regelmäßig all die nervigen Nebeneffekte mit sich, die man von hoffnungsloser Schwärmerei erwarten kann.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778535010705",
    "categoryId": "npcs",
    "title": "Gustav Goldschuppe",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Gustav Goldschuppe ist ein siebzehnjähriger Dragonborn mit matten goldenen Schuppen, gelben Augen und muskulösem Körperbau. Trotz seines jungen Alters trägt er gute Kleidung mit Weste und Fliege, doch sein Auftreten wirkt nie ganz geordnet: Die Fliege hängt schräg, ein Ärmel ist hochgekrempelt, der andere nicht. Diese kleinen Unstimmigkeiten passen zu seiner inneren Unruhe, denn Gustav wirkt oft aufgewühlt, als hätte er gerade eine hitzige Diskussion verlassen oder müsste sich jeden Moment zu etwas Wichtigem äußern. Unter der gepflegten Fassade brodelt spürbar Energie, die er nur schwer im Zaum halten kann.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778535075344",
    "categoryId": "npcs",
    "title": "Eugen Eich",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Eugen Eich ist ein etwa fünfzigjähriger Mensch von etwas kleinerer Körpergröße und schlanker Statur, mit kurzen braunen Haaren, leicht gräulichen Strähnen, blauem Blick und rauem Stoppelbart. Seine braun-grün getarnte Lederrüstung und die zahlreiche Ausrüstung, die er mit sich trägt, lassen sofort erkennen, dass er als Waldläufer und Vitaalchemist ein Leben abseits sicherer Straßen gewohnt ist. Eugen wirkt ernst, fokussiert und ständig aufmerksam, als würde er selbst in einem ruhigen Gespräch noch Spuren, Geräusche und Fluchtwege im Blick behalten. Seine seltsamste Eigenart ist es, immer wieder kurz zu verschwinden und scheinbar aus dem Nichts wieder aufzutauchen – meist genau dann, wenn man gerade dachte, er sei längst weitergezogen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778535154142",
    "categoryId": "npcs",
    "title": "Sören Sold",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Sören Sold war ein etwa dreißigjähriger Mensch aus Sengen und einer der Sold-Zwillinge. Mit seinem athletischen, lang gewachsenen Körperbau, kurzen dunkelbraunen Haaren, grünen Augen und glattrasiertem Gesicht wirkte er wie jemand, der für den Kampf auf Distanz gemacht war. In seiner Ganzkörper-Hartlederrüstung und mit dem Speer in der Hand trat er als erfahrener Söldner auf, wachsam, beweglich und bereit, Befehle ohne großes Zögern auszuführen. Mittlerweile ist Sören leider verstorben, doch sein Name bleibt mit der Geschichte der Zwillinge und den Wegen, die sie aus Sengen hinausführten, verbunden.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778535232627",
    "categoryId": "npcs",
    "title": "Sönke Sold",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Sönke Sold war ein etwa dreißigjähriger Mensch aus Sengen und der Zwillingsbruder von Sören Sold. Mit seinem athletischen, lang gewachsenen Körperbau, den kurzen dunkelbraunen Haaren, grünen Augen und dem glattrasierten Gesicht ähnelte er seinem Bruder fast aufs Haar. In seiner Ganzkörper-Hartlederrüstung und mit Speer bewaffnet verdiente er seinen Lebensunterhalt als Söldner, wobei er durch Beweglichkeit, Disziplin und kampferprobte Ruhe auffiel. Auch Sönke ist inzwischen verstorben, doch gemeinsam mit Sören bleibt er als Teil der Sold-Zwillinge in Erinnerung.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-11",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778613089428",
    "categoryId": "npcs",
    "title": "Graf Wilhelm Weiden",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Graf Wilhelm Weiden ist ein etwa dreißigjähriger Mensch von riesiger Körpergröße, gut gebaut und muskulös, mit sonnengebräunter Haut, schwarzen Haaren, grünen Augen und einem markanten Spitzbart. Sein lebhaftes Gesicht und seine volksnahe Art lassen ihn trotz seiner beeindruckenden Erscheinung zugänglich wirken. Als arbeitsamer Familienmensch und Graf packt er lieber selbst mit an, als nur Befehle zu geben, wobei sein Hammer fast ebenso sehr zu ihm gehört wie sein Titel. Hinter seiner herzlichen Energie verbirgt sich jedoch eine gefährliche Besonderheit: In seinen Adern fließt ätzendes Blut. In Gesprächen ist Wilhelm voller Tatendrang und Begeisterung – so sehr, dass er andere oft nicht ausreden lässt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778613136007",
    "categoryId": "npcs",
    "title": "Gräfin Sandra Weiden",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Gräfin Sandra Weiden, auch als Eisprinzessin bekannt, ist eine etwa einundzwanzigjährige Menschin mit langem weißem Haar, blauen Augen, schneeweißer Haut und auffallend roten Lippen. Ihr zierlicher Körperbau und ihr hübsches Kleid verleihen ihr eine fast märchenhafte, frostige Eleganz, die durch ihre hochnäsige Haltung noch verstärkt wird. Als Gräfin tritt sie kühl, distanziert und sehr standesbewusst auf, als stünde sie stets ein wenig über den Menschen um sie herum. Im zweiten Trimester schwanger, wirkt sie nach außen zwar zerbrechlicher, doch ihre abgehobene Art und ihr eisiger Blick lassen kaum Zweifel daran, dass sie weiterhin erwartet, mit größtem Respekt behandelt zu werden.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778613460716",
    "categoryId": "npcs",
    "title": "Witchen Weiden",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Witchen Weiden ist ein etwa zweijähriges Menschenkind mit Haut so weiß wie Schnee, Lippen so rot wie Blut und Haaren so schwarz wie Ebenholz. Trotz ihres märchenhaften Aussehens ist sie vor allem eines: ein professioneller Windelscheißer mit beeindruckender Ausdauer. Ihre wichtigste Tätigkeit besteht darin, die Welt lautstark und völlig unverständlich zu kommentieren – mit endlosen Wortfetzen, Fantasielauten und begeistertem Gebrabbel, das zwar kaum Sinn ergibt, aber mit größter Überzeugung vorgetragen wird.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778613630049",
    "categoryId": "npcs",
    "title": "Hauptmann Sven Schnee",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Hauptmann Sven Schnee ist ein etwa siebzehnjähriger Mensch adeliger Herkunft, mit kurzem weißem Haar, blauen Augen und heller Haut. Trotz seiner eher kleinen Körpergröße besitzt er einen athletischen, für sein Alter bemerkenswert muskulösen Körperbau und trägt seine Hauptmannsuniform mit dem Symbol von Glutfels mit sichtbarem Stolz. An seiner Seite führt er ein Rapier, das seine elegante, schnelle Kampfweise unterstreicht. Als Mitglied der Beschützer des Reiches nimmt Sven seine Stellung äußerst ernst – vielleicht sogar zu ernst, denn seine abgehobene Art lässt schnell erkennen, dass er sich selbst für etwas Besonderes hält.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778613744733",
    "categoryId": "npcs",
    "title": "Ehrhardt Erdinger",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Ehrhardt Erdinger ist ein etwa fünfundvierzigjähriger Mensch von stämmiger, kräftiger und etwas dicker Statur. Mit Halbglatze, dichtem Vollbart, grünen Augen und tief brummender Stimme wirkt er schon auf den ersten Blick wie ein grimmiger Kerl, dem man besser nicht dumm kommt. Sein tätowierter Arm und seine raue Art unterstreichen den Eindruck eines Wirts, der in seinem Schankraum die Regeln selbst setzt. Trotz seiner Erfahrung hinter dem Tresen ist Ehrhardt leicht reizbar – wer zu laut pöbelt, zu lange diskutiert oder seine Geduld strapaziert, bekommt schnell seine donnernde Stimme zu hören.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778613765018",
    "categoryId": "npcs",
    "title": "Angelika Acker",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Angelika Acker ist eine etwa siebzehnjährige Menschin mit robuster Statur, langen schwarzen Haaren und Sommersprossen. Tagsüber wirkt sie wie ein zurückhaltendes Mauerblümchen, arbeitsam, still und fast unscheinbar, doch für ihre Abendschicht als Kellnerin macht sie sich sorgfältig zurecht. Hinter ihrer schüchternen Art steckt ein ausgeprägter Perfektionismus: Jeder Tisch soll sauber, jede Bestellung richtig und jeder Handgriff möglichst fehlerfrei sein. Gerade deshalb wirkt Angelika manchmal nervös, doch wer genauer hinsieht, erkennt eine fleißige junge Frau, die nur alles besonders gut machen möchte.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778613962791",
    "categoryId": "npcs",
    "title": "Hagan Harken",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Hagan Harken ist ein etwa fünfzigjähriger Mensch mit kurzen grauen Haaren, grünen Augen und einem gepflegten Vollbart, der in einen spitzen Schnauzer übergeht. Trotz seines Alters besitzt er noch eine athletische Statur und trägt seine Gildenuniform mit einem goldenen Anstecker voller Würde. Als Gildenassistent wirkt er erfahren, aufmerksam und zuverlässig – jemand, der schon viele Abenteurer kommen und gehen gesehen hat. Seine Macke ist seine Vorliebe für gute Ratschläge: Ob gefragt oder ungefragt, Hagan hat fast immer einen weisen Hinweis, eine warnende Anekdote oder einen praktischen Tipp parat.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614175331",
    "categoryId": "npcs",
    "title": "Sido Strick",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Sido Strick ist ein etwa vierundvierzigjähriger Mensch von leicht überdurchschnittlicher Größe, muskulös und in schwarze Lederkleidung mit Kapuze gehüllt. Sein Gesicht verbirgt er hinter einer Totenkopfmaske, unter der nur sein kurzer schwarzer Bart und seine braunen Augen hervortreten. An seinem Gürtel trägt er ein schwarzes Buch mit silbernem Knopf, in dem er Porträts versklavter Personen sammelt, die ihm auf besondere Weise aufgefallen sind. Als Sklavenhändler, Künstler und Meister-Tintenmischer verbindet er grausame Geschäfte mit unheimlicher Ästhetik. Seine auffälligste Macke ist seine Leidenschaft, Menschen zu zeichnen – oft mit einer ruhigen, beinahe bewundernden Genauigkeit, die ihn nur noch bedrohlicher wirken lässt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614268371",
    "categoryId": "npcs",
    "title": "Henri Hengst",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Henri Hengst ist ein etwa sechzehnjähriger Mensch mit muskulösem Körperbau, kurzen braunen Haaren und schlichter Stallburschen-Tunika samt Lederschuhen. Er wirkt bodenständig, kräftig und an harte Arbeit gewöhnt, als verbringe er mehr Zeit zwischen Pferdeboxen, Heuballen und Satteln als in sauberen Stuben. Trotz seines jungen Alters packt Henri zuverlässig mit an und scheut weder Schmutz noch frühe Morgenstunden. Sein unverkennbares Markenzeichen ist das Stroh in seinen Haaren, das dort scheinbar immer hängt – egal, wie oft er es herauszupfen will.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614315805",
    "categoryId": "npcs",
    "title": "Feldwebel Ferdinand Fe",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Feldwebel Ferdinand Fe ist ein etwa fünfundfünfzigjähriger Mensch von großer, robuster Statur, der fast vollständig in einer dicken Plattenrüstung verschwindet. Von seinem Gesicht sind meist nur zwei braune Augen durch den Helm zu erkennen, die wachsam und streng aus dem Metall hervorblicken. Als Feldwebel wirkt er wie ein unbeweglicher Turm aus Stahl, zuverlässig, standhaft und schwer aus der Ruhe zu bringen. Sein Auftritt wäre vollkommen einschüchternd, würde seine Rüstung nicht bei fast jeder Bewegung hörbar quietschen – ein unüberhörbares Markenzeichen, das ihn schon ankündigt, lange bevor man ihn sieht.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614545552",
    "categoryId": "npcs",
    "title": "Lewin Löwenzahn",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Lewin Löwenzahn ist ein etwa dreißigjähriger Mensch von schlanker Statur, dessen fehlende Haare und Augenbrauen sofort auf die Risiken seines Berufs schließen lassen. Mit blauen Augen, glattrasiertem Gesicht und robuster Stoff-Sicherheitskleidung wirkt er wie jemand, der schon die eine oder andere alchemistische Explosion aus nächster Nähe erlebt hat. Um den Hals trägt er eine Fliegerbrille, während dicke Handschuhe an seinem Gürtel hängen – stets bereit für das nächste Experiment. Als Alchemist ist Lewin neugierig, praktisch veranlagt und vermutlich deutlich mutiger, als es vernünftig wäre.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614623964",
    "categoryId": "npcs",
    "title": "Zahir „Mond“ Zucker",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Zahir „Mond“ Zucker ist ein etwa zweiundvierzigjähriger Dragonborn mit sehr korpulenter Statur, orangefarbenen Schuppen und gelben Augen. Als Besitzer des Gemischtwarenladens „Onkel Oslo“ tritt er stets wohl gekleidet und geschäftstüchtig auf, mit dem selbstbewussten Lächeln eines Händlers, der seine Ware genau kennt. Er versteht es, Kunden freundlich einzuwickeln, Angebote groß anzupreisen und selbst einfache Gegenstände wie kleine Kostbarkeiten wirken zu lassen. Seine unverkennbare Macke ist sein ständiger Verkaufsspruch: „Zahir haben gute Preise“ – eine Aussage, die er mit solcher Überzeugung wiederholt, dass man fast vergisst, nachzurechnen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614721386",
    "categoryId": "npcs",
    "title": "Schantal Schere",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Schantal Schere ist eine etwa dreiundzwanzigjährige Menschin von schlanker Statur, mit kurzen braunen Haaren, blauen Augen und Sommersprossen. In ihrer Schneider-Arbeitskleidung, mit Schürze und Maßband, wirkt sie stets bereit, Stoffe zuzuschneiden, Nähte zu prüfen und kleine Änderungen im Handumdrehen vorzunehmen. Als Schneiderin ist sie aufmerksam, flink und besitzt ein gutes Auge für Passform und Details. Ihre auffälligste Macke zeigt sich jedoch sofort beim ersten Kontakt: Noch bevor ein Kunde richtig erklärt hat, was er möchte, zückt Schantal bereits das Maßband und beginnt, ihn von oben bis unten zu vermessen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614814939",
    "categoryId": "npcs",
    "title": "Ravio",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Überall",
    "body": "Ravio ist ein etwa vierundzwanzigjähriger Halbling und wandernder Händler, der schon von weitem durch seine bunte Stoffkleidung und den farbenfrohen Schal auffällt. Sein Gesicht hält er meist unter einer braunen Kapuze verborgen, die wie ein Almiraj gestaltet ist – ein hasenähnliches Wesen mit einem Horn – und ihm eine märchenhafte, leicht verschlagene Ausstrahlung verleiht. Als reisender Verkäufer taucht er scheinbar überall dort auf, wo jemand gerade etwas brauchen könnte, und bietet seine Waren mit endloser Begeisterung an. Seine größte Macke ist dabei seine Penetranz: Ravio gibt kaum auf, bevor nicht wenigstens irgendjemand etwas gekauft, getauscht oder sich zumindest seine gesamte Auslage angesehen hat.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614890310",
    "categoryId": "npcs",
    "title": "Zwoelv",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Überall",
    "body": "Zwoelv ist eine wandernde Händlerin die durch die Lande zieht. Sie trägt ein buntes Stoffkleid, das von farbigen Schleiern umspielt wird, und ihr langes, blondes Haar fällt offen und wellig über ihre Schultern. Ihr Gesicht verbirgt sie hinter einer Hirschmaske, die ihr eine geheimnisvolle, fast rituelle Ausstrahlung verleiht. Obwohl sie Tränke verkauft, spricht Zwoelv für eine Händlerin erstaunlich wenig – sie lässt lieber ihre Waren, Gesten und stillen Blicke für sich sprechen, was ihre Kundschaft oft gleichermaßen neugierig wie verunsichert.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778614973165",
    "categoryId": "npcs",
    "title": "Fink",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Überall",
    "body": "Fink ist ein etwa achtundzwanzigjähriger Dragonborn und wandernder Händler, dessen eigentlich weiße Schuppen derzeit violett bemalt sind. Groß, muskulös und in bunter Plattenrüstung gekleidet, wirkt er eher wie ein prunkvoller Krieger als wie ein gewöhnlicher Verkäufer. Sein auffälligstes Merkmal ist ein Helm mit Hörnern, geformt wie ein Löwenkopf und geschmückt mit einer roten Feder, der ihm eine imposante, fast theatralische Erscheinung verleiht. Als Händler bietet Fink vor allem Waffen und Rüstungen an, doch Verkaufsgespräche gestalten sich manchmal schwierig: Durch seinen mächtigen Helm ist er nur schwer zu verstehen, was seine Angebote nicht weniger eindrucksvoll, aber deutlich rätselhafter macht.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615040865",
    "categoryId": "npcs",
    "title": "Elvira Frostfeuer",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Elvira Frostfeuer ist eine etwa sechshundertjährige Elfe von schlanker Gestalt, mit gepflegtem, langem weißem Haar, das sie meist zu einem ordentlichen Dutt trägt. Ihre blauen Augen und die feinen Falten in ihrem Gesicht verleihen ihr eine ruhige, alte Weisheit, ohne ihre elfische Anmut ganz zu überdecken. Als Kindermädchen von Anastasia tritt sie geduldig, aufmerksam und fürsorglich auf, mit der Gelassenheit von jemandem, der schon viele Generationen kommen und gehen gesehen hat. Hinter ihrer sanften Art liegt eine stille Strenge, die dafür sorgt, dass selbst das widerspenstigste Kind irgendwann auf sie hört.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615072671",
    "categoryId": "npcs",
    "title": "Clara Frostfeuer",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Clara Frostfeuer ist eine etwa hundertzwanzigjährige Elfe und die Tochter von Elvira Frostfeuer. Mit ihrer großen, schlanken Gestalt, den langen blonden Haaren, blauen Augen und feinen Sommersprossen wirkt sie deutlich jünger und lebhafter als ihre ehrwürdige Mutter. Einst war sie Anastasias Spielkameradin und kennt daher viele Geschichten, Eigenheiten und Geheimnisse aus deren Kindheit. Auch wenn Clara inzwischen erwachsener auftritt, haftet ihr noch immer etwas Spielerisches und Vertrautes an – als wäre sie jemand, der alte Erinnerungen leichter bewahrt als alte Förmlichkeiten.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615167269",
    "categoryId": "npcs",
    "title": "Gustav Mondschatten",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Gustav Mondschatten ist ein etwa fünfundfünfzigjähriger Mensch mit muskulösem Körperbau, kurzen schwarzen Haaren und grünen Augen. In seiner schweren Rüstung wirkt er wie ein erfahrener Kämpfer, der mehr Schlachten gesehen hat, als er erzählen möchte. Als Söldner im Dienst von Anastasias Adelsfamilie begleitet er Elvira und Clara Frostfeuer und sorgt mit wachsamen Blicken und ruhiger Entschlossenheit für ihre Sicherheit. Seine Präsenz ist ernst, verlässlich und einschüchternd – ein Mann, der nicht viele Worte braucht, um deutlich zu machen, dass er seine Schutzbefohlenen mit aller Härte verteidigen würde.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615234772",
    "categoryId": "npcs",
    "title": "Baron Daniel Drescher",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Baron Daniel Drescher, auch bekannt als der Ährenbaron, ist ein etwa dreißigjähriger Mensch von großer, robuster Statur, mit sonnengebräunter Haut, kurzen dunkelbraunen Haaren, Dreitagebart und blauen Augen. Sein sehr kräftiger Körperbau lässt erkennen, dass er nicht nur vom Schreibtisch aus über sein Land herrscht, sondern selbst mit anpacken kann. Am Arm trägt er ein blaues Stück Stoff mit gelben Ähren darauf – ein Zeichen seiner Stellung als Landherr und Baron. Daniel wirkt bodenständig, direkt und durchsetzungsstark, doch seine Art kann schnell körperlich werden: Wenn Worte nicht reichen, wird der Ährenbaron gerne „handgreiflich“.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615395255",
    "categoryId": "npcs",
    "title": "Baronin Doris Drescher",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Baronin Doris Drescher ist eine etwa sechsundzwanzigjährige Menschin mit leichtem Teint, grünen Augen und braunem, gewelltem Haar, das sie unter einem blauen Kopftuch mit gelbem Ährenmuster trägt. Ihre Erscheinung ist weich und ländlich geprägt, mit weiblicher Figur und einer ruhigen, bodenständigen Ausstrahlung. An ihrer Seite merkt man schnell, dass sie nicht aus steifen Adelssälen stammt, sondern die Sprache und Denkweise des einfachen Volkes bewahrt hat. Statt gehobener Floskeln benutzt Doris einen bäuerlichen, direkten Ausdruck, spricht ehrlich heraus und wirkt dadurch oft deutlich nahbarer als viele andere Adlige.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615467999",
    "categoryId": "npcs",
    "title": "Denise Drescher",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Denise Drescher ist ein etwa sechsjähriges Menschenmädchen und die Zwillingsschwester von David. Mit ihren braunen, schulterlangen Haaren, der auffälligen Heterochromie und dem Kopftuch im Stil ihrer Mutter Doris wirkt sie zugleich neugierig und bodenständig. Ihre einfache Stoffkleidung passt gut zu ihrer ländlichen Herkunft und lässt sie eher wie ein Kind vom Hof als wie eine typische Adelstochter erscheinen. Als Tochter der Familie Drescher beobachtet sie ihre Umgebung aufmerksam und ist dabei besonders geschickt mit der linken Hand – eine Eigenheit, die ihr im Alltag immer wieder auffällt und sie von anderen Kindern unterscheidet.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615486277",
    "categoryId": "npcs",
    "title": "David Drescher",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "David Drescher ist ein etwa sechsjähriger Menschenjunge und der Zwillingsbruder von Denise. Mit seiner kurzen, strubbeligen Frisur, der auffälligen Heterochromie und dem blauen Stoffstück mit gelben Ähren am Arm wirkt er wie ein kleiner Erbe des Hauses Drescher. Trotz seiner jungen Jahre trägt er das Familienzeichen mit sichtbarem Stolz, auch wenn seine Kleidung und sein Auftreten noch kindlich und ungestüm bleiben. Im Gegensatz zu seiner linkshändigen Schwester ist David Rechtshänder, was die beiden Zwillinge auf spielerische Weise voneinander unterscheidet.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615566002",
    "categoryId": "npcs",
    "title": "Melvin Mehl",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Melvin Mehl ist ein etwa fünfundvierzigjähriger Mensch von kleiner, kompakter und sehr kräftiger Statur. Seine sonnengebräunte Haut, die kurzen schwarzen Haare, blauen Augen und die einfache Stoffkleidung verleihen ihm ein bodenständiges, arbeitsames Auftreten. Als Müller trägt er fast immer seine typische Müllersmütze und wirkt, als sei er direkt aus der staubigen Mühle getreten. Feiner Mehlstaub haftet ständig an Kleidung, Haut und Haaren, sodass er bei jeder Bewegung leicht vor sich hin staubt. Dazu kommt sein häufiges Husten, das ihn wie ein lebendes Zeichen dafür wirken lässt, wie viel Arbeit und Mehl durch seine Hände gehen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615629995",
    "categoryId": "npcs",
    "title": "Karl Kupfer",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Karl Kupfer ist ein etwa achtundzwanzigjähriger Mensch von kräftiger, robuster Statur und normaler Größe, mit heller Haut, braunen Augen und blondem Haar, das er zu einem Pferdeschwanz gebunden trägt. In Schmiedeschürze, dicken Handschuhen und mit stoppeligem Bart wirkt er wie ein zuverlässiger Geselle, der harte Arbeit am Amboss gewohnt ist. Sein Auftreten ist bodenständig und handfest, doch seine Stimme überrascht viele: Trotz seiner kräftigen Erscheinung spricht Karl auffallend hoch, was besonders bei ernsten Worten oder lauten Schmiede-Anweisungen schnell unerwartet komisch wirken kann.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615769625",
    "categoryId": "npcs",
    "title": "Kerstin Kupfer",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Kerstin Kupfer ist eine etwa dreißigjährige Menschin, etwas kleiner als Karl, aber kräftig gebaut und voller bodenständiger Energie. Mit ihren langen braunen Locken, braunen Augen und ärmellosen Oberteilen wirkt sie praktisch veranlagt und jederzeit bereit, mit anzupacken. Als Hausfrau ist sie fast immer ein wenig schmutzig oder staubig, als käme sie gerade aus Küche, Hof oder Werkstatt. Ihre liebenswerteste Eigenart ist, dass sie stets irgendwo Snacks bei sich trägt und diese großzügig verteilt – kaum jemand verlässt Kerstins Nähe hungrig.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615821806",
    "categoryId": "npcs",
    "title": "Findus Fichte",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Findus Fichte ist ein etwa fünfzigjähriger Dragonborn mit robustem, für seine Art durchschnittlichem Körperbau, grünen Schuppen und gelben Augen. In einfacher Stoffkleidung wirkt er bodenständig und handwerklich geprägt, ganz wie ein Meister Schreiner, der mehr Zeit zwischen Holzspänen, Werkzeugen und Werkbänken verbringt als in feinen Hallen. An seiner rechten Hand fehlen Ringfinger und kleiner Finger, was ihn jedoch kaum bei seiner Arbeit zu behindern scheint. Meist hat Findus eine Pfeife im Maul, deren Rauch seine raue Kettenraucher-Stimme noch kratziger wirken lässt – ein unverkennbares Merkmal, das man hört, lange bevor man ihn sieht.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615870933",
    "categoryId": "npcs",
    "title": "Roland Rinde",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Roland Rinde ist ein etwa sechzigjähriger Dragonborn mit robustem, für seine Art durchschnittlichem Körperbau, braunen Schuppen und grünen Augen. In einfacher Stoffkleidung und mit Brille wirkt er wie ein bodenständiger Bauer, der sein Leben lang mit Erde, Wetter und Ernte vertraut war. Sein Eichengehstock begleitet ihn überallhin und unterstreicht seine ruhige, wettergegerbte Ausstrahlung. Da Roland schwerhörig ist, versteht er Gespräche oft falsch oder reagiert verspätet – was ihn jedoch nicht davon abhält, unbeirrt seine Meinung kundzutun.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778615919898",
    "categoryId": "npcs",
    "title": "Sir Arthur Anmut",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Sir Arthur Anmut ist ein etwa sechsundzwanzigjähriger Mensch mit kurzen blonden Haaren, blauen Augen und einem heldenhaften Körperbau, der in seiner Rüstung besonders eindrucksvoll wirkt. Als drittgeborener Sohn trägt er den Rittertitel mit großem Stolz, auch wenn sein leicht dümmlicher Blick verrät, dass er nicht immer der schärfste Verstand im Raum ist. Dafür besitzt Arthur ein unerschütterliches Vertrauen in Ehre, Anstand und rechtschaffenes Handeln. Seine auffälligste Macke ist, dass er ständig von Tugenden spricht – Mut, Demut, Treue und Gerechtigkeit bringt er in fast jedes Gespräch ein, ob es gerade passt oder nicht.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778616011309",
    "categoryId": "npcs",
    "title": "Normen Nüster",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Normen Nüster ist ein etwa sechzehnjähriger Mensch mit kurzen schwarzen Haaren, blauen Augen und schmalem Körperbau. Seine riesige Nase ist sein auffälligstes Merkmal und macht ihn im Stall kaum zu übersehen. In einfacher Stoffkleidung arbeitet er als Stalljunge, obwohl ausgerechnet dieser Beruf für ihn eine echte Prüfung ist: Normen leidet unter Allergien gegen Gräser und Pferdehaare. Zwischen Heu, Stroh und Tieren schnäuzt, niest und schnieft er sich daher regelmäßig durch den Arbeitstag – pflichtbewusst, aber sichtbar geplagt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778616028355",
    "categoryId": "npcs",
    "title": "Melodia Cantus",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Campari",
    "body": "Melodia Cantus, die Sturmsängerin, ist eine etwa sechzigjährige Menschin mit weißem Haar, blauen Augen und einem noch immer athletischen, gut trainierten Körperbau. In ihrer asiatisch anmutenden Kleidung und mit einem Odachi – einem übergroßen Katana – an ihrer Seite wirkt sie zugleich würdevoll, fremdländisch und gefährlich elegant. Trotz ihres Alters bewegt sie sich mit der Ruhe und Präzision einer erfahrenen Kämpferin, als hätte jeder Schritt einen eigenen Rhythmus. Ihr Beiname passt zu ihrer auffälligsten Macke: Melodia summt und pfeift beinahe ständig, mal leise und beruhigend, mal wie das ferne Aufziehen eines Sturms.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778616072576",
    "categoryId": "npcs",
    "title": "Felix Fortuna",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Campari",
    "body": "Felix Fortuna ist ein etwa 156-jähriger Elf, der äußerlich wie Mitte zwanzig wirkt, mit athletischem Körperbau, blau-rotem Haar und auffälligen rot-blauen Augen. In seinem Frack im Stil des 17. oder 18. Jahrhunderts und mit einer Mithril-Halskette am Hals tritt er elegant, exzentrisch und leicht unberechenbar auf. Als Zauberer der Wilden Magie und Mitglied der Monsterjägergilde bringt er eine Mischung aus Können, Risiko und schicksalhaftem Glück in jede Begegnung. Wenn Felix nachdenkt, lässt er oft eine Münze geschickt zwischen seinen Fingern wandern – als würde er nicht nur über seine nächsten Worte, sondern über den Ausgang des Schicksals selbst entscheiden.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778616298030",
    "categoryId": "npcs",
    "title": "Zurag ",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Zurag ist ein etwa vierzigjähriger Dragonborn mit braunen Schuppen, gutem Körperbau und einer Brille, die meist konzentriert auf seiner Nase sitzt. In formeller Kleidung und mit einer Platinhalskette wirkt er deutlich gepflegter und kontrollierter, als man es von einem typischen Monsterjäger erwarten würde. Als Mitglied der Monsterjägergilde verlässt er sich nicht nur auf Stärke, sondern vor allem auf Planung, Überblick und präzise Vorbereitung. Seine Aufmerksamkeit gilt fast immer den Karten vor ihm – Routen, Spuren und Geländeformen scheinen ihn mehr zu fesseln als jedes Gespräch. Besonders auffällig ist dabei seine Beidhändigkeit: Zurag schreibt, markiert und korrigiert mit beiden Händen gleichermaßen sicher, ohne je den Blick lange von der Karte zu lösen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778616796140",
    "categoryId": "npcs",
    "title": "Lady Jasmin",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Lady Jasmin ist eine etwa fünfunddreißigjährige Menschin mit schlanker Figur, breiten Hüften, schönen Kurven und einem hübschen, sorgfältig geschminkten Gesicht. Ihre gefärbten roten Haare, weinroten Lippen und die figurbetonte Robe verleihen ihr eine auffällige, selbstbewusste Eleganz. Meist trägt sie Abendhandschuhe, über denen ein goldener Ring mit rotem Stein prangt, und ein feiner Duft von Vanille und Lavendel begleitet jeden ihrer Auftritte. Als Puffmutter führt sie ihr Haus mit kontrollierter Freundlichkeit, scharfem Blick und einem ausgeprägten Sinn für Ordnung. Besonders bekannt ist sie für ihre Reinlichkeit – bei Lady Jasmin hat alles sauber, gepflegt und vorzeigbar zu sein, ganz gleich ob Zimmer, Kleidung oder Benehmen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778616895434",
    "categoryId": "npcs",
    "title": "Sekiro Tee Mr.T",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Sekiro Tee, besser bekannt als Mr. T, ist ein etwa vierzigjähriger Dragonborn mit schwarzen Schuppen, großer Statur und eindrucksvoller Plattenrüstung. Mit seinem Streitkolben an der Seite und dem Piercing am Ohr wirkt er wie jemand, der schon durch bloße Anwesenheit für Ordnung sorgt. Als Bouncer versteht er es, Ärger früh zu erkennen und notfalls sehr deutlich zu beenden. Er ist der Zwilling von Walter und teilt mit ihm eine gewisse markante Präsenz, auch wenn Sekiro deutlich einschüchternder auftritt. Beim Reden hält er sich oft ein Ohr zu – eine seltsame Angewohnheit, die seine ohnehin ernste Art noch unverwechselbarer macht.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778616953295",
    "categoryId": "npcs",
    "title": "Walter White Mr. W",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Walter White, besser bekannt als Mr. W, ist ein etwa vierzigjähriger Dragonborn mit weißen Schuppen, großer Statur und schwerer Plattenrüstung. Mit seinem Streitkolben an der Seite, dem Piercing am Ohr und seiner ruhigen, einschüchternden Präsenz wirkt er wie ein lebender Türrahmen, an dem Ärger besser nicht vorbeikommt. Als Bouncer sorgt er zuverlässig für Ordnung und ist der Zwillingsbruder von Sekiro Tee, auch wenn seine hellen Schuppen einen deutlichen Kontrast zu dessen schwarzer Erscheinung bilden. Beim Reden hält Walter sich häufig ein Ohr zu – eine merkwürdige Angewohnheit, die ihn ebenso unverkennbar macht wie seinen Bruder.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617033137",
    "categoryId": "npcs",
    "title": "Danny Delirium",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Danny Delirium, besser bekannt als Ms. D, ist eine etwa fünfzig Zwergenjahre alte Zwergin, die äußerlich wie eine junge Erwachsene wirkt. Mit ihren langen, welligen schwarzen Haaren, grünen Augen und der bleichen Haut fällt sie hinter der Theke sofort auf. In ihrer Thekenkleidung bewegt sie sich routiniert zwischen Krügen, Flaschen und Gästen, immer bereit, Bestellungen aufzunehmen oder Kommentare einzuwerfen. Ihre größte Macke ist ihr loses Mundwerk: Danny kann einfach nicht die Klappe halten und füllt jedes Gespräch mit Sprüchen, Geschichten, Nachfragen oder ungefragten Bemerkungen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617093204",
    "categoryId": "npcs",
    "title": "Reinhard Rotbart",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Reinhard Rotbart ist ein etwa fünfundfünfzigjähriger Mensch von normaler Größe, aber kräftigem, gut gebautem Körper. Seine roten Haare, der dichte rote Vollbart und die Augenklappe verleihen ihm eine raue, kampferprobte Ausstrahlung, während seine braunen Augen wachsam und streng wirken. Als Gildenmeister strahlt er Autorität, Erfahrung und eine gewisse altgediente Härte aus. Besonders bekannt ist Reinhard dafür, ständig über „die Jugend von heute“ zu meckern – ob über mangelnde Disziplin, schlechte Haltung oder zu wenig Respekt vor alten Gildenregeln.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617179082",
    "categoryId": "npcs",
    "title": "Sabine Sonnenschein",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Sabine Sonnenschein ist eine etwa zweiundzwanzigjährige Menschin von kleiner, zierlicher Statur, mit kastanienbraunem Haar, das sie meist zu einem zerzausten Dutt gebunden trägt. Ihre Brille, die blauen Augen und die Sommersprossen verleihen ihr ein freundliches, etwas unsicheres Auftreten. Als Empfangsdame bemüht sie sich, höflich, aufmerksam und hilfsbereit zu sein, wirkt im ersten Kontakt jedoch oft nervös und leicht zittrig. Sie braucht eine Weile, um mit neuen Leuten warm zu werden – doch sobald sie Vertrauen gefasst hat, zeigt sich hinter ihrer Unsicherheit ein warmherziger und zuverlässiger Mensch.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617225652",
    "categoryId": "npcs",
    "title": "Basti Besser",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Basti Besser ist ein etwa fünfundzwanzigjähriger Mensch und Kämpfer mit gut gebautem, muskulösem Körper und normaler Größe. Seine blonden Haare, der blonde Vollbart, die Brille und seine blau-grauen Augen verleihen ihm eine auffällige Mischung aus Gelehrten- und Gladiatorenausstrahlung. Als C-Rang-Abenteurer und Gladiator tritt er selbstbewusst auf und ist überzeugt, für jede Situation die richtige Antwort zu haben. Leider zeigt sich diese Überzeugung oft als pure Arroganz: Basti weiß grundsätzlich alles besser, korrigiert andere ungefragt und lässt kaum eine Gelegenheit aus, seine vermeintliche Überlegenheit zu betonen.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617309494",
    "categoryId": "npcs",
    "title": "Loreana Leikeim",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Loreana Leikeim ist eine etwa fünfunddreißigjährige Menschin von normalem Körperbau und durchschnittlicher Figur, mit schulterlangem blondem Haar, grünem Blick und einem schmalen Gesicht. Das Muttermal an ihrem Hals ist eines ihrer auffälligeren Merkmale und verleiht ihr einen gewissen Wiedererkennungswert. Als Thekenmädchen und Besitzerin wirkt sie erfahren, geschäftstüchtig und stets beschäftigt, auch wenn sie viele Arbeiten lieber geschickt an andere weiterreicht. Ihre größte Macke ist, dass sie immer „einen Dummen“ sucht, dem sie unangenehme oder lästige Aufgaben aufdrücken kann – natürlich mit einem freundlichen Lächeln und der Ausrede, dass es „nur ganz kurz“ dauere.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617387196",
    "categoryId": "npcs",
    "title": "Lisa Leikeim",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Lisa Leikeim ist eine etwa fünfundzwanzigjährige Menschin von normalem Körperbau und durchschnittlicher Figur, mit langem blondem Haar, das sie meist zu einem Pferdeschwanz gebunden trägt. Ihr schmales Gesicht, die blauen Augen und der kräftige rote Lippenstift verleihen ihr eine auffällige, gepflegte Erscheinung. Als Kellnerin arbeitet sie freundlich, aufmerksam und bemüht sich stets, es allen recht zu machen. Genau darin liegt jedoch ihre größte Schwäche: Lisa kann kaum Nein sagen und übernimmt deshalb ständig zusätzliche Aufgaben, Gefallen oder Extrawünsche, selbst wenn sie längst keine Zeit mehr dafür hat.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617603141",
    "categoryId": "npcs",
    "title": "Sahra Sattel",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Sahra Sattel ist eine etwa achtzehnjährige Menschin und Schurkin, die in einfacher Stallkleidung arbeitet und meist einen Schal sowie ein Kopftuch trägt, unter dem seitlich ein blonder Zopf hervorschaut. Auffällig sind die schuppenartigen Spuren, die von ihrem Hals ausgehen und die sie oft zu verbergen versucht. Als Stall-Mädchen wirkt sie ruhig, vorsichtig und sehr zurückhaltend, immer darauf bedacht, nicht zu viel Aufmerksamkeit auf sich zu ziehen. Bei plötzlichen Bewegungen zuckt sie sofort zusammen und kratzt sich nervös am Hals. Nur wenige wissen, dass Sahra einst versklavt war und ihre Freiheit erst mühsam zurückerlangen musste.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617703047",
    "categoryId": "npcs",
    "title": "Anton Astra",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Anton Astra ist ein etwa achtunddreißigjähriger Mensch und Besitzer der Taverne „Am Kiez“. Mit kurzen blonden Haaren, deutlichen Augenringen, großer und nicht gerade schmaler Statur wirkt er wie jemand, der schon viele lange Nächte hinter sich hat. Sein auffälligstes Merkmal ist die Stoffmaske, die einen Teil seines Gesichts verbirgt und seine Stimme dumpf und schwer verständlich macht. Als Drogen-Barkeeper kennt Anton die Schattenseiten des Nachtlebens ebenso gut wie die Wünsche seiner Gäste. Beim Sprechen nuschelt er stark, sodass man oft zweimal nachfragen muss – was seine ohnehin zwielichtige Ausstrahlung nur noch verstärkt.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617763856",
    "categoryId": "npcs",
    "title": "Ashley Astra",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Ashley Astra war eine etwa sechzehnjährige Halb-Elfin mit langen schwarzen Haaren, dunklen Augenringen und schwarz geschminkten Lippen, die in auffälliger Thekenkleidung in der Taverne „Am Kiez“ bediente. Trotz ihres jungen Alters wirkte sie meist abgeklärt, müde und vollkommen gelangweilt, als könne sie weder Gäste noch Gerüchte noch das Treiben der Taverne wirklich beeindrucken. Ihre teilnahmslose Art machte sie schnell unverwechselbar: Bestellungen nahm sie mit ausdruckslosem Blick entgegen, Kommentare quittierte sie höchstens mit einem Seufzen. Leider ist Ashley inzwischen bei einem Schleim-\"Unfall\" verstorben, wodurch ihr Platz hinter der Theke auf tragische Weise leer geblieben ist.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617835199",
    "categoryId": "npcs",
    "title": "Raul Estatos",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Raul Estatos ist ein etwa fünfzigjähriger Dragonborn mit blauen Schuppen, der in einem roten, dicken Wollgewand, blauer Hose und einer Kapitänsmütze sofort wie ein Mann der See auffällt. Als adliger Seemann und Händler verbindet er vornehmes Auftreten mit der rauen Erfahrung langer Reisen über gefährliche Gewässer. Er spricht gerne in Andeutungen, Seemannsbildern und alten Weisheiten.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778617915190",
    "categoryId": "npcs",
    "title": "Lina Linse",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "Lina Linse ist eine etwa zweiundzwanzigjährige Dragonborn mit weißen Schuppen, großer Statur und einer Brille, die ihr einen wachen, prüfenden Blick verleiht. In ihrem Laborkittel steht sie hinter dem Tresen ihres Lädchens „Linas Hexenkessel“, wo sie Alchemiezutaten mit großer Sorgfalt verkauft und jedes Fläschchen, Kraut und Pulver genau an seinem Platz hält. Ihre Arbeitsweise ist beinahe klinisch sauber: Alles muss steril, beschriftet und ordentlich gelagert sein. Selbst beim Verkauf wirkt Lina eher wie eine Laborleiterin als wie eine gewöhnliche Händlerin – freundlich, aber immer mit einem kritischen Auge auf Hygiene und Reinheit.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  },
  {
    "id": "entry-1778618084321",
    "categoryId": "npcs",
    "title": "August ",
    "summary": "",
    "tags": [
      "NPCs"
    ],
    "region": "Solengrund",
    "body": "August ist ein etwa sechzigjähriger Mensch von normaler Größe und korpulenter Statur, mit weißen Haaren, Vollbart und einem leicht angegelbten Schnauzer, der von seiner Pfeife zeugt. Als Besitzer des Gemischtwarenladens „August Allerlei“ verkauft er alles, was man im Alltag irgendwie brauchen könnte – und vermutlich auch einiges, von dem man erst nach dem Kauf erfährt, wofür es gut ist. Mit seiner Pfeife im Mund und einem gemütlichen Auftreten wirkt er wie ein alter Ladenhüter, der jedes Regal und jede Kuriosität persönlich kennt. Seine unverkennbare Macke ist sein tiefes, wiederkehrendes „Hohohohoho“, mit dem er Kunden begrüßt, Preise kommentiert oder eigene kleine Witze begleitet.",
    "session": "",
    "status": "",
    "lastUpdated": "2026-05-12",
    "visible": true,
    "isNew": true,
    "cityId": "",
    "factionId": "",
    "relatedIds": []
  }
];
