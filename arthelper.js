//helper methods for artmanager!

//hides the given section
//both parameters are strings
function hideSection(block, choice) {
	//hide previous section & show its collapsed button
	const sectionToHide = document.getElementById(block);
	const stickyButton  = document.getElementById(block+'sticky');
	
	var friendlyName, rawText, friendlyText;
	//set the friendlyName of the block
	if (block == 'craftSize') {
		friendlyName = 'craft size';
		
	} else if (block == 'animComplexity') {
		friendlyName = 'animation complexity';
		
	} else {
		friendlyName = block;
	}
	
	//set the text of the choice
	if(document.getElementById(choice) !== null) {
		rawText = document.getElementById(choice).innerHTML;
	}
	//there is a null option?
	else if (document.getElementById('no'+block) !== null) {
		rawText = document.getElementById('no'+block).innerHTML;
	}
	//this is the specific case of lineart, where "nolines" does not make sense
	else if (block == 'lines' && choice == null) {
		rawText = document.getElementById('lined').innerHTML;
	}
	else { rawText = '...' }
	
	//set the friendlyText of the choice
	//it has a paren in it! we want to get rid of everything in the parens AND the space before the paren.
	if (rawText.indexOf("(") > -1) {
		friendlyText = rawText.substring(0, rawText.indexOf("(") - 1);
		
	}
	//it is the no background line! it's too long
	else if (block == 'background' && choice == null) {
		friendlyText = "no background";
	}
	/*//it is color lines!! it's also too long
	else if () {
		
	}*/
	else {
		friendlyText = rawText;
	}
	
	//if the choice is invalid, don't do it
	if(sectionToHide !== null && stickyButton !== null && (checkOptionValidity(block, choice))) {
		sectionToHide.style.display = "none";
		stickyButton.style.display  = "block";
		stickyButton.innerHTML      = friendlyName + ": " + friendlyText;
	}
}

//clears the given section (removes its stickybutton too)
function clearSection(block) {
	const sectionToClear = document.getElementById(block);
	const stickyButton   = document.getElementById(block+'sticky');
	if(sectionToClear !== null && stickyButton !== null) {
		sectionToClear.style.display = "none";
		stickyButton.style.display   = "none";
	}
}

//hides every block EXCEPT for counting
function hideAll() {
	for (let block of blockList) {
		hideSection(block, activeBay[block]);
	}
}

function findNextStep(currentStep) {
	//follow the flowchart!
	switch (currentStep) {
	case 'category':
		return 'media';
	case 'media':
		return 'coverage';
	case 'coverage':
		if (activeBay.category == '2d') {
			return 'lines';
		}else if (activeBay.category == 'craft') {
			return 'craftSize';
		} else {
			return 'animation';
		}
	case 'lines':
		return 'shading';
	case 'shading':
	case 'craftSize':
		return 'animation';
	case 'animation':
		if (activeBay.animation !== null) {
			return 'animComplexity';
		} else {
			return 'background';
		}
	case 'animComplexity':
		return 'background';
	//if something else happens somehow, return null, we have to stop lmao.
	default:
		return null;
	}
}

/*//updates the choiceList
function updateChoiceList() {
	choiceList[0] = category;
	choiceList[1] = media;
	choiceList[2] = coverage;
	choiceList[3] = lines;
	choiceList[4] = craftSize;
	choiceList[5] = shading;
	choiceList[6] = animation;
	choiceList[7] = animComplexity;
	choiceList[8] = background;
}

//updates the choice variables to match the list
function updateChoiceVars() {
	category   = choiceList[0];
	media      = choiceList[1];
	coverage   = choiceList[2];
	lines      = choiceList[3];
	craftSize  = choiceList[4];
	shading    = choiceList[5];
	animation  = choiceList[6];
	animComplexity = choiceList[7];
	background = choiceList[8];
}*/

