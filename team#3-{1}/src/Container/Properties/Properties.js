import React,{Component} from "react";
import Property from "./Property/Property";

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
                fetch("https://realty-mole-property-api.p.rapidapi.com/rentalPrice?compCount=5&squareFootage=1600&bathrooms=2&address=5500%20Grand%20Lake%20Drive%2C%20San%20Antonio%2C%20TX&bedrooms=4&propertyType=Single%20Family",{
                method:"GET",
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
        console.log(this.state.listings)
        const property =  this.state.listings.map((p,index)=>{
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


export default properties
