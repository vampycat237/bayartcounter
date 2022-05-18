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

// these collect the TOTALS from all the bays & static values
let userTotal       = 0;

//array that collects all the shit we put in
const countingObj = [
	//BASE STUFF - includes media, coverage, and craftSize (if applicable)
	//0 - base
	new Map(),
	
	//STACKABLES
	//1 - lines
	new Map(),
	
	//2 - shading
	new Map(),
	
	//animation includes animComplexity, because they get counted as one thing
	//3 - animation
	new Map()
];

//string we show the user that has all the counting stuff
let userCounting    = "";
//decides what base values are appropriate for this art
//let userRates     = null;

//counts total shells for all bays
function countShells() {
	//put away activeBay so we can count it too
	storeActiveBay();
	
	//resets the user counting values
	initialize();
	
	//loop through the bays to count up base and stackable values
	for (let b of bayList) {
		//set this bay's internal shellRates/base values
		initializeBayRates(b);
		//calculate the flat rate for this bay
		countFlatRate(b);
		//calculate the stackables for this bay
		countStackables(b);
	}
	
	//build the counting string with all of the base and stackable values
	buildCountingStr();
	
	//tack the background on the end, if applicable
	countStatic();
	
	//and stick the total on the end as well
	userCounting += " = " + userTotal;
	
	//and we're done!! show those results baby!!
	displayShellCounts();
	
	//and also pull the activeBay back out lol
	recallActiveBay();
}

function initialize() {
	userTotal = 0;
	userCounting = "";
	
	for (let item of countingObj) {
		for (let pairs of item) {
			item.delete(pairs[0]);
		}
	}
	
	for (let b of bayList) {
		b.counting = [];
	}
}

function initializeBayRates(b) {
	switch (b.media) {
		case 'grayscale':
			b.shellRates = shellRates.ratesGrayscale;
			break;
		case 'flatcolor':
			b.shellRates = shellRates.ratesFlatcolor;
			break;
		case '3dflat':
			b.shellRates = shellRates.rates3dFlat;
			break;
		case '3d':
			b.shellRates = shellRates.rates3dFull;
			break;
		case 'paper':
			if (b.craftSize == 'model') { b.shellRates = shellRates.ratesPaperModel; }
			else { b.shellRates = shellRates.ratesPaperLarge; }
			break;
		case 'food':
			if (b.craftSize == 'model') { b.shellRates = shellRates.ratesFoodModel; }
			else { b.shellRates = shellRates.ratesFoodLarge; }
			break;
		case 'clay':
			if (b.craftSize == 'model') { b.shellRates = shellRates.ratesClayModel; }
			else { b.shellRates = shellRates.ratesClayLarge; }
			break;
		case 'fabric':
			if (b.craftSize == 'model') { b.shellRates = shellRates.ratesFabricModel; }
			else { b.shellRates = shellRates.ratesFabricLarge; }
			break;
	}
}

function countFlatRate(b) {
	//headshot -> 0, halfbody -> 1, fullbody -> 2, mini -> 3
	var baseVal;
	
	switch (b.coverage) {
		case 'headshot':
			baseVal = b.shellRates[0];
			break;
		case 'halfbody':
			baseVal = b.shellRates[1];
			break;
		case 'fullbody':
			baseVal = b.shellRates[2];
			break;
		case 'mini':
			baseVal = b.shellRates[3];
	}
	
	userTotal += baseVal * b.count;
	
	//this is where we add the flatRate counting string to the counting array
	if (b.media == '3dflat') {
		//ex: "150 (flat 3d halfbody)"
		b.counting.push(baseVal + " (flat 3d " + b.coverage + ")");
	
	} else if (b.media == '3d') {
		//ex: "1000 (full 3d fullbody)"
		b.counting.push(baseVal + " (full 3d " + b.coverage + ")");
		
	} else if (b.category == 'craft') {
		//ex: "500 (model paper fullbody)"
		b.counting.push(baseVal + " (" + b.craftSize + " " + b.media + " " + b.coverage);
	
	} else {
		//ex: "200 (flatcolor fullbody)"
		b.counting.push(baseVal + " (" + b.media + " " + b.coverage + ")");
	}
}

