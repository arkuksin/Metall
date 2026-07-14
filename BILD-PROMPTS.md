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

---

# Werkbank-Reihe: Technik-Schautafeln (Buntstift)

> **Status: erledigt (14.07.2026).** Die 9 Blätter der parallelen Technik-Reihe
> („Werkbank") sind bewusst in einer **zweiten Bildsprache** gehalten: Buntstift
> statt Gouache — gezeichnete Studienblätter neben gemalten Szenen. Format
> immer `1024x1024`. Workflow identisch (codex exec → cwebp), siehe oben.

## Style-Anchor (Werkbank)

Wird **jedem** Technik-Prompt vorangestellt:

> Colored pencil illustration, drawn by hand with vibrant colored pencils on
> warm off-white paper: crisp clean pencil linework, visible directional pencil
> strokes and soft cross-hatching, rich but harmonious colors, the look of a
> beautiful hand-drawn schoolbook technical study. One clear explanatory cutaway
> diagram, precise and detailed yet airy, generous blank paper around the
> subject, flat schematic depth, small arrows allowed but absolutely no text,
> no letters, no numbers, no labels, no watermark, no border.

Wichtig: **keine Beschriftungen im Bild** — Bildmodelle erzeugen kaputte
Glyphen. Die Erklärung leisten die nummerierten Schritte im HTML daneben;
die Prompts ordnen den Prozess dafür räumlich klar (links→rechts bzw.
Querschnitt mit Pfeilen).

## Die Technik-Blätter

### tech-01-kaltschmieden.png — nach Kapitel 1
Explanatory sequence about cold-hammering copper and annealing: in the center a
hand strikes a copper nugget on a stone anvil with a hammerstone; two magnifier
circles above show the metal's inner structure — one with neat orderly rows of
tiny dots, one with squeezed tangled rows; at the side a small campfire with the
nugget resting in the glow, and a third magnifier showing the rows relaxed and
orderly again; curved arrows connect hammer, magnifiers and fire into a cycle.
Colors: salmon copper, warm ochre, soft red fire glow.

### tech-02-verhuettung.png — nach Kapitel 2
Cutaway diagram of a neolithic copper smelting pit: bowl-shaped clay pit filled
with layered black charcoal and green malachite lumps, two long blowpipes
entering from the sides with airflow arrows, glowing orange zone at the heart, a
thin stream of molten copper collecting in a hollow at the bottom, beside the
pit an open stone mold for a flat axe. Colors: malachite green, ember orange,
deep earth brown.

### tech-03-bronzeguss.png — nach Kapitel 3
Cutaway diagram of bronze casting: a two-part stone sword mold shown opened like
a book with funnel and thin air channels, a clay crucible pouring glowing golden
bronze into the closed mold next to it, small side sequence of three miniatures
— a wax figurine, the figurine wrapped in a clay shell, the empty shell with wax
dripping out; a small dish with nine copper discs and one grey tin disc and an
arrow into the crucible. Colors: golden bronze, honey amber, one accent of deep
lapis blue.

### tech-04-rennofen.png — nach Kapitel 4
Tall cutaway diagram of an iron-age bloomery furnace: chimney-shaped clay shaft
filled with alternating layers of black charcoal and rust-red ore, hand bellows
and clay nozzles at the base with air arrows, color gradient from dark top to
white-hot bottom, dark liquid slag running out of a low opening into a small
pit, a spongy glowing iron lump sitting above the nozzles; beside the furnace a
hammer compacting the spongy lump on an anvil. Colors: rust red, charcoal black,
fiery orange.

### tech-05-haerten.png — nach Kapitel 5
Explanatory three-stage sequence of hardening a steel blade, arranged left to
right: first the blade glowing cherry-red among charcoal in a forge, then the
blade plunged hissing into a water barrel with steam clouds, then the blade held
over a small flame showing straw-yellow to blue temper colors along the steel;
above each stage a magnifier circle with a simple inner pattern — loose rows,
tight needle-like criss-cross, relaxed fine pattern; arrows lead from stage to
stage. Colors: olive grey, steel silver, glowing orange, delicate temper blue
and straw yellow.

### tech-06-wasserhammer.png — nach Kapitel 6
Explanatory diagram of a medieval water-powered tilt hammer, drawn like a
beautiful mechanical study: large water wheel with flowing stream, axle with
cams that press down the tail of a long hammer beam, the heavy hammer head
falling onto glowing iron on an anvil, rotation and lever arrows; in the
background a small cutaway of an early blast furnace with water-driven bellows
and a runnel of liquid iron flowing out. Colors: wood brown, iron black, ember
red, blue-green water.

### tech-07-bessemer.png — nach Kapitel 7
Cutaway diagram of a Bessemer converter: big egg-shaped steel vessel with thick
fireproof lining shown in section, filled with glowing liquid iron, air blown
through nozzles in the bottom rising as bubbles, a fountain of white and gold
sparks bursting from the mouth; beside it a small three-step sequence of the
vessel tilted to be filled, standing upright blowing, tilted to pour finished
steel; airflow arrows from below. Colors: soot brown, brick red, blinding
white-gold sparks.

### tech-08-elektrolyse.png — nach Kapitel 8
Cutaway diagram of an aluminium electrolysis cell: wide shallow steel trough in
section, glowing molten bath inside, several dark carbon anode blocks hanging
into the bath from above on rods, a silvery layer of liquid aluminium collected
at the bottom, small bubbles rising at the anodes, bold arrows showing current
flowing from the anodes through the bath into the lined bottom, a suction pipe
tapping the silver metal. Colors: steel blue, chrome silver, glowing amber bath,
cyan accents.

### tech-09-metalldruck.png — nach Kapitel 9
Cutaway diagram of a laser metal 3D printer build chamber: laser source and two
small tilted mirrors steering a bright teal beam down onto a flat bed of pale
titanium powder, a tiny glowing melt point with a delicate lattice part
half-buried in the powder, a recoater blade pushing a fresh thin powder layer
from a supply piston on one side, arrows showing the build platform moving down
one step; faint horizontal layer lines in the part. Colors: pale titanium white,
teal laser light, soft warm grey, one warm orange glow at the melt point.

---

## Nach dem Einbau prüfen

- Wirken alle Bilder wie aus einer Hand? (Gleiche Pinselstrich-Dichte, gleiches Papier;
  bei der Werkbank-Reihe: gleiche Stiftstrich-Dichte, gleiches Papierweiß)
- Passt die Palette zur Epochenfarbe des Kapitels? (Notfalls Prompt-Farbhinweise nachschärfen und neu generieren)
- `object-fit: cover` beschneidet Ränder — zentrale Motive dürfen nicht am Bildrand kleben.
- Werkbank-Blätter: Ist der Prozessfluss ohne Text lesbar? (Pfeile, Reihenfolge links→rechts)
