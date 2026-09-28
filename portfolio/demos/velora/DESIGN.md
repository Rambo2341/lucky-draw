---
name: VELORA ESTATES
description: A private Gulf agency's concierge stationery kit, bilingual English and Arabic.
colors:
  stock: "#ffffff"
  paper: "#faf8f4"
  sand: "#ebe3d5"
  sand-deep: "#d9ccb6"
  ink: "#141312"
  ink-hover: "#2d2a27"
  ink-2: "#55504a"
  ink-3: "#655e55"
  rule: "#d9d1c3"
  error: "#9b2c1f"
typography:
  display:
    fontFamily: "Bodoni Moda, Amiri, Times New Roman, serif"
    fontSize: "5.5rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bodoni Moda, Amiri, Times New Roman, serif"
    fontSize: "3.25rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bodoni Moda, Amiri, Times New Roman, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk, Readex Pro, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Hanken Grotesk, Readex Pro, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Hanken Grotesk, Readex Pro, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.14em"
  serial:
    fontFamily: "Hanken Grotesk, Readex Pro, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.08em"
    fontFeature: "tnum"
rounded:
  hairline: "2px"
  window: "10px"
  frame: "14px"
  seal: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  card: "20px"
  card-lg: "24px"
  section: "80px"
  section-lg: "112px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    rounded: "{rounded.hairline}"
    padding: "0 24px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.ink-hover}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0 24px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.sand}"
  field:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "12px 14px"
    height: "48px"
  blank:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0"
  blank-hover:
    backgroundColor: "{colors.sand}"
  keycard:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    padding: "8px"
  keycard-window:
    backgroundColor: "{colors.sand-deep}"
    rounded: "{rounded.window}"
  serial-tag:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.serial}"
    padding: "4px 8px"
  set-aside:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0 14px"
    height: "44px"
  set-aside-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
---

# Design System: VELORA ESTATES

## Overview

**Creative North Star: "The Concierge Stationery Kit"**

VELORA is set as the printed kit a private agency's concierge desk hands across the counter: white card stock, black letterpress ink, sand-coloured paper fields, a blind-embossed V monogram, perforated tear lines and a serial number on every card. Listings are issued as keycards at credit-card proportion (1.586:1). Controls are printed form parts: underlined blanks in a sentence, hairline fields, ink-filled selections, a rotated rubber stamp. Nothing is a floating glass panel; every surface is a piece of paper lying on another piece of paper.

The system is quiet and dense with specifics. Colour is almost entirely achromatic warm neutrals; the only chroma is the sand of the paper fields and the error red. Hierarchy comes from a high-contrast engraved serif against a plain grotesque, from paper tone changes (stock, paper, sand, full ink) and from hairline rules, not from accent colour.

The build is bilingual and mirrors fully. English sets LTR in Bodoni Moda over Hanken Grotesk; Arabic sets RTL in Amiri over Readex Pro, swapped at the root by `html[dir="rtl"]`. All geometry uses logical properties (start/end), so perforation notches, blank chevrons and select arrows flip with the script. Serials, phone numbers, times and references stay `dir="ltr"` inside Arabic text.

Photography is AI-generated (Higgsfield; provenance in IMAGES.md): editorial architecture in warm sand and limestone tones, no people, no text. Property photos are cropped into 1.586:1 windows, city photos stand at 4:5. The photographic layer is recorded from code only; the finish review could not render it because the image CDN was unreachable from the build environment, so how the photos sit against the sand and paper fields is unverified.

**Key Characteristics:**
- White stock cards resting on paper or sand fields, with one soft paper shadow.
- Keycard proportion (1.586:1) for every listing photograph and gallery frame.
- Serial numbers (VE-RYD-0142 form) printed in tabular figures on every card.
- Perforated tear lines with punched half-circle notches separating card from stub.
- Form parts as print: underline blanks, 2px hairline fields, ink-filled selected state.
- Full LTR/RTL parity with a separate font pair per script.

## Colors

A warm achromatic stationery palette: one black ink, three paper tones, a hairline rule and a single red for errors.

### Primary
- **Letterpress Black** (ink): all text of record, primary buttons, selected states, the demo banner, the cities band inverted to full ink, text selection, focus outlines.
- **Pressed Black** (ink-hover): hover state of the ink button only.

### Neutral
- **Card Stock** (stock): the page and every card. A card is always stock, whatever field it lies on.
- **Laid Paper** (paper): alternating section fields, page heads, the tear-off stub of the appointment card, perforation notches by default.
- **Sand Field** (sand): the field the hero keycards are dealt onto, the viewing-request panel, the footer, hover wash on blanks, line buttons and set-aside controls, focus halo on fields.
- **Deep Sand** (sand-deep): image placeholder behind every photo window, scrollbar thumb, dashed border of empty holders. Never text.
- **Secondary Ink** (ink-2): ledes, descriptions, specs, inactive nav links.
- **Tertiary Ink** (ink-3): small printed labels, notes, placeholders. Stock backgrounds only (see rule).
- **Hairline Rule** (rule): 1px field borders, section dividers, perforation dashes, header underline.

