/**
 * Created by Josh on 1/23/16.
 */
//class that facilitates lists
var list = (function () {
    function list() {
        this.container = [];
    }
    list.prototype.process = function (cmd, oprn) {
        switch (cmd) {
            case "<+":
                this.container.push(oprn);
                break;
            case "->":
                this.container.pop();
                break;
            case "X>":
                delete this.container[oprn];
                break;
            default:
                break;
        }
    };
    return list;
})();
//# sourceMappingURL=Objects.js.map