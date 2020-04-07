

// Global variables first!
var locations;
var locJSON;
var mapWidth;
var mapHeight;
var img;
var scale;
var data;
var ans;
var dataTable;
var totalDays;
var totalCountries;
var mostRecent;

function preload() {
    
    var imgUrl = "./data/equirectangular.png";
    img = loadImage(imgUrl);
    
    dataTable = loadTable("./data/total_cases.csv", "csv");
}

function setup() {
    
    scale = 6;
    mapWidth = 360 * scale;
    mapHeight = 180 * scale;
    
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
    
    // slider.position(50, 180 * scale + 50);
    // slider.style("width", width - 20);
    
    createCanvas(mapWidth, mapHeight);
}


function draw() {
    
    background(255);
    
    noFill();
    stroke(0);
    image(img, 1, 1);
    
    if (frameCount == 0) {
        text("If this JavaScript isn't working, try reloading the page.", 40, height - 20);
    }
    
    rect(1, 1, width - 2, height - 2);
    
    fill(255, 0, 0, 64);
    noStroke();
    
    var day = (frameCount / 50);
    
    for (var i = 2; i < totalCountries + 2; i++) {
        var code = dataTable.getString(0, i);
        
        var cases = countCases(i, day);
        cases = Math.pow(log(cases), 3) * 100;
        
        var country = locJSON[code];        
        var x = country[1][1] * scale - scale * 61/6 + mapWidth / 2;
        var y = scale * 2/3 + -country[1][0] * scale + mapHeight / 2;
        
        ellipse(x, y, cases / 1000);
    }
    
    fill(0);
    textSize(64);
    textAlign(LEFT, BOTTOM);
    text("Day " + nfc(day, 2), 40, height - 20);
    text("Total: " + nfc(dataTable.getString(Math.floor(day), 1)), 400, height - 20);
    
    if (day >= totalDays) {
        noLoop();
    }
}


function countCases(i, day) {
    
    if (day < 0) {
        return -1;
    }
    
    if (day >= totalDays - 1) {
        return dataTable.getString(totalDays, i);
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
