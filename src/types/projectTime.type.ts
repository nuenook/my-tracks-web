import * as firebase from 'firebase';


export interface IAddProjectTime {
    projectId: string;
    userId?: string;
    hour: number;
    note?: string;
    timestamp: firebase.firestore.Timestamp | Date;
}

export interface IProjectTime extends IAddProjectTime {
    id: string;
    onDay: string;
}