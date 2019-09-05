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

var request = new XMLHttpRequest()

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
        stroke(28, 195, 2);
        rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);

        var positionX = objects[i].x * width;
        var widthRectangle = objects[i].w * width;
        var positionY = objects[i].y * height;
        var heightRectangle = objects[i].h * height;

        var circleCenterX = positionX + (widthRectangle / 2);
        var circleCenterY = positionY + (heightRectangle / 2);
        var radius = Math.sqrt(Math.pow(widthRectangle, 2) + Math.pow(heightRectangle, 2));

        var n = 7;

        var thickness = radius / n;
        var radiusBlur = (n + 1) * radius / n;

        strokeWeight(thickness);
        stroke(28, 195, 2);
        noFill();

        arc(circleCenterX, circleCenterY, radiusBlur, radiusBlur, 0, TWO_PI);

        var initX = circleCenterX;
        var initY = positionY - (radius / 4);
        var endX = initX + (radiusBlur / 2);
        var endY = initY - (thickness / 2);

        stroke(235, 211, 1);
        strokeWeight(5);
        // name
        line(initX, initY, endX, endY);
        strokeWeight(1);
        text('INGREDIENTE: ' + objects[i].name, endX + 10, endY);
        strokeWeight(5);

        // calories
        line(initX + radius / (n - 2), initY + 1 * thickness / 2, endX + radius / (n - 2), endY + 2 * thickness / 2);
        strokeWeight(1);
        text('CALORÍAS: ' + objects[i].calories, endX + radius / (n - 2) + 10, endY + 2 * thickness / 2);
        strokeWeight(5);

        // satured_fat
        line(initX + radius / (n - 4.5), initY + 3 * thickness / 2, endX + radius / (n - 4.5), endY + 4 * thickness / 2);
        strokeWeight(1);
        text('GRASAS SATURADAS: ' + objects[i].satured_fat, endX + radius / (n - 4.5) + 10, endY + 4 * thickness / 2);
        strokeWeight(5);

        // carbohydrates
        line(initX + radius / (n - 5), initY + 5 * thickness / 2, endX + radius / (n - 5), endY + 6 * thickness / 2);
        strokeWeight(1);
        text('CARBOHIDRATOS: ' + objects[i].carbohydrates, endX + radius / (n - 5) + 10, endY + 6 * thickness / 2);
        strokeWeight(5);

        // sugar
        line(initX + radius / (n - 5.25), initY + 7 * thickness / 2, endX + radius / (n - 5.25), endY + 8 * thickness / 2);
        strokeWeight(1);
        text('AZÚCAR: ' + objects[i].sugar, endX + radius / (n - 5.25) + 10, endY + 8 * thickness / 2);
        strokeWeight(5);
    }
}

function startDetecting() {
    console.log('MODEL LOADED');
    detect();
}

function detect() {
    yolo.detect(function(err, results) {
        console.log('help');

        request.open('GET', 'https://smart-kitchen-upc.herokuapp.com/api/ingredients/Vainitas', true)
        request.onload = function() {
            var data = JSON.parse(this.response)
            if (request.status >= 200 && request.status < 400) {
                myarray = [];
                object1 = {
                    x: 0.2,
                    y: 0.3,
                    w: 0.15,
                    h: 0.23,
                    name: "fresh green beans",
                    calories: data.calories,
                    satured_fat: data.satured_fat,
                    carbohydrates: data.carbohydrates,
                    sugar: data.sugar
                }
                myarray.push(object1)
                objects = myarray;
                console.log("data: ", data)
            } else {
                console.log("error: ", "Error getting data from API")
            }
        }
        request.send()
        detect();
    });
}