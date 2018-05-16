import React from 'react';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap'

const InviteList = () => (
    <div className="invite-list-container">
        <div className="table-responsive" style={{height: '320px', margin:"2%"}}>
            <table className="table table-bordered mb-0">
                <thead className="thead-default">
                <tr>
                    <th>Invite Detail</th>
                    <th style={{width:'25%', textAlign:'center'}}>Action</th>
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
    
    

    for(let i = 0; i < 3; i++){
        
        const listingPopover = (
            <Popover title="User X sent you an invite" id={"popover"+i}>
                <strong>Info</strong> Some basic info <br/>
                <strong>Pricing</strong> Listing pricing
            </Popover>
        )

        samples.push(
            (
                <tr key={'invite-tr'+i}>
                    <td>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={listingPopover}>
                            <a style={{cursor: 'pointer'}}>Some of my listing name</a>
                        </OverlayTrigger> 
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <Button bsStyle="success" style={{marginRight: '10px'}}>Accept</Button>
                        <Button bsStyle="danger">Decline</Button>
                    </td>
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

export default InviteList;