import * as React from 'react';
import ProjectForm from '../components/projects/ProjectForm';
import ProjectTable from '../components/projects/ProjectTable';
import "../scss/pages/_createPage.scss"
export interface CreatePageProps {

}



const CreatePage: React.SFC<CreatePageProps> = () => {

    const [exampleData, setExampleData] = React.useState([
        {
            id: '123',
            projectName: "test qs"
        }
    ])
    
    const insertData = (projectName: string) => {
        setExampleData([...exampleData, {id: "1234" ,projectName}])
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <ProjectForm onCreateNewProject={insertData} />
                </div>
                <div className="col-md-6 project-block">
                    <ProjectTable projects={exampleData} />
                </div>
            </div>
        </>
    );
}

export default CreatePage;