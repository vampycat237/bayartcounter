const choiceOptions = {
	//gray & flatcolor are 2d only
	//3dflat and 3d are 3d only
	//paper, food, clay and fabric are craft only
	mediaOpt   : null,
	media2d    : ['grayscale', 'flatcolor'],
	media3d    : ['3dflat', '3d'],
	mediaCraft : ['paper', 'food', 'clay', 'fabric'],
	//mini is flatcolor only
	coverageOpt    : ['headshot', 'halfbody', 'fullbody'],
	//craft only
	craftSizeOpt   : ['model', 'large'],
	//flatcolor only
	linesOpt       : [null, 'colorlines', 'lineless'],
	//2d only
	shadingOpt     : [null, 'minimal', 'basic', 'complex', 'painting'],
	//all i guess??
	animationOpt   : [null, 'tween', 'handdrawn'],
	//these are the handdrawn bits. treat the tween 'simple' as 'easy', 'complex' as 'simple', and 'fluid' as 'complex'
	animComplexOpt : [null, 'easy', 'simple', 'complexa'],
	//all!
	backgroundOpt  : [null, 'simpleb', 'depth', 'complexb'],
}
const animComplexDesc = {
	tween : [
		//easy/simple
		"simple (minimal movement, like a small headbob)",
		//simple/complex
		"complex (busy movement, consisting of three<br>or more limbs in action)",
		//complex/fluid
		"fluid (an extremely complex tween animation that<br>involves most or all limbs on the body)"
	],
	handdrawn : [
		//easy
		"easy (reusing one drawing with minimal changes per frame,<br>such as an eye blink or ear twitch.)",
		//simple
		"simple (using the same pose with minimal changes,<br>such as a tail wag or idle animation)",
		//complex
		"complex (drawing each pose and position uniquely,<br>such as a walk cycle)"
	]
	
}
//BASE INFO
//string: 2d 3d or craft
let category;
//string: gray, flatcolor, 3dflat, 3d, paper, food, clay, fabric
let media;
//string: mini, headshot, halfbody, fullbody
let coverage;

//STACKABLES
//crafts only string: model or large
//should be set to "model" when craft is selected by default
let lines;
let craftSize;
let shading;
let animation;
let animComplexity;

//STATIC
//string: simple, depth, complex
let background;

const blockList = ['category', 'media', 'coverage', 'lines', 'craftSize', 'shading', 'animation', 'animComplexity', 'background'];
const choiceList = [category, media, coverage, lines, craftSize, shading, animation, animComplexity, background];

//site function!
function revert(str) {
	//close everything
	hideAll();
	
	//hide the stickybutton for this
	document.getElementById(str+'sticky').style.display  = "none";
	
	//open up the selected thing with the proper settings
	readyNextStep(str);
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
	let nextStep = 'category';
	
	//instead of checking for undefined and null, check to see if it's a valid option for the block!
	while (checkOptionValidity(nextStep)) {
		//if it returns null that means something is wrong, or that we reached the end of our steps. there's no more steps to find!
		if (findNextStep(nextStep) !== null) {
			nextStep = findNextStep(nextStep);
		} else { break; }
	}
	console.log('next step: ' + nextStep);
	//then check if we already have a value for that step: if we do, keep looking. else we're done!
	
	readyNextStep(nextStep);
	
}

function readyNextStep(nextStep) {
	//show the chosen "nextStep" block
	document.getElementById(nextStep).style.display = "block";
	
	switch(nextStep) {
	case 'media':
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
		//ensure that mini option only appears for flatcolor medium
		document.getElementById('mini').style.display = "none";
		if(media == 'flatcolor') {
			document.getElementById('mini').style.display = "block";
		}
		break;
	case 'lines':
		//make sure that mini can't have lineless bonus & grayscale can't have colored lines (because it's grayscale)
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
		
		break;
	//no case for shading because it will only appear for valid media
	//no case for animation because it doesn't change
	//case for animComplexity changes based on the animation type
	case 'animComplexity':
		switch (animation) {
		case 'tween':
			document.getElementById('easy').innerHTML = animComplexDesc.tween[0];
			document.getElementById('simple').innerHTML = animComplexDesc.tween[1];
			document.getElementById('complexa').innerHTML = animComplexDesc.tween[2];
			break;
		
		case 'handdrawn':
			document.getElementById('easy').innerHTML = animComplexDesc.handdrawn[0];
			document.getElementById('simple').innerHTML = animComplexDesc.handdrawn[1];
			document.getElementById('complexa').innerHTML = animComplexDesc.handdrawn[2];
			break;
		}
	}
}

