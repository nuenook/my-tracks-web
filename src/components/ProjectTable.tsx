import * as React from 'react';
import {IProject} from '../models/Project.model';

export interface ProjectTableProps {
    projects: IProject[];
}

const ProjectTable: React.SFC<ProjectTableProps> = ({
    projects = []
}) => {
    return (
    <>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Project Name</th>
            </tr>
        </thead>
        <tbody>
            {projects.map( (project, index) => 
                <tr key={project.id}>
                    <td>{index + 1}</td>
                    <td>{project.projectName}</td>
                </tr>
            )}
        </tbody>
    </table>
    </>
    );
}
 
export default ProjectTable;