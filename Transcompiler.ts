/**
 * Created by Josh on 1/23/16.
 */
//main file for transcompiler utisl and methods

class assignops {
    //processes assignment statements
    public static assign(line:string) {
        var matches = /(.+) :> (.+)/.exec(line);
        var tempstr = "var " + matches[1] + " = " + matches[2] + ";" +  "\n";
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
        var newstr = "Math.pow(" + matches[1] + ", " + matches[2] + ")\n";
        return line.replace(/([0-9]+) \*\* ([0-9]+)/, newstr);
    }
}





class lists {

}

