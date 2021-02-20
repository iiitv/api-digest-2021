import React,{Component} from "react";
import Property from "./Property/property";

class properties extends Component{
    state={
        pageLoad:false,
        city:this.props.city,
        State:this.props.State,
        bathrooms:this.props.bathrooms,
        address:this.props.address,
        bedrooms:this.props.bedrooms,
        propertyType:this.props.propertyType,
        squareFootage:this.props.footage,
        compCount:this.props.compCount,
        listing:[]
    }

    componentDidMount=()=>{
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
            this.setState({listing:result.listing})
        }).catch(err=>{
            console.log(err);
        })
    }

    render(){

        const property =  this.state.listing.map((p,index)=>{
            return <Property/>
          })


        return(
            <div>
                {property}
            </div>
        )
    }
}

