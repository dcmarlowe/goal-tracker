
export interface Project {
    name: string;
    order: number;
    isArchived: boolean;
    link: string
    progressedOn: string[];
}

declare global {
    interface Array<T> {
        activeProjects(): Array<T>;
        applyDefaultProjectSort(): Array<T>;
        removeProject(project: Project): Array<T>;
    }
}

export function loadProjectExtensions() {
    // @ts-ignore
    (Array<T>).prototype.activeProjects = function() : Array<T> {
        return (this).filter((x: Project) => x.isArchived !== true).map((x: Project) => x);
    };

    // @ts-ignore
    (Array<T>).prototype.applyDefaultProjectSort = function(): Array<T> {
        this.sort((x: Project, y: Project) => {
            return x.order < y.order ? -1 : 1;
        });

        return this;
    };

    // @ts-ignore
    (Array<T>).prototype.removeProject = function(item: T): (Array<T>) {

        const index = this.indexOf(item);

        if(index > -1) {
            this.splice(index, 1);
        }
        
        return this;
    };
}