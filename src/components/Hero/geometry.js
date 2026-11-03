// Polygon helpers for the hero collage.
// Points are [x, y] pairs in CSS pixels, y pointing down.

const fmt = (n) => Math.round(n * 100) / 100;

function signedArea(points) {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}

// Moves every edge of a simple polygon inwards by `distance` and returns the
// new vertices (the intersections of neighbouring offset edges).
export function insetPolygon(points, distance) {
  const n = points.length;
  const winding = signedArea(points) >= 0 ? 1 : -1;

  const edges = points.map((p, i) => {
    const q = points[(i + 1) % n];
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const length = Math.hypot(dx, dy) || 1;
    const nx = (-dy / length) * winding;
    const ny = (dx / length) * winding;
    return { x: p[0] + nx * distance, y: p[1] + ny * distance, dx, dy };
  });

  return points.map((_, i) => {
    const a = edges[(i - 1 + n) % n]; // edge arriving at this vertex
    const b = edges[i]; // edge leaving it
    const cross = a.dx * b.dy - a.dy * b.dx;
    if (Math.abs(cross) < 1e-9) return [b.x, b.y];
    const t = ((b.x - a.x) * b.dy - (b.y - a.y) * b.dx) / cross;
    return [a.x + a.dx * t, a.y + a.dy * t];
  });
}

export function boundingBox(points) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  return {
    left: Math.min(...xs),
    top: Math.min(...ys),
    right: Math.max(...xs),
    bottom: Math.max(...ys),
  };
}

// SVG path for a polygon with every corner rounded by a circular arc.
// `originX` / `originY` are subtracted so the path can be expressed in the
// coordinate space of the element it clips. Works for convex and concave
// corners; the radius shrinks automatically where an edge is too short.
export function roundedPath(points, radius, originX = 0, originY = 0) {
  const n = points.length;
  const segments = [];

  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const corner = points[i];
    const next = points[(i + 1) % n];

    const toPrev = [prev[0] - corner[0], prev[1] - corner[1]];
    const toNext = [next[0] - corner[0], next[1] - corner[1]];
    const lenPrev = Math.hypot(toPrev[0], toPrev[1]);
    const lenNext = Math.hypot(toNext[0], toNext[1]);

    const cos = (toPrev[0] * toNext[0] + toPrev[1] * toNext[1]) / (lenPrev * lenNext);
    const tanHalf = Math.tan(Math.acos(Math.min(1, Math.max(-1, cos))) / 2);

    // Distance from the corner to where the arc touches each edge.
    const tangent = Math.min(radius / tanHalf, lenPrev / 2, lenNext / 2);
    const r = fmt(tangent * tanHalf);

    const startX = fmt(corner[0] + (toPrev[0] / lenPrev) * tangent - originX);
    const startY = fmt(corner[1] + (toPrev[1] / lenPrev) * tangent - originY);
    const endX = fmt(corner[0] + (toNext[0] / lenNext) * tangent - originX);
    const endY = fmt(corner[1] + (toNext[1] / lenNext) * tangent - originY);

    // Right turns sweep clockwise, left turns (concave corners) the other way.
    const turn = -toPrev[0] * toNext[1] + toPrev[1] * toNext[0];
    const sweep = turn > 0 ? 1 : 0;

    segments.push(`${i === 0 ? 'M' : 'L'}${startX} ${startY}A${r} ${r} 0 0 ${sweep} ${endX} ${endY}`);
  }

  return `${segments.join('')}Z`;
}
