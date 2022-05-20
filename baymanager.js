//IMPLEMENTS MULTI-BAY SUPPORT

//create a class for an individual bayfox, or multiple foxes with the same values, with the art values needed
class Bayfox {
	//if another bayfox is passed in, use those values to construct this one. else, make everything empty
	//copy is a boolean & is set by a checkbox? user decides whether this new fox should copy an existing one or not
	//bayToCopy is a Bayfox object, null by default
	//count is how many bays have these values, the user can pass this in
	
	//consider: copy part of bay info? like, copy up to a certain point
	constructor(copy = false, bayToCopy = null, count = 1) {
		//set up count, shellRates, and counting regardless of if we're copying another bay or not
		this.count = count;
		
		this.shellRates = undefined;
		this.counting = [];
		
		if (copy && bayToCopy !== null) {
			//it's supposed to be a copy AND we have a bay to copy.
			
			this.category = bayToCopy.category;
			
			this.mediaOpt = bayToCopy.mediaOpt;
			
			this.media = bayToCopy.media;
			this.coverage = bayToCopy.coverage;
			this.lines = bayToCopy.lines;
			this.shading = bayToCopy.shading;
			this.craftSize = bayToCopy.craftSize;
			this.animation = bayToCopy.animation;
			this.animComplexity = bayToCopy.animComplexity;
			
		} else {
			//it's NOT supposed to be a copy, or there was nothing to copy
			//create everything from scratch
			
			this.category = undefined;
			
			this.mediaOpt = null;
			
			this.media = undefined;
			this.coverage = undefined;
			this.lines = undefined;
			this.shading = undefined;
			this.craftSize = undefined;
			this.animation = undefined;
			this.animComplexity = undefined;
			
		}
	}
	
	//used to check if bays are identical, does NOT check count.
	//rhsBay - the bay we are comparing this one too, pretty straightforward. "rhs" stands for right hand side
	//returns true if they're identical, returns false if not
	equals(rhsBay) {
		//this is gonna be a nightmare
		//it does NOT have to compare category or mediaOpt because if their media matches those HAVE to match
		//also they have to have media and coverage to be *able* to stack, so it's OK to just return false if those are null or undeclared
		
		//short bit: this checks the media & coverage, as well as lines, shading, craftSize, and animation if applicable.
		
		let answer = true;
		if (this.media == rhsBay.media && this.coverage == rhsBay.coverage) {
			//if it's 2d, check lines and shading
			if (this.category == '2d') { 
				answer = (blankOrEqual(this.lines, rhsBay.lines) && blankOrEqual(this.shading, rhsBay.shading));
			}
			
			//else if it's a craft, check craftSize
			else if (this.category == 'craft') { answer = (this.craftSize == rhsBay.craftSize); }
			
			//we have to make sure answer is still TRUE now! if it's false return false
			if (!answer) { return false; }
			
			//check animation - if they match OR if they're both null/undefined they can stack.
			//first check if they're empty
			if ((isBlank(this.animation, rhsBay.animation))) {
				return true;
			}
			//now check if they match
			else if (this.animation == rhsBay.animation) {
				//since the animation types match, we need to see if the complexity matches
				if (this.animComplexity == rhsBay.animComplexity) {
					return true;
				}
				
			}
			
		}
		//implied else - the media and coverage don't match, or animation isn't null but doesn't match, or animComplexity doesn't match
		return false;
	}
	
	//returns a string representation of this object
	toString() {
		let str = "";
		
		//loop through the object properties and build the string
		for (let v in this) {
			if (v == 'count') {
				str += this[v]+"x ";
			}
			else if (!isBlank(this[v]) && v !== 'mediaOpt' && v !== 'category' && v !== 'shellRates' && v !== 'counting') {
				str += this[v]+" ";
			}
		}
		//str will have a space on the end now lol, lets get rid of it
		str = str.trim();
		return str;
	}
}

//initializes the active bay as a new bayfox object
let activeBay = new Bayfox();


