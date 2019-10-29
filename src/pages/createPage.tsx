import * as React from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectTable from '../components/ProjectTable';

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
        console.log(" projectName projectName", projectName)
        setExampleData([...exampleData,    {id: "1234" ,projectName}])
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <ProjectForm onCreateNewProject={insertData} />
                </div>
                <div className="col-md-6">
                    <ProjectTable projects={exampleData} />
                </div>
            </div>
        </>
    );
}

export default CreatePage;