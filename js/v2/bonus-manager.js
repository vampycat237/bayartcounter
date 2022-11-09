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
		return this.type;
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
	
	//overrides countSelf to account for count
	countSelf() {
		return this.value * this.count;
	}
}

//TODO
//TODO: Make it accept a Pet object, if pets are stored as objects
//Pet bonus class
class PetBonus extends StackableVal {
	//type = type of pet
	//func = how this value should be added to the total. can equal "+", "*", or "RNG", for flat, percentage, and RNG bonuses respectively. (RNG bonuses are not added to the total, but will call for RNG bonuses to be accounted for at the end.
	constructor(value, type, count = 1, func = "+") {
		super(value, type, count)
	}
	
	//TODO
	//overrides toString to account for RNG pets
	toString() {
		if (this.func == "RNG") {
			//do RNG pet stuff
		} else {
			//do normal pet stuff
		}
		//TEMP
		return this.type;
	}
	
	//TODO
	//overrides countSelf to account for different functions
	countSelf() {
		if (this.func == "*") {
			//do the multiplication
		}
		else if (this.func == "RNG") {
			//handle RNG
		}
		else {
			//assume addition
			return this.value * this.count;
		}
	}
}