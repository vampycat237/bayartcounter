//STACKABLE (and static) CLASS
//ALL stackables expect their value & a type to be given.

//TODO
//SUPERCLASS: Val
class Val {
	//value = int. shell value of this item
	//type  = string. what type of value is this (base, static, stackable, pet)
	constructor(value) {
		this.value = value;
		countSelf()
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
	countSelf() {
		return;
	}
}

//TODO
//SUPERCLASS: StaticVal
class StaticVal extends Val {
	//value  = int. shell value of this bonus
	//source = string. what specifically is granting this bonus? (treasure trove, lineless, etc)
	//type   = string. category of bonus (bonus, background, lines, etc)
	constructor(value, source = "generic", type = "bonus") {
		this.subtype = source;
		this.type = type;
		super(value);
		//this.type  = "bonus";
		//this.value = value;
	}
	
	toString() {
		//string format: "bonusType type"
		//examples: "treasure trove bonus", "depth background"
		return subtype + " " + type;
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
		this.value = 0;
		countSelf()
		
		super(this.value, backgroundType, "background");
	}
	
	//Can use countingString() from parent class
	
	//TODO
	countSelf() {
		var v = 0;
		
		switch (this.subtype) {
			case "simple" : v = shellRates.ratesBackgrounds[1]; break;
			case "depth"  : v = shellRates.ratesBackgrounds[2]; break;
			case "complex": v = shellRates.ratesBackgrounds[3]; break;
			default       : v = shellRates.ratesBackgrounds[0]; break;
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
		this.count = count;
		//TODO: calculate value based on type and stackableType
		this.value = 0;
		countSelf();
		
		super(this.value, subtype, type);
	}
	
	//overrides toString to account for count
	toString() {
		//string format: "#x bonus type"
		return this.count + "x " + this.type;
	}
	
	//countingString() is inhereited from parent
	
	//Calculates value from shellRates
	countSelf() {
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
			case "easy": //animation
				i = 1;
				break;
				
			case "lineless": //lines
			case "basic": //shading
			case "simple": //animation
				i = 2;
				break;
				
			case "complex": //shading & animation
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

//TODO
//TODO: Make it accept a Pet object, if pets are stored as objects
//Pet bonus class
class PetBonus extends StackableVal {
	//value = Shell or percentage (decimal) value of this pet.
	//type = type of pet
	//func = how this value should be added to the total. can equal "+", "*", or "RNG", for flat, percentage, and RNG bonuses respectively. (RNG bonuses are not added to the total, but will call for RNG bonuses to be accounted for at the end.
	constructor(value, petType, count = 1, func = "+") {
		super(value, petType, count);
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
			return countSelf()+" ("this.count+"x "+this.type+")";
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