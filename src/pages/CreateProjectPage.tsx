import * as React from 'react';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import ProjectForm from '../components/projects/ProjectForm';
import ProjectTable from '../components/projects/ProjectTable';
import { IProject } from '../types/Project.type';
import { connect } from 'react-redux';
import {createProject} from '../redux/actions/projectActions';
import { INewProject } from '../types/Project.type';

export interface CreateProjectPageProps {
    userProjects: IProject[];
    createProject: typeof createProject;
}

const CreateProjectPage: React.SFC<CreateProjectPageProps> = ({ userProjects, createProject }) => {

    const insertProject = async (projectName: string) => {
        createProject({projectName})
    }

    if (!userProjects) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <ProjectForm onCreateNewProject={insertProject} />
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        createProject: (project: INewProject) => dispatch(createProject(project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props: any) => {
        return [{ collection: 'projects', where: ["userId", "==", props.auth.uid]}]},
    )
)(CreateProjectPage);