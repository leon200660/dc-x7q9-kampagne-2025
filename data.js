// Kategorien für dein Glossar.
// Du kannst diese Liste anpassen, um sie an deine Welt anzupassen.
// Wichtig: Die `id`-Werte werden in den Einträgen bei `categoryId` verwendet.

window.categories = [
  {
    id: "cities",
    name: "Städte & wichtige Orte",
    icon: "🌆",
  },
  {
    id: "npcs",
    name: "NPCs",
    icon: "🧙",
  },
  {
    id: "factions",
    name: "Fraktionen",
    icon: "🛡️",
  },
  {
    id: "phenomena",
    name: "Phänomene",
    icon: "✨",
  },
  {
    id: "history",
    name: "Historische Ereignisse",
    icon: "📜",
  },
  {
    id: "items",
    name: "Relevante Items",
    icon: "🎁",
  },
  {
    id: "tutorials",
    name: "Tutorials zu Systemen",
    icon: "📘",
  },
  {
    id: "patch-notes",
    name: "Patch Notes",
    icon: "🛠️",
  },
  {
    id: "recaps",
    name: "Recaps",
    icon: "📖",
  },
  {
    id: "hero-powers",
    name: "Zauber & Fähigkeiten der Helden (Homebrew)",
    icon: "🔥",
  },
  {
    id: "quests-success",
    name: "Erfolgreiche Quests",
    icon: "🏆",
  },
  {
    id: "quests-failed",
    name: "Gescheiterte Quests",
    icon: "💀",
  },
  {
    id: "monsters",
    name: "Bekannte Monster",
    icon: "🐉",
  },
];

// Beispiel-Einträge.
// Füge einfach nach diesem Schema neue Objekte in das Array ein.

