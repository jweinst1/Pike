/**
 * Created by Josh on 1/23/16.
 */

    //class that facilitates lists
class list {
    public container:number[];
    constructor() {
        this.container = [];
    }
    public process(cmd:string, oprn:any) {
        switch(cmd) {
            case "<+": this.container.push(oprn);
                break;
            case "->": this.container.pop();
                break;
            case "X>": delete this.container[oprn];
                break;
            default:
                break;
        }
    }
}