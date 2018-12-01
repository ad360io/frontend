import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import DetailedImageSlider from "./DetailedImageSlider/DetailedImageSlider.component";
import MakeOfferSection from "./MakeOfferSection/MakeOfferSection.component";

export class DetailedRequestListing extends React.Component {
    render() {
        const { item, decideImage, pathToOwnerProfile, allApis } = this.props;

        return (
            <div className='detailed-listing-renderer'>
                <div className='detailed-image-container'>
                    <Card>
                        <CardContent>
                            <DetailedImageSlider imageSrc={decideImage(item.images, item.ad_format)} />
                        </CardContent>
                    </Card>
                    <div className='detailed-listing-action-section'>
                        <a className='detailed-listing-action'>Save this listing</a>
                        <Divider />
                        <a className='detailed-listing-action'>Add to watch list</a>
                        <Divider />
                        <a className='detailed-listing-action'>Some other simple actions</a>
                        <Divider />
                    </div>
                </div>

                <Card className='listing-concrete-details-container'>
                    <div>
                        <h1 className='listing-title'>{item.name}</h1>
                    </div>
                    <Divider />
                    <CardContent className='listing-details-text'>
                        <div className='details-text'>
                            <p>
                                Ad Format: {item.ad_format} {item.classtype}
                            </p>
                            <p>
                                Marketing Medium: {item.medium}
                            </p>

                        </div>
                        <br />
                        <MakeOfferSection listing={item} {...{allApis}} />
                        <br />
                        <div className='details-text'>{item.description}</div>
                    </CardContent>
                </Card>

                <div className='poster-info-container'>
                    <Card>
                        <div>
                            <h3>Requestor Info:</h3>
                            <span style={{fontWeight: 300}}><span className='owner-profile-link'onClick={() => pathToOwnerProfile()}>{item.owner_name}</span> trading in {item.currency}</span>
                        </div>
                        <CardContent>
                            <div>Ask Date: {item.date_added.slice(0, 10)}</div>
                        </CardContent>
                    </Card>
                    <div className='detailed-listing-action-section'>
                        <a className='detailed-listing-action'>Add requestor to favorite</a>
                        <Divider />
                        <a className='detailed-listing-action'>Contact this requestor</a>
                        <Divider />
                    </div>
                </div>
            </div>
        )
    }
}
