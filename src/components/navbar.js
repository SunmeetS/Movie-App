import { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component{
    render(){
        return(
            <div style={{display:"flex",justifyContent:"spaceBetween"}}>
                <Link to={'/'} style={{textDecoration:"none"}} ><h1 style={{marginLeft:"4rem"}}>Movies App</h1></Link>
                <Link to={'/favourites'} style={{textDecoration:"none"}}><h1 style={{marginLeft:"30vw"}}>Favorites</h1 ></Link>
            </div>
        )
    }
}

export default NavBar