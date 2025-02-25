import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import placeholderImg from '/placeholder.jpg';

import './MovieImage.css';

function MovieImage({ info }) {
  const [imgState, setImgState] = useState('loading');
  const { title, poster_path: path } = info;
  const spinner = <Spin indicator={<LoadingOutlined spin />} size="large" />;

  return (
    <div className="cardImg">
      {imgState === 'loading' && spinner}
      {imgState === 'fail' && <img src={placeholderImg} alt="Fallback" className="imgStyle" />}
      <img
        src={`https://image.tmdb.org/t/p/w342${path}`}
        onLoad={() => setImgState('success')}
        onError={() => setImgState('fail')}
        alt={title}
        className="imgStyle"
        style={{ display: imgState === 'success' ? 'block' : 'none' }}
      />
    </div>
  );
}

export default MovieImage;