//create a way to change activeBay
/* NOTES
 * the activeBay should Not be on the bayList.
 * When a newActiveBay is chosen from one already on the list, we DELETE IT!
 * since duplicate bays get stacked when they're "put away", we don't have to worry about them hanging out in there
 * and since we only stack bays when we put them away, we don't have to worry about our newActiveBay getting stacked (bc we don't want that)
 
 * activeBay - Bayfox object, it's static/global.
 * newActiveBay - The Bayfox object we are switching activeBay to.
 * bayList - The list of all bay settings or templates
 * stacked - true if it stacks, "added" if it doesn't
*/
function switchActiveBay(newActiveBay) {
	//PUT ACTIVEBAY AWAY
	if(!storeActiveBay()) {
		console.log('could not switch bays. reason: activeBay did not have enough information to be stored');
		showMessage('could not switch bays. reason: activeBay did not have enough information to be stored', 30000);
		
		toggleDropdown('switch');
		return;
	}
	
	//MAKE NEWACTIVEBAY THE ACTIVEBAY
	//set it!
	activeBay = newActiveBay;
	
	//is *this* bay on the bayList? or is it a new one?
	//we deal with this now because now we know that activeBay is saved!
	//and the reason we have to look for this is bc we have to delete it from the bayList hgslkdjf
	for (let b of bayList) {
		if (newActiveBay.equals(b) && newActiveBay.count == b.count) {
			//use splice to remove this one without causing issues tm
			bayList.splice(bayList.indexOf(b), 1);
		}
	}
	//hides the switch dropdown menu
	toggleDropdown('switch');
	
	//set the activebaycount to the correct bit
	resetActiveBayCount(activeBay.count);
	
	//use hideAll to update blocks & clear empty ones
	hideAll();
	
}

//returns true if it's removed, false if not
function removeBay(b) {
	//don't toggle the dropdown here, it's handled by the button
	
	if (bayList.indexOf(b) > -1) {
		bayList.splice(bayList.indexOf(b), 1);
		//console.log('bay removed from list!');
		return true;
	}
	showMessage("failed to remove bay from list", 10000);
	console.log('failed to remove bay from list');
	return false;
}

//ensure that there is ALWAYS at least 1 bay, you can't have 0
//^solution is you can't remove the activeBay!

//put away activeBay - returns true if it was added, false if not
function storeActiveBay() {
	//check validity of the active bay. can we even store it?
	if (!((checkOptionValidity('media') && checkOptionValidity('coverage')) && ((activeBay.category !== 'craft') || (checkOptionValidity('craftSize')) ) )) {
		//if it doesnt have a medium or a coverage, we can't store it
		return false;
		
	}
	//check if activeBay is on the bayList
	for (let b of bayList) {
		if (activeBay.equals(b)) {
			//activeBay can stack onto b! add its count to b's count
			b.count += activeBay.count;
			return true;
		}
	}
	//if we've looped thru and not found a matching object, we just have to add it!
	bayList.push(activeBay);
	return true;
}

//retrieve the activeBay from before counting was done!
//relies on the fact that "activeBay" does not change when you storeActiveBay() for counting
function recallActiveBay() {
	//look for activeBay on the bayList to delete it
	for (let b of bayList) {
		//we can tell if it got stacked or not by whether the count on the list is the same as the count in activeBay! if it got stacked, we UNSTACK it.
		if (activeBay.equals(b) && activeBay.count == b.count) {
			//it didn't get stacked! we just remove it
			//console.log('activeBay recalled!');
			removeBay(b);
			
		} else if (activeBay.equals(b) && activeBay.count !== b.count) {
			//it got stacked! we need to unstack it, not remove it
			//we unstack by subtracting activeBay's count from b.count, since adding them is how we stacked in the first place
			//console.log('activeBay recalled from stack!');
			b.count -= activeBay.count;
			
		}
		//and if they don't match, we keep looking of course
	}
}

function addNewBay(value) {
	//store our activeBay bc we will overwrite it with the new bay
	if(!storeActiveBay()) {
		showMessage('failed to add new bay: active bay must have valid medium and coverage to be stored', 30000);
		console.log('failed to add new bay');
		toggleDropdown('add');
		return;
	}
	
	if (value < 0 || value > bayList.size) {
		console.log('added new empty bay');
		//in this case, we make a new Bayfox WITHOUT cloning
		activeBay = new Bayfox();
		
	} else if (value == "activeBay") {
		//we should make a new bayfox cloning the ACTIVE bay
		activeBay = new Bayfox(true, activeBay);
		
	} else {
		console.log('added new bay cloned from ' + bayList[value].toString());
		activeBay = new Bayfox(true, bayList[value]);
	}
	
	toggleDropdown('add');
	//console.log('added new bayfox');
	
	//set the activebaycount to the correct bit
	resetActiveBayCount(activeBay.count);
	
	//use hideAll to update blocks & clear empty ones
	hideAll();
	
	//and prompt the artmanager to show the next thing we need to change
	showNextStep('category', null);
}

//accepts an index (or "activeBay", or -1) and returns a Bayfox object
function findBayfox(index) {
	if (index < 0 || index > bayList.size) {
		//index is too large or too small, therefore invalid
		return null;
		
	} else if (index == "activeBay") {
		//return the activeBay
		return activeBay;
		
	} else {
		//it's a valid index!
		return bayList[index];
	}
}