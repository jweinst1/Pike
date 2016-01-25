var fs = require('fs');
var userArgs = process.argv.slice(2);

//reads string from file
fs.readFile(userArgs[0], 'utf-8', function (err, data) {
    if (err) throw err;
    data = data.split("\n");
    var readstring = Transcompiler.transcompile(data);
    fs.writeFile(userArgs[1], readstring, function (err) {
        if (err) throw err;
        console.log('Your file has been transcompiled to Javascript');
    });
});




var assignops = (function () {
    function assignops() {
    }
    //processes assignment statements
    assignops.assign = function (line) {
        var matches = /([^ \(\)]+) :> ([^ \(\)]+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var tempstr = "var " + matches[1] + " = " + matches[2] + ";";
        return line.replace(/([^ \(\)]+) :> ([^ \(\)]+)/, tempstr);
    };
    return assignops;
})();
//class for integrated comparison operators
var comparops = (function () {
    function comparops() {
    }
    //enables an is operator
    comparops.isop = function (line) {
        return line.replace(/ is /, " == ");
    };
    //fully featured null comparison operator
    comparops.nullop = function (line) {
        var matches = /([^ \(\)]+) =>n/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + " === null && typeof " + matches[1] + " === \"object\"";
        return line.replace(/([^ \(\)]+) =>n/, newstr);
    };
    //array in operator
    comparops.inop = function (line) {
        var matches = /([^ \(\)]+) in-a (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newline = "(function(" + matches[2] + ", " + matches[1] + ") { for(i=0;i<" + matches[2] + ".length;i++) if(" + matches[2] + "[i]==" + matches[1] + ") return true; return false;})(" + matches[2] + ", " + matches[1] + ")";
        return line.replace(/([^ \(\)]+) in (\[[^\[\]]+\]|[^ \(\)]+)/, newline);
    };
    return comparops;
})();
var mathops = (function () {
    function mathops() {
    }
    //processes a multiincrement statement
    mathops.increment = function (line) {
        var matches = / (.+?)(\+\++)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var amount = matches[2].length - 1;
        return matches[1] + " += " + amount.toString() + ";";
    };
    //processes a multidecrement statement
    mathops.decrement = function (line) {
        var matches = / (.+?)(\--+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var amount = matches[2].length - 1;
        return matches[1] + " -= " + amount.toString() + ";";
    };
    //multi power statement
    mathops.powerment = function (line) {
        var matches = / (.+?)(\*\*+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var amount = matches[2].length - 1;
        return "Math.pow(" + matches[1] + ", " + amount.toString() + ")";
    };
    //deals with the power operator
    mathops.power = function (line) {
        var matches = /([0-9]+) \*\* ([0-9]+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "Math.pow(" + matches[1] + ", " + matches[2] + ")";
        return line.replace(/([0-9]+) \*\* ([0-9]+)/, newstr);
    };
    //max operator
    mathops.max = function (line) {
        var matches = /m\^ ([0-9a-zA-Z, ]+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "Math.max(" + matches[1] + ")";
        return line.replace(/m\^ ([0-9a-zA-Z, ]+)/, newstr);
    };
    //min operator
    mathops.min = function (line) {
        var matches = /m_ ([0-9a-zA-Z, ]+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "Math.min(" + matches[1] + ")";
        return line.replace(/m\^ ([0-9a-zA-Z, ]+)/, newstr);
    };
    //random number operator
    mathops.randnum = function (line) {
        var matches = /([0-9]+) r# ([0-9]+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "Math.floor((Math.random() * " + matches[2] + ") + " + matches[1] + ")";
        return line.replace(/([0-9]+) r# ([0-9]+)/, newstr);
    };
    //random number from 1 to input
    mathops.randupto = function (line) {
        var matches = /([0-9]+)\-r/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "Math.floor((Math.random() * " + matches[1] + ") + 1)";
        return line.replace(/([0-9]+)\-r/, newstr);
    };
    mathops.squareroot = function (line) {
        var matches = /([0-9]+)\-s/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "Math.sqrt(" + matches[1] + ")";
        return line.replace(/([0-9]+)\-s/, newstr);
    };
    return mathops;
})();
//operators concerning strings
var stringops = (function () {
    function stringops() {
    }
    //remove lasts char of string
    stringops.removelast = function (line) {
        var matches = / ([^ \(\)]+|\"[^"]+\") ->l/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".slice(0, " + matches[1] + ".length-1)";
        return line.replace(/ ([^ \(\)]+|\"[^"]+\") ->l/, newstr);
    };
    //gets last char of string
    stringops.getlast = function (line) {
        var matches = /l<- ([^ \(\)]+|\"[^"]+\") /.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".slice(" + matches[1] + ".length-1)";
        return line.replace(/l<- ([^ \(\)]+|\"[^"]+\") /, newstr);
    };
    //removes all instances of substr from a string
    stringops.removeallsubstr = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") !> (\"[^"]+\")/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var remover = matches[2].slice(1, matches[2].length - 1);
        remover = "/" + remover + "/g";
        var newstr = matches[1] + ".replace(" + remover + ", \"\")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") !> (\"[^"]+\")/, newstr);
    };
    //gets an array of all numbers in a string
    stringops.getallnumbers = function (line) {
        var matches = / ([^ \(\)]+|\"[^"]+\") ->#/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".match(/[0-9]+/g).map(Number)";
        return line.replace(/ ([^ \(\)]+|\"[^"]+\") ->#/, newstr);
    };
    //gets an array of all word sequences
    stringops.getallwords = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") ->A/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".match(/[a-zA-Z]+/g)";
        return line.replace(/([^ \(\)]+|\"[^"]+\") ->A/, newstr);
    };
    //match operator
    stringops.matchop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") :~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".match(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") :~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    };
    //search operator
    stringops.searchop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") \?~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".search(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") \?~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    };
    //regex test operator regex is always on right side
    stringops.testop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") =~ (\/[^\/]+\/)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[2] + ".search(" + matches[1] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") =~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    };
    //returns an array with all matches in a string
    stringops.findallop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") ~> (\/[^\/]+\/)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".match(" + matches[2] + "g)";
        return line.replace(/([^ \(\)]+|\"[^"]+\") ~> (\/[^\/]+\/)/, newstr);
    };
    //returns an array of a string split be a delimeter
    stringops.splitop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") s~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".split(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") s~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    };
    return stringops;
})();
var arrayops = (function () {
    function arrayops() {
    }
    //simulates the length
    arrayops.lengthop = function (line) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+)-l/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".length";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+)-l/, newstr);
    };
    //push operator implementation
    arrayops.pushop = function (line) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+) <p (.+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".push(" + matches[2] + ")";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+) <p (.+)/, newstr);
    };
    //allows the first occurence of an element in an array to be deleted
    arrayops.pullop = function (line) {
        var matches = /([^ \(\)]+) p> (.+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "delete " + matches[1] + "[" + matches[1] + ".indexof(" + matches[2] + ")]";
        return line.replace(/([^ \(\)]+) p> (.+)/, newstr);
    };
    //operator for creating array copy
    arrayops.copyop = function (line) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+)-c/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = matches[1] + ".slice()";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+)-c/, newstr);
    };
    //operator for array max
    arrayops.arraymax = function (line) {
        var matches = /m\^ (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "Math.max.apply(Math, " + matches[1] + ")";
        return line.replace(/m\^ (\[[^\[\]]+\]|[^ \(\)]+)/, newstr);
    };
    //operator for array min
    arrayops.arraymin = function (line) {
        var matches = /m_ (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var newstr = "Math.min.apply(Math, " + matches[1] + ")";
        return line.replace(/m_ (\[[^\[\]]+\]|[^ \(\)]+)/, newstr);
    };
    //(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(i); return lst})(8)
    //gives a literal num range
    arrayops.numrangeop = function (line) {
        var matches = /\[([0-9]+)\]#/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var numarr = "(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(i); return lst})(" + matches[1] + ")";
        return line.replace(/\[([0-9]+)\]#/, numarr);
    };
    arrayops.repeatlstop = function (line) {
        var matches = /\[([0-9]+), ([^ \(\)])\]R/.exec(line);
        if (matches === null && typeof matches === "object")
            return line;
        var reparr = "(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(" + matches[2] + "); return lst})(" + matches[1] + ")";
        return line.replace(/\[([0-9]+), ([^ \(\)])\]R/, reparr);
    };
    return arrayops;
})();
var funcops = (function () {
    function funcops() {
    }
    //replaces the function keyword
    funcops.funcop = function (line) {
        return line.replace(/ ?f> ?/, "function ");
    };
    return funcops;
})();
var linechecker = (function () {
    function linechecker() {
    }
    //checks if an entire line is a string, if it is, eliminates it from processing
    linechecker.isstring = function (line) {
        return /^\"[^"]\"$/.test(line);
    };
    return linechecker;
})();
var Transcompiler = (function () {
    function Transcompiler() {
    }
    //entry point to the transcompiler, top level function
    Transcompiler.transcompile = function (lines) {
        for (var i = 0; i < lines.length; i++) {
            if (linechecker.isstring(lines[i])) {
            }
            lines[i] = assignops.assign(lines[i]);
            lines[i] = mathops.max(lines[i]);
            lines[i] = mathops.min(lines[i]);
            lines[i] = mathops.increment(lines[i]);
            lines[i] = mathops.decrement(lines[i]);
            lines[i] = mathops.power(lines[i]);
            lines[i] = mathops.powerment(lines[i]);
            lines[i] = mathops.randnum(lines[i]);
            lines[i] = mathops.randupto(lines[i]);
            lines[i] = mathops.squareroot(lines[i]);
            lines[i] = comparops.inop(lines[i]);
            lines[i] = comparops.isop(lines[i]);
            lines[i] = comparops.nullop(lines[i]);
            lines[i] = stringops.testop(lines[i]);
            lines[i] = stringops.splitop(lines[i]);
            lines[i] = stringops.findallop(lines[i]);
            lines[i] = stringops.getlast(lines[i]);
            lines[i] = stringops.matchop(lines[i]);
            lines[i] = stringops.getallwords(lines[i]);
            lines[i] = stringops.removeallsubstr(lines[i]);
            lines[i] = stringops.removelast(lines[i]);
            lines[i] = stringops.searchop(lines[i]);
            lines[i] = stringops.getallnumbers(lines[i]);
            lines[i] = arrayops.arraymax(lines[i]);
            lines[i] = arrayops.arraymin(lines[i]);
            lines[i] = arrayops.copyop(lines[i]);
            lines[i] = arrayops.lengthop(lines[i]);
            lines[i] = arrayops.pullop(lines[i]);
            lines[i] = arrayops.pushop(lines[i]);
            lines[i] = arrayops.repeatlstop(lines[i]);
            lines[i] = arrayops.numrangeop(lines[i]);
            lines[i] = funcops.funcop(lines[i]);
            lines[i] += "\n";
        }
        var fstring = lines.join("");
        return fstring;
    };
    return Transcompiler;
})();