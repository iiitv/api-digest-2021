import React,{Component} from "react";
import Property from "./Property/property";

class properties extends Component{
    state={
        flag:this.props.flag,
        pageLoaded:false,
        city:this.props.city,
        State:this.props.State,
        bathrooms:this.props.bathrooms,
        address:this.props.address,
        bedrooms:this.props.bedrooms,
        propertyType:this.props.propertyType,
        squareFootage:this.props.footage,
        compCount:this.props.compCount,
        listings:[]
    }

    componentDidMount=()=>{
        if(!this.state.pageLoad){
            if(this.state.flag===0)
            {
                fetch("https://realty-mole-property-api.p.rapidapi.com/rentalPrice",{
                body:{
                    "compCount":this.state.compCount,
                    "squareFootage": this.state.squareFootage,
                    "bathrooms": this.state.bathrooms,
                    "address": this.state.address,
                    "bedrooms": this.state.bedrooms,
                    "propertyType": this.state.propertyType
                },
                headers:{
                    "x-rapidapi-key": "ac0ee5cdf5msh2ae5bfedf76c0a9p1588a7jsn1887f7d15fc4",
                    "x-rapidapi-host": "realty-mole-property-api.p.rapidapi.com",
                    "useQueryString": true
                }
            }).then(result=>{
                console.log(result)
                this.setState({listings:result.listings})
                this.state.pageLoaded=true;
            }).catch(err=>{
                console.log(err);
            })
        }else{
            fetch("https://realty-mole-property-api.p.rapidapi.com/saleListings",{
                body:{
                    "city": this.state.city,
	                "state": this.state.State
                },
                headers:{
                    "x-rapidapi-key": "ac0ee5cdf5msh2ae5bfedf76c0a9p1588a7jsn1887f7d15fc4",
                    "x-rapidapi-host": "realty-mole-property-api.p.rapidapi.com",
                    "useQueryString": true
                }
            }).then(result=>{
                console.log(result)
                this.setState({listings:result})
                this.state.pageLoaded=true;
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    }

    render(){

        const property =  this.state.listing.map((p,index)=>{
            return <Property 
            bathrooms={p.bathrooms} 
            bedrooms={p.bedrooms} 
            price={p.price} 
            address={p.rawAddress}
            footage={p.squareFootage}
            county={p.county}
            type={p.propertyType}
            city={p.city}
            state={p.state}
            zipcode={p.zipCode}
            latitude={p.latitude}
            longitude={p.longitude}
            />
          })


        return(
            <div>
                {property}
            </div>
        )
    }
}

// "city":"Austin"
// "state":"TX"
// "zipCode":"78734"
// "formattedAddress":"213 Costa Bella Dr, Austin, TX 78734"
// "lastSeen":"2021-02-20T14:51:21.866Z"
// "listedDate":"2020-09-22T01:08:10.420Z"
// "status":"Active"
// "removedDate":NULL
// "daysOnMarket":152
// "createdDate":"2020-09-22T01:08:10.420Z"
// "id":"213-Costa-Bella-Dr,-Austin,-TX-78734"
// "latitude":30.389114
// "longitude":-97.949357

// "bathrooms":8.5
// "bedrooms":7
// "price":6750000
// "rawAddress":"213 Costa Bella Dr, Austin, Texas 78734"

// "squareFootage":13630
// "county":"Travis County"
// "propertyType":"Single Family"
// "addressLine1":"213 Costa Bella Dr"

// //"id":"6834-Indian-Lake-Dr,-San-Antonio,-TX-78244"
// //"formattedAddress":"6834 Indian Lake Dr, San Antonio, TX 78244"
// //"longitude":-98.35304
// //"latitude":29.477213
// //"city":"San Antonio"
// //"state":"TX"
// //"zipcode":"78244"
// //"price":1351
// "publishedDate":"2021-02-20T03:25:41.983Z"
// //"distance":0.20627281128678557
// //"daysOld":0.61
// "correlation":0.9737
// "address":"6834 Indian Lake Dr"
// "county":"Bexar County"
// "bedrooms":4
// "bathrooms":2
// "propertyType":"Single Family"
// "squareFootage":1448