### Tertiary
- **Error Red** (error): invalid field border and error message text. Not used decoratively.

### Named Rules
**The Paper Tone Rule.** Depth between regions is a change of paper (stock, paper, sand, ink), never a tinted accent. Adjacent sections alternate stock and paper; sand is reserved for fields that hold cards or forms.

**The Tertiary Ink Rule.** Tertiary ink (#655e55) is for labels, notes and serials. It measures 6.39:1 on stock, 6.03:1 on paper and 5.02:1 on sand; do not set it on sand-deep (4.04:1).

## Typography

**Display Font:** Bodoni Moda (Latin), Amiri (Arabic), with Times New Roman, serif
**Body Font:** Hanken Grotesk (Latin), Readex Pro (Arabic), with system-ui, sans-serif

**Character:** An engraved Didone and a Naskh for everything that is named (headlines, property names, city names, the wordmark), set at weight 400 and trusted to carry contrast on its own; a plain grotesque for everything that is read or operated.

### Hierarchy
- **Display** (400, 3.25rem / 4.5rem / 5.5rem by breakpoint, line-height 1.02, -0.02em, max 12ch): the home headline only. Arabic steps down (2.9 / 3.9 / 4.6rem, max 14ch).
- **Headline** (400, 2.5rem to 3.25rem, 1.02): section titles; page heads use 2.75rem to 3.75rem, the property title 2.75rem to 4rem.
- **Title** (400, 1.5rem to 2rem, 1.02): card names (1.5rem), detail sub-sections and empty states (2rem), agent names (1.625rem).
- **Slip** (400, 1.5rem / 1.875rem, line-height 1.7, Arabic 1.9): the request sentence with inline blanks. The open leading is what lets the underline blanks sit in the line.
- **Body** (400, 1.0625rem, 1.625, max 52ch to 62ch): ledes and descriptions in secondary ink. Secondary body 0.9375rem; notes 0.8125rem.
- **Price** (600, 1.0625rem on cards, 1.5rem on the detail page, tabular figures).
- **Label** (500, 0.6875rem, 0.14em, uppercase): printed field names, form legends, footer column heads, card roles. Arabic: 0.8125rem, no tracking, no case.
- **Serial** (500, 0.75rem, 0.08em, tabular figures): serials, references, counters.

### Named Rules
**The Script Parity Rule.** Every Latin tracking or uppercase treatment has an Arabic override to zero tracking and a larger size; Arabic display gets line-height 1.35. Never ship a letter-spaced Arabic string.

**The Tabular Figures Rule.** Prices, areas, bed counts, times and serials use tabular lining figures (lining-nums are set on body).

## Layout

A 1360px shell with 16 / 24 / 40px gutters (mobile / sm / lg). Sections run 80px vertical padding, 112px from md. The home first viewport is a 1.1fr / 0.9fr split: headline, lede and request slip on the start side aligned to the shell edge, keycards fanned on a full-bleed sand field on the end side; below lg it stacks with the sand field under the slip. Listing grids are 1 / 2 / 3 columns (sm / xl) with a 24px gap; agent grids go to 4. The "how it works" steps sit in a 1px rule-coloured gap grid (cells on stock). The header is sticky at 64px (72px on lg); the properties filter bar sticks directly under it. Scroll padding is 6rem for anchored sections.

## Elevation & Depth

Depth is physical paper, not interface layers. A card of stock sits on a paper or sand field with one soft, low, ink-tinted shadow; hero keycards that are "dealt" carry a deeper one. The blind-embossed V on sand fields is drawn twice, a white highlight offset by 1.2px over a sand-brown shadow at 22% opacity, with no ink. There is no elevation scale beyond these two.

### Shadow Vocabulary
- **Stock at rest** (`box-shadow: 0 1px 1px rgba(20,19,18,0.05), 0 8px 24px -10px rgba(20,19,18,0.18)`): every card, the appointment card, gallery frames.
- **Dealt card** (`box-shadow: 0 2px 2px rgba(20,19,18,0.06), 0 24px 48px -18px rgba(20,19,18,0.35)`): the fanned keycards on the hero sand field only.
- **Field focus halo** (`box-shadow: 0 0 0 3px` sand): the focused form field, paired with an ink border.

### Named Rules
**The One Sheet Rule.** A card is lifted exactly once, by the stock shadow. No nested shadows, no hover lift; hover is a photo scale (1.03 over 900ms) or a sand wash.

## Shapes

Printed stationery corners. Controls are nearly square (2px hairline radius). Photo windows punched into a card are rounded (10px on listing cards and gallery, 8px on the fanned cards, 6px on thumbnails); every stock card — listing keycards, the dealt hero keycards, gallery and about frames, calling cards, spec sheet, forms, appointment cards — rounds to one 14px corner. Circular forms are reserved for the monogram seal and the agent initials seal. The perforation is a 1.5px dashed rule with 16px half-circle notches punched out at both ends, filled with the colour of the field underneath (`--notch`). The "Requested" stamp is a 2px ink box rotated -4deg.

## Components

### Buttons
Letterpress blocks, flat and decisive.
- **Shape:** hairline corners (2px), 48px minimum height, 24px inline padding, 0.9375rem weight 500.
- **Ink (primary):** ink on stock text; hover to pressed black. One per region: the slip submit, the viewing request, empty-state recovery.
- **Line (secondary):** 1px ink border, ink text, sand wash on hover.
- **Text:** underlined secondary ink ("Clear", "Reset filters"), ink on hover.
- **Active:** all buttons press down 1px. Focus is the global 2px ink outline at 3px offset. Arrows mirror in RTL.

### Chips / Selection slots
- **Time slots and set-aside:** 44px bordered slots; unselected is a hairline border (rule, or 70% ink for set-aside) that goes to ink on hover or takes a sand wash; selected fills solid ink with stock text. Selecting set-aside stamps a check in (scale 1.35 to 1, rotate -4deg).

### Cards / Containers
- **Keycard (listing):** stock with the stock shadow and 14px corners, an 8px-inset photo window at 1.586:1 with 10px corners and a deep-sand placeholder. A serial tag (stock at 95%, top-start) and a purpose/type tag (solid ink, top-end) are printed on the photo. Name in title display, district in secondary ink, then a perforation, then a stub with price, specs and the set-aside control. The whole card is one link via a stretched pseudo-element.
- **Calling card (agent):** stock, 24px padding, initials in a circular ink-hairline seal, role as a label, perforation before contact lines. No portraits.
- **Appointment card:** stock with a tear-off stub on paper, separated by a 1.5px dashed rule (vertical on wide containers, horizontal on narrow), holding the reference serial and a rotated "Requested" stamp.
- **Empty holder:** paper with a dashed deep-sand border.

### Inputs / Fields
- **Blank (inline):** no box; a 1.5px ink underline, transparent ground, a two-gradient chevron at the end side, sand wash on hover. Used inside the request sentence.
- **Field (stacked):** stock, 1px rule border, 2px corners, 48px minimum, 1rem text; hover border to tertiary ink; focus border to ink with a 3px sand halo; invalid border to error red with an error line in 0.8125rem.
- **Labels:** always a printed label above the field.

### Navigation
Sticky stock header with a rule underline. Wordmark is the monogram plus "VELORA" in display at wide tracking (Arabic: brand name, no tracking). Links 0.9375rem in secondary ink, ink on hover; the current page is ink with a 1px underline offset 0.5em. The language switch is a plain text link naming the other language. The holder link is a rule-bordered slot with a card-sleeve icon and an ink counter that bumps when a card is set aside. Below lg a full-screen paper sheet lists pages in 1.75rem display between rules.

### Request Slip (signature)
A form set as one sentence in slip type between two ink rules, each variable an underline blank, followed by the ink button. It is the primary search control; there is no search bar.

### Fanned Keycards (signature)
Three keycards dealt onto a sand field (rotations -9, 6, -1.5deg) with a large emboss mark bleeding off the end corner; they deal in with a staggered 1s rise and spread apart on hover. Only the top card is live.

## Do's and Don'ts

### Do:
- **Do** put every listing photo in a 1.586:1 window inside a stock card, with the serial printed on it.
- **Do** separate a card from its stub with the perforation, setting `--notch` to the field colour beneath.
- **Do** express filters and requests as printed form parts: underline blanks in sentences, hairline fields with labels above, ink-filled selections.
- **Do** change paper tone (stock, paper, sand, ink) to separate regions.
- **Do** use `ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) for rises, deals, stamps and photo scales, and honour reduced motion.
- **Do** give every Latin typographic treatment an Arabic counterpart and mirror with logical properties.
- **Do** label synthetic listings, agents and imagery as a demo wherever they appear.

### Don't:
- **Don't** open a page with a full-bleed villa photo and a floating search bar over a card grid.
- **Don't** add an accent colour; black, white and beige are the palette.
- **Don't** put tertiary ink text on paper or sand, or set any text in deep sand.
- **Don't** stack shadows or lift cards on hover; one sheet, one shadow.
- **Don't** letter-space or uppercase Arabic.
- **Don't** give agents portraits; they are calling cards.
