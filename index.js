var fs = require("fs");
var userArgs = process.argv.slice(2);

//reads string from file
fs.readFile('Objects.ts', "utf-8", function (err, data) {
    if (err) throw err;
    data = data.split("\n");
    console.log(data);
});