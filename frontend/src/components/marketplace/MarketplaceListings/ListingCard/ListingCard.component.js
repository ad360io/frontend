/*
Core Libs
*/
import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import './ListingCard.component.css'
/**
 * Singleton of a Listing display
 * expects props of 
 */
class ListingCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decideCardWidth = this.decideCardWidth.bind(this);
        this.decideMarginLeft = this.decideMarginLeft.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }

    decideCardWidth() {
        if(this.state.width >= 1200){
            return '30%';
        }else{
            return '80%';
        }
    }

    decideMarginLeft(){
        if(this.state.width >= 1200) {
            return '2%';
        }else{
            return '10%';
        }
    }

    render() {
        return <div>
            <Card className="listing-card-container" 
                style={{ 
                    width: this.decideCardWidth(),
                    marginLeft: this.decideMarginLeft(),
                }
            }>
                <CardHeader
                    title={this.props.title}
                    subtitle="Subtitle"
                />

                <CardTitle title="Card title" subtitle="Card subtitle" />
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            </Card>
        </div>
    }
}


export default ListingCard;