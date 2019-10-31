import * as React from 'react';
import { Pie, Bar } from 'react-chartjs-2';

export interface HomePageProps {
    
}
 
const HomePage: React.SFC<HomePageProps> = () => {
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
    return (
        <div className="row">
            <div className="col-md-6">
                <Pie data={data} />
            </div>
            <div className="col-md-6">
            {/* data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}] */}
            <Bar data={data2} />
            </div>
        </div>
    );
}
 
export default HomePage;