window.entries = [
  // --- Städte & Orte ---
  {
    id: "city-hafenstadt-grauwasser",
    categoryId: "cities",
    title: "Hafenstadt Grauwasser",
    tags: ["Küste", "Handel", "Schmuggel"],
    region: "Südliche Küste",
    summary: "Raue Hafenstadt und Drehkreuz für legalen und illegalen Handel.",
    body: `Grauwasser ist eine geschäftige Hafenstadt, in der der Geruch von Salz, Teer und
billigem Bier permanent in der Luft liegt. Händler, Abenteurer, Söldner und
Schmuggler teilen sich täglich die Hafenpromenade.

Stimmung:
- Laut, chaotisch, aber nie wirklich still.
- Viele Tavernen, in denen Gerüchte schneller fließen als der Wein.
- Die Stadtwache ist unterbesetzt und anfällig für Bestechung.

Wichtige Punkte:
- Die Docks im Osten: offizieller Handel.
- Die "Nebeldocks": inoffizielle Anlegestellen für Schmuggler.
- Marktplatz: Knotenpunkt für Gerüchte aller Art.`,
    session: "Sitzung 1",
    status: "besucht",
    lastUpdated: "2025-12-01",
    relatedIds: ["faction-stadtwache-grauwasser", "faction-diebesgilde-grauwasser"],
  },
  {
    id: "city-lichtfels",
    categoryId: "cities",
    title: "Lichtfels",
    region: "Nordreich",
    tags: ["Hauptstadt", "Adelshof", "Magierakademie"],
    summary: "Strahlende Hauptstadt des Nordreichs, Sitz von Adel und Magierakademie.",
    body: `Lichtfels liegt auf einer natürlichen Felsformation und scheint in der Abendsonne
tatsächlich zu leuchten. Breite Straßen, marmorne Plätze und reich geschmückte
Häuser prägen das Stadtbild.

Besonderheiten:
- Sitz des Hochadels und des Königshofes.
- Berühmte Magierakademie auf dem oberen Plateau.
- Strenge Stadtwache, die vor allem Ordnung im Zentrum hält.`,
    session: "Sitzung 4",
    status: "erwähnt",
    lastUpdated: "2025-12-01",
    relatedIds: ["faction-magusakademie-lichtfels"],
  },
  {
    id: "city-marktfleck-thal",
    categoryId: "cities",
    title: "Marktfleck Thal",
    region: "Hügelland",
    tags: ["Dorf", "Handel", "Reisende"],
    summary: "Kleines Handelsdorf an einer wichtigen Straßenkreuzung.",
    body: `Thal ist weniger eine Stadt als ein stets überfüllter Marktplatz mit Häusern
darum herum. Karawanen aus allen Himmelsrichtungen machen hier Halt.

Besonderheiten:
- Bester Ort, um Gerüchte von Reisenden aufzuschnappen.
- Regelmäßige Probleme mit Räuberbanden in den umliegenden Hügeln.`,
    session: "Sitzung 2",
    status: "besucht",
    lastUpdated: "2025-12-01",
  },
  {
    id: "ruin-schwarzsteinfestung",
    categoryId: "cities",
    title: "Ruine der Schwarzsteinfestung",
    region: "Altes Grenzland",
    tags: ["Ruine", "Gefährlich", "Untote"],
    summary: "Einst mächtige Grenzfestung, heute verfluchte Ruine voller Gefahren.",
    body: `Die Schwarzsteinfestung thront wie eine gebrochene Krone auf einem schwarzen
Felsrücken. Die Mauern sind halb eingestürzt, doch immer noch beeindruckend.

Gerüchte:
- In den Kellern wandeln die Geister des alten Garnisonskommandanten.
- Ein dunkles Artefakt soll in der alten Kapelle verborgen sein.`,
    session: "Sitzung 5",
    status: "unerforscht",
    lastUpdated: "2025-12-01",
    relatedIds: ["history-fall-von-schwarzstein"],
  },

  // --- Fraktionen ---
  {
    id: "faction-stadtwache-grauwasser",
    categoryId: "factions",
    title: "Stadtwache von Grauwasser",
    tags: ["Ordnung", "Stadt"],
    summary: "Unterbesetzte, teilweise korrupte Stadtwache der Hafenstadt Grauwasser.",
    body: `Die Stadtwache von Grauwasser ist offiziell für Ordnung in den Straßen
zuständig. Inoffiziell ist sie chronisch unterbesetzt, schlecht bezahlt und
anfällig für Bestechung.

Bekannt:
- Einzelne ehrliche Offiziere kämpfen gegen die Korruption.
- Die Wache ist mit der Diebesgilde in einem ständigen Katz-und-Maus-Spiel.`,
    lastUpdated: "2025-12-01",
  },
  {
    id: "faction-diebesgilde-grauwasser",
    categoryId: "factions",
    title: "Diebesgilde von Grauwasser",
    tags: ["Unterwelt", "Schmuggel"],
    summary: "Organisierte Bande, die Schmuggel und Diebstahl in Grauwasser kontrolliert.",
    body: `Die Diebesgilde agiert aus dem Schatten heraus. Sie organisiert Schmuggelrouten,
heuert Taschendiebe an und besitzt informelle Kontrolle über die Nebeldocks.

Gerüchte:
- Aldor Schattenhand soll einer ihrer Kontaktleute sein.
- Die Gilde hat Abkommen mit einzelnen Offizieren der Stadtwache.`,
    lastUpdated: "2025-12-01",
  },
  {
    id: "faction-magusakademie-lichtfels",
    categoryId: "factions",
    title: "Magusakademie von Lichtfels",
    tags: ["Magie", "Wissen"],
    summary: "Eine der angesehensten Magierakademien des Kontinents.",
    body: `Die Akademie bildet Magier, Forscher und Berater für den Hof aus.
Ihr Ruf ist makellos, auch wenn interne Machtspiele immer wieder aufflammen.

Bekannt:
- Strenge Aufnahmeprüfungen.
- Große Bibliothek mit verbotenen Flügeln.`,
    lastUpdated: "2025-12-01",
  },

  // --- NPCs ---
  {
    id: "npc-aldor-schattenhand",
    categoryId: "npcs",
    title: "Aldor Schattenhand",
    tags: ["Diebesgilde", "Grauwasser", "Informant"],
    summary: "Zwielichtiger Informant mit Verbindungen in die Unterwelt.",
    body: `Aldor ist ein schmaler Mann mittleren Alters mit schnellen Augen und einem scheinbar
ewigen Grinsen, das nie ganz vertrauenswürdig wirkt.

Er verkauft Informationen an den Höchstbietenden – behauptet aber, eine gewisse
Schwäche für Heldentaten zu haben. Ob das stimmt oder nur eine seiner vielen
Rollen ist, bleibt fraglich.

Bekannt:
- Hat Kontakte in mehreren Fraktionen der Stadt.
- Weiß über geheime Schmuggelrouten rund um Grauwasser Bescheid.
- Scheint mehr über die Vergangenheit der Helden zu wissen als er zugibt.`,
    session: "Sitzung 3",
    status: "offen",
    lastUpdated: "2025-12-01",
    cityId: "city-hafenstadt-grauwasser",
    factionId: "faction-diebesgilde-grauwasser",
  },
  {
    id: "npc-hauptmann-elrik-dorn",
    categoryId: "npcs",
    title: "Hauptmann Elrik Dorn",
    tags: ["Stadtwache", "Grauwasser", "Autorität"],
    summary: "Strenger, aber gerechter Kommandant eines Wachbezirks.",
    body: `Elrik Dorn ist ein breitschultriger Mann mit grauen Schläfen und müdem Blick.
Er kennt Grauwasser wie seine Westentasche und weiß, dass man nicht jeden
Kampf gewinnen kann.

Bekannt:
- Versucht, Korruption in seiner Einheit gering zu halten.
- Misstraut der Diebesgilde, respektiert aber Kompetenz – auch bei Kriminellen.
- Hat den Helden widerwillig einen inoffiziellen Auftrag erteilt.`,
    session: "Sitzung 2",
    status: "verbündet",
    lastUpdated: "2025-12-01",
    cityId: "city-hafenstadt-grauwasser",
    factionId: "faction-stadtwache-grauwasser",
  },
  {
    id: "npc-wirtin-mara-kupferkrug",
    categoryId: "npcs",
    title: "Mara Kupferkrug",
    tags: ["Taverne", "Grauwasser", "Kontakt"],
    summary: "Herzliche Wirtin der Taverne „Zum Kupferkrug“.",
    body: `Mara ist eine kräftige Frau mit lauter Stimme und herzlichem Lachen. Ihre Taverne
gilt als sicherer Hafen für Reisende – solange man den Ärger draußen lässt.

Bekannt:
- Hört viele Gerüchte und teilt sie mit denen, die sie respektvoll behandeln.
- Kennt Aldor und Elrik, hält sich aber aus deren Spielchen heraus.`,
    session: "Sitzung 1",
    status: "verbündet",
    lastUpdated: "2025-12-01",
    cityId: "city-hafenstadt-grauwasser",
    relatedIds: ["city-hafenstadt-grauwasser"],
  },
  {
    id: "npc-gelehrter-lorwyn",
    categoryId: "npcs",
    title: "Gelehrter Lorwyn",
    tags: ["Magier", "Lichtfels", "Wissen"],
    summary: "Exzentrischer Gelehrter der Magusakademie.",
    body: `Lorwyn ist ein zerstreuter Magier mittleren Alters mit schief sitzender Brille
und unzähligen Notizzetteln in seinen Roben.

Bekannt:
- Spezialisiert auf alte Ruinen und magische Phänomene.
- Zeigte besonderes Interesse an der Schwarzsteinfestung.`,
    session: "Sitzung 4",
    status: "Kontakt",
    lastUpdated: "2025-12-01",
    cityId: "city-lichtfels",
    factionId: "faction-magusakademie-lichtfels",
    relatedIds: ["ruin-schwarzsteinfestung"],
  },
  {
    id: "npc-priesterin-selene",
    categoryId: "npcs",
    title: "Priesterin Selene",
    tags: ["Tempel", "Lichtfels", "Heilung"],
    summary: "Junge Priesterin, die den Helden mehrfach geholfen hat.",
    body: `Selene dient in einem der großen Tempel von Lichtfels. Ihre ruhige Art und ihre
aufrichtige Freundlichkeit machen sie zu einer vertrauenswürdigen Verbündeten.

Bekannt:
- Hat den Helden nach einem missglückten Auftrag geheime Heilung gewährt.
- Steht in einem stillen Konflikt mit Teilen der Tempelhierarchie.`,
    session: "Sitzung 4",
    status: "verbündet",
    lastUpdated: "2025-12-01",
    cityId: "city-lichtfels",
  },
  {
    id: "npc-haendler-bronn",
    categoryId: "npcs",
    title: "Händler Bronn Eisenhandel",
    tags: ["Händler", "Thal", "Karawanen"],
    summary: "Pragmatischer Händler, der Karawanen durch das Hügelland führt.",
    body: `Bronn ist ein stämmiger Zwerg mit großem Schnurrbart und rauer Stimme.
Er lebt von Handel, Absprachen – und einem guten Gespür für Gefahr.

Bekannt:
- Hat die Helden angeheuert, um seine Karawane zu schützen.
- Kennt Abkürzungen und gefährliche Pfade durch das Hügelland.`,
    session: "Sitzung 2",
    status: "verbündet",
    lastUpdated: "2025-12-01",
    cityId: "city-marktfleck-thal",
  },

  // --- Phänomene ---
  {
    id: "phenomena-blutroter-mond",
    categoryId: "phenomena",
    title: "Der blutrote Mond",
    tags: ["Omen", "Magie"],
    summary: "Seltener Himmelskörper, der Unglück oder Wandel ankündigt.",
    body: `Wenn der Mond sich tiefrot färbt, berichten Seher und Priester von Unheil
oder großem Wandel. In den letzten Jahren trat das Phänomen ungewöhnlich oft auf.

Beobachtungen:
- Magie wirkt in dieser Nacht unberechenbar.
- Manche Tiere verhalten sich aggressiver als gewöhnlich.`,
    lastUpdated: "2025-12-01",
  },
  {
    id: "phenomena-fluesternder-nebel",
    categoryId: "phenomena",
    title: "Flüsternder Nebel",
    tags: ["Gefahr", "Illusion"],
    summary: "Dichter Nebel, in dem man Stimmen hört, die nicht da sind.",
    body: `Der flüsternde Nebel erscheint meist in der Nähe alter Schlachtfelder
oder stark belasteter Orte.

Effekte:
- Erschwert Orientierung.
- Flüstert in den Stimmen längst Verstorbener oder vertrauter Personen.`,
    lastUpdated: "2025-12-01",
  },

  // --- Historische Ereignisse ---
  {
    id: "history-fall-von-schwarzstein",
    categoryId: "history",
    title: "Der Fall von Schwarzstein",
    tags: ["Krieg", "Ruine Schwarzsteinfestung"],
    summary: "Blutige Belagerung, bei der die Schwarzsteinfestung fiel.",
    body: `Vor mehreren Jahrzehnten wurde die Schwarzsteinfestung von einer
Übermacht belagert. Die genauen Gründe sind umstritten.

Bekannt:
- Der Kommandant ergab sich nicht und soll in der Kapelle gefallen sein.
- Viele Leichen wurden nie gefunden.`,
    lastUpdated: "2025-12-01",
    relatedIds: ["ruin-schwarzsteinfestung"],
  },
  {
    id: "history-gruendung-lichtfels",
    categoryId: "history",
    title: "Gründung von Lichtfels",
    tags: ["Stadtgründung", "Nordreich"],
    summary: "Die Entstehung der Hauptstadt Lichtfels.",
    body: `Lichtfels wurde an einem strategisch günstigen Punkt gegründet, wo mehrere
Handelsrouten zusammenlaufen.

Überlieferung:
- Ein magisches Licht soll den ersten Siedlern den Platz gewiesen haben.
- Die Magusakademie entstand Jahrzehnte später.`,
    lastUpdated: "2025-12-01",
    relatedIds: ["city-lichtfels"],
  },

  // --- Items ---
  {
    id: "item-mondklingen-dolch",
    categoryId: "items",
    title: "Mondklingendolch",
    tags: ["Magischer Gegenstand", "Waffe"],
    summary: "Ein Dolch, dessen Klinge im Mondlicht blass glüht.",
    body: `Die Mondklinge ist ein feiner Dolch, der im Mondlicht zu leuchten scheint.

Effektvorschlag:
- +1 auf Angriffe bei Nacht.
- Einmal pro langer Rast kannst du eine kleine Illusion von Mondlicht erzeugen.`,
    lastUpdated: "2025-12-01",
  },
  {
    id: "item-reisetasche-der-zehn",
    categoryId: "items",
    title: "Reisetasche der Zehn",
    tags: ["Magischer Gegenstand", "Stauraum"],
    summary: "Kleine Tasche, die unverhältnismäßig viel Ausrüstung fasst.",
    body: `Von außen eine unscheinbare Ledertasche, innen jedoch deutlich größer.

Effektvorschlag:
- Kann das Zehnfache ihres sichtbaren Volumens aufnehmen.
- Überladen führt zu chaotischen Auswürfen beim Öffnen.`,
    lastUpdated: "2025-12-01",
  },

  // --- Tutorials ---
  {
    id: "tutorial-inspiration",
    categoryId: "tutorials",
    title: "Hausregel: Inspiration verteilen",
    tags: ["Hausregel", "Inspiration"],
    summary: "Wie Inspiration am Tisch vergeben wird.",
    body: `Inspiration wird vergeben, wenn:
- ein Spieler besonders gutes Rollenspiel zeigt,
- ein kreativer Lösungsansatz die Gruppe überrascht,
- ein Nachteil freiwillig angenommen wird, um die Geschichte zu stärken.

Regel:
- Inspiration kann nur einmal gleichzeitig gehalten werden.
- Inspiration verleiht Vorteil auf einen Wurf nach Wahl.`,
    lastUpdated: "2025-12-01",
  },
  {
    id: "tutorial-ruhephasen",
    categoryId: "tutorials",
    title: "Hausregel: Ruhephasen",
    tags: ["Hausregel", "Ruhe", "Erholung"],
    summary: "Angepasste Regeln für kurze und lange Rast.",
    body: `Kurze Rast:
- 30 Minuten, statt 1 Stunde.
- Regeneration über Trefferwürfel wie im Grundregelwerk.

Lange Rast:
- 8 Stunden durchgehende Ruhe.
- Nur halbe Trefferpunkte-Regeneration bei unsicheren Schlafplätzen.`,
    lastUpdated: "2025-12-01",
  },

  // --- Patch Notes ---
  {
    id: "patch-2025-11-01-hausregeln",
    categoryId: "patch-notes",
    title: "Patch 2025-11-01 – Hausregeln aktualisiert",
    tags: ["System", "Hausregel"],
    summary: "Anpassung der Ruhe- und Inspirationsregeln.",
    body: `Änderungen:
- Inspiration klarer definiert (siehe Tutorial "Inspiration").
- Ruhephasen überarbeitet, um Spannung bei Reisen zu erhöhen.`,
    lastUpdated: "2025-11-01",
    relatedIds: ["tutorial-inspiration", "tutorial-ruhephasen"],
  },
  {
    id: "patch-2025-11-15-weltupdate",
    categoryId: "patch-notes",
    title: "Patch 2025-11-15 – Weltupdate",
    tags: ["Welt", "Lore"],
    summary: "Neue Orte und Phänomene hinzugefügt.",
    body: `Änderungen:
- Hafenstadt Grauwasser und Lichtfels detailliert beschrieben.
- Neue Phänomene: Blutroter Mond & Flüsternder Nebel.
- Schwarzsteinfestung als Ruinenort aufgenommen.`,
    lastUpdated: "2025-11-15",
    relatedIds: [
      "city-hafenstadt-grauwasser",
      "city-lichtfels",
      "phenomena-blutroter-mond",
      "phenomena-fluesternder-nebel",
    ],
  },

  // --- Recaps ---
  {
    id: "recap-sitzung-1",
    categoryId: "recaps",
    title: "Recap – Sitzung 1: Ankunft in Grauwasser",
    tags: ["Grauwasser", "Start"],
    summary: "Die Helden treffen in der Hafenstadt ein und lernen Mara kennen.",
    body: `Ereignisse:
- Ankunft der Gruppe in Grauwasser.
- Erste Begegnung mit Mara Kupferkrug in der Taverne.
- Gerüchte über Schmuggel an den Nebeldocks.`,
    session: "Sitzung 1",
    lastUpdated: "2025-12-01",
    relatedIds: ["city-hafenstadt-grauwasser", "npc-wirtin-mara-kupferkrug"],
  },
  {
    id: "recap-sitzung-2",
    categoryId: "recaps",
    title: "Recap – Sitzung 2: Karawane nach Thal",
    tags: ["Thal", "Karawane"],
    summary: "Eskorte einer Karawane nach Marktfleck Thal.",
    body: `Ereignisse:
- Auftrag durch Händler Bronn Eisenhandel.
- Überfall durch Räuber im Hügelland.
- Ankunft in Marktfleck Thal und neue Gerüchte.`,
    session: "Sitzung 2",
    lastUpdated: "2025-12-01",
    relatedIds: ["city-marktfleck-thal", "npc-haendler-bronn"],
  },

  // --- Quests erfolgreich ---
  {
    id: "quest-success-docks-befreit",
    categoryId: "quests-success",
    title: "Quest: Befreiung der Nebeldocks",
    tags: ["Grauwasser", "Kampf", "Erfolg"],
    summary: "Die Helden säubern die Nebeldocks von einer Räuberbande.",
    body: `Die Nebeldocks wurden von einer Bande Erpresser kontrolliert, die Schutzgeld
von Händlern verlangten. Nach einem taktischen Vorgehen konnte die Gruppe
die Bande zerschlagen.

Folgen:
- Mehr Vertrauen bei ehrlichen Händlern.
- Die Diebesgilde ist über den Eingriff wenig begeistert.`,
    session: "Sitzung 3",
    status: "abgeschlossen",
    lastUpdated: "2025-12-01",
    relatedIds: [
      "city-hafenstadt-grauwasser",
      "npc-aldor-schattenhand",
      "npc-hauptmann-elrik-dorn",
    ],
  },
  {
    id: "quest-success-karawane-beschuetzt",
    categoryId: "quests-success",
    title: "Quest: Schutz der Karawane",
    tags: ["Thal", "Eskorte", "Erfolg"],
    summary: "Die Helden begleiten Bronn sicher nach Thal.",
    body: `Eine Handelskarawane, angeführt von Bronn Eisenhandel, musste durch
räuberisches Gebiet geführt werden. Trotz eines Angriffs erreichte die
Karawane sicher Marktfleck Thal.

Belohnung:
- Gold und zukünftige Preisnachlässe bei Bronn.
- Guter Ruf bei reisenden Händlern.`,
    session: "Sitzung 2",
    status: "abgeschlossen",
    lastUpdated: "2025-12-01",
    relatedIds: ["npc-haendler-bronn", "city-marktfleck-thal"],
  },

  // --- Quests gescheitert ---
  {
    id: "quest-failed-verlorener-bote",
    categoryId: "quests-failed",
    title: "Quest: Der verlorene Bote",
    tags: ["Fehlschlag", "Lichtfels"],
    summary: "Eine wichtige Nachricht erreichte ihr Ziel zu spät.",
    body: `Ein Bote mit wichtigen Dokumenten Richtung Lichtfels gilt als verschollen.
Die Helden versuchten, ihn zu finden, kamen jedoch zu spät.

Folgen:
- Politische Spannungen am Hof von Lichtfels nahmen zu.
- Das Vertrauen eines Auftraggebers ist erschüttert.`,
    session: "Sitzung 4",
    status: "gescheitert",
    lastUpdated: "2025-12-01",
    relatedIds: ["city-lichtfels"],
  },
  {
    id: "quest-failed-ritual-im-sumpf",
    categoryId: "quests-failed",
    title: "Quest: Das Ritual im Sumpf",
    tags: ["Fehlschlag", "Ritual"],
    summary: "Ein dunkles Ritual konnte nicht vollständig verhindert werden.",
    body: `Die Gruppe fand einen Kult, der ein beschwörendes Ritual in einem Sumpf
durchführte. Zwar wurden die meisten Kultisten besiegt, doch das Ritual
war bereits zu weit fortgeschritten.

Folgen:
- Eine unbekannte Entität ist nun geschwächt in der Welt präsent.
- Das Phänomen des flüsternden Nebels tritt häufiger auf.`,
    session: "Sitzung 5",
    status: "teilweise gescheitert",
    lastUpdated: "2025-12-01",
    relatedIds: ["phenomena-fluesternder-nebel"],
  },

  // --- Monster ---
  {
    id: "monster-schattenwolf",
    categoryId: "monsters",
    title: "Riesiger Schattenwolf",
    tags: ["Wald", "Gefährlich", "Bossgegner"],
    summary: "Ein monströser Wolf, der sich im Schatten aufzulösen scheint.",
    body: `Dieser Wolf ist deutlich größer als ein normales Tier und wirkt eher wie
ein lebendiger Schatten.

Mögliche Werte (je nach System):
- Hohe Beweglichkeit und Tarnung im Dunkeln.
- Angriff: Schattenbiss, der Lebensenergie entzieht.
- Fähigkeit: Kurzzeitiges Unsichtbarwerden im Schatten.`,
    lastUpdated: "2025-12-01",
  },
  {
    id: "monster-sumpfhydra",
    categoryId: "monsters",
    title: "Sumpfhydra",
    tags: ["Sumpf", "Mehrköpfig", "Sehr gefährlich"],
    summary: "Mehrköpfiges Monster, das in tiefen Sümpfen lauert.",
    body: `Die Sumpfhydra ist ein massiges, schlangenartiges Wesen mit mehreren Köpfen,
das in trüben Gewässern lauert.

Eigenschaften:
- Mehrere Angriffe pro Runde.
- Köpfekönnen nachwachsen, wenn sie nicht verbrannt werden.`,
    lastUpdated: "2025-12-01",
  },

  // --- Heldenkräfte / Homebrew ---
  {
    id: "hero-power-flammenkette",
    categoryId: "hero-powers",
    title: "Flammenkette",
    tags: ["Zauber", "Schaden", "Feuer"],
    summary: "Feuerzauber, der von einem Ziel zum nächsten springt.",
    body: `Wirkungsvorschlag:
- Wähle ein Ziel in Reichweite, wirke Feuerschaden.
- Der Zauber springt bis zu zweimal auf nahe Ziele über (mit reduziertem Schaden).
- Gut geeignet gegen eng stehende Gegnergruppen.`,
    lastUpdated: "2025-12-01",
  },
  {
    id: "hero-power-schattentritt",
    categoryId: "hero-powers",
    title: "Schattentritt",
    tags: ["Bewegung", "Teleportation"],
    summary: "Kurze Teleportation zwischen zwei Schatten.",
    body: `Wirkungsvorschlag:
- Der Held kann sich zwischen zwei Schatten in kurzer Distanz bewegen.
- Zählt als Bonusaktion, solange beide Schatten sichtbar sind.
- Ermöglicht kreative Positionswechsel im Kampf.`,
    lastUpdated: "2025-12-01",
  },
];

