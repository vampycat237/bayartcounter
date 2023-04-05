//STACKABLE (and static) CLASS
//ALL stackables expect their value & a type to be given.

//Store bonuses in here.
var stackableBonuses = [];
const staticBonuses = [];

//TODO
//SUPERCLASS: Val
class Val {
	//value = int. shell value of this item
	//type  = string. what type of value is this (base, static, stackable, pet)
	constructor(value) {
		this.value = value;
		//countSelf()
		//this.type  = type;
	}
	
	//Returns a string representation of this object. Does not include value.
	toString() {
		return "generic value";
	}
	
	//Returns a string representing this object and its value, for counting.
	countingString() {
		return this.value + " (" + this.toString() + ")";
	}
	
	//ABSTRACT FUNCTION: countSelf()
	//Should always count its own value and save that as value.
	/*countSelf() {
		return;
	}*/
}

//TODO
//SUPERCLASS: StaticVal
class StaticVal extends Val {
	//value  = int. shell value of this bonus
	//source = string. what specifically is granting this bonus? (treasure trove, lineless, etc)
	//type   = string. category of bonus (bonus, background, lines, etc)
	constructor(value, source = "generic", type = "bonus") {
		super(value);
		this.subtype = source;
		this.type = type;
		//this.type  = "bonus";
		//this.value = value;
	}
	
	toString() {
		//string format: "bonusType type"
		//examples: "treasure trove bonus", "depth background"
		return this.subtype + " " + this.type;
	}
	
	//Can use countingString() from parent class
	
	//This countSelf() is so abstract we don't need it
	/*countSelf() {
		return this.value;
	}*/
}

//TODO
class Background extends StaticVal {
	//value = shell value
	//backgroundType = type of background. Used to calculate value
	constructor(backgroundType) {
		//TODO: calculate value based on backgroundType
		super(0, backgroundType, "background");
		this.countSelf();
	}
	
	//Can use countingString() from parent class

	//Change the background type
	setBackground(backgroundType) {
		this.subtype = backgroundType;
		this.countSelf();
	}

	//TODO
	countSelf() {
		var v = 0;
		
		switch (this.subtype) {
			case "simple":
				v = shellRates.ratesBackgrounds[1];
				break;
			case "depth":
				v = shellRates.ratesBackgrounds[2];
				break;
			case "complex":
				v = shellRates.ratesBackgrounds[3];
				break;
			default:
				v = shellRates.ratesBackgrounds[0];
				break;
		}
		
		this.value = v;
	}
}

//TODO
//TODO: consider calculating values for these instead of requiring they be provided
//Stackable class
class StackableVal extends StaticVal {
	//type = lines, shading, animation etc
	//subtype  = lines, shading, animation TYPES. simple, complex, etc.
	//count = number of times to apply this bonus. will be counted with countSelf()
	constructor(type, subtype, count = 1) {
		super(0, subtype, type);
		this.count = count;
		//TODO: calculate value based on type and stackableType
		this.countSelf();
		
	}
	
	//overrides toString to account for count
	toString() {
		//string format: "#x bonus type"
		return this.count + "x " + this.subtype + " "+ this.type;
	}
	
	//countingString() is inhereited from parent
	
	//Calculates value from shellRates
	countSelf() {
		//start by if we have count less than 1 (0 or somehow negative), we just return 0. no complications required
		if (this.count < 1) { return 0; }

		var rates = [];
		var i = 0;
		
		switch (this.type) {
			case "lines" : rates = shellRates.ratesLines; break;
			case "shading" : rates = shellRates.ratesShading; break;
			case "animtween" : rates = shellRates.ratesTweens; break;
			case "animhanddrawn" : rates = shellRates.ratesAnimated; break;
			default:
				rates = [0,0,0,0];
				console.log("invalid type on a stackable value with subtype '"+this.subtype+"'");
				break;
		}
		
		switch (this.subtype) {
			case "colorlines": //lines
			case "minimal": //shading
			case "easy": //animation - handdrawn
			case "tsimple": //animation - tween
				i = 1;
				break;
				
			case "lineless": //lines
			case "basic": //shading
			case "hsimple": //animation - handdrawn
			case "tcomplex": //animation - tween
				i = 2;
				break;
				
			case "complex": //shading
			case "hcomplex": //animation - handdrawn
			case "fluid": //animation - tween
				i = 3;
				break;
			
			case "painting": //shading
				i = 4;
				break;
			
			default:
				i = 0;
				break;
		}
		
		this.value = rates[i] * this.count;
	}
}

