import * as React from 'react';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import ProjectForm from '../components/projects/ProjectForm';
import ProjectTable from '../components/projects/ProjectTable';
import "../scss/pages/_createPage.scss"
import { AuthContext } from '../contexts/AuthContext';
import firebaseApp from '../firebase'
import { IProject } from '../models/Project.model';
import { connect } from 'react-redux';

const db = firebaseApp.firestore()

export interface CreatePageProps {
    userProjects: IProject[];
}

const CreatePage: React.SFC<CreatePageProps> = ({ userProjects }) => {

    const [inserting, setInserting] = React.useState(false)
    const { uid } = React.useContext(AuthContext)

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

const mapStateToProps = (state: any, ownProps: any) => {
    const projects = state.firestore.ordered.projects;

    return {
        userProjects: projects,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'projects'
    }])
)(CreatePage);