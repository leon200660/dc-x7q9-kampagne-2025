// data.js – generiert mit dem DnD Welt-Glossar Editor
// Kopiere diese Datei zurück in dein Projekt.

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
    "id": "monsters",
    "name": "Bekannte Monster",
    "icon": "🐉"
  }
];

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
    "body": "Rasse: Mensch ca. um die 30 Jahre\nAussehen: Gut gebaut, muskulös, Narbe im Gesicht, blondes Haar, Grüne Augen, Müdes Gesicht --> Selbstsichere Aura, Rüstung\nBeruf: Herzog von Kap Krako",
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
    "id": "phenomena-fluesternder-nebel",
    "categoryId": "phenomena",
    "title": "Flüsternder Nebel",
    "tags": [
      "Gefahr",
      "Illusion"
    ],
    "summary": "Dichter Nebel, in dem man Stimmen hört, die nicht da sind.",
    "body": "Der flüsternde Nebel erscheint meist in der Nähe alter Schlachtfelder\noder stark belasteter Orte.\n\nEffekte:\n- Erschwert Orientierung.\n- Flüstert in den Stimmen längst Verstorbener oder vertrauter Personen.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "history-fall-von-schwarzstein",
    "categoryId": "history",
    "title": "Der Fall von Schwarzstein",
    "tags": [
      "Krieg",
      "Ruine Schwarzsteinfestung"
    ],
    "summary": "Blutige Belagerung, bei der die Schwarzsteinfestung fiel.",
    "body": "Vor mehreren Jahrzehnten wurde die Schwarzsteinfestung von einer\nÜbermacht belagert. Die genauen Gründe sind umstritten.\n\nBekannt:\n- Der Kommandant ergab sich nicht und soll in der Kapelle gefallen sein.\n- Viele Leichen wurden nie gefunden.",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "ruin-schwarzsteinfestung"
    ]
  },
  {
    "id": "tutorial-inspiration",
    "categoryId": "tutorials",
    "title": "Hausregel: Inspiration verteilen",
    "tags": [
      "Hausregel",
      "Inspiration"
    ],
    "summary": "Wie Inspiration am Tisch vergeben wird.",
    "body": "Inspiration wird vergeben, wenn:\n- ein Spieler besonders gutes Rollenspiel zeigt,\n- ein kreativer Lösungsansatz die Gruppe überrascht,\n- ein Nachteil freiwillig angenommen wird, um die Geschichte zu stärken.\n\nRegel:\n- Inspiration kann nur einmal gleichzeitig gehalten werden.\n- Inspiration verleiht Vorteil auf einen Wurf nach Wahl.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "tutorial-ruhephasen",
    "categoryId": "tutorials",
    "title": "Hausregel: Ruhephasen",
    "tags": [
      "Hausregel",
      "Ruhe",
      "Erholung"
    ],
    "summary": "Angepasste Regeln für kurze und lange Rast.",
    "body": "Kurze Rast:\n- 30 Minuten, statt 1 Stunde.\n- Regeneration über Trefferwürfel wie im Grundregelwerk.\n\nLange Rast:\n- 8 Stunden durchgehende Ruhe.\n- Nur halbe Trefferpunkte-Regeneration bei unsicheren Schlafplätzen.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "patch-2025-11-01-hausregeln",
    "categoryId": "patch-notes",
    "title": "Patch 2025-11-01 – Hausregeln aktualisiert",
    "tags": [
      "System",
      "Hausregel"
    ],
    "summary": "Anpassung der Ruhe- und Inspirationsregeln.",
    "body": "Änderungen:\n- Inspiration klarer definiert (siehe Tutorial \"Inspiration\").\n- Ruhephasen überarbeitet, um Spannung bei Reisen zu erhöhen.",
    "lastUpdated": "2025-11-01",
    "relatedIds": [
      "tutorial-inspiration",
      "tutorial-ruhephasen"
    ]
  },
  {
    "id": "patch-2025-11-15-weltupdate",
    "categoryId": "patch-notes",
    "title": "Patch 2025-11-15 – Weltupdate",
    "tags": [
      "Welt",
      "Lore"
    ],
    "summary": "Neue Orte und Phänomene hinzugefügt.",
    "body": "Änderungen:\n- Hafenstadt Grauwasser und Lichtfels detailliert beschrieben.\n- Neue Phänomene: Blutroter Mond & Flüsternder Nebel.\n- Schwarzsteinfestung als Ruinenort aufgenommen.",
    "lastUpdated": "2025-11-15",
    "relatedIds": [
      "city-hafenstadt-grauwasser",
      "city-lichtfels",
      "phenomena-blutroter-mond",
      "phenomena-fluesternder-nebel"
    ]
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
    "id": "monster-schattenwolf",
    "categoryId": "monsters",
    "title": "Riesiger Schattenwolf",
    "tags": [
      "Wald",
      "Gefährlich",
      "Bossgegner"
    ],
    "summary": "Ein monströser Wolf, der sich im Schatten aufzulösen scheint.",
    "body": "Dieser Wolf ist deutlich größer als ein normales Tier und wirkt eher wie\nein lebendiger Schatten.\n\nMögliche Werte (je nach System):\n- Hohe Beweglichkeit und Tarnung im Dunkeln.\n- Angriff: Schattenbiss, der Lebensenergie entzieht.\n- Fähigkeit: Kurzzeitiges Unsichtbarwerden im Schatten.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "monster-sumpfhydra",
    "categoryId": "monsters",
    "title": "Sumpfhydra",
    "tags": [
      "Sumpf",
      "Mehrköpfig",
      "Sehr gefährlich"
    ],
    "summary": "Mehrköpfiges Monster, das in tiefen Sümpfen lauert.",
    "body": "Die Sumpfhydra ist ein massiges, schlangenartiges Wesen mit mehreren Köpfen,\ndas in trüben Gewässern lauert.\n\nEigenschaften:\n- Mehrere Angriffe pro Runde.\n- Köpfekönnen nachwachsen, wenn sie nicht verbrannt werden.",
    "lastUpdated": "2025-12-01"
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
    "body": "Rasse: Dragonborn , Alt\nAussehen: Rotschuppig, weiße Kopfschuppen und Hörner, Monokel, sehr gut gekleidet, sehr stolzer Gang, Roboterartige Umgangsweiße, Spricht nur wenn Gefragt und nur das Nötigste, Eloquent, Gehstock, Pfeife\nBeruf: Graf",
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
    "body": "Rasse: Jung ca. 20 Jahre, Dragonborn\nAussehen: weinrot schuppig, zierlich, sehr Stolz, seriös, professionell aber tollpatschig, geschminkt, gute Kleidung",
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
    "body": "Rasse: Mensch ca. 16 Jahre\nAussehen: Feuerrotes Haar, Klein, sehr laute schrille Stimme, sehr guter Schauspieler\nBeruf: Stadtschreier",
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
    "body": "Rasse: Mensch ca. 17 Jahre\nAussehen: Mauerblümchen Energie, Dunkelbraune Haare, zerzaust, leise Stimme, zierlich, Brille, seriös",
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
    "body": "Rasse: Mensch ca. 50 Jahre\nAussehen: Glatze, kein Bart, Köpergröße Groß, falten, nachdenklich, offen, ordentlich, schöne Handschrift, weise, gute Kleidung, sehr verziert, tätowierte Kopf",
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
    "body": "Rasse: Mensch ca. 30 Jahre\nAussehen: Glatze, Bart blond, Körpergröße normal groß , tätowierte Stirn, Lehrling",
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
    "body": "Rasse: Mensch Mittleren Alters\nAussehen: Bleiche Haut, dunkle Haare, Zipfelmütze(Hängt oft im Gesicht)",
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
    "body": "Rasse: Mensch jung ca. Mitte 20\nAussehen: zierlich, hübsch, clever, Platinblondes weißes Haar, Rote Augen, Stolz, Arrogant, weniger sozial, spitze Nase",
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
    "body": "Rasse: Mensch jung ca. Mitte 20\nAussehen: zierlich, hübsch, clever, Platinblondes weißes Haar, Rote Augen, Stolz, Arrogant, weniger sozial, spitze Nase",
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
    "body": "Rasse: Mensch ca. Mitte 20\nAussehen: Augenringe, dunkle Haare, Pickel, stoppeln, schwach, gelangweilt, apathisch",
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
    "body": "Rasse: Mensch ca. Mitte 40\nAussehen: Geizig, schmal, gut gekleidet, Körpergröße: Groß, Schwarze Perücke, stark parfümiert",
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
    "body": "Rasse: Mensch , ca. Mitte 30\nAussehen: Kurzes dunkles haar, nach hinten gekämmt, Geheimrats ecken, kein Bart, uniform von Campari, ehemalige Soldat, gesendet von Caldera",
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
    "body": "Rasse: Mensch, ca. 18 Jahre\nAussehen: lockiges blondes Haar, braune Augen, Brille, Arbeitskleidung vom Museum --> Rock, Bluse, eifrig, motiviert",
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
    "body": "Rasse: Mensch ca. 70 Jahre\nAussehen: weißes Haar, langsamer Gang, Gehilfe, freundlich, geschichtsinteressiert",
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
    "body": "Rasse: Mensch ca. 40 Jahre\nAussehen: schwarze Seitenscheitel, markanter Oberlippenbart, sehr enthusiastisch, rollt das R, kann nicht malen, benutzt immer den Rechten arm zum Zeigen, freundlich, zuvorkommend, höflich, verheiratet mit einem männlichen Dragonborn",
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
    "tags": [],
    "region": "Narvik",
    "body": "Rasse: Mensch ca. 30 Jahre\nAussehen: Bierbauch, Vollbart, gesprächig, Tiefe Geheimratsecken, normale Bürgerkleidung",
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
    "body": "Rasse: Mensch ca. 30 Jahre\nAussehen: tiefer Ausschnitt, rauchige stimme, breit gebaut, schwarzes lockiges Haar, Muttermal unter der Lippe",
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
  }
];
