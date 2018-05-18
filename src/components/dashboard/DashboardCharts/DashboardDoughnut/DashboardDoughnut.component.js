import { Doughnut } from 'react-chartjs-2';
import React        from 'react';
import PropTypes    from 'prop-types';


const DashboardDoughnut = ({data}) => (
    
        <Doughnut   data={data}
                    height={300}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        animation: false,
                        legend: {
                            position: 'bottom'
                        }
        }}/>
)

DashboardDoughnut.propTypes = {
    data: PropTypes.object.isRequired
};
    

export default DashboardDoughnut;