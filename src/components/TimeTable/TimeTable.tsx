import * as React from 'react';
import TimeRow from './TimeRow';
import { IProjectTime } from '../../models/projectTime.model';

export interface TimeTableProps {
    timeData: IProjectTime[];
}

const TimeTable: React.SFC<TimeTableProps> = ({timeData}) => {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Hour</th>
                    <th>Note</th>
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