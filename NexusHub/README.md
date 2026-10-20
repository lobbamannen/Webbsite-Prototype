# Nexus Hub · UI/UX-designverkstad

**Detta är en fristående statisk mockup, inte Nexus Hub i drift.**

## Adress
https://lobbamannen.github.io/Webbsite-Prototype/NexusHub/

## Syfte
- Utveckla och testa enhetlig design för Nexus Hubs **alla huvudsakliga vyer** i mobil-, surfplatte- och desktopformat.
- Klicka runt i navigation, film/seriebibliotek, filter, kort, detaljer, läsare, dokumentlista, pluginbibliotek, utforskare, inkorg, sparat och inställningar.
- Justera visuella designval utan att ändra Nexus Hubs verkliga GitHub-repo.
- Flytta senare godkända designändringar tillbaka till produktionskoden.

## Säkerhetsgräns
- Ingen backend, inloggning, GitHub-token, hemlighet eller riktig privat databas.
- Exempeldata och innehåll är fiktivt eller generiskt. Alla räknare visar **DEMO**.
- Demonstrerade uppladdningar, statusändringar och sparningar är **endast lokala UI-interaktioner**. Ingenting skickas till servern.
- Användarval för designverkstaden lagras endast lokalt i webbläsarens localStorage.

## Struktur
- `index.html`: statisk GitHub Pages-startpunkt.
- `styles.css`: design-tokens, komponenter och responsiv layout.
- `app.js`: mockdata, vyer, navigation och lokala UI-interaktioner.
- `DESIGN-MAP.md`: motsvarande filer i riktiga Nexus Hub samt regler för överföring.

## Process
1. **Bas:** dokumentera att designen här bygger på en läsning av `NexusHub-main-1.zip` (2026-10-20); det är en referens, inte en automatisk synk.
2. **Iterera:** gör avgränsade Git-commits i den här mappen. Granska GitHub Pages-adressen på mobil.
3. **Godkänn:** välj vilka UI-delar som faktiskt ska överföras.
4. **Implementera:** översätt komponent-/CSS-ändringar till motsvarande React/Next.js-filer i privata `lobbamannen/NexusHub`, testa där innan publicering. Kopiera inte den här mockupens JavaScript som backend-ersättning.

## Begränsning
Mockupen visualiserar och simulerar viktiga UI-flöden; den återger inte varje enskilt serverberoende tillstånd i den riktiga appen. Nya produktionsvyer kompletteras här när de ska designas.
