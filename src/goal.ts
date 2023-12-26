
import { completedOn, completedToday, getSortGroup, yesterday } from "./helpers";

export interface Goal {
    name: string;
    addedOn: string;
    isArchived: boolean;
    completedOn: string[];
}

declare global {
    interface Array<T> {
        active(): Array<T>;
        applyDefaultSort(): Array<T>;
        removeGoal(goal:Goal): Array<T>;
    }
}

export function loadGoalExtensions() {
    // @ts-ignore
    (Array<T>).prototype.active = function() : Array<T> {
        return (this).filter((x: Goal) => x.isArchived !== true).map((x: Goal) => x);
    };

    // @ts-ignore
    (Array<T>).prototype.applyDefaultSort = function(): Array<T> {
        this.sort((x: Goal, y: Goal) => {
            let orderX = getSortGroup(x);
            let orderY = getSortGroup(y);

            return orderX < orderY ? -1 : 1;
        });

        return this;
    };

    // @ts-ignore
    (Array<T>).prototype.removeGoal = function(goal: T): (Array<T>) {

        const index = this.indexOf(goal);

        if(index > -1) {
            this.splice(index, 1);
        }
        
        return this;
    };
}