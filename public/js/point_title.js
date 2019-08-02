// class PointTitle {
//   constructor(selector) {
//
//   }
// }
//
// let font;
// function preload() {
//   font = loadFont('css/Grenze-Bold.ttf');
// }
//
// let points;
// let bounds;
// function setup() {
//   createCanvas(window.width, window.height);
//   stroke(0);
//   // fill(255, 104, 204);
//   noFill()
//
//   points = font.textToPoints('p5', 0, 0, 10, {
//     sampleFactor: 5,
//     simplifyThreshold: 0
//   });
//   bounds = font.textBounds(' p5 ', 0, 0, 10);
// }
//
// function draw() {
//   background(255,255,255,0);
//   clear();
//   beginShape();
//   translate(-bounds.x * width / bounds.w, -bounds.y * height / bounds.h);
//   for (let i = 0; i < points.length; i++) {
//     let p = points[i];
//     vertex(
//       p.x * width / bounds.w +
//         sin(20 * p.y / bounds.h + millis() / 1000) * width / 30,
//       p.y * height / bounds.h
//     );
//   }
//   endShape(CLOSE);
// }


// class PointTitle {
//   constructor(selector) {
//
//   }
// }

let font;
function preload() {
  font = loadFont('css/Grenze-Bold.ttf');
}

let points;
let bounds;
let g = 1;
function setup() {
  var canvas = createCanvas(windowWidth - 40, windowHeight - 40);
  canvas.parent('i_love_that_header')
  stroke(0);
  // fill(255, 255, 204);
  noFill();
  mouseMoved();
  points = font.textToPoints('M a r i n  L e  M a i g n a n', 0, 0, 1, {
    sampleFactor: 25,
    simplifyThreshold: 0
  });
  bounds = font.textBounds('M a r i n  L e  M a i g n a n', 0, 0, 1);
}

function draw() {
  noLoop();
  clear();
  background(0,0,0,0);
  // beginShape();
  // translate(-bounds.x * width / bounds.w , -bounds.y * height / bounds.h);
  scale(0.5)
  translate(windowWidth/2, windowHeight);


  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    fill(255, 255, 255, map(g, 0, 10, 255, 15, true));
    noStroke();
    // debugger;
    ellipse(
      ((p.x * width / bounds.w ) + random(2*g)) ,//+
      //  sin(20 * p.y / bounds.h + millis() / 1000) * width / 30,,
      (p.y * height/2 / bounds.h + random(2*g))/2,
      5 *  map(g, 0, 10, 0.5, 3, true)
    );
    // ellipse(p.x, p.y, 7)
  }
  // endShape(CLOSE);

}

// this function fires with mousewheel movement
// anywhere on screen
function mouseMoved() {
  // g = map(event.delta, 0, 100, 0, 1);
  g = map(winMouseY, 0, height, -10, 10, true)
  console.log(g);
  redraw();
}
