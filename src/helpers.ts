import type { Goal } from "./goal";

export const today = getToday();
export const yesterday = getYesterday();

export function completedOn(goal: Goal, dateStr: string): boolean {
  return goal.completedOn.includes(dateStr);
}

export function setCompletedOn(goal: Goal, date: string, wasComplete: boolean) {
  if(wasComplete === true) {
    if(goal.completedOn.includes(date) !== true) {
      goal.completedOn.push(date);
    }
  } else {
    goal.completedOn = goal.completedOn.filter(x => x !== date);
  }
}

export function toggleCompletedOn(goal: Goal, date: string) {
    // if it was completed on that date
      if(goal.completedOn.includes(date) === true) {
        // then remove that completion
      goal.completedOn = goal.completedOn.filter(x => x !== date);
    } else {
        goal.completedOn.push(date);
    }
}

export function getToday(){
  const now = new Date();

  return formatDate(now);
}

export function getYesterday(){
  const now = new Date();

  now.setDate(now.getDate() - 1);

  return formatDate(now);
}

export function formatDate(source: Date): string {

  const year = source.getFullYear().toString();
  let month : number | string = source.getMonth() + 1;
  let date : number | string = source.getDate();

  month = month < 10 ? `0${month}` : month.toString();
  date = date < 10 ? `0${date}` : date.toString();

  return `${year}-${month}-${date}`;
}

export function completedToday(goal: Goal): boolean {
  return goal.completedOn.includes(today);
}

export function getSortGroup(goal: Goal): number{

  const doneToday = completedToday(goal);
  const doneYesterday = completedOn(goal, yesterday);

  if(doneToday === false && doneYesterday=== false) {
    return 1; // show these first
  } else if (doneToday === false && doneYesterday === true) {
    return 2; // show these next
  } else {
    return 3; // and all the rest
  }
  
}

export function getMostRecentCompletionDate(goal: Goal): string {
  if(goal.completedOn === null || goal.completedOn === undefined || goal.completedOn?.length === 0) {
    return '1900-01-01';
  }

  return goal.completedOn.sort((x,y) => x > y ? -1: 1).find(x => true) ?? '1900-01-01';
}