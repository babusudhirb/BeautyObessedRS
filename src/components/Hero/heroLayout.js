import { boundingBox, insetPolygon, roundedPath } from './geometry.js';

// Below this stage width the collage switches to the stacked "compact"
// arrangement. Keep in sync with the @container query in Hero.css.
export const COMPACT_BELOW = 900;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function toPanel(points, gap, radius) {
  const shape = insetPolygon(points, gap / 2);
  const bounds = boundingBox(shape);
  const left = Math.floor(bounds.left);
  const top = Math.floor(bounds.top);

  return {
    box: {
      left,
      top,
      width: Math.ceil(bounds.right) - left,
      height: Math.ceil(bounds.bottom) - top,
    },
    clipPath: `path("${roundedPath(shape, radius, left, top)}")`,
  };
}

// Neighbouring panels are described with shared vertices, then each one is
// inset by half the gap. That leaves the same gutter along straight and
// diagonal seams. The stage is stretched by half a gap first so the outer
// edges of the collage stay flush with the container.
function buildPanels(shapes, width, height, gap, radius) {
  const scaleX = (width + gap) / width;
  const scaleY = (height + gap) / height;
  const stretch = ([x, y]) => [x * scaleX - gap / 2, y * scaleY - gap / 2];

  return Object.fromEntries(
    Object.entries(shapes).map(([name, points]) => [name, toPanel(points.map(stretch), gap, radius)]),
  );
}

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// Desktop / laptop: the interlocking four-panel collage from the reference.
// Coordinates are fractions of the stage, measured from the reference artwork.
function collageLayout(width, height, titleHeight, available) {
  const gap = width >= 1200 ? 10 : 8;
  const radius = clamp(width * 0.019, 16, 28);
  const at = (x, y) => [x * width, y * height];

  const topSplit = at(0.544, 0); // title | portrait along the top edge
  const notch = at(0.485, 0.35); // the portrait's left point, pressed into the title
  const hub = at(0.691, 0.655); // where portrait, salon and e-book meet
  const titleTip = lerp(notch, hub, 0.57); // the title's lower-right point, on the portrait edge
  const titleDip = at(0.357, 0.638); // lowest point of the title panel
  const leftSplit = at(0, 0.52); // title | salon on the left edge
  const rightSplit = at(1, 0.515); // portrait | e-book on the right edge
  const bottomSplit = at(0.642, 1); // salon | e-book along the bottom edge

  const shapes = {
    title: [at(0, 0), topSplit, notch, titleTip, titleDip, leftSplit],
    portrait: [topSplit, at(1, 0), rightSplit, hub, notch],
    salon: [leftSplit, titleDip, titleTip, hub, bottomSplit, at(0, 1)],
    ebook: [hub, rightSplit, at(1, 1), bottomSplit],
  };

  // Keep the collage between 2.3:1 and 1.5:1 so the panels never distort.
  const flattest = width / 2.3;
  const tallest = width / 1.5;

  // The title copy has to clear the panel's lower-left edge (0.53 of the
  // height), so the stage grows if the text ever needs more room.
  const minHeight = Math.max(flattest, titleHeight / 0.53);

  return {
    mode: 'collage',
    panels: buildPanels(shapes, width, height, gap, radius),
    minHeight,
    maxHeight: Math.max(minHeight, tallest),
    // The height the title copy is sized for: what the screen offers, within
    // the ratio limits. It never depends on the title's own height.
    fitHeight: clamp(available || height, flattest, tallest),
  };
}

// Tablet / mobile: title on top at its natural height, then portrait beside
// the e-book, then the salon as a full-width strip. The seams keep a gentle
// slant so the panels still read as one collage.
function compactLayout(width, height, titleHeight) {
  const small = width < 520;
  const gap = small ? 8 : 10;
  const radius = small ? 16 : 22;
  const slant = Math.round(width * 0.034);

  const titleBottom = clamp(titleHeight, 0, Math.max(0, height - 240));
  const rest = height - titleBottom;
  const rowSplit = titleBottom + rest * 0.48; // portrait/e-book row | salon strip
  const splitTop = 0.6; // portrait | e-book seam, top and bottom
  const splitBottom = 0.52;

  const titleLeft = [0, titleBottom + slant];
  const titleRight = [width, titleBottom];
  const seamTop = [width * splitTop, titleBottom + slant * (1 - splitTop)];
  const rowLeft = [0, rowSplit];
  const rowRight = [width, rowSplit + slant];
  const seamBottom = [width * splitBottom, rowSplit + slant * splitBottom];

  const shapes = {
    title: [[0, 0], [width, 0], titleRight, titleLeft],
    portrait: [titleLeft, seamTop, seamBottom, rowLeft],
    ebook: [seamTop, titleRight, rowRight, seamBottom],
    salon: [rowLeft, rowRight, [width, height], [0, height]],
  };

  // Room for the three image panels below the title.
  const minRest = clamp(width * 0.74, 390, 560);
  const maxRest = Math.max(minRest, Math.min(width * 1.32, 720));

  return {
    mode: 'compact',
    panels: buildPanels(shapes, width, height, gap, radius),
    minHeight: titleHeight + minRest,
    maxHeight: titleHeight + maxRest,
    fitHeight: height,
  };
}

// Returns the box and clip path of each hero panel for a stage of the given
// size, plus the height range the stage should stay within. `available` is
// the height the first screen offers below the navbar.
export function computeHeroLayout({ width, height, titleHeight, available }) {
  if (!width || !height) return null;

  return width < COMPACT_BELOW
    ? compactLayout(width, height, titleHeight)
    : collageLayout(width, height, titleHeight, available);
}
