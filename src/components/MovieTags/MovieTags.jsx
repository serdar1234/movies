import { Tag } from 'antd';

import { GenresContext } from '../../services/GenresContext';
import './MovieTags.css';

const findGenre = (genreMap, genreID) => {
  return genreMap.get(genreID);
};

function MovieTags({ movieGenres }) {
  return (
    <div className="tags">
      <GenresContext.Consumer>
        {({ memoizedGenres }) => {
          return (
            <>
              {movieGenres.slice(0, 3).map((genreID) => {
                return <Tag key={genreID}>{findGenre(memoizedGenres, genreID)}</Tag>;
              })}
            </>
          );
        }}
      </GenresContext.Consumer>
    </div>
  );
}

export default MovieTags;
