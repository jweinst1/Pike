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
        var tempstr = "var " + matches[1] + " = " + matches[2] + ";" + "\n";
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
        var newstr = "Math.pow(" + matches[1] + ", " + matches[2] + ")\n";
        return line.replace(/([0-9]+) \*\* ([0-9]+)/, newstr);
    };
    return mathops;
})();
var lists = (function () {
    function lists() {
    }
    return lists;
})();
//# sourceMappingURL=Transcompiler.js.map