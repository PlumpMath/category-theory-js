//The contracts helps us check the type of things before we work on them.

//Contract -> Objects in Category Theory
const str = s => {
	if(typeof s  !== 'string'){
		throw new TypeError('Expected a string!');
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
// console.log(repeat(2)); //-> TypeError: Expected string!
// console.log(repeat('2')); //-> 22


const any = x => x;


const typeOf = type => {
	type = str(type);
	return (s) => {
		if(typeof s  !== type){
			throw new TypeError(`Expected a ${type}!`);
		}else{
			return s;
		}
	};
};

//others primitive types
const bool = typeOf('boolean');
const obj = typeOf('object');
const num = typeOf('number');
const undef = typeOf('undefined');
const fun = typeOf('function');

//Number -> Number  :: Guarded function
const inc = x => {
	x = num(x);
	return num(x + 1);
};

//Contract [array]
const arr = a => {
	if({}.toString.call(a) !== '[object Array]'){
		throw new TypeError('Expected a array!');
	}else{
		return a;
	}
};

//example:
//console.log(arr([1, 2, 3])); //-> [1, 2, 3]
//console.log(arr("[1, 2, 3]")); //-> TypeError: Expected a array!

const arrOf = c => a => arr(a).map(c);

const Maybe = function(){};
const None = function(){};
None.prototype = Object.create(Maybe.prototype);
None.prototype.toString = () => 'None';
const none = new None();

const Some = function(x) {
	this.x = x;
};

Some.prototype = Object.create(Maybe.prototype);
Some.prototype.toString = function(){ return `Some(${this.x})`; };
const some = x => new Some(x);

const maybe  = c => m => {
	if(m instanceof None){
		return m;
	}else if(m instanceof Some){
		return some(c(m.x));
	}else{
		throw new TypeError('Expected None or Some(value)!');
	}
};

Maybe.prototype.getOrElse = function(x){
	if(this instanceof Some){
		return this.x;
	}else{
		return x;
	}
};

console.log(maybe(repeat)(none).getOrElse('victor')); // -> victor
console.log(maybe(repeat)(some('igor'))); // -> Maybe { x: 'igorigor' }
