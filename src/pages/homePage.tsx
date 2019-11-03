import React, { useEffect, useState, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TimeTable from '../components/TimeTable/TimeTable';
import TimeForm from '../components/TimeTable/TimeForm'

import firebaseApp from '../firebase'
import { IProject } from '../models/Project.model';
import { AuthContext } from '../contexts/AuthContext';
import { IAddProjectTime, IProjectTime } from '../models/projectTime.model';

const db = firebaseApp.firestore()

export interface HomePageProps {

}

const HomePage: React.SFC<HomePageProps> = () => {

    const [selectDate, setSelectDate] = useState(new Date())
    const [userProjects, setUserProjects] = useState<IProject[]>([])
    const [timeData, setTimeData] = useState<IProjectTime[]>([])
    const [selectProject, setSelectProject] = useState('')
    const { uid } = useContext(AuthContext)

    const sumHours = timeData.reduce((sum, cur) => sum + cur.hour, 0)

    const pieChartData = {
        labels: userProjects.sort((a, b) => a.id.localeCompare(b.id)).map(pro => pro.projectName),
        datasets: [{
            data: userProjects.sort((a, b) => a.id.localeCompare(b.id))
                .reduce<number[]>((count, cur) => {
                    const countTimeUse = timeData.filter(t => t.projectId === cur.id).reduce((sum, t) => sum += t.hour, 0)

                    return [...count, countTimeUse/sumHours * 100]
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
        const unsub = db.collection("projects")
            .where("userId", "==", uid).onSnapshot(snapshot => {
                const projects = snapshot.docs.map(doc => {
                    const { projectName, userId } = doc.data()
                    return {
                        projectName,
                        id: doc.id,
                        userId
                    }
                })

                setUserProjects(projects)
                setSelectProject(projects[0].id)
            })


        return () => unsub()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const unsub = db.collection("timestamps").where("userId", "==", uid)
            .where("onDay", "==", moment(selectDate).format('MM-DD-YYYY'))
            .onSnapshot(snapshot => {
                const thisData = snapshot.docs.map(doc => {
                    const { hour, note, timestamp, onDay, projectId } = doc.data()
                    return {
                        hour,
                        note,
                        timestamp,
                        id: doc.id,
                        onDay,
                        projectId
                    }
                })

                setTimeData(thisData)
            })

        return () => unsub()
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [selectDate])

    const handleChange = (date: Date) => {
        console.log(moment(date).format('MM-DD-YYYY'))

        setSelectDate(date)
    }

    const useTimes = timeData.filter(t => t.projectId === selectProject)

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
                <Pie data={pieChartData} />
            </div>
            <div className="col-md-12">
                <TimeTable timeData={useTimes} />
            </div>
        </div>
    );
}

export default HomePage;