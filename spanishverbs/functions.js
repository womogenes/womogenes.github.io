
// A lot of utility functions!

var any = function(verb) {
	
	var s = 0;
	var a = 0;
	
	var pos = ["tener", "estar", "venir", "haber", "hacer", "salir", "caber", "valer", "querer", "poner", "traer", "decir", "poder", "saber", "abrir", "cubrir", "escribir", "freir", "morir", "resolver", "romper", "volver"];
	
	while (!(verb.includes(pos[0])) && s < pos.length - 1) {
		s++;
	}
	
	b = pos[s].length;
	while (verb.substring(a, b) != pos[s] && b < verb.length && verb.includes(pos[s])) {
		a++;
		b++;
	}
	
	if (pos.includes(verb.substring(a, b))) {
		var stem = verb.substring(0, a);
		return stem;
	}
	
	return false;
}

var participle = function(verb) {
	
	var stem = "";
	var s = 0;
	
	var irreg = ["abrir", "cubrir", "decir", "escribir", "freir", "hacer", "morir", "poner", "resolver", "romper", "volver"];
    var irreg2 = ["abierto", "cubierto", "dicho", "escrito", "frito", "hecho", "muerto", "puesto", "resuelto", "roto", "vuelto"];
	
	if (any(verb) != false) { stem = any(verb); }
	
	verb = verb.substring(stem.length, verb.length);
	if (verb == "ir") { return "ido"; }
	if (verb == "ver") { return "visto"; }
	
	if (irreg.includes(verb)) {
		while (s < irreg.length) {
			if (verb.includes(irreg[s])) {
				return stem + irreg2[s];
			}
			s++;
		}
	}
	
	if (verb.endsWith("ar")) {
		return verb.substring(0, verb.length - 2) + "ado";
	}
	
	if (verb.substring(verb.length - 2, verb.length).match(/[ie]r/)) {
		verb = verb.substring(0, verb.length - 2) + "ido";
		if (verb.substring(verb.length - 4).match(/[aieou]/)) {
			verb = verb.substring(0, verb.length - 3) + "i" + verb.substring(verb.length - 2, verb.length);
		}
		
		return verb;
	}
}

var stemChange = function(verb, tense) {
	
	var curSearch = 0;
	var asearch = 0;
	var seq = 0;
	var ex = "in";
	var length = verb.length;
	var a = "aa";
	
	var stem;
	var stem2;
	var secE;
	var firstE;
	
	var eie = ["preferir", "querer", "cerrar", "entender", "comenzar", "empezar", "pensar", "perder"];
	var oue = ["poder", "costar", "mover", "dormir", "almorzar", "recordar", "volver", "encontrar", "volar", "whorer"];
	var ei = ["repetir", "pedir", "servir", "competir", "seguir", "conseguir"];
	
	if (any(verb) && !eie.includes(verb)) { eie.push(verb); }
	if (eie.includes(verb) && tense == "present") { stem = 0; }
	if (ei.includes(verb) || tense == "preterite") { stem = 1; }
	if (oue.includes(verb) && tense == "present") { stem2 = "ue"; }
	if (oue.includes(verb) && tense == "preterite") { stem2 = "u"; }
	
	if ((tense == "present" && (eie.includes(verb) || ei.includes(verb))) || (tense == "preterite" && verb.endsWith("ir") && (eie.includes(verb) || ei.includes(verb)))) {
		secE = null;
		if (verb.endsWith("er")) {
			curSearch = verb.length - 1;
			while (a == "aa") {
				if (ex == "out") { break; }
				while (verb[curSearch] != "e" && curSearch > 0) {
					curSearch--;
				}
				seq++;
				if (seq == 2) {
					verb = verb.substring(0, curSearch) + "i" + verb(curSearch, verb.length);
					ex = "out";
					break;
				}
				curSearch--;
				a = "aa";
			}
			
		} else {
			curSearch = 0;
			while (a == "aa") {
				if (ex == "out") {
					break;
				}
				seq++;
				while (curSearch < verb.length - 1 && verb[curSearch] != "e") {
					curSearch++;
				}
				if (seq == 1) {
					firstE = curSearch;
					a = "aa";
					
				} else if (seq == 2) {
					if (verb[curSearch] == "e") {
						if (curSearch + 1 == verb.length - 1) {
							ex = "out";
							secE = null;
							break;
						
						} else {
							secE = curSearch;
							ex = "out";
						}
						
					} else { break; }
				}
			}
			if (secE == null) {
				verb = verb.substring(0, firstE) + "i" + verb.substring(firstE + stem, verb.length);
			} else {
				verb = verb.substring(0, secE) + "i" + verb(secE + stem, verb.length);
			}
		}
		
	} else if ((tense == "present" && oue.includes(verb)) || (tense == "preterite" && verb.endsWith("ir") && oue.includes(verb))) {
		curSearch = 0;
		secE = null;
		while (a == "aa") {
			if (ex == "out") { break; }
			seq++;
			while (verb[curSearch] != "o" && curSearch < verb.length - 1) {
				curSearch++;
			}
			if (seq == 1) {
				firstE = curSearch;
				curSearch++;
				a = "aa";
			
			} else if (seq == 2) {
				if (verb[curSearch] == "o") {
					if (curSearch + 1 == verb.length - 1) {
						ex = "out";
						secE = null;
						break;
						
					} else {
						secE = curSearch;
						ex = "out";
						break;
					}
				} else { break; }
			}
		}
		
		if (secE == null) {
			verb = verb.substring(0, firstE) + stem2 + verb.substring(firstE + 1, verb.length);
			
		} else {
			verb = verb.substring(0, secE) + stem2 + verb.substring(secE + 1, verb.length);
		}
	}
	return verb;
}

