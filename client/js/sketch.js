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
        text(objects[i].name, objects[i].x * width, objects[i].y * height - 5);
        // text('CALORIAS: ' + palta.calories, objects[0].x * width, objects[0].y * height + 20);
        // text('CARBOHIDRATOS: ' + palta.carbohydrates, objects[0].x * width, objects[0].y * height + 50);
        // text('GRASAS SATURADAS: ' + palta.satured_fat, objects[0].x * width, objects[0].y * height + 70);
        // text('AZUCAR: ' + palta.sugar, objects[0].x * width, objects[0].y * height + 90);
        noFill();
        strokeWeight(1);
        stroke(255, 255, 255);
        rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);

        var positionX = objects[i].x * width;
        var widthRectangle = objects[i].w * width;
        var positionY = objects[i].y * height;
        var heightRectangle = objects[i].h * height;

        var circleCenterX = positionX + (widthRectangle / 2);
        var circleCenterY = positionY + (heightRectangle / 2);
        var radius = Math.sqrt(Math.pow(widthRectangle, 2) + Math.pow(heightRectangle, 2));

        var n = 7;

        strokeWeight(radius / n);
        stroke(0, 255, 0);
        noFill();

        radiusBlur = (n + 1) * radius / n;

        arc(circleCenterX, circleCenterY, radiusBlur, radiusBlur, 0, TWO_PI);
    }
}

function startDetecting() {
    console.log('MODEL LOADED');
    detect();
}

function detect() {
    yolo.detect(function(err, results) {
        console.log('help');
        myarray = [];
        object1 = {
            x: 0.2,
            y: 0.3,
            w: 0.15,
            h: 0.23,
            name: "fresh green beans",
            calories: 31,
            satured_fat: 0.05,
            carbohydrates: 6.97,
            sugar: 3.26
        }
        myarray.push(object1)
        objects = myarray;
        detect();
    });
}