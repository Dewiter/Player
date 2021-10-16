import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const Song = React.memo(({ name, source }) => {
  console.log('in');
  const badge = (media) => {
    switch (media) {
      case 'youtube':
        return (
          <div className={'source youtube'}>
            <FontAwesomeIcon icon={faYoutube} size='xs' />
          </div>
        );

      default:
        return <p>placeholder</p>;
    }
  };

  const exerp = () => {
    if (name.length >= 60) {
      return name.slice(0, 60);
    }
    return name;
  };

  return (
    <div className='song'>
      <p>{exerp()}</p>
      {badge(source)}
    </div>
  );
});

export default Song;
