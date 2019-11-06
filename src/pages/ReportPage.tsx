import * as React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ToFirstAndLastDayOfMonth from '../utils/GetFirstAndLastDayMonth'
import moment from 'moment';
import { IProjectTime } from '../types/projectTime.type';
import { IProject } from '../types/Project.type';
import PieChartData from '../utils/PieChartData';

export interface ReportPageProps {
    timeData: IProjectTime[],
    userProjects: IProject[]
}

const ReportPage: React.SFC<ReportPageProps> = ({
    timeData,
    userProjects
}) => {
    const [pieChartData, setPieChartData] = React.useState({})

    React.useEffect(() => {

        if(userProjects && timeData){
            const newChartData = PieChartData(userProjects, timeData)

            setPieChartData(newChartData)
        }
    }, [userProjects, timeData])

    const data2 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: '#36A2EB',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    if(!userProjects || !timeData) {
        return <p>Loading...</p>
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <Pie data={pieChartData} />
            </div>
            <div className="col-md-6">
                <Bar data={data2} />
            </div>
        </div>
    );
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
        const currentDate = new Date()

        const dateRange = ToFirstAndLastDayOfMonth(1 + moment(currentDate).month(), moment(currentDate).year())
        
        return [
            { collection: 'projects', where: ["userId", "==", props.auth.uid] },
            { collection: 'timestamps', where: [
                ["userId", "==", props.auth.uid],
                ["timestamp", ">=", dateRange.startOfMonth],
                ["timestamp", "<=", dateRange.endOfMonth]
            ]},
        ]
    })
)(ReportPage);