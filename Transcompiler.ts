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

class mentops {
    //processes a multiincrement statement
    public static increment(line:string) {
        var matches = /(.)(\++)/.exec(line);
        var amount = matches[2].length;
        return matches[1] + " += " + amount.toString() + ";";
    }
    //processes a multidecrement statement
    public static decrement(line:string) {
        var matches = /(.)(\--)/.exec(line);
        var amount = matches[2].length;
        return matches[1] + " -= " + amount.toString() + ";";
    }
}





class lists {

}

