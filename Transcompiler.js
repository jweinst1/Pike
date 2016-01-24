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
var mentops = (function () {
    function mentops() {
    }
    //processes a multiincrement statement
    mentops.increment = function (line) {
        var matches = /(.)(\++)/.exec(line);
        var amount = matches[2].length;
        return matches[1] + " += " + amount.toString() + ";";
    };
    //processes a multidecrement statement
    mentops.decrement = function (line) {
        var matches = /(.)(\--)/.exec(line);
        var amount = matches[2].length;
        return matches[1] + " -= " + amount.toString() + ";";
    };
    return mentops;
})();
var lists = (function () {
    function lists() {
    }
    return lists;
})();
//# sourceMappingURL=Transcompiler.js.map