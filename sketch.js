var song;
var playTime, loadTime;
var amp, level;
var bgcolor;
var fft;

function preload() {
  song = loadSound("song.mp3");
}

function setup() {
  createCanvas(800, 600);
userStartAudio();
  if (song.isLoaded()) {
    loadTime = millis();
    print(loadTime);
    song.play();
  }

  amp = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(255);
  noStroke();
  playTime = millis() - loadTime;
  // print(playTime);
  level = amp.getLevel();
  // print(level);

  mappedColor = map(level, 0, 1, 0, 255);

  cSize = map(level, 0, 1, 0, width);

  let lerping = lerpColor(color("red"), color("maroon"), level)
  // fill(lerping);


  // strokeWidth(10);
  if (playTime > 6000) {
    for (var i = 0; i < width; i++) {
      // grad1 = lerpColor(color("yellow"), color("orange"), map(i, 0, width, 0, 1));
      grad1 = lerpColor(color("yellow"), color("orange"), level);
      stroke(grad1);
      line(i, 0, i, height);
    }
  }

  fill(0);
  // background(mappedColor);
  circle(width / 2, height / 2, cSize);

  var spectrum = fft.analyze();
  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");


  strokeWeight(20);
  stroke(100,0,100);
  line(10,0,trebleVol,800);
  line(200,0,midVol,800);
  line(400,0,bassVol,800);
  stroke(250,0,0);
  line(30,0,trebleVol,800);
  line(600,0,midVol,800);
  line(800,0,bassVol,800);
  stroke(30,100,250);
  line(60,0,trebleVol,800);
  line(300,0,midVol,800);
  line(500,0,bassVol,800);


}