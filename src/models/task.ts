
export interface Task {
    name: string;
    addedOn: string;
    isComplete: boolean;
}

declare global {
    interface Array<T> {
        applyDefaultTaskSort(): Array<Task>;
        removeTask(task: Task): Array<Task>;
    }
}

export function loadTaskExtensions() {
    
    // @ts-ignore
    (Array<T>).prototype.applyDefaultTaskSort = function(): Array<T> {
        this.sort((x: Task, y: Task) => {

            if(x.isComplete === true) return 1;
            else if( y.isComplete === true) return -1;
            else return x.name > y.name ? 1 : -1;
        });

        return this;
    };

    // @ts-ignore
    (Array<T>).prototype.removeTask = function(task: Task): (Array<Task>) {

        const index = this.indexOf(task);

        if(index > -1) {
            this.splice(index, 1);
        }
        
        return this;
    };
}