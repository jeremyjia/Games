
var mysql = require('mysql');

exports.showTable = function (res,tb) {
	console.log("iShow 1:" + tb);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "xd178090xd",
      database: "mydb"
    });
     
    con.connect(function(err) {      
      if (err) throw err;
      con.query("SELECT name, address FROM " + tb, function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        res.write('<table id="myTable">');
        res.write('<tr>');
        res.write('<th>NO.</th>');
        res.write('<th>Name</th>    <th>Country</th>');
        res.write('<th>Del</th>');
        res.write('</tr>');

        for(i in result){
          res.write('<tr>');
          res.write('<td>');
          res.write(i);
          res.write('</td>');
          res.write('<td>');
          res.write(result[i].name);
          res.write('</td>');
          res.write('<td>');
          res.write(result[i].address);
          res.write('</td>');
          res.write('<td>');
          var s = "<button id='x";
          s += i;
          s += "'>";
          s += "X</button>";
          res.write(s);
          res.write('</td>');
          res.write('</tr>'); 
        }
        res.write('</table>');
       // res.write(result);  
        res.end();
      });
    });
	return ;
};