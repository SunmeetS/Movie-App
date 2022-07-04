import axios from "axios";
import { Component } from "react"
// import { movie } from "./banner";

class MovieList extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            pArr: [1],
            movies: [],
            currPage: 1,
            favourites: []
        };
    }

    async componentDidMount() {
        console.log("Component Did Mount");
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7e0c90d7648c315e3072c106084bf82f&language=en-US&page=1`)
        console.log(res.data)
        this.setState({
            movies: [...res.data.results]
        })
    }

    handleFavourites =(movieObj)=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
        if(this.state.favourites.includes(movieObj.id))  {
            oldData = oldData.filter((movie)=>movie.id!=movieObj.id)}
        else{
            oldData.push(movieObj)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        this.handleFavouritesState();
    }

    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app')|| '[]')
        let temp = oldData.map((movie)=> movie.id);
        this.setState({
            favourites: [...temp]
        })
    }

    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7e0c90d7648c315e3072c106084bf82f&language=en-US&page=${this.state.currPage}`)
        this.setState({
            movies: [...res.data.results]
        })
    }

    handleNext = () => {
        this.setState({
            pArr: this.state.currPage in this.state.pArr? [...this.state.pArr]: [...this.state.pArr, this.state.pArr.length + 1],
            currPage: this.state.currPage + 1
        }, this.changeMovies)
    }

    handlePrev = () => {
        // if(this.state.pArr.length > 1){
        this.setState({
            // pArr:[...this.state.pArr.filter((_,i)=>i!=this.state.pArr.length-1)],
            pArr: this.state.pArr.length > 1 ? [...this.state.pArr.filter((_, i) => i != this.state.pArr.length - 1)] : [...this.state.pArr],
            currPage: this.state.currPage - 1
        }, this.changeMovies)
    }

    handleChange = (ele) =>{
        this.setState({
            currPage: ele
        },this.changeMovies)
    }
    // }

    render() {
        return (
            <div>
                <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                </div>
                <div className="movies-list" >
                    {this.state.movies.map((movieEle) => (
                        <div className="card movie-card" onMouseEnter={() => this.setState({ hover: movieEle.id })} onMouseLeave={() => this.setState({ hover: "" })} >
                            <div movieImg>
                                <img src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`} className="card-img-top movie-img" alt={axios.get(`https://image.shutterstock.com/image-vector/page-not-found-error-404-600w-479042983.jpg`)} />
                                {this.state.hover == movieEle.id && (
                                    <a type="button" className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieEle)}> {this.state.favourites.includes(movieEle.id)?"Remove From Favourites":"Add to Favourites"}</a>)}
                            </div>
                            <h5 className="card-title movie-title">{movieEle.title}</h5>

                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" onClick={this.handlePrev}> Previous</a></li>

                            {this.state.pArr.map((ele) => (
                                <li className="page-item"><a className="page-link" onClick={()=>this.handleChange(ele)}>{ele}</a></li>
                            ))}
                            <li className="page-item"><a className="page-link" onClick={this.handleNext}>Next</a></li>
                        </ul>
                    </nav>
                </div>

            </div>)

    }

}
export default MovieList;




