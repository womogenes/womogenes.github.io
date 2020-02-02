
// Yoy! 
var cranes = 0;
var unsoldCranes = 0;
var funds = 0;
var cranePrice = 0.25;
var marketingPrice = 20.00;
var paperPrice = 20;
var paperAmount = 1000;
var paper = paperAmount;
var marketingLevel = 1;
var highSchoolers = 0;
var minWage = 0.1;
var highSchoolerBoost = 1;
var debt = 0;
var maxDebt = 1e3;
var interestRate = 0.01;

var jos = 0;
var joCost = 100;
var basePaperPrice = 15;
var blinkCounter = 0;
var paperBuyerOn = false;

var bankUnlocked = false;
var joUnlocked = false;
var wishUnlocked = false;
var paperBuyerUnlocked = false;

var prevCranes = cranes;
var tick = 0;
var prevTimer = Date.now();

// DOM Elements.
var paperEl;
var cranesEl;
var btnMakeCraneEl;
var btnLowerPriceEl;
var btnBuyPaperEl;
var btnMarketingEl;
var btnHireHighSchoolerEl;
var highSchoolersEl;
var cranePriceEl;
var unsoldCranesEl;
var fundsEl;
var marketingPriceEl;
var marketingLevelEl;
var demandEl;
var cranemakerRateEl;
var readoutDivEl;
var highSchoolerWageEl;
var paperPriceEl;
var projectsColumnEl;
var projectsDivEl;
var bankDivEl;
var debtEl;
var btnPayBackEl;
var btnBorrowMoneyEl;
var interestRateEl;

var joDivEl;
var btnHireJoEl;
var josEl;
var joCostEl;
var column0DivEl;
var wishEl;
var paperBuyerDivEl;
var paperBuyerEl;

function save() {
	var save = {
		cranes: cranes, 
		unsoldCranes: unsoldCranes, 
		funds: funds, 
		cranePrice: cranePrice, 
		marketingPrice: marketingPrice, 
		paperPrice: paperPrice, 
		paperAmount: paperAmount, 
		paper: paper, 
		marketingLevel: marketingLevel, 
		highSchoolers: highSchoolers, 
		minWage: minWage,
		highSchoolerBoost: highSchoolerBoost,
		debt: debt,
		maxDebt: maxDebt,
		interestRate: interestRate,
		
		jos: jos,
		joCost: joCost,
		basePaperPrice: basePaperPrice,
		blinkCounter: blinkCounter,
		paperBuyerOn: paperBuyerOn,
		
		bankUnlocked: bankUnlocked,
		joUnlocked: joUnlocked,
		wishUnlocked: wishUnlocked,
		paperBuyerUnlocked: paperBuyerUnlocked
	}
	
	var savedProjectUses = [];
	var savedProjectFlags = [];
	var savedActiveProjects = [];
	
	for (var i = 0; i < projects.length; i++) {
		savedProjectUses[i] = projects[i].uses;
		savedProjectFlags[i] = projects[i].flag;
	}
	
	for (var i = 0; i < activeProjects.length; i++) {
		savedActiveProjects[i] = activeProjects[i].id;
	}
	
	localStorage.setItem("savedGame", JSON.stringify(save));
	localStorage.setItem("savedProjectUses", JSON.stringify(savedProjectUses));
	localStorage.setItem("savedProjectFlags", JSON.stringify(savedProjectFlags));
	localStorage.setItem("savedActiveProjects", JSON.stringify(savedActiveProjects));
}

