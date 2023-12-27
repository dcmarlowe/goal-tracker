import { ensureWeeklyGoalCollection } from "./data-access/weekly-goals.data-access";
import type { Goal } from "./models/goal";
import type { Project } from "./models/project";
import type { Task } from "./models/task";

const key = "dailgoals";
const projectKey = "projects";
const taskKey = "tasks";

export function ensureGoalCollection(): Goal[] {
    let toReturn = localStorage.getItem(key);

    if(toReturn === null || toReturn === undefined) {
        toReturn = '[]';
        localStorage.setItem(key, toReturn);
    }

    return JSON.parse(toReturn).applyDefaultSort();
}

export function storeGoalCollection(collection: Goal[]) {
    let toStore = JSON.stringify(collection);
    localStorage.setItem(key, toStore);
}

export function downloadGoals(): string {
    let content: string = localStorage.getItem(key) || '';

    const blob = new Blob([content], {
        type: "application/json"
    });

    return URL.createObjectURL(blob);
}

export function downloadEverything(): string {
    let goals = ensureGoalCollection();
    let projects = ensureProjectCollection();
    let tasks = ensureTaskCollection();
    let weeklyGoals = ensureWeeklyGoalCollection();

    let toExport = {
        goals, 
        projects,
        tasks,
        weeklyGoals
    };

    let content = JSON.stringify(toExport);

    const blob = new Blob([content], {
        type: "application/json"
    });

    return URL.createObjectURL(blob);
}

export function ensureProjectCollection(): Project[] {
    let toReturn = localStorage.getItem(projectKey);

    if(toReturn === null || toReturn === undefined) {
        toReturn = '[]';
        localStorage.setItem(projectKey, toReturn);
    }

    return JSON.parse(toReturn).applyDefaultProjectSort();
}

export function storeProjectCollection(collection: Project[]){
    let toStore = JSON.stringify(collection);
    localStorage.setItem(projectKey, toStore);
}

export function ensureTaskCollection(): Task[] {
    let toReturn = localStorage.getItem(taskKey);

    if(toReturn === null || toReturn === undefined) {
        toReturn = '[]';
        localStorage.setItem(taskKey, toReturn);
    }

    return JSON.parse(toReturn).applyDefaultProjectSort();
}

export function storeTaskCollection(collection: Task[]){
    let toStore = JSON.stringify(collection);
    localStorage.setItem(taskKey, toStore);
}