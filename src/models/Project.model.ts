export interface INewProject {
    projectName: string;
    userId: string;
}

export interface IProject extends INewProject {
    id: string;
}
