exports.sum = function(a,b) { return a+b; };
exports.Person = function Person (name) {
	this.name = name;
	this.introduce = function() {
		console.log('my name is', this.name);

	}
};