function countStackables(b) {
	//0 is the default
	//lines first
	switch (b.lines) {
		case 'colorlines':
			userTotal += shellRates.ratesLines[1] * b.count;
			b.counting.push(" + " + shellRates.ratesLines[1] + " (colored lineart)");
			break;
		case 'lineless':
			userTotal += shellRates.ratesLines[2] * b.count;
			b.counting.push(" + " + shellRates.ratesLines[2] + " (lineless)");
			break;
		/*default:
			//puts an empty string in to make sure the indeces are all correct
			b.counting.push("");*/
	}
	//now shading!
	switch (b.shading) {
		case 'minimal':
			userTotal += shellRates.ratesShading[1] * b.count;
			userCounting += " + " + shellRates.ratesShading[1] + " (minimal shading)";
			break;
		case 'basic':
			userTotal += shellRates.ratesShading[2] * b.count;
			userCounting += " + " + shellRates.ratesShading[2] + " (basic shading)";
			break;
		case 'complex':
			userTotal += shellRates.ratesShading[3] * b.count;
			userCounting += " + " + shellRates.ratesShading[3] + " (complex shading)";
			break;
		case 'painting':
			userTotal += shellRates.ratesShading[4] * b.count;
			userCounting += " + " + shellRates.ratesShading[4] + " (painted shading)";
			break;
	}
	//now animations
	switch (b.animation) {
		case 'tween':
			switch (b.animComplexity) {
				case 'easy':
					userTotal += shellRates.ratesTweens[1] * b.count
					userCounting += " + " + shellRates.ratesTweens[1] + " (simple tween animation)";
					break;
				case 'simple':
					userTotal += shellRates.ratesTweens[2] * b.count
					userCounting += " + " + shellRates.ratesTweens[2] + " (complex tween animation)";
					break;
				case 'complexa':
					userTotal += shellRates.ratesTweens[3] * b.count
					userCounting += " + " + shellRates.ratesTweens[3] + " (fluid tween animation)";
					break;
			}
			break;
		case 'handdrawn':
			switch (b.animComplexity) {
				case 'easy':
					userTotal += shellRates.ratesAnimated[1] * b.count
					userCounting += " + " + shellRates.ratesAnimated[1] + " (easy hand-drawn animation)";
					break;
				case 'simple':
					userTotal += shellRates.ratesAnimated[2] * b.count
					userCounting += " + " + shellRates.ratesAnimated[2] + " (simple hand-drawn animation)";
					break;
				case 'complexa':
					userTotal += shellRates.ratesAnimated[3] * b.count
					userCounting += " + " + shellRates.ratesAnimated[3] + " (complex hand-drawn animation)";
					break;
			}
			break;
	}
}

function countStatic() {
	//count static!
	switch (background) {
		case 'simpleb':
			userTotal += shellRates.ratesBackgrounds[1];
			userCounting += " + " + shellRates.ratesBackgrounds[1] + " (simple background)";
			break;
		case 'depth':
			userTotal += shellRates.ratesBackgrounds[2];
			userCounting += " + " + shellRates.ratesBackgrounds[2] + " (depth background)";
			break;
		case 'complexb':
			userTotal += shellRates.ratesBackgrounds[3];
			userCounting += " + " + shellRates.ratesBackgrounds[3] + " (complex background)";
			break;
	}
}

