import * as React from 'react';
import ProjectForm from '../components/projects/ProjectForm';
import ProjectTable from '../components/projects/ProjectTable';
import "../scss/pages/_createPage.scss"
import { AuthContext } from '../contexts/AuthContext';

import firebaseApp from '../firebase'
import {IProject} from '../models/Project.model';

const db = firebaseApp.firestore()

export interface CreatePageProps {

}

const CreatePage: React.SFC<CreatePageProps> = () => {

    const [inserting, setInserting] = React.useState(false)

    const [userProjects, setUserProject] = React.useState<IProject[]>([])
    const { uid } = React.useContext(AuthContext)

    React.useEffect(() => {

        const unsub = db.collection("projects")
            .where("userId", "==", uid)
            .onSnapshot(snapshot => {

                const projects = snapshot.docs.map(doc => {
                    const {projectName, userId} = doc.data()
                    return {
                        projectName,
                        id: doc.id,
                        userId
                    }
                })

                setUserProject(projects)
            })

        return () => unsub()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const insertProject = async (projectName: string) => {
        setInserting(true)
        const newProject = db.collection("projects").doc()

        await newProject.set({
            projectName: projectName,
            userId: uid
        })

        setInserting(false)
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <ProjectForm disable={inserting} onCreateNewProject={insertProject} />
                </div>
                <div className="col-md-6 project-block">
                    <ProjectTable projects={userProjects} />
                </div>
            </div>
        </>
    );
}

export default CreatePage;