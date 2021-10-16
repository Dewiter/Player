import Input from './Inputs/Inputs';
import Progress from './Inputs/Progress';
import Volume from './Volume';

const Player = ({ player, playerHandler }) => {
  return (
    <>
      <div className='container container-out player'>
        <Input player={player} playerHandler={playerHandler} />
      </div>
      <Progress player={player} playerHandler={playerHandler} />
      <Volume playerHandler={playerHandler} />
    </>
  );
};

export default Player;
