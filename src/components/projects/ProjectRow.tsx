import * as React from 'react';
import {IProject} from '../../types/Project.type';

export interface IProjectRowProps extends IProject {
    index: number;

}
 
const ProjectRow: React.SFC<IProjectRowProps> = ({projectName, index}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{projectName}</td>
            <td className="text-center"><button className="btn btn-sm">x</button></td>
        </tr>
    );
}
 
export default ProjectRow;