class Lineart extends StackableVal {
	//To keep consistent with parent class we refer to the type of lineart as "subtype".
	constructor(subtype, count = 1) {
		super("lines", subtype, count);
	}
}

class Shading extends StackableVal {
	constructor(subtype, count = 1) {
		super("shading", subtype, count);
	}
}

//Named AnimationVal to avoid conflicts with existing JS classes
class AnimationVal extends StackableVal {
	//expects subtype as the ID, so like tween-simple or handdrawn-easy
	constructor(subtype, count = 1) {
		//set type
		var type = "anim";
		if (subtype.startsWith('tween-')) {
			type += 'tween';
		}
		else {
			type += 'handdrawn';
		}
		//set subtype properly
		subtype = subtype.substr(subtype.indexOf('-') + 1);

		//fix subtype for overlap
		if (subtype == 'simple' || subtype == 'complex') {
			subtype = type.charAt(4) + subtype;
		}
		
		//console.log(subtype);
		super(type, subtype, count);
	}

	toString() {
		//string format: "#x bonus type"
		var tempSubtype = this.subtype;
		if (this.subtype.charAt(0) == 't' || this.subtype.charAt(0) == 'h') {
			tempSubtype = this.subtype.substr(1);
		}
		return this.count + "x " + tempSubtype + " " + this.type.substr(4);
	}
}

//TODO
//TODO: Make it accept a Pet object, if pets are stored as objects
//Pet bonus class
class PetBonus extends StackableVal {
	//value = Shell or percentage (decimal) value of this pet.
	//type = type of pet
	//func = how this value should be added to the total. can equal "+", "*", or "RNG", for flat, percentage, and RNG bonuses respectively. (RNG bonuses are not added to the total, but will call for RNG bonuses to be accounted for at the end.
	constructor(value, petType, count = 1, func = "+") {
		super(value, petType, count);
		this.func = func;
	}
	
	//TODO
	//overrides toString to account for RNG pets
	toString() {
		if (this.func == "RNG") {
			//TODO
			//do RNG pet stuff
			return "RNG for "+this.type;
		}
		else if (this.func == "*") {
			//TODO
			//show how the multiplication goes
			return countSelf()+" ("+this.count+"x "+this.value*100+"% bonus of"+userTotal+" from"+this.type+")"
		}
		else {
			//do normal pet stuff
			return countSelf()+" ("+this.count+"x "+this.type+")";
		}
	}
	
	//TODO
	//overrides countSelf to account for different functions
	countSelf() {
		if (this.func == "*") {
			//do the multiplication
			return userTotal * this.value;
		}
		else if (this.func == "RNG") {
			//TODO: handle RNG
			return 0; //Returns 0 so that no shell value is added to the total
		}
		else {
			//assume addition
			return this.value * this.count;
		}
	}
}

function countStackables() {
	//lineart
	stackableBonuses.push(new Lineart('colorlines', document.getElementById('colorlines').value));
	stackableBonuses.push(new Lineart('lineless', document.getElementById('lineless').value));

	//shading
	stackableBonuses.push(new Shading('minimal', document.getElementById('minimal').value));
	stackableBonuses.push(new Shading('basic', document.getElementById('basic').value));
	stackableBonuses.push(new Shading('complex', document.getElementById('complex').value));
	stackableBonuses.push(new Shading('painting', document.getElementById('painting').value));

	//animation
	stackableBonuses.push(new AnimationVal('tween-simple', document.getElementById('tween-simple').value));
	stackableBonuses.push(new AnimationVal('tween-complex', document.getElementById('tween-complex').value));
	stackableBonuses.push(new AnimationVal('tween-fluid', document.getElementById('tween-fluid').value));
	stackableBonuses.push(new AnimationVal('handdrawn-easy', document.getElementById('handdrawn-easy').value));
	stackableBonuses.push(new AnimationVal('handdrawn-simple', document.getElementById('handdrawn-simple').value));
	stackableBonuses.push(new AnimationVal('handdrawn-complex', document.getElementById('handdrawn-complex').value));
}