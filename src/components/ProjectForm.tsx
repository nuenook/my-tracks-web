import * as React from 'react';

export interface ProjectFormProps {
    onCreateNewProject?: (projectName: string) => void
}

const ProjectForm: React.SFC<ProjectFormProps> = ({
    onCreateNewProject
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
                            console.log(projectName)
                         }
                        }
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Project</button>
            </form>
        </div>
    );
}

export default ProjectForm;