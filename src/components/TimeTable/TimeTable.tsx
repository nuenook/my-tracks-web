import * as React from 'react';
import TimeRow from './TimeRow';

export interface TimeTableProps {

}

const TimeTable: React.SFC<TimeTableProps> = () => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Hour</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <TimeRow />
                </tr>
                <tr>
                    <TimeRow loading={true} />
                </tr>
                <tr>
                    <TimeRow />
                </tr>
            </tbody>
        </table>
    );
}

export default TimeTable;