import React, { useEffect, useState, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import TimeTable from '../components/TimeTable/TimeTable';
import TimeForm from '../components/TimeTable/TimeForm'

import firebaseApp from '../firebase'
import { IProject } from '../models/Project.model';
import { AuthContext } from '../contexts/AuthContext';
import { IAddProjectTime, IProjectTime } from '../models/projectTime.model';
import ToDayDate from '../utils/ToDayDate';


const db = firebaseApp.firestore()

export interface HomePageProps {
    userProjects: IProject[];
    timeData: IProjectTime[];
}

export const HomePage: React.SFC<HomePageProps> = ({
    userProjects,
    timeData
}) => {

    const [selectDate, setSelectDate] = useState()
    const [selectProject, setSelectProject] = useState('')
    const [timeDataOfProject, setTimeDataOfProject] = useState<IProjectTime[]>([])
    const [pieChartData, setPieChartData] = useState({})
    const { uid } = useContext(AuthContext)

    const insertTimeOfProject = async ({ projectId, hour, note }: IAddProjectTime) => {
        const attentTime = db.collection("timestamps").doc()

        await attentTime.set({
            timestamp: selectDate,
            onDay: moment(selectDate).format('MM-DD-YYYY'),
            projectId,
            hour,
            userId: uid,
            note: note ? note : null
        })
    }

    useEffect(() => {
        if (timeData) {
            if (!selectDate) {
                setSelectDate(new Date())
            }

            const useTimes = timeData.filter(t => t.projectId === selectProject && t.onDay === ToDayDate(selectDate))
            setTimeDataOfProject(useTimes)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeData])

    useEffect(() => {
        if (userProjects)
            if(userProjects.length > 0)
                setSelectProject(userProjects[0].id)

    }, [userProjects])

    const handleChange = (date: Date) => {
        console.log(moment(date).format('MM-DD-YYYY'))

        setSelectDate(date)
    }

    useEffect(() => {
        
        if (timeData && timeData.length > 0) {
            const timeDataFromSelectDate = timeData.filter(t => t.onDay === ToDayDate(selectDate))
            const sumHours = timeData.reduce((sum, cur) => sum + cur.hour, 0)
            const newChartData = {
                labels: userProjects.sort((a, b) => a.id.localeCompare(b.id)).map(pro => pro.projectName),
                datasets: [{
                    data: userProjects.sort((a, b) => a.id.localeCompare(b.id))
                        .reduce<number[]>((count, cur) => {
                            const countTimeUse = timeDataFromSelectDate.filter(t => t.projectId === cur.id).reduce((sum, t) => sum += t.hour, 0)

                            return [...count, countTimeUse / sumHours * 100]
                        }, [])
                    ,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }],
                tooltips: {
                    mode: 'point'
                }
            };

            setPieChartData(newChartData)
            const useTimes = timeData.filter(t => t.projectId === selectProject && t.onDay === ToDayDate(selectDate))
            setTimeDataOfProject(useTimes)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectDate, selectProject, timeData])

    if (!isLoaded(timeData) || !isLoaded(userProjects)) {
        return <p>Loading...</p>
    }
    else {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <DatePicker
                        className="form-control"
                        selected={selectDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <TimeForm projects={userProjects}
                        insertTimeStamp={insertTimeOfProject}
                        onChangeProject={setSelectProject}
                        selectProject={selectProject}
                    />
                </div>
                <div className="col-md-6">
                    {pieChartData && <Pie data={pieChartData} />}
                </div>
                <div className="col-md-12">
                    <TimeTable timeData={timeDataOfProject} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => {

    const projects = state.firestore.ordered.projects;
    const timeData = state.firestore.ordered.timestamps;
    return {
        userProjects: projects,
        timeData,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props: any) => {
        return [
            { collection: 'projects', where: ["userId", "==", props.auth.uid] },
            { collection: 'timestamps', where: ["userId", "==", props.auth.uid] }]
    })
)(HomePage);