# Designkarta · Nexus Hub

Källreferens: användarens `NexusHub-main-1.zip`, granskad 2026-10-20. **Ändra aldrig produktionen genom att automatiskt kopiera mockupens filer.**

| Mockup-sektion | Produktkällor (referens) |
|---|---|
| Skal, toppfält, sidomeny, bottenmeny | `app/portal.tsx`, `app/globals.css`, `app/hub-design-system.css`, `app/portal-polish.css` |
| Hem, moduler, senaste | `components/home/HomeDashboard.tsx`, `ModuleGrid.tsx`, `DatabaseStats.tsx`, `RecentActivity.tsx`, `home-dashboard.css` |
| Filmer, filmkort, filmfilter, detalj | `app/films.tsx`, `app/films.css`, `components/dashboard/MediaOverview.tsx` |
| Serier, säsonger, detalj | `app/series.tsx`, `app/series.css`, `components/dashboard/MediaOverview.tsx` |
| Berättelser, mysterier, läsare | `app/stories.tsx`, `app/stories.css`, `components/dashboard/StoryOverview.tsx` |
| Kunskapsbank, sök, utforska filer, upptäck, sparade, inkorg, nyhetsarkiv, tekniskt arkiv | `app/portal.tsx`, `app/module-dashboards.css`, `app/discovery-polish.css` |
| Pluginöversikt, verktyg | `app/portal.tsx` och dess gemensamma designkomponenter |
| Inställningar och statuskort | `components/dashboard/SettingsOverview.tsx`, `app/portal.tsx` |

## Överföringsregler
1. Jämför senast godkänd mockup-commit med bascommiten, inklusive testad mobilvy.
2. Identifiera exakt vilken produktkomponent som påverkas med tabellen ovan.
3. För över relevanta token-, CSS-, layout- och beteendeändringar separat. Kontrollera att data, API, GitHub-synk och åtkomst inte påverkas.
4. Verifiera responsivitet, klickflöden, läsbarhet och publicerad Site.
5. Fiktiv mockdata, lokal UI-status, demouppladdningar och designverkstadens kontroller ska **aldrig** kopieras till produktionen av misstag.

## Utgångsläge
Primära visuella referenser: den mörkblå Nexus Hub-paletten, lavendel/lila accent, kort med tydliga avgränsningar, desktop-sidomeny, mobilens femdelade bottennavigation samt bevarad toppmeny och mobilmeny. Basen är avsedd som designreferens, inte en pixelperfekt rekonstruktion.
