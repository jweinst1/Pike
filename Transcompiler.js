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
var mathops = (function () {
    function mathops() {
    }
    //processes a multiincrement statement
    mathops.increment = function (line) {
        var matches = / (.+?)(\++)/.exec(line);
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
        var matches = / (.+?) ->l/.exec(line);
        var newstr = matches[1] + ".slice(0, " + matches[1] + ".length-1)";
        return line.replace(/ (.+?) ->l/, newstr);
    };
    //gets last char of string
    stringops.getlast = function (line) {
        var matches = /l<- (.+?) /.exec(line);
        var newstr = matches[1] + ".slice(" + matches[1] + ".length-1)";
        return line.replace(/l<- (.+?) /, newstr);
    };
    //removes all instances of substr from a string
    stringops.removeallsubstr = function (line) {
        var matches = / (.+?) !> (.+?) /.exec(line);
        var remover = matches[2].slice(1, matches[2].length - 1);
        remover = "/" + remover + "/g";
        var newstr = matches[1] + ".replace(" + remover + ", \"\")";
        return line.replace(/ (.+?) !> (.+?) /, newstr);
    };
    //gets an array of all numbers in a string
    stringops.getallnumbers = function (line) {
        var matches = / (.+?) ->#/.exec(line);
        var newstr = matches[1] + ".match(/[0-9]+/g).map(Number)";
        return line.replace(/ (.+?) ->#/, newstr);
    };
    //gets an array of all word sequences
    stringops.getallwords = function (line) {
        var matches = / (.+?) ->A/.exec(line);
        var newstr = matches[1] + ".match(/[a-zA-Z]+/g)";
        return line.replace(/ (.+?) ->A/, newstr);
    };
    stringops.matchop = function (line) {
        var matches = / (.+?) =~ (.+?) /.exec(line);
    };
    return stringops;
})();
var lists = (function () {
    function lists() {
    }
    return lists;
})();
//# sourceMappingURL=Transcompiler.js.map