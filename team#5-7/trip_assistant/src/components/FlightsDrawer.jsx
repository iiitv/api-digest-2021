import { Drawer, message } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';

class FlightsDrawer extends Component {
    state = { 
        clientLocationCode: '',
        searchedLocationCode: '',
        flights: []
    }

    async componentDidMount() {
        try {
            const clientLocation = await axios.get("http://www.travelpayouts.com/whereami?locale=en");
            const clientLocationCode = clientLocation.data.iata;

            const searchedLocation = await axios.get(`http://autocomplete.travelpayouts.com/places2?term=${this.props.location}&locale=en&types[]=city`);
            const searchedLocationCode = searchedLocation.data[0].code;

            this.setState({clientLocationCode, searchedLocationCode});

            // const flights = await axios.get(`https://api.flightapi.io/onewaytrip/${process.env.REACT_APP_FLIGHT_DATA}/${clientLocationCode}/${searchedLocationCode}/${this.props.date}/1/0/0/Economy/INR`);
            // this.setState({flights: flights.data.legs});
        } catch (error) {
            console.log("Error-",error);
            message.error("Some error occurred");
        }
    }

    render() { 
        const title = `Flights from ${this.state.clientLocationCode} to ${this.state.searchedLocationCode} on ${this.props.date}`;
        return ( 
            <Drawer
            title={title}
            onClose={this.props.onClose}
            visible={this.props.visible}
            width={500}
            bodyStyle={{ paddingBottom: 80 }}
            >
                
            </Drawer>
        );
    }
}
 
export default FlightsDrawer;