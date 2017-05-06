//The contracts helps us check the type of things before we work on them.

const str = (s) => {
	if(typeof s  !== 'string'){
		throw new Error('Expected a string!');
	}else{
		return s;
	}
};

const repeat = (s) => {
	s = str(s);
	return s + s;
};

//example:
// console.log(repeat(2)); //-> Error: Expected string!
// console.log(repeat("2")); //-> 22
