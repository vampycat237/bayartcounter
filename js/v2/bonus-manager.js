//STACKABLE (and static) CLASS
//ALL stackables expect their value & a type to be given.

//TODO
//SUPERCLASS: BonusVal
class BonusVal {
	//value = int. shell value of this bonus
	//type  = string. what is granting this bonus
	constructor(value, type = "generic bonus") {
		this.type  = type;
		this.value = value;
	}
	
	toString() {
		//string format: "value (bonus type)"
		return this.value +" ("+this.type+")";
	}
	
	countSelf() {
		return this.value;
	}
}

//TODO
class Background extends BonusVal {
	//value = shell value
	//type  = type of background.
	constructor(value, type) {
		super(value, type+" background");
	}
}

//TODO
//TODO: consider calculating values for these instead of requiring they be provided
//Stackable class
class StackableVal extends BonusVal {
	//value = the value of ONE of these
	//type  = lines, shading, animation types
	//count = number of times to apply this bonus. will be counted with countSelf()
	constructor(value, type, count = 1) {
		this.count = count;
		super(value, type);
	}
	
	//overrides toString to account for count
	toString() {
		//string format: "value (#x bonus type)"
		return countSelf()+" ("this.count+"x "+this.type+")";
	}
	
	//overrides countSelf to account for count
	countSelf() {
		return this.value * this.count;
	}
}

//TODO
//TODO: Make it accept a Pet object, if pets are stored as objects
//Pet bonus class
class PetBonus extends StackableVal {
	//value = Shell or percentage (decimal) value of this pet.
	//type = type of pet
	//func = how this value should be added to the total. can equal "+", "*", or "RNG", for flat, percentage, and RNG bonuses respectively. (RNG bonuses are not added to the total, but will call for RNG bonuses to be accounted for at the end.
	constructor(value, type, count = 1, func = "+") {
		super(value, type, count)
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