// Saving! 
function load() {
	if (localStorage.getItem("savedGame") != null) {	
		var savedGame = JSON.parse(localStorage.getItem("savedGame"));
		cranes = savedGame.cranes;
		unsoldCranes = savedGame.unsoldCranes;
		funds = savedGame.funds;
		cranePrice = savedGame.cranePrice;
		marketingPrice = savedGame.marketingPrice;
		paperPrice = savedGame.paperPrice;
		paperAmount = savedGame.paperAmount;
		paper = savedGame.paper;
		marketingLevel = savedGame.marketingLevel;
		highSchoolers = savedGame.highSchoolers;	
		minWage = savedGame.minWage;
		highSchoolerBoost = savedGame.highSchoolerBoost;
		debt = savedGame.debt;
		maxDebt = savedGame.maxDebt;
		interestRate = savedGame.interestRate;
		
		jos = savedGame.jos;
		joCost = savedGame.joCost;
		basePaperPrice = savedGame.basePaperPrice;
		blinkCounter = savedGame.blinkCounter;
		paperBuyerOn = savedGame.paperBuyerOn;
		
		bankUnlocked = savedGame.bankUnlocked;
		joUnlocked = savedGame.joUnlocked;
		wishUnlocked = savedGame.wishUnlocked;
		paperBuyerUnlocked = savedGame.paperBuyerUnlocked;
		
		var loadProjectUses = JSON.parse(localStorage.getItem("savedProjectUses"));
		var loadProjectFlags = JSON.parse(localStorage.getItem("savedProjectFlags"));
		var loadActiveProjects = JSON.parse(localStorage.getItem("savedActiveProjects"));
		
		for (var i = 0; i < projects.length; i++) {
			projects[i].uses = loadProjectUses[i];
			projects[i].flag = loadProjectFlags[i];
		}
		for (var i = 0; i < projects.length; i++) {
			if (loadActiveProjects.indexOf(projects[i].id) >= 0) {			
				displayProjects(projects[i]);
				activeProjects.push(projects[i]);
			}
		}
		
	} else {
		save();
	}
}

// localStorage.clear();

function cacheDOMElements() {
	paperEl = document.getElementById("paper");
	cranesEl = document.getElementById("cranes");
	btnMakeCraneEl = document.getElementById("btnMakeCrane");
	btnLowerPriceEl = document.getElementById("btnLowerPrice");
	btnBuyPaperEl = document.getElementById("btnBuyPaper");
	btnMarketingEl = document.getElementById("btnMarketing");
	btnHireHighSchoolerEl = document.getElementById("btnHireHighSchooler");
	highSchoolersEl = document.getElementById("highSchoolers");
	cranePriceEl = document.getElementById("cranePrice");
	unsoldCranesEl = document.getElementById("unsoldCranes");
	fundsEl = document.getElementById("funds");
	marketingPriceEl = document.getElementById("marketingPrice");
	marketingLevelEl = document.getElementById("marketingLevel");
	demandEl = document.getElementById("demand");
	cranemakerRateEl = document.getElementById("cranemakerRate");
	readoutDivEl = document.getElementById("readoutDiv");
	highSchoolerWageEl = document.getElementById("highSchoolerCost");
	paperPriceEl = document.getElementById("paperPrice");
	projectsColumnEl = document.getElementById("projectsColumn");
	projectsDivEl = document.getElementById("projectsDiv");
	bankDivEl = document.getElementById("bankDiv");
	debtEl = document.getElementById("debt");
	btnPayBackEl = document.getElementById("btnPayBack");
	btnBorrowMoneyEl = document.getElementById("btnBorrowMoney");
	interestRateEl = document.getElementById("interestRate");
	
	joDivEl = document.getElementById("joDiv");
	btnHireJoEl = document.getElementById("btnHireJo");
	josEl = document.getElementById("jos");
	joCostEl = document.getElementById("joCost");
	column0DivEl = document.getElementById("column0");
	wishEl = document.getElementById("wishes");
	paperBuyerDivEl = document.getElementById("paperBuyerDiv");
	paperBuyerEl = document.getElementById("paperBuyer");
	
	load();
}

document.addEventListener("DOMContentLoaded", function(event) {	
	cacheDOMElements();
    btnMakeCraneEl.disabled = false;
    btnLowerPriceEl.disabled = false;
	btnBuyPaperEl.disabled = true;
	btnMarketingEl.disabled = true;
	btnHireHighSchoolerEl.disabled = true;
	bankDivEl.hidden = !bankUnlocked;
	joDivEl.hidden = !joUnlocked;
	column0DivEl.hidden = !wishUnlocked;
	paperBuyerDivEl.hidden = !paperBuyerUnlocked;
	
	paperPriceEl.innerHTML = paperPrice;
	marketingLevelEl.innerHTML = commify(marketingLevel);
	if (paperBuyerOn) {paperBuyerEl.innerHTML = "ON";} else {paperBuyerEl.innerHTML = "OFF";}
	
	// Initial messages. 
	displayMessage("You are a college student.");
	displayMessage("Legend has it you are granted one wish if you create a trillion cranes.");
});

