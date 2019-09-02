let video;
let yolo;
let angle = 0;
let start;
let end;
// let background;
let objects = [];

let info = [];

let beterraga;
let papa_rosada;
let zanahoria;
let arverjas;
let huevo;
let vainitas;
let aji_amarillo;
let palta;

function setup() {
    var canvas = createCanvas(1600, 900);
    video = createCapture(VIDEO);
    video.size(80, 45);

    yolo = ml5.YOLO(video, startDetecting);

    video.hide();
    //angleMode(DEGREES);
}

function draw() {


    // if (!palta) { return };
    // clear();

    image(video, 0, 0, width, height);
    // background(0);
    for (let i = 0; i < objects.length; i++) {
        noStroke();
        fill(255, 255, 255);
        text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
        // text('CALORIAS: ' + palta.calories, objects[0].x * width, objects[0].y * height + 20);
        // text('CARBOHIDRATOS: ' + palta.carbohydrates, objects[0].x * width, objects[0].y * height + 50);
        // text('GRASAS SATURADAS: ' + palta.satured_fat, objects[0].x * width, objects[0].y * height + 70);
        // text('AZUCAR: ' + palta.sugar, objects[0].x * width, objects[0].y * height + 90);
        noFill();
        strokeWeight(1);
        stroke(255, 255, 255);
        rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
        strokeWeight(1);
        stroke(0, 255, 0);
        noFill();
        var x = parseFloat(objects[i].x);
        var w = parseFloat(objects[i].w / 2);
        var y = parseFloat(objects[i].y);
        var h = parseFloat(objects[i].h / 2);
        var centerX = parseFloat(x + w);
        var centerY = parseFloat(y + h);
        // console.log(centerX);
        // console.log(centerY);
        start = centerX * width;
        end = centerY * height;
        aux = Math.pow(objects[i].w * width, 2) + Math.pow(objects[i].h * height, 2);
        radius = Math.sqrt(aux);
        // console.log(start, end, radius);
        // arc(start, end, objects[0].w * width, objects[0].h * height, 0, TWO_PI);
        arc(start, end, radius, radius, 0, TWO_PI);
    }
}

function startDetecting() {
    console.log('MODEL LOADED');
    detect();
}

function detect() {
    yolo.detect(function(err, results) {
        console.log('help');
        objects = results;
        detect();
    });
}