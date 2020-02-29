
// Main wrapper for JS functions!

// DOM element caches!
var verbInputEl;
var tenseInputEl;

var yoEl;
var túEl;
var ustedEl;
var nosEl;
var vosEl;
var ustedesEl;

function cacheDOMElements() {
	
	verbInputEl = document.getElementById("verbInput");
	tenseInputEl = document.getElementById("tenseInput");
	
	yoEl = document.getElementById("yo");
	túEl = document.getElementById("tú");
	ustedEl = document.getElementById("usted");
	nosEl = document.getElementById("nos");
	vosEl = document.getElementById("vos");
	ustedesEl = document.getElementById("ustedes");
}

document.addEventListener("DOMContentLoaded", function(event) {	
	cacheDOMElements();
});

function conjugateVerb() {
	
	var verb = verbInputEl.value;
	var tense = tenseInputEl.value;
	
	yoEl.innerHTML = conj(verb, 0, tense);
	túEl.innerHTML = conj(verb, 1, tense);
	ustedEl.innerHTML = conj(verb, 2, tense);
	nosEl.innerHTML = conj(verb, 3, tense);
	vosEl.innerHTML = conj(verb, 4, tense);
	ustedesEl.innerHTML = conj(verb, 5, tense);
}