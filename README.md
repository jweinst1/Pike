#Pikejs

[![Foo](http://www.farnhamanglingsociety.com/assets/images-species/pike_esox_lucius.gif)](https://www.npmjs.com/package/pikejs)

Pike is a micro-programming language based heavily on the use of operators, and streamlining processes through symbolic commands.
For example, in Pike, instead of using `var x = 9`, you can use the short hand assignment operator `x :> 9`. Pike thrives on the philosophy of high level
syntax and simplicity. Since it is transcompiled to Javascript, you can use Pike as a superset of javascript, allowing you to mix in what you want!

##Installation

To install Pike, type into your commandline:

`npm install -g pike`

Pike must be installed globally to allow the use of the `piketc` command to transcompile `.pike` files.

##Transcompilation

To transcompile Pike into JavaScript, you use the `piketc` command, like this

`piketc MyFile.pike MyFile.js`

The javascript file name doesn't have to be the same, it's just effecient for organization.

##Language Details

Pikejs works by using small operators to condense regular functions in easily accessible methods. It's covenient for those who want to write code faster, and access a few things which need to be hand-implented in JavaScript.

### Assignment :>

In Pikejs, instead of typing `var x = 77`, you can type `x :> 77`, which produces the same result.

### Null Comparison ->n

If you want a full proof way to compare a value to null, you can write `x ->n`, which will give a boolean `true` or `false` value in the comparison. This transcompiles to 
`x === null && typeof x === "object"`.

### Array in in-a

Pikejs includes an operator that checkes if a value is present in an array. The default `in` operator for JavaScript doesn't work on arrays, because it only looks at the keys or indexes. You would use this by typing `5 in-a [4, 5, 6]` which would evaluate to true.

### Increment number ++++

Normally, the `++` operator in JS only lets you add 1 to a number. With Pikejs, you can put as many `+`'s you want after a number or variable, and it will increment by the number of `+`'s minus 1. For example `i++++` will transcompile to `i += 3`.

### Decrement number ----

Works exactly the same as the increment operator but  deals with subtraction.

### Powerment number ****

This operator adds a short hand way to increase a number by some power. `3**` is the same as squaring `3`, or `Math.pow(3, 2)`, or `i****` is the same as `Math.pow(i, 4)`.

### Max Operator m^ 2, 4, 5, 7

PikeJS has a max operator, that evaluates to the maximum value of any collection of variables or numbers. Additionally, the max operator can be used with an array, but it cannot be used on both at the same time. Here are two examples.

```
f :> 99
m^ 7, 6, 5, 4, f

m^ [1, 2, 3, 4, 8]
```
### Min Operator m_ 2, 3, 4, 5

Works identically to the max operator, and also works on arrays.

### Random Number 5 r# 10

The `r#` operator evaulates to a random number between the left hand number and the right hand number. This writes a function call to the random() function in the math library of JS, so the number will be different each time. 

### Random upto 7-r

The `-r` operator is a shorthand mechanism for evaulating to a random number from 1 to the input number.

### Squareroot 5-s

The `-s` operator is a shorthand way for evaluating to the square root of the number.

### removelast "hello" ->l

This operator will evaluate to a string which has the last character of it's sequence removed. `"you" ->l`
will be `"yo"`.
 
### getlast l<- "hello"

The `l<-` operator evaulates the string to it's last character, getting rid of all characters except the last.

### removeall substr "454545" !> "5"

The `!>` operator allows you to evaluate to a string that has all of the right hand string removed from it. It removes all occurences of the substring by replacing it with the empty string.

### getallnumbers "I have 6 cats" ->#

When you use the `->#` operator in front of a string, it will give you an array of all numbers found in the string. This is an array of numbers, not strings of numbers. For example

```
"The plane ticket for the Boeing 727 costs $45" ->#
[727, 45]
``` 
### getallwords "I love apples" ->A

This operator, when used in front of a string will evaluate to an array of strings that contain all of the continous letter sequences in the string. There is no word checking here, but the strings will stop at non letter characters, like spaces, quesiton marks, commas, etc.

### Match "hello" :~ /^.*$/

The Match operator `:~`, performs a regex match with a string on the left hand side and a regex or a string on the right side.

### Search "hello" ?~ /o./

The Search operator `?~` performs a JS regex search on the left hand string. The right hand side can be a string or regex. It evaluates to a number of where the match begins, or -1 if the search is unsuccessful.

### Test "hello" =~ /^a*/

The Test operator, `=~` evaluates to a boolean value as to whether or not the left hand string matches the right hand regex or string.

### Findall "455yy66" ~> /[0-9]/

The Findall operator, `~>` uses a global matching method  to evaluate to an array of all amtches of the right hand regex in the left hand string.

### Split "I am happy" s~ " "

The Split operator splits the string into an array of substrings by the right hand string or regex.

### Array Length [1, 7, 5]-l

The short hand operator `-l` is used to signify the value of the array's length. This is identical to the JS version of `.length`.

### Push [1, 2, 3] <p 7

This operator activates the push method of an array.

### Pull [1, 2, 3] p> 3

Pikejs implements a pull operator, which removes but does not return the first occurence of a value in an array. Does not work if the value is not present in the array.

### Copy [1, 7, 7]-c

Evaluates to a copy of the array, this is identical to using `.slice()` in JS.

### Number range [11]#

Pikejs includes a very useful, range operator, that evaluates to a continous array of integers from 0 to the input number between the `[]` brackets. This is inspired from the built-in python `range()` function.

### Repeat List [5, 6]R

This shorthand expression allows you to create an array of repeated elements, where the first input number corresponds to the number of elements in the array and the second input, whethere its a string, or number, is the repeated element.

###Functions f>

In PikeJS, to replace the function keyword, you can simply use `f>` so `f> carmel(place) {` is the same as `function carmel(place) {`.


