import * as React from 'react';

export interface TimeFormProps {
    
}
 
const TimeForm: React.SFC<TimeFormProps> = () => {
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="projectName">Hour(s)</label>
                    <input type="number" id="projectName" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="note">Notes</label>
                    <input type="text" id="note"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Time</button>
            </form>
        </div>
    );
}
 
export default TimeForm;