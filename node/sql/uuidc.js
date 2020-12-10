const INIT_NUMBER = 271;


exports.f1 = function (uuid) {
	var n = hash(uuid);
	return n;
}

function hash(uuid, N) {
  	const x = uuid.split("-").reduce((a,b) => a ^ Number.parseInt(b, 16), INIT_NUMBER) ;
	return arguments.length === 1 ? x : x % N;
} 
/*
const a = hash("e8219ae2-c5b7-40a8-9514-8876c0dd7539");            
const b = hash("e8219ae2-c5b7-40a8-9514-8876c0dd7539", 256);

console.log(a, b);
*/