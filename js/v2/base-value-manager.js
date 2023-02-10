//BASE VALUE EDITOR MANAGEMENT
//TODO: store last saved media in here
var lastMedia  = "flatcolor";
//Tracks if there has been a recent deletion
var recentDeletion = false;
//TODO: store base values in here
var baseValues = [];
//Background is stored here to avoid errors
const background = new Background(null);

//Shows BaseVal editor while making its title change to fit the action being performed
//parameter action: a string. either "edit" or "new"/"create"/"add"
//parameter i: an int, meant to be the BaseVal's index
function openBaseValEditor(action, i = -1) {
	//FIRST we make sure there hasn't been a recent deletion (within the past few milliseconds). If there has we cancel, and remove the flag.
	if (recentDeletion) { return; }
	
	var title = "base value editor";
	var count = 1;
	var media = lastMedia; //assumes this medium is likely to match the last saved one!
	var coverage = "fullbody";
	
	//calls actionIsEdit() to check for valid edit requests. if it's valid for editing it returns true, otherwise it returns false. it also prints an error when there is an invalid action passed in.
	if (actionIsEdit(action, i)) {
		//console.log("opening base value editor: edit");
		
		//set title & set values to the stuff from the object we are editing
		title = "edit base value";
		
		//TODO: retrieve the needed information from the BaseVal at the specified index
		const bv = baseValues[i];
		count = bv.count;
		media = bv.media;
		coverage = bv.coverage;
		size  = bv.craftSize;
		
		//TODO: fetch BaseVal's content to display for editing
		
	} else {
		//console.log("opening base value editor: add new");
		//force action to be set to 'add', if it isn't already
		//(should prevent invalid index errors later, and make action processing easier)
		action = "add"
		
		//set title, leave other stuff as default
		title = "add new base value";
	}
	
	//now we are clear to update the editor's into then show the editor
	//edit the innerHTML
	baseValEditor.header.innerHTML = title;
	baseValEditor.count.value  = count;
	baseValEditor.media.value  = media;
	baseValEditor.coverage.value = coverage;
	
	//set the hidden values
	baseValEditor.action.value = action;
	baseValEditor.index.value  = i;
	
	//housekeeping
	forceOpen(sidebar.sections.BV);
	onMediumChange();
	
	//show the editor
	show(baseValEditor.editor);
	
}

function cancelBaseValEditor() {
	releaseForce(sidebar.sections.BV);
	hide(baseValEditor.editor);
}

//When confirming action using the baseValEditor, this is called.
//Checks the validity of the action, preps the information for storage, and calls the appropriate helper with the info it needs.
function storeBaseVal() {
	//Creates a new BaseVal object using the information in the editor.
	//BaseVal needs media, coverage, count, and craftSize if applicable
	
	//Ensure valid craftSize
	var craftSize = baseValEditor.size.value;
	if ( craftSize == "null") { 
		craftSize = "model";
		if (isCraft(baseValEditor.media.value)) { showMessage("No size was specified for a craft. It was added anyway with size 'model'."); }
	}
	
	//Create new BaseVal & save the medium information
	const bv = new BaseVal(baseValEditor.media.value, baseValEditor.coverage.value, baseValEditor.count.value, craftSize);
	lastMedia = baseValEditor.media.value;
	
	//Hand the object to the appropriate helper function to execute the appropriate action
	if (baseValEditor.action.value == "edit") {
		editBaseVal(bv, baseValEditor.index.value);
	} else {
		//assume "add"
		addBaseVal(bv);
	}
	
	//update the sidebar BV holder & release it
	updateBVHolder();
	releaseForce(sidebar.sections.BV);
	
	//close the BV editor
	hide(baseValEditor.editor);
}

//Replaces the existing BaseVal at the specified index with the one passed in.
//paramether bv: New BaseVal object created in the editor. Will replace old one.
//parameter i: Index of BaseVal to replace.
function editBaseVal(bv, i) {
	//grab original BaseVal to compare
	const oldBv = baseValues[i];
	//replace the old baseval with the new one
	baseValues[i] = bv;
	
	//console.log("updated base val "+oldBv.toString()+" to "+bv.toString()+" at index "+i);
}

//Upon confirming add BaseVal, add the new BaseVal to the list.
//paramether bv: BaseVal object created by the editor
function addBaseVal(bv) {
	//TODO: add the new baseval to the end of the list
	baseValues.push(bv);
	
	//console.log("added new base val "+bv.toString()+" at index "+(baseValues.length - 1));
}

//TODO: Remove the BaseVal at the specified index.
function removeBaseVal(i) {
	recentDeletion = true;
	console.log("removed "+baseValues[i].toString());
	baseValues.splice(i, 1);
	updateBVHolder();
	
	setTimeout(function() {recentDeletion = false;}, 500);
}

