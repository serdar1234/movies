import MovieImage from '.';

export default {
  title: 'UI/Img',
  component: MovieImage,
};

export function Default() {
  const info = { title: 'Haha', poster_path: 'foobar' };
  return <MovieImage info={info} />;
}
