

// Global variables first!
var locations;
var locJSON;
var mapWidth;
var mapHeight;
var img;
var mapScale;
var data;
var dataTable;
var deathTable;
var totalDays;
var totalCountries;
var mostRecent;
var startDate;

var day;
var dayMin;
var dayMax;
var dayStep;
var date;

// GUI and camera stuff...:(
var gui;
var cam;
var zoom;
var zooming;
var radii;
var newXs;
var newYs;
var clicked;

function preload() {
    
    var imgUrl = "./data/equirectangular.png";
    img = loadImage(imgUrl);
    
    dataTable = loadTable("./data/total_cases_rewritten.csv", "csv");
}

function setup() {
    
    mapScale = 2;
    mapWidth = 300 * mapScale;
    mapHeight = 180 * mapScale;
    
    createCanvas(mapWidth, mapHeight);
    
    var url = "./data/countries.json";
    locJSON = loadJSON(url);
    
    img.resize(mapWidth, mapHeight);
    
    // Data is organized by date.
    data = {};
    totalDays = dataTable.getRowCount() - 1;
    totalCountries = dataTable.getColumnCount() - 2;
    
    mostRecent = {};
    for (var i = 2; i < totalCountries + 2; i++) {
        mostRecent[i] = -1;
    }
    startDate = new Date(2019, 11, 31);
    
    // GUI?
    day = totalDays - 2;
    dayMin = 0;
    dayMax = totalDays - 2;
    dayStep = 1;
    gui = createGui("Date Slider");
    gui.addGlobals("day");
    gui.setPosition(20, mapHeight + 160);
    
    cam = {x: 0, y: 0};
    // cam = {x: width / 2, y: height / 2};
    zoom = 1;
    zooming = false;
}

function mouseDragged() {
    if (0 <= mouseX && mouseX <= mapWidth && 0 <= mouseY && mouseY <= mapHeight) {
        cam.x += (mouseX - pmouseX) / zoom / 1.41;
        cam.y += (mouseY - pmouseY) / zoom / 1.41;
    }
}

function mouseWheel(event) {
    if (0 <= mouseX && mouseX <= mapWidth && 0 <= mouseY && mouseY <= mapHeight) {
        for (var i = 0; i < 100; i++) {
            zoom *= (1 - event.delta / 100000);
        }
        return false;
    }
}

function mousePressed() {
    clicked = true;
}


function draw() {
    
    background(255);
    push();
    var tX = width / 2;
    var tY = height / 2;
    
    translate(tX, tY);
    scale(zoom);
    translate(cam.x, cam.y);
    
    image(img, -tX, -tY);
    
    if (frameCount == 1) {
        fill(0);
        textSize(32);
        textAlign(LEFT, BOTTOM);
        text("If this JavaScript isn't working, try reloading the page.", 20, height - 20);
    }
    
    var increment = 10;
    date = new Date(startDate.getTime() + day * 24 * 60 * 60000);
    
    radii = [];
    newXs = [];
    newYs = [];
    textAlign(CENTER, CENTER);
    for (var i = 2; i < totalCountries + 2; i++) {
        var code = dataTable.getString(0, i);
        
        var cases = countCases(i, day);
        cases = Math.pow(log(cases), 4) * 4;
        fill(cases, 0, 0, cases / 700);
        
        var country = locJSON[code];        
        var x = -tX + country[1][1] * 300/360 * mapScale - mapScale * 51/6 + mapWidth / 2;
        var y = -tY + mapScale * 2/3 + -country[1][0] * mapScale + mapHeight / 2;
        var r = cases / 1000 / zoom;
        
        var newX = (x + cam.x) * zoom + tX;
        var newY = (y + cam.y) * zoom + tY;
        
        radii.push(cases / 1000);
        newXs.push(newX);
        newYs.push(newY);
        
        
        noStroke();
        strokeWeight(1 / zoom);
        if (abs(mouseX - newX) < cases / 2000 && abs(mouseY - newY) < cases / 2000) {
            fill(cases, 0, 0, 32);
            rect(x - r / 2, y - r / 2, r, r);
            
            fill(0);
            noStroke();
            textSize(pow(log(cases), 2) / 5 / zoom);
            text(country[0] + "\n" + nfc(countCases(i, day)), x, y);
            
        } else {
            rect(x - r / 2, y - r / 2, r, r);
        }
        
        // ellipse(x, y, r);
    }
    pop();
    
    fill(0, 0);
    for (var j = 0; j < newXs.length; j++) {
        ellipse(newXs[j], newYs[j], radii[j]);
    }
    
    noFill();
    stroke(0);
    rect(1, 1, width - 2, height - 2);
    
    line(width / 2 - 10, height / 2, width / 2 + 10, height / 2);
    line(width / 2, height / 2 - 10, width / 2, height / 2 + 10);
    
    fill(0);
    noStroke();
    textSize(24);
    textFont("Helvetica");
    textAlign(LEFT, BOTTOM);
    text("Day " + nfc(day, 0), 20, height - 10);
    
    textAlign(LEFT, TOP);
    text(date.toDateString().substring(4), 20, 20);
    
    textAlign(RIGHT, BOTTOM);
    text("Total: " + nfc(dataTable.getString(Math.floor(day), 1)), width - 20, height - 10);
    
}


function countCases(i, day) {
    
    day = parseInt(day);
    
    if (day < 0) {
        return -1;
    }
    
    var base = Math.floor(day);
    var a = parseInt(dataTable.getString(base, i));
    var b = parseInt(dataTable.getString(base + 1, i));
    
    if (!b && !a) {
        if (mostRecent[i] == -1) {
            return 0;
        }
        return mostRecent[i];
    }
    
    if (!b && a) {
        mostRecent[i] = a;
        return a;
    }
    
    if (b && !a) {
        a = mostRecent[i];
    }
    
    return a + (b - a) * (day - base);
}
