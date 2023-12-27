import type { Goal } from "@/models/goal";

const key = "weeklyGoals";

export function ensureWeeklyGoalCollection(): Goal[] {
    let toReturn = localStorage.getItem(key);

    if(toReturn === null || toReturn === undefined) {
        toReturn = '[]';
        localStorage.setItem(key, toReturn);
    }

    return JSON.parse(toReturn).applyDefaultSort();
}

export function storeWeeklyGoalCollection(collection: Goal[]) {
    let toStore = JSON.stringify(collection);
    localStorage.setItem(key, toStore);
}