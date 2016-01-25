/**
 * Created by Josh on 1/23/16.
 */
//main file for transcompiler utisl and methods

class assignops {
    //processes assignment statements
    public static assign(line:string) {
        var matches = /([^ \(\)]+) :> ([^ \(\)]+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var tempstr = "var " + matches[1] + " = " + matches[2] + ";";
        return line.replace(/([^ \(\)]+) :> ([^ \(\)]+)/, tempstr);
    }
}
//class for integrated comparison operators
class comparops {

    //enables an is operator
    public static isop(line:string) {
        return line.replace(/ is /, " == ");
    }
    //fully featured null comparison operator
    public static nullop(line:string) {
        var matches = /([^ \(\)]+) =>n/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + " === null && typeof " + matches[1] + " === \"object\"";
        return line.replace(/([^ \(\)]+) =>n/, newstr);
    }
    //array in operator
    public static inop(line:string) {
        var matches = /([^ \(\)]+) in (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newline = "(function(" + matches[2] + ", " + matches[1] + ") { for(i=0;i<" + matches[2] + ".length;i++) if(" + matches[2] + "[i]==" + matches[1] + ") return true; return false;})(" + matches[2] + ", " +matches[1] + ")";
        return line.replace(/([^ \(\)]+) in (\[[^\[\]]+\]|[^ \(\)]+)/, newline);
    }
}

class mathops {
    //processes a multiincrement statement
    public static increment(line:string) {
        var matches = / (.+?)(\+\++)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var amount = matches[2].length-1;
        return matches[1] + " += " + amount.toString() + ";";
    }
    //processes a multidecrement statement
    public static decrement(line:string) {
        var matches = / (.+?)(\--+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var amount = matches[2].length-1;
        return matches[1] + " -= " + amount.toString() + ";";
    }
    //multi power statement
    public static powerment(line:string) {
        var matches = / (.+?)(\*\*+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var amount = matches[2].length-1;
        return "Math.pow(" + matches[1] + ", " + amount.toString() + ")";
    }
    //deals with the power operator
    public static power(line:string) {
        var matches = /([0-9]+) \*\* ([0-9]+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "Math.pow(" + matches[1] + ", " + matches[2] + ")";
        return line.replace(/([0-9]+) \*\* ([0-9]+)/, newstr);
    }
    //max operator
    public static max(line:string) {
        var matches = /m\^ ([0-9a-zA-Z, ]+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "Math.max(" + matches[1] + ")";
        return line.replace(/m\^ ([0-9a-zA-Z, ]+)/, newstr);
    }
    //min operator
    public static min(line:string) {
        var matches = /m_ ([0-9a-zA-Z, ]+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "Math.min(" + matches[1] + ")";
        return line.replace(/m\^ ([0-9a-zA-Z, ]+)/, newstr);
    }
    //random number operator
    public static randnum(line:string) {
        var matches = /([0-9]+) r# ([0-9]+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "Math.floor((Math.random() * " + matches[2] + ") + " + matches[1] + ")";
        return line.replace(/([0-9]+) r# ([0-9]+)/, newstr);
    }
    //random number from 1 to input
    public static randupto(line:string) {
        var matches = /([0-9]+)\-r/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "Math.floor((Math.random() * " + matches[1] + ") + 1)";
        return line.replace(/([0-9]+)\-r/, newstr);
    }

    public static squareroot(line:string) {
        var matches = /([0-9]+)\-s/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "Math.sqrt(" + matches[1] + ")";
        return line.replace(/([0-9]+)\-s/, newstr);
    }
}
//operators concerning strings
class stringops {
    //remove lasts char of string
    public static removelast(line:string) {
        var matches = / ([^ \(\)]+|\"[^"]+\") ->l/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".slice(0, " + matches[1] + ".length-1)";
        return line.replace(/ ([^ \(\)]+|\"[^"]+\") ->l/, newstr);
    }
    //gets last char of string
    public static getlast(line:string) {
        var matches = /l<- ([^ \(\)]+|\"[^"]+\") /.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".slice(" + matches[1] + ".length-1)";
        return line.replace(/l<- ([^ \(\)]+|\"[^"]+\") /, newstr);
    }
    //removes all instances of substr from a string
    public static removeallsubstr(line:string) {
        var matches = /([^ \(\)]+|\"[^"]+\") !> (\"[^"]+\")/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var remover = matches[2].slice(1, matches[2].length-1);
        remover = "/" + remover + "/g";
        var newstr = matches[1] + ".replace(" + remover + ", \"\")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") !> (\"[^"]+\")/, newstr)
    }
    //gets an array of all numbers in a string
    public static getallnumbers(line:string) {
        var matches = / ([^ \(\)]+|\"[^"]+\") ->#/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".match(/[0-9]+/g).map(Number)";
        return line.replace(/ ([^ \(\)]+|\"[^"]+\") ->#/, newstr);
    }
    //gets an array of all word sequences
    public static getallwords(line:string) {
        var matches = /([^ \(\)]+|\"[^"]+\") ->A/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".match(/[a-zA-Z]+/g)";
        return line.replace(/([^ \(\)]+|\"[^"]+\") ->A/, newstr);
    }
    //match operator
    public static matchop(line:string) {
        var matches = /([^ \(\)]+|\"[^"]+\") :~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".match(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") :~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    }
    //search operator
    public static searchop(line:string) {
        var matches = /([^ \(\)]+|\"[^"]+\") \?~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".search(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") \?~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    }
    //regex test operator regex is always on right side
    public static testop(line:string) {
        var matches = /([^ \(\)]+|\"[^"]+\") =~ (\/[^\/]+\/)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[2] + ".search(" + matches[1] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") =~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    }
    //returns an array with all matches in a string
    public static findallop(line:string) {
        var matches = /([^ \(\)]+|\"[^"]+\") ~> (\/[^\/]+\/)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".match(" + matches[2] + "g)";
        return line.replace(/([^ \(\)]+|\"[^"]+\") ~> (\/[^\/]+\/)/, newstr);
    }
    //returns an array of a string split be a delimeter
    public static splitop(line:string) {
        var matches = /([^ \(\)]+|\"[^"]+\") s~ (\/[^\/]+\/|\"[^"]+\")/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".split(" + matches[2] + ")";
        return line.replace(/([^ \(\)]+|\"[^"]+\") s~ (\/[^\/]+\/|\"[^"]+\")/, newstr);
    }
}


class arrayops {
    //simulates the length
    public static lengthop(line:string) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+)-l/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".length";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+)-l/, newstr);
    }
    //push operator implementation
    public static pushop(line:string) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+) <p (.+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".push(" + matches[2] + ")";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+) <p (.+)/, newstr);
    }
    //allows the first occurence of an element in an array to be deleted
    public static pullop(line:string) {
        var matches = /([^ \(\)]+) p> (.+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "delete " + matches[1] + "[" + matches[1] + ".indexof(" + matches[2] + ")]";
        return line.replace(/([^ \(\)]+) p> (.+)/, newstr);
    }
    //operator for creating array copy
    public static copyop(line:string) {
        var matches = /(\[[^\[\]]+\]|[^ \(\)]+)-c/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = matches[1] + ".slice()";
        return line.replace(/(\[[^\[\]]+\]|[^ \(\)]+)-c/, newstr);
    }
    //operator for array max
    public static arraymax(line:string) {
        var matches = /m\^ (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "Math.max.apply(Math, " + matches[1] + ")";
        return line.replace(/m\^ (\[[^\[\]]+\]|[^ \(\)]+)/, newstr);
    }
    //operator for array min
    public static arraymin(line:string) {
        var matches = /m_ (\[[^\[\]]+\]|[^ \(\)]+)/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var newstr = "Math.min.apply(Math, " + matches[1] + ")";
        return line.replace(/m_ (\[[^\[\]]+\]|[^ \(\)]+)/, newstr);
    }
    //(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(i); return lst})(8)
    //gives a literal num range
    public static numrangeop(line:string) {
        var matches = /\[([0-9]+)\]#/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var numarr = "(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(i); return lst})(" +matches[1]+ ")";
        return line.replace(/\[([0-9]+)\]#/, numarr);
    }

    public static repeatlstop(line:string) {
        var matches = /\[([0-9]+), ([^ \(\)])\]R/.exec(line);
        if(matches === null && typeof matches === "object") return line;
        var reparr = "(function(n){ var lst = []; for(i=0;i<n;i++) lst.push(" +matches[2]+ "); return lst})(" +matches[1]+ ")";
        return line.replace(/\[([0-9]+), ([^ \(\)])\]R/, reparr);
    }
}

class funcops {
    //replaces the function keyword
    public static funcop(line:string) {
        return line.replace(/ ?f> ?/, "function");
    }
}

class linechecker {
    //checks if an entire line is a string, if it is, eliminates it from processing
    public static isstring(line:string) {
        return /^\"[^"]\"$/.test(line);
    }
}

class Transcompiler {
    //entry point to the transcompiler, top level function
    public static transcompile(lines:string[]) {
        for(var i=0;i<lines.length;i++) {
            if(linechecker.isstring(lines[i])) {
                continue;
            }

        }
    }
}








