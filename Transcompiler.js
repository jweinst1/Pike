/**
 * Created by Josh on 1/23/16.
 */
//main file for transcompiler utisl and methods
var assignops = (function () {
    function assignops() {
    }
    //processes assignment statements
    assignops.assign = function (line) {
        var matches = /(.+) :> (.+)/.exec(line);
        var tempstr = "var " + matches[1] + " = " + matches[2] + ";";
        return tempstr;
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
        var newstr = matches[1] + " === null && typeof " + matches[1] + " === \"object\"";
        return line.replace(/([^ \(\)]+) =>n/, newstr);
    };
    //array in operator
    comparops.inop = function (line) {
        var matches = /([^ \(\)]+) in (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
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
        var amount = matches[2].length - 1;
        return matches[1] + " += " + amount.toString() + ";";
    };
    //processes a multidecrement statement
    mathops.decrement = function (line) {
        var matches = / (.+?)(\--+)/.exec(line);
        var amount = matches[2].length - 1;
        return matches[1] + " -= " + amount.toString() + ";";
    };
    //multi power statement
    mathops.powerment = function (line) {
        var matches = / (.+?)(\*\*+)/.exec(line);
        var amount = matches[2].length - 1;
        return "Math.pow(" + matches[1] + ", " + amount.toString() + ")";
    };
    //deals with the power operator
    mathops.power = function (line) {
        var matches = /([0-9]+) \*\* ([0-9]+)/.exec(line);
        var newstr = "Math.pow(" + matches[1] + ", " + matches[2] + ")";
        return line.replace(/([0-9]+) \*\* ([0-9]+)/, newstr);
    };
    //max operator
    mathops.max = function (line) {
        var matches = /m\^ ([0-9a-zA-Z, ]+)/.exec(line);
        var newstr = "Math.max(" + matches[1] + ")";
        return line.replace(/m\^ ([0-9a-zA-Z, ]+)/, newstr);
    };
    //min operator
    mathops.min = function (line) {
        var matches = /m_ ([0-9a-zA-Z, ]+)/.exec(line);
        var newstr = "Math.min(" + matches[1] + ")";
        return line.replace(/m\^ ([0-9a-zA-Z, ]+)/, newstr);
    };
    //random number operator
    mathops.randnum = function (line) {
        var matches = /([0-9]+) r# ([0-9]+)/.exec(line);
        var newstr = "Math.floor((Math.random() * " + matches[2] + ") + " + matches[1] + ")";
        return line.replace(/([0-9]+) r# ([0-9]+)/, newstr);
    };
    //random number from 1 to input
    mathops.randupto = function (line) {
        var matches = /([0-9]+)\-r/.exec(line);
        var newstr = "Math.floor((Math.random() * " + matches[1] + ") + 1)";
        return line.replace(/([0-9]+)\-r/, newstr);
    };
    mathops.squareroot = function (line) {
        var matches = /([0-9]+)\-s/.exec(line);
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
        var newstr = matches[1] + ".slice(0, " + matches[1] + ".length-1)";
        return line.replace(/ ([^ \(\)]+|\"[^"]+\") ->l/, newstr);
    };
    //gets last char of string
    stringops.getlast = function (line) {
        var matches = /l<- ([^ \(\)]+|\"[^"]+\") /.exec(line);
        var newstr = matches[1] + ".slice(" + matches[1] + ".length-1)";
        return line.replace(/l<- ([^ \(\)]+|\"[^"]+\") /, newstr);
    };
    //removes all instances of substr from a string
    stringops.removeallsubstr = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") !> (\"[^"]+\")/.exec(line);
        var remover = matches[2].slice(1, matches[2].length - 1);
        remover = "/" + remover + "/g";
        var newstr = matches[1] + ".replace(" + remover + ", \"\")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") !> (\"[^"]+\")/, newstr);
    };
    //gets an array of all numbers in a string
    stringops.getallnumbers = function (line) {
        var matches = / ([^ \(\)]+|\"[^"]+\") ->#/.exec(line);
        var newstr = matches[1] + ".match(/[0-9]+/g).map(Number)";
        return line.replace(/ ([^ \(\)]+|\"[^"]+\") ->#/, newstr);
    };
    //gets an array of all word sequences
    stringops.getallwords = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") ->A/.exec(line);
        var newstr = matches[1] + ".match(/[a-zA-Z]+/g)";
        return line.replace(/([^ \(\)]+|\"[^"]+\") ->A/, newstr);
    };
    //match operator
    stringops.matchop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") :~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        var newstr = matches[1] + ".match(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") :~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    };
    //search operator
    stringops.searchop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") \?~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        var newstr = matches[1] + ".search(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") \?~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    };
    //regex test operator regex is always on right side
    stringops.testop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") =~ (\/[^\/]+\/)/.exec(line);
        var newstr = matches[2] + ".search(" + matches[1] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") =~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    };
    //returns an array with all matches in a string
    stringops.findallop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") ~> (\/[^\/]+\/)/.exec(line);
        var newstr = matches[1] + ".match(" + matches[2] + "g)";
        return line.replace(/([^ \(\)]+|\"[^"]+\") ~> (\/[^\/]+\/)/, newstr);
    };
    //returns an array of a string split be a delimeter
    stringops.splitop = function (line) {
        var matches = /([^ \(\)]+|\"[^"]+\") s~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        var newstr = matches[1] + ".split(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") s~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    };
    return stringops;
})();
var forops = (function () {
    function forops() {
    }
    forops.foreachop = function (line) {
    };
    forops.formultiop = function (line) {
    };
    return forops;
})();
var arrayops = (function () {
    function arrayops() {
    }
    //simulates the length
    arrayops.lengthop = function (line) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+)-l/.exec(line);
        var newstr = matches[1] + ".length";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+)-l/, newstr);
    };
    //push operator implementation
    arrayops.pushop = function (line) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+) <p (.+)/.exec(line);
        var newstr = matches[1] + ".push(" + matches[2] + ")";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+) <p (.+)/, newstr);
    };
    //allows the first occurence of an element in an array to be deleted
    arrayops.pullop = function (line) {
        var matches = /([^ \(\)]+) p> (.+)/.exec(line);
        var newstr = "delete " + matches[1] + "[" + matches[1] + ".indexof(" + matches[2] + ")]";
        return line.replace(/([^ \(\)]+) p> (.+)/, newstr);
    };
    //operator for creating array copy
    arrayops.copyop = function (line) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+)-c/.exec(line);
        var newstr = matches[1] + ".slice()";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+)-c/, newstr);
    };
    //operator for array max
    arrayops.arraymax = function (line) {
        var matches = /m\^ (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
        var newstr = "Math.max.apply(Math, " + matches[1] + ")";
        return line.replace(/m\^ (\[[^\[\]]+\]|[^ \(\)]+)/, newstr);
    };
    //operator for array min
    arrayops.arraymin = function (line) {
        var matches = /m_ (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
        var newstr = "Math.min.apply(Math, " + matches[1] + ")";
        return line.replace(/m_ (\[[^\[\]]+\]|[^ \(\)]+)/, newstr);
    };
    //(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(i); return lst})(8)
    //gives a literal num range
    arrayops.numrangeop = function (line) {
        var matches = /\[([0-9]+)\]#/.exec(line);
        var numarr = "(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(i); return lst})(" + matches[1] + ")";
        return line.replace(/\[([0-9]+)\]#/, numarr);
    };
    arrayops.repeatlstop = function (line) {
        var matches = /\[([0-9]+), ([^ \(\)])\]R/.exec(line);
        var reparr = "(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(" + matches[2] + "); return lst})(" + matches[1] + ")";
        return line.replace(/\[([0-9]+), ([^ \(\)])\]R/, reparr);
    };
    return arrayops;
})();
var objops = (function () {
    function objops() {
    }
    return objops;
})();
//# sourceMappingURL=Transcompiler.js.map