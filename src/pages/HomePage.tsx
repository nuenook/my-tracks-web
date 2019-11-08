import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import TimeTable from '../components/TimeTable/TimeTable';
import TimeForm from '../components/TimeTable/TimeForm'
import { IProject } from '../types/Project.type';
import { IAddProjectTime, IProjectTime } from '../types/projectTime.type';
import ToDayDate from '../utils/ToDayDate';
import {createProjectTimestamp, setSelectDate} from '../redux/actions/timesatmpActions'
import PieChartData from '../utils/PieChartData'

export interface HomePageProps {
    userProjects: IProject[];
    timeData: IProjectTime[];
    createProjectTimestamp: typeof createProjectTimestamp;
    selectDate: Date;
    setSelectDate: typeof setSelectDate;

}

export const HomePage: React.SFC<HomePageProps> = ({
    userProjects,
    timeData,
    createProjectTimestamp,
    selectDate,
    setSelectDate
}) => {

    const [selectProject, setSelectProject] = useState('')
    const [timeDataOfProject, setTimeDataOfProject] = useState<IProjectTime[]>([])
    const [pieChartData, setPieChartData] = useState({})

    const insertTimeOfProject = ({ projectId, hour, note }: IAddProjectTime) => {
        createProjectTimestamp({
            projectId,
            hour,
            note: note ? note : "",
            timestamp: selectDate,
        })
    }

    useEffect(() => {
        if (timeData) {
            // if (!selectDate) {
            //     setSelectDate(new Date())
            // }

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
        
        if (timeData) {
            const timeDataFromSelectDate = timeData.filter(t => t.onDay === ToDayDate(selectDate))
            
            const newChartData = PieChartData(userProjects, timeDataFromSelectDate)

            setPieChartData(newChartData)
            const useTimes = timeData.filter(t => t.projectId === selectProject && t.onDay === ToDayDate(selectDate))
            setTimeDataOfProject(useTimes)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectDate, selectProject, timeData])

    if (!timeData || !userProjects) {        
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
        auth: state.firebase.auth,
        selectDate: state.timestamp.selectDate
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        createProjectTimestamp: (projectTime: IAddProjectTime) => dispatch(createProjectTimestamp(projectTime)),
        setSelectDate: (newDate: Date) => dispatch(setSelectDate(newDate))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props: any) => {

        return [
            { collection: 'projects', where: ["userId", "==", props.auth.uid] },
            { collection: 'timestamps', where: [
                ["userId", "==", props.auth.uid],
                ["onDay", "==", ToDayDate( props.selectDate)]
            ]}
        ]
    })
)(HomePage);