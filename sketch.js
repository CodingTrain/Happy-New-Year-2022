let viewerData;
let cities;
let cityLookup = {};

const mappa = new Mappa("Leaflet");
let trainMap;
let canvas;

let viewers = [];
let fireworks = [];

let viewerIndex = 0;

const options = {
  lat: 0,
  lng: 0,
  zoom: 1,
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
};

function preload() {
  // youtubeData = loadTable("subscribers_geo.csv", "header");
  // youtubeData = loadTable('watch_time_geo.csv', 'header');
  viewerData = loadTable("data/viewers-2.csv", "header");
  cities = loadJSON("data/cities.json");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  trainMap = mappa.tileMap(options);
  trainMap.overlay(canvas);

  //console.log(cities);
  for (let city of cities.cities) {
    let name = city.name.toLowerCase();
    cityLookup[name] = city;
  }

  for (let row of viewerData.rows) {
    let city = row.get("City").toLowerCase();
    let data = cityLookup[city];
    if (!data) {
      console.log(city);
    } else {
      viewers.push(data);
    }
  }

  viewers.sort((a, b) => {
    return Number(b.lng) - Number(a.lng);
  });
}

function draw() {
  let viewer = viewers[viewerIndex];
  if (random(1) < 0.5) {
    const v = p5.Vector.random2D();
    v.mult(random(2, 10));
    const pix = trainMap.latLngToPixel(viewer.lat, viewer.lng);
    fireworks.push(
      new Firework(pix.x + v.x, pix.y + v.y, viewer.name, pix.x, pix.y)
    );
  }
  if (frameCount % 10 === 0) {
    viewerIndex = (viewerIndex + 1) % viewers.length;
  }

  clear();
  // randomSeed(5);
  // for (let viewer of viewers) {
  //   const pix = trainMap.latLngToPixel(viewer.lat, viewer.lng);
  //   fill(255, 0, 255, 100);
  //   noStroke();
  //   const zoom = trainMap.zoom();
  //   const scl = pow(2, zoom);
  //   ellipse(pix.x + random(-5, 5), pix.y + random(-5, 5), 2 * scl);
  // }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
