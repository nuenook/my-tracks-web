export interface IAddProjectTime {
    projectId: string;
    userId?: string;
    hour: number;
    note?: string; 
}

export interface IProjectTime extends IAddProjectTime {
    id: string;
    timestamp: Date;
    onDay: string;
}