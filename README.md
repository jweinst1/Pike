#Pike

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