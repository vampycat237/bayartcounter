//helper methods for artmanager!

//hides the given section
//both parameters are strings
function hideSection(block, choice) {
	//hide previous section & show its collapsed button
	sectionToHide = document.getElementById(block);
	stickyButton  = document.getElementById(block+'sticky');
	if(sectionToHide !== null && stickyButton !== null && sectionToHide.style.display !== "none") {
		sectionToHide.style.display = "none";
		if(document.getElementById(choice) !== null) {
			stickyButton.innerHTML      = block + ": " + document.getElementById(choice).innerHTML;
			stickyButton.style.display  = "block";
		}
	}
}

//clears the given section (removes its stickybutton too)
function clearSection(block) {
	sectionToClear = document.getElementById(block);
	stickyButton   = document.getElementById(block+'sticky');
	if(sectionToClear !== null && stickyButton !== null) {
		sectionToClear.style.display = "none";
		stickyButton.style.display   = "none";
	}
}

//hides every block EXCEPT for counting
function hideAll() {
	for (let block of blockList) {
		hideSection(block, choiceList[blockList.indexOf(block)]);
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
		if (category == '2d') {
			return 'lines';
		}else if (category == 'craft') {
			return 'craftSize';
		} else {
			return 'animation';
		}
	case 'lines':
		return 'shading';
	case 'shading':
	case 'modelSize':
		return 'animation';
	case 'animation':
		if (animation !== null) {
			return 'animComplexity';
		} else {
			return 'background';
		}
	//if something else happens somehow, return null, we have to stop lmao.
	default:
		return null;
	}
}

//updates the choiceList
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
}

//checks for the existence of illegal matchups, starting at the top!
//parameter is a string
function legalityChecker(currentStep) {
	
	//make our list of illegal stuff we did
	let violationList = [];
	
	//top-level checks for category getting out of sync with media, they will simply re-assign themself to the correct one if the most recent thing that was messed with was the medium.
	
	//just realized this is an impossible case
	/*if (//media option is invalid for the category, we are choosing a new medium, and medium isn't null (to make sure we don't make category vanish)
		mediaOpt.indexOf(media) < 0 &&
		currentStep == 'media' &&
		media !== null
		) {
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
	}*/
	//now THIS one occurs if category is re-assigned, and is the only else-if here. If the user re-assigns the category, we bonk the mismatching medium!
	//try {
	if (mediaOpt.indexOf(media) < 0 && currentStep == 'category' && media !== undefined) {
		violationList.push("new media category "+category+" does not include medium "+media);
		media = "illegal";
		//throw "media-mismatch";
	}
	//NO MORE IF-ELSES FROM HERE ON OUT!! we have to catch ALL the issues!
	//anyway now we check to see if mini is assigned to anything but flatcolor!
	if (coverage == 'mini'   && media !== 'flatcolor') {
		violationList.push("coverage 'mini' is flatcolor only");
		coverage = "illegal";
		//throw "invalid-coverage";
	}
	//check to see if mini has lineless value OR if grayscale has colored lines
	if ((coverage == 'mini'  && lines == 'lineless') || (media == 'grayscale' && lines == 'colorlines')) {
		violationList.push("lineart '"+lines+"' does not apply to medium "+media);
		lines = "illegal";
		//throw "invalid-lineart";
	}
	//check to see if anything not 2d has lines, and if so get rid of em
	if (category !== '2d'    && lines !== null) {
		violationList.push("lineart is 2d only");
		lines = "illegal";
		//throw "invalid-lineart";
	}
	
	//^same but with shading
	if (category !== '2d'    && shading !== null) {
		violationList.push("shading is 2d only");
		shading = "illegal";
		//throw "invalid-shading";
	}
	
	//makes sure non-crafts don't have craftSize
	if (category !== 'craft' && craftSize !== null) {
		violationList.push("craftSize is craft only");
		craftSize = "illegal";
		//throw "invalid-craftSize"
	}
	
	
	//log our crimes to the console
	if (violationList.length > 0) {
		console.log("violations: " + violationList.join(", "));
	}
	
	/*} catch (err) {
		console.log('caught media-mismatch');
	}*/
	
	//update the list...
	updateChoiceList();
	
	//OKAY NOW!! clear the stickybuttons for everything that's changed to null!!
	for (let block of blockList) {
		matchingBlock = document.getElementById(block);
		matchingButton = document.getElementById(block + 'sticky');
		
		let choice = choiceList[blockList.indexOf(block)];
		console.log('checking choice '+choice);
		
		if (choice == "illegal") {
			choice = null;
			if (matchingBlock !== null && matchingButton !== null) {
				console.log("clearing " + block);
				clearSection(block);
			}
		}
	}
	
	//update the variables to match the list
	updateChoiceVars();
}

