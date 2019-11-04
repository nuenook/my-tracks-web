export interface INewProject {
    projectName: string;
}

export interface IProject extends INewProject {
    userId: string;
    id: string;
}