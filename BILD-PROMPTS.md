# Bild-Prompts für Codex CLI

Alle Illustrationen der Seite werden mit Codex CLI generiert. Diese Datei ist die
reproduzierbare Quelle: pro Bild ein Prompt (Englisch — Bildmodelle folgen englischen
Prompts präziser), der Ziel-Dateiname und das Format.

## Workflow

> **Status: erledigt (14.07.2026).** Alle 13 Bilder wurden mit Codex CLI 0.144.3
> (native Bildgenerierung) erzeugt, mit `cwebp -q 85` zu WebP konvertiert und in
> `index.html` eingebunden. Die PNGs bleiben als Master liegen, die `.svg`-Dateien
> sind die früheren Platzhalter. Zum Nachgenerieren einzelner Bilder:

1. Bild generieren (Sandbox mit Netzwerk, kein Git-Repo nötig):
   ```bash
   codex exec -C . --skip-git-repo-check -s workspace-write \
     -c sandbox_workspace_write.network_access=true \
     "Generate one image and save it as assets/img/<NAME>.png (<GRÖSSE> PNG). Use your native image generation capability. Image prompt: '<STYLE-ANCHOR> <Szenen-Prompt>'"
   ```
2. Zu WebP konvertieren und fertig — `index.html` verweist bereits auf `.webp`:
   ```bash
   cwebp -q 85 assets/img/<NAME>.png -o assets/img/<NAME>.webp
   ```

**Formate:** Kapitel-Bilder und Panorama `1536x1024` (3:2), Vignetten `1024x1024` (1:1).
Das Panorama wird auf der Seite als 2:1 beschnitten — wichtige Bildinhalte vertikal mittig halten.

## Style-Anchor

Wird **jedem** Prompt vorangestellt — er hält den Stil über alle 13 Bilder konsistent:

> Hand-painted gouache illustration on textured paper, visible brushstrokes and
> pigment granulation, warm earthy palette, soft natural light, richly detailed
> but calm composition with generous negative space, muted colors, storybook
> realism, no text, no letters, no watermark, no border.

## Die Bilder

### 00-hero-panorama.png (1536x1024, wird 2:1 beschnitten)
One continuous forge scene spanning millennia: on the far left a stone-age human
kneels hammering native copper by a river, toward the center a bronze-age caster
pours glowing metal, a medieval smith works at an anvil with a water wheel behind,
and on the far right an engineer in a bright modern lab watches a 3D metal printer —
all connected by a single glowing ribbon of molten metal flowing along the ground
through the whole scene. Palette shifts gently from warm ochre on the left to cool
teal on the right.

### 01-kaltes-kupfer.png (1536x1024) — Kapitel 1
A neolithic person kneeling on a riverbank at golden hour, cold-hammering a small
lump of native copper on a flat stone anvil, tiny finished copper beads and an awl
laid out on a leather cloth beside them, a reed basket and gathering tools nearby,
gentle river and hills in the background. Dominant colors: ochre, terracotta,
warm sand, a single glint of salmon-pink copper.

### 02-schmelzfeuer.png (1536x1024) — Kapitel 2
Two people of the Vinča culture crouching around a small clay smelting pit at dusk,
one blowing through a long reed pipe into glowing charcoal, green malachite ore
stacked in a bowl beside them, a thin trickle of molten copper running into an open
stone mold, sparks rising. Dominant colors: malachite green, ember orange, deep
earth brown.

### 03-bronzezeit.png (1536x1024) — Kapitel 3
A busy bronze-age casting workshop: a founder in a leather apron pouring glowing
bronze from a clay crucible into a two-part stone sword mold, finished sickles and
a horn hanging on the wall, a trader arriving with tin ingots in a carrying frame,
wax figurines on a shelf hinting at lost-wax casting. Dominant colors: golden
bronze, honey amber, one accent of deep lapis blue.

### 04-eisenzeit.png (1536x1024) — Kapitel 4
An early iron-age bloomery scene at nightfall: a chest-high clay furnace glowing
from within, two smiths breaking it open with wooden poles and pulling out a
white-hot spongy iron bloom with tongs, sparks flying, charcoal heaps and clay
tuyeres in the foreground. Dominant colors: rust red, charcoal black, fiery
orange glow.

### 05-antiker-stahl.png (1536x1024) — Kapitel 5
A roman-era smithy interior: the master smith quenching a glowing blade in a
water basin with a burst of steam, an apprentice carrying a small round wootz
steel ingot, neat rows of standardized roman tools and a legionary helmet on the
wall, warm forge light against cool stone walls. Dominant colors: olive gray,
steel silver, warm bronze accents.

### 06-mittelalter-schmiede.png (1536x1024) — Kapitel 6
A medieval water-powered hammer mill: a large wooden water wheel driving a massive
tilt hammer that strikes glowing iron, the smith guiding the workpiece with tongs,
sparks arcing through the dark timber workshop, a half-finished suit of plate
armor on a stand and a bell mold in the corner. Dominant colors: ember red, iron
black, warm wood brown.

### 07-industrielle-revolution.png (1536x1024) — Kapitel 7
A nineteenth-century steel mill at night: a tilted Bessemer converter erupting a
towering fountain of white and orange sparks, tiny workers with flat caps silhouetted
against the glare, factory chimneys and a riveted railway viaduct in the smoky
background. Dominant colors: soot brown, brick red, blinding white-gold sparks.

### 08-legierungen.png (1536x1024) — Kapitel 8
A twentieth-century hall of invention: steaming aluminium electrolysis cells along
one side, in the foreground a drafting table with blueprints of a jet engine, a
single polished turbine blade standing upright, and sheets of stainless steel
reflecting cool light. Dominant colors: steel blue, chrome silver, blueprint cyan,
touches of warm brass.

### 09-praezision-zukunft.png (1536x1024) — Kapitel 9
A bright, calm modern lab: inside the build chamber of a metal 3D printer a fine
laser point draws glowing lines in a bed of titanium powder while a delicate
lattice part grows from it, an engineer with a tablet observing, a robotic arm and
recycled metal scrap bales visible through a window. Dominant colors: pale titanium
white, teal laser light, soft warm gray.

### vignette-oetzi-beil.png (1024x1024) — Artefakt nach Kapitel 2
Museum-style portrait of Ötzi's copper axe on plain textured paper background:
a knee-shaped yew wood haft, birch tar and leather bindings, small trapezoidal
copper blade with a salmon-pink sheen, painted like a loving field-guide study.
Dominant colors: ochre, wood brown, copper.

### vignette-nebra-scheibe.png (1024x1024) — Artefakt nach Kapitel 3
Museum-style portrait of the Nebra sky disc on plain textured paper background:
a round bronze disc with deep blue-green patina, golden sun barge, crescent moon
and the Pleiades star cluster inlaid in gold, painted like a loving field-guide
study. Dominant colors: deep lapis, verdigris, gold.

### vignette-damaszener.png (1024x1024) — Artefakt nach Kapitel 5
Extreme close-up of a damascus steel blade surface filling the frame: flowing,
cloud-like watered-silk bands of light and dark steel, one polished edge catching
the light, painted like a loving field-guide study. Dominant colors: olive gray,
silver, charcoal.

## Nach dem Einbau prüfen

- Wirken alle Bilder wie aus einer Hand? (Gleiche Pinselstrich-Dichte, gleiches Papier)
- Passt die Palette zur Epochenfarbe des Kapitels? (Notfalls Prompt-Farbhinweise nachschärfen und neu generieren)
- `object-fit: cover` beschneidet Ränder — zentrale Motive dürfen nicht am Bildrand kleben.
