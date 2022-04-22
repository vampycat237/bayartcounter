const shellRates = {
	//BASE RATES
	//[0] is headshot, [1] is halfbody, and [2] is fullbody. for flatcolor [3] is mini
	ratesGrayscale   : [50, 75, 100],
	ratesFlatcolor   : [100, 150, 200, 20],
	
	rates3dFlat      : [100, 150, 200],
	rates3dFull      : [300, 500, 1000],
	
	ratesPaperModel  : [100, 250, 500],
	ratesPaperLarge  : [250, 500, 1000],
	
	ratesFoodModel   : [200, 300, 500],
	ratesFoodLarge   : [500, 750, 1000],
	
	ratesClayModel   : [100, 250, 500],
	ratesClayLarge   : [500, 750, 1000],
	
	ratesFabricModel : [200, 300, 500],
	ratesFabricLarge : [400, 600, 1000],
	
	//STACKABLES
	//no bonus, colored lines, lineless
	ratesLines   : [0, 30, 50],
	//no shading, minimal, basic, complex, painting
	ratesShading : [0, 30, 50, 100, 250],
	//TWEENS! simple, complex, fluid (BUT! they map to:
	//none, easy, simple, complex)
	ratesTweens  : [0, 50, 100, 300],
	//none, easy, simple, complex
	ratesAnimated: [0, 50, 250, 500],
	
	//STATIC
	//backgrounds!! none, simple, depth, complex
	ratesBackgrounds : [0, 100, 250, 500]
	
}

let userTotal    = 0;
let userCounting = "";
let userRates    = null;

function countShells() {
	initialize();
	countFlatRate();
	countStackables();
	countStatic();
}

function initialize() {
	switch (media) {
		case 'grayscale':
			userRates = shellRates.ratesGrayscale;
			break;
		case 'flatcolor':
			userRates = shellRates.ratesFlatcolor;
			break;
		case '3dflat':
			userRates = shellRates.rates3dFlat;
			break;
		case '3d':
			userRates = shellRates.rates3dFull;
			break;
		case 'paper':
			if (craftSize == 'model') { userRates = shellRates.ratesPaperModel; }
			else { userRates = shellRates.ratesPaperLarge; }
			break;
		case 'food':
			if (craftSize == 'model') { userRates = shellRates.ratesFoodModel; }
			else { userRates = shellRates.ratesFoodLarge; }
			break;
		case 'clay':
			if (craftSize == 'model') { userRates = shellRates.ratesClayModel; }
			else { userRates = shellRates.ratesClayLarge; }
			break;
		case 'fabric':
			if (craftSize == 'model') { userRates = shellRates.ratesFabricModel; }
			else { userRates = shellRates.ratesFabricLarge; }
			break;
	}
}

function countFlatRate() {
	//headshot -> 0, halfbody -> 1, fullbody -> 2, mini -> 3
	switch (coverage) {
		case 'headshot':
			userTotal += userRates[0];
			break;
		case 'halfbody':
			userTotal += userRates[1];
			break;
		case 'fullbody':
			userTotal += userRates[2];
			break;
		case 'mini':
			userTotal += userRates[3];
	}
	userCounting += userTotal + " (" + media + " " + coverage + ")";
}

function countStackables() {
	//0 is the default
	//lines first
	switch (lines) {
		default:
			userTotal += shellRates.ratesLines[0];
			break;
		case 'colorlines':
			userTotal += shellRates.ratesLines[1];
			userCounting += " + " + shellRates.ratesLines[1] + " (colored lineart bonus)";
			break;
		case 'lineless':
			userTotal += shellRates.ratesLines[2];
			userCounting += " + " + shellRates.ratesLines[2] + " (lineless bonus)";
	}
	//now shading!
	switch (shading) {
		default:
			userTotal += shellRates.ratesShading[0];
			break;
		case 'minimal':
			userTotal += shellRates.ratesShading[1];
			userCounting += " + " + shellRates.ratesShading[1] + " (minimal shading)";
			break;
		case 'basic':
			userTotal += shellRates.ratesShading[2];
			userCounting += " + " + shellRates.ratesShading[2] + " (basic shading)";
			break;
		case 'complex':
			userTotal += shellRates.ratesShading[3];
			userCounting += " + " + shellRates.ratesShading[3] + " (complex shading)";
			break;
		case 'painting':
			userTotal += shellRates.ratesShading[4];
			userCounting += " + " + shellRates.ratesShading[4] + " (painted shading)";
	}
	//now animations
	switch (animation) {
		case 'tween':
			switch (animComplexity) {
				case 'easy':
					userTotal += shellRates.ratesTweens[1]
					userCounting += " + " + shellRates.ratesTweens[1] + " (" + animComplexity + " tween animation)";
					break;
				case 'simple':
					userTotal += shellRates.ratesTweens[2]
					userCounting += " + " + shellRates.ratesTweens[2] + " (" + animComplexity + " tween animation)";
					break;
				case 'complex':
					userTotal += shellRates.ratesTweens[3]
					userCounting += " + " + shellRates.ratesTweens[3] + " (" + animComplexity + " tween animation)";
					break;
			}
			break;
		case 'handdrawn':
			switch (animComplexity) {
				case 'easy':
					userTotal += shellRates.ratesAnimated[1]
					userCounting += " + " + shellRates.ratesAnimated[1] + " (" + animComplexity + " hand-drawn animation)";
					break;
				case 'simple':
					userTotal += shellRates.ratesAnimated[2]
					userCounting += " + " + shellRates.ratesAnimated[2] + " (" + animComplexity + " hand-drawn animation)";
					break;
				case 'complex':
					userTotal += shellRates.ratesAnimated[3]
					userCounting += " + " + shellRates.ratesAnimated[3] + " (" + animComplexity + " hand-drawn animation)";
					break;
			}
			break;
	}
}

function countStatic() {
	//count static!
	switch (background) {
		case 'simple':
			userTotal += shellRates.ratesBackgrounds[1];
			userCounting += " + " + shellRates.ratesBackgrounds[1] + " (" + background + " background)";
			break;
		case 'depth':
			userTotal += shellRates.ratesBackgrounds[2];
			userCounting += " + " + shellRates.ratesBackgrounds[2] + " (" + background + " background)";
			break;
		case 'complex':
			userTotal += shellRates.ratesBackgrounds[3];
			userCounting += " + " + shellRates.ratesBackgrounds[3] + " (" + background + " background)";
			break;
	}
}
