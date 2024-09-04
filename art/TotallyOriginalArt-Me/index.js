/*
@title: 2D Light With Walls
@author: Will Kuster
@snapshot: snapshot1.png
*/

let w = 125;
let h = 125;

setDocDimensions(w, h);

let linesToDraw = [];
let points = [
  [62.5, 62.5]
];
let walls = [
  [53, 30, 92, 30],
  [100, 100, 90, 110],
  [20, 60, 30, 90]
];
let range = 18;
let iter = 1;

let length = walls.length;
for (let i = 0; i < length; i++) {
  walls.push([walls[i][0], walls[i][1] + 1, walls[i][2], walls[i][3] + 1]);
  walls.push([walls[i][0] + 1, walls[i][1], walls[i][2] + 1, walls[i][3]]);
}


for (let y = 0; y < h; y += iter) {
  for (let x = 0; x < w; x += iter) {

    let light = 0;
    for (let point = 0; point < points.length; point++) {
      let a = x - points[point][0];
      let b = y - points[point][1];
      let c = Math.sqrt(a * a + b * b);
      let dist = c / range;
      if (dist < 5) {
        let wallc = false;
        for (let w = 0; w < walls.length; w++) {
          if (intersects(x, y, points[point][0], points[point][1], walls[w][0], walls[w][1], walls[w][2], walls[w][3])) {
            wallc = true;
          }
        }
        if (!wallc) {
          light += 5 - dist;
        }
      }
    }
    if (light > 5) {
      light = 5;
    }

    let box = [];
    for (let x_ = 0; x_ < iter; x_ += iter / (5 - (light))) {
      box.push([x + x_, y]);
      box.push([x + x_, y + iter]);
    }
    box.push([x + iter, y]);
    linesToDraw.push(box);


  }
}

// draw it
drawLines(linesToDraw);

function intersects(a, b, c, d, p, q, r, s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};