// Game loop! 
window.setInterval(function() {
	var demand = 0.08 / cranePrice * Math.pow(1.1, marketingLevel - 1);
	
	// Buy paper!
	if (paper <= 0 && paperBuyerOn) {
		buyPaper(1);
	}
	
	// Make cranes before selling them.
	makeCrane(highSchoolers / 100);
	makeCrane(jos);

	// Sell cranes.
	if (Math.random() * 10 < demand || cranePrice <= 0.01) {
		var amount = Math.ceil(demand);
		if (cranePrice <= 0.01) {
			amount = Math.ceil(unsoldCranes / 10);
		}
		if (amount > unsoldCranes) {
			amount = unsoldCranes;
			if (unsoldCranes < 0) {
				amount = 0;
			}
		}
		unsoldCranes -= amount;
		funds += cranePrice * amount;
	}
	
	if (debt > maxDebt) {debt = maxDebt;}
	
	btnMakeCraneEl.disabled = paper < 1;
	btnLowerPriceEl.disabled = cranePrice <= 0.01;
	btnBuyPaperEl.disabled = paperPrice > funds;
	btnMarketingEl.disabled = marketingPrice > funds;
	btnHireHighSchoolerEl.disabled = funds < minWage;
	btnPayBackEl.disabled = funds <= 0 || debt <= 0;
	btnBorrowMoneyEl.disabled = debt >= maxDebt;
	btnHireJoEl.disabled = joCost > funds;

	if (!wishUnlocked && cranes >= 1000) {
		wishUnlocked = true;
		column0DivEl.hidden = false;
	}
	
	cranesEl.innerHTML = commify(Math.round(cranes));
	cranePriceEl.innerHTML = monify(cranePrice);
	unsoldCranesEl.innerHTML = commify(Math.floor(unsoldCranes));
	fundsEl.innerHTML = monify(funds);
	marketingPriceEl.innerHTML = monify(marketingPrice);
	demandEl.innerHTML = commify(Math.floor(demand * 100));
	highSchoolersEl.innerHTML = commify(highSchoolers);
	debtEl.innerHTML = monify(debt);
	paperEl.innerHTML = commify(Math.floor(paper));
	interestRateEl.innerHTML = interestRate * 100;
	highSchoolerWageEl.innerHTML = monify(minWage);
	josEl.innerHTML = commify(jos);
	joCostEl.innerHTML = monify(joCost);
	wishEl.innerHTML = commify(Math.floor(cranes / 1000));
	
	manageProjects();
	
	tick++;
	
}, 10);

// A slower one. 
window.setInterval(function() {
	save();
	
	// Fluctuate price. 
	paperPrice = Math.floor(Math.sin(tick / 10) * 4) + 15;
	paperPriceEl.innerHTML = paperPrice;
	
	debt = Math.ceil(debt * (1 + interestRate) * 100) / 100;
	if (debt > maxDebt) {debt = maxDebt;}
	
}, 5000);

// Slower one, every second. 
window.setInterval(function() {
	cranemakerRateEl.innerHTML = commify(Math.round(cranes - prevCranes));
	prevCranes = cranes;
	
}, 1000);

