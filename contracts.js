//The contracts helps us check the type of things before we work on them.

//Contract -> Objects in Category Theory
const str = s => {
	if(typeof s  !== 'string'){
		throw new Error('Expected a string!');
	}else{
		return s;
	}
};

//Guarded functions -> Morphism
const repeat = s => {
	s = str(s);
	return s + s;
};

//example:
// console.log(repeat(2)); //-> Error: Expected string!
// console.log(repeat("2")); //-> 22


const any = x => x;


const typeOf = type => {
	type = str(type);
	return (s) => {
		if(typeof s  !== type){
			throw new Error(`Expected a ${type}!`);
		}else{
			return s;
		}
	};
};

//others primitive types
const bool = typeOf('boolean');
const obj = typeOf('object');
const num = typeOf('number');
const undef = typeOf("undefined");
const fun = typeOf("function");

//Number -> Number  :: Guarded function
const inc = x => {
	x = num(x);
	return num(x + 1);
};
