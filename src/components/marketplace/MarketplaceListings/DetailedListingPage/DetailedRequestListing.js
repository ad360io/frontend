import React from "react";
import {Card, CardText, CardTitle} from "material-ui";
import DetailedImageSlider from "./DetailedImageSlider/DetailedImageSlider.component";
import Divider from "material-ui/Divider/index";
import MakeOfferSection from "./MakeOfferSection/MakeOfferSection.component";

export class DetailedRequestListing extends React.Component {
    render() {
        const { item, decideImage, pathToOwnerProfile } = this.props;

        return (
            <div className='detailed-listing-renderer'>
                <div className='detailed-image-container'>
                    <Card>
                        <CardText>
                            <DetailedImageSlider imageSrc={decideImage(item.images, item.ad_format)} />
                        </CardText>
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
                    <CardTitle>
                        <h1 className='listing-title'>{item.name}</h1>
                    </CardTitle>
                    <Divider />
                    <CardText className='listing-details-text'>
                        <div className='details-text'>
                            <p>
                                Ad Format: {item.ad_format} {item.classtype}
                            </p>
                            <p>
                                Marketing Medium: {item.medium}
                            </p>

                        </div>
                        <br />
                        <MakeOfferSection listing={item} />
                        <br />
                        <div className='details-text'>{item.description}</div>
                    </CardText>
                </Card>

                <div className='poster-info-container'>
                    <Card>
                        <CardTitle>
                            <h3>Requestor Info:</h3>
                            <span style={{fontWeight: 300}}><span className='owner-profile-link'onClick={() => pathToOwnerProfile()}>{item.owner_name}</span> trading in {item.currency}</span>
                        </CardTitle>
                        <CardText>
                            <div>Ask Date: {item.date_added.slice(0, 10)}</div>
                        </CardText>
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