function monify(n) {
	return n.toLocaleString('en', {useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function commify(n) {
	return n.toLocaleString('en', {useGrouping: true})
}

{

var oneToTen = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
    elevenToNineteen = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    multipleOfTen = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    placeValue = ["", " thousand ", " million ", " billion ", " trillion ", " quadrillion ", " quintillion ", " sextillion ", " septillion ", " octillion ", " nonillion ", " decillion ", " undecillion ", " duodecillion ", " tredecillion ", " quattuordecillion ", " quindecillion ", " sexdecillion ", " septendecillion ", " octodecillion ", " novemdecillion  ", " vigintillion ", " unvigintillion ", " duovigintillion ", " trevigintillion ", " quattuorvigintillion ", " quinvigintillion ", " sexvigintillion ", " septenvigintillion ", " octovigintillion ", " novemvigintillion ", " trigintillion ", " untrigintillion ", " duotrigintillion ", " tretrigintillion ", " quattuortrigintillion ", " quintrigintillion ", " sextrigintillion ", " septentrigintillion ", " octotrigintillion ", " novemtrigintillion ", " quadragintillion ", " unquadragintillion ", " duoquadragintillion ", " trequadragintillion ", " quattuorquadragintillion ", " quinquadragintillion ", " sexquadragintillion ", " septenquadragintillion ", " octoquadragintillion ", " novemquadragintillion ", " quinquagintillion ", " unquinquagintillion ", " duoquinquagintillion ", " trequinquagintillion ", " quattuorquinquagintillion ", " quinquinquagintillion ", " sexquinquagintillion ", " septenquinquagintillion ", " octoquinquagintillion ", " novemquinquagintillion ", " sexagintillion ", " unsexagintillion ", " duosexagintillion ", " tresexagintillion ", " quattuorsexagintillion ", " quinsexagintillion ", " sexsexagintillion ", " septsexagintillion ", " octosexagintillion ", " octosexagintillion ", " septuagintillion ", " unseptuagintillion ", " duoseptuagintillion ", " treseptuagintillion ", " quinseptuagintillion", " sexseptuagintillion", " septseptuagintillion", " octoseptuagintillion", " novemseptuagintillion", " octogintillion", " unoctogintillion", " duooctogintillion", " treoctogintillion", " quattuoroctogintillion", " quinoctogintillion", " sexoctogintillion", " septoctogintillion", " octooctogintillion", " novemoctogintillion", " nonagintillion", " unnonagintillion", " duononagintillion", " trenonagintillion ", " quattuornonagintillion ", " quinnonagintillion ", " sexnonagintillion ", " septnonagintillion ", " octononagintillion ", " novemnonagintillion ", " centillion"];
	
}

function spellf(userInput) {
    var numToWorkOn;

    if (userInput < 0) {
        console.log("Error, value less than 0");
        return userInput.toString();
    }

    if (typeof(userInput) == "number" || typeof(userInput) == "string") {
        numToWorkOn = "" + userInput;
    }


    // To check if spell has been called using a Number/String Object:   "123".spell()   123..spell() 
    else if (typeof(this) == "object") {
        numToWorkOn = this.toString();
    } else {
        throw new Error("Invalid Input");
        return;
    }

    if (numToWorkOn.indexOf("e+") !== -1) {
        var splittedExponentNum = numToWorkOn.split("e+"),
            exponent = splittedExponentNum[1],
            str = '';
        if (numToWorkOn.indexOf(".") !== -1) {
            numToWorkOn = splittedExponentNum[0].split(".");
            exponent -= numToWorkOn[1].length;
            numToWorkOn = numToWorkOn.join("");
        } else {
            numToWorkOn = splittedExponentNum[0];
        }
        while (exponent--) {
            str = str + '0';
        }
        numToWorkOn = numToWorkOn + str;
    } else if (numToWorkOn.indexOf(".") !== -1) {
        var splittedDecimal = numToWorkOn.split(".");
        var leftNum = splittedDecimal[0];
        var rightNum = splittedDecimal[1];
        numToWorkOn = leftNum;
    }

    // Put limit check on the program, placevalue map should be increased to increase capacity
    if (numToWorkOn.length >= 303) {
        throw new Error("Number out of bonds!");
        return;
    } else {
        return convertToString(numToWorkOn);
    }

    // Recursie logic to break number into strings of length 3 each and recursively pronounce each
    function convertToString(stringEquivalent) {
        if (stringEquivalent == 0) {
            return '0'
        }

        var result = '',
            unitLookup = 0,
            strLength = stringEquivalent.length;
        for (var k = strLength; k > 0; k = k - 3) {

            if (k - 3 <= 0) {
                var subStr = stringEquivalent.substring(k, k - 3);
                pronounce = pronounceNum(subStr);

                if (pronounce.toUpperCase() != 'zero') {
                    var num = Number(subStr + "." + stringEquivalent.substring(subStr.length, subStr.length + 2));
                    result = formatWithCommas(num, 1) + placeValue[unitLookup] + ' , ' + result;
                }
            }
            unitLookup++;
        }
        // to trim of the extra ", " from last
        return result.substring(0, result.length - 3)
    }

    // Determines the range of input and calls respective function
    function pronounceNum(val) {
        val = parseInt(val);
        if (parseInt(val / 10) == 0) {
            return numLessThan10(val);
        } else if (parseInt(val / 100) == 0) {
            return numLessThan99(val)
        } else
            return numLessThan1000(val);
    }

    // Pronounces any number less than 1000
    function numLessThan1000(val) {
        val = Number(val);
        var hundredPlace = parseInt(val / 100),
            result;
        if (val % 100 == 0) {
            result = oneToTen[hundredPlace] + " hundred ";
        } else {
            result = oneToTen[hundredPlace] + " hundred " + numLessThan99(val % 100);
        }
        return result;
    }

    // Pronounces any number less than 99
    function numLessThan99(val) {
        val = Number(val);
        var tenthPlace = parseInt(val / 10),
            result;
        if (tenthPlace !== 1) {
            val % 10 ? (result = multipleOfTen[tenthPlace] + " " + numLessThan10(val % 10)) : (result = multipleOfTen[tenthPlace]);
            return result;
        } else {
            result = elevenToNineteen[val % 10];
            return result;
        }
    }

    // Pronounces any number less than 10
    function numLessThan10(val) {
        val = Number(val);
        return oneToTen[val];
    };

}

function restart() {
	if (confirm("Are you sure you want to restart? \nThis will clear all your progress. ")) {
		localStorage.clear();
		location.reload();
	}
}

// Handles.
function makeCrane(n) {
	if (n > paper) {
		n = paper;
	}
	
	cranes += n;
	unsoldCranes += n;
	paper -= n;
	
	cranesEl.innerHTML = commify(Math.floor(cranes));
}

function buyPaper(n) {
	if (funds < paperPrice * n) {
		return;
	}
	// Buys paper! May be upgraded. 
	paper += Math.round(paperAmount * n);
	funds -= Math.round(paperPrice * n);
}

function hireHighSchooler() {
	// Hires a highSchooler!
	highSchoolers++;
	funds -= minWage;
	minWage = Math.ceil(minWage * 1.01 * 100) / 100;
}

function hireJo() {
	// Hires one Jo Nakashima.
	if (funds < joCost) { return; }
	jos++;
	funds -= joCost;
	joCost = Math.ceil(joCost * 1.1 * 100) / 100;
}

function lowerPrice() {
	if (cranePrice <= 0.01) {
		cranePrice = 0.01;
		return;
	}
	cranePrice = Math.round(cranePrice * 100 - 1) / 100;
}

function raisePrice() {
	cranePrice = Math.round(cranePrice * 100 + 1) / 100;
}

function increaseMarketing() {
	if (funds < marketingPrice) {
		return;
	}
	marketingLevel += 1;
	funds -= marketingPrice
	
	marketingPrice *= 2;
	marketingLevelEl.innerHTML = commify(marketingLevel);
	
	displayMessage("Marketing upgraded to level " + marketingLevel + ".");
}

function borrowMoney(x) {
	if (x > maxDebt - debt) {x = maxDebt - debt;}
	funds += x;
	debt += x;
}

function payBack(x) {
	var max = Math.min(debt, funds);
	debt -= max;
	funds -= max;
}

function togglePaperBuyer() {
	if (paperBuyerOn) {
		paperBuyerEl.innerHTML = "OFF";
		paperBuyerOn = false;
		
	} else {
		paperBuyerEl.innerHTML = "ON";
		paperBuyerOn = true;
	}
}


// Console stuff.
function displayMessage(msg) {
	console.log(msg);
	
	var newMsgEl = document.createElement("span");
	newMsgEl.setAttribute("class", "consoleMsg");
	
	readoutDivEl.appendChild(newMsgEl, readoutDivEl.lastChild);
	readoutDivEl.appendChild(document.createElement("br"), readoutDivEl.lastChild);
	newMsgEl.innerHTML = "- " + msg;
}

// Project management functions.
function displayProjects(project) {
    
    project.element = document.createElement("button");
	project.element.setAttribute("id", project.id);

	project.element.onclick = function() {project.effect()};

	project.element.setAttribute("class", "projectButton");
	
	projectsDivEl.appendChild(project.element, projectsDivEl.firstChild);
	
	var span = document.createElement("span");
	span.style.fontWeight = "bold";
	project.element.appendChild(span);

	var title = document.createTextNode(project.title);
    span.appendChild(title);

	var cost = document.createTextNode(project.priceTag);
	project.element.appendChild(cost);

	var div = document.createElement("div");
	project.element.appendChild(div);

	var description = document.createTextNode(project.description);
	project.element.appendChild(description);
	
	blink(project.element);
}

function manageProjects(){
    for (var i = 0; i < projects.length; i++) {	
        if (projects[i].trigger() && (projects[i].uses > 0)) {
            displayProjects(projects[i]);
            projects[i].uses--;
            activeProjects.push(projects[i]);
        }
    }
    for (var i = 0; i < activeProjects.length; i++) {
        if (activeProjects[i].cost()) {
            activeProjects[i].element.disabled = false;
        } else {
            activeProjects[i].element.disabled = true;
        }   
    }
}

function blink(element){

	var handle = setInterval(function() {toggleVisibility(element)}, 30);
    
	function toggleVisibility(element){
		blinkCounter++;
		
		if (blinkCounter >= 12) {
			clearInterval(handle);
			blinkCounter = 0;
			element.style.visibility = "visible";
			
		} else {
			if (element.style.visibility != "hidden"){
				element.style.visibility = "hidden";
				
			} else {
				element.style.visibility = "visible";    
			}
		}
	}
}








//