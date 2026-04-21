# Reasco TYPO3 Site Package

TYPO3 Fluid-Template Site Package für [reasco.immo](https://reasco.immo).

## Übersicht

| Komponente | Beschreibung |
|---|---|
| Extension Key | `reasco_site` |
| TYPO3 | 12.4 LTS / 13.x |
| Fluid | Standard TYPO3 Fluid |
| Google Fonts | Open Sans · Playfair Display |
| Brand-Farbe | `#D0205A` |

---

## Voraussetzungen

- TYPO3 12.4+ (Composer-Installation empfohlen)
- PHP 8.1+
- Node.js 20+ (nur für lokale Preview)

---

## Installation in TYPO3

### 1. Extension einbinden

```bash
# Composer
composer require reasco/site-package

# Oder manuell: Ordner in typo3conf/ext/ kopieren
cp -r packages/reasco_site /path/to/typo3/typo3conf/ext/
```

### 2. Extension aktivieren

Im TYPO3 Backend unter **Admin Tools → Extensions** `reasco_site` aktivieren.

### 3. TypoScript einbinden

Unter **Web → Template** auf der Root-Seite:

1. Template bearbeiten (Bleistift)
2. Reiter **Includes**
3. Unter *Include static (from extensions)* → **Reasco Site Package** hinzufügen

Alternativ manuell in `setup.typoscript`:

```typoscript
@import 'EXT:reasco_site/Configuration/TypoScript/setup.typoscript'
```

### 4. Backend Layouts zuweisen

Für jede Seite im Backend unter **Eigenschaften → Erscheinungsbild**:

| Seite | Backend Layout |
|---|---|
| Startseite | `pagelayout-1` – Startseite |
| Leistungsseiten | `pagelayout-2` – Leistungsseite |
| Über uns | `pagelayout-3` – Über uns |

### 5. Seiten-UIDs ersetzen

In den Fluid-Partials sind Platzhalter `##NAME_UID##` für interne Seitenlinks.  
Nach dem Erstellen der Seitenstruktur im Backend die echten UIDs eintragen:

| Platzhalter | Seite |
|---|---|
| `##BAUHERRENBERATUNG_UID##` | Bauherrenberatung |
| `##ARCHITEKTUR_UID##` | Architektur & Bauleitung |
| `##GU_UID##` | GU-Mandate |
| `##VERMARKTUNG_UID##` | Immobilienvermarktung |
| `##ENERGIE_UID##` | Energieberatung |
| `##UEBER_UNS_UID##` | Über uns |
| `##REFERENZEN_UID##` | Referenzen |
| `##KONTAKT_UID##` | Kontakt |
| `##DATENSCHUTZ_UID##` | Datenschutz |
| `##IMPRESSUM_UID##` | Impressum |

**Tipp:** Suchen in allen Partials mit:
```bash
grep -r "##" packages/reasco_site/Resources/Private/
```

---

## Dateistruktur

```
packages/reasco_site/
├── Configuration/
│   └── TypoScript/
│       ├── constants.typoscript       # Kontaktdaten, Social-URLs
│       ├── setup.typoscript           # Seiten-Rendering, dataProcessing
│       └── PageTS/
│           └── BackendLayouts.tsconfig
├── Resources/
│   ├── Private/
│   │   ├── Layouts/
│   │   │   └── Default.html           # Outer HTML: head, nav, footer
│   │   ├── Templates/Page/
│   │   │   ├── Default.html           # Startseite
│   │   │   ├── Service.html           # Leistungsseite
│   │   │   └── About.html             # Über uns
│   │   └── Partials/
│   │       ├── Navigation/            # Main.html, Mobile.html
│   │       ├── Hero/                  # Home.html, SubPage.html
│   │       ├── Content/               # ServiceCards, AboutStrip, Testimonials,
│   │       │                          #   References, ContactForm, TeamGrid, Memberships
│   │       ├── Components/            # CTA.html
│   │       └── Footer/                # Footer.html
│   └── Public/
│       ├── Css/styles.css
│       ├── Js/scripts.js
│       └── Images/                    # logo.svg, hero-home.webp, team-*.jpg, …
├── ext_emconf.php
└── ext_localconf.php
```

---

## Backend Layouts

### pagelayout-1 – Startseite

| colPos | Bereich | Inhalt |
|---|---|---|
| 10 | Hero | FCE Hero-Bild + CTA |
| 20 | Leistungen Intro | Headline + Text |
| 30 | Über uns Strip | Titel, Text, Feature-Liste |
| 40 | Testimonials | Kundenstimmen |
| 50 | Referenzen | Projektreferenzen |
| 60 | CTA-Block | Call to Action |
| 70 | Kontaktformular | EXT:form oder Custom Form |
| 80 | Footer Extra | Sonderinhalt im Footer |

### pagelayout-2 – Leistungsseite

| colPos | Bereich |
|---|---|
| 10 | Hero |
| 20/21 | Intro 2-spaltig |
| 30 | Leistungsdetails |
| 40 | Prozessschritte |
| 50 | Referenzen |
| 60 | Team |
| 70 | FAQ |

### pagelayout-3 – Über uns

| colPos | Bereich |
|---|---|
| 10 | Hero |
| 20 | Geschichte |
| 30 | Werte & Mission |
| 40 | Team |
| 50 | Mitgliedschaften |
| 60 | Karriere |

---

## Lokale Preview (ohne TYPO3)

Das GitHub-Actions-Workflow generiert automatisch eine statische HTML-Preview.  
Für eine lokale Vorschau:

```bash
# Node.js script aus dem Workflow lokal ausführen
node .github/preview-build.js   # (optional, falls separat extrahiert)

# Oder einfach: statische Assets direkt im Browser öffnen
open packages/reasco_site/Resources/Public/Css/styles.css   # CSS prüfen
```

---

## GitHub Pages Preview

Nach einem Push auf `main` wird automatisch eine statische Vorschau auf  
**GitHub Pages** deployed (Actions → deploy-pages Job).

URL: `https://<username>.github.io/<repo>/`

Für die erste Einrichtung unter **Settings → Pages**:
- Source: **GitHub Actions**

---

## Anpassungen

### Kontaktdaten ändern

In `Configuration/TypoScript/constants.typoscript`:

```typoscript
plugin.tx_reasco_site {
    phone     = +41 52 551 07 77
    email     = info@reasco.immo
    emailSales = vermarktung@reasco.immo
    linkedIn  = https://www.linkedin.com/company/reasco
    facebook  = https://www.facebook.com/reasco
    instagram = https://www.instagram.com/reasco_immo
}
```

### Brand-Farbe ändern

In `Resources/Public/Css/styles.css` die CSS-Variable:

```css
:root {
    --brand: #D0205A;
}
```

### Neue Leistungsseite anlegen

1. Im TYPO3 Backend neue Seite erstellen
2. Backend Layout `pagelayout-2` zuweisen
3. `##NEUE_SEITE_UID##` Platzhalter in Partials durch echte UID ersetzen
4. Inhaltselemente in die colPos-Bereiche einfügen

---

## Bilder

Folgende Bilder müssen in `Resources/Public/Images/` vorhanden sein:

| Datei | Verwendung |
|---|---|
| `logo.svg` | Header + Footer |
| `hero-home.webp` | Startseiten-Hero |
| `team-steiner-processed.jpg` | Teamkarte Andreas Steiner |
| `team-bettina-blank.jpg` | Teamkarte Bettina Blank |
| `team-ursula.jpg` | Teamkarte Ursula Eberhart |
| `ref-projekt-1.jpg` | Referenz-Card 1 |
| `ref-projekt-2.jpg` | Referenz-Card 2 |
| `service-bauherren.png` | Referenz-Card 3 |
