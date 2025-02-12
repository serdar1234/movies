import { Tag } from 'antd';

import { GenresContext } from '../../services/GenresContext';
import './MovieTags.css';

const findGenre = (array, genreID) => {
  const genre = array.find((item) => item.id === genreID);
  return genre.name;
};

function MovieTags({ movieGenres }) {
  return (
    <div className="tags">
      <GenresContext.Consumer>
        {({ allGenres }) => {
          return (
            <>
              {movieGenres.slice(0, 3).map((genreID) => {
                return <Tag key={genreID}>{findGenre(allGenres, genreID)}</Tag>;
              })}
            </>
          );
        }}
      </GenresContext.Consumer>
    </div>
  );
}

export default MovieTags;
