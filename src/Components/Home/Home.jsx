import React from "react";
import "./home.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BiPlay, BiPlus } from "react-icons/bi";
const url = "https://api.themoviedb.org/3/movie";
const apiKey = "6ba9f036e5c41c107b5eed3b55c25483";
const imageUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img }) => <img src={img} alt="logo" className="card" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card img={`${imageUrl}/${item.poster_path}`} key={index} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [popularMovies, setpopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/popular?api_key=${apiKey}`);
      setpopularMovies(results);
    };

    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/upcoming?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/top_rated?api_key=${apiKey}`);

      setTopRatedMovies(results);
      console.log(topRatedMovies);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/now_playing?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };

    fetchPopular();
    fetchUpcoming();
    fetchTopRated();
    fetchNowPlaying();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imageUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h2>{popularMovies[0].original_title}</h2>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
        <div>
          <button>
            <BiPlay />
            Play
          </button>
          <button>
            My List <BiPlus />
          </button>
        </div>
      </div>
      <Row title={"Popular On Netflix"} arr={popularMovies} />
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
    </section>
  );
};

export default Home;
