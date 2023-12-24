import type { Goal } from "./goal";

const key = "dailgoals";

export function ensureGoalCollection(): Goal[] {
    let toReturn = localStorage.getItem(key);

    if(toReturn === null || toReturn === undefined) {
        toReturn = '[]';
        localStorage.setItem(key, toReturn);
    }

    return JSON.parse(toReturn);
}

export function storeGoalCollection(collection: Goal[]) {
    let toStore = JSON.stringify(collection);
    localStorage.setItem(key, toStore);
}

export function downloadAll(): string {
    let content: string = localStorage.getItem(key) || '';

    const blob = new Blob([content], {
        type: "application/json"
    });

    return URL.createObjectURL(blob);
}