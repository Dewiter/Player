import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const Song = ({ name, source }) => {
  const badge = (media) => {
    console.log('in');
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
    if (name.length >= 30) {
      return name.slice(0, 30);
    }
    return name;
  };

  return (
    <div className='song'>
      <p>{exerp()}</p>
      {badge(source)}
    </div>
  );
};

export default Song;
