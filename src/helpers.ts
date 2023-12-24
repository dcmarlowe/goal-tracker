import type { Goal } from "./goal";

export const today = getToday();

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