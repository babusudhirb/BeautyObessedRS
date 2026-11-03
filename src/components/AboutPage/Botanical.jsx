// Fine line-art sprigs drawn in currentColor, for the About page's gold
// botanical details. Purely decorative, so hidden from assistive technology.

// One leaf, pointing right from its stem end at (0, 0), with a midrib.
const LEAF = 'M0 0 C 12 -13 40 -15 58 0 C 40 15 12 13 0 0 Z M2 0 C 20 -1 38 -1 54 0';

// Leaf positions along the stem: [x, y, angle in degrees, scale].
const BRANCH_LEAVES = [
  [99, 352, -150, 1],
  [100, 322, -28, 0.95],
  [98, 282, -158, 1.05],
  [101, 248, -22, 1],
  [99, 206, -150, 0.95],
  [103, 172, -30, 0.9],
  [104, 132, -148, 0.85],
  [108, 100, -34, 0.8],
  [111, 66, -140, 0.7],
  [115, 40, -40, 0.62],
];

export function Branch({ className = '' }) {
  return (
    <svg className={`ab-botanical ${className}`.trim()} viewBox="0 0 220 400" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M98 400 C 94 330 104 260 98 190 S 110 60 124 6" />
        {BRANCH_LEAVES.map(([x, y, angle, scale]) => (
          <path key={`${x}-${y}`} d={LEAF} transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`} />
        ))}
        <circle cx="124" cy="6" r="2.4" />
      </g>
    </svg>
  );
}

// A low, spreading spray for corners and bands.
const SPRAY_LEAVES = [
  [40, 150, -70, 0.9],
  [66, 118, -105, 0.8],
  [96, 104, -55, 0.95],
  [130, 92, -100, 0.75],
  [160, 88, -40, 0.85],
  [196, 92, -80, 0.7],
  [226, 104, -20, 0.8],
];

export function Spray({ className = '' }) {
  return (
    <svg className={`ab-botanical ${className}`.trim()} viewBox="0 0 280 170" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 168 C 60 120 130 86 270 110" />
        {SPRAY_LEAVES.map(([x, y, angle, scale]) => (
          <path key={`${x}-${y}`} d={LEAF} transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`} />
        ))}
        <circle cx="270" cy="110" r="2.2" />
      </g>
    </svg>
  );
}
