import * as React from 'react';
import { IProjectTime } from '../../types/projectTime.type';
import {deleteProjectTimestamp} from '../../redux/actions/timesatmpActions';
import { connect } from 'react-redux';

export interface ITimeRowProps extends IProjectTime {
    index: number;
    deleteProjectTimestamp: typeof deleteProjectTimestamp;
}
 
export const TimeRow: React.SFC<ITimeRowProps> = ({
    hour,
    note = "-",
    id,
    index,
    deleteProjectTimestamp

}) => {
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
            <td>
                <button onClick={() => deleteProjectTimestamp(id)}> x </button>
            </td>
        </tr>
    );
}
 
/* istanbul ignore next */
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteProjectTimestamp: (timeId: string) => dispatch(deleteProjectTimestamp(timeId)),
    }
}

export default connect(undefined, mapDispatchToProps)(TimeRow);