/*
So fügst du neue Einträge hinzu:

1. Wähle eine passende Kategorie aus `window.categories` und nutze deren `id` als `categoryId`.
2. Hänge ein neues Objekt an das `window.entries`-Array an, z.B.:

{
  id: "monster-riesiger-wolf",
  categoryId: "monsters",
  title: "Riesiger Schattenwolf",
  tags: ["Wald", "Gefährlich", "Bossgegner"],
  summary: "Ein monströser Wolf, der sich laut Legende in Schatten auflöst.",
  body: `Längere Beschreibung des Monsters...

- Angriff 1
- Angriff 2
- Besonderheiten`,
  session: "Sitzung 4",
  status: "besiegt",
  lastUpdated: "2025-12-01",
  cityId: "city-hafenstadt-grauwasser",   // optional: Verknüpfung zu einem Ort
  factionId: "faction-diebesgilde-grauwasser", // optional: Verknüpfung zu Fraktion
  relatedIds: ["npc-aldor-schattenhand"], // optional: weitere Verknüpfungen
}

Achte darauf, dass:
- `id` eindeutig ist (am besten alles klein, mit Bindestrichen).
- `categoryId` genau zu einer Kategorie aus `window.categories` passt.
- `tags`, `session`, `status`, `cityId`, `factionId`, `relatedIds` und `lastUpdated`
  optional sind, aber beim Sortieren/Filtern und bei Querverweisen helfen.
*/