//set methods
function setCategory(str) {
	category = str;
	switch(str) {
		case '2d':
			choiceOptions.mediaOpt = choiceOptions.media2d;
			break;
		case '3d':
			choiceOptions.mediaOpt = choiceOptions.media3d;
			break;
		case 'craft':
			choiceOptions.mediaOpt = choiceOptions.mediaCraft;
			break;
	}
	showNextStep('category', str);
}

function setMedium(str) {
	if(choiceOptions.mediaOpt.indexOf(str) > -1) {
		media = str;
	} else { coverage = null; }
	
	showNextStep('media', str);
}
	
function setCoverage(str) {
	//mini is flatcolor only
	if(choiceOptions.coverageOpt.indexOf(str) > -1 || (media == 'flatcolor' && str == 'mini')) {
		coverage = str;
	} else { coverage = null; }
	
	showNextStep('coverage', str);
	//show the counting button if it's not a craft- if there's nothing else you've done, you can shortcut right to the totals!
	if (category !== 'craft') showCountingSticky();
	
}

function setLines(str) {
	//flatcolor only
	if(checkOptionValidity('lines', str)) {
		lines = str;
	} else { lines = null; }
	
	showNextStep('lines', lines);
}

function setShading(str) {
	//2d only
	if(checkOptionValidity('shading', str)) {
		shading = str;
		console.log('setting shading to ' + str);
	} else { shading = null; }
	
	showNextStep('shading', str);
}

function setCraftSize(str) {
	//this should only appear if we're doing a craft
	if(checkOptionValidity('craftSize', str)) {
		craftSize = str;
	} else { coverage = null; }
	
	showNextStep('craftSize', str);
	//crafts show the counting sticky here instead bc it's required for the math
	showCountingSticky();
}

function setAnimation(str) {
	if(checkOptionValidity('animation', str)) {
		animation = str;
	} else { animation = null; }
	
	showNextStep('animation', str);
}

function setAnimComplexity(str) {
	if(checkOptionValidity('animComplexity', str)) {
		animComplexity = str;
	} else { animComplexity = null; }
	
	showNextStep('animComplexity', str);
}

function setBackground(str) {
	if(checkOptionValidity('background', str)) {
		background = str;
	} else { background = null; }
	
	hideSection('background', str);
	doCounting();
}

function showCountingSticky() {
	//would have used hideSection() but this actually has mildly different needs
	//code largely ripped from that method though
	sectionToHide = document.getElementById('counting');
	stickyButton  = document.getElementById('counting'+'sticky');
	if(sectionToHide !== null && stickyButton !== null) {
		sectionToHide.style.display = "none";
		stickyButton.style.display  = "block";
	}
}

function hideCounting() {
	document.getElementById('counting').style.display = "none";
	if (checkOptionValidity('category') && checkOptionValidity('media') && checkOptionValidity('coverage')) {
		document.getElementById('countingsticky').style.display = "block";
	}
	document.getElementById('countingsticky').innerHTML = "calculate totals";
}

function doCounting() {
	//update our choiceList so we can loop through it
	//updateChoiceList();
	/*//set anything that's undefined to null
	for (let block of blockList) {
		let choice = choiceList[blockList.indexOf(block)];
		
		if (choice == undefined) {
			choiceList[blockList.indexOf(block)] = null;
		}
	}
	//save that
	updateChoiceVars();*/
	
	//now that everything is ready, let's call the counting function!
	countShells();
	
	//close all other blocks 
	hideAll();
	//show the counting block!
	document.getElementById('counting').style.display = "block";
	//change the sticky to say REcalculate, since it will reset the numbers if theyve changed
	document.getElementById('countingsticky').innerHTML = "recalculate totals";
	
}