//checks action! returns true for edit, false for anything else, and prints an error if the action is invalid
//parameter: string action
//returns: bool, based on if action == edit
function actionIsEdit(action, i = -1) {
	//case: edit
	if (action == "edit" && i >= 0 && i < baseValues.length) { return true; }
	
	//case: create new
	if (action == "new" || action == "create" || action == "add") { return false; }
	
	//case: invalid action
	console.log("invalid action passed to base value editor. defaulting to adding new value");
	showMessage("invalid action passed to base value editor.<br>defaulting to adding new value");
	return false;
}

//UPDATER METHODS
baseValEditor.media.addEventListener('input', function(evt) { onMediumChange() } );
//called by event listener
function onMediumChange() {
	updateMini();
	updateSize();
}

//When the medium is changed, check whether Mini should be disabled.
function updateMini() {
	if (baseValEditor.media.value == "flatcolor") {
		//media should be enabled
		baseValEditor.coverageMini.disabled = false;
		
	} else {
		//media should be disabled
		baseValEditor.coverageMini.disabled = true;
	}
}

//TODO: When the medium is changed, check whether Sizes should be disabled.
function updateSize() {
	if (isCraft(baseValEditor.media.value)) {
		baseValEditor.sizes.model.disabled = false;
		baseValEditor.sizes.large.disabled = false;
	} else {
		baseValEditor.sizes.model.disabled = true;
		baseValEditor.sizes.large.disabled = true;
	}
}

//BASE VALUE CLASS AND MANAGEMENT

//Helper method. Determines what type a medium is
function getMediaCategory(medium) {
	if (medium == "flatcolor" || medium == "grayscale") {
		return "2d";
	}
	else if (medium == "3d" || medium == "3dflat") {
		return "3d";
	}
	else {
		return "craft";
	}
}

//Helper method. Determines if a medium is a craft medium or not.
function isCraft(medium) {
	return getMediaCategory(medium) == "craft";
}


//base value class
//REQUIRES VAL from bonus-manager.js
class BaseVal extends Val {
	//make our new BaseVal object
	constructor(media, coverage, count = 1, craftSize = 'model') {
		//We have to call super() first or it dies
		super(0);

		this.media = media;
		this.coverage   = coverage;
		this.count      = count;
		
		//craft related things
		//only used by crafts, defaults to model to avoid errors
		this.craftSize  = craftSize;
		this.isCraft    = isCraft(media);
		
		//set value
		this.countSelf();
		
		//we don't need to call super bc we already set value with countSelf()
	}
	
	//Returns a string representation of this object. Does not include value.
	toString() {
		let str = "";
		
		str += this.count + "x ";
		if (this.isCraft) { str += this.craftSize + " " }
		str += this.media + " ";
		str += this.coverage;
		
		return str;
	}
	
	//countingString(): Returns a string representing this object and its value, for counting. Defined in parent class.
	
	//Sets its own value based on the medium, coverage, size, and count. Requires a shellRates object
	countSelf() {
		//aquire appropriate rates list
		var rates;
		const isModel = this.craftSize != "large";
		switch (this.media) {
			case "flatcolor": rates = shellRates.ratesFlatcolor; break;
			case "grayscale": rates = shellRates.ratesGrayscale; break;
			
			case "3d":     rates = shellRates.ratesFlatcolor; break;
			case "3dflat": rates = shellRates.ratesFlatcolor; break;
			
			case "paper":
				if (isModel) { rates = shellRates.ratesPaperModel; break; }
				else { rates = shellRates.ratesPaperLarge; break; }
			case "food":
				if (isModel) { rates = shellRates.ratesFoodModel; break; }
				else { rates = shellRates.ratesFoodLarge; break; }
			case "clay":
				if (isModel) { rates = shellRates.ratesClayModel; break; }
				else { rates = shellRates.ratesClayLarge; break; }
			case "fabric":
				if (isModel) { rates = shellRates.ratesFabricModel; break; }
				else { rates = shellRates.ratesFabricLarge; break; }
			
			default: rates = shellRates.ratesFlatcolor; break;
		}
		
		
		//set up coverage access
		var i;
		switch (this.coverage) {
			case "headshot": i = 0; break;
			case "halfbody": i = 1; break;
			case "fullbody": i = 2; break;
			case "mini":
				if (this.media == "flatcolor") { i = 3; break; }
			default:
				//assume fullbody. set values accordingly
				this.coverage = "fullbody";
				i = 2;
				break;
		}
		
		//calculate value
		this.value = rates[i] * this.count;
		console.log("counted "+this.toString()+" for a total of "+this.value+" shells");
	}
}