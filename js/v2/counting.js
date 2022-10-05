//fun fact i almost named this object moneymachine
const counting = {
	proof : document.getElementById('counting-proof'),
	total : document.getElementById('counting-total'),
	
	stringArray : [],
	
	totals() {
		//reset total
		userTotal = 0;
		
		//count base values
		for (i = 0; i < baseValues.length; i++) {
			var tmp = baseValues[i].value
			userTotal += tmp;
			//TODO: combine duplicate values before counting
			this.stringArray.push(tmp +" ("+ baseValues[i].toString() +")");
		}
		//TODO: count stackables
		//TODO: count static
		
		this.update();
	},
	
	assembleProof() {
		return this.stringArray.join(" + ") + " = " + userTotal;
	},
	
	update() {
		this.total.innerHTML = "total: "+userTotal;
		this.proof.innerHTML = "counting: "+this.assembleProof();
	}
}