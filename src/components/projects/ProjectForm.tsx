import * as React from 'react';

export interface ProjectFormProps {
    onCreateNewProject?: (projectName: string) => void;
    disable: boolean;
}

const ProjectForm: React.SFC<ProjectFormProps> = ({
    onCreateNewProject,
    disable
}) => {

    const [projectName, setProjectName] = React.useState('')

    const onSubmiting = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(onCreateNewProject)
            onCreateNewProject(projectName)
    }
    return (
        <div>
            <form action="" onSubmit={onSubmiting}>
                <div className="form-group">
                    <label htmlFor="projectName">Project Name</label>
                    <input type="text" id="projectName"
                        value={projectName} className="form-control"
                        onChange={e => { 
                            setProjectName(e.target.value)
                        }}
                        min="1"
                        required/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={disable}>Create Project</button>
            </form>
        </div>
    );
}

export default ProjectForm;