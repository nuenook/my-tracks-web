import * as React from 'react';
import {IProject} from '../../models/Project.model';

export interface ProjectRowProps extends IProject {
    index: number;

}
 
const ProjectRow: React.SFC<ProjectRowProps> = ({projectName, id, index}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{projectName}</td>
            <td className="text-center"><button className="btn btn-sm">x</button></td>
        </tr>
    );
}
 
export default ProjectRow;