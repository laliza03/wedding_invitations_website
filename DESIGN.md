# Design System: Liza et Zakaria

## 1. Visual Theme & Atmosphere
A French wedding invitation composed for a 390 × 1100 mobile canvas. Sculptural blue flowers and realistic olive leaves surround a quiet, legible central text column. Density 4, variance 4, motion 6. The couple's saved composition determines every botanical position; preserve all supplied sizes and rotations. Opaque pale mauve stationery with a nested fine gold frame and softly diffused burgundy shadow.

## 2. Color Palette & Roles
- Pale mauve (#F8F5FB): continuous canvas and soft text protection.
- Burgundy ink (#422036): readable copy and primary action.
- Antique gold (#C5A059): discreet accent, focus and ornaments.
- Royal blue and olive green: natural botanical asset colors, never neon interface accents.

## 3. Typography Rules
Imperial Script for Liza and Zakaria, Montserrat for all other copy. French text, uppercase family surnames. Equal space around ET. Body minimum 14px on phones. Names remain the strongest hierarchy.

## 4. Component Stylings
One burgundy pill CTA with inset highlight and enclosed arrow. Clearly labeled form inputs. Botanical images use subtle burgundy ambient shadows, realistic material highlights supplied by the image, and no flat SVG foliage.

## 5. Layout Principles
Mobile first, one column, no horizontal overflow. Floral coordinates are percentages of the hero; sizes are percentages of canvas width. Copy sits on an opaque card above decoration; leaves and flowers remain outside the readable surface. Preserve the user-approved centered invitation rather than imposing a split hero.

## 6. Motion & Interaction
Slow individually phased botanical breathing via transform only. Custom cubic-bezier interpolation, restrained button press feedback, reduced-motion support. Pause botanical movement outside the viewport. No large scrolling blur or animated layout dimensions.

## 7. Anti-Patterns
No stems, flat geometric leaves, neon glows, generic cards, English placeholder copy, crowded letterforms, oversized gaps or horizontal scrolling. Never replace the couple's composition with arbitrary placement.
