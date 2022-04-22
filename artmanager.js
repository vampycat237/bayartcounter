//gray & flatcolor are 2d only
//3dflat and 3d are 3d only
//paper, food, clay and fabric are craft only
let   mediaOpt    = null;
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
let lines;
let craftSize;
let shading;
let animation;
let animComplexity;
//string: simple, depth, complex
let background;

function revert(str) {
	//close everything
	hidePrevSection('category', category);
	hidePrevSection('media', media);
	hidePrevSection('coverage', coverage);
	hidePrevSection('lines', lines);
	hidePrevSection('craftSize', craftSize);
	hidePrevSection('shading', shading);
	hidePrevSection('animation', animation);
	hidePrevSection('animComplexity', animComplexity);
	hidePrevSection('background', background);
	
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
	hidePrevSection(currentStep, choice)
	
	//logs the step we're taking to the console!!
	console.log(currentStep + ": " + choice);
	
	//check for illegal moves w/ inactive stuff
	legalityChecker(currentStep);
	
	switch(currentStep) {
	case 'category':
		document.getElementById('media').style.display = "block";
		switch(choice) {
		case '2d':
			document.getElementById('2dmedia').style.display = "block";
			document.getElementById('3dmedia').style.display = "none";
			document.getElementById('craftmedia').style.display = "none";
			break;
		case '3d':
			document.getElementById('2dmedia').style.display = "none";
			document.getElementById('3dmedia').style.display = "block";
			document.getElementById('craftmedia').style.display = "none";
			break;
		case 'craft':
			document.getElementById('2dmedia').style.display = "none";
			document.getElementById('3dmedia').style.display = "none";
			document.getElementById('craftmedia').style.display = "block";
			break;
		}
		break;
	case 'media':
		document.getElementById('coverage').style.display = "block";
		if(choice == 'flatcolor') {
			document.getElementById('mini').style.display = "block";
		} else {
			document.getElementById('mini').style.display = "none";
			if(coverage == 'mini') { coverage = null; }
		}
		break;
	case 'coverage':
		if(category == '2d') {
			document.getElementById('lined').innerHTML = "regular lineart";
			document.getElementById('colorlines').style.display = "block";
			document.getElementById('lineless').style.display = "block";
			if(choice == 'mini') {
				//make sure that we can't get lineless with minis
				document.getElementById('lined').innerHTML = "regular lineart or lineless (no lineless bonus for minis)";
				document.getElementById('lineless').style.display = "none";
				
			} else if (media == 'grayscale') {
				document.getElementById('colorlines').style.display = "none";
			}
			
			document.getElementById('lines').style.display = "block";
		} else if(category == 'craft') {
			
		}
	}
}

function hidePrevSection(block, choice) {
	//hide previous section & show its collapsed button
	prevSection = document.getElementById(block);
	prevButton  = document.getElementById(block+'sticky');
	if(prevSection !== null && prevButton !== null && prevSection.style.display !== "none") {
		prevSection.style.display = "none";
		if(document.getElementById(choice) !== null) {
			prevButton.innerHTML      = block + ": " + document.getElementById(choice).innerHTML;
			prevButton.style.display  = "block";
		}
	}
}

function legalityChecker(currentStep) {
	//will check for the existence of illegal matchups, starting at the top!
	
	//top-level checks for category getting out of sync with media, they will simply re-assign themself to the correct one if the most recent thing that was messed with was the medium.
	if (mediaOpt.indexOf(media) < 0 && currentStep == 'media') {
		if (media2d.indexOf(media) > -1) {
			category = '2d';
			mediaOpt = media2d;
		} else if (media3d.indexOf(media) > -1) {
			category = '3d';
			mediaOpt = media3d;
		} else {
			category = 'craft';
			mediaOpt = mediaCraft;
		}
	}
	//now THIS one occurs if category is re-assigned, and is the only else-if here. If the user re-assigns the category, we bonk the mismatching medium!
	else if (mediaOpt.indexOf(media) < 0 && currentStep == 'category') {
		media = null;
	}
	//NO MORE IF-ELSES FROM HERE ON OUT!! we have to catch ALL the issues!
	//anyway now we check to see if mini is assigned to anything but flatcolor!
	if (coverage == 'mini' && media !== flatcolor) {
		coverage = null;
	}
	//check to see if mini has lineless value OR if grayscale has colored lines
	if ((coverage == 'mini' && lines = 'lineless') || (media = grayscale && lines = 'colorlines')) {
		lines = null;
	}
	//check to see if anything not 2d has lines, and if so get rid of em
	if (category !== '2d' && lines !== null) {lines = null;}
	
	//^same but with shading
	if (category !== '2d' && shading !== null) {shading = null;}
	
	//makes sure non-crafts don't have craftSize
	if (category !== 'craft' && craftSize !== null) {craftSize = null;}
	
}

function setMedGroup(str) {
	switch(str) {
		case '2d':
			category = '2d';
			mediaOpt   = media2d;
			break;
		case '3d':
			category = '3d';
			mediaOpt   = media3d;
			break;
		case 'craft':
			category = 'craft';
			mediaOpt   = mediaCraft;
			break;
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
}

function setShading(str) {
	//2d only
	if(shadingOpt.indexOf(str) > -1) {
		lines = str;
	} else { shading = null; }
}

function setCraftSize(str) {
	//this should only appear if we're doing a craft
	if(craftSizeOpt.indexOf(str) > -1) {
		craftSize = str;
	} else { coverage = null; }
}

function setAnimation(str) {
	if(animationOpt.indexOf(str) > -1) {
		animation = str;
	} else { animation = null; }
}

function setAnimationComplexity(str) {
	if(animComplexOpt.indexOf(str) > -1) {
		animComplexity = str;
	} else { animComplexity = null; }
}

function setBackground(str) {
	if(backgroundOpt.indexOf(str) > -1) {
		background = str;
	} else { background = null; }
}