import axios from "axios";
import { Component } from "react";
import {movies} from "../movieData"

class Banner extends Component {

    constructor(){
        super();
        this.state = {
            movie: ""
        }
    }

    async componentDidMount(){
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7e0c90d7648c315e3072c106084bf82f&language=en-US&page=1`)
        console.log("banner")
        console.log(res)
        this.setState({
            movie: res.data.results[[Math.floor(Math.random()*20)]]
        })
    }

    render() {
        // this.state.movie = this.state.res.data.results[Math.floor(Math.random()*10)]
        let backdropPath = this.state.movie.backdrop_path
        return (
            <div className="card banner-card" >
                <img className="card-img-top banner-img" src={`https://image.tmdb.org/t/p/original${backdropPath}`} alt="Card image cap"/>
                <div className="bannerTextDiv">
                    <h5 className="card-title banner-title">{this.state.movie.title}</h5>
                    <p className="card-text banner-text">{this.state.movie.overview}</p>
                </div>
            </div>
        )

    }
}

export default Banner