import { IProject } from "../types/Project.type";
import { IAddProjectTime } from "../types/projectTime.type";

export default (userProjects: IProject[], timeDataFromSelectDate: IAddProjectTime[]) => {
    const sumHours = timeDataFromSelectDate.reduce((sum, cur) => sum + cur.hour, 0)
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
    return newChartData;
}