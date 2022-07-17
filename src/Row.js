import React,{useState,useEffect} from "react";
import axios from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/w500/";

function Row({title,fetchUrl,isLargeRow}) {
    const[movies,setMovies] = useState([]);
    const[trailerUrl,setTrailerUrl]=useState("");
    
    //use effect will run the code inside it, when a particular row loads.
    useEffect(() =>{
      async function fetchData(){
        const request = await axios.get(fetchUrl);
        console.log(request);
        //console.log(request.data.results);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    },[fetchUrl]);

    //console.table(movies);

    const opts={
      height:"390",
      width:"100%",
      playerVars:{
        autoplay:1,
      },
    };

    
         
    const handleClick=(movie)=>{
      if(trailerUrl){
        setTrailerUrl('');
      }else{
        movieTrailer(null ,{ tmdbId: movie.id })
                   .then((url)=>{
                     console.log("url is "+url);
                     const urlParams=new URLSearchParams(new URL(url).search);
                     console.log("urlParamsn"+urlParams);
                     setTrailerUrl(urlParams.get("v"));
                   })
                   .catch((error)=> console.log(error));
      }
    };

    return(
        <div className="row">
            <h2 className="heading">{title}</h2>
            <div className="row_posters">
             {movies.map((movie) =>(
                //string interpolation is taking place here.
                <img
                key={movie.id}
                onClick={()=> handleClick(movie)}
                className={`row_poster ${isLargeRow &&"row_posterLarge"}`} 
                src={`${baseUrl}${movie.poster_path}`}alt={movie.name}/>
             ))}
            </div>
            {trailerUrl&&<YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;