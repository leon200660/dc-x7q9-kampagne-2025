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
    "id": "city-hafenstadt-grauwasser",
    "categoryId": "cities",
    "title": "Hafenstadt Grauwasser",
    "tags": [
      "Küste",
      "Handel",
      "Schmuggel"
    ],
    "region": "Südliche Küste",
    "summary": "Raue Hafenstadt und Drehkreuz für legalen und illegalen Handel.",
    "body": "Grauwasser ist eine geschäftige Hafenstadt, in der der Geruch von Salz, Teer und\nbilligem Bier permanent in der Luft liegt. Händler, Abenteurer, Söldner und\nSchmuggler teilen sich täglich die Hafenpromenade.\n\nStimmung:\n- Laut, chaotisch, aber nie wirklich still.\n- Viele Tavernen, in denen Gerüchte schneller fließen als der Wein.\n- Die Stadtwache ist unterbesetzt und anfällig für Bestechung.\n\nWichtige Punkte:\n- Die Docks im Osten: offizieller Handel.\n- Die \"Nebeldocks\": inoffizielle Anlegestellen für Schmuggler.\n- Marktplatz: Knotenpunkt für Gerüchte aller Art.",
    "session": "Sitzung 1",
    "status": "besucht",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "faction-stadtwache-grauwasser",
      "faction-diebesgilde-grauwasser"
    ]
  },
  {
    "id": "city-lichtfels",
    "categoryId": "cities",
    "title": "Lichtfels",
    "region": "Nordreich",
    "tags": [
      "Hauptstadt",
      "Adelshof",
      "Magierakademie"
    ],
    "summary": "Strahlende Hauptstadt des Nordreichs, Sitz von Adel und Magierakademie.",
    "body": "Lichtfels liegt auf einer natürlichen Felsformation und scheint in der Abendsonne\ntatsächlich zu leuchten. Breite Straßen, marmorne Plätze und reich geschmückte\nHäuser prägen das Stadtbild.\n\nBesonderheiten:\n- Sitz des Hochadels und des Königshofes.\n- Berühmte Magierakademie auf dem oberen Plateau.\n- Strenge Stadtwache, die vor allem Ordnung im Zentrum hält.",
    "session": "Sitzung 4",
    "status": "erwähnt",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "faction-magusakademie-lichtfels"
    ]
  },
  {
    "id": "city-marktfleck-thal",
    "categoryId": "cities",
    "title": "Marktfleck Thal",
    "region": "Hügelland",
    "tags": [
      "Dorf",
      "Handel",
      "Reisende"
    ],
    "summary": "Kleines Handelsdorf an einer wichtigen Straßenkreuzung.",
    "body": "Thal ist weniger eine Stadt als ein stets überfüllter Marktplatz mit Häusern\ndarum herum. Karawanen aus allen Himmelsrichtungen machen hier Halt.\n\nBesonderheiten:\n- Bester Ort, um Gerüchte von Reisenden aufzuschnappen.\n- Regelmäßige Probleme mit Räuberbanden in den umliegenden Hügeln.",
    "session": "Sitzung 2",
    "status": "besucht",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "ruin-schwarzsteinfestung",
    "categoryId": "cities",
    "title": "Ruine der Schwarzsteinfestung",
    "region": "Altes Grenzland",
    "tags": [
      "Ruine",
      "Gefährlich",
      "Untote"
    ],
    "summary": "Einst mächtige Grenzfestung, heute verfluchte Ruine voller Gefahren.",
    "body": "Die Schwarzsteinfestung thront wie eine gebrochene Krone auf einem schwarzen\nFelsrücken. Die Mauern sind halb eingestürzt, doch immer noch beeindruckend.\n\nGerüchte:\n- In den Kellern wandeln die Geister des alten Garnisonskommandanten.\n- Ein dunkles Artefakt soll in der alten Kapelle verborgen sein.",
    "session": "Sitzung 5",
    "status": "unerforscht",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "history-fall-von-schwarzstein"
    ]
  },
  {
    "id": "faction-stadtwache-grauwasser",
    "categoryId": "factions",
    "title": "Stadtwache von Grauwasser",
    "tags": [
      "Ordnung",
      "Stadt"
    ],
    "summary": "Unterbesetzte, teilweise korrupte Stadtwache der Hafenstadt Grauwasser.",
    "body": "Die Stadtwache von Grauwasser ist offiziell für Ordnung in den Straßen\nzuständig. Inoffiziell ist sie chronisch unterbesetzt, schlecht bezahlt und\nanfällig für Bestechung.\n\nBekannt:\n- Einzelne ehrliche Offiziere kämpfen gegen die Korruption.\n- Die Wache ist mit der Diebesgilde in einem ständigen Katz-und-Maus-Spiel.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "faction-diebesgilde-grauwasser",
    "categoryId": "factions",
    "title": "Diebesgilde von Grauwasser",
    "tags": [
      "Unterwelt",
      "Schmuggel"
    ],
    "summary": "Organisierte Bande, die Schmuggel und Diebstahl in Grauwasser kontrolliert.",
    "body": "Die Diebesgilde agiert aus dem Schatten heraus. Sie organisiert Schmuggelrouten,\nheuert Taschendiebe an und besitzt informelle Kontrolle über die Nebeldocks.\n\nGerüchte:\n- Aldor Schattenhand soll einer ihrer Kontaktleute sein.\n- Die Gilde hat Abkommen mit einzelnen Offizieren der Stadtwache.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "faction-magusakademie-lichtfels",
    "categoryId": "factions",
    "title": "Magusakademie von Lichtfels",
    "tags": [
      "Magie",
      "Wissen"
    ],
    "summary": "Eine der angesehensten Magierakademien des Kontinents.",
    "body": "Die Akademie bildet Magier, Forscher und Berater für den Hof aus.\nIhr Ruf ist makellos, auch wenn interne Machtspiele immer wieder aufflammen.\n\nBekannt:\n- Strenge Aufnahmeprüfungen.\n- Große Bibliothek mit verbotenen Flügeln.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "npc-aldor-schattenhand",
    "categoryId": "npcs",
    "title": "Aldor Schattenhand",
    "tags": [
      "Diebesgilde",
      "Grauwasser",
      "Informant"
    ],
    "summary": "Zwielichtiger Informant mit Verbindungen in die Unterwelt.",
    "body": "Aldor ist ein schmaler Mann mittleren Alters mit schnellen Augen und einem scheinbar\newigen Grinsen, das nie ganz vertrauenswürdig wirkt.\n\nEr verkauft Informationen an den Höchstbietenden – behauptet aber, eine gewisse\nSchwäche für Heldentaten zu haben. Ob das stimmt oder nur eine seiner vielen\nRollen ist, bleibt fraglich.\n\nBekannt:\n- Hat Kontakte in mehreren Fraktionen der Stadt.\n- Weiß über geheime Schmuggelrouten rund um Grauwasser Bescheid.\n- Scheint mehr über die Vergangenheit der Helden zu wissen als er zugibt.",
    "session": "Sitzung 3",
    "status": "offen",
    "lastUpdated": "2025-12-01",
    "cityId": "city-hafenstadt-grauwasser",
    "factionId": "faction-diebesgilde-grauwasser"
  },
  {
    "id": "npc-hauptmann-elrik-dorn",
    "categoryId": "npcs",
    "title": "Hauptmann Elrik Dorn",
    "tags": [
      "Stadtwache",
      "Grauwasser",
      "Autorität"
    ],
    "summary": "Strenger, aber gerechter Kommandant eines Wachbezirks.",
    "body": "Elrik Dorn ist ein breitschultriger Mann mit grauen Schläfen und müdem Blick.\nEr kennt Grauwasser wie seine Westentasche und weiß, dass man nicht jeden\nKampf gewinnen kann.\n\nBekannt:\n- Versucht, Korruption in seiner Einheit gering zu halten.\n- Misstraut der Diebesgilde, respektiert aber Kompetenz – auch bei Kriminellen.\n- Hat den Helden widerwillig einen inoffiziellen Auftrag erteilt.",
    "session": "Sitzung 2",
    "status": "verbündet",
    "lastUpdated": "2025-12-01",
    "cityId": "city-hafenstadt-grauwasser",
    "factionId": "faction-stadtwache-grauwasser"
  },
  {
    "id": "npc-wirtin-mara-kupferkrug",
    "categoryId": "npcs",
    "title": "Mara Kupferkrug",
    "tags": [
      "Taverne",
      "Grauwasser",
      "Kontakt"
    ],
    "summary": "Herzliche Wirtin der Taverne „Zum Kupferkrug“.",
    "body": "Mara ist eine kräftige Frau mit lauter Stimme und herzlichem Lachen. Ihre Taverne\ngilt als sicherer Hafen für Reisende – solange man den Ärger draußen lässt.\n\nBekannt:\n- Hört viele Gerüchte und teilt sie mit denen, die sie respektvoll behandeln.\n- Kennt Aldor und Elrik, hält sich aber aus deren Spielchen heraus.",
    "session": "Sitzung 1",
    "status": "verbündet",
    "lastUpdated": "2025-12-01",
    "cityId": "city-hafenstadt-grauwasser",
    "relatedIds": [
      "city-hafenstadt-grauwasser"
    ]
  },
  {
    "id": "npc-gelehrter-lorwyn",
    "categoryId": "npcs",
    "title": "Gelehrter Lorwyn",
    "tags": [
      "Magier",
      "Lichtfels",
      "Wissen"
    ],
    "summary": "Exzentrischer Gelehrter der Magusakademie.",
    "body": "Lorwyn ist ein zerstreuter Magier mittleren Alters mit schief sitzender Brille\nund unzähligen Notizzetteln in seinen Roben.\n\nBekannt:\n- Spezialisiert auf alte Ruinen und magische Phänomene.\n- Zeigte besonderes Interesse an der Schwarzsteinfestung.",
    "session": "Sitzung 4",
    "status": "Kontakt",
    "lastUpdated": "2025-12-01",
    "cityId": "city-lichtfels",
    "factionId": "faction-magusakademie-lichtfels",
    "relatedIds": [
      "ruin-schwarzsteinfestung"
    ]
  },
  {
    "id": "npc-priesterin-selene",
    "categoryId": "npcs",
    "title": "Priesterin Selene",
    "tags": [
      "Tempel",
      "Lichtfels",
      "Heilung"
    ],
    "summary": "Junge Priesterin, die den Helden mehrfach geholfen hat.",
    "body": "Selene dient in einem der großen Tempel von Lichtfels. Ihre ruhige Art und ihre\naufrichtige Freundlichkeit machen sie zu einer vertrauenswürdigen Verbündeten.\n\nBekannt:\n- Hat den Helden nach einem missglückten Auftrag geheime Heilung gewährt.\n- Steht in einem stillen Konflikt mit Teilen der Tempelhierarchie.",
    "session": "Sitzung 4",
    "status": "verbündet",
    "lastUpdated": "2025-12-01",
    "cityId": "city-lichtfels"
  },
  {
    "id": "npc-haendler-bronn",
    "categoryId": "npcs",
    "title": "Händler Bronn Eisenhandel",
    "tags": [
      "Händler",
      "Thal",
      "Karawanen"
    ],
    "summary": "Pragmatischer Händler, der Karawanen durch das Hügelland führt.",
    "body": "Bronn ist ein stämmiger Zwerg mit großem Schnurrbart und rauer Stimme.\nEr lebt von Handel, Absprachen – und einem guten Gespür für Gefahr.\n\nBekannt:\n- Hat die Helden angeheuert, um seine Karawane zu schützen.\n- Kennt Abkürzungen und gefährliche Pfade durch das Hügelland.",
    "session": "Sitzung 2",
    "status": "verbündet",
    "lastUpdated": "2025-12-01",
    "cityId": "city-marktfleck-thal"
  },
  {
    "id": "phenomena-blutroter-mond",
    "categoryId": "phenomena",
    "title": "Der blutrote Mond",
    "tags": [
      "Omen",
      "Magie"
    ],
    "summary": "Seltener Himmelskörper, der Unglück oder Wandel ankündigt.",
    "body": "Wenn der Mond sich tiefrot färbt, berichten Seher und Priester von Unheil\noder großem Wandel. In den letzten Jahren trat das Phänomen ungewöhnlich oft auf.\n\nBeobachtungen:\n- Magie wirkt in dieser Nacht unberechenbar.\n- Manche Tiere verhalten sich aggressiver als gewöhnlich.",
    "lastUpdated": "2025-12-01"
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
    "id": "history-gruendung-lichtfels",
    "categoryId": "history",
    "title": "Gründung von Lichtfels",
    "tags": [
      "Stadtgründung",
      "Nordreich"
    ],
    "summary": "Die Entstehung der Hauptstadt Lichtfels.",
    "body": "Lichtfels wurde an einem strategisch günstigen Punkt gegründet, wo mehrere\nHandelsrouten zusammenlaufen.\n\nÜberlieferung:\n- Ein magisches Licht soll den ersten Siedlern den Platz gewiesen haben.\n- Die Magusakademie entstand Jahrzehnte später.",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "city-lichtfels"
    ]
  },
  {
    "id": "item-mondklingen-dolch",
    "categoryId": "items",
    "title": "Mondklingendolch",
    "tags": [
      "Magischer Gegenstand",
      "Waffe"
    ],
    "summary": "Ein Dolch, dessen Klinge im Mondlicht blass glüht.",
    "body": "Die Mondklinge ist ein feiner Dolch, der im Mondlicht zu leuchten scheint.\n\nEffektvorschlag:\n- +1 auf Angriffe bei Nacht.\n- Einmal pro langer Rast kannst du eine kleine Illusion von Mondlicht erzeugen.",
    "lastUpdated": "2025-12-01"
  },
  {
    "id": "item-reisetasche-der-zehn",
    "categoryId": "items",
    "title": "Reisetasche der Zehn",
    "tags": [
      "Magischer Gegenstand",
      "Stauraum"
    ],
    "summary": "Kleine Tasche, die unverhältnismäßig viel Ausrüstung fasst.",
    "body": "Von außen eine unscheinbare Ledertasche, innen jedoch deutlich größer.\n\nEffektvorschlag:\n- Kann das Zehnfache ihres sichtbaren Volumens aufnehmen.\n- Überladen führt zu chaotischen Auswürfen beim Öffnen.",
    "lastUpdated": "2025-12-01"
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
    "title": "Recap – 1. Sitzung vom 01.03.2025",
    "tags": [
      "Grauwasser",
      "Start"
    ],
    "summary": "Die Helden treffen in der Hafenstadt ein und lernen Mara kennen.",
    "body": "Willkommen meine lieben Freunde zur Zusammenfassung der Letzen Geschehnisse natürlich mit mir, den strahlenden Stern jeder Geschichte: Lucius Magnus. Bereit? Dann los:\n\nIch präsentiere euch mein Meisterwerk: \"Vier Narren, ein Wrack und ein Werhai\" \n(Arbeitstitel. Ich bin offen für Vorschläge.)\n\nAlso, stellt euch vor: Ich sitze gemütlich in meiner Dimension, nippe an einem Glas flüssiger Erkenntnis – da stolpern plötzlich vier Fremde auf dem Marktplatz von Kap Krako zusammen. Zufall? Nein, Schicksal mit einem ganz schlechten Orientierungssinn.\n\nEiner von ihnen: Rittersporn, Barde, Träger des Herzens vieler Frauen – und Vaterschaftsklagen. Der Gute hatte einen Auftrag im Gepäck. Nicht seiner, sondern vom Grafen von Krako. Jobbeschreibung: „Bergt eine versiegelte Kiste mit dem Siegel der Imperialen Handelsgesellschaft aus dem Wrack der Sturmkrähe, dem letzten Schiff aus den Kolonien.“ Einfach, oder?\n\nGruppe gebildet, Hände geschüttelt, Gulasch gegessen im Gasthaus **„Abendrot“**, dann ging’s los.\n\nNach ein paar Tagen Wanderidylle und Blasen an den Füßen: Wrack gefunden. Doch anstatt gemütlich zu plündern, springt ihnen ein **Werhai** ins Gesicht. Halb Hai, halb Mensch, ganz schlechte Laune. Nach einem epischen Kampf – _Spoiler: der Hai verlor_ – fanden unsere Helden Hinweise auf ein **Banditenlager**, das das Wrack schon geplündert hatte.\n\nNebenbei entdeckten sie ein altes Segel mit einem mysteriösen Symbol, das bei jedem von ihnen merkwürdige Erinnerungen auslöste. Subtil wie eine Axt im Gesicht.\n\nAlso: Auf zu den Banditen. Und wie? Heimlich? Im Schutze der Dunkelheit? Nope. Die Vier wählten: **Frontalangriff. Am helllichten Tag.** Mutig? Ja. Klug? Debattierbar.\n\nEs wurde blutig, es wurde wild, und unser Barde Rittersporn mutierte zum menschlichen Schildwall. Bolzen, Schwert und ein bisschen Lebensmüdigkeit – und _zack_, Sieg für die Helden.\n\nIm Lager: Versiegelte Kiste gefunden. UND – Tusch bitte – MEIN Ring! Ja, ich, Lucius Magnus, eingebettet in ein Schmuckstück feinster magischer Machart, wartete nur darauf, wieder Teil dieser Welt zu sein. _Ihr Glück._\n\nZurück nach Kap Krako, Kiste abgegeben, Belohnung und folge Auftrag vom Grafen kassiert. Doch anstatt sich auf den Lorbeeren auszuruhen (oder auf Rittersporns Fanpost), gab’s direkt das nächste Level: **Audienz beim Herzog Bartholomeo Drago**, besser bekannt als **\"Der Leviathan von Narvik\"** – düsterer Titel, aber ein Fan von Effizienz.\n\nDer Herzog öffnet die Kiste – und BOOM: **Rotes Erz.** Selten, mächtig, und definitiv kein Küchengewürz. Die Helden kriegen einen Geheimauftrag: Findet heraus, wer sonst in den anderen Herzogtümern davon weiß – **leise, unauffällig, diskret.** Also... das Gegenteil ihres Banditenangriffs.\n\nAls Bonus: **Waffenerwerbserlaubnis für ganz Campari** (endlich legal schwer bewaffnet!) und ein **Bankkonto bei Horizontia Finanz** – mit besserem Kundenservice als bei den Göttern.\n\nUnd wie endet dieses Kapitel?  \nMit Bier, Geschichten und einem neuen Ring (mich!) am **Stammtisch im Gasthaus**. Die Welt kann sich warm anziehen.",
    "session": "Sitzung 1",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "city-hafenstadt-grauwasser",
      "npc-wirtin-mara-kupferkrug"
    ],
    "region": "",
    "status": "",
    "cityId": "",
    "factionId": ""
  },
  {
    "id": "recap-sitzung-2",
    "categoryId": "recaps",
    "title": "Recap – Sitzung 2: Karawane nach Thal",
    "tags": [
      "Thal",
      "Karawane"
    ],
    "summary": "Eskorte einer Karawane nach Marktfleck Thal.",
    "body": "Ereignisse:\n- Auftrag durch Händler Bronn Eisenhandel.\n- Überfall durch Räuber im Hügelland.\n- Ankunft in Marktfleck Thal und neue Gerüchte.",
    "session": "Sitzung 2",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "city-marktfleck-thal",
      "npc-haendler-bronn"
    ]
  },
  {
    "id": "quest-success-docks-befreit",
    "categoryId": "quests-success",
    "title": "Quest: Befreiung der Nebeldocks",
    "tags": [
      "Grauwasser",
      "Kampf",
      "Erfolg"
    ],
    "summary": "Die Helden säubern die Nebeldocks von einer Räuberbande.",
    "body": "Die Nebeldocks wurden von einer Bande Erpresser kontrolliert, die Schutzgeld\nvon Händlern verlangten. Nach einem taktischen Vorgehen konnte die Gruppe\ndie Bande zerschlagen.\n\nFolgen:\n- Mehr Vertrauen bei ehrlichen Händlern.\n- Die Diebesgilde ist über den Eingriff wenig begeistert.",
    "session": "Sitzung 3",
    "status": "abgeschlossen",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "city-hafenstadt-grauwasser",
      "npc-aldor-schattenhand",
      "npc-hauptmann-elrik-dorn"
    ]
  },
  {
    "id": "quest-success-karawane-beschuetzt",
    "categoryId": "quests-success",
    "title": "Quest: Schutz der Karawane",
    "tags": [
      "Thal",
      "Eskorte",
      "Erfolg"
    ],
    "summary": "Die Helden begleiten Bronn sicher nach Thal.",
    "body": "Eine Handelskarawane, angeführt von Bronn Eisenhandel, musste durch\nräuberisches Gebiet geführt werden. Trotz eines Angriffs erreichte die\nKarawane sicher Marktfleck Thal.\n\nBelohnung:\n- Gold und zukünftige Preisnachlässe bei Bronn.\n- Guter Ruf bei reisenden Händlern.",
    "session": "Sitzung 2",
    "status": "abgeschlossen",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "npc-haendler-bronn",
      "city-marktfleck-thal"
    ]
  },
  {
    "id": "quest-failed-verlorener-bote",
    "categoryId": "quests-failed",
    "title": "Quest: Der verlorene Bote",
    "tags": [
      "Fehlschlag",
      "Lichtfels"
    ],
    "summary": "Eine wichtige Nachricht erreichte ihr Ziel zu spät.",
    "body": "Ein Bote mit wichtigen Dokumenten Richtung Lichtfels gilt als verschollen.\nDie Helden versuchten, ihn zu finden, kamen jedoch zu spät.\n\nFolgen:\n- Politische Spannungen am Hof von Lichtfels nahmen zu.\n- Das Vertrauen eines Auftraggebers ist erschüttert.",
    "session": "Sitzung 4",
    "status": "gescheitert",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "city-lichtfels"
    ]
  },
  {
    "id": "quest-failed-ritual-im-sumpf",
    "categoryId": "quests-failed",
    "title": "Quest: Das Ritual im Sumpf",
    "tags": [
      "Fehlschlag",
      "Ritual"
    ],
    "summary": "Ein dunkles Ritual konnte nicht vollständig verhindert werden.",
    "body": "Die Gruppe fand einen Kult, der ein beschwörendes Ritual in einem Sumpf\ndurchführte. Zwar wurden die meisten Kultisten besiegt, doch das Ritual\nwar bereits zu weit fortgeschritten.\n\nFolgen:\n- Eine unbekannte Entität ist nun geschwächt in der Welt präsent.\n- Das Phänomen des flüsternden Nebels tritt häufiger auf.",
    "session": "Sitzung 5",
    "status": "teilweise gescheitert",
    "lastUpdated": "2025-12-01",
    "relatedIds": [
      "phenomena-fluesternder-nebel"
    ]
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
  }
];
