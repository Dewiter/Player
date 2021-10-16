import Input from './Inputs/Inputs';
import Progress from './Inputs/Progress';

const Player = ({ player, playerHandler }) => {
  return (
    <div className='container container-out player'>
      {player?.currentSong && <h1>{player.currentSong.name}</h1>}
      <Input player={player} playerHandler={playerHandler} />
      <Progress player={player} playerHandler={playerHandler} />
    </div>
  );
};

export default Player;
