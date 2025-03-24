import React, { useContext } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../Context/MovieProvider";
MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 10 },
  desktop: { breakpoint: { max: 3000, min: 1200 }, items: 7 }, // Sửa "destop" thành "desktop"
  tablet: { breakpoint: { max: 1200, min: 600 }, items: 3 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 2 },
};

function MovieList({ title, data }) {
  const { handleVideoTrailer } = useContext(MovieContext);
  return (
    <div className="my-10 px-10 max-w-full">
      <h2 className="text-xl uppercase mb-4">{title}</h2>
      <Carousel responsive={responsive}>
        {data?.map((movie) => (
          <div
            key={movie.id}
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer "
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${
                movie.poster_path
              })`,
            }}
            onClick={() => handleVideoTrailer(movie.id)}>
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0 ">
              <div className=" relative p-4 flex text-white  flex-col items-center justify-end h-full">
                <h3 className="text-md uppercase">
                  {movie.name || movie.title || movie.original_title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MovieList;
