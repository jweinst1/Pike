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
        var matches = /(.)(\++)/.exec(line);
        var amount = matches[2].length - 1;
        return matches[1] + " += " + amount.toString() + ";";
    };
    //processes a multidecrement statement
    mathops.decrement = function (line) {
        var matches = /(.)(\--+)/.exec(line);
        var amount = matches[2].length - 1;
        return matches[1] + " -= " + amount.toString() + ";";
    };
    //multi power statement
    mathops.powerment = function (line) {
        var matches = /(.)(\*\*+)/.exec(line);
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
    mathops.min = function (line) {
    };
    return mathops;
})();
var lists = (function () {
    function lists() {
    }
    return lists;
})();
//# sourceMappingURL=Transcompiler.js.map