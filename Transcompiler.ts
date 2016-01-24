/**
 * Created by Josh on 1/23/16.
 */
//main file for transcompiler utisl and methods

class assignops {
    //processes assignment statements
    public static assign(line:string) {
        var matches = /(.+) :> (.+)/.exec(line);
        var tempstr = "var " + matches[1] + " = " + matches[2] + ";";
        return tempstr;
    }
}

class mathops {
    //processes a multiincrement statement
    public static increment(line:string) {
        var matches = /(.)(\++)/.exec(line);
        var amount = matches[2].length-1;
        return matches[1] + " += " + amount.toString() + ";";
    }
    //processes a multidecrement statement
    public static decrement(line:string) {
        var matches = /(.)(\--+)/.exec(line);
        var amount = matches[2].length-1;
        return matches[1] + " -= " + amount.toString() + ";";
    }
    //multi power statement
    public static powerment(line:string) {
        var matches = /(.)(\*\*+)/.exec(line);
        var amount = matches[2].length-1;
        return "Math.pow(" + matches[1] + ", " + amount.toString() + ")";
    }
    //deals with the power operator
    public static power(line:string) {
        var matches = /([0-9]+) \*\* ([0-9]+)/.exec(line);
        var newstr = "Math.pow(" + matches[1] + ", " + matches[2] + ")";
        return line.replace(/([0-9]+) \*\* ([0-9]+)/, newstr);
    }
    //max operator
    public static max(line:string) {
        var matches = /m\^ ([0-9a-zA-Z, ]+)/.exec(line);
        var newstr = "Math.max(" + matches[1] + ")";
        return line.replace(/m\^ ([0-9a-zA-Z, ]+)/, newstr);
    }
    //min operator
    public static min(line:string) {
        var matches = /m_ ([0-9a-zA-Z, ]+)/.exec(line);
        var newstr = "Math.min(" + matches[1] + ")";
        return line.replace(/m\^ ([0-9a-zA-Z, ]+)/, newstr);
    }
    //random number operator
    public static randnum(line:string) {
        var matches = /([0-9]+) r# ([0-9]+)/.exec(line);
        var newstr = "Math.floor((Math.random() * " + matches[2] + ") + " + matches[1] + ")";
        return line.replace(/([0-9]+) r# ([0-9]+)/, newstr);
    }
    //random number from 1 to input
    public static randupto(line:string) {
        var matches = /([0-9]+)\-r/.exec(line);
        var newstr = "Math.floor((Math.random() * " + matches[1] + ") + 1)";
        return line.replace(/([0-9]+)\-r/, newstr);
    }

    public static squareroot(line:string) {
        var matches = /([0-9]+)\-s/.exec(line);
        var newstr = "Math.sqrt(" + matches[1] + ")";
        return line.replace(/([0-9]+)\-s/, newstr);
    }
}
//operators concerning strings
class stringops {
    //gets last char of string
    public static removelast(line:string) {
        var matches = /(.+) ->l/.exec(line);
        var newstr = matches[1] + ".slice(" + matches[1] + ".length-1)";
        return line.replace(/(.+) ->l/, newstr);
    }
}





class lists {

}