var conj = function(verb, sub, tense) {
	
	verb = verb.toLowerCase();
	tense = tense.toLowerCase();
	
	if (tense == "present") {
		var ar = ["o", "as", "a", "amos", "áis", "an"];
        var er = ["o", "es", "e", "emos", "éis", "en"];
        var ir = ["o", "es", "e", "imos", "ís", "en"];
        var ser = ["soy", "eres", "es", "somos", "sois", "son"];
        var tener = ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"];
        var estar = ["estoy", "estás", "está", "estamos", "estáis", "están"]
        var ir = ["voy", "vas", "va", "vamos", "vais", "van"];
        var jugar = ["juego", "juegas", "juega", "jugamos", "jugáis", "juegan"];
        var ver = ["veo", "ves", "ve", "vemos", "véis", "ven"];
        var venir = ["vengo", "vienes", "viene", "venimos", "venís", "vienen"];
        var poner = ["pongo", "pones", "pone", "ponemos", "ponéis", "ponen"];
        var traer = ["traigo", "traes", "trae", "traemos", "traéis", "traen"];
        var decir = ["digo", "dices", "dice", "decimos", "decís", "dicen"];
        var hacer = ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"];
        var conocer = ["conozco", "conoces", "conoce", "conocemos", "conocéis", "conocen"];
        var saber = ["sé", "sabes", "sabe", "sabems", "sabéis", "saben"];
        var dar = ["doy", "das", "da", "damos", "dais", "dan"];
		
        var stem = "";
		var word;
		
		if (any(verb) != false) { stem = any(verb); }
		if (verb.includes("tener")) { return stem + tener[sub]; }
		if (verb.includes("estar")) { return stem + estar[sub]; }
		if (verb.includes("venir")) { return stem + venir[sub]; }
		if (verb.includes("poner")) { return stem + poner[sub]; }
		if (verb.includes("traer")) { return stem + traer[sub]; }
		if (verb.includes("decir")) { return stem + decir[sub]; }
		if (verb.includes("hacer")) { return stem + hacer[sub]; }
		if (verb.includes("conocer")) { return stem + conocer[sub]; }
		if (verb.includes("saber")) { return stem + saber[sub]; }
		if (verb == "ser") { return ser[sub]; }
		if (verb == "dar") { return dar[sub]; }
		if (verb == "ir") { return ir[sub]; }
		if (verb == "jugar") { return jugar[sub]; }
		if (verb == "ver") { return ver[sub]; }
		if (verb == "seguir" && sub == 0) { return "sigo"; }
		
		if (sub < 3 || sub > 4) { verb = stemChange(verb, sub, tense); }
		if (verb.endsWith("ar")) {
			word = verb.substring(0, verb.length - 2) + ar[sub];
			return word;
		}
		if (verb.endsWith("er")) {
			word = verb.substring(0, verb.length - 2) + er[sub];
			return word;
		}
		if (verb.endsWith("ir")) {
			word = verb.substring(0, verb.length - 2) + ir[sub];
			return word;
		}
	}
	if (tense == "preterite") {
		var ar = ["é", "aste", "ó", "amos", "asteis", "aron"];
        var er = ["í", "iste", "ió", "imos", "isteis", "ieron"];
        var oiEnding = ["e", "iste", "o", "imos", "isteis", "ieron"];
        var dar_ver = ["i", "iste", "io", "imos", "isteis", "ieron"];
        var vowelErIr = ["í", "íste", "yó", "ímos", "ísteis", "yeron"];
        var otherIrreg = ["super", "puser", "tuvir", "estuvir", "vinir", "quisir", "puder", "cuper", "anduvar", "trajir", "dijir", "huber"];
        var ser_ir = ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"];
        var hacer = ["hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron"];
		
        var stem = "";
		var word;
		
		if (any(verb) != false) {
			stem = any(verb);
		}
		if (verb.includes("saber")) {
			verb = stem + "super";
			otherIrreg.push(verb);
		}
		if (verb.includes("poner")) {
			verb = stem + "puser";
			otherIrreg.push(verb);
		}
		if (verb.includes("tener")) {
			verb = stem + "tuvir";
			otherIrreg.push(verb);
		}
		if (verb.includes("estar")) {
			verb = stem + "estuvir";
			otherIrreg.push(verb);
		}
		if (verb.includes("venir")) {
			verb = stem + "vinir";
			otherIrreg.push(verb);
		}
		if (verb.includes("querer")) {
			verb = stem + "quiser";
			otherIrreg.push(verb);
		}
		if (verb.includes("poder")) {
			verb = stem + "puder";
			otherIrreg.push(verb);
		}
		if (verb.includes("caber")) {
			verb = stem + "cuper";
			otherIrreg.push(verb);
		}
		if (verb.includes("traer")) {
			verb = stem + "trajir";
			otherIrreg.push(verb);
		}
		if (verb.includes("andar")) {
			verb = stem + "anduvar";
			otherIrreg.push(verb);
		}
		if (verb.includes("decir")) {
			verb = stem + "dijir";
			otherIrreg.push(verb);
		}
		if (verb.includes("haber")) {
			verb = stem + "huber";
			otherIrreg.push(verb);
		}
		
		if (verb == "ser" || verb == "ir") { return ser_ir[sub]; }
		if (verb == "dar" || verb == "ver") { return verb[0] + dar_ver[sub]; }
		if (verb == "hacer") { return hacer[sub]; }
		
		if (verb.endsWith("ucir")) { verb = verb.substring(0, verb.length - 4) + "ujir"; }
		if (otherIrreg.includes(verb) || verb.endsWith("ujir")) {
			if (verb.endsWith("jir") || sub == 5) {
				verb = verb.substring(0, verb.length - 2) + "eron";
			} else {
				verb = verb.substring(0, verb.length - 2) + oiEnding[sub];
			}
			return verb;
		}
		if ((verb == "leer" || verb == "creer" || verb == "caer" || verb == "oir") || (verb[verb.length - 3].match(/[aeiou]/) && verb.substring(verb.length - 2, verb.length).match(/[ie]r/))) {
			return verb.substring(0, verb.length - 2) + vowelErIr[sub];
		}
		if (sub == 2 || sub == 5) { verb = stemChange(verb, tense); }
		
		if (sub == 0) {
			if (verb.endsWith("car")) {
				word = verb.substring(0, verb.length - 3) + "qué";
				return word;
			}
			if (verb.endsWith("gar")) {
				word = verb.substring(0, verb.length - 3) + "gué";
				return word;
			}
			if (verb.endsWith("zar")) {
				word = verb.substring(0, verb.length - 3) + "cé";
				return word;
			}
		}
		if (verb.endsWith("ar")) {
			word = verb.substring(0, verb.length - 2) + ar[sub];
			
		} else if (verb.substring(verb.length - 2, verb.length).match(/[ei]r/)) {
			word = verb.substring(0, verb.length - 2) + er[sub];
		}
		return word;
	}
	if (tense == "imperfect") {
		var ar = ["aba","abas","aba","ábamos","abais","aban"]
        var eir = ["ía","ías","ía","íamos","íais","ían"]
        var irreg = ["ser","ir","ver"]
        var ser = ["era","eras","era","éramos","erais","eran"]
        var ir = ["iba","ibas","iba","íbamos","ibais","iban"]
        var ver = ["veía","veías","veía","veíamos","veíais","veían"]
		
		
	}
}
































