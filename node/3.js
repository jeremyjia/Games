var fs 		= require('fs');

fs.appendFile('p.txt', "appendFile Test", function (err){
	if(err) throw err;
	console.log('Saved!');
});