import * as React from 'react';
import TimeRow from './TimeRow';
import { IProjectTime } from '../../types/projectTime.type';

export interface ITimeTableProps {
    timeData: IProjectTime[];
}

export const TimeTable: React.SFC<ITimeTableProps> = ({timeData}) => {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Hour</th>
                    <th>Note</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {timeData.map((t, index) => <TimeRow 
                    {...t}
                    index={index}
                    key={t.id}
                />)}
            </tbody>
        </table>
    );
}

export default TimeTable;