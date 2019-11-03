import * as React from 'react';
import { IProjectTime } from '../../models/projectTime.model';

export interface TimeRowProps extends IProjectTime {
    loading?: boolean;
    index: number;

}
 
const TimeRow: React.SFC<TimeRowProps> = ({
    loading = false,
    hour,
    note = "-",
    index

}) => {
    if (loading) {
        return  <p className="text-center"> Loading </p>
    }

    return (
        <tr>
            <td>
                {index + 1}
            </td>
            <td>
                {hour}
            </td>
            <td>
                {note}
            </td>
        </tr>
    );
}
 
export default TimeRow;