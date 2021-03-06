import React, {useState, Dispatch, SetStateAction} from 'react';
import { IProject } from '../../types/Project.type';
import {IAddProjectTime} from '../../types/projectTime.type'
export interface ITimeFormProps {
    projects: IProject[];
    insertTimeStamp: ({ projectId, hour }: IAddProjectTime) => void;
    onChangeProject: Dispatch<SetStateAction<string>>;
    selectProject: string;
}

const TimeForm: React.SFC<ITimeFormProps> = ({projects, insertTimeStamp, onChangeProject, selectProject}) => {

    const [hour, setHour] = useState("0")
    const [note, setNote] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()

        insertTimeStamp({
            projectId: selectProject,
            hour: parseInt(hour),
            note,
            timestamp: new Date()
        })
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="project">Select Project</label>
                    <select name="" id="project" className="form-control"
                        value={selectProject}
                        onChange={ e => {
                            onChangeProject(e.target.value)
                        }}
                        required={true}
                    >
                        {projects.map(pro => <option key={pro.id} value={pro.id}>{pro.projectName}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="hours">Hour(s)</label>
                    <input type="number" id="hours" className="form-control" required
                        value={hour}
                        onChange={ e => setHour(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="note">Notes</label>
                    <input type="text" id="note"
                        className="form-control"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Time</button>
            </form>
        </div>
    );
}

export default TimeForm;