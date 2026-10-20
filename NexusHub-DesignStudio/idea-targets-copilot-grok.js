/* Builder target map for Copilot and Grok source findings.
 * 40 records map exact model::id keys to builder families or proposed slots.
 */
(function(){
'use strict';
var incoming={
  "Copilot::UX-001": {
    "targetFamily": "mediaCard",
    "change": "Affisch först, metadata efter",
    "rule": false,
    "overlapWith": [
      "Grok::UX-002"
    ]
  },
  "Copilot::UX-002": {
    "targetFamily": "mediaCard",
    "change": "Statusbadge i övre hörn",
    "rule": false,
    "overlapWith": [
      "Grok::UX-002",
      "Copilot::UX-028"
    ]
  },
  "Copilot::UX-003": {
    "targetFamily": "filter",
    "change": "Synliga filterchips ovanför innehållet",
    "rule": false,
    "overlapWith": [
      "Grok::UX-008"
    ]
  },
  "Copilot::UX-004": {
    "targetFamily": "filter",
    "change": "Klistrig filterrad vid scroll",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-005": {
    "targetFamily": "mediaCard",
    "change": "Tona ned sekundär kortmetadata",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-022",
      "Grok::UX-003"
    ]
  },
  "Copilot::UX-006": {
    "targetFamily": "nav",
    "change": "Accentmarkering för aktiv destination",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-007": {
    "targetFamily": "labels",
    "change": "Större sektionsrubriker",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-008": {
    "targetFamily": "continue",
    "change": "Fortsätt film eller berättelse",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-009": {
    "targetFamily": "knowledge",
    "change": "Panel med relaterade kunskapsnoder",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-010": {
    "targetFamily": "fileLayout",
    "change": "Brödsmulor på djupa arkivnivåer",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-011": {
    "targetFamily": "new:contentGrid",
    "change": "Konsekvent kortgrid mellan bibliotek",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-012": {
    "targetFamily": "fileLayout",
    "change": "Kompakt dokumentlistvy",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-013": {
    "targetFamily": "storyCard",
    "change": "Omslag med kort sammanfattning",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-014": {
    "targetFamily": "mediaCard",
    "change": "Stor klickyta över hela kortet",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-015": {
    "targetFamily": "new:navigationActions",
    "change": "Separera destinationsnav och åtgärder",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-016": {
    "targetFamily": "new:favorites",
    "change": "Globalt sparade favoriter",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-017": {
    "targetFamily": "activity",
    "change": "Senaste händelser som tidslinje",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-018": {
    "targetFamily": "new:emptyState",
    "change": "Tomt resultat med nästa steg",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-019": {
    "targetFamily": "search",
    "change": "Beständig sökingång i bibliotek",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-020": {
    "targetFamily": "reader",
    "change": "Läsyta utan störande sidomeny",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-021": {
    "targetFamily": "readerTools",
    "change": "Kollapsbar innehållsförteckning",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-026"
    ]
  },
  "Copilot::UX-022": {
    "targetFamily": "fileCard",
    "change": "Visa metadata stegvis vid behov",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-005",
      "Grok::UX-003"
    ]
  },
  "Copilot::UX-023": {
    "targetFamily": "fileLayout",
    "change": "Snabbväxla rutnät och lista",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-024": {
    "targetFamily": "density",
    "change": "Prioritera innehåll med spacing",
    "rule": true,
    "overlapWith": []
  },
  "Copilot::UX-025": {
    "targetFamily": "nav",
    "change": "Begränsa primär mobilnavigation till fem mål",
    "rule": true,
    "overlapWith": []
  },
  "Copilot::UX-026": {
    "targetFamily": "nav",
    "change": "Dölj sekundärnavigation bakom kontext",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-021"
    ]
  },
  "Copilot::UX-027": {
    "targetFamily": "launcher",
    "change": "Kategorikort i stället för lång meny",
    "rule": false,
    "overlapWith": []
  },
  "Copilot::UX-028": {
    "targetFamily": "mediaDetail",
    "change": "Informationspanel för status och metadata",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-002",
      "Grok::UX-002"
    ]
  },
  "Copilot::UX-029": {
    "targetFamily": "new:designRules",
    "change": "Begränsa användningen av accentfärger",
    "rule": true,
    "overlapWith": []
  },
  "Copilot::UX-030": {
    "targetFamily": "new:designRules",
    "change": "Dela designsystem mellan bibliotek",
    "rule": true,
    "overlapWith": []
  },
  "Grok::UX-001": {
    "targetFamily": "nav",
    "change": "Central primäråtgärd i bottennavigation",
    "rule": false,
    "overlapWith": []
  },
  "Grok::UX-002": {
    "targetFamily": "mediaCard",
    "change": "Postergrid med status och sparsam metadata",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-001",
      "Copilot::UX-002",
      "Copilot::UX-028"
    ]
  },
  "Grok::UX-003": {
    "targetFamily": "mediaDetail",
    "change": "Immersiv titelbild med sekundär teknisk metadata",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-005",
      "Copilot::UX-022"
    ]
  },
  "Grok::UX-004": {
    "targetFamily": "readerTools",
    "change": "Dölj navigation nedåt, visa uppåt i läsvy",
    "rule": false,
    "overlapWith": []
  },
  "Grok::UX-005": {
    "targetFamily": "readerTools",
    "change": "Teman och typografikontroller i läsvyn",
    "rule": false,
    "overlapWith": []
  },
  "Grok::UX-006": {
    "targetFamily": "header",
    "change": "Flytande toppfält med hem- och söknavigering",
    "rule": false,
    "overlapWith": []
  },
  "Grok::UX-007": {
    "targetFamily": "surface",
    "change": "Frostad glasbehandling på navigation",
    "rule": false,
    "overlapWith": []
  },
  "Grok::UX-008": {
    "targetFamily": "filter",
    "change": "Synliga basfilter med kollapsbara avancerade filter",
    "rule": false,
    "overlapWith": [
      "Copilot::UX-003"
    ]
  },
  "Grok::UX-009": {
    "targetFamily": "mediaCard",
    "change": "Visuell progressindikator på innehållskort",
    "rule": false,
    "overlapWith": []
  },
  "Grok::UX-010": {
    "targetFamily": "new:parallelBrowse",
    "change": "Samtidig visning av aktivt och bläddrat innehåll",
    "rule": false,
    "overlapWith": []
  }
};
window.NEXUS_IDEA_TARGETS=Object.assign(window.NEXUS_IDEA_TARGETS||{},incoming);
})();