//checks for the existence of illegal matchups, starting at the top!
//currentStep is a string
//b is the bayfox object we're checking, it defaults to the activeBay
function legalityChecker(currentStep, b = activeBay) {
	
	//make our list of illegal stuff we did
	const violationList = [];
	
	//top-level checks for category getting out of sync with media, they will simply re-assign themself to the correct one if the most recent thing that was messed with was the medium.
	
	//If the user re-assigns the category, we bonk the mismatching medium!
	if (!checkOptionValidity('media') && currentStep == 'category' && b.media !== undefined) {
		violationList.push("new media category "+category+" does not include medium "+media);
		b.media = "illegal";
		//throw "media-mismatch";
	}
	//check to see if mini is assigned to anything but flatcolor!
	if (b.coverage == 'mini'   && b.media !== 'flatcolor') {
		violationList.push("coverage 'mini' is flatcolor only");
		b.coverage = "illegal";
		//throw "invalid-coverage";
	}
	//check to see if mini has lineless value OR if grayscale has colored lines
	if ((b.coverage == 'mini'  && b.lines == 'lineless') || (b.media == 'grayscale' && b.lines == 'colorlines')) {
		violationList.push("lineart '"+lines+"' does not apply to medium "+media);
		b.lines = "illegal";
		//throw "invalid-lineart";
	}
	//check to see if anything not 2d has lines, and if so get rid of em
	if (b.category !== '2d'    && b.lines !== null && b.lines !== undefined) {
		violationList.push("lineart is 2d only");
		b.lines = "illegal";
		//throw "invalid-lineart";
	}
	
	//^same but with shading
	if (b.category !== '2d'    && b.shading !== null && b.shading !== undefined) {
		violationList.push("shading is 2d only");
		b.shading = "illegal";
		//throw "invalid-shading";
	}
	
	//makes sure non-crafts don't have craftSize
	if (b.category !== 'craft' && b.craftSize !== null && b.craftSize !== undefined) {
		violationList.push("craftSize is craft only");
		b.craftSize = "illegal";
		//throw "invalid-craftSize"
	}
	
	
	//log our crimes to the console
	if (violationList.length > 0) {
		console.log("violations: " + violationList.join(", "));
	}
	
	//OKAY NOW!! clear the stickybuttons for everything that's changed to null!!
	for (let block of blockList) {
		var matchingBlock = document.getElementById(block);
		var matchingButton = document.getElementById(block + 'sticky');
		
		//let choice = choiceList[blockList.indexOf(block)];
		//console.log('checking choice '+choice);
		
		if (block !== 'background' && b[block] == "illegal") {
			b[block] = null;
			if (matchingBlock !== null && matchingButton !== null) {
				console.log("clearing " + block);
				clearSection(block);
			}
		}
	}
	
	//update the variables to match the list
	//updateChoiceVars();
}

//gets the choiceOptions for this bay
function getChoiceOptions(blockId, b = activeBay) {
	//returns the list from the choiceOptions object that matches with the block id passed in
	switch (blockId) {
		case 'category':  return ['2d', '3d', 'craft'];
		case 'media':     return b.mediaOpt;
		case 'coverage':  return choiceOptions.coverageOpt;
		case 'lines':     return choiceOptions.linesOpt;
		case 'shading':   return choiceOptions.shadingOpt;
		case 'craftSize': return choiceOptions.craftSizeOpt;
		case 'animation': return choiceOptions.animationOpt;
		case 'animComplexity': return choiceOptions.animComplexOpt;
		case 'background': return choiceOptions.backgroundOpt;
		default: return null;
	}
}

function checkOptionValidity(blockId, choice = "not given") {
	if (choice == "not given") {
		//updateChoiceList();
		//choice = choiceList[blockList.indexOf(blockId)];
		
		//turns out js objects are like. a hybrid of java objects and python dicts. so i can do this
		choice = activeBay[blockId];
	}
	//console.log("checking " + blockId + " " + choice);
	//choiceOptions.mediaOpt.indexOf(str)
	if (getChoiceOptions(blockId).indexOf(choice) > -1) {
		//console.log(blockId + ' ' + choice + ' is valid');
		return true;
	} else if (activeBay.media == 'flatcolor' && choice == 'mini') {
		return true;
	}
	else {
		//console.log(blockId + ' ' + choice + ' is invalid');
		return false;
	}
}

function displayShellCounts() {
	const countingProofBlock = document.getElementById('countingproof');
	const shellTotalBlock    = document.getElementById('shelltotal');
	
	countingProofBlock.innerHTML = "counting: " + userCounting;
	shellTotalBlock.innerHTML = "total: " + userTotal;
}


function isBlank(x, y='n/a') {
	if (y == 'n/a') {
		return (x == null || x == undefined);
	} else {
		return ((x == null || x == undefined)&&(y == null || y == undefined));
	}
}

function blankOrEqual(x, y) {
	return (x == y || isBlank(x, y));
}