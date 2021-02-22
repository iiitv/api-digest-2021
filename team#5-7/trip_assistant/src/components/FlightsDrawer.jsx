import { Drawer, message } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';

class FlightsDrawer extends Component {
    state = { 
        clientLocationCode: '',
        searchedLocationCode: '',
        flights: [],
        loading: false
    }

    componentDidMount = async () => {
        this.setState({loading: true});
        try {
            const clientLocation = await axios.get("http://www.travelpayouts.com/whereami?locale=en");
            const clientLocationCode = clientLocation.data.iata;

            const searchedLocation = await axios.get(`http://autocomplete.travelpayouts.com/places2?term=${this.props.location}&locale=en&types[]=city`);
            const searchedLocationCode = searchedLocation.data[0].code;

            this.setState({clientLocationCode, searchedLocationCode});

            const flights = await axios.get(`https://api.flightapi.io/onewaytrip/${process.env.REACT_APP_FLIGHT_API}/${clientLocationCode}/${searchedLocationCode}/${this.props.date}/1/0/0/Economy/INR`);
            this.setState({flights: flights.data.legs});
            console.log(flights);
        } catch (error) {
            console.log("Error-",error);
            message.error("Some error occurred");
        }
        this.setState({loading: false});
    }

    renderFlights = () => {
        return this.state.flights.map((flight,key) => {
            return (
                <div className="card my-3" key={key}>
                    <h5 className="card-header">Flight ID - {flight.id}</h5>
                    <div className="card-body">
                        <div>
                            <p>Origin Airport Code - {flight.departureAirportCode}</p>
                            <p>Destination Airport Code - {flight.arrivalAirportCode}</p>
                            <p>Departure Time - {flight.departureTime} hrs</p>
                            <p>Arrival Time - {flight.arrivalTime} hrs</p>
                            <p>Total Duration - {flight.duration}</p>
                            <p>Total Stops - {flight.stopoversCount}</p>
                            <p>Stoppage Duration - {flight.stopoverDuration}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() { 
        const title = `Flights from ${this.state.clientLocationCode} to ${this.state.searchedLocationCode} on ${this.props.date}`;
        return ( 
            <Drawer
            title={title}
            onClose={this.props.onClose}
            visible={this.props.visible}
            width={500}
            bodyStyle={{ paddingBottom: 80, backgroundColor: '#343A40' }}
            >
                {this.renderFlights()}
                { this.state.loading && 
                    <div className="text-center text-light mt-5">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                { !this.state.loading && this.state.flights.length===0 &&  <h5 className="text-light">No Flight Found</h5>}
            </Drawer>
        );
    }
}
 
export default FlightsDrawer;