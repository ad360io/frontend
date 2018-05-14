import React from 'react';

const ActiveContract = ({listingType}) => (
    <div className="active-contract-container">
        <div className="table-responsive" style={{height: '320px', width:'85%', margin:'2% auto'}}>
            <table className="table table-bordered mb-0">
                <thead className="thead-default">
                <tr>
                    <th>Website</th>
                    <th>Ad Type</th>
                    <th>Ad Genre</th>
                </tr>
                </thead>
                
                    {
                       sampleTableContent()
                    }
                
                
            </table>
        </div>
    </div>
)

const sampleTableContent = () => {
    let samples = [];
    for(let i = 0; i < 6; i++){
        samples.push(
            (
                <tr key={'tr'+i}>
                    <td>www.qchain.co</td>
                    <td>Branded Content</td>
                    <td>Other</td>
                </tr>
            )
        )
    }

    return <tbody>
        {
            samples.map((sample)=>{
                return sample
            })
        }
        </tbody>
}

export default ActiveContract;