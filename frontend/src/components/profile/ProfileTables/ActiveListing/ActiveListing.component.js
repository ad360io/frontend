/*
Core Libs
*/
import React from 'react';

/**
 * ActiveListing Component
 * @param {string} listingType passed by props to decide label  
 */
const ActiveListing = ({listingType}) => (
    <div className='active-listing-container'>
        <div className='table-responsive' style={{height: '320px', margin:'2%'}}>
            <table className='table table-bordered mb-0'>
                <thead className='thead-default'>
                <tr>
                    <th>Website</th>
                    <th>Ad Genre</th>
                    <th>Subcategory</th>
                </tr>
                </thead>
                
                    {
                       sampleTableContent()
                    }
                
                
            </table>
        </div>
    </div>
)

/**
 * Dynamically generate dummy data.
 */
const sampleTableContent = () => {
    let samples = [];
    for(let i = 0; i < 40; i++){
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


export default ActiveListing;