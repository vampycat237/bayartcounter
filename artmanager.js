//gray & flatcolor are 2d only
//3dflat and 3d are 3d only
//paper, food, clay and fabric are craft only
let   mediaOpt   = null;
const media2d    = ['grayscale', 'flatcolor'];
const media3d    = ['3dflat', '3d'];
const mediaCraft = ['paper', 'food', 'clay', 'fabric'];
//mini is flatcolor only
const coverageOpt    = ['headshot', 'halfbody', 'fullbody'];
//craft only
const craftSizeOpt   = ['model', 'large'];
//flatcolor only
const linesOpt       = [null, 'colorlines', 'lineless'];
//2d only
const shadingOpt     = [null, 'minimal', 'basic', 'complex', 'painting'];
//all i guess??
const animationOpt   = [null, 'tween', 'handdrawn'];
//these are the handdrawn bits. treat the tween 'simple' as 'easy', 'complex' as 'simple', and 'fluid' as 'complex'
const animComplexOpt = [null, 'easy', 'simple', 'complex'];
//all!
const backgroundOpt  = [null, 'simple', 'depth', 'complex'];

//string: 2d 3d or craft
let category;
//string: gray, flatcolor, 3dflat, 3d, paper, food, clay, fabric
let media;
//string: mini, headshot, halfbody, fullbody
let coverage;
//crafts only string: model or large
//should be set to "model" when craft is selected by default
let lines          = null;
let craftSize      = null;
let shading        = null;
let animation      = null;
let animComplexity = null;
//string: simple, depth, complex
let background     = null;

const blockList = ['category', 'media', 'coverage', 'lines', 'craftSize', 'shading', 'animation', 'animComplexity', 'background'];
const choiceList = [category, media, coverage, lines, craftSize, shading, animation, animComplexity, background];

//site function!
function revert(str) {
	//close everything
	hideAll();
	
	//open up the selected thing
	blockSection = document.getElementById(str);
	blockButton  = document.getElementById(str+'sticky');
	if(blockSection !== null && blockButton !== null) {
		blockSection.style.display = "block";
		blockButton.style.display  = "none";
	}
}

function showNextStep(currentStep, choice) {
	//we have to figure out what the next step even is!!
	//and we can figure that out by knowing what we're on now/what we were just on
	//it's kinda like, a branching path!
	
	//anyway first let's call this guy.
	hideSection(currentStep, choice)
	
	//logs the step we're taking to the console!!
	console.log(currentStep + ": " + choice);
	
	//check for illegal moves w/ inactive stuff
	legalityChecker(currentStep);
	
	//check for the next step! the next step will be based on the currentStep, and whether the stickies are showing for later steps (meaning they've already been completed and are valid)
	//default for nextStep is just that, the next step directly after this one!
	//but sometimes it gets trickier than that
	//default: follow the flow!
	let nextStep = findNextStep(currentStep);
	console.log('next step: ' + nextStep);
	while (choiceList[blockList.indexOf(nextStep)] !== null && choiceList[blockList.indexOf(nextStep)] !== undefined) {
		if (findNextStep(nextStep) !== null) {
			nextStep = findNextStep(nextStep);
			console.log(nextStep);
		} else { break; }
	}
	//then check if we already have a value for that step: if we do, keep looking. else we're done!
	
	switch(nextStep) {
	case 'media':
		//show next section
		document.getElementById('media').style.display = "block";
		
		//any additional things!
		//start by hiding them all to reduce redundant code
		document.getElementById('2dmedia').style.display = "none";
		document.getElementById('3dmedia').style.display = "none";
		document.getElementById('craftmedia').style.display = "none";
			
		switch(category) {
		case '2d':
			document.getElementById('2dmedia').style.display = "block";
			break;
		case '3d':
			document.getElementById('3dmedia').style.display = "block";
			break;
		case 'craft':
			document.getElementById('craftmedia').style.display = "block";
			break;
		}
		break;
	case 'coverage':
		document.getElementById('coverage').style.display = "block";
		if(media == 'flatcolor') {
			document.getElementById('mini').style.display = "block";
		} else {
			document.getElementById('mini').style.display = "none";
			if(coverage == 'mini') { coverage = null; }
		}
		break;
	case 'lines':
		document.getElementById('lined').innerHTML = "regular lineart";
		document.getElementById('colorlines').style.display = "block";
		document.getElementById('lineless').style.display = "block";
		if(coverage == 'mini') {
			//make sure that we can't get lineless with minis
			document.getElementById('lined').innerHTML = "regular lineart or lineless (no lineless bonus for minis)";
			document.getElementById('lineless').style.display = "none";
		}
		else if (media == 'grayscale') {
			document.getElementById('colorlines').style.display = "none";
		}
		
		document.getElementById('lines').style.display = "block";
		break;
	}
}

function countTotals() {
	
}


//set methods
function setCategory(str) {
	switch(str) {
		case '2d':
			category = '2d';
			mediaOpt = media2d;
			break;
		case '3d':
			category = '3d';
			mediaOpt = media3d;
			break;
		case 'craft':
			category = 'craft';
			mediaOpt = mediaCraft;
			break;
		default:
			category = '2d';
			mediaOpt = media2d;
	}
	showNextStep('category', str);
}

function setMedium(str) {
	if(mediaOpt.indexOf(str) > -1) {
		media = str;
	} else { coverage = null; }
	
	showNextStep('media', str);
}
	
function setCoverage(str) {
	//mini is flatcolor only
	if(coverageOpt.indexOf(str) > -1 || (media == 'flatcolor' && str == 'mini')) {
		coverage = str;
	} else { coverage = null; }
	
	showNextStep('coverage', str);
}

function setLines(str) {
	//flatcolor only
	if(linesOpt.indexOf(str) > -1) {
		lines = str;
	} else { lines = null; }
	
	showNextStep('lines', str);
}

function setShading(str) {
	//2d only
	if(shadingOpt.indexOf(str) > -1) {
		lines = str;
	} else { shading = null; }
	
	showNextStep('shading', str);
}

function setCraftSize(str) {
	//this should only appear if we're doing a craft
	if(craftSizeOpt.indexOf(str) > -1) {
		craftSize = str;
	} else { coverage = null; }
	
	showNextStep('craftSize', str);
}

function setAnimation(str) {
	if(animationOpt.indexOf(str) > -1) {
		animation = str;
	} else { animation = null; }
	
	showNextStep('animation', str);
}

function setAnimationComplexity(str) {
	if(animComplexOpt.indexOf(str) > -1) {
		animComplexity = str;
	} else { animComplexity = null; }
	
	showNextStep('animComplexity', str);
}

function setBackground(str) {
	if(backgroundOpt.indexOf(str) > -1) {
		background = str;
	} else { background = null; }
	
	hideSection('background', str);
}