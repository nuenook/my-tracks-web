import * as React from 'react';
import {IProject} from '../../types/Project.type';
import ProjectRow from './ProjectRow';

export interface IProjectTableProps {
    projects: IProject[];
}

const ProjectTable: React.SFC<IProjectTableProps> = ({
    projects = []
}) => {

    if(!projects || projects.length == 0) {
        return <p>No Project Data...</p>
    }
    
    return (
    <>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Project Name</th>
                <th className="text-center">delete</th>
            </tr>
        </thead>
        <tbody>
            {projects.map( (project, index) => 
                <ProjectRow key={project.id} index={index} {...project} />
            )}
        </tbody>
    </table>
    </>
    );
}
 
export default ProjectTable;