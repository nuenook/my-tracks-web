import * as firebase from 'firebase';


export interface IAddProjectTime {
    projectId: string;
    userId?: string;
    hour: number;
    note?: string; 
}

export interface IProjectTime extends IAddProjectTime {
    id: string;
    timestamp: firebase.firestore.Timestamp;
    onDay: string;
}