import type { Goal } from "./goal";
import { completedOn, yesterday } from "./helpers";


export function loadArrayExtensions() {
    // @ts-ignore
    Array.prototype.active = function() : Goal[] {
        return this.filter((x: Goal) => x.isArchived !== true);
    };

    // @ts-ignore
    Array.prototype.applyDefaultSort = function(): Goal[] {
        this.sort(x => completedOn(x, yesterday) ?  1 : -1);

        return this;
    };

    // @ts-ignore
    Array.prototype.removeGoal = function(goal: Goal): Goal[] {

        const index = this.indexOf(goal);

        if(index > -1) {
            this.splice(index, 1);
        }
        
        return this;
    };
}