
// Main wrapper for JS functions!

// DOM element caches!
var verbInputEl;
var tenseInputEl;
var aboutInfoDivEl;
var creditsInfoDivEl;

var yoEl;
var túEl;
var ustedEl;
var nosEl;
var vosEl;
var ustedesEl;

function cacheDOMElements() {
	
	verbInputEl = document.getElementById("verbInput");
	tenseInputEl = document.getElementById("tenseInput");
	aboutInfoDivEl = document.getElementById("aboutInfoDiv");
	creditsInfoDivEl = document.getElementById("creditsInfoDiv");
	
	yoEl = document.getElementById("yo");
	túEl = document.getElementById("tú");
	ustedEl = document.getElementById("usted");
	nosEl = document.getElementById("nos");
	vosEl = document.getElementById("vos");
	ustedesEl = document.getElementById("ustedes");
}

$(function(event) {	
	cacheDOMElements();
});

$(document).keypress(function(e) {
	if (e.which == 13) {
		conjugateVerb();
	}
});

function collapseAboutInfo() {
	aboutInfoDivEl.hidden = !aboutInfoDivEl.hidden;
}

function collapseCreditsInfo() {
	creditsInfoDivEl.hidden = !creditsInfoDivEl.hidden;
}

function conjugateVerb() {
	
	var verb = verbInputEl.value;
	var tense = tenseInputEl.value;
	
	if (conj(verb, 0, tense) == null) {
		return;
	}
	
	yoEl.innerHTML = conj(verb, 0, tense);
	túEl.innerHTML = conj(verb, 1, tense);
	ustedEl.innerHTML = conj(verb, 2, tense);
	nosEl.innerHTML = conj(verb, 3, tense);
	vosEl.innerHTML = conj(verb, 4, tense);
	ustedesEl.innerHTML = conj(verb, 5, tense);
}