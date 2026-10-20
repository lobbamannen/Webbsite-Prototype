/* Gemini Argon finding-to-builder taxonomy. This file maps research findings, it does not itself implement the assigned builder families. */
(function(w){
'use strict';
var target=w.NEXUS_IDEA_TARGETS=w.NEXUS_IDEA_TARGETS||{};
Object.assign(target,{
  "Gemini Argon::UX-001": {
    "targetFamily": "launcher",
    "change": "Startsidesrutnät med sex adaptiva snabbval",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-002": {
    "targetFamily": "labels",
    "change": "Sektionsrubrik med diskret objekträknare och Se alla-länk",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-003": {
    "targetFamily": "continue",
    "change": "Horisontell fortsättningskarusell med läs-/visningsprogress",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-008",
      "DeepSeek::UX-065",
      "Grok::UX-009",
      "Kimi::FYND-23",
      "Vibe::UX-002",
      "Perplexity::UX-027"
    ]
  },
  "Gemini Argon::UX-004": {
    "targetFamily": "surface",
    "change": "Mörkt temas djup via tonala ytor i stället för skuggor",
    "rule": true,
    "overlapWith": [
      "Kimi::FYND-01",
      "Perplexity::UX-090"
    ]
  },
  "Gemini Argon::UX-005": {
    "targetFamily": "nav",
    "change": "Aktiv vy markeras med dämpad accentlinje och bakgrund",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-006",
      "DeepSeek::UX-073",
      "Kimi::FYND-15"
    ]
  },
  "Gemini Argon::UX-006": {
    "targetFamily": "search",
    "change": "Global sökkapsel öppnar kommandopalett för vyer och objekt",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-039",
      "Meta AI::UX-071"
    ]
  },
  "Gemini Argon::UX-007": {
    "targetFamily": "systemStatus",
    "change": "Kompakt kort för lokal status, synk och pluginhälsa",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-008": {
    "targetFamily": "discovery",
    "change": "Slumpmässig återupptäckt ur media- och dossierbiblioteket",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-009": {
    "targetFamily": "stats",
    "change": "Sektions- eller navigationsräknare i små statistikpiller",
    "rule": false,
    "overlapWith": [
      "Vibe::UX-006"
    ]
  },
  "Gemini Argon::UX-010": {
    "targetFamily": "labels",
    "change": "Lokalt sparade, fällbara startsidessektioner",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-011": {
    "targetFamily": "activity",
    "change": "Kompakt aktivitets-/notistidslinje med relativa tider",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-032",
      "Vibe::UX-007"
    ]
  },
  "Gemini Argon::UX-012": {
    "targetFamily": "inbox",
    "change": "Olästmarkör på inkorgsobjekt och navigation",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-013": {
    "targetFamily": "hero",
    "change": "Tidsanpassad, diskret välkomsthälsning",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-014": {
    "targetFamily": "quick",
    "change": "Flytande snabbmeny för skapa-/insamlingståtgärder",
    "rule": false,
    "overlapWith": [
      "Grok::UX-001"
    ]
  },
  "Gemini Argon::UX-015": {
    "targetFamily": "storageUsage",
    "change": "Fördelningsstapel för media-, dokument- och övrig lagring",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-016": {
    "targetFamily": "mediaLayout",
    "change": "Mobilgrid med tre 2:3-affischkolumner",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-001",
      "Grok::UX-002"
    ]
  },
  "Gemini Argon::UX-017": {
    "targetFamily": "mediaCard",
    "change": "Kompakta statusmärken på affischens hörn",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-002",
      "DeepSeek::UX-008",
      "Grok::UX-002",
      "Vibe::UX-001"
    ]
  },
  "Gemini Argon::UX-018": {
    "targetFamily": "mediaDetail",
    "change": "Detaljvy med posterbaserad, tonad hero-bakgrund",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-019": {
    "targetFamily": "mediaDetail",
    "change": "Enradig metadata med skiljepunkter under titeln",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-020": {
    "targetFamily": "mediaDetail",
    "change": "Tillgänglighetsbrickor grupperade som stream/hyr/köp",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-070"
    ]
  },
  "Gemini Argon::UX-021": {
    "targetFamily": "season",
    "change": "Segmenterat säsongsval med horisontella alternativ",
    "rule": false,
    "overlapWith": [
      "Kimi::FYND-70"
    ]
  },
  "Gemini Argon::UX-022": {
    "targetFamily": "season",
    "change": "Avsnittslista med individuella sedda-checkboxar",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-023": {
    "targetFamily": "mediaDetail",
    "change": "Stortrycks betygsväljare och favoritval",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-010",
      "Vibe::UX-011"
    ]
  },
  "Gemini Argon::UX-024": {
    "targetFamily": "filter",
    "change": "Klickbara genretaggar som öppnar filtrerat bibliotek",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-003",
      "DeepSeek::UX-030",
      "Grok::UX-008",
      "Meta AI::UX-034"
    ]
  },
  "Gemini Argon::UX-025": {
    "targetFamily": "filter",
    "change": "Fast bottenkontroll för sortering och filter",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-004"
    ]
  },
  "Gemini Argon::UX-026": {
    "targetFamily": "mediaDetail",
    "change": "Låg skådespelarkarusell med cirkulära porträtt",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-027": {
    "targetFamily": "filter",
    "change": "Segmenterad film/serie-växling i biblioteket",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-028": {
    "targetFamily": "activity",
    "change": "Visningshistorik grupperad per månad",
    "rule": false,
    "overlapWith": [
      "Vibe::UX-007"
    ]
  },
  "Gemini Argon::UX-029": {
    "targetFamily": "mediaDetail",
    "change": "Visningsformat som Bio/Fysisk media/Streaming-taggar",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-030": {
    "targetFamily": "filter",
    "change": "Snabbfilter för osedda eller sparade favoriter",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-031": {
    "targetFamily": "storyCard",
    "change": "Redaktionell ingress med lästid och ämnesmärke",
    "rule": false,
    "overlapWith": [
      "Vibe::UX-057"
    ]
  },
  "Gemini Argon::UX-032": {
    "targetFamily": "readerTools",
    "change": "Flytande Aa-panel för typografi och läsinställningar",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-024",
      "Grok::UX-005",
      "Kimi::FYND-53"
    ]
  },
  "Gemini Argon::UX-033": {
    "targetFamily": "reader",
    "change": "Tunn läsprogression fäst högst upp",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-020",
      "Kimi::FYND-56",
      "Meta AI::UX-039",
      "Vibe::UX-052"
    ]
  },
  "Gemini Argon::UX-034": {
    "targetFamily": "readerTools",
    "change": "Utfällbar innehållsförteckning som navigerar till kapitel",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-021"
    ]
  },
  "Gemini Argon::UX-035": {
    "targetFamily": "storyCard",
    "change": "Valbara stämnings- och mysteriemärken",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-036": {
    "targetFamily": "type",
    "change": "Läsbredd begränsad till cirka 65–75 tecken",
    "rule": true,
    "overlapWith": [
      "DeepSeek::UX-023",
      "Kimi::FYND-53"
    ]
  },
  "Gemini Argon::UX-037": {
    "targetFamily": "surface",
    "change": "Val mellan OLED-svart och tonad charcoal-bakgrund",
    "rule": true,
    "overlapWith": [
      "DeepSeek::UX-013",
      "Meta AI::UX-035"
    ]
  },
  "Gemini Argon::UX-038": {
    "targetFamily": "readerTools",
    "change": "Markera dossier som läst från artikelns slut",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-039": {
    "targetFamily": "reader",
    "change": "Citat- och källnoter som inbäddade callouts",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-040": {
    "targetFamily": "motion",
    "change": "Dölj läsmenyer vid nedåtscroll och visa vid uppåtscroll",
    "rule": false,
    "overlapWith": [
      "Grok::UX-004"
    ]
  },
  "Gemini Argon::UX-041": {
    "targetFamily": "readerTools",
    "change": "Visa beräknad återstående lästid utifrån position",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-042": {
    "targetFamily": "storyLayout",
    "change": "Dossierkategorier presenterade som visuella mappar",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-043": {
    "targetFamily": "reader",
    "change": "Fotnot öppnar källpopover utan att lämna texten",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-044": {
    "targetFamily": "readerTools",
    "change": "Marginalbokmärke som kan slås av och på",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-045": {
    "targetFamily": "reader",
    "change": "Bildgalleri med förstoring i lightbox",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-046": {
    "targetFamily": "fileLayout",
    "change": "Forskningsdokument i tabell med typ och storlek",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-047": {
    "targetFamily": "fileCard",
    "change": "Filtypikon färgkodad efter format",
    "rule": false,
    "overlapWith": [
      "Kimi::FYND-65"
    ]
  },
  "Gemini Argon::UX-048": {
    "targetFamily": "fileLayout",
    "change": "Brödsmulor med navigerbara nivåer och fällbar rot",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-049": {
    "targetFamily": "search",
    "change": "Sökfält med separat rad filterchips",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-041",
      "Meta AI::UX-029",
      "Perplexity::UX-053",
      "Vibe::UX-043"
    ]
  },
  "Gemini Argon::UX-050": {
    "targetFamily": "fileCard",
    "change": "Metadata-inspektör i expanderbart bottenark",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-038"
    ]
  },
  "Gemini Argon::UX-051": {
    "targetFamily": "fileLayout",
    "change": "Sida-vid-sida dokument och anteckning",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-052": {
    "targetFamily": "knowledge",
    "change": "Ömsesidiga dokumentlänkar i relaterat-avsnitt",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-011",
      "Perplexity::UX-047"
    ]
  },
  "Gemini Argon::UX-053": {
    "targetFamily": "reader",
    "change": "Sökord markeras inline i dokumenttext",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-054": {
    "targetFamily": "inbox",
    "change": "Mobil filuppladdning via drag/drop-zon och filväljare",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-055": {
    "targetFamily": "reader",
    "change": "Markdown-rendering med växling till råtext",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-056": {
    "targetFamily": "reader",
    "change": "Kod- och textblock kan kopieras snabbt",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-057": {
    "targetFamily": "fileCard",
    "change": "Källkort med domän-/filursprungsikon",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-058": {
    "targetFamily": "fileLayout",
    "change": "Svepgest för arkivera eller radera fillistrad",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-059": {
    "targetFamily": "fileLayout",
    "change": "Horisontell PDF-sidminiatyrremsa med scrub-kontroll",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-060": {
    "targetFamily": "knowledge",
    "change": "Hierarkiskt taggmoln i utfällbar sidopanel",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-061": {
    "targetFamily": "fileLayout",
    "change": "Fällbart mappträd med noder",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-062": {
    "targetFamily": "search",
    "change": "Senast öppnade dokument i sökmodalen",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-063": {
    "targetFamily": "fileLayout",
    "change": "Batchläge med checkboxar för masshantering",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-064": {
    "targetFamily": "readerTools",
    "change": "Generera och navigera innehållsförteckning från dokumentrubriker",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-021"
    ]
  },
  "Gemini Argon::UX-065": {
    "targetFamily": "inbox",
    "change": "Indikera offline-/cachetillgänglighet lokalt",
    "rule": false,
    "overlapWith": [
      "Kimi::FYND-76"
    ]
  },
  "Gemini Argon::UX-066": {
    "targetFamily": "nav",
    "change": "Fyra bottenflikar placerade i bekväm tumzon",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-067": {
    "targetFamily": "bottomSheet",
    "change": "Sekundärinformation i interaktivt bottenark i stället för centrerad modal",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-038"
    ]
  },
  "Gemini Argon::UX-068": {
    "targetFamily": "nav",
    "change": "Vald flik får omedelbar haptisk/visuell bekräftelse",
    "rule": false,
    "overlapWith": [
      "DeepSeek::UX-062",
      "Kimi::FYND-15"
    ]
  },
  "Gemini Argon::UX-069": {
    "targetFamily": "nav",
    "change": "Öppna sidodrawer från avatar eller Mer-åtgärd",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-070": {
    "targetFamily": "filter",
    "change": "Sticky underhuvud med synliga filterchips",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-003",
      "Copilot::UX-004"
    ]
  },
  "Gemini Argon::UX-071": {
    "targetFamily": "nav",
    "change": "Tillbaka-knapp visar destinationens namn",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-072": {
    "targetFamily": "accessibility",
    "change": "Minsta 44×44 px tryckyta för interaktiva mål; global regel",
    "rule": true,
    "overlapWith": [
      "DeepSeek::UX-072"
    ]
  },
  "Gemini Argon::UX-073": {
    "targetFamily": "navigationHistory",
    "change": "Återställ scrollposition när användaren återvänder till listan",
    "rule": false,
    "overlapWith": [
      "Perplexity::UX-007"
    ]
  },
  "Gemini Argon::UX-074": {
    "targetFamily": "nav",
    "change": "Kantgest navigerar tillbaka; webbnavigering ska tillåta gesten",
    "rule": true,
    "overlapWith": []
  },
  "Gemini Argon::UX-075": {
    "targetFamily": "search",
    "change": "Sökfält visar rensa-kontroll när frågan inte är tom",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-076": {
    "targetFamily": "quick",
    "change": "Långtryck på objekt öppnar kontextmeny för snabbåtgärder",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-077": {
    "targetFamily": "loadingState",
    "change": "Skelettplatshållare matchar innehållets kort- och radrutnät",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-078": {
    "targetFamily": "storyLayout",
    "change": "Tomt tillstånd med förklaring och direkt utforska-åtgärd",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-018",
      "DeepSeek::UX-058",
      "Vibe::UX-091",
      "Vibe::UX-092"
    ]
  },
  "Gemini Argon::UX-079": {
    "targetFamily": "scrollControls",
    "change": "Flytande tillbaka-till-toppen-kontroll efter djup scroll",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-080": {
    "targetFamily": "refreshControl",
    "change": "Pull-to-refresh på startsida, inkorg och bibliotek",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-081": {
    "targetFamily": "surface",
    "change": "Mörk palett begränsar stark accent till cirka 10 procent",
    "rule": true,
    "overlapWith": [
      "Meta AI::UX-035",
      "DeepSeek::UX-055"
    ]
  },
  "Gemini Argon::UX-082": {
    "targetFamily": "shape",
    "change": "Diskreta 1 px kortkanter förstärks vid hover/fokus",
    "rule": true,
    "overlapWith": []
  },
  "Gemini Argon::UX-083": {
    "targetFamily": "type",
    "change": "Tre nivåer textkontrast för rubrik, sekundärtext och metadata",
    "rule": true,
    "overlapWith": []
  },
  "Gemini Argon::UX-084": {
    "targetFamily": "surface",
    "change": "Global charcoal-bas med subtil lila underton",
    "rule": true,
    "overlapWith": []
  },
  "Gemini Argon::UX-085": {
    "targetFamily": "hero",
    "change": "Dämpad radial accentglöd bakom hero-innehåll",
    "rule": true,
    "overlapWith": []
  },
  "Gemini Argon::UX-086": {
    "targetFamily": "iconography",
    "change": "Konsekvent ikonstorlek, linjetjocklek och hörnform",
    "rule": true,
    "overlapWith": [
      "DeepSeek::UX-081"
    ]
  },
  "Gemini Argon::UX-087": {
    "targetFamily": "feedback",
    "change": "Icke-blockerande toast med bekräftelse och ångra-affordans",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-088": {
    "targetFamily": "shape",
    "change": "Radieskala för små, medelstora och stora ytor",
    "rule": true,
    "overlapWith": []
  },
  "Gemini Argon::UX-089": {
    "targetFamily": "motion",
    "change": "Dämpad pulserande indikator vid synk-/sparaktivitet",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-090": {
    "targetFamily": "surface",
    "change": "Glassmorphism begränsas till flytande lager",
    "rule": true,
    "overlapWith": [
      "Grok::UX-007"
    ]
  },
  "Gemini Argon::UX-091": {
    "targetFamily": "accessibility",
    "change": "Högkontrastläge med tydliga kanter och ljusare text",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-092": {
    "targetFamily": "accessibility",
    "change": "Tangentbordsfokus markeras med synlig lila focus-visible-ring",
    "rule": true,
    "overlapWith": []
  },
  "Gemini Argon::UX-093": {
    "targetFamily": "density",
    "change": "Avstånd följer 8 px grundmodul med 4 px mikrosteg",
    "rule": true,
    "overlapWith": [
      "DeepSeek::UX-078"
    ]
  },
  "Gemini Argon::UX-094": {
    "targetFamily": "quick",
    "change": "Sekundäråtgärder får diskret kontur; primäråtgärd får solid accent",
    "rule": true,
    "overlapWith": [
      "Meta AI::UX-034"
    ]
  },
  "Gemini Argon::UX-095": {
    "targetFamily": "header",
    "change": "Sidrubrik krymper till kompakt sticky header efter scroll",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-096": {
    "targetFamily": "settingsLayout",
    "change": "Inställningar grupperas i inset-kort med ikoner och värden",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-097": {
    "targetFamily": "plugin",
    "change": "Plugin-kort med direkt statusväxel och versionsetikett",
    "rule": false,
    "overlapWith": [
      "Perplexity::UX-073"
    ]
  },
  "Gemini Argon::UX-098": {
    "targetFamily": "systemLog",
    "change": "Monospace-logg med nivåfärger för info, success, warning och error",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-099": {
    "targetFamily": "inbox",
    "change": "Uppladdningsrad med filnamn, progress, storlek och avbryt",
    "rule": false,
    "overlapWith": []
  },
  "Gemini Argon::UX-100": {
    "targetFamily": "dangerZone",
    "change": "Separera irreversibla inställningar och kräv uttrycklig dubbelbekräftelse",
    "rule": false,
    "overlapWith": []
  }
});
})(window);
