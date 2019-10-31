import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TimeTable from '../components/TimeTable/TimeTable';
import TimeForm from '../components/TimeTable/TimeForm'

export interface HomePageProps {

}

const HomePage: React.SFC<HomePageProps> = () => {

    const [selectDate, setSelectDate] = React.useState(new Date())
    const data = {
        labels: [
            'Project one: ' + 60,
            'Project two',
            'Project three',
        ],
        datasets: [{
            data: [60, 30, 10],
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

    const handleChange = (date: Date) => {
        console.log(moment(date).format('LLLL'))
        
        setSelectDate(date)
    }

    return (
        <div className="row">
            <div className="col-md-6 text-center">
                <DatePicker
                    className="form-control"
                    selected={selectDate}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-6 text-center">
                <select name="" id="">
                    <option value="HarperDB">HarperDB</option>
                    <option value="ScoutAsia">ScoutAsia</option>
                </select>
            </div>
            <div className="col-md-6">
                <TimeForm />
            </div>
            <div className="col-md-6">
                <Pie data={data} />
            </div>
            <div className="col-md-12">
                <TimeTable />
            </div>
        </div>
    );
}

export default HomePage;