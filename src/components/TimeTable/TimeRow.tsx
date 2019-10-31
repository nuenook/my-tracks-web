import * as React from 'react';

export interface TimeRowProps {
    loading?: boolean;
}
 
const TimeRow: React.SFC<TimeRowProps> = ({loading = false}) => {
    

    if (loading) {
        return  <p className="text-center"> Loading </p>
    }

    return (
        <>
            <td>
                1
            </td>
            <td>
                HaroerDB
            </td>
            <td>
                4.0 
            </td>
            <td>
                -
            </td>
        </>
    );
}
 
export default TimeRow;