function buildCountingObj() {
	//this function populates the countingObj's arrays with everything the foxes have accumulated in their counting arrays
	
	//loop thru each bayfox object
	for (let b of bayList) {
		//loop through the counting array
		for (let i in b.counting) {
			//the key will be redeclared as we go around the loop, but will stay constant within each iteration
			const str = b.counting[i];
			const index = locate(str)[0];
			const isInMap = locate(str)[1];
			
			if (index == null) {
				//index is null so something went wrong
				console.log("couldn't add '"+str+"' to countingObj");
				
			} else if (isInMap) {
				//it's in the map already!
				//don't add it to the map, but increment the counter by the bay's count value
				countingObj[index][str] += b.count;
				
			} else {
				//it's not in the map yet!
				//add it to the appropriate map
				countingObj[index].set(str, b.count);
				
			}
		}
	}
	//i hate it here lmao
}

function buildCountingStr() {
	/* format example:
	 * (200 (flatcolor fullbody)) x 2 + 250 (depth background)
	 * loop thru all bays looking for bits to add to our string
	 * and when we find a duplicate we like? make note of that i guess, by increasing how much of it we've seen?
	 * this doesn't make sense, i'm gonna look at these comments later and be like h u h ?
	 
	 * currently my big brain idea is to track the count in a seperate array that has to keep the same indeces lol.
	*/
	
	//first we build the counting Object
	buildCountingObj();
	
	//and then declare the (local) array where we collect all the strings in order and such
	const countingBuilder = [];
	
	//then we use that information to create our counting string
	for (var item of countingObj) {
		//outer loop loops thru base, line, shading, animation
		//inner loop loops thru individual vals for those
		for (var pair of item.entries()) {
			//pair[0] is the key, or the actual string we want
			//pair[1] is the count (how many there are of that
			
			//if count is greater than 1 we add the text like this: (text) x count
			if (pair[1] > 1) {
				countingBuilder.push("(" + pair[0] + ") x" + pair[1]);
			}
			//else we just add the text
			else {
				countingBuilder.push(pair[0]);
			}
		}
	}
	
	userCounting = countingBuilder.join(" + ");
}

function locate(str) {
	//helper method that loops thru the countingObj and looks for what it's given. returns an array of the index of countingObj it's in or should go in, and true if it's there, false if not
	//like this: [0, true] (it's a 'base' value, and it's already there)
	//if it isn't found, it returns the index where it should go, and false
	for (let item of countingObj) {
		if (item.has(str)) {
			return [countingObj.indexOf(item), true];
		}
	}
	//if we get here, it ain't here sister! return null for the key and -1 for the index so we know its SUPER NOT THERE
	
	/*INCONSISTENCIES BTWN LISTS & COUNTING STR:
	 * complex - shading has "complex", animation has "complexa", background has "complexb", but they are ALL put in as "complex".
	 * tweens - tweens have easy, simple, and complex in the backend, but the viewer sees simple, complex, and fluid respectively.
	 * handdrawn  - spelled "hand-drawn" in the str
	 * painting   - spelled "painted" in the str
	 * colorlines - spelled "colored lineart" in the str
	 
	 * nice thing though is that ALL of those have to do with values, NOT keys!
	 */
	
	//check contents to see what key they belong in!
	//first we split our string into an array! this way we can
	strArray = str.substring(str.indexOf("(")+1,str.indexOf(")")).split(" ");
	
	for (val of strArray) {
		//check to see if it goes in "base" (if it has a coverage in it)
		if (choiceOptions.coverageOpt.indexOf(val) > -1 || val == 'mini') {
			return [0, false];
		}
		//STACKABLES
		//lines - since "colored lines" has a space, we'll only get one. luckily "colored" only is used in the context of colored lines
		else if (val == 'colored' || val == 'lineless') {
			return [1, false];
		}
		//shading - all shading descriptions include the word "shading", so we can just wait til we find it
		else if (val == 'shading') {
			return [2, false];
		}
		//animation - all animation descriptions include the work "animation", so again we can just look for that
		else if (val == 'animation') {
			return [3, false];
		}
		
	}
	
	//if we get here something's wrong, return null for the index